import { PullQuote } from '@/components/ui/PullQuote';
import { Reveal } from '@/components/ui/Reveal';

/**
 * Statement quote on cream — the philosophy in one line, with a
 * supporting passage indented beneath it.
 * Mirrors ApproachQuote in approach-sections.jsx (2fr / 9fr / 1fr grid).
 */
export function ApproachQuote() {
  return (
    <section aria-label="Philosophy statement" className="gutter bg-stone-100 py-[200px]">
      <div className="content grid grid-cols-[2fr_9fr_1fr] items-start max-lg:grid-cols-1">
        <div />
        <div>
          <Reveal>
            <PullQuote
              onDark={false}
              quote="Scarcity is not a strategy we invented. It is one we recognize."
              attribution="The Mas Alpha Philosophy"
            />
          </Reveal>
          <Reveal delay={180}>
            <p className="type-body ml-20 mt-14 max-w-[34em] text-ink-600 max-lg:ml-0">
              We do not manufacture scarcity. We seek the places where it already exists — land,
              rights-of-way, stages, shoreline — and hold them with the patience their permanence
              deserves.
            </p>
          </Reveal>
        </div>
        <div />
      </div>
    </section>
  );
}
