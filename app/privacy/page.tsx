'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

function NavLogo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'visible', padding: '8px 0' }}>
      <svg width="36" height="44" viewBox="0 0 36 44" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible', flexShrink: 0 }}>
        <circle cx="9" cy="6" r="6" fill="#FE7F32" />
        <rect x="4" y="14" width="10" height="22" rx="5" fill="#FE7F32" />
        <circle cx="27" cy="6" r="6" fill="#FE7F32" />
        <rect x="22" y="14" width="10" height="22" rx="5" fill="#FE7F32" />
        <rect x="14" y="20" width="8" height="8" rx="2" fill="#FE7F32" />
      </svg>
      <span style={{ fontWeight: '700', fontSize: '20px', color: '#294C72', letterSpacing: '-0.5px' }}>hubbs</span>
    </div>
  );
}

function FooterLogo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'visible', padding: '8px 0' }}>
      <svg width="36" height="44" viewBox="0 0 36 44" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible', flexShrink: 0 }}>
        <circle cx="9" cy="6" r="6" fill="#FE7F32" />
        <rect x="4" y="14" width="10" height="22" rx="5" fill="#FE7F32" />
        <circle cx="27" cy="6" r="6" fill="#FE7F32" />
        <rect x="22" y="14" width="10" height="22" rx="5" fill="#FE7F32" />
        <rect x="14" y="20" width="8" height="8" rx="2" fill="#FE7F32" />
      </svg>
      <span style={{ fontWeight: '700', fontSize: '20px', color: '#ffffff', letterSpacing: '-0.5px' }}>hubbs</span>
    </div>
  );
}

