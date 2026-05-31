import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const backendUrl = process.env.BACKEND_URL;
  const adminToken = process.env.ADMIN_SECRET_TOKEN;

  if (!backendUrl || !adminToken) {
    return NextResponse.json({ error: 'BACKEND_URL or ADMIN_SECRET_TOKEN not configured' }, { status: 503 });
  }

  try {
    const res = await fetch(`${backendUrl}/admin/dashboard/agent-prompts`, {
      headers: { token: adminToken },
      cache: 'no-store',
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (e) {
    console.error('Failed to fetch agent prompts:', e);
    return NextResponse.json({ error: 'Backend unreachable' }, { status: 503 });
  }
}
