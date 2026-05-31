'use client';

import { useState, useEffect } from 'react';

function PhoneMockup() {
  return (
    <svg
      width="260"
      height="500"
      viewBox="0 0 260 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="260" height="500" rx="44" fill="#1A2F45" />
      <rect x="10" y="10" width="240" height="480" rx="36" fill="#0F1923" />
      <rect x="88" y="16" width="84" height="6" rx="3" fill="#294C72" opacity="0.6" />
      <rect x="22" y="36" width="90" height="16" rx="6" fill="#294C72" opacity="0.8" />
      <circle cx="224" cy="44" r="12" fill="#FE7F32" opacity="0.2" />
      <circle cx="224" cy="44" r="6" fill="#FE7F32" opacity="0.7" />
      <rect x="22" y="66" width="60" height="8" rx="3" fill="#294C72" opacity="0.5" />
      <rect x="22" y="84" width="216" height="58" rx="14" fill="#294C72" opacity="0.35" />
      <circle cx="52" cy="113" r="16" fill="#FE7F32" opacity="0.85" />
      <rect x="78" y="102" width="90" height="9" rx="4" fill="white" opacity="0.55" />
      <rect x="78" y="117" width="55" height="7" rx="3" fill="white" opacity="0.3" />
      <rect x="210" y="107" width="18" height="12" rx="4" fill="#FE7F32" opacity="0.6" />
      <rect x="22" y="152" width="216" height="58" rx="14" fill="#294C72" opacity="0.35" />
      <circle cx="52" cy="181" r="16" fill="#22C55E" opacity="0.85" />
      <rect x="78" y="170" width="110" height="9" rx="4" fill="white" opacity="0.55" />
      <rect x="78" y="185" width="65" height="7" rx="3" fill="white" opacity="0.3" />
      <rect x="206" y="175" width="22" height="12" rx="4" fill="#22C55E" opacity="0.5" />
      <rect x="22" y="220" width="216" height="58" rx="14" fill="#294C72" opacity="0.35" />
      <circle cx="52" cy="249" r="16" fill="#8B5CF6" opacity="0.85" />
      <rect x="78" y="238" width="75" height="9" rx="4" fill="white" opacity="0.55" />
      <rect x="78" y="253" width="95" height="7" rx="3" fill="white" opacity="0.3" />
      <rect x="208" y="243" width="20" height="12" rx="4" fill="#8B5CF6" opacity="0.5" />
      <rect x="22" y="294" width="216" height="40" rx="14" fill="#294C72" opacity="0.2" />
      <rect x="32" y="304" width="100" height="6" rx="3" fill="#FE7F32" opacity="0.7" />
      <rect x="32" y="314" width="160" height="6" rx="3" fill="white" opacity="0.15" />
      <rect x="10" y="450" width="240" height="40" rx="0" fill="#0F1923" />
      <rect x="10" y="448" width="240" height="2" fill="#294C72" opacity="0.4" />
      <circle cx="55" cy="470" r="10" fill="#FE7F32" opacity="0.9" />
      <circle cx="97" cy="470" r="9" fill="#294C72" opacity="0.5" />
      <circle cx="139" cy="470" r="9" fill="#294C72" opacity="0.5" />
      <circle cx="181" cy="470" r="9" fill="#294C72" opacity="0.5" />
      <circle cx="223" cy="470" r="9" fill="#294C72" opacity="0.5" />
    </svg>
  );
}

