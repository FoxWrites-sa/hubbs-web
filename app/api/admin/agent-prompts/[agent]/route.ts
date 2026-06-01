import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL;
const ADMIN_TOKEN = process.env.ADMIN_SECRET_TOKEN;

export async function GET(
  _req: Request,
  { params }: { params: { agent: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!BACKEND_URL || !ADMIN_TOKEN) {
    return NextResponse.json({ error: 'Server misconfigured' }, { status: 503 });
  }
  const res = await fetch(
    `${BACKEND_URL}/admin/dashboard/agent-prompts/${params.agent}`,
    { headers: { token: ADMIN_TOKEN }, cache: 'no-store' }
  );
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

export async function POST(
  req: Request,
  { params }: { params: { agent: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!BACKEND_URL || !ADMIN_TOKEN) {
    return NextResponse.json({ error: 'Server misconfigured' }, { status: 503 });
  }
  const body = await req.json();
  const res = await fetch(
    `${BACKEND_URL}/admin/dashboard/agent-prompts/${params.agent}`,
    {
      method: 'POST',
      headers: { token: ADMIN_TOKEN, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }
  );
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
