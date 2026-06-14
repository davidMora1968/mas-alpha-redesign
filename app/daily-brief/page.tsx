import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';

/**
 * The Daily Brief — Edition No. 1. The firm's new digital home introduces
 * itself to the leadership team: what was built, what the press is saying,
 * who stewards it, and the ecosystem this brief begins. Sent personally by
 * David; the page renders as if the website itself is reporting in.
 */

const description =
  'The first edition of the Daily Brief — the firm’s new digital home, reporting to the people who lead it.';

export const metadata: Metadata = {
  title: 'The Daily Brief',
  description,
  robots: { index: false, follow: false },
  openGraph: { title: 'The Daily Brief', description },
};

const PRESS = [
  {
    outlet: 'Cowboy State Daily',
    headline: 'New Owner of Meadowlark Ski Resort Says He Wants to Keep It Small',
    date: 'May 15, 2026',
    href: 'https://cowboystatedaily.com/2026/05/15/new-owner-of-meadowlark-ski-resort-says-he-wants-to-keep-it-small/',
  },
  {
    outlet: 'Northern Wyoming News',
    headline: 'New Ownership for Meadowlark Ski & Lake Lodge',
    date: 'May 14, 2026',
    href: 'https://www.wyodaily.com/story/2026/05/14/news/new-ownership-for-meadowlark-ski-and-lake-lodge/17826.html',
  },
  {
    outlet: 'POWDER',
    headline: 'Meet the New Owner of Meadowlark Ski Area, Wyoming',
    date: 'May 2026',
    href: 'https://www.powder.com/news/new-owner-meadowlark-ski-area-wyoming',
  },
];

const TEAM = [
  ['Jose Mas Jr.', 'Founder, CEO & CIO'],
  ['Isabella Katz', 'Chief Marketing Officer'],
  ['Moises Jattin', 'Head of Partner Relations'],
  ['Gabriel Freire', 'Chief Financial Officer'],
  ['Mary deVenoge', 'Director, The MAS Partners Club'],
] as const;

const STATS = [
  ['07', 'Pages, each given room to breathe'],
  ['06', 'Press features, linked and archived'],
  ['05', 'Stewards in the leadership gallery'],
  ['01', 'Ecosystem, and this is its first instrument'],
] as const;

function SectionEyebrow({ num, children }: { num: string; children: string }) {
  return (
    <Eyebrow onDark={false}>
      <span className="mr-3.5">{num}</span>
      {children}
    </Eyebrow>
  );
}

