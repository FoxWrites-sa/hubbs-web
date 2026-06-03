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
    title: '1. Acceptance of Terms',
    content: (
      <p className="leading-relaxed">
        By downloading, installing, or using the Hubbs application, you agree to be bound by these Terms of Service. If you do not agree, do not use the app.
      </p>
    ),
  },
  {
    title: '2. Description of Service',
    content: (
      <p className="leading-relaxed">
        Hubbs is a family wellness and productivity application that provides habit tracking, prayer tracking, mood check-ins, family coordination, AI assistant, and related features. The service is available on iOS and Android devices.
      </p>
    ),
  },
  {
    title: '3. Account Registration',
    content: (
      <ul className="space-y-2 leading-relaxed list-none">
        {[
          'You must provide accurate and complete information',
          'You are responsible for maintaining account security',
          'You must be at least 13 years old to create an account',
          'Parents must create and manage accounts for children under 13',
          'One person may not create multiple accounts to circumvent subscription limits',
          'We reserve the right to suspend accounts that violate these terms',
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
    title: '4. Subscription Plans and Payments',
    content: (
      <>
        <p className="leading-relaxed mb-3">Hubbs offers three plans:</p>
        <ul className="space-y-2 leading-relaxed list-none mb-4">
          {[
            'Free: limited features, no payment required',
            'Pro: $7.99/month or $71.88/year',
            'Family Pro: $12.99/month or $119.88/year',
          ].map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#FE7F32' }} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <ul className="space-y-2 leading-relaxed list-none">
          {[
            'Subscriptions are billed through the App Store or Google Play',
            'Subscriptions automatically renew unless cancelled at least 24 hours before the renewal date',
            'You can manage or cancel subscriptions in your App Store or Google Play account settings',
            'Refunds are subject to Apple App Store and Google Play refund policies',
            'We reserve the right to change pricing with 30 days notice',
          ].map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#FE7F32' }} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    title: '5. Free Trial',
    content: (
      <ul className="space-y-2 leading-relaxed list-none">
        {[
          'Where offered, free trials automatically convert to paid subscriptions',
          'Cancel before the trial ends to avoid charges',
          'Only one free trial per Apple ID or Google account',
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
    title: '6. Acceptable Use',
    content: (
      <>
        <p className="leading-relaxed mb-3">You agree not to:</p>
        <ul className="space-y-2 leading-relaxed list-none">
          {[
            'Use the app for any unlawful purpose',
            'Attempt to hack, reverse engineer, or compromise the app or its servers',
            'Share your account credentials with others',
            'Use the AI assistant to generate harmful, illegal, or offensive content',
            'Impersonate other users or Hubbs staff',
            'Use the app to harass or harm other family members',
          ].map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#FE7F32' }} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    title: '7. AI Assistant Terms',
    content: (
      <ul className="space-y-2 leading-relaxed list-none">
        {[
          'The Buddy AI assistant is powered by third-party AI',
          'AI responses are for informational and entertainment purposes only',
          'AI responses are not professional medical, legal, financial, or psychological advice',
          'Do not rely on AI responses for critical decisions',
          'We are not liable for actions taken based on AI responses',
          'We reserve the right to monitor AI usage to prevent abuse',
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
    title: '8. Intellectual Property',
    content: (
      <ul className="space-y-2 leading-relaxed list-none">
        {[
          'All content, design, and code in Hubbs is owned by Hubbs and protected by copyright',
          'The Hubbs name, logo, and brand are trademarks of Hubbs',
          'You may not copy, reproduce, or distribute any part of the app without written permission',
          'User-generated content (habits, notes, etc.) remains owned by you',
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
    title: '9. Disclaimer of Warranties',
    content: (
      <>
        <p className="leading-relaxed mb-3">
          The app is provided &ldquo;as is&rdquo; without warranties of any kind. We do not guarantee:
        </p>
        <ul className="space-y-2 leading-relaxed list-none mb-3">
          {[
            'Uninterrupted or error-free service',
            'Accuracy of AI responses',
            'That the app will meet all your requirements',
          ].map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#FE7F32' }} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="leading-relaxed">Use of the app is at your own risk.</p>
      </>
    ),
  },
  {
    title: '10. Limitation of Liability',
    content: (
      <p className="leading-relaxed">
        To the maximum extent permitted by law, Hubbs shall not be liable for any indirect, incidental, or consequential damages arising from your use of the app, including data loss, service interruption, or reliance on AI-generated content.
      </p>
    ),
  },
  {
    title: '11. Termination',
    content: (
      <ul className="space-y-2 leading-relaxed list-none">
        {[
          'We may suspend or terminate your account for violations of these terms',
          'You may delete your account at any time from the app settings',
          'Upon termination, your data will be deleted within 30 days per our Privacy Policy',
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
    title: '12. Governing Law',
    content: (
      <p className="leading-relaxed">
        These terms are governed by the laws of the Kingdom of Saudi Arabia. Any disputes shall be resolved through good faith negotiation, and if necessary, binding arbitration.
      </p>
    ),
  },
  {
    title: '13. Changes to Terms',
    content: (
      <p className="leading-relaxed">
        We may update these terms at any time. We will notify you of significant changes via email or in-app notification. Continued use constitutes acceptance of updated terms.
      </p>
    ),
  },
  {
    title: '14. Contact Us',
    content: (
      <ul className="space-y-2 leading-relaxed list-none">
        <li className="flex items-start gap-2.5">
          <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#FE7F32' }} />
          <span>Email: <a href="mailto:hello@hubbsapp.com" className="hover:opacity-80 transition-opacity" style={{ color: '#FE7F32' }}>hello@hubbsapp.com</a></span>
        </li>
        <li className="flex items-start gap-2.5">
          <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#FE7F32' }} />
          <span>Website: <a href="https://hubbsapp.com" className="hover:opacity-80 transition-opacity" style={{ color: '#FE7F32' }}>hubbsapp.com</a></span>
        </li>
      </ul>
    ),
  },
];

export default function TermsPage() {
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
            <h1 className="font-display text-5xl md:text-6xl mb-3" style={{ color: '#294C72' }}>Terms of Service</h1>
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
