import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';

const EVENTS: [string, string, string][] = [
  [
    'No. 1',
    'The Dominoes Classic',
    'Coral Gables · An evening of tables, cigars, and standings defended year over year.',
  ],
  [
    'No. 2',
    'The Poker Invitational',
    'Miami · One table, by invitation. The buy-in is the easy part.',
  ],
  [
    'No. 3',
    'Inaugural Investor Night',
    'The first gathering of the partnership — where the long view is toasted.',
  ],
];

/**
 * Curated Events — deep navy band: heading column beside a numbered ledger of
 * the three annual evenings, separated by faint gold hairlines.
 * Mirrors ClubCalendar in the design prototype.
 */
export function ClubCalendar() {
  return (
    <section aria-label="Curated events" className="gutter bg-navy-950 py-36 max-[640px]:py-20">
      <div className="content grid grid-cols-[5fr_7fr] items-start gap-24 max-[900px]:grid-cols-1 max-[900px]:gap-16">
        <Reveal>
          <div>
            <Eyebrow>Curated Events</Eyebrow>
            <h2 className="type-display-lg mt-7 max-w-[10em] text-balance text-stone-50">
              A calendar kept{'\u00A0'}small.
            </h2>
            <p className="type-body mt-6 max-w-[26em] text-navy-100">
              Three evenings a year, curated for the partnership — never sold, never repeated the
              same way twice.
            </p>
          </div>
        </Reveal>
        <Reveal delay={180}>
          <div>
            {EVENTS.map(([num, title, line]) => (
              <div
                key={title}
                className="grid grid-cols-[76px_1fr] items-baseline gap-[26px] border-t border-[var(--hairline-gold-faint)] py-[34px] max-[640px]:grid-cols-[56px_1fr] max-[640px]:gap-4"
              >
                <span className="type-eyebrow whitespace-nowrap text-gold-400">{num}</span>
                <div>
                  <h3
                    className="text-stone-50"
                    style={{ font: '300 30px/1.25 var(--font-serif-display)' }}
                  >
                    {title}
                  </h3>
                  <p className="type-body-sm mt-2.5 max-w-[36em] text-navy-300">{line}</p>
                </div>
              </div>
            ))}
            <div aria-hidden="true" className="border-t border-[var(--hairline-gold-faint)]" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