export default function DailyBriefPage() {
  return (
    <main id="main" tabIndex={-1} className="scroll-mt-[92px]">
      {/* Masthead */}
      <section className="gutter bg-navy-950 pb-24 pt-44 max-[640px]:pb-16 max-[640px]:pt-36">
        <div className="content flex flex-col items-start gap-8">
          <Reveal>
            <span className="type-eyebrow text-gold-400">Edition No. 1 · Monday, June 15, 2026</span>
          </Reveal>
          <Reveal delay={150}>
            <h1 className="type-display-xl max-w-[9em] text-balance text-stone-50">
              The Daily{' '}Brief.
            </h1>
          </Reveal>
          <Reveal delay={300}>
            <p className="type-lede max-w-[34em] text-navy-100">
              Good morning. This is the first edition of the Daily Brief — prepared by the
              firm{'’'}s new digital home, for the people who lead it.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 01 — The new home */}
      <section className="gutter bg-stone-100 py-36 max-[640px]:py-20">
        <div className="content flex flex-col gap-12">
          <Reveal>
            <SectionEyebrow num="01">The new home</SectionEyebrow>
          </Reveal>
          <Reveal delay={150}>
            <h2 className="type-display-lg max-w-[14em] text-balance text-navy-900">
              The firm{'’'}s digital home has been rebuilt — to the standard of the assets
              it{' '}describes.
            </h2>
          </Reveal>
          <Reveal delay={300}>
            <p className="type-lede max-w-[36em] text-ink-600">
              Seven editorial pages. The shoreline in black and white. The philosophy, the
              verticals, the flagship, the Club, the team, the press — each set with the
              patience of an annual report and the polish of an invitation.
            </p>
          </Reveal>
          <Reveal delay={400}>
            <div className="grid grid-cols-4 gap-6 border-t border-[var(--hairline-gold-faint)] pt-10 max-[900px]:grid-cols-2 max-[900px]:gap-y-10">
              {STATS.map(([value, label]) => (
                <div key={label} className="flex flex-col gap-3">
                  <div className="type-numeral text-navy-900">{value}</div>
                  <div className="type-eyebrow text-ink-600">{label}</div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={500}>
            <Button variant="solid" size="lg" href="/">
              Visit the New Home
            </Button>
          </Reveal>
        </div>
      </section>

      {/* 02 — In the press */}
      <section className="gutter bg-navy-900 py-36 max-[640px]:py-20">
        <div className="content flex flex-col gap-12">
          <Reveal>
            <Eyebrow>
              <span className="mr-3.5">02</span>In the press
            </Eyebrow>
          </Reveal>
          <Reveal delay={150}>
            <h2 className="type-display-lg max-w-[13em] text-balance text-stone-50">
              What is being said about the places we{' '}steward.
            </h2>
          </Reveal>
          <Reveal delay={300}>
            <div className="border-t border-[var(--hairline-gold-faint)]">
              {PRESS.map((p) => (
                <a
                  key={p.href}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid grid-cols-[1fr_auto] items-baseline gap-6 border-b border-[var(--hairline-gold-faint)] py-7 no-underline max-[640px]:grid-cols-1 max-[640px]:gap-1.5"
                >
                  <span>
                    <span className="type-eyebrow text-gold-400">{p.outlet}</span>
                    <span
                      className="mt-1.5 block text-stone-50 transition-colors duration-[350ms] ease-reveal group-hover:text-gold-300"
                      style={{ font: '300 24px/1.3 var(--font-serif-display)' }}
                    >
                      {p.headline}
                    </span>
                  </span>
                  <span className="type-caption whitespace-nowrap text-navy-300">
                    {p.date} {'→'}
                  </span>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 03 — The stewards */}
      <section className="gutter bg-stone-100 py-36 max-[640px]:py-20">
        <div className="content flex flex-col gap-12">
          <Reveal>
            <SectionEyebrow num="03">The stewards</SectionEyebrow>
          </Reveal>
          <Reveal delay={150}>
            <h2 className="type-display-lg max-w-[13em] text-balance text-navy-900">
              Five stewards. One{' '}lineage.
            </h2>
          </Reveal>
          <Reveal delay={300}>
            <div className="border-t border-[var(--hairline-navy)]">
              {TEAM.map(([name, title]) => (
                <div
                  key={name}
                  className="grid grid-cols-[1fr_auto] items-baseline gap-6 border-b border-[var(--hairline-navy)] py-6 max-[640px]:grid-cols-1 max-[640px]:gap-1"
                >
                  <span
                    className="text-navy-900"
                    style={{ font: '400 21px/1.3 var(--font-serif-display)' }}
                  >
                    {name}
                  </span>
                  <span className="type-eyebrow text-ink-600">{title}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={400}>
            <p className="type-body-sm max-w-[36em] text-ink-600">
              The gallery is complete — every steward photographed, set against the
              firm{'’'}s own surroundings.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 04 — The ledger */}
      <section className="gutter bg-navy-900 py-36 max-[640px]:py-20">
        <div className="content flex flex-col gap-12">
          <Reveal>
            <Eyebrow>
              <span className="mr-3.5">04</span>Partners & inquiries
            </Eyebrow>
          </Reveal>
          <Reveal delay={150}>
            <h2 className="type-display-lg max-w-[13em] text-balance text-stone-50">
              The ledger is{' '}open.
            </h2>
          </Reveal>
          <Reveal delay={300}>
            <p className="type-lede max-w-[36em] text-navy-100">
              Every {'“'}Become a Partner{'”'} note written on the new home lands in a
              private ledger the moment it is written, and is gathered into the leadership
              briefing. The first names arrive the moment the address is shared. Nothing is
              missed; nothing is public.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 05 — The ecosystem */}
      <section className="gutter bg-navy-950 py-36 max-[640px]:py-20">
        <div className="content flex flex-col gap-12">
          <Reveal>
            <Eyebrow>
              <span className="mr-3.5">05</span>The beginning
            </Eyebrow>
          </Reveal>
          <Reveal delay={150}>
            <h2 className="type-display-lg max-w-[14em] text-balance text-stone-50">
              This is not a newsletter. It is the first instrument of an{' '}ecosystem.
            </h2>
          </Reveal>
          <Reveal delay={300}>
            <p className="type-lede max-w-[36em] text-navy-100">
              The new home greets prospective partners, records every inquiry, watches the
              press, and reports back — to you. Each instrument works hand in hand with the
              next: the ledger, the briefings, the portal, the Club{'’'}s calendar. The
              Daily Brief is simply the first to introduce itself.
            </p>
          </Reveal>
          <Reveal delay={400}>
            <div className="flex flex-col gap-4 border-t border-[var(--hairline-on-dark)] pt-8">
              {[
                'Today — the new home, ready for review.',
                'This week — briefings delivered to the leadership, like this one.',
                'Next — the Investor Portal opens its door to partners.',
              ].map((line) => (
                <p key={line} className="type-body text-navy-100">
                  <span className="text-gold-400">{'—'}</span>
                  {'  '}
                  {line}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Sign-off */}
      <section className="gutter bg-navy-950 pb-32 pt-8 text-center max-[640px]:pb-20">
        <Reveal>
          <div className="content flex flex-col items-center gap-8 border-t border-[var(--hairline-gold-faint)] pt-20">
            <Image
              src="/assets/logos/mas-icon-gold.png"
              alt="MAS"
              width={211}
              height={209}
              className="h-12 w-auto"
            />
            <p className="type-quote max-w-[22em] text-balance text-stone-50">
              I hope you enjoy the first edition of the Daily{' '}Brief.
            </p>
            <p className="type-eyebrow text-gold-400">{'—'} David Mora</p>
            <p className="type-caption text-navy-300">
              Designed and built by David Mora · Delivered by the firm{'’'}s new digital home
            </p>
            {/* Label stays domain-free until the real domain serves this site */}
            <Link
              href="/"
              className="type-nav text-navy-100 no-underline transition-colors duration-[350ms] ease-reveal hover:text-gold-300"
            >
              Visit the new home
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
