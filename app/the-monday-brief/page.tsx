import type { Metadata } from 'next';
import Image from 'next/image';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';

/**
 * Pitch showcase for the Monday Brief — the weekly internal briefing the
 * site composes and emails to leadership (see app/api/brief/route.ts).
 * Not linked from the nav; opened directly during the client meeting.
 * The card below is a faithful recreation of renderHtml() filled with
 * clearly-marked sample data.
 */

export const metadata: Metadata = {
  title: 'The Monday Brief',
  description:
    'Each Monday morning, the site gathers the week and briefs the leadership team.',
  robots: { index: false, follow: false },
};

// Sample edition data — invented inquirers (name + descriptor, no emails),
// real May 2026 press headlines, and the route's standing week-ahead list.
const SAMPLE_DATE = 'June 8, 2026';

const SAMPLE_INQUIRIES = [
  { name: 'R. Delgado', detail: 'Family office, Coral Gables', date: 'Jun 5' },
  { name: 'M. Whitfield', detail: 'Accredited investor, Austin', date: 'Jun 3' },
  { name: 'S. Okafor', detail: 'Private wealth advisory, Chicago', date: 'Jun 2' },
] as const;

const SAMPLE_PRESS = [
  {
    title: 'New Owner of Meadowlark Ski Resort Says He Wants to Keep It Small',
    source: 'Cowboy State Daily',
    date: 'May 15',
  },
  {
    title: 'Meet the New Owner of Meadowlark Ski Area, Wyoming',
    source: 'POWDER',
    date: 'May 2026',
  },
  {
    title: 'New Ownership for Meadowlark Ski & Lake Lodge',
    source: 'Northern Wyoming News',
    date: 'May 2026',
  },
] as const;

// First line mirrors the route's runtime inquiry-count item; the rest is
// the standing WEEK_AHEAD list, verbatim.
const SAMPLE_WEEK_AHEAD = [
  '3 new inquiries awaiting a personal reply.',
  'Reply to every open inquiry before Wednesday.',
  'Partners Club — confirm the next event date and guest list.',
  'Press — one outreach note to a Wyoming or Miami outlet.',
] as const;

/** Tracked gold section label inside the white email card. */
function CardSectionHeading({ children }: { children: string }) {
  return <h2 className="type-eyebrow mb-1 text-gold-500">{children}</h2>;
}

/** Page header — eyebrow, display line, lede. */
function BriefHeader() {
  return (
    <section aria-label="The Monday Brief" className="gutter bg-navy-950 pb-24 pt-[200px]">
      <div className="content">
        <Reveal>
          <Eyebrow>Every Monday · 8am</Eyebrow>
        </Reveal>
        <Reveal delay={150}>
          <h1 className="type-display-lg mt-9 text-stone-50">The website briefs the firm.</h1>
        </Reveal>
        <Reveal delay={300}>
          <p className="type-lede mt-9 max-w-[34em] text-navy-100">
            Each Monday morning, the site itself gathers the week — new partner inquiries,
            fresh press, the week ahead — and delivers it to the leadership team before the
            first meeting.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/** In-page recreation of the email renderHtml() composes, with sample data. */
function SampleEdition() {
  return (
    <section aria-label="Sample edition" className="gutter bg-navy-950 pb-36">
      <div className="content">
        <Reveal delay={150}>
          <p className="type-eyebrow text-center text-gold-400">Sample edition</p>

          <div className="mx-auto mt-7 w-full max-w-[600px]">
            {/* Header band */}
            <div className="bg-navy-900 px-8 py-7">
              <Image
                src="/assets/logos/mas-wordmark-cream.png"
                alt="Mas Alpha Securities"
                width={68}
                height={18}
                className="h-[18px] w-auto"
              />
              <p className="mt-3.5 text-stone-50 [font:400_26px/1.25_var(--font-serif-display)]">
                The Monday Brief
              </p>
              <p className="type-eyebrow mt-1 text-gold-400">{SAMPLE_DATE}</p>
            </div>

            {/* New partner inquiries */}
            <div className="bg-white px-8 pb-2 pt-7">
              <CardSectionHeading>New partner inquiries</CardSectionHeading>
              <ul className="list-none">
                {SAMPLE_INQUIRIES.map((inquiry) => (
                  <li key={inquiry.name} className="border-t border-stone-300 py-2.5">
                    <p className="text-ink-900 [font:400_16px/1.4_var(--font-serif-display)]">
                      {inquiry.name}{' '}
                      <span className="type-caption text-ink-600">
                        · {inquiry.detail} · {inquiry.date}
                      </span>
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* In the press */}
            <div className="bg-white px-8 pb-2 pt-5">
              <CardSectionHeading>In the press</CardSectionHeading>
              <ul className="list-none">
                {SAMPLE_PRESS.map((story) => (
                  <li key={story.title} className="border-t border-stone-300 py-2.5">
                    <p className="text-ink-900 [font:400_15px/1.4_var(--font-serif-display)]">
                      {story.title}
                    </p>
                    <p className="type-caption mt-0.5 text-ink-600">
                      {story.source} · {story.date}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* The week ahead */}
            <div className="bg-white px-8 pb-7 pt-5">
              <CardSectionHeading>The week ahead</CardSectionHeading>
              <ul className="list-none">
                {SAMPLE_WEEK_AHEAD.map((item) => (
                  <li
                    key={item}
                    className="type-body-sm border-t border-stone-300 py-2 text-ink-900"
                  >
                    <span aria-hidden="true" className="mr-2.5 text-gold-500">
                      —
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer band */}
            <div className="bg-navy-900 px-8 py-[18px]">
              <p className="text-[11px] leading-[1.6] text-navy-300">
                Internal briefing · generated by{' '}
                <span className="text-gold-400">masalphasecurities.com</span> · Mondays, 8am
                Miami
              </p>
            </div>
          </div>

          <p className="type-caption mx-auto mt-7 max-w-[600px] text-center text-navy-300">
            Shown with sample data. Live editions draw from the site&rsquo;s inquiry records
            and press monitoring.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export default function MondayBriefPage() {
  return (
    <main>
      <BriefHeader />
      <SampleEdition />
    </main>
  );
}
