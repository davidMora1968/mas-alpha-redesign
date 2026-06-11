import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';

/**
 * Closing invitation — hairline-ruled dark band with the partner CTAs.
 * Mirrors PortfolioClosing in portfolio-sections.jsx.
 */
export function PortfolioClosing() {
  return (
    <section aria-label="Closing invitation" className="gutter bg-navy-900 pb-36">
      <Reveal>
        <div className="content flex flex-col items-start gap-10 border-t border-[var(--hairline-gold-faint)] pt-24">
          <h2 className="type-display-lg max-w-[13em] text-stone-50">
            See it the way our partners{'\u00A0'}do.
          </h2>
          <div className="flex flex-wrap gap-5">
            <Button variant="solid" size="lg" href="/#partner">
              Become a Partner
            </Button>
            <Button size="lg" href="/verticals">
              Explore the Verticals
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
