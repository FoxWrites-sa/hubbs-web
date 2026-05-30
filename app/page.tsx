'use client';

import { useState, useEffect } from 'react';

function HubbsLogo({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Hubbs">
      {/* Left figure */}
      <circle cx="11" cy="9" r="5" fill="#FE7F32" />
      <path d="M6 18c0-2.76 2.24-5 5-5s5 2.24 5 5v8H6v-8z" fill="#FE7F32" />
      {/* Right figure */}
      <circle cx="33" cy="9" r="5" fill="#FE7F32" />
      <path d="M28 18c0-2.76 2.24-5 5-5s5 2.24 5 5v8H28v-8z" fill="#FE7F32" />
      {/* H crossbar */}
      <rect x="16" y="20" width="12" height="5" rx="2.5" fill="#FE7F32" />
    </svg>
  );
}

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
      {/* Phone shell */}
      <rect width="260" height="500" rx="44" fill="#1A2F45" />
      {/* Screen */}
      <rect x="10" y="10" width="240" height="480" rx="36" fill="#0F1923" />
      {/* Notch */}
      <rect x="88" y="16" width="84" height="6" rx="3" fill="#294C72" opacity="0.6" />
      {/* App bar */}
      <rect x="22" y="36" width="90" height="16" rx="6" fill="#294C72" opacity="0.8" />
      <circle cx="224" cy="44" r="12" fill="#FE7F32" opacity="0.2" />
      <circle cx="224" cy="44" r="6" fill="#FE7F32" opacity="0.7" />
      {/* Section label */}
      <rect x="22" y="66" width="60" height="8" rx="3" fill="#294C72" opacity="0.5" />
      {/* Habit card 1 */}
      <rect x="22" y="84" width="216" height="58" rx="14" fill="#294C72" opacity="0.35" />
      <circle cx="52" cy="113" r="16" fill="#FE7F32" opacity="0.85" />
      <rect x="78" y="102" width="90" height="9" rx="4" fill="white" opacity="0.55" />
      <rect x="78" y="117" width="55" height="7" rx="3" fill="white" opacity="0.3" />
      <rect x="210" y="107" width="18" height="12" rx="4" fill="#FE7F32" opacity="0.6" />
      {/* Habit card 2 */}
      <rect x="22" y="152" width="216" height="58" rx="14" fill="#294C72" opacity="0.35" />
      <circle cx="52" cy="181" r="16" fill="#22C55E" opacity="0.85" />
      <rect x="78" y="170" width="110" height="9" rx="4" fill="white" opacity="0.55" />
      <rect x="78" y="185" width="65" height="7" rx="3" fill="white" opacity="0.3" />
      <rect x="206" y="175" width="22" height="12" rx="4" fill="#22C55E" opacity="0.5" />
      {/* Habit card 3 */}
      <rect x="22" y="220" width="216" height="58" rx="14" fill="#294C72" opacity="0.35" />
      <circle cx="52" cy="249" r="16" fill="#8B5CF6" opacity="0.85" />
      <rect x="78" y="238" width="75" height="9" rx="4" fill="white" opacity="0.55" />
      <rect x="78" y="253" width="95" height="7" rx="3" fill="white" opacity="0.3" />
      <rect x="208" y="243" width="20" height="12" rx="4" fill="#8B5CF6" opacity="0.5" />
      {/* Progress bar area */}
      <rect x="22" y="294" width="216" height="40" rx="14" fill="#294C72" opacity="0.2" />
      <rect x="32" y="304" width="100" height="6" rx="3" fill="#FE7F32" opacity="0.7" />
      <rect x="32" y="314" width="160" height="6" rx="3" fill="white" opacity="0.15" />
      {/* Bottom nav bar */}
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
    title: 'Prayer Times',
    desc: 'Accurate prayer times and Qibla direction wherever you are, with beautiful azan notifications.',
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="5" width="22" height="20" rx="3" stroke="#FE7F32" strokeWidth="2" />
        <path d="M3 11h22M9 3v4M19 3v4" stroke="#FE7F32" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: 'Family Calendar',
    desc: 'Shared events, birthdays, and reminders — everyone stays on the same page, always.',
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 5h20a2 2 0 012 2v12a2 2 0 01-2 2H8l-6 4V7a2 2 0 012-2z" stroke="#FE7F32" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Family Chat',
    desc: 'A private, ad-free space for your family to connect, share memories, and celebrate together.',
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 6h20M4 12h14M4 18h17" stroke="#FE7F32" strokeWidth="2" strokeLinecap="round" />
        <circle cx="22" cy="20" r="5" fill="none" stroke="#FE7F32" strokeWidth="2" />
        <path d="M20 20l1.5 1.5L24 18" stroke="#FE7F32" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Learning Hub',
    desc: 'Curated articles and guided sessions on health, mindfulness, productivity, and faith.',
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
    price: '$0',
    period: 'Forever free',
    badge: null,
    features: [
      '1 family member',
      '3 active habits',
      'Prayer times & Qibla',
      'Basic articles',
      'Family calendar (view)',
    ],
    cta: 'Get Started',
    highlight: false,
  },
  {
    name: 'Premium',
    price: '$4.99',
    period: 'per month',
    badge: 'MOST POPULAR',
    features: [
      'Up to 5 family members',
      'Unlimited habits',
      'Full learning hub access',
      'Family chat & lists',
      'Priority support',
    ],
    cta: 'Start Free Trial',
    highlight: true,
  },
  {
    name: 'Family Pro',
    price: '$9.99',
    period: 'per month',
    badge: 'BEST VALUE',
    features: [
      'Unlimited family members',
      'Everything in Premium',
      'Custom family challenges',
      'Advanced analytics',
      'Early feature access',
    ],
    cta: 'Get Family Pro',
    highlight: false,
  },
];

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function handleWaitlist(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-hubbs-light font-body text-hubbs-dark">

      {/* ── Navbar ── */}
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5">
            <HubbsLogo size={36} />
            <span className="font-display text-2xl text-hubbs-orange tracking-wide">hubbs</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-hubbs-dark hover:text-hubbs-orange transition-colors">Features</a>
            <a href="#pricing" className="text-sm font-medium text-hubbs-dark hover:text-hubbs-orange transition-colors">Pricing</a>
            <a href="#download" className="text-sm font-medium text-hubbs-dark hover:text-hubbs-orange transition-colors">Download</a>
            <a
              href="#download"
              className="bg-hubbs-orange text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-hubbs-orange-dark transition-colors"
            >
              Get the App
            </a>
          </div>

          {/* Mobile hamburger */}
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

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-6 py-5 flex flex-col gap-4">
            <a href="#features" className="font-medium text-hubbs-dark hover:text-hubbs-orange" onClick={() => setMenuOpen(false)}>Features</a>
            <a href="#pricing" className="font-medium text-hubbs-dark hover:text-hubbs-orange" onClick={() => setMenuOpen(false)}>Pricing</a>
            <a href="#download" className="font-medium text-hubbs-dark hover:text-hubbs-orange" onClick={() => setMenuOpen(false)}>Download</a>
            <a
              href="#download"
              className="bg-hubbs-orange text-white font-semibold px-5 py-3 rounded-full text-center"
              onClick={() => setMenuOpen(false)}
            >
              Get the App
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
              Build better habits, strengthen family bonds, and grow together — all in one beautiful app designed for modern families.
            </p>

            {/* App store buttons */}
            <div id="download" className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#"
                className="inline-flex items-center gap-3 bg-hubbs-blue text-white px-6 py-3.5 rounded-2xl hover:bg-hubbs-dark transition-colors"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.73M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <div className="text-left">
                  <div className="text-xs opacity-70">Download on the</div>
                  <div className="text-sm font-semibold leading-tight">App Store</div>
                </div>
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-3 bg-hubbs-blue text-white px-6 py-3.5 rounded-2xl hover:bg-hubbs-dark transition-colors"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M3.18 23.76c.3.17.64.22.99.14l12.2-6.9-2.54-2.54-10.65 9.3zM.75 1.54C.44 1.88.26 2.38.26 3v18c0 .62.18 1.12.49 1.46l.08.07 10.08-10.08v-.24L.83 1.47l-.08.07zM20.76 10.46l-2.82-1.6-2.84 2.84 2.84 2.84 2.85-1.62c.81-.46.81-1.21-.03-1.46zM3.18.24L15.38 7.14l-2.54 2.54-9.66-9.44z" />
                </svg>
                <div className="text-left">
                  <div className="text-xs opacity-70">Get it on</div>
                  <div className="text-sm font-semibold leading-tight">Google Play</div>
                </div>
              </a>
            </div>
          </div>

          {/* Phone mockup */}
          <div className="relative flex-shrink-0">
            <div className="absolute inset-0 bg-hubbs-orange/15 rounded-[60px] blur-3xl scale-110 -z-10" />
            <PhoneMockup />
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
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-hubbs-light rounded-3xl p-7 group hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
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

      {/* ── Pricing ── */}
      <section id="pricing" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-hubbs-orange font-semibold text-xs tracking-widest uppercase">Simple Pricing</span>
            <h2 className="font-display text-4xl md:text-5xl text-hubbs-blue mt-3 mb-4">Plans for Every Family</h2>
            <p className="text-hubbs-subtle">Start free, upgrade when you&apos;re ready.</p>
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
                  <h3 className={`font-display text-2xl mb-2 ${tier.highlight ? 'text-white' : 'text-hubbs-blue'}`}>
                    {tier.name}
                  </h3>
                  <div className="flex items-baseline gap-1.5">
                    <span className={`font-display text-4xl font-bold ${tier.highlight ? 'text-hubbs-orange' : 'text-hubbs-blue'}`}>
                      {tier.price}
                    </span>
                    <span className={`text-sm ${tier.highlight ? 'text-white/60' : 'text-hubbs-subtle'}`}>
                      / {tier.period}
                    </span>
                  </div>
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
                  href="#download"
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
      <section className="py-24 px-6 bg-hubbs-blue">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl text-white mb-4 leading-tight">
            Ready to get started?
          </h2>
          <p className="text-white/65 text-lg mb-10">
            Join thousands of families building better lives with Hubbs.
          </p>

          {submitted ? (
            <div className="bg-white/10 border border-white/20 rounded-3xl p-10">
              <div className="text-5xl mb-3">🎉</div>
              <h3 className="font-display text-2xl text-hubbs-orange mb-2">You&apos;re on the list!</h3>
              <p className="text-white/65">We&apos;ll notify you when Hubbs launches in your region.</p>
            </div>
          ) : (
            <form onSubmit={handleWaitlist} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-5 py-3.5 rounded-2xl text-hubbs-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-hubbs-orange"
              />
              <button
                type="submit"
                className="bg-hubbs-orange text-white px-7 py-3.5 rounded-2xl font-semibold hover:bg-hubbs-orange-dark transition-colors whitespace-nowrap"
              >
                Join Waitlist
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-hubbs-dark text-white/50 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            <a href="#" className="flex items-center gap-2.5">
              <HubbsLogo size={30} />
              <span className="font-display text-xl text-white">hubbs</span>
            </a>
            <nav className="flex flex-wrap gap-6 text-sm justify-center">
              <a href="#features" className="hover:text-hubbs-orange transition-colors">Features</a>
              <a href="#pricing" className="hover:text-hubbs-orange transition-colors">Pricing</a>
              <a href="#download" className="hover:text-hubbs-orange transition-colors">Download</a>
              <a href="mailto:support@hubbsapp.com" className="hover:text-hubbs-orange transition-colors">Contact</a>
            </nav>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-sm">
            © 2026 Hubbs. All rights reserved. Made with love for families everywhere.
          </div>
        </div>
      </footer>

    </div>
  );
}
