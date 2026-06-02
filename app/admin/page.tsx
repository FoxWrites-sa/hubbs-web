'use client';

import { useSession, signOut } from 'next-auth/react';
import { useState, useEffect, useCallback } from 'react';

type Tab = 'overview' | 'users' | 'notifications' | 'ai-instructions' | 'waitlist';

interface User {
  _id: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  subscription_tier?: string;
  created_at?: string;
}

interface WaitlistEntry {
  email: string;
  timestamp: string;
  source: string;
  country: string;
  device: string;
}

interface NotifHistory {
  title: string;
  message: string;
  audience: string;
  sent_at: string;
  recipient_count: number;
}

const NAV_ITEMS = [
  { id: 'overview', label: 'Overview', icon: '📊' },
  { id: 'users', label: 'Users', icon: '👥' },
  { id: 'notifications', label: 'Notifications', icon: '🔔' },
  { id: 'ai-instructions', label: 'AI Instructions', icon: '🤖' },
  { id: 'waitlist', label: 'Waitlist', icon: '📧' },
];

const TIER_COLORS: Record<string, string> = {
  premium: '#FE7F32',
  pro_family: '#8B5CF6',
  free: '#6B7280',
};

const TIER_LABELS: Record<string, string> = {
  premium: 'Pro',
  pro_family: 'Family Pro',
  free: 'Free',
};

// ── Overview Tab ──────────────────────────────────────────────────────────────

