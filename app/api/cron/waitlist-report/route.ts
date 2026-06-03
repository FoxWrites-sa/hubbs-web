import { Redis } from '@upstash/redis';
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});
const resend = new Resend(process.env.RESEND_API_KEY);

interface WaitlistEntry {
  email: string;
  source?: string;
  country?: string;
  device?: string;
  timestamp?: string;
  createdAt?: string;
}

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // ── Debug: log what's actually in Redis ──────────────────────────────────
  try {
    const listData = await redis.lrange('waitlist', 0, -1);
    console.log('[waitlist-report] list "waitlist" length:', listData?.length ?? 0);
    const emailSet = await redis.smembers('waitlist:emails');
    console.log('[waitlist-report] set "waitlist:emails" size:', emailSet?.length ?? 0);
    const sampleKey = await redis.keys('waitlist:*');
    console.log('[waitlist-report] keys matching waitlist:* :', sampleKey?.length ?? 0);
  } catch (e) {
    console.error('[waitlist-report] Redis debug error:', e);
  }

  // ── Fetch entries — signup route uses individual keys + an email set ─────
  let entries: WaitlistEntry[] = [];

  // Primary: use the maintained email set to batch-fetch all entries
  const emails: string[] = await redis.smembers('waitlist:emails').catch(() => []);
  if (emails.length > 0) {
    const keys = emails.map((e) => `waitlist:${e}`);
    // mget returns values in same order as keys
    const values: any[] = await redis.mget(...keys).catch(() => []);
    entries = values
      .map((v) => {
        if (!v) return null;
        if (typeof v === 'string') { try { return JSON.parse(v); } catch { return null; } }
        return v as WaitlistEntry;
      })
      .filter(Boolean) as WaitlistEntry[];
  }

  // Fallback A: scan individual keys (slower but catches any orphaned entries)
  if (entries.length === 0) {
    const allKeys: string[] = await redis.keys('waitlist:*').catch(() => []);
    const dataKeys = allKeys.filter((k) => k !== 'waitlist:emails');
    if (dataKeys.length > 0) {
      const values: any[] = await redis.mget(...dataKeys).catch(() => []);
      entries = values
        .map((v) => {
          if (!v) return null;
          if (typeof v === 'string') { try { return JSON.parse(v); } catch { return null; } }
          return v as WaitlistEntry;
        })
        .filter(Boolean) as WaitlistEntry[];
    }
  }

  // Fallback B: legacy list format (old data)
  if (entries.length === 0) {
    const raw: any[] = await redis.lrange('waitlist', 0, -1).catch(() => []);
    entries = raw
      .map((item) => {
        if (typeof item === 'string') { try { return JSON.parse(item); } catch { return { email: item }; } }
        return item as WaitlistEntry;
      })
      .filter(Boolean) as WaitlistEntry[];
  }

  console.log('[waitlist-report] Total entries found:', entries.length);
  if (entries.length > 0) console.log('[waitlist-report] Sample entry:', entries[0]);

  const now = new Date();
  const todayStr = now.toISOString().slice(0, 10);
  const yesterdayStr = new Date(now.getTime() - 86400000).toISOString().slice(0, 10);
  const sevenDaysAgo = new Date(now.getTime() - 7 * 86400000);

  const total = entries.length;

  const getDate = (e: WaitlistEntry) => e.timestamp || e.createdAt || '';

  const todayCount = entries.filter((e) => getDate(e).startsWith(todayStr)).length;
  const yesterdayCount = entries.filter((e) => getDate(e).startsWith(yesterdayStr)).length;
  const last7Count = entries.filter((e) => {
    const d = getDate(e);
    if (!d) return false;
    return new Date(d) >= sevenDaysAgo;
  }).length;

  const countryCounts: Record<string, number> = {};
  for (const e of entries) {
    const c = e.country || 'Unknown';
    countryCounts[c] = (countryCounts[c] || 0) + 1;
  }
  const top5Countries = Object.entries(countryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const deviceCounts: Record<string, number> = {};
  for (const e of entries) {
    const d = e.device || 'Unknown';
    deviceCounts[d] = (deviceCounts[d] || 0) + 1;
  }

  const recent10 = entries
    .filter((e) => getDate(e))
    .sort((a, b) => new Date(getDate(b)).getTime() - new Date(getDate(a)).getTime())
    .slice(0, 10);

  const dateLabel = now.toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Asia/Riyadh',
  });

  const countryRows = top5Countries
    .map(
      ([country, count]) =>
        `<tr><td style="padding:6px 12px;border-bottom:1px solid #1a2a3a;">${country}</td><td style="padding:6px 12px;border-bottom:1px solid #1a2a3a;text-align:right;font-weight:600;color:#FE7F32;">${count}</td></tr>`,
    )
    .join('');

  const deviceRows = Object.entries(deviceCounts)
    .map(
      ([device, count]) =>
        `<tr><td style="padding:6px 12px;border-bottom:1px solid #1a2a3a;">${device}</td><td style="padding:6px 12px;border-bottom:1px solid #1a2a3a;text-align:right;font-weight:600;color:#FE7F32;">${count}</td></tr>`,
    )
    .join('');

  const recentRows = recent10
    .map(
      (e) =>
        `<tr><td style="padding:6px 12px;border-bottom:1px solid #1a2a3a;font-size:13px;">${e.email}</td><td style="padding:6px 12px;border-bottom:1px solid #1a2a3a;font-size:13px;color:#94A6B9;">${e.country || '—'}</td><td style="padding:6px 12px;border-bottom:1px solid #1a2a3a;font-size:13px;color:#94A6B9;">${getDate(e) ? new Date(getDate(e)).toLocaleDateString('en-GB') : '—'}</td></tr>`,
    )
    .join('');

  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Hubbs Waitlist Report</title></head>
