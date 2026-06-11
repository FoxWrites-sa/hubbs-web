'use client'

import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation'

type ErrorType = 'not_found' | 'network' | 'timeout' | 'backend_not_configured' | ''

export default function InvitePage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const token = params.token as string
  const actionParam = searchParams?.get('action') || ''

  const [invitation, setInvitation] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<ErrorType>('')
  const [action, setAction] = useState(actionParam)
  const [comment, setComment] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  useEffect(() => {
    if (!token) return
    const fetchInvitation = async () => {
      try {
        const res = await fetch(`/api/invite/${token}`)
        if (!res.ok) {
          const body = await res.json().catch(() => ({}))
          setError((body.error as ErrorType) || 'not_found')
          return
        }
        const data = await res.json()
        setInvitation(data)
      } catch {
        setError('network')
      } finally {
        setLoading(false)
      }
    }
    fetchInvitation()
  }, [token])

  // Auto-submit if ?action= in URL (from email click)
  useEffect(() => {
    if (actionParam && invitation && !submitted && !submitting) {
      handleSubmit(actionParam)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionParam, invitation])

  const handleSubmit = async (act?: string) => {
    const finalAction = act || action
    if (!finalAction) return
    if (submitted || submitting) return
    setSubmitting(true)
    setSubmitError('')
    try {
      const res = await fetch(`/api/invite/${token}/respond`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: finalAction, comment }),
      })
      if (!res.ok) throw new Error('failed')
      setAction(finalAction)
      setSubmitted(true)
    } catch {
      setSubmitError('Failed to submit response. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return (
    <div style={s.container}>
      <div style={s.logo}>hubbs</div>
      <p style={s.subtitle}>Loading invitation…</p>
    </div>
  )

  if (error || !invitation) return (
    <div style={s.container}>
      <div style={s.logo}>hubbs</div>
      <div style={s.card}>
        <p style={{ fontSize: 48, textAlign: 'center', margin: '0 0 12px 0' }}>🔗</p>
        <h2 style={s.title}>Invitation Link</h2>
        <p style={s.subtitle}>
          {error === 'network' || error === 'timeout' || error === 'backend_not_configured'
            ? 'Unable to load invitation. The link may have expired or the service is temporarily unavailable. Please try again in a few minutes.'
            : 'This invitation has expired or is no longer valid.'}
        </p>
        <p style={{ color: '#94A6B9', fontSize: 13, textAlign: 'center', marginTop: 16 }}>
          If you received this via email from a Hubbs user, please contact them directly.
        </p>
      </div>
      <div style={s.downloadSection}>
        <p style={s.subtitle}>Download Hubbs App</p>
        <a href="https://apps.apple.com/app/hubbs" style={s.storeButton}>🍎 App Store</a>
      </div>
    </div>
  )

  if (submitted) return (
    <div style={s.container}>
      <div style={s.logo}>hubbs</div>
      <div style={s.card}>
        <p style={{ fontSize: 48, textAlign: 'center', margin: '0 0 12px 0' }}>
          {action === 'accept' ? '✅' : '❌'}
        </p>
        <h2 style={s.title}>
          {action === 'accept' ? 'You accepted the invitation!' : 'You declined the invitation.'}
        </h2>
        <p style={s.subtitle}>The organizer has been notified.</p>
      </div>
      <div style={s.downloadSection}>
        <p style={s.subtitle}>Manage your events with Hubbs</p>
        <a href="https://apps.apple.com/app/hubbs" style={s.storeButton}>🍎 Download on App Store</a>
      </div>
    </div>
  )

  // Derive event fields from both flat and nested formats
  const eventTitle = invitation?.event_title || invitation?.data?.title || 'Event'
  const eventDate  = invitation?.event_date  || invitation?.data?.start_datetime?.slice(0, 10) || ''
  const eventTime  = invitation?.event_time  || invitation?.data?.start_datetime?.slice(11, 16) || ''
  const eventLoc   = invitation?.event_location || invitation?.data?.location || ''
  const inviterName = invitation?.inviter_name || invitation?.data?.inviter_name || 'Someone'

  return (
    <div style={s.container}>
      <div style={s.logo}>hubbs</div>

      <div style={s.card}>
        <h2 style={s.title}>You&rsquo;re invited! 📅</h2>
        <p style={s.subtitle}>
          <strong style={{ color: '#fff' }}>{inviterName}</strong> invited you to:
        </p>

        <div style={s.eventCard}>
          <h3 style={s.eventTitle}>{eventTitle}</h3>
          {eventDate && <p style={s.eventDetail}>📅 {eventDate}</p>}
          {eventTime && <p style={s.eventDetail}>🕐 {eventTime}</p>}
          {eventLoc  && <p style={s.eventDetail}>📍 {eventLoc}</p>}
        </div>

        <p style={s.questionText}>Will you attend?</p>

        <div style={s.buttonRow}>
          <button
            onClick={() => setAction('accept')}
            style={{
              ...s.actionButton,
              backgroundColor: action === 'accept' ? '#22c55e' : '#e5e7eb',
              color: action === 'accept' ? 'white' : '#374151',
            }}
          >
            ✓ Accept
          </button>
          <button
            onClick={() => setAction('decline')}
            style={{
              ...s.actionButton,
              backgroundColor: action === 'decline' ? '#ef4444' : '#e5e7eb',
              color: action === 'decline' ? 'white' : '#374151',
            }}
          >
            ✗ Decline
          </button>
        </div>

        <textarea
          placeholder="Add a comment (optional)"
          value={comment}
          onChange={e => setComment(e.target.value)}
          style={s.commentInput}
          rows={3}
        />

        {submitError && <p style={{ color: '#ef4444', fontSize: 13, marginBottom: 12 }}>{submitError}</p>}

        <button
          onClick={() => handleSubmit()}
          disabled={!action || submitting}
          style={{ ...s.submitButton, opacity: (!action || submitting) ? 0.5 : 1 }}
        >
          {submitting ? 'Sending…' : 'Send Response'}
        </button>
      </div>

      <div style={s.downloadSection}>
        <p style={s.subtitle}>Open in Hubbs app</p>
        <a href={`hubbs://invite/${token}`} style={{ ...s.storeButton, marginBottom: 12, display: 'inline-block' }}>
          📱 Open Hubbs
        </a>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="https://apps.apple.com/app/hubbs" style={s.storeButton}>🍎 App Store</a>
          <a href="https://play.google.com/store/apps/hubbs" style={s.storeButton}>🤖 Google Play</a>
        </div>
      </div>
    </div>
  )
}

