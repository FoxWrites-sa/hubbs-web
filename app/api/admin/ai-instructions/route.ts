import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

const REDIS_KEY = 'ai_instructions';
const REDIS_TS_KEY = 'ai_instructions_timestamps';

type InstructionsMap = Record<string, string>;
type TimestampsMap = Record<string, string | null>;

function backendHeaders() {
  return {
    'Content-Type': 'application/json',
    token: process.env.ADMIN_SECRET_TOKEN!,
  };
}

async function syncToBackend(value: InstructionsMap) {
  const backendUrl = process.env.BACKEND_URL;
  if (!backendUrl) {
    console.warn('[ai-instructions] BACKEND_URL not set — skipping MongoDB sync');
    return;
  }
  try {
    const res = await fetch(`${backendUrl}/admin/dashboard/ai-instructions`, {
      method: 'POST',
      headers: backendHeaders(),
      body: JSON.stringify({ value }),
    });
    if (!res.ok) {
      console.error(`[ai-instructions] backend sync failed: ${res.status} ${await res.text()}`);
    }
  } catch (err) {
    console.error('[ai-instructions] backend sync error:', err);
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const [instructions, timestamps] = await Promise.all([
      redis.get<InstructionsMap>(REDIS_KEY),
      redis.get<TimestampsMap>(REDIS_TS_KEY),
    ]);
    return NextResponse.json({
      instructions: instructions ?? {},
      timestamps: timestamps ?? {},
    });
  } catch {
    return NextResponse.json({ instructions: {}, timestamps: {} });
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { agent, instructions } = await request.json();
    if (!agent || typeof instructions !== 'string') {
      return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
    }

    const [existing, existingTs] = await Promise.all([
      redis.get<InstructionsMap>(REDIS_KEY),
      redis.get<TimestampsMap>(REDIS_TS_KEY),
    ]);

    const updated: InstructionsMap = { ...(existing ?? {}), [agent]: instructions };
    const updatedTs: TimestampsMap = { ...(existingTs ?? {}), [agent]: new Date().toISOString() };

    await Promise.all([
      redis.set(REDIS_KEY, updated),
      redis.set(REDIS_TS_KEY, updatedTs),
    ]);

    // Sync full merged dict to backend MongoDB (non-blocking but logged)
    void syncToBackend(updated);

    return NextResponse.json({ success: true, updated_at: updatedTs[agent] });
  } catch {
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { agent } = await request.json();
    if (!agent) return NextResponse.json({ error: 'Invalid body' }, { status: 400 });

    const [existing, existingTs] = await Promise.all([
      redis.get<InstructionsMap>(REDIS_KEY),
      redis.get<TimestampsMap>(REDIS_TS_KEY),
    ]);

    const updated: InstructionsMap = { ...(existing ?? {}) };
    const updatedTs: TimestampsMap = { ...(existingTs ?? {}) };
    delete updated[agent];
    delete updatedTs[agent];

    await Promise.all([
      redis.set(REDIS_KEY, updated),
      redis.set(REDIS_TS_KEY, updatedTs),
    ]);

    // Sync cleared state to backend (non-blocking but logged)
    void syncToBackend(updated);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to clear' }, { status: 500 });
  }
}
