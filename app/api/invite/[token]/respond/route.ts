import { NextResponse } from 'next/server'

const BACKEND_URL =
  process.env.BACKEND_URL ||
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  process.env.NEXT_PUBLIC_HUBBS_API_URL ||
  ''

export async function POST(
  request: Request,
  { params }: { params: { token: string } },
) {
  try {
    const body = await request.json()
    const rawAction = body.action || body.response || ''
    // Normalize action → accepted/declined
    const response =
      rawAction === 'accept' || rawAction === 'accepted'
        ? 'accepted'
        : rawAction === 'decline' || rawAction === 'declined'
        ? 'declined'
        : rawAction
    const comment = body.comment || ''

    console.log('[invite] Responding to:', params.token, 'response:', response)
    console.log('[invite] Backend URL:', BACKEND_URL || '(not set)')

    if (!BACKEND_URL) {
      console.warn('[invite] BACKEND_URL not set in Vercel env vars')
      return NextResponse.json({ error: 'backend_not_configured' }, { status: 503 })
    }

    const res = await fetch(
      `${BACKEND_URL}/api/invitations/link/${params.token}/respond`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ response, comment }),
        signal: AbortSignal.timeout(8000),
      },
    )
    const data = await res.json()
    console.log('[invite] Respond status:', res.status)
    if (!res.ok) return NextResponse.json(data, { status: res.status })
    return NextResponse.json(data)
  } catch (e: any) {
    const isTimeout = e?.name === 'TimeoutError' || e?.name === 'AbortError'
    console.error('[invite] Respond error:', isTimeout ? 'timeout' : e)
    return NextResponse.json({ error: isTimeout ? 'timeout' : 'network' }, { status: 503 })
  }
}
