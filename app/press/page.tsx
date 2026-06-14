import type { Metadata } from 'next';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';

export const metadata: Metadata = {
  title: 'Press',
  description: 'What’s being said about the places we steward.',
  alternates: { canonical: '/press' },
  openGraph: {
    title: 'Press',
    description: 'What’s being said about the places we steward.',
  },
};

const FEATURED = {
  outlet: 'Cowboy State Daily',
  headline: 'New Owner of Meadowlark Ski Resort Says He Wants to Keep It Small',
  date: 'May 15, 2026',
  line: 'A profile of how Mas Alpha’s MAS Tierra plans to preserve Meadowlark as a small, accessible Wyoming basecamp rather than a luxury mega-resort.',
  linkLabel: 'Read at Cowboy State Daily →',
  href: 'https://cowboystatedaily.com/2026/05/15/new-owner-of-meadowlark-ski-resort-says-he-wants-to-keep-it-small/',
} as const;

const STORIES = [
  { outlet: 'POWDER', headline: 'Meet the New Owner of Meadowlark Ski Area, Wyoming', date: 'May 2026', href: 'https://www.powder.com/news/new-owner-meadowlark-ski-area-wyoming' },
  { outlet: 'AOL', headline: 'Meet the New Owner of Meadowlark Ski Area, Wyoming', date: 'May 2026', href: 'https://www.aol.com/articles/meet-owner-meadowlark-ski-area-110800000.html' },
  { outlet: 'Unofficial Networks', headline: 'New Owner of Wyoming Ski Resort Details Future Vision', date: 'May 2026', href: 'https://unofficialnetworks.com/2026/05/22/meadowlark-new-owner-plans/' },
  { outlet: 'Adventure Sports Network', headline: 'Meet the New Owner of Meadowlark Ski Area, Wyoming', date: 'May 2026', href: 'https://www.adventuresportsnetwork.com/ski/new-owner-meadowlark-ski-area-wyoming' },
  { outlet: 'Northern Wyoming News', headline: 'New Ownership for Meadowlark Ski & Lake Lodge', date: 'May 2026', href: 'https://www.wyodaily.com/story/2026/05/14/news/new-ownership-for-meadowlark-ski-and-lake-lodge/17826.html' },
] as const;

const OUTLETS = [
  'Cowboy State Daily',
  'POWDER',
  'AOL',
  'Unofficial Networks',
  'Adventure Sports Network',
  'Northern Wyoming News',
] as const;

/** Navy page header — sits under the fixed transparent nav. */
function PressHeader() {
  return (
    <section aria-label="Press header" className="gutter bg-navy-950 pb-24 pt-[200px]">
      <div className="content">
        <Reveal>
          <Eyebrow>In the Press</Eyebrow>
        </Reveal>
        <Reveal delay={150}>
          <h1 className="type-display-xl mt-9 text-stone-50">Press.</h1>
        </Reveal>
        <Reveal delay={300}>
          <p className="type-lede mt-9 max-w-[28em] text-navy-100">
            What’s being said about the places we steward.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/** Featured story on cream — gold-ruled, outlet rail + serif headline in quotes. */
function PressFeatured() {
  return (
    <section aria-label="Featured story" className="gutter bg-stone-100 py-36">
      <div className="content">
        <Reveal>
          <div className="grid grid-cols-[4fr_8fr] items-start gap-16 border-t border-[var(--hairline-gold)] pt-10 max-[900px]:grid-cols-1 max-[900px]:gap-10">
            <div className="flex flex-col gap-[14px]">
              <span className="type-eyebrow text-gold-600">Featured</span>
              <span className="text-navy-900 [font:300_22px/1.3_var(--font-serif-display)]">
                {FEATURED.outlet}
              </span>
              <span className="type-caption uppercase tracking-[0.08em] text-ink-600">
                {FEATURED.date}
              </span>
            </div>
            <div>
              <h2 className="type-display-lg max-w-[16em] text-balance text-navy-900">
                “{FEATURED.headline}”
              </h2>
              <p className="type-body mt-7 max-w-[36em] text-ink-900">{FEATURED.line}</p>
              <div className="mt-9">
                {/* Plain anchor mirroring Button variant="text" onDark={false} —
                    the shared Button doesn't pass target/rel for external links. */}
                <a
                  href={FEATURED.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="type-button inline-flex items-center justify-center gap-2.5 cursor-pointer whitespace-nowrap no-underline rounded-none transition-[background-color,color,border-color] duration-[350ms] ease-reveal text-navy-900 px-0.5 py-1 bg-transparent border-b border-[var(--hairline-gold)] hover:text-gold-600"
                >
                  {FEATURED.linkLabel}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Coverage ledger — hairline-ruled rows: outlet · serif headline · date →. */
function PressLedger() {
  return (
    <section aria-label="Coverage" className="gutter bg-stone-100 pb-36">
      <div className="content">
        <Reveal>
          <div className="grid">
            {STORIES.map((story) => (
              <a
                key={story.outlet}
                href={story.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid grid-cols-[4fr_7fr_1fr] items-baseline gap-10 border-t border-[var(--hairline-navy)] py-[34px] no-underline max-[900px]:grid-cols-1 max-[900px]:gap-3"
              >
                <span className="type-eyebrow text-gold-600">{story.outlet}</span>
                <span className="text-navy-900 underline-offset-[6px] transition-colors duration-[240ms] ease-reveal group-hover:text-gold-600 group-hover:underline group-focus-visible:underline [font:300_clamp(20px,1.8vw,26px)/1.35_var(--font-serif-display)]">
                  {story.headline}
                </span>
                <span className="type-caption whitespace-nowrap text-right uppercase tracking-[0.08em] text-ink-600 max-[900px]:text-left">
                  {story.date} →
                </span>
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Centered navy strip — all six publication names in quiet serif. */
function PressFeaturedIn() {
  return (
    <section
      aria-label="As featured in"
      className="gutter border-t border-[var(--hairline-gold-faint)] bg-navy-950 py-24"
    >
      <div className="content flex flex-col items-center gap-10">
        <Reveal>
          <span className="type-eyebrow text-navy-300">As Featured In</span>
        </Reveal>
        <Reveal delay={150}>
          <div className="flex flex-wrap items-baseline justify-center gap-x-16 gap-y-6">
            {OUTLETS.map((outlet) => (
              <span
                key={outlet}
                className="whitespace-nowrap text-navy-100 [font:300_clamp(17px,1.5vw,22px)/1.3_var(--font-serif-display)]"
              >
                {outlet}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function PressPage() {
  return (
    <main id="main" tabIndex={-1} className="scroll-mt-[92px]">
      <PressHeader />
      <PressFeatured />
      <PressLedger />
      <PressFeaturedIn />
    </main>
  );
}
