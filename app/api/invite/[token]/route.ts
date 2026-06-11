import { NextResponse } from 'next/server'

const BACKEND = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_HUBBS_API_URL || 'https://api.hubbsapp.com'

export async function GET(
  _request: Request,
  { params }: { params: { token: string } },
) {
  try {
    // Try the unified invitations link endpoint first (checks both collections)
    const res = await fetch(
      `${BACKEND}/api/invitations/link/${params.token}`,
      { cache: 'no-store' },
    )
    if (res.ok) {
      const data = await res.json()
      return NextResponse.json(data)
    }
    // Fallback: try calendar-specific token endpoint
    const calRes = await fetch(
      `${BACKEND}/api/calendar/invitations/token/${params.token}`,
      { cache: 'no-store' },
    )
    if (calRes.ok) {
      const data = await calRes.json()
      return NextResponse.json(data)
    }
    return NextResponse.json({ error: 'Invitation not found' }, { status: 404 })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
