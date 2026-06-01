import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL;
const ADMIN_TOKEN = process.env.ADMIN_SECRET_TOKEN;

export async function POST(
  _req: Request,
  { params }: { params: { agent: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!BACKEND_URL || !ADMIN_TOKEN) {
    return NextResponse.json({ error: 'Server misconfigured' }, { status: 503 });
  }
  const res = await fetch(
    `${BACKEND_URL}/admin/dashboard/agent-prompts/${params.agent}/restore-backup`,
    { method: 'POST', headers: { token: ADMIN_TOKEN } }
  );
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
