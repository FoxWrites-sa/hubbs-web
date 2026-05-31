'use client';

import { signIn } from 'next-auth/react';

export default function AdminLoginPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#0F1923',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        padding: '24px',
      }}
    >
      <div
        style={{
          background: '#1F2937',
          borderRadius: '20px',
          padding: '48px 40px',
          width: '100%',
          maxWidth: '400px',
          textAlign: 'center',
          border: '1px solid #374151',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        }}
      >
        {/* Logo */}
        <div style={{ marginBottom: '32px' }}>
          <span
            style={{
              fontSize: '32px',
              fontWeight: '900',
              color: '#FE7F32',
              letterSpacing: '-1px',
              display: 'block',
            }}
          >
            hubbs
          </span>
          <span
            style={{
              fontSize: '12px',
              color: '#4B5563',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontWeight: '600',
            }}
          >
            Admin Panel
          </span>
        </div>

        <h1
          style={{
            fontSize: '22px',
            fontWeight: '700',
            color: '#F9FAFB',
            marginBottom: '8px',
          }}
        >
          Admin Login
        </h1>
        <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '32px', lineHeight: '1.5' }}>
          Sign in with your Google account to access the dashboard.
        </p>

        <button
          onClick={() => signIn('google', { callbackUrl: '/admin' })}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            width: '100%',
            padding: '14px 24px',
            backgroundColor: '#294C72',
            color: '#fff',
            border: 'none',
            borderRadius: '12px',
            fontSize: '15px',
            fontWeight: '700',
            cursor: 'pointer',
            marginBottom: '24px',
            transition: 'background 0.2s',
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#1e3a57')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#294C72')}
        >
          {/* Google icon */}
          <svg width="20" height="20" viewBox="0 0 48 48" fill="none">
            <path d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z" fill="#FFC107" />
            <path d="M6.3 14.7l7 5.1C15.1 16.1 19.2 13 24 13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 16.3 2 9.7 7.4 6.3 14.7z" fill="#FF3D00" />
            <path d="M24 46c5.5 0 10.4-1.9 14.3-5.1l-6.6-5.4C29.7 37.1 27 38 24 38c-6.1 0-11.2-3.9-13.1-9.4l-7 5.4C7.5 41.9 15.1 46 24 46z" fill="#4CAF50" />
            <path d="M44.5 20H24v8.5h11.8c-.9 2.8-2.8 5.1-5.3 6.6l6.6 5.4C41.3 36.9 45 31 45 24c0-1.3-.2-2.7-.5-4z" fill="#1976D2" />
          </svg>
          Sign in with Google
        </button>

        <p style={{ fontSize: '12px', color: '#4B5563', lineHeight: '1.5' }}>
          Access restricted to authorized administrators only.
        </p>
      </div>
    </div>
  );
}