<body style="margin:0;padding:0;background:#0F1923;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#fff;">
  <div style="max-width:600px;margin:0 auto;padding:32px 24px;">

    <div style="text-align:center;margin-bottom:32px;">
      <div style="display:inline-block;background:#FE7F32;border-radius:12px;padding:10px 20px;margin-bottom:16px;">
        <span style="font-weight:700;font-size:22px;letter-spacing:-0.5px;">hubbs</span>
      </div>
      <h1 style="margin:0;font-size:24px;font-weight:700;color:#fff;">Daily Waitlist Report</h1>
      <p style="margin:8px 0 0;color:#94A6B9;font-size:14px;">${dateLabel}</p>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:28px;">
      <div style="background:#1a2a3a;border-radius:16px;padding:20px;text-align:center;">
        <div style="font-size:36px;font-weight:700;color:#FE7F32;">${total}</div>
        <div style="font-size:13px;color:#94A6B9;margin-top:4px;">Total Signups</div>
      </div>
      <div style="background:#1a2a3a;border-radius:16px;padding:20px;text-align:center;">
        <div style="font-size:36px;font-weight:700;color:#22C55E;">${todayCount}</div>
        <div style="font-size:13px;color:#94A6B9;margin-top:4px;">Today</div>
      </div>
      <div style="background:#1a2a3a;border-radius:16px;padding:20px;text-align:center;">
        <div style="font-size:36px;font-weight:700;color:#60A5FA;">${yesterdayCount}</div>
        <div style="font-size:13px;color:#94A6B9;margin-top:4px;">Yesterday</div>
      </div>
      <div style="background:#1a2a3a;border-radius:16px;padding:20px;text-align:center;">
        <div style="font-size:36px;font-weight:700;color:#A78BFA;">${last7Count}</div>
        <div style="font-size:13px;color:#94A6B9;margin-top:4px;">Last 7 Days</div>
      </div>
    </div>

    <div style="background:#1a2a3a;border-radius:16px;padding:20px;margin-bottom:20px;">
      <h2 style="margin:0 0 16px;font-size:16px;font-weight:700;">Top Countries</h2>
      <table style="width:100%;border-collapse:collapse;">
        <thead>
          <tr>
            <th style="text-align:left;padding:6px 12px;font-size:12px;color:#94A6B9;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Country</th>
            <th style="text-align:right;padding:6px 12px;font-size:12px;color:#94A6B9;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Signups</th>
          </tr>
        </thead>
        <tbody>${countryRows || '<tr><td colspan="2" style="padding:12px;text-align:center;color:#94A6B9;">No data yet</td></tr>'}</tbody>
      </table>
    </div>

    <div style="background:#1a2a3a;border-radius:16px;padding:20px;margin-bottom:20px;">
      <h2 style="margin:0 0 16px;font-size:16px;font-weight:700;">Device Split</h2>
      <table style="width:100%;border-collapse:collapse;">
        <thead>
          <tr>
            <th style="text-align:left;padding:6px 12px;font-size:12px;color:#94A6B9;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Device</th>
            <th style="text-align:right;padding:6px 12px;font-size:12px;color:#94A6B9;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Count</th>
          </tr>
        </thead>
        <tbody>${deviceRows || '<tr><td colspan="2" style="padding:12px;text-align:center;color:#94A6B9;">No data yet</td></tr>'}</tbody>
      </table>
    </div>

    <div style="background:#1a2a3a;border-radius:16px;padding:20px;margin-bottom:28px;">
      <h2 style="margin:0 0 16px;font-size:16px;font-weight:700;">Recent 10 Signups</h2>
      <table style="width:100%;border-collapse:collapse;">
        <thead>
          <tr>
            <th style="text-align:left;padding:6px 12px;font-size:12px;color:#94A6B9;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Email</th>
            <th style="text-align:left;padding:6px 12px;font-size:12px;color:#94A6B9;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Country</th>
            <th style="text-align:left;padding:6px 12px;font-size:12px;color:#94A6B9;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Date</th>
          </tr>
        </thead>
        <tbody>${recentRows || '<tr><td colspan="3" style="padding:12px;text-align:center;color:#94A6B9;">No signups yet</td></tr>'}</tbody>
      </table>
    </div>

    <div style="text-align:center;color:#94A6B9;font-size:12px;border-top:1px solid #1a2a3a;padding-top:20px;">
      Hubbs Daily Report · hubbsapp.com · Auto-sent at 8:00 AM Riyadh time
    </div>
  </div>
</body>
</html>`;

  await resend.emails.send({
    from: 'Hubbs Reports <hello@hubbsapp.com>',
    to: ['ibrahimalqawas@gmail.com'],
    subject: `📊 Hubbs Waitlist — ${total} total | ${todayCount} today | ${dateLabel}`,
    html,
  });

  const stats = { total, today: todayCount, yesterday: yesterdayCount, last7Days: last7Count, top5Countries, deviceSplit: deviceCounts };
  return NextResponse.json({ success: true, stats });
}
