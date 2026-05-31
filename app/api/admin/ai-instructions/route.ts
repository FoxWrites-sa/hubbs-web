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

  const body = await request.json();
  const { agent, instructions } = body;

  console.log('[ai-instructions] POST body:', { agent, instructionsLength: instructions?.length });

  if (!agent || typeof instructions !== 'string') {
    return NextResponse.json({ error: 'Invalid body: agent and instructions required' }, { status: 400 });
  }

  // Step 1: Get existing from Redis
  let existing: InstructionsMap = {};
  let existingTs: TimestampsMap = {};
  try {
    const [storedInstr, storedTs] = await Promise.all([
      redis.get<InstructionsMap>(REDIS_KEY),
      redis.get<TimestampsMap>(REDIS_TS_KEY),
    ]);
    existing = storedInstr ?? {};
    existingTs = storedTs ?? {};
    console.log('[ai-instructions] existing agents in Redis:', Object.keys(existing));
  } catch (e) {
    console.error('[ai-instructions] Redis get error:', e);
  }

  // Step 2: Merge
  const updated: InstructionsMap = { ...existing, [agent]: instructions };
  const updatedTs: TimestampsMap = { ...existingTs, [agent]: new Date().toISOString() };
  console.log('[ai-instructions] merged agents:', Object.keys(updated));

  // Step 3: Save to Redis
  try {
    await Promise.all([
      redis.set(REDIS_KEY, updated),
      redis.set(REDIS_TS_KEY, updatedTs),
    ]);
    console.log('[ai-instructions] saved to Redis successfully');
  } catch (e) {
    console.error('[ai-instructions] Redis set error:', e);
    return NextResponse.json({ error: 'Failed to save to Redis' }, { status: 500 });
  }

  // Step 4: Sync to MongoDB via backend (blocking — we want to know if it failed)
  const backendUrl = process.env.BACKEND_URL;
  const adminToken = process.env.ADMIN_SECRET_TOKEN;

  console.log('[ai-instructions] BACKEND_URL set:', !!backendUrl);
  console.log('[ai-instructions] ADMIN_SECRET_TOKEN set:', !!adminToken);

  if (!backendUrl || !adminToken) {
    console.error('[ai-instructions] Missing BACKEND_URL or ADMIN_SECRET_TOKEN — MongoDB sync skipped');
    return NextResponse.json({
      success: true,
      updated_at: updatedTs[agent],
      warning: 'Saved to Redis only. Set BACKEND_URL and ADMIN_SECRET_TOKEN in Vercel env to sync to MongoDB.',
    });
  }

  try {
    const syncRes = await fetch(`${backendUrl}/admin/dashboard/ai-instructions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', token: adminToken },
      body: JSON.stringify({ value: updated }),
    });
    const syncData = await syncRes.json().catch(() => ({}));
    console.log('[ai-instructions] MongoDB sync response:', syncRes.status, syncData);

    if (!syncRes.ok) {
      console.error('[ai-instructions] MongoDB sync failed:', syncRes.status, syncData);
      return NextResponse.json({
        success: true,
        updated_at: updatedTs[agent],
        warning: `Saved to Redis but MongoDB sync failed (${syncRes.status}). Buddy may not see updated instructions until backend syncs.`,
      });
    }

    console.log('[ai-instructions] MongoDB sync successful');
  } catch (e) {
    console.error('[ai-instructions] MongoDB sync error (backend unreachable):', e);
    return NextResponse.json({
      success: true,
      updated_at: updatedTs[agent],
      warning: 'Saved to Redis but backend unreachable for MongoDB sync.',
    });
  }

  return NextResponse.json({
    success: true,
    updated_at: updatedTs[agent],
  });
}

export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { agent } = await request.json();
  if (!agent) return NextResponse.json({ error: 'Invalid body: agent required' }, { status: 400 });

  console.log('[ai-instructions] DELETE agent:', agent);

  // Step 1: Get existing from Redis
  let existing: InstructionsMap = {};
  let existingTs: TimestampsMap = {};
  try {
    const [storedInstr, storedTs] = await Promise.all([
      redis.get<InstructionsMap>(REDIS_KEY),
      redis.get<TimestampsMap>(REDIS_TS_KEY),
    ]);
    existing = storedInstr ?? {};
    existingTs = storedTs ?? {};
  } catch (e) {
    console.error('[ai-instructions] Redis get error:', e);
  }

  // Step 2: Remove agent
  const updated: InstructionsMap = { ...existing };
  const updatedTs: TimestampsMap = { ...existingTs };
  delete updated[agent];
  delete updatedTs[agent];

  // Step 3: Save to Redis
  try {
    await Promise.all([
      redis.set(REDIS_KEY, updated),
      redis.set(REDIS_TS_KEY, updatedTs),
    ]);
    console.log('[ai-instructions] cleared from Redis, remaining agents:', Object.keys(updated));
  } catch (e) {
    console.error('[ai-instructions] Redis set error:', e);
    return NextResponse.json({ error: 'Failed to clear from Redis' }, { status: 500 });
  }

  // Step 4: Sync cleared state to MongoDB
  const backendUrl = process.env.BACKEND_URL;
  const adminToken = process.env.ADMIN_SECRET_TOKEN;

  if (backendUrl && adminToken) {
    try {
      const syncRes = await fetch(`${backendUrl}/admin/dashboard/ai-instructions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', token: adminToken },
        body: JSON.stringify({ value: updated }),
      });
      console.log('[ai-instructions] DELETE MongoDB sync status:', syncRes.status);
    } catch (e) {
      console.error('[ai-instructions] DELETE MongoDB sync error:', e);
    }
  } else {
    console.warn('[ai-instructions] DELETE: BACKEND_URL not set, MongoDB not updated');
  }

  return NextResponse.json({ success: true });
}
