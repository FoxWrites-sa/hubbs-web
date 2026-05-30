'use client';

// TODO: Replace hardcoded password with proper auth (NextAuth or Clerk) before scaling.
const ADMIN_PASSWORD = 'hubbs2025admin';

import { useState, useEffect, useCallback } from 'react';

interface WaitlistEntry {
  email: string;
  timestamp: string;
  source: string;
  country: string;
  device: string;
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString('en-GB', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  } catch {
    return iso;
  }
}

function exportCsv(entries: WaitlistEntry[]) {
  const rows = [
    ['#', 'Email', 'Date', 'Country', 'Device', 'Source'],
    ...entries.map((e, i) => [
      String(i + 1),
      e.email,
      formatDate(e.timestamp),
      e.country,
      e.device,
      e.source,
    ]),
  ];
  const csv = rows.map((r) => r.map((c) => `"${c.replace(/"/g, '""')}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const date = new Date().toISOString().slice(0, 10);
  a.href = url;
  a.download = `hubbs-waitlist-${date}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState('');
  const [error, setError] = useState('');
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('hubbs_admin') === '1') {
      setAuthed(true);
    }
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/entries', {
        headers: { 'x-admin-password': ADMIN_PASSWORD },
      });
      if (!res.ok) throw new Error('Unauthorized');
      const data = await res.json();
      setEntries(data.entries ?? []);
    } catch {
      setEntries([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authed) load();
  }, [authed, load]);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) {
      sessionStorage.setItem('hubbs_admin', '1');
      setAuthed(true);
      setError('');
    } else {
      setError('Incorrect password.');
    }
  }

  function handleLogout() {
    sessionStorage.removeItem('hubbs_admin');
    setAuthed(false);
    setEntries([]);
  }

  const today = entries.filter(
    (e) => new Date(e.timestamp).toDateString() === new Date().toDateString()
  ).length;

  if (!authed) {
    return (
      <div style={{ minHeight: '100vh', background: '#FFFBF7', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div style={{ background: '#fff', borderRadius: '24px', padding: '40px 32px', maxWidth: '360px', width: '100%', boxShadow: '0 4px 40px rgba(41,76,114,0.1)', textAlign: 'center' }}>
          <div style={{ fontWeight: '700', fontSize: '22px', color: '#294C72', marginBottom: '8px' }}>hubbs admin</div>
          <p style={{ color: '#5F7995', fontSize: '14px', marginBottom: '24px' }}>Waitlist Dashboard</p>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <input
              type="password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              placeholder="Password"
              autoFocus
              style={{ padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e5e7eb', fontSize: '15px', color: '#294C72', outline: 'none' }}
            />
            {error && <p style={{ color: '#ef4444', fontSize: '13px', margin: '0' }}>{error}</p>}
            <button
              type="submit"
              style={{ padding: '12px', borderRadius: '12px', background: '#FE7F32', color: '#fff', border: 'none', fontSize: '15px', fontWeight: '700', cursor: 'pointer' }}
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F8F4EF', fontFamily: 'Arial, sans-serif' }}>
      {/* Header */}
      <div style={{ background: '#294C72', padding: '20px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ color: '#fff', fontWeight: '700', fontSize: '20px' }}>hubbs admin</div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button
            onClick={() => exportCsv(entries)}
            style={{ padding: '8px 18px', borderRadius: '999px', background: '#FE7F32', color: '#fff', border: 'none', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}
          >
            Export CSV
          </button>
          <button
            onClick={handleLogout}
            style={{ padding: '8px 18px', borderRadius: '999px', background: 'rgba(255,255,255,0.15)', color: '#fff', border: 'none', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', gap: '16px', padding: '24px 32px', flexWrap: 'wrap' }}>
        {[
          { label: 'Total Signups', value: entries.length },
          { label: "Today's Signups", value: today },
          { label: 'Countries', value: new Set(entries.map((e) => e.country).filter((c) => c !== 'unknown')).size },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{ background: '#fff', borderRadius: '16px', padding: '20px 28px', minWidth: '160px', boxShadow: '0 2px 12px rgba(41,76,114,0.08)' }}
          >
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#294C72' }}>{stat.value}</div>
            <div style={{ fontSize: '13px', color: '#5F7995', marginTop: '4px' }}>{stat.label}</div>
          </div>
        ))}
        <button
          onClick={load}
          disabled={loading}
          style={{ padding: '20px 24px', borderRadius: '16px', background: '#fff', border: '1.5px solid #e5e7eb', fontSize: '13px', fontWeight: '600', color: '#294C72', cursor: 'pointer', boxShadow: '0 2px 12px rgba(41,76,114,0.08)' }}
        >
          {loading ? 'Refreshing…' : '↻ Refresh'}
        </button>
      </div>

      {/* Table */}
      <div style={{ padding: '0 32px 40px' }}>
        <div style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(41,76,114,0.08)' }}>
          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#5F7995' }}>Loading…</div>
          ) : entries.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#5F7995' }}>No signups yet.</div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ background: '#F8F4EF' }}>
                  {['#', 'Email', 'Date', 'Country', 'Device', 'Source'].map((h) => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', color: '#294C72', fontWeight: '700', fontSize: '12px', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {entries.map((e, i) => (
                  <tr key={e.email} style={{ borderTop: '1px solid #f0ece8' }}>
                    <td style={{ padding: '12px 16px', color: '#94A6B9', fontSize: '12px' }}>{i + 1}</td>
                    <td style={{ padding: '12px 16px', color: '#294C72', fontWeight: '500' }}>{e.email}</td>
                    <td style={{ padding: '12px 16px', color: '#5F7995', whiteSpace: 'nowrap' }}>{formatDate(e.timestamp)}</td>
                    <td style={{ padding: '12px 16px', color: '#5F7995' }}>{e.country}</td>
                    <td style={{ padding: '12px 16px', color: '#5F7995' }}>{e.device}</td>
                    <td style={{ padding: '12px 16px', color: '#5F7995' }}>{e.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
