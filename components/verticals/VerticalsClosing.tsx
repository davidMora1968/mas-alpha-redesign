import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';

/**
 * Closing band — the firm's single test, with the two standing CTAs.
 * Mirrors VerticalsClosing in the prototype (verticals-sections.jsx).
 */
export function VerticalsClosing() {
  return (
    <section
      aria-label="One test for every asset"
      className="gutter border-t border-[var(--hairline-gold-faint)] bg-navy-900 py-36"
    >
      <Reveal>
        <div className="content flex flex-col items-start gap-10">
          <h2 className="type-display-lg max-w-[14em] text-balance text-stone-50">
            One test for every asset: can it be{'\u00A0'}replaced?
          </h2>
          <div className="flex flex-wrap gap-5">
            <Button variant="solid" size="lg" href="/#partner">
              Become a Partner
            </Button>
            <Button size="lg" href="/approach">
              Read Our Approach
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
