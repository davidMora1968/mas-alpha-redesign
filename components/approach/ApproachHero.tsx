import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { PRINCIPLES } from './principles';

/**
 * Approach hero — typographic, no photography. Deep navy stage,
 * bottom-anchored statement, and a hairline index strip (I / II / III)
 * anchoring down to the principle rows.
 * Mirrors ApproachHero in approach-sections.jsx.
 */
export function ApproachHero() {
  return (
    <section
      aria-label="Our approach"
      className="relative flex min-h-[72vh] flex-col justify-end overflow-hidden bg-navy-950"
    >
      <div className="content gutter w-full pt-[180px]">
        <Reveal>
          <Eyebrow>Our Approach</Eyebrow>
        </Reveal>
        <Reveal delay={150}>
          <h1 className="type-display-xl mt-9 max-w-[10.5em] text-balance text-stone-50">
            Permanence is the rarest asset{'\u00A0'}class.
          </h1>
        </Reveal>
        <Reveal delay={300}>
          <p className="type-lede mt-10 max-w-[30em] text-navy-100">
            An investment philosophy built on scarcity, patience, and discipline — written once,
            applied without exception.
          </p>
        </Reveal>
      </div>

      {/* Index strip — hairline-ruled anchors down to each principle */}
      <Reveal delay={450} className="mt-[88px] max-[640px]:mt-16">
        <div className="border-t border-[var(--hairline-gold-faint)]">
          <nav
            aria-label="Principles index"
            className="content gutter flex flex-wrap gap-16 py-7 max-[640px]:gap-x-10 max-[640px]:gap-y-5"
          >
            {PRINCIPLES.map((p) => (
              <a
                key={p.id}
                href={`#${p.id}`}
                className="type-eyebrow inline-flex items-baseline gap-3 whitespace-nowrap text-navy-300 no-underline"
              >
                <span
                  className="text-gold-400"
                  style={{ font: '300 13px/1 var(--font-serif-display)' }}
                >
                  {p.numeral}
                </span>
                {p.title}
              </a>
            ))}
          </nav>
        </div>
      </Reveal>
    </section>
  );
}
