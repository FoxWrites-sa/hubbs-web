import { NextResponse } from 'next/server'

const BACKEND_URL =
  process.env.BACKEND_URL ||
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  process.env.NEXT_PUBLIC_HUBBS_API_URL ||
  ''

export async function GET(
  _request: Request,
  { params }: { params: { token: string } },
) {
  console.log('[invite] Fetching token:', params.token)
  console.log('[invite] Backend URL:', BACKEND_URL || '(not set)')

  if (!BACKEND_URL) {
    console.warn('[invite] BACKEND_URL not set in Vercel env vars — cannot reach backend')
    return NextResponse.json(
      { error: 'backend_not_configured', message: 'Backend URL not configured' },
      { status: 503 },
    )
  }

  try {
    // Primary: unified invitations link endpoint (checks both collections)
    const url = `${BACKEND_URL}/api/invitations/link/${params.token}`
    console.log('[invite] Requesting:', url)
    const res = await fetch(url, {
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(8000),
    })
    console.log('[invite] Backend status:', res.status)

    if (res.ok) {
      const data = await res.json()
      return NextResponse.json(data)
    }

    // Fallback: calendar-specific token endpoint
    const calUrl = `${BACKEND_URL}/api/calendar/invitations/token/${params.token}`
    const calRes = await fetch(calUrl, {
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(8000),
    })
    console.log('[invite] Calendar fallback status:', calRes.status)

    if (calRes.ok) {
      const data = await calRes.json()
      return NextResponse.json(data)
    }

    const errText = await res.text().catch(() => '')
    console.log('[invite] Backend error body:', errText)
    return NextResponse.json({ error: 'not_found' }, { status: 404 })
  } catch (e: any) {
    const isTimeout = e?.name === 'TimeoutError' || e?.name === 'AbortError'
    console.error('[invite] Error:', isTimeout ? 'timeout' : e)
    return NextResponse.json(
      { error: isTimeout ? 'timeout' : 'network' },
      { status: 503 },
    )
  }
}
