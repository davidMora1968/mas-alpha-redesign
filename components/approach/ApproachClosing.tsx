import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';

/**
 * Closing band — "Held for generations, not quarters." on navy,
 * with the partner / portfolio CTA pair.
 * Mirrors ApproachClosing in approach-sections.jsx.
 */
export function ApproachClosing() {
  return (
    <section
      aria-label="Partner with Mas Alpha"
      className="gutter border-t border-[var(--hairline-gold-faint)] bg-navy-900 py-36"
    >
      <Reveal>
        <div className="content flex flex-col items-start gap-10">
          <h2 className="type-display-lg max-w-[13em] text-balance text-stone-50">
            Held for generations, not{'\u00A0'}quarters.
          </h2>
          <div className="flex flex-wrap gap-5">
            <Button variant="solid" size="lg" href="/#partner">
              Become a Partner
            </Button>
            <Button size="lg" href="/portfolio">
              View the Portfolio
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
