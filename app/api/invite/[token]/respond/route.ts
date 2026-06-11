import { NextResponse } from 'next/server'

const BACKEND = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_HUBBS_API_URL || 'https://api.hubbsapp.com'

export async function POST(
  request: Request,
  { params }: { params: { token: string } },
) {
  try {
    const body = await request.json()
    // Normalize: accept both "action" (accept/decline) and "response" (accepted/declined)
    const response = body.response || (body.action === 'accept' ? 'accepted' : body.action === 'decline' ? 'declined' : body.action)
    const comment = body.comment || ''

    const res = await fetch(
      `${BACKEND}/api/invitations/link/${params.token}/respond`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ response, comment }),
      },
    )
    const data = await res.json()
    if (!res.ok) return NextResponse.json(data, { status: res.status })
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