const features = [
  {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
        <circle cx="14" cy="14" r="13" stroke="#FE7F32" strokeWidth="2" />
        <path d="M9 14l4 4 6-7" stroke="#FE7F32" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Habit Tracking',
    desc: 'Build powerful daily habits with streaks, reminders, and progress insights for the whole family.',
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 3L3 9v10l11 6 11-6V9L14 3z" stroke="#FE7F32" strokeWidth="2" strokeLinejoin="round" />
        <path d="M14 3v22M3 9l11 6 11-6" stroke="#FE7F32" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Prayer Tracker',
    desc: 'Track all 5 daily prayers with real-time schedules, streak tracking, and azan notifications.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C12 2 8 6 8 10C8 12 9 13 10 14L12 22L14 14C15 13 16 12 16 10C16 6 12 2 12 2Z" stroke="#FE7F32" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
        <path d="M8 10C6 9 4 10 3 12C2 14 3 16 5 17L12 22" stroke="#FE7F32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 10C18 9 20 10 21 12C22 14 21 16 19 17L12 22" stroke="#FE7F32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Daily Du'aa",
    desc: "Start your day with authentic Islamic supplications. Curated du'aa for morning, evening, and daily moments of reflection — refreshed daily.",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
        <circle cx="14" cy="14" r="11" stroke="#FE7F32" strokeWidth="2" />
        <path d="M9 13c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.5-.66 2.85-1.71 3.78L16 19H12l-1.29-2.22A4.98 4.98 0 019 13z" stroke="#FE7F32" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M12 19v2M16 19v2" stroke="#FE7F32" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    title: 'Mood Check-ins',
    desc: 'Daily morning and evening check-ins to track how you and your family are really feeling over time.',
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
        <circle cx="14" cy="11" r="5" stroke="#FE7F32" strokeWidth="2" />
        <path d="M5 25c0-4.97 4.03-9 9-9s9 4.03 9 9" stroke="#FE7F32" strokeWidth="2" strokeLinecap="round" />
        <path d="M20 8l2-2M23 11h2M20.5 14.5l1.5 1.5" stroke="#FE7F32" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    title: 'Your AI Companion',
    desc: 'Name your personal AI during setup. It knows your habits, mood, and goals — and checks in when you need it most.',
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="4" width="22" height="16" rx="3" stroke="#FE7F32" strokeWidth="2" />
        <path d="M9 10h10M9 14h6" stroke="#FE7F32" strokeWidth="2" strokeLinecap="round" />
        <path d="M10 24l4-4 4 4" stroke="#FE7F32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'AI English Teacher',
    desc: 'Learn English naturally through daily conversations, corrections, and personalised lessons powered by AI.',
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 8h18l-2 14H7L5 8z" stroke="#FE7F32" strokeWidth="2" strokeLinejoin="round" />
        <path d="M10 8V6a4 4 0 018 0v2" stroke="#FE7F32" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: 'Shopping Lists',
    desc: 'Real-time shared grocery and to-do lists so no one in the family ever misses a thing.',
  },
];

const tiers = [
  {
    name: 'Free',
    monthlyPrice: '$0',
    annualPrice: '$0',
    period: 'Forever free',
    annualNote: null as string | null,
    badge: null as string | null,
    features: [
      '1 family member',
      '3 active habits',
      'Prayer tracker',
      'Basic mood check-ins',
      'Daily Du\'aa',
    ],
    cta: 'Join Waitlist',
    highlight: false,
  },
  {
    name: 'Pro',
    monthlyPrice: '$7.99',
    annualPrice: '$5.99',
    period: 'per month',
    annualNote: 'billed annually',
    badge: 'MOST POPULAR',
    features: [
      '1 member',
      'Unlimited habits',
      'Unlimited AI chat',
      'AI English Teacher',
      'Custom habits',
      'Daily Du\'aa',
      'Full AI access',
    ],
    cta: 'Get Early Access',
    highlight: true,
  },
  {
    name: 'Family Pro',
    monthlyPrice: '$12.99',
    annualPrice: '$9.99',
    period: 'per month',
    annualNote: 'billed annually',
    badge: 'BEST VALUE',
    features: [
      'Up to 6 family members',
      'Everything in Pro',
      'Family Circle',
      'Shared challenges',
      'Parent controls',
    ],
    cta: 'Get Early Access',
    highlight: false,
  },
];

const WA_SHARE_URL =
  'https://wa.me/?text=Check%20out%20Hubbs%20%E2%80%94%20a%20family%20wellness%20app%20for%20Muslim%20families!%20hubbsapp.com%2Fwaitlist';
const WAITLIST_URL = 'https://hubbsapp.com/waitlist';

