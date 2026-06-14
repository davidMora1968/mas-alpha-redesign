import { Reveal } from '@/components/ui/Reveal';
import { PRINCIPLES } from './principles';

/**
 * The three principle rows — oversized gold Roman numerals, serif
 * statements, expanded copy, and a small-caps detail line, each ruled
 * by a gold hairline. Anchor targets for the hero index strip.
 * Mirrors ApproachPrinciples in approach-sections.jsx (160px / 5fr / 6fr grid).
 */
export function ApproachPrinciples() {
  return (
    <section aria-label="Principles" className="gutter bg-stone-100 pb-36 max-[640px]:pb-20">
      <div className="content">
        {PRINCIPLES.map((p) => (
          <Reveal key={p.id}>
            <article
              id={p.id}
              className="grid scroll-mt-[92px] grid-cols-[160px_5fr_6fr] items-start gap-10 border-t border-[var(--hairline-gold)] py-16 max-lg:grid-cols-1"
            >
              <div
                className="text-gold-500"
                style={{ font: '200 clamp(48px, 4.5vw, 72px)/1 var(--font-serif-display)' }}
              >
                {p.numeral}
              </div>
              <div>
                <div className="type-eyebrow text-gold-600">{p.title}</div>
                <h2 className="type-display-md mt-5 max-w-[11em] text-balance text-navy-900">
                  {p.statement}
                </h2>
              </div>
              <div>
                {p.body.map((passage, i) => (
                  <p
                    key={i}
                    className={`type-body max-w-[34em] text-ink-900${i === 0 ? '' : ' mt-5'}`}
                  >
                    {passage}
                  </p>
                ))}
                <p className="type-caption mt-8 uppercase tracking-[0.1em] text-ink-600">
                  {p.detail}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
