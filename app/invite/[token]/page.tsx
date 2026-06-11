'use client'

import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation'

export default function InvitePage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const token = params.token as string
  const actionParam = searchParams?.get('action') || ''

  const [invitation, setInvitation] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [action, setAction] = useState(actionParam)
  const [comment, setComment] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!token) return
    const fetchInvitation = async () => {
      try {
        const res = await fetch(`/api/invite/${token}`)
        if (!res.ok) throw new Error('Not found')
        const data = await res.json()
        setInvitation(data)
      } catch {
        setError('This invitation has expired or is no longer valid.')
      } finally {
        setLoading(false)
      }
    }
    fetchInvitation()
  }, [token])

  // Auto-submit if action in URL (from email click)
  useEffect(() => {
    if (actionParam && invitation && !submitted && !submitting) {
      handleSubmit(actionParam)
    }
  }, [actionParam, invitation])

  const handleSubmit = async (act?: string) => {
    const finalAction = act || action
    if (!finalAction) return
    if (submitted || submitting) return
    setSubmitting(true)
    try {
      const res = await fetch(`/api/invite/${token}/respond`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: finalAction, response: finalAction === 'accept' ? 'accepted' : 'declined', comment }),
      })
      if (!res.ok) throw new Error('Failed')
      setAction(finalAction)
      setSubmitted(true)
    } catch {
      setError('Failed to submit response. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return (
    <div style={styles.container}>
      <div style={styles.logo}>hubbs</div>
      <p style={styles.subtitle}>Loading...</p>
    </div>
  )

  if (error && !invitation) return (
    <div style={styles.container}>
      <div style={styles.logo}>hubbs</div>
      <p style={styles.errorText}>{error}</p>
      <div style={styles.downloadSection}>
        <p style={styles.subtitle}>Download Hubbs</p>
        <a href="https://apps.apple.com/app/hubbs" style={styles.storeButton}>🍎 App Store</a>
      </div>
    </div>
  )

  if (submitted) return (
    <div style={styles.container}>
      <div style={styles.logo}>hubbs</div>
      <div style={styles.card}>
        <p style={{ fontSize: 48, margin: '0 0 12px 0' }}>{action === 'accept' ? '✅' : '❌'}</p>
        <h2 style={styles.title}>
          {action === 'accept' ? 'You accepted the invitation!' : 'You declined the invitation.'}
        </h2>
        <p style={styles.subtitle}>The organizer has been notified.</p>
      </div>
      <div style={styles.downloadSection}>
        <p style={styles.subtitle}>Manage your events with Hubbs</p>
        <a href="https://apps.apple.com/app/hubbs" style={styles.storeButton}>🍎 Download on App Store</a>
      </div>
    </div>
  )

  return (
    <div style={styles.container}>
      <div style={styles.logo}>hubbs</div>

      <div style={styles.card}>
        <h2 style={styles.title}>You&rsquo;re invited! 📅</h2>
        <p style={styles.subtitle}>
          <strong style={{ color: '#fff' }}>{invitation?.inviter_name || invitation?.data?.inviter_name}</strong> invited you to:
        </p>

        <div style={styles.eventCard}>
          <h3 style={styles.eventTitle}>
            {invitation?.event_title || invitation?.data?.title || 'Event'}
          </h3>
          {(invitation?.event_date || invitation?.data?.start_datetime) && (
            <p style={styles.eventDetail}>
              📅 {invitation?.event_date || invitation?.data?.start_datetime?.slice(0, 10)}
            </p>
          )}
          {(invitation?.event_time || (invitation?.data?.start_datetime || '').includes('T')) && (
            <p style={styles.eventDetail}>
              🕐 {invitation?.event_time || invitation?.data?.start_datetime?.slice(11, 16)}
            </p>
          )}
          {(invitation?.event_location || invitation?.data?.location) && (
            <p style={styles.eventDetail}>📍 {invitation?.event_location || invitation?.data?.location}</p>
          )}
        </div>

        <p style={styles.questionText}>Will you attend?</p>

        <div style={styles.buttonRow}>
          <button
            onClick={() => setAction('accept')}
            style={{
              ...styles.actionButton,
              backgroundColor: action === 'accept' ? '#22c55e' : '#e5e7eb',
              color: action === 'accept' ? 'white' : '#374151',
            }}
          >
            ✓ Accept
          </button>
          <button
            onClick={() => setAction('decline')}
            style={{
              ...styles.actionButton,
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
          style={styles.commentInput}
          rows={3}
        />

        {error && <p style={styles.errorText}>{error}</p>}

        <button
          onClick={() => handleSubmit()}
          disabled={!action || submitting}
          style={{ ...styles.submitButton, opacity: (!action || submitting) ? 0.5 : 1 }}
        >
          {submitting ? 'Sending...' : 'Send Response'}
        </button>
      </div>

      <div style={styles.downloadSection}>
        <p style={styles.subtitle}>Open in Hubbs app</p>
        <a href={`hubbs://invite/${token}`} style={styles.storeButton}>📱 Open Hubbs</a>
        <div style={{ marginTop: 12 }}>
          <a href="https://apps.apple.com/app/hubbs" style={{ ...styles.storeButton, marginRight: 8 }}>🍎 App Store</a>
          <a href="https://play.google.com/store/apps/hubbs" style={styles.storeButton}>🤖 Google Play</a>
        </div>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#0F1923',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '32px 20px',
    fontFamily: 'sans-serif',
  },
  logo: {
    fontSize: 32,
    fontWeight: 900,
    color: '#FE7F32',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#1a2532',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 480,
    marginBottom: 24,
  },
  title: {
    color: 'white',
    fontSize: 22,
    fontWeight: 700,
    marginBottom: 8,
    marginTop: 0,
  },
  subtitle: {
    color: '#94A6B9',
    fontSize: 14,
    marginBottom: 16,
  },
  eventCard: {
    backgroundColor: '#0F1923',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeft: '3px solid #FE7F32',
  },
  eventTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 700,
    margin: '0 0 8px 0',
  },
  eventDetail: {
    color: '#94A6B9',
    fontSize: 14,
    margin: '4px 0',
  },
  questionText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 12,
  },
  buttonRow: {
    display: 'flex',
    gap: 12,
    marginBottom: 16,
  },
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
  downloadSection: {
    textAlign: 'center',
  },
  storeButton: {
    display: 'inline-block',
    backgroundColor: '#1a2532',
    color: 'white',
    padding: '12px 24px',
    borderRadius: 8,
    textDecoration: 'none',
    fontWeight: 600,
  },
  errorText: {
    color: '#ef4444',
    textAlign: 'center',
    marginBottom: 16,
    marginTop: 0,
  },
}