function ThankYouCard({ onCopy, copied }: { onCopy: () => void; copied: boolean }) {
  return (
    <div style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '24px', padding: '32px 28px', textAlign: 'center' }}>
      <div style={{ fontSize: '40px', marginBottom: '12px' }}>🧡</div>
      <p style={{ color: '#fff', fontSize: '18px', fontWeight: '600', marginBottom: '8px', lineHeight: '1.5' }}>
        You&apos;re on the list — share Hubbs with one family member and help us grow.
      </p>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '20px', flexWrap: 'wrap' }}>
        <a
          href={WA_SHARE_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: '#25D366', color: '#fff',
            padding: '10px 20px', borderRadius: '999px',
            fontWeight: '600', fontSize: '14px', textDecoration: 'none',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Share on WhatsApp
        </a>
        <button
          onClick={onCopy}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: copied ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.12)',
            color: '#fff', border: '1px solid rgba(255,255,255,0.3)',
            padding: '10px 20px', borderRadius: '999px',
            fontWeight: '600', fontSize: '14px', cursor: 'pointer',
          }}
        >
          {copied ? '✓ Copied!' : '🔗 Copy link'}
        </button>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroEmail, setHeroEmail] = useState('');
  const [heroSubmitted, setHeroSubmitted] = useState(false);
  const [heroCopied, setHeroCopied] = useState(false);
  const [heroAlreadyExists, setHeroAlreadyExists] = useState(false);
  const [ctaEmail, setCtaEmail] = useState('');
  const [ctaSubmitted, setCtaSubmitted] = useState(false);
  const [ctaCopied, setCtaCopied] = useState(false);
  const [ctaAlreadyExists, setCtaAlreadyExists] = useState(false);
  const [annual, setAnnual] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  async function submitWaitlist(email: string, source: string): Promise<{ success: boolean; message?: string }> {
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source }),
      });
      return await res.json();
    } catch {
      return { success: false };
    }
  }

  async function handleHeroWaitlist(e: React.FormEvent) {
    e.preventDefault();
    if (!heroEmail.trim()) return;
    const data = await submitWaitlist(heroEmail, 'hero');
    if (!data.success && data.message === 'already_exists') {
      setHeroAlreadyExists(true);
      return;
    }
    if (data.success) setHeroSubmitted(true);
  }

  async function handleCtaWaitlist(e: React.FormEvent) {
    e.preventDefault();
    if (!ctaEmail.trim()) return;
    const data = await submitWaitlist(ctaEmail, 'cta');
    if (!data.success && data.message === 'already_exists') {
      setCtaAlreadyExists(true);
      return;
    }
    if (data.success) setCtaSubmitted(true);
  }

  function copyWaitlistLink(setCopied: (v: boolean) => void) {
    navigator.clipboard.writeText(WAITLIST_URL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }

  return (
    <div className="min-h-screen bg-hubbs-light font-body text-hubbs-dark">

      {/* ── Navbar ── */}
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
        }`}
      >
        <div
          className="max-w-6xl mx-auto px-6 flex justify-between"
          style={{ minHeight: '70px', overflow: 'visible', alignItems: 'center', paddingTop: '4px', paddingBottom: '4px' }}
        >
          <a href="#" style={{ textDecoration: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'visible', padding: '8px 0' }}>
              <svg width="36" height="44" viewBox="0 0 36 44" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible', flexShrink: 0 }}>
                <circle cx="9" cy="6" r="6" fill="#FE7F32"/>
                <rect x="4" y="14" width="10" height="22" rx="5" fill="#FE7F32"/>
                <circle cx="27" cy="6" r="6" fill="#FE7F32"/>
                <rect x="22" y="14" width="10" height="22" rx="5" fill="#FE7F32"/>
                <rect x="14" y="20" width="8" height="8" rx="2" fill="#FE7F32"/>
              </svg>
              <span style={{ fontWeight: '700', fontSize: '20px', color: '#294C72', letterSpacing: '-0.5px' }}>
                hubbs
              </span>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-hubbs-dark hover:text-hubbs-orange transition-colors">Features</a>
            <a href="#pricing" className="text-sm font-medium text-hubbs-dark hover:text-hubbs-orange transition-colors">Pricing</a>
            <a href="#waitlist" className="text-sm font-medium text-hubbs-dark hover:text-hubbs-orange transition-colors">Early Access</a>
            <a
              href="#waitlist"
              className="bg-hubbs-orange text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-hubbs-orange-dark transition-colors"
            >
              Join Waitlist
            </a>
          </div>

          <button
            className="md:hidden p-2 flex flex-col gap-1.5"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-hubbs-dark transition-transform duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-hubbs-dark transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-hubbs-dark transition-transform duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-6 py-5 flex flex-col gap-4">
            <a href="#features" className="font-medium text-hubbs-dark hover:text-hubbs-orange" onClick={() => setMenuOpen(false)}>Features</a>
            <a href="#pricing" className="font-medium text-hubbs-dark hover:text-hubbs-orange" onClick={() => setMenuOpen(false)}>Pricing</a>
            <a href="#waitlist" className="font-medium text-hubbs-dark hover:text-hubbs-orange" onClick={() => setMenuOpen(false)}>Early Access</a>
            <a
              href="#waitlist"
              className="bg-hubbs-orange text-white font-semibold px-5 py-3 rounded-full text-center"
              onClick={() => setMenuOpen(false)}
            >
              Join Waitlist
            </a>
          </div>
        )}
      </nav>

      {/* ── Hero ── */}
      <section className="pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          {/* Text */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-block bg-hubbs-orange/10 text-hubbs-orange text-xs font-semibold px-4 py-1.5 rounded-full mb-6 tracking-widest uppercase">
              Family &amp; Life Planner
            </div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-hubbs-blue leading-[1.1] mb-6">
              Smart Hubs,<br />
              <span className="text-hubbs-orange">Connected</span> Living
            </h1>
            <p className="text-lg text-hubbs-subtle max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed">
              Build better habits, strengthen family bonds, and grow together — all in one beautiful app designed for Muslim families.
            </p>

            {/* TODO: Add app screenshots when TestFlight build is ready */}

            {/* Waitlist form */}
            {heroSubmitted ? (
              <ThankYouCard onCopy={() => copyWaitlistLink(setHeroCopied)} copied={heroCopied} />
            ) : (
              <div>
                <form onSubmit={handleHeroWaitlist} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto lg:mx-0">
                  <input
                    type="email"
                    value={heroEmail}
                    onChange={(e) => { setHeroEmail(e.target.value); setHeroAlreadyExists(false); }}
                    placeholder="Enter your email"
                    required
                    className="flex-1 px-5 py-3.5 rounded-2xl border border-gray-200 text-hubbs-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-hubbs-orange bg-white"
                  />
                  <button
                    type="submit"
                    className="bg-hubbs-orange text-white px-7 py-3.5 rounded-2xl font-semibold hover:bg-hubbs-orange-dark transition-colors whitespace-nowrap"
                  >
                    Join the Waitlist
                  </button>
                </form>
                {heroAlreadyExists && (
                  <p style={{ color: '#FE7F32', fontSize: '13px', marginTop: '8px' }} className="text-center lg:text-left">
                    You&apos;re already on the list 🧡
                  </p>
                )}
                <p className="text-xs text-hubbs-subtle mt-3 text-center lg:text-left">
                  Be among the first 1,000 families. No spam. Unsubscribe anytime.
                </p>
              </div>
            )}
          </div>

          {/* Phone mockup */}
          <div className="relative flex-shrink-0">
            <div className="absolute inset-0 bg-hubbs-orange/15 rounded-[60px] blur-3xl scale-110 -z-10" />
            <PhoneMockup />
          </div>
        </div>
      </section>

      {/* ── Muslim Family Section ── */}
      <section style={{ backgroundColor: '#FFFBF7', padding: '80px 24px' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{
            display: 'inline-block',
            background: '#FFDFCC', color: '#FE7F32',
            fontSize: '11px', fontWeight: '700',
            padding: '5px 16px', borderRadius: '999px',
            letterSpacing: '0.1em', marginBottom: '20px',
            textTransform: 'uppercase',
          }}>
            Built for Muslim Families
          </span>
          <h2 className="font-display" style={{ fontSize: 'clamp(30px, 5vw, 38px)', color: '#294C72', marginBottom: '20px', lineHeight: '1.2' }}>
            Built for Muslim families
          </h2>
          <p style={{ color: '#5F7995', fontSize: '18px', lineHeight: '1.7', marginBottom: '28px' }}>
            Hubbs is the only family app that combines prayer tracking, daily du&apos;aa, and azan notifications
            with AI-powered habits, family coordination, and a shared family calendar — all in one beautiful app.
            Available in English and Arabic.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
            {[
              '🕌 Prayer Tracker',
              "🤲 Daily Du'aa",
              '🔔 Azan Notifications',
              '👨‍👩‍👧 Family Circle',
            ].map((pill) => (
              <span
                key={pill}
                style={{
                  background: '#FFDFCC', color: '#FE7F32',
                  fontSize: '13px', fontWeight: '600',
                  padding: '7px 16px', borderRadius: '999px',
                }}
              >
                {pill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-hubbs-orange font-semibold text-xs tracking-widest uppercase">Everything You Need</span>
            <h2 className="font-display text-4xl md:text-5xl text-hubbs-blue mt-3 mb-4">Why Hubbs?</h2>
            <p className="text-hubbs-subtle max-w-xl mx-auto">One app. Every habit. Your whole family — together.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div
                key={f.title}
                className={`relative bg-hubbs-light rounded-3xl p-7 group hover:shadow-lg transition-all duration-200 hover:-translate-y-1 ${
                  i === features.length - 1 && features.length % 3 === 1
                    ? 'lg:col-start-2'
                    : ''
                }`}
              >
                <div className="mb-4">{f.icon}</div>
                <h3 className="font-display text-xl text-hubbs-blue mb-2 group-hover:text-hubbs-orange transition-colors">
                  {f.title}
                </h3>
                <p className="text-hubbs-subtle text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI Companion Section ── */}
      <section style={{ backgroundColor: '#294C72', padding: '80px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '52px' }}>
            <span style={{
              display: 'inline-block',
              background: '#FE7F32', color: '#fff',
              fontSize: '11px', fontWeight: '700',
              padding: '5px 16px', borderRadius: '999px',
              letterSpacing: '0.1em', marginBottom: '20px',
              textTransform: 'uppercase',
            }}>
              AI Powered
            </span>
            <h2 className="font-display" style={{ fontSize: 'clamp(32px, 5vw, 44px)', color: '#FFFFFF', marginBottom: '16px', lineHeight: '1.15' }}>
              Meet Your AI Companion
            </h2>
            <p style={{ color: '#94A6B9', fontSize: '18px', maxWidth: '560px', margin: '0 auto', lineHeight: '1.65' }}>
              A personal AI companion you name yourself — one that knows your habits, your mood, and your goals, and checks in before you even ask.
            </p>
            <p style={{ color: '#FE7F32', fontSize: '15px', marginTop: '12px', fontStyle: 'italic' }}>
              Every user names their own AI companion during setup. Yours is waiting. 🧡
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {[
              {
                icon: (
                  <svg width="28" height="28" fill="none" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 6C10 6 7 9 7 13c0 2.5 1.5 4.7 3.7 5.8L14 25l3.3-6.2C19.5 17.7 21 15.5 21 13c0-4-3-7-7-7z" fill="#FE7F32" opacity="0.2" stroke="#FE7F32" strokeWidth="2" strokeLinejoin="round" />
                    <path d="M10 13h2l2-4 2 8 2-4h2" stroke="#FE7F32" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
                title: 'Mood-aware nudges',
                text: 'Your AI notices when you\'ve had a rough few days and reaches out gently.',
              },
              {
                icon: (
                  <svg width="28" height="28" fill="none" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 20l6-8 5 5 4-7 5 3" stroke="#FE7F32" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    <rect x="3" y="3" width="22" height="22" rx="4" stroke="#FE7F32" strokeWidth="2" opacity="0.3" />
                  </svg>
                ),
                title: 'Habit coaching',
                text: 'Personalised suggestions based on your actual streaks and patterns.',
              },
              {
                icon: (
                  <svg width="28" height="28" fill="none" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="9" cy="9" r="4" stroke="#FE7F32" strokeWidth="2" />
                    <circle cx="19" cy="9" r="4" stroke="#FE7F32" strokeWidth="2" />
                    <path d="M3 23c0-3.31 2.69-6 6-6h10c3.31 0 6 2.69 6 6" stroke="#FE7F32" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                ),
                title: 'Family insights',
                text: 'Parents get a quiet heads-up when a child\'s mood or habits need attention.',
              },
            ].map((point) => (
              <div
                key={point.title}
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '20px',
                  padding: '28px',
                }}
              >
                <div style={{
                  width: '52px', height: '52px',
                  background: 'rgba(254,127,50,0.15)',
                  borderRadius: '16px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '16px',
                }}>
                  {point.icon}
                </div>
                <h3 style={{ color: '#FFFFFF', fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>{point.title}</h3>
                <p style={{ color: '#94A6B9', fontSize: '15px', lineHeight: '1.6' }}>{point.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-hubbs-orange font-semibold text-xs tracking-widest uppercase">Simple Pricing</span>
            <h2 className="font-display text-4xl md:text-5xl text-hubbs-blue mt-3 mb-4">Plans for Every Family</h2>
            <p className="text-hubbs-subtle mb-8">Start free, upgrade when you&apos;re ready.</p>

            {/* Billing toggle */}
            <div className="inline-flex items-center bg-white border border-gray-100 shadow-sm rounded-full p-1 gap-1">
              <button
                onClick={() => setAnnual(false)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  !annual ? 'bg-hubbs-orange text-white shadow-sm' : 'text-hubbs-blue hover:text-hubbs-orange'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setAnnual(true)}
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  annual ? 'bg-hubbs-orange text-white shadow-sm' : 'text-hubbs-blue hover:text-hubbs-orange'
                }`}
              >
                Annually
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full transition-colors ${
                  annual ? 'bg-white/25 text-white' : 'bg-green-100 text-green-700'
                }`}>
                  Save 20%
                </span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-3xl p-8 flex flex-col transition-transform ${
                  tier.highlight
                    ? 'bg-hubbs-blue text-white shadow-2xl md:scale-105'
                    : 'bg-white text-hubbs-dark border border-gray-100 shadow-sm'
                }`}
              >
                {tier.badge && (
                  <span
                    className={`absolute -top-3.5 left-1/2 -translate-x-1/2 text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap ${
                      tier.highlight ? 'bg-hubbs-orange text-white' : 'bg-hubbs-blue text-white'
                    }`}
                  >
                    {tier.badge}
                  </span>
                )}

                <div className="mb-6">
                  <h3 className={`font-display text-2xl mb-3 ${tier.highlight ? 'text-white' : 'text-hubbs-blue'}`}>
                    {tier.name}
                  </h3>
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span
                      key={`${tier.name}-${annual ? 'annual' : 'monthly'}`}
                      className={`price-animate font-display text-4xl font-bold ${tier.highlight ? 'text-hubbs-orange' : 'text-hubbs-blue'}`}
                    >
                      {annual ? tier.annualPrice : tier.monthlyPrice}
                    </span>
                    <span className={`text-sm ${tier.highlight ? 'text-white/60' : 'text-hubbs-subtle'}`}>
                      {tier.period !== 'Forever free' ? '/ ' : ''}{tier.period}
                    </span>
                    {annual && tier.annualNote && (
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-700 whitespace-nowrap">
                        Save 20%
                      </span>
                    )}
                  </div>
                  {annual && tier.annualNote && (
                    <p className={`text-xs mt-1.5 ${tier.highlight ? 'text-white/50' : 'text-hubbs-subtle'}`}>
                      {tier.annualNote}
                    </p>
                  )}
                </div>

                <ul className="flex-1 space-y-3 mb-8">
                  {tier.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5 text-sm">
                      <svg
                        className="w-5 h-5 flex-shrink-0 mt-0.5 text-hubbs-orange"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className={tier.highlight ? 'text-white/80' : 'text-hubbs-subtle'}>{feat}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#waitlist"
                  className={`block text-center py-3.5 rounded-2xl font-semibold text-sm transition-colors ${
                    tier.highlight
                      ? 'bg-hubbs-orange text-white hover:bg-hubbs-orange-dark'
                      : 'bg-hubbs-light text-hubbs-blue border border-hubbs-blue/20 hover:bg-gray-100'
                  }`}
                >
                  {tier.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA / Waitlist ── */}
      <section id="waitlist" className="py-24 px-6 bg-hubbs-blue">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl text-white mb-4 leading-tight">
            Ready to get started?
          </h2>
          <p className="text-white/65 text-lg mb-10">
            Be among the first families to build better lives with Hubbs.
          </p>

          {ctaSubmitted ? (
            <ThankYouCard onCopy={() => copyWaitlistLink(setCtaCopied)} copied={ctaCopied} />
          ) : (
            <>
              <form onSubmit={handleCtaWaitlist} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={ctaEmail}
                  onChange={(e) => { setCtaEmail(e.target.value); setCtaAlreadyExists(false); }}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-5 py-3.5 rounded-2xl text-hubbs-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-hubbs-orange"
                />
                <button
                  type="submit"
                  className="bg-hubbs-orange text-white px-7 py-3.5 rounded-2xl font-semibold hover:bg-hubbs-orange-dark transition-colors whitespace-nowrap"
                >
                  Join the Waitlist
                </button>
              </form>
              {ctaAlreadyExists && (
                <p style={{ color: '#FE7F32', fontSize: '13px', marginTop: '8px' }}>
                  You&apos;re already on the list 🧡
                </p>
              )}
            </>
          )}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-hubbs-dark text-white/50 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            <a href="#" style={{ textDecoration: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'visible', padding: '8px 0' }}>
                <svg width="36" height="44" viewBox="0 0 36 44" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible', flexShrink: 0 }}>
                  <circle cx="9" cy="6" r="6" fill="#FE7F32"/>
                  <rect x="4" y="14" width="10" height="22" rx="5" fill="#FE7F32"/>
                  <circle cx="27" cy="6" r="6" fill="#FE7F32"/>
                  <rect x="22" y="14" width="10" height="22" rx="5" fill="#FE7F32"/>
                  <rect x="14" y="20" width="8" height="8" rx="2" fill="#FE7F32"/>
                </svg>
                <span style={{ fontWeight: '700', fontSize: '20px', color: '#ffffff', letterSpacing: '-0.5px' }}>
                  hubbs
                </span>
              </div>
            </a>
            <nav className="flex flex-wrap gap-6 text-sm justify-center">
              <a href="#features" className="hover:text-hubbs-orange transition-colors">Features</a>
              <a href="#pricing" className="hover:text-hubbs-orange transition-colors">Pricing</a>
              <a href="#waitlist" className="hover:text-hubbs-orange transition-colors">Join Waitlist</a>
              <a href="/privacy" className="hover:text-hubbs-orange transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-hubbs-orange transition-colors">Terms of Service</a>
              <a href="mailto:support@hubbsapp.com" className="hover:text-hubbs-orange transition-colors">Contact</a>
            </nav>
            {/* Social icons */}
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <a href="https://www.instagram.com/hubbsapp" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ color: 'rgba(255,255,255,0.5)', transition: 'color 0.2s' }} onMouseEnter={e => (e.currentTarget.style.color = '#FE7F32')} onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="https://www.tiktok.com/@hubbsapp" target="_blank" rel="noopener noreferrer" aria-label="TikTok" style={{ color: 'rgba(255,255,255,0.5)', transition: 'color 0.2s' }} onMouseEnter={e => (e.currentTarget.style.color = '#FE7F32')} onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z" />
                </svg>
              </a>
              <a href="https://x.com/hubbsapp" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" style={{ color: 'rgba(255,255,255,0.5)', transition: 'color 0.2s' }} onMouseEnter={e => (e.currentTarget.style.color = '#FE7F32')} onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.259 5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-sm">
            © 2026 Hubbs. All rights reserved. Made with love for families everywhere.
          </div>
        </div>
      </footer>

    </div>
  );
}
