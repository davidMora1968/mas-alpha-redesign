import type { Metadata } from 'next';
import { Spectral, Hanken_Grotesk } from 'next/font/google';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import './globals.css';

const spectral = Spectral({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-spectral',
  display: 'swap',
});

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-hanken',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  // Client-demo mode: keep the vercel.app preview out of search indexes
  // until the firm's real domain goes live (see app/robots.ts).
  ...(process.env.DEMO_NOINDEX === '1'
    ? { robots: { index: false, follow: false } }
    : {}),
  title: {
    default: 'Mas Alpha Securities — We own what cannot be replaced',
    template: '%s — Mas Alpha Securities',
  },
  description:
    'Mas Alpha Securities deploys private capital to acquire premier, irreplaceable real assets across the United States — and holds them for the long term.',
  openGraph: {
    siteName: 'Mas Alpha Securities',
    type: 'website',
    title: 'Mas Alpha Securities — We own what cannot be replaced',
    description:
      'Mas Alpha Securities deploys private capital to acquire premier, irreplaceable real assets across the United States — and holds them for the long term.',
    // og:image comes from app/opengraph-image.tsx (branded card)
  },
  icons: {
    icon: '/assets/logos/mas-icon.png',
    apple: '/apple-touch-icon.png',
  },
};

// Same base used for metadataBase — JSON-LD URL properties must be absolute,
// crawlable URLs (relative paths can be dropped from rich results).
const SITE_BASE = (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/$/, '');

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Mas Alpha Securities',
  description:
    'A private investment firm acquiring premier, irreplaceable real assets across the United States — essential infrastructure, experiential hospitality, and media & entertainment — held for the long term.',
  foundingDate: '2023',
  url: SITE_BASE,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Coral Gables',
    addressRegion: 'FL',
    addressCountry: 'US',
  },
  email: 'ir@masalphasecurities.com',
  logo: `${SITE_BASE}/assets/logos/mas-icon.png`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spectral.variable} ${hanken.variable}`}>
      <body>
        {/* Keyboard/switch users bypass the fixed nav. No sr-only utility exists
            here, so the link ships its own focus-reveal (off-screen until focused). */}
        <a
          href="#main"
          className="type-nav absolute left-4 top-[-200px] z-[100] border border-gold-400 bg-navy-950 px-5 py-3 uppercase text-stone-50 no-underline transition-[top] duration-200 focus:top-4 focus-visible:top-4"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
