import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';

const LINK_CLS =
  'type-button inline-flex items-center gap-2.5 cursor-pointer whitespace-nowrap no-underline rounded-none border-b border-[var(--hairline-gold)] px-0.5 py-1 text-stone-50 transition-[color,border-color] duration-[350ms] ease-reveal hover:text-gold-400';

const HOLDINGS = [
  {
    name: 'MAS Tierra',
    detail: 'Place-Based Hospitality · The platform',
    line: 'A hospitality venture rooted in land and built to endure — care and continuity over reinvention.',
    href: 'https://www.mastierra.world',
    label: 'Visit mastierra.world',
  },
  {
    name: 'Meadowlark Ski & Lake Lodge',
    detail: 'Ten Sleep, Wyoming · Bighorn National Forest',
    line: 'An alpine base camp for skiers, riders, and hikers — reopening Winter 2026/2027 under MAS Tierra stewardship.',
    href: 'https://www.meadowlarklodge.com',
    label: 'Visit meadowlarklodge.com',
  },
] as const;

/**
 * The two holdings that carry the firm's name in public, each linking out
 * to its own home. Sits between the flagship story and the undisclosed
 * ledger — the named before the unnamed.
 */
export function PortfolioHoldings() {
  return (
    <section aria-label="Named holdings" className="gutter bg-navy-950 py-36 max-[640px]:py-20">
      <div className="content grid grid-cols-[5fr_7fr] items-start gap-24 max-[900px]:grid-cols-1 max-[900px]:gap-16">
        <Reveal>
          <div>
            <Eyebrow>The Named Holdings</Eyebrow>
            <h2 className="type-display-md mt-7 max-w-[12em] text-balance text-stone-50">
              The names on the front{' '}page.
            </h2>
            <p className="type-body-sm mt-6 max-w-[30em] text-navy-300">
              Two holdings carry the firm{'’'}s name in public — each with a home of its own.
            </p>
          </div>
        </Reveal>
        <Reveal delay={180}>
          <div className="border-t border-[var(--hairline-gold-faint)]">
            {HOLDINGS.map((h) => (
              <div
                key={h.name}
                className="flex flex-col gap-3 border-b border-[var(--hairline-gold-faint)] py-9"
              >
                <span className="type-eyebrow text-gold-400">{h.detail}</span>
                <span
                  className="text-stone-50"
                  style={{ font: '300 28px/1.25 var(--font-serif-display)' }}
                >
                  {h.name}
                </span>
                <p className="type-body-sm max-w-[36em] text-navy-100">{h.line}</p>
                <a
                  href={h.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${LINK_CLS} mt-2 self-start`}
                >
                  {h.label} {'→'}
                </a>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
