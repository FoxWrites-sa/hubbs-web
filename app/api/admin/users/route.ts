import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

const BACKEND_URL = process.env.BACKEND_URL;
const ADMIN_TOKEN = process.env.ADMIN_SECRET_TOKEN;

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  if (!BACKEND_URL) return NextResponse.json({ error: 'BACKEND_URL not configured' }, { status: 500 });

  try {
    const res = await fetch(`${BACKEND_URL}/admin/dashboard/users`, {
      headers: { token: ADMIN_TOKEN! },
      cache: 'no-store',
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Backend unreachable' }, { status: 502 });
  }
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  if (!BACKEND_URL || !ADMIN_TOKEN) return NextResponse.json({ error: 'Server misconfigured' }, { status: 503 });

  let userId: string;
  try {
    const body = await request.json();
    userId = body.userId;
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  if (!userId) return NextResponse.json({ error: 'userId required' }, { status: 400 });

  try {
    const res = await fetch(`${BACKEND_URL}/admin/dashboard/users/${userId}`, {
      method: 'DELETE',
      headers: { token: ADMIN_TOKEN },
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ error: 'Backend unreachable' }, { status: 503 });
  }
}
