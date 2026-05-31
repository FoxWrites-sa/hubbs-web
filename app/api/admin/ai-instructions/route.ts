import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

function backendHeaders() {
  return {
    'Content-Type': 'application/json',
    token: process.env.ADMIN_SECRET_TOKEN!,
  };
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const backendUrl = process.env.BACKEND_URL;
  if (!backendUrl) return NextResponse.json({ instructions: '', updated_at: null });

  try {
    const res = await fetch(`${backendUrl}/admin/dashboard/ai-instructions`, {
      headers: backendHeaders(),
      cache: 'no-store',
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ instructions: '', updated_at: null });
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const backendUrl = process.env.BACKEND_URL;
  if (!backendUrl) return NextResponse.json({ error: 'BACKEND_URL not configured' }, { status: 500 });

  try {
    const body = await request.json();
    const res = await fetch(`${backendUrl}/admin/dashboard/ai-instructions`, {
      method: 'POST',
      headers: backendHeaders(),
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json({ error: err }, { status: res.status });
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Backend unreachable' }, { status: 502 });
  }
}

export async function DELETE() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const backendUrl = process.env.BACKEND_URL;
  if (!backendUrl) return NextResponse.json({ error: 'BACKEND_URL not configured' }, { status: 500 });

  try {
    await fetch(`${backendUrl}/admin/dashboard/ai-instructions`, {
      method: 'DELETE',
      headers: backendHeaders(),
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Backend unreachable' }, { status: 502 });
  }
}
