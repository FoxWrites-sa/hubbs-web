import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import { Resend } from 'resend';

// Note: @vercel/kv is deprecated; Vercel now routes KV stores through Upstash Redis
// (visible under Vercel Integrations). The package API remains the same.
// Required env vars: KV_URL, KV_REST_API_URL, KV_REST_API_TOKEN, RESEND_API_KEY

const resend = new Resend(process.env.RESEND_API_KEY);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  let body: { email?: string; source?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid request body' }, { status: 400 });
  }

  const { email, source = 'homepage' } = body;

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ success: false, message: 'Please enter a valid email address.' }, { status: 400 });
  }

  const normalized = email.toLowerCase().trim();

  const existing = await kv.get(`waitlist:${normalized}`);
  if (existing) {
    return NextResponse.json({ success: true, message: "You're already on the list!" });
  }

  const userAgent = request.headers.get('user-agent') ?? '';
  const entry = {
    email: normalized,
    timestamp: new Date().toISOString(),
    source,
    country: request.headers.get('x-vercel-ip-country') ?? 'unknown',
    device: /mobile|android|iphone|ipad/i.test(userAgent) ? 'mobile' : 'desktop',
  };

  await kv.set(`waitlist:${normalized}`, entry);
  await kv.sadd('waitlist:emails', normalized);

  try {
    await resend.emails.send({
      from: 'Hubbs <hello@hubbsapp.com>',
      to: normalized,
      subject: "You're on the Hubbs waitlist! 🧡",
      html: `
        <!DOCTYPE html>
        <html>
        <head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
        <body style="margin:0;padding:0;background:#FFFBF7;font-family:Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#FFFBF7;padding:40px 0;">
            <tr><td align="center">
              <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#fff;border-radius:24px;padding:40px 32px;box-shadow:0 4px 40px rgba(41,76,114,0.1);">
                <tr><td align="center" style="padding-bottom:24px;">
                  <svg width="40" height="48" viewBox="0 0 36 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="9" cy="6" r="6" fill="#FE7F32"/>
                    <rect x="4" y="14" width="10" height="22" rx="5" fill="#FE7F32"/>
                    <circle cx="27" cy="6" r="6" fill="#FE7F32"/>
                    <rect x="22" y="14" width="10" height="22" rx="5" fill="#FE7F32"/>
                    <rect x="14" y="20" width="8" height="8" rx="2" fill="#FE7F32"/>
                  </svg>
                  <div style="font-weight:700;font-size:22px;color:#294C72;margin-top:8px;letter-spacing:-0.5px;">hubbs</div>
                </td></tr>
                <tr><td style="font-size:40px;text-align:center;padding-bottom:16px;">🧡</td></tr>
                <tr><td align="center" style="padding-bottom:12px;">
                  <h1 style="margin:0;font-size:26px;font-weight:700;color:#294C72;line-height:1.2;">You&rsquo;re on the list!</h1>
                </td></tr>
                <tr><td align="center" style="padding-bottom:28px;">
                  <p style="margin:0;color:#5F7995;font-size:16px;line-height:1.6;">
                    Welcome to the Hubbs family. We&rsquo;ll reach out as soon as we launch&nbsp;&mdash; you&rsquo;re among the first.
                  </p>
                </td></tr>
                <tr><td align="center" style="padding-bottom:28px;">
                  <a href="https://wa.me/?text=Check%20out%20Hubbs%20%E2%80%94%20a%20family%20wellness%20app%20for%20Muslim%20families!%20hubbsapp.com%2Fwaitlist"
                     style="display:inline-block;background:#25D366;color:#fff;padding:14px 28px;border-radius:999px;font-weight:700;font-size:15px;text-decoration:none;">
                    Share with a family member
                  </a>
                </td></tr>
                <tr><td align="center">
                  <p style="margin:0;color:#94A6B9;font-size:12px;">
                    &copy; 2026 Hubbs. Made with love for families everywhere.<br>
                    <a href="https://hubbsapp.com" style="color:#FE7F32;text-decoration:none;">hubbsapp.com</a>
                  </p>
                </td></tr>
              </table>
            </td></tr>
          </table>
        </body>
        </html>
      `,
    });
  } catch (err) {
    console.error('Resend error:', err);
  }

  return NextResponse.json({ success: true, message: "You're on the waitlist!" });
}
