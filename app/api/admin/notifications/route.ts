import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const backendUrl = process.env.BACKEND_URL;
  const token = process.env.ADMIN_SECRET_TOKEN;

  if (!backendUrl) return NextResponse.json({ error: 'BACKEND_URL not configured' }, { status: 500 });

  try {
    const res = await fetch(`${backendUrl}/admin/notifications/history`, {
      headers: { token: token! },
      cache: 'no-store',
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const backendUrl = process.env.BACKEND_URL;
  const token = process.env.ADMIN_SECRET_TOKEN;

  if (!backendUrl) return NextResponse.json({ error: 'BACKEND_URL not configured' }, { status: 500 });

  try {
    const body = await request.json();
    const res = await fetch(`${backendUrl}/admin/notifications/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', token: token! },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Backend unreachable' }, { status: 502 });
  }
}
