'use client';

import { useState } from 'react';

const WA_SHARE_URL =
  'https://wa.me/?text=Check%20out%20Hubbs%20%E2%80%94%20a%20family%20wellness%20app%20for%20Muslim%20families!%20hubbsapp.com%2Fwaitlist';
const WAITLIST_URL = 'https://hubbsapp.com/waitlist';

export default function WaitlistPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  }

  function copyLink() {
    navigator.clipboard.writeText(WAITLIST_URL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#FFFBF7',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
      }}
    >
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '48px' }}>
        <svg width="40" height="48" viewBox="0 0 36 44" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible', flexShrink: 0 }}>
          <circle cx="9" cy="6" r="6" fill="#FE7F32" />
          <rect x="4" y="14" width="10" height="22" rx="5" fill="#FE7F32" />
          <circle cx="27" cy="6" r="6" fill="#FE7F32" />
          <rect x="22" y="14" width="10" height="22" rx="5" fill="#FE7F32" />
          <rect x="14" y="20" width="8" height="8" rx="2" fill="#FE7F32" />
        </svg>
        <span style={{ fontWeight: '700', fontSize: '24px', color: '#294C72', letterSpacing: '-0.5px' }}>
          hubbs
        </span>
      </div>

      {/* Card */}
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          background: '#FFFFFF',
          borderRadius: '28px',
          padding: '40px 32px',
          boxShadow: '0 4px 40px rgba(41,76,114,0.10)',
          textAlign: 'center',
        }}
      >
        {submitted ? (
          <>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🧡</div>
            <h1
              style={{
                fontFamily: 'Astonpoliz, Georgia, serif',
                fontSize: '28px',
                color: '#294C72',
                marginBottom: '10px',
                lineHeight: '1.2',
              }}
            >
              You&apos;re on the list!
            </h1>
            <p style={{ color: '#5F7995', fontSize: '16px', lineHeight: '1.6', marginBottom: '28px' }}>
              Share Hubbs with one family member and help us grow.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a
                href={WA_SHARE_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                  background: '#25D366', color: '#fff',
                  padding: '14px 24px', borderRadius: '999px',
                  fontWeight: '700', fontSize: '15px', textDecoration: 'none',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Share on WhatsApp
              </a>
              <button
                onClick={copyLink}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  background: copied ? '#e8f5e9' : '#F7F3EF',
                  color: copied ? '#2e7d32' : '#294C72',
                  border: '1px solid ' + (copied ? '#c8e6c9' : '#e5e7eb'),
                  padding: '14px 24px', borderRadius: '999px',
                  fontWeight: '700', fontSize: '15px', cursor: 'pointer',
                }}
              >
                {copied ? '✓ Copied!' : '🔗 Copy link'}
              </button>
            </div>
          </>
        ) : (
          <>
            <h1
              style={{
                fontFamily: 'Astonpoliz, Georgia, serif',
                fontSize: '30px',
                color: '#294C72',
                marginBottom: '10px',
                lineHeight: '1.2',
              }}
            >
              Join the Waitlist
            </h1>
            <p style={{ color: '#5F7995', fontSize: '15px', lineHeight: '1.6', marginBottom: '28px' }}>
              Be among the first 1,000 families to get access to Hubbs.
            </p>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                style={{
                  padding: '14px 18px',
                  borderRadius: '14px',
                  border: '1.5px solid #e5e7eb',
                  fontSize: '15px',
                  color: '#294C72',
                  outline: 'none',
                  background: '#FFFBF7',
                }}
              />
              <button
                type="submit"
                style={{
                  padding: '14px',
                  borderRadius: '14px',
                  background: '#FE7F32',
                  color: '#fff',
                  border: 'none',
                  fontSize: '16px',
                  fontWeight: '700',
                  cursor: 'pointer',
                }}
              >
                Join the Waitlist
              </button>
            </form>
            <p style={{ color: '#94A6B9', fontSize: '12px', marginTop: '14px' }}>
              No spam. Unsubscribe anytime.
            </p>
          </>
        )}
      </div>

      <p style={{ color: '#94A6B9', fontSize: '13px', marginTop: '32px' }}>
        © 2026 Hubbs. Made with love for families everywhere.
      </p>
    </div>
  );
}
