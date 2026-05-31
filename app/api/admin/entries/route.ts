import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

interface WaitlistEntry {
  email: string;
  timestamp: string;
  source: string;
  country: string;
  device: string;
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
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