function OverviewTab() {
  const [stats, setStats] = useState<Record<string, number> | null>(null);
  const [waitlistCount, setWaitlistCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/stats').then((r) => r.json()).catch(() => ({})),
      fetch('/api/admin/entries').then((r) => r.json()).catch(() => ({ entries: [] })),
    ]).then(([statsData, waitlistData]) => {
      setStats(statsData);
      setWaitlistCount(waitlistData.entries?.length ?? 0);
      setLoading(false);
    });
  }, []);

  const cards = [
    { label: 'Total Users', value: stats?.total_users ?? 0, icon: '👥', color: '#3B82F6' },
    { label: 'Pro Subscribers', value: stats?.pro_users ?? 0, icon: '⭐', color: '#FE7F32' },
    { label: 'Family Pro', value: stats?.family_pro_users ?? 0, icon: '👨‍👩‍👧', color: '#8B5CF6' },
    { label: 'Waitlist Signups', value: waitlistCount ?? '—', icon: '📧', color: '#10B981' },
    { label: "Today's Signups", value: stats?.today_signups ?? 0, icon: '📅', color: '#F59E0B' },
    { label: 'Free Users', value: stats?.free_users ?? 0, icon: '🆓', color: '#6B7280' },
  ];

  return (
    <div>
      <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '24px', color: '#F9FAFB', marginTop: 0 }}>
        App Overview
      </h2>
      {loading ? (
        <p style={{ color: '#6B7280' }}>Loading stats…</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
          {cards.map((c) => (
            <div key={c.label} style={{ background: '#1F2937', borderRadius: '12px', padding: '20px', border: '1px solid #374151' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <span style={{ fontSize: '22px' }}>{c.icon}</span>
                <span style={{ fontSize: '13px', color: '#9CA3AF', fontWeight: '500' }}>{c.label}</span>
              </div>
              <div style={{ fontSize: '36px', fontWeight: '800', color: c.color }}>{c.value}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Users Tab ─────────────────────────────────────────────────────────────────

function UsersTab() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [tierFilter, setTierFilter] = useState('all');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetch('/api/admin/users')
      .then((r) => r.json())
      .then((data) => { setUsers(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = users.filter((u) => {
    const name = `${u.first_name ?? ''} ${u.last_name ?? ''}`.toLowerCase();
    const email = (u.email ?? '').toLowerCase();
    const q = search.toLowerCase();
    const matchSearch = !search || name.includes(q) || email.includes(q);
    const matchTier = tierFilter === 'all' || (u.subscription_tier ?? 'free') === tierFilter;
    return matchSearch && matchTier;
  });

  const updateSubscription = async (userId: string, tier: string) => {
    setActionLoading(true);
    try {
      await fetch(`/api/admin/users/${userId}/subscription`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subscription_tier: tier }),
      });
      setUsers((prev) => prev.map((u) => u._id === userId ? { ...u, subscription_tier: tier } : u));
    } finally {
      setActionLoading(false);
      setOpenDropdown(null);
    }
  };

  const tierFilters = [
    { value: 'all', label: 'All' },
    { value: 'free', label: 'Free' },
    { value: 'premium', label: 'Pro' },
    { value: 'pro_family', label: 'Family Pro' },
  ];

  return (
    <div>
      <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '20px', color: '#F9FAFB', marginTop: 0 }}>
        Users
      </h2>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' as const }}>
        <input
          type="text"
          placeholder="Search by name or email…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: '1', minWidth: '200px', background: '#1F2937', border: '1px solid #374151', borderRadius: '8px', padding: '8px 12px', color: '#F9FAFB', fontSize: '14px', outline: 'none' }}
        />
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' as const }}>
          {tierFilters.map((f) => (
            <button key={f.value} onClick={() => setTierFilter(f.value)}
              style={{ padding: '8px 14px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: '600', background: tierFilter === f.value ? '#FE7F32' : '#1F2937', color: tierFilter === f.value ? '#fff' : '#9CA3AF' }}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? <p style={{ color: '#6B7280' }}>Loading users…</p> : (
        <div style={{ background: '#1F2937', borderRadius: '12px', border: '1px solid #374151', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ background: '#111827', color: '#6B7280', textAlign: 'left' }}>
                  {['Name', 'Email', 'Tier', 'Joined', 'Actions'].map((h) => (
                    <th key={h} style={{ padding: '12px 16px', fontWeight: '600', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={5} style={{ padding: '32px', textAlign: 'center', color: '#6B7280' }}>No users found</td></tr>
                ) : filtered.map((u, i) => {
                  const tier = u.subscription_tier ?? 'free';
                  return (
                    <tr key={u._id} style={{ borderTop: '1px solid #374151', background: i % 2 === 0 ? 'transparent' : 'rgba(55,65,81,0.3)' }}>
                      <td style={{ padding: '12px 16px', color: '#F9FAFB', fontWeight: '500', whiteSpace: 'nowrap' }}>
                        {`${u.first_name ?? ''} ${u.last_name ?? ''}`.trim() || '—'}
                      </td>
                      <td style={{ padding: '12px 16px', color: '#9CA3AF', maxWidth: '220px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {u.email ?? '—'}
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ padding: '3px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: '600', background: (TIER_COLORS[tier] ?? '#6B7280') + '22', color: TIER_COLORS[tier] ?? '#6B7280', whiteSpace: 'nowrap' }}>
                          {TIER_LABELS[tier] ?? 'Free'}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px', color: '#6B7280', fontSize: '13px', whiteSpace: 'nowrap' }}>
                        {u.created_at ? new Date(u.created_at).toLocaleDateString() : '—'}
                      </td>
                      <td style={{ padding: '12px 16px', position: 'relative' }}>
                        <button
                          onClick={() => setOpenDropdown(openDropdown === u._id ? null : u._id)}
                          style={{ padding: '6px 12px', background: '#374151', border: 'none', borderRadius: '6px', color: '#F9FAFB', fontSize: '13px', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                          Actions ▾
                        </button>
                        {openDropdown === u._id && (
                          <div style={{ position: 'absolute', right: '8px', top: '44px', background: '#111827', border: '1px solid #374151', borderRadius: '8px', zIndex: 50, minWidth: '190px', boxShadow: '0 8px 32px rgba(0,0,0,0.6)' }}>
                            {[
                              { label: 'Upgrade to Pro', tier: 'premium', color: '#FE7F32' },
                              { label: 'Upgrade to Family Pro', tier: 'pro_family', color: '#8B5CF6' },
                              { label: 'Downgrade to Free', tier: 'free', color: '#9CA3AF' },
                            ].map((a) => (
                              <button key={a.tier} disabled={actionLoading || tier === a.tier}
                                onClick={() => updateSubscription(u._id, a.tier)}
                                style={{ display: 'block', width: '100%', padding: '10px 14px', background: 'none', border: 'none', color: tier === a.tier ? '#4B5563' : a.color, fontSize: '13px', cursor: tier === a.tier ? 'default' : 'pointer', textAlign: 'left', fontWeight: '500' }}>
                                {a.label}{tier === a.tier ? ' ✓' : ''}
                              </button>
                            ))}
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Notifications Tab ─────────────────────────────────────────────────────────

function NotificationsTab() {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [audience, setAudience] = useState('all');
  const [singleEmail, setSingleEmail] = useState('');
  const [scheduleNow, setScheduleNow] = useState(true);
  const [scheduledAt, setScheduledAt] = useState('');
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; text: string } | null>(null);
  const [history, setHistory] = useState<NotifHistory[]>([]);

  const loadHistory = useCallback(() => {
    fetch('/api/admin/notifications').then((r) => r.json()).then((d) => setHistory(Array.isArray(d) ? d : [])).catch(() => {});
  }, []);

  useEffect(() => { loadHistory(); }, [loadHistory]);

  const handleSend = async () => {
    if (!title.trim() || !message.trim()) { setResult({ ok: false, text: 'Title and message are required.' }); return; }
    setSending(true); setResult(null);
    try {
      const res = await fetch('/api/admin/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, message, audience, email: singleEmail, scheduled_at: scheduleNow ? null : scheduledAt }),
      });
      const data = await res.json();
      setResult({ ok: true, text: `Sent to ${data.recipients ?? 0} recipients.` });
      setTitle(''); setMessage('');
      loadHistory();
    } catch {
      setResult({ ok: false, text: 'Failed to send notification.' });
    } finally {
      setSending(false);
    }
  };

  const audiences = [
    { value: 'all', label: 'All Users' },
    { value: 'free', label: 'Free Users Only' },
    { value: 'pro', label: 'Pro Users Only' },
    { value: 'family', label: 'Family Pro Only' },
    { value: 'single', label: 'Single User' },
  ];

  const inputSt: React.CSSProperties = { width: '100%', background: '#111827', border: '1px solid #374151', borderRadius: '8px', padding: '10px 12px', color: '#F9FAFB', fontSize: '14px', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' };

  return (
    <div>
      <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '24px', color: '#F9FAFB', marginTop: 0 }}>Send Push Notification</h2>
      <div style={{ background: '#1F2937', borderRadius: '12px', padding: '24px', border: '1px solid #374151', marginBottom: '32px', maxWidth: '640px' }}>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '13px', color: '#9CA3AF', marginBottom: '6px', fontWeight: '500' }}>Title (max 50 chars)</label>
          <input maxLength={50} value={title} onChange={(e) => setTitle(e.target.value)} style={inputSt} />
          <div style={{ textAlign: 'right', fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>{title.length}/50</div>
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '13px', color: '#9CA3AF', marginBottom: '6px', fontWeight: '500' }}>Message (max 200 chars)</label>
          <textarea maxLength={200} value={message} onChange={(e) => setMessage(e.target.value)} rows={4} style={{ ...inputSt, resize: 'vertical' as const }} />
          <div style={{ textAlign: 'right', fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>{message.length}/200</div>
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '13px', color: '#9CA3AF', marginBottom: '8px', fontWeight: '500' }}>Audience</label>
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '8px' }}>
            {audiences.map((a) => (
              <label key={a.value} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input type="radio" name="audience" value={a.value} checked={audience === a.value} onChange={() => setAudience(a.value)} style={{ accentColor: '#FE7F32' }} />
                <span style={{ fontSize: '14px', color: '#F9FAFB' }}>{a.label}</span>
              </label>
            ))}
          </div>
          {audience === 'single' && (
            <input type="email" placeholder="user@email.com" value={singleEmail} onChange={(e) => setSingleEmail(e.target.value)} style={{ ...inputSt, marginTop: '10px' }} />
          )}
        </div>
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '13px', color: '#9CA3AF', marginBottom: '8px', fontWeight: '500' }}>Schedule</label>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' as const }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="radio" name="schedule" checked={scheduleNow} onChange={() => setScheduleNow(true)} style={{ accentColor: '#FE7F32' }} />
              <span style={{ fontSize: '14px', color: '#F9FAFB' }}>Send now</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="radio" name="schedule" checked={!scheduleNow} onChange={() => setScheduleNow(false)} style={{ accentColor: '#FE7F32' }} />
              <span style={{ fontSize: '14px', color: '#F9FAFB' }}>Schedule for:</span>
            </label>
            {!scheduleNow && (
              <input type="datetime-local" value={scheduledAt} onChange={(e) => setScheduledAt(e.target.value)}
                style={{ background: '#111827', border: '1px solid #374151', borderRadius: '8px', padding: '8px 10px', color: '#F9FAFB', fontSize: '14px', outline: 'none' }} />
            )}
          </div>
        </div>
        {result && <p style={{ marginBottom: '12px', fontSize: '14px', color: result.ok ? '#10B981' : '#EF4444' }}>{result.text}</p>}
        <button onClick={handleSend} disabled={sending}
          style={{ background: '#FE7F32', color: '#fff', border: 'none', borderRadius: '8px', padding: '12px 28px', fontWeight: '700', fontSize: '15px', cursor: sending ? 'wait' : 'pointer', opacity: sending ? 0.7 : 1 }}>
          {sending ? 'Sending…' : 'Send Notification'}
        </button>
      </div>

      <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px', color: '#F9FAFB' }}>Notification History</h3>
      {history.length === 0 ? <p style={{ color: '#6B7280' }}>No notifications sent yet.</p> : (
        <div style={{ background: '#1F2937', borderRadius: '12px', border: '1px solid #374151', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ background: '#111827', color: '#6B7280', textAlign: 'left' }}>
                  {['Title', 'Audience', 'Sent At', 'Recipients'].map((h) => (
                    <th key={h} style={{ padding: '12px 16px', fontWeight: '600', fontSize: '12px', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {history.map((n, i) => (
                  <tr key={i} style={{ borderTop: '1px solid #374151' }}>
                    <td style={{ padding: '12px 16px', color: '#F9FAFB', fontWeight: '500' }}>{n.title}</td>
                    <td style={{ padding: '12px 16px', color: '#9CA3AF' }}>{n.audience}</td>
                    <td style={{ padding: '12px 16px', color: '#6B7280', fontSize: '13px', whiteSpace: 'nowrap' }}>{n.sent_at ? new Date(n.sent_at).toLocaleString() : '—'}</td>
                    <td style={{ padding: '12px 16px', color: '#FE7F32', fontWeight: '600' }}>{n.recipient_count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// ── AI Instructions Tab ───────────────────────────────────────────────────────

const MAX_INSTRUCTIONS = 1000;

const AI_AGENTS = [
  {
    id: 'buddy',
    label: 'Buddy',
    icon: '🤖',
    description: "The main AI companion. Instructions are appended to every Buddy conversation, after the user's personalized context.",
  },
  {
    id: 'guardian',
    label: 'Guardian',
    icon: '🛡',
    description: 'Family safety AI. Instructions shape how Guardian nudges users with wellbeing insights and gentle habit reminders.',
  },
  {
    id: 'english_teacher',
    label: 'Language Studio',
    icon: '🌐',
    description: 'Instructions for the Language Studio agent. Controls teaching style and lesson approach.',
  },
  {
    id: 'challenge_generator',
    label: 'Challenge Coach',
    icon: '🏆',
    description: 'The Challenge Coach that motivates groups during family challenges. Instructions are appended to the challenge context.',
  },
];

function AIInstructionsTab() {
  const [activeAgent, setActiveAgent] = useState('buddy');
  const [instructions, setInstructions] = useState<Record<string, string>>({});
  const [timestamps, setTimestamps] = useState<Record<string, string | null>>({});
  const [addlLoading, setAddlLoading] = useState(true);
  const [saving, setSaving] = useState<Record<string, boolean>>({});
  const [clearing, setClearing] = useState<Record<string, boolean>>({});
  const [showConfirm, setShowConfirm] = useState<string | null>(null);
  const [msgs, setMsgs] = useState<Record<string, { ok: boolean; text: string } | null>>({});

  // Default prompt state (editable .txt files via backend)
  const [defaultPrompts, setDefaultPrompts] = useState<Record<string, string>>({});
  const [defaultEdits, setDefaultEdits] = useState<Record<string, string>>({});
  const [defaultLoading, setDefaultLoading] = useState<Record<string, boolean>>({});
  const [savingDefault, setSavingDefault] = useState<Record<string, boolean>>({});
  const [restoringBackup, setRestoringBackup] = useState<Record<string, boolean>>({});
  const [defaultMsgs, setDefaultMsgs] = useState<Record<string, { ok: boolean; text: string } | null>>({});
  const [defaultCharCounts, setDefaultCharCounts] = useState<Record<string, number>>({});
  const [defaultLastUpdated, setDefaultLastUpdated] = useState<Record<string, string | null>>({});

  useEffect(() => {
    fetch('/api/admin/ai-instructions')
      .then((r) => r.json())
      .then((d) => {
        setInstructions(d.instructions ?? {});
        setTimestamps(d.timestamps ?? {});
        setAddlLoading(false);
      })
      .catch(() => setAddlLoading(false));
  }, []);

  // Load default prompt on tab change (lazy per-agent)
  useEffect(() => {
    if (defaultPrompts[activeAgent] !== undefined) return;
    setDefaultLoading((prev) => ({ ...prev, [activeAgent]: true }));
    fetch(`/api/admin/agent-prompts/${activeAgent}`)
      .then((r) => r.json())
      .then((d) => {
        const p = d.prompt ?? '';
        setDefaultPrompts((prev) => ({ ...prev, [activeAgent]: p }));
        setDefaultEdits((prev) => ({ ...prev, [activeAgent]: p }));
        setDefaultCharCounts((prev) => ({ ...prev, [activeAgent]: d.char_count ?? p.length }));
        setDefaultLastUpdated((prev) => ({ ...prev, [activeAgent]: d.last_updated ?? null }));
      })
      .catch(() => {
        setDefaultPrompts((prev) => ({ ...prev, [activeAgent]: '' }));
        setDefaultEdits((prev) => ({ ...prev, [activeAgent]: '' }));
      })
      .finally(() => setDefaultLoading((prev) => ({ ...prev, [activeAgent]: false })));
  }, [activeAgent]);

  const hasUnsavedDefault =
    (defaultEdits[activeAgent] ?? '') !== (defaultPrompts[activeAgent] ?? '');

  const handleSaveDefault = async (agent: string) => {
    setSavingDefault((prev) => ({ ...prev, [agent]: true }));
    setDefaultMsgs((prev) => ({ ...prev, [agent]: null }));
    try {
      const res = await fetch(`/api/admin/agent-prompts/${agent}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: defaultEdits[agent] }),
      });
      if (!res.ok) throw new Error('Failed');
      const saved = defaultEdits[agent];
      setDefaultPrompts((prev) => ({ ...prev, [agent]: saved }));
      setDefaultCharCounts((prev) => ({ ...prev, [agent]: saved.length }));
      setDefaultLastUpdated((prev) => ({ ...prev, [agent]: new Date().toISOString() }));
      setDefaultMsgs((prev) => ({ ...prev, [agent]: { ok: true, text: 'Default prompt saved to file.' } }));
    } catch {
      setDefaultMsgs((prev) => ({ ...prev, [agent]: { ok: false, text: 'Failed to save default prompt.' } }));
    } finally {
      setSavingDefault((prev) => ({ ...prev, [agent]: false }));
    }
  };

  const handleRestoreBackup = async (agent: string) => {
    setRestoringBackup((prev) => ({ ...prev, [agent]: true }));
    setDefaultMsgs((prev) => ({ ...prev, [agent]: null }));
    try {
      const res = await fetch(`/api/admin/agent-prompts/${agent}/restore`, { method: 'POST' });
      if (!res.ok) throw new Error('Failed');
      const data = await res.json();
      const p = data.prompt ?? '';
      setDefaultPrompts((prev) => ({ ...prev, [agent]: p }));
      setDefaultEdits((prev) => ({ ...prev, [agent]: p }));
      setDefaultCharCounts((prev) => ({ ...prev, [agent]: data.char_count ?? p.length }));
      setDefaultLastUpdated((prev) => ({ ...prev, [agent]: new Date().toISOString() }));
      setDefaultMsgs((prev) => ({ ...prev, [agent]: { ok: true, text: 'Backup restored successfully.' } }));
    } catch {
      setDefaultMsgs((prev) => ({ ...prev, [agent]: { ok: false, text: 'No backup found or restore failed.' } }));
    } finally {
      setRestoringBackup((prev) => ({ ...prev, [agent]: false }));
    }
  };

  const setAgentText = (agent: string, text: string) =>
    setInstructions((prev) => ({ ...prev, [agent]: text.slice(0, MAX_INSTRUCTIONS) }));

  const handleSave = async (agent: string) => {
    const text = instructions[agent] ?? '';
    setSaving((prev) => ({ ...prev, [agent]: true }));
    setMsgs((prev) => ({ ...prev, [agent]: null }));
    try {
      const res = await fetch('/api/admin/ai-instructions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agent, instructions: text }),
      });
      if (!res.ok) throw new Error('Failed');
      const data = await res.json();
      setTimestamps((prev) => ({ ...prev, [agent]: data.updated_at ?? new Date().toISOString() }));
      setMsgs((prev) => ({ ...prev, [agent]: { ok: true, text: 'Saved successfully.' } }));
    } catch {
      setMsgs((prev) => ({ ...prev, [agent]: { ok: false, text: 'Failed to save. Check KV_REST_API_URL is set.' } }));
    } finally {
      setSaving((prev) => ({ ...prev, [agent]: false }));
    }
  };

  const handleClear = async (agent: string) => {
    setClearing((prev) => ({ ...prev, [agent]: true }));
    setMsgs((prev) => ({ ...prev, [agent]: null }));
    try {
      const res = await fetch('/api/admin/ai-instructions', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agent }),
      });
      if (!res.ok) throw new Error('Failed');
      setInstructions((prev) => { const n = { ...prev }; delete n[agent]; return n; });
      setTimestamps((prev) => { const n = { ...prev }; delete n[agent]; return n; });
      setMsgs((prev) => ({ ...prev, [agent]: { ok: true, text: 'Instructions cleared.' } }));
    } catch {
      setMsgs((prev) => ({ ...prev, [agent]: { ok: false, text: 'Failed to clear.' } }));
    } finally {
      setClearing((prev) => ({ ...prev, [agent]: false }));
      setShowConfirm(null);
    }
  };

  const agent = AI_AGENTS.find((a) => a.id === activeAgent)!;
  const addlText = instructions[activeAgent] ?? '';
  const charCount = addlText.length;
  const counterColor = charCount > 950 ? '#EF4444' : charCount > 800 ? '#FE7F32' : '#6B7280';
  const ts = timestamps[activeAgent] ?? null;
  const isSaving = saving[activeAgent] ?? false;
  const isClearing = clearing[activeAgent] ?? false;
  const msg = msgs[activeAgent] ?? null;
  const isDefaultLoading = defaultLoading[activeAgent] ?? false;
  const isSavingDefault = savingDefault[activeAgent] ?? false;
  const isRestoringBackup = restoringBackup[activeAgent] ?? false;
  const defaultMsg = defaultMsgs[activeAgent] ?? null;
  const defaultCharCount = defaultCharCounts[activeAgent] ?? null;
  const defaultLastUpd = defaultLastUpdated[activeAgent] ?? null;

  const sectionSt: React.CSSProperties = {
    background: '#1F2937', borderRadius: '12px', padding: '20px',
    border: '1px solid #374151', marginBottom: '24px',
  };
  const sectionLabelSt: React.CSSProperties = {
    fontSize: '11px', fontWeight: '700', color: '#6B7280',
    textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px',
  };

  return (
    <div style={{ maxWidth: '800px' }}>
      <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px', color: '#F9FAFB', marginTop: 0 }}>AI Instructions</h2>
      <p style={{ color: '#9CA3AF', fontSize: '14px', marginBottom: '24px', lineHeight: '1.6' }}>
        Edit each agent's default system prompt, and optionally inject additional instructions appended at runtime.
      </p>

      {/* Agent tab bar */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '24px', background: '#1F2937', borderRadius: '10px', padding: '4px' }}>
        {AI_AGENTS.map((a) => {
          const active = activeAgent === a.id;
          const hasContent = !!(instructions[a.id]?.trim());
          return (
            <button key={a.id} onClick={() => setActiveAgent(a.id)}
              style={{ flex: 1, padding: '8px 12px', borderRadius: '7px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: active ? '700' : '500', background: active ? '#111827' : 'transparent', color: active ? '#FE7F32' : '#9CA3AF', transition: 'all 0.15s', position: 'relative' as const }}>
              <span style={{ marginRight: '6px' }}>{a.icon}</span>
              {a.label}
              {hasContent && <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: '#10B981', marginLeft: '6px', verticalAlign: 'middle' }} />}
            </button>
          );
        })}
      </div>

      <p style={{ color: '#9CA3AF', fontSize: '13px', marginBottom: '20px', lineHeight: '1.6' }}>{agent.description}</p>

      {/* ── Section 1: Default Prompt ── */}
      <div style={sectionSt}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <p style={{ ...sectionLabelSt, margin: 0 }}>Default System Prompt</p>
          {hasUnsavedDefault && (
            <span style={{ fontSize: '11px', color: '#F59E0B', fontWeight: '600' }}>● Unsaved changes</span>
          )}
        </div>
        <p style={{ fontSize: '12px', color: '#6B7280', marginBottom: '12px', lineHeight: '1.5' }}>
          This is the base system prompt loaded from the <code style={{ background: '#111827', padding: '1px 5px', borderRadius: '4px', color: '#94A6B9' }}>prompts/{activeAgent === 'english_teacher' ? 'language_studio' : activeAgent === 'challenge_generator' ? 'challenge_coach' : activeAgent}.txt</code> file.
          Edit and save to update the prompt. A backup is created automatically before each save.
        </p>
        {isDefaultLoading ? (
          <div style={{ background: '#111827', border: '1px solid #374151', borderRadius: '8px', padding: '16px', color: '#6B7280', fontSize: '13px', fontStyle: 'italic' }}>
            Loading prompt from backend…
          </div>
        ) : (
          <textarea
            value={defaultEdits[activeAgent] ?? ''}
            onChange={(e) => setDefaultEdits((prev) => ({ ...prev, [activeAgent]: e.target.value }))}
            rows={14}
            spellCheck={false}
            style={{ width: '100%', background: '#0a1628', border: `1px solid ${hasUnsavedDefault ? '#F59E0B' : '#1F2937'}`, borderRadius: '8px', padding: '14px', color: '#94A6B9', fontSize: '12px', fontFamily: 'monospace', lineHeight: '1.7', outline: 'none', resize: 'vertical' as const, boxSizing: 'border-box' as const, whiteSpace: 'pre' }}
          />
        )}
        {!isDefaultLoading && (defaultCharCount !== null || defaultLastUpd) && (
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '12px', color: '#4B5563' }}>
            {defaultCharCount !== null && (
              <span>{defaultCharCount.toLocaleString()} characters</span>
            )}
            {defaultLastUpd && (
              <span>Last updated: {new Date(defaultLastUpd).toLocaleString()}</span>
            )}
          </div>
        )}
        {defaultMsg && (
          <p style={{ marginTop: '10px', marginBottom: 0, fontSize: '13px', color: defaultMsg.ok ? '#10B981' : '#EF4444' }}>{defaultMsg.text}</p>
        )}
        <div style={{ display: 'flex', gap: '10px', marginTop: '14px', flexWrap: 'wrap' as const }}>
          <button
            onClick={() => handleSaveDefault(activeAgent)}
            disabled={isSavingDefault || !hasUnsavedDefault || isDefaultLoading}
            style={{ background: hasUnsavedDefault ? '#FE7F32' : '#374151', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px 22px', fontWeight: '700', fontSize: '13px', cursor: isSavingDefault || !hasUnsavedDefault ? 'default' : 'pointer', opacity: isSavingDefault || !hasUnsavedDefault ? 0.6 : 1 }}>
            {isSavingDefault ? 'Saving…' : 'Save Default Prompt'}
          </button>
          <button
            onClick={() => setDefaultEdits((prev) => ({ ...prev, [activeAgent]: defaultPrompts[activeAgent] ?? '' }))}
            disabled={!hasUnsavedDefault || isDefaultLoading}
            style={{ background: 'transparent', color: '#9CA3AF', border: '1px solid #374151', borderRadius: '8px', padding: '10px 16px', fontWeight: '500', fontSize: '13px', cursor: hasUnsavedDefault ? 'pointer' : 'default', opacity: hasUnsavedDefault ? 1 : 0.4 }}>
            Discard Changes
          </button>
          <button
            onClick={() => handleRestoreBackup(activeAgent)}
            disabled={isRestoringBackup || isDefaultLoading}
            style={{ background: 'transparent', color: '#6B7280', border: '1px solid #374151', borderRadius: '8px', padding: '10px 16px', fontWeight: '500', fontSize: '13px', cursor: 'pointer', marginLeft: 'auto' }}>
            {isRestoringBackup ? 'Restoring…' : '↩ Restore Backup'}
          </button>
        </div>
      </div>

      {/* ── Section 2: Additional Instructions ── */}
      <div style={sectionSt}>
        <p style={{ ...sectionLabelSt, margin: '0 0 8px 0' }}>Additional Instructions</p>
        <p style={{ fontSize: '12px', color: '#6B7280', marginBottom: '14px', lineHeight: '1.5' }}>
          Appended at the end of the default prompt at runtime. Use this for temporary overrides, seasonal context, or A/B testing without modifying the base prompt.
        </p>
        {addlLoading ? <p style={{ color: '#6B7280', fontSize: '13px' }}>Loading…</p> : (
          <>
            <textarea
              value={addlText}
              onChange={(e) => setAgentText(activeAgent, e.target.value)}
              rows={6}
              placeholder={`Add runtime instructions for ${agent.label}...\nExample: 'During Ramadan, acknowledge the holy month naturally.'`}
              style={{ width: '100%', background: '#111827', border: `1px solid ${charCount > 950 ? '#EF4444' : '#374151'}`, borderRadius: '8px', padding: '12px', color: '#F9FAFB', fontSize: '14px', outline: 'none', resize: 'vertical' as const, lineHeight: '1.6', boxSizing: 'border-box' as const, fontFamily: 'inherit' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', marginBottom: '14px' }}>
              <span style={{ fontSize: '12px', color: counterColor, fontWeight: charCount > 800 ? '600' : '400' }}>
                {charCount} / {MAX_INSTRUCTIONS}
              </span>
              {ts && <span style={{ fontSize: '12px', color: '#4B5563' }}>Saved {new Date(ts).toLocaleString()}</span>}
            </div>
            {msg && (
              <p style={{ marginBottom: '12px', fontSize: '14px', color: msg.ok ? '#10B981' : '#EF4444' }}>{msg.text}</p>
            )}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' as const }}>
              <button onClick={() => handleSave(activeAgent)} disabled={isSaving || charCount > MAX_INSTRUCTIONS}
                style={{ background: '#FE7F32', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px 22px', fontWeight: '700', fontSize: '13px', cursor: isSaving ? 'wait' : 'pointer', opacity: isSaving || charCount > MAX_INSTRUCTIONS ? 0.6 : 1 }}>
                {isSaving ? 'Saving…' : `Save ${agent.label} Instructions`}
              </button>
              {addlText.trim() && (
                <button onClick={() => setShowConfirm(activeAgent)} disabled={isClearing}
                  style={{ background: 'transparent', color: '#EF4444', border: '1px solid #EF4444', borderRadius: '8px', padding: '10px 18px', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}>
                  Clear
                </button>
              )}
            </div>
          </>
        )}
      </div>

      {/* Confirmation modal */}
      {showConfirm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ background: '#1F2937', borderRadius: '16px', padding: '32px', maxWidth: '400px', width: '90%', border: '1px solid #374151', boxShadow: '0 20px 60px rgba(0,0,0,0.6)' }}>
            <h3 style={{ color: '#F9FAFB', fontSize: '18px', fontWeight: '700', marginTop: 0, marginBottom: '12px' }}>
              Clear {AI_AGENTS.find((a) => a.id === showConfirm)?.label} Instructions?
            </h3>
            <p style={{ color: '#9CA3AF', fontSize: '14px', lineHeight: '1.6', marginBottom: '24px' }}>
              This removes the additional instructions for this agent. The default prompt file is not affected.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button onClick={() => setShowConfirm(null)}
                style={{ padding: '10px 20px', background: '#374151', border: 'none', borderRadius: '8px', color: '#F9FAFB', fontSize: '14px', cursor: 'pointer', fontWeight: '500' }}>
                Cancel
              </button>
              <button onClick={() => handleClear(showConfirm)} disabled={isClearing}
                style={{ padding: '10px 20px', background: '#EF4444', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '14px', cursor: isClearing ? 'wait' : 'pointer', fontWeight: '700' }}>
                {isClearing ? 'Clearing…' : 'Clear'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Waitlist Tab ──────────────────────────────────────────────────────────────

function WaitlistTab() {
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const today = new Date().toDateString();

  const load = useCallback(() => {
    setLoading(true);
    fetch('/api/admin/entries')
      .then((r) => r.json())
      .then((data) => { setEntries(data.entries ?? []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = entries.filter((e) => !search || e.email.toLowerCase().includes(search.toLowerCase()));
  const todayCount = entries.filter((e) => new Date(e.timestamp).toDateString() === today).length;

  const exportCsv = () => {
    const rows = [
      ['Email', 'Signed Up', 'Country', 'Device', 'Source'],
      ...entries.map((e) => [e.email, new Date(e.timestamp).toLocaleString(), e.country, e.device, e.source]),
    ];
    const csv = rows.map((r) => r.join(',')).join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    const a = document.createElement('a');
    a.href = url; a.download = 'hubbs-waitlist.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', flexWrap: 'wrap' as const, gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '4px', color: '#F9FAFB', marginTop: 0 }}>Waitlist</h2>
          <p style={{ fontSize: '14px', color: '#6B7280', margin: 0 }}>{entries.length} total · {todayCount} today</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={load} style={{ padding: '8px 16px', background: '#1F2937', border: '1px solid #374151', borderRadius: '8px', color: '#9CA3AF', fontSize: '13px', cursor: 'pointer' }}>↻ Refresh</button>
          <button onClick={exportCsv} style={{ padding: '8px 16px', background: '#FE7F32', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>Export CSV</button>
        </div>
      </div>
      <input type="text" placeholder="Filter by email…" value={search} onChange={(e) => setSearch(e.target.value)}
        style={{ width: '100%', background: '#1F2937', border: '1px solid #374151', borderRadius: '8px', padding: '8px 12px', color: '#F9FAFB', fontSize: '14px', outline: 'none', marginBottom: '16px', boxSizing: 'border-box' as const }} />
      {loading ? <p style={{ color: '#6B7280' }}>Loading…</p> : (
        <div style={{ background: '#1F2937', borderRadius: '12px', border: '1px solid #374151', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ background: '#111827', color: '#6B7280', textAlign: 'left' }}>
                  {['Email', 'Signed Up', 'Country', 'Device', 'Source'].map((h) => (
                    <th key={h} style={{ padding: '12px 16px', fontWeight: '600', fontSize: '12px', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={5} style={{ padding: '32px', textAlign: 'center', color: '#6B7280' }}>No entries found</td></tr>
                ) : filtered.map((e, i) => (
                  <tr key={e.email} style={{ borderTop: '1px solid #374151', background: i % 2 === 0 ? 'transparent' : 'rgba(55,65,81,0.3)' }}>
                    <td style={{ padding: '12px 16px', color: '#F9FAFB', fontWeight: '500' }}>{e.email}</td>
                    <td style={{ padding: '12px 16px', color: '#9CA3AF', fontSize: '13px', whiteSpace: 'nowrap' }}>{new Date(e.timestamp).toLocaleString()}</td>
                    <td style={{ padding: '12px 16px', color: '#9CA3AF' }}>{e.country}</td>
                    <td style={{ padding: '12px 16px', color: '#9CA3AF' }}>{e.device}</td>
                    <td style={{ padding: '12px 16px', color: '#6B7280', fontSize: '12px' }}>{e.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

const TAB_TITLES: Record<Tab, string> = {
  overview: 'Overview',
  users: 'Users',
  notifications: 'Push Notifications',
  'ai-instructions': 'AI Instructions',
  waitlist: 'Waitlist',
};

export default function AdminPage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#111827', color: '#fff', fontFamily: 'system-ui, -apple-system, sans-serif', overflow: 'hidden' }}>
      {/* Sidebar */}
      <aside style={{ width: '220px', minWidth: '220px', backgroundColor: '#0F1923', display: 'flex', flexDirection: 'column', borderRight: '1px solid #1F2937' }}>
        <div style={{ padding: '24px 20px', borderBottom: '1px solid #1F2937' }}>
          <span style={{ fontSize: '22px', fontWeight: '900', color: '#FE7F32', letterSpacing: '-0.5px' }}>hubbs</span>
          <span style={{ display: 'block', fontSize: '11px', color: '#4B5563', fontWeight: '600', marginTop: '2px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Admin Panel</span>
        </div>
        <nav style={{ flex: 1, padding: '12px 0', overflowY: 'auto' }}>
          {NAV_ITEMS.map((item) => {
            const active = activeTab === item.id;
            return (
              <button key={item.id} onClick={() => setActiveTab(item.id as Tab)}
                style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', padding: '11px 20px', background: active ? 'rgba(254,127,50,0.12)' : 'transparent', border: 'none', borderLeft: active ? '3px solid #FE7F32' : '3px solid transparent', cursor: 'pointer', fontSize: '14px', fontWeight: active ? '600' : '400', color: active ? '#FE7F32' : '#9CA3AF', textAlign: 'left', transition: 'all 0.15s' }}>
                <span style={{ fontSize: '16px' }}>{item.icon}</span>
                {item.label}
              </button>
            );
          })}
        </nav>
        <div style={{ padding: '16px 20px', borderTop: '1px solid #1F2937' }}>
          <p style={{ fontSize: '12px', color: '#6B7280', marginBottom: '8px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', margin: '0 0 8px 0' }}>
            {session?.user?.email ?? ''}
          </p>
          <button onClick={() => signOut({ callbackUrl: '/admin/login' })}
            style={{ width: '100%', padding: '8px', background: '#1F2937', border: '1px solid #374151', borderRadius: '6px', color: '#9CA3AF', fontSize: '13px', cursor: 'pointer', fontWeight: '500' }}>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
        <header style={{ padding: '16px 28px', borderBottom: '1px solid #1F2937', backgroundColor: '#111827', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
          <h1 style={{ fontSize: '18px', fontWeight: '700', color: '#F9FAFB', margin: 0 }}>{TAB_TITLES[activeTab]}</h1>
          <span style={{ fontSize: '13px', color: '#6B7280' }}>
            {now.toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
          </span>
        </header>
        <main style={{ flex: 1, overflowY: 'auto', padding: '28px' }}>
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'users' && <UsersTab />}
          {activeTab === 'notifications' && <NotificationsTab />}
          {activeTab === 'ai-instructions' && <AIInstructionsTab />}
          {activeTab === 'waitlist' && <WaitlistTab />}
        </main>
      </div>
    </div>
  );
}