const sections = [
  {
    title: '1. Introduction',
    content: (
      <p className="leading-relaxed">
        Hubbs (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;) is committed to protecting your privacy. This policy explains how we collect, use, and protect your personal information when you use the Hubbs mobile application and website (hubbsapp.com).
      </p>
    ),
  },
  {
    title: '2. Information We Collect',
    content: (
      <ul className="space-y-2 leading-relaxed list-none">
        {[
          'Account information: name, email address, phone number, date of birth (to determine age group)',
          'Profile information: profile photo',
          'Usage data: habits, mood check-ins, prayer completions, calendar events, shopping lists',
          'AI conversation data: messages sent to the Buddy AI assistant',
          'Device information: device type, OS version, app version',
          'Location data: only if you grant permission, used for calendar event locations only',
        ].map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#FE7F32' }} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    title: '3. How We Use Your Information',
    content: (
      <ul className="space-y-2 leading-relaxed list-none">
        {[
          'To provide and improve the Hubbs app experience',
          'To personalize AI responses based on your habits, mood, and goals',
          'To send you important app notifications',
          'To process subscription payments via RevenueCat',
          'To send transactional emails via Resend',
          'We do NOT sell your personal data to third parties',
          'We do NOT use your data for advertising purposes',
        ].map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#FE7F32' }} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    title: "4. Children's Privacy (COPPA Compliance)",
    content: (
      <ul className="space-y-2 leading-relaxed list-none">
        {[
          'Hubbs is designed for family use including children',
          'We do not knowingly collect personal information from children under 13 without verified parental consent',
          'Parents or guardians must create accounts for children under 13',
          'If you believe a child under 13 has provided us personal information without consent, contact us at privacy@hubbsapp.com and we will delete it',
          'For users aged 13–17, parental guidance is recommended',
          "Children's data is never used for advertising or sold to third parties",
        ].map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#FE7F32' }} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    title: '5. AI Assistant (Buddy)',
    content: (
      <ul className="space-y-2 leading-relaxed list-none">
        {[
          'Conversations with Buddy are processed by Groq AI',
          'Messages may be used to improve AI responses within your session',
          'We do not permanently store AI conversation content beyond your session history',
          'You can delete your conversation history at any time from the app',
          'Do not share sensitive personal or financial information with the AI assistant',
        ].map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#FE7F32' }} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    title: '6. Data Sharing',
    content: (
      <>
        <p className="leading-relaxed mb-3">We share data only with these trusted service providers:</p>
        <ul className="space-y-2 leading-relaxed list-none mb-3">
          {[
            'MongoDB: secure database hosting',
            'Groq: AI processing for Buddy assistant',
            'RevenueCat: subscription management',
            'Resend: transactional email delivery',
            'Google Places API: location search for calendar',
          ].map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#FE7F32' }} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="leading-relaxed">All providers are bound by strict data protection agreements.</p>
      </>
    ),
  },
  {
    title: '7. Data Security',
    content: (
      <ul className="space-y-2 leading-relaxed list-none">
        {[
          'All data is transmitted over encrypted HTTPS connections',
          'Passwords are hashed and never stored in plain text',
          'JWT tokens are used for secure authentication',
          'We regularly review our security practices',
        ].map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#FE7F32' }} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    title: '8. Data Retention',
    content: (
      <ul className="space-y-2 leading-relaxed list-none">
        {[
          'Your data is retained as long as your account is active',
          'You can request deletion of your account and all associated data by emailing privacy@hubbsapp.com',
          'We will process deletion requests within 30 days',
        ].map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#FE7F32' }} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    title: '9. Your Rights',
    content: (
      <>
        <p className="leading-relaxed mb-3">Depending on your location, you may have the right to:</p>
        <ul className="space-y-2 leading-relaxed list-none mb-3">
          {[
            'Access the personal data we hold about you',
            'Request correction of inaccurate data',
            'Request deletion of your data',
            'Object to processing of your data',
            'Data portability',
          ].map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#FE7F32' }} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="leading-relaxed">To exercise these rights contact: <a href="mailto:privacy@hubbsapp.com" className="hover:opacity-80 transition-opacity" style={{ color: '#FE7F32' }}>privacy@hubbsapp.com</a></p>
      </>
    ),
  },
  {
    title: '10. International Users',
    content: (
      <p className="leading-relaxed">
        Hubbs serves users globally including MENA regions. Your data may be processed in servers located outside your country. By using Hubbs you consent to this transfer.
      </p>
    ),
  },
  {
    title: '11. Changes to This Policy',
    content: (
      <p className="leading-relaxed">
        We may update this policy from time to time. We will notify you of significant changes via email or in-app notification. Continued use of the app after changes constitutes acceptance.
      </p>
    ),
  },
  {
    title: '12. Contact Us',
    content: (
      <ul className="space-y-2 leading-relaxed list-none">
        <li className="flex items-start gap-2.5">
          <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#FE7F32' }} />
          <span>Email: <a href="mailto:privacy@hubbsapp.com" className="hover:opacity-80 transition-opacity" style={{ color: '#FE7F32' }}>privacy@hubbsapp.com</a></span>
        </li>
        <li className="flex items-start gap-2.5">
          <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#FE7F32' }} />
          <span>Website: <a href="https://hubbsapp.com" className="hover:opacity-80 transition-opacity" style={{ color: '#FE7F32' }}>hubbsapp.com</a></span>
        </li>
      </ul>
    ),
  },
];

export default function PrivacyPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen font-body" style={{ backgroundColor: '#FFFBF7', color: '#294C72' }}>

      {/* ── Navbar ── */}
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-white/90 backdrop-blur-sm'}`}>
        <div
          className="max-w-6xl mx-auto px-6 flex justify-between"
          style={{ minHeight: '70px', overflow: 'visible', alignItems: 'center', paddingTop: '4px', paddingBottom: '4px' }}
        >
          <Link href="/" style={{ textDecoration: 'none' }}>
            <NavLogo />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/#features" className="text-sm font-medium text-hubbs-dark hover:text-hubbs-orange transition-colors">Features</Link>
            <Link href="/#pricing" className="text-sm font-medium text-hubbs-dark hover:text-hubbs-orange transition-colors">Pricing</Link>
            <Link href="/#download" className="text-sm font-medium text-hubbs-dark hover:text-hubbs-orange transition-colors">Download</Link>
            <Link href="/#download" className="bg-hubbs-orange text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-hubbs-orange-dark transition-colors">
              Get the App
            </Link>
          </div>

          <button className="md:hidden p-2 flex flex-col gap-1.5" onClick={() => setMenuOpen((o) => !o)} aria-label="Toggle menu">
            <span className={`block w-6 h-0.5 bg-hubbs-dark transition-transform duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-hubbs-dark transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-hubbs-dark transition-transform duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-6 py-5 flex flex-col gap-4">
            <Link href="/#features" className="font-medium text-hubbs-dark hover:text-hubbs-orange" onClick={() => setMenuOpen(false)}>Features</Link>
            <Link href="/#pricing" className="font-medium text-hubbs-dark hover:text-hubbs-orange" onClick={() => setMenuOpen(false)}>Pricing</Link>
            <Link href="/#download" className="font-medium text-hubbs-dark hover:text-hubbs-orange" onClick={() => setMenuOpen(false)}>Download</Link>
            <Link href="/#download" className="bg-hubbs-orange text-white font-semibold px-5 py-3 rounded-full text-center" onClick={() => setMenuOpen(false)}>
              Get the App
            </Link>
          </div>
        )}
      </nav>

      {/* ── Content ── */}
      <div className="pt-32 pb-24 px-6">
        <div className="mx-auto" style={{ maxWidth: '800px' }}>
          <div className="mb-12">
            <h1 className="font-display text-5xl md:text-6xl mb-3" style={{ color: '#294C72' }}>Privacy Policy</h1>
            <p className="text-hubbs-subtle text-lg">Last updated: May 2025</p>
          </div>

          <div className="space-y-10">
            {sections.map((s) => (
              <section key={s.title}>
                <h2 className="font-display text-2xl mb-4" style={{ color: '#FE7F32' }}>{s.title}</h2>
                <div style={{ color: '#294C72' }}>{s.content}</div>
              </section>
            ))}
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="bg-hubbs-dark text-white/50 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            <Link href="/" style={{ textDecoration: 'none' }}>
              <FooterLogo />
            </Link>
            <nav className="flex flex-wrap gap-6 text-sm justify-center">
              <Link href="/#features" className="hover:text-hubbs-orange transition-colors">Features</Link>
              <Link href="/#pricing" className="hover:text-hubbs-orange transition-colors">Pricing</Link>
              <Link href="/#download" className="hover:text-hubbs-orange transition-colors">Download</Link>
              <Link href="/privacy" className="hover:text-hubbs-orange transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-hubbs-orange transition-colors">Terms of Service</Link>
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
