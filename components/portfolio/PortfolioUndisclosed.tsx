import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';

const ROWS: [string, string][] = [
  ['Essential Infrastructure', 'Select & undisclosed'],
  ['Experiential Hospitality', 'MAS Tierra · further holdings undisclosed'],
  ['Media & Entertainment', 'Select & undisclosed'],
];

/**
 * "Further holdings" — dark band: selective-disclosure statement beside
 * a three-row per-vertical ledger. Mirrors PortfolioUndisclosed in
 * portfolio-sections.jsx.
 */
export function PortfolioUndisclosed() {
  return (
    <section aria-label="Further holdings" className="gutter bg-navy-900 py-36 max-[640px]:py-20">
      <div className="content grid grid-cols-[5fr_7fr] items-start gap-24 max-[900px]:grid-cols-1 max-[900px]:gap-16">
        <Reveal>
          <div>
            <Eyebrow>Further Holdings</Eyebrow>
            <h2 className="type-display-md mt-7 max-w-[12em] text-stone-50">
              Some of what we own is not for the front{'\u00A0'}page.
            </h2>
            <p className="type-body-sm mt-6 max-w-[30em] text-navy-300">
              Positions across our verticals are disclosed selectively, to partners.
            </p>
          </div>
        </Reveal>
        <Reveal delay={180}>
          <div className="border-t border-[var(--hairline-gold-faint)]">
            {ROWS.map(([k, v]) => (
              <div
                key={k}
                className="grid grid-cols-[1fr_auto] items-baseline gap-6 border-b border-[var(--hairline-gold-faint)] py-[26px] max-[640px]:grid-cols-1 max-[640px]:gap-1.5"
              >
                <span
                  className="text-stone-50"
                  style={{ font: '300 22px/1.3 var(--font-serif-display)' }}
                >
                  {k}
                </span>
                <span className="type-eyebrow whitespace-nowrap text-navy-300 max-[640px]:whitespace-normal">{v}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