const s: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#0F1923',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '32px 20px',
    fontFamily: 'sans-serif',
  },
  logo: { fontSize: 32, fontWeight: 900, color: '#FE7F32', marginBottom: 24 },
  card: {
    backgroundColor: '#1a2532',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 480,
    marginBottom: 24,
  },
  title: { color: 'white', fontSize: 22, fontWeight: 700, marginBottom: 8, marginTop: 0 },
  subtitle: { color: '#94A6B9', fontSize: 14, marginBottom: 16 },
  eventCard: {
    backgroundColor: '#0F1923',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeft: '3px solid #FE7F32',
  },
  eventTitle: { color: 'white', fontSize: 18, fontWeight: 700, margin: '0 0 8px 0' },
  eventDetail: { color: '#94A6B9', fontSize: 14, margin: '4px 0' },
  questionText: { color: 'white', fontSize: 16, fontWeight: 600, marginBottom: 12 },
  buttonRow: { display: 'flex', gap: 12, marginBottom: 16 },
  actionButton: {
    flex: 1,
    padding: '12px 0',
    borderRadius: 8,
    border: 'none',
    fontSize: 16,
    fontWeight: 600,
    cursor: 'pointer',
  },
  commentInput: {
    width: '100%',
    backgroundColor: '#0F1923',
    border: '1px solid #2a3a4a',
    borderRadius: 8,
    padding: 12,
    color: 'white',
    fontSize: 14,
    marginBottom: 16,
    resize: 'none',
    boxSizing: 'border-box',
  },
  submitButton: {
    width: '100%',
    backgroundColor: '#FE7F32',
    color: 'white',
    padding: '14px 0',
    borderRadius: 8,
    border: 'none',
    fontSize: 16,
    fontWeight: 700,
    cursor: 'pointer',
  },
  downloadSection: { textAlign: 'center' },
  storeButton: {
    display: 'inline-block',
    backgroundColor: '#1a2532',
    color: 'white',
    padding: '12px 24px',
    borderRadius: 8,
    textDecoration: 'none',
    fontWeight: 600,
  },
}
