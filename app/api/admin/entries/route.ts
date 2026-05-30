import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

// TODO: Replace hardcoded password with proper auth (NextAuth or Clerk) before scaling.
const ADMIN_PASSWORD = 'hubbs2025admin';

interface WaitlistEntry {
  email: string;
  timestamp: string;
  source: string;
  country: string;
  device: string;
}

export async function GET(request: NextRequest) {
  const pw = request.headers.get('x-admin-password');
  if (pw !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const emails: string[] = await redis.smembers('waitlist:emails');
  if (!emails.length) return NextResponse.json({ entries: [] });

  const raw = await Promise.all(emails.map((e) => redis.get<WaitlistEntry>(`waitlist:${e}`)));
  const entries = (raw.filter(Boolean) as WaitlistEntry[]).sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return NextResponse.json({ entries });
}
