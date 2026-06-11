import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';

/**
 * Closing call — dark navy band above the footer.
 * Mirrors TeamClosing in the prototype (team-sections.jsx).
 */
export function Closing() {
  return (
    <section className="gutter border-t border-[var(--hairline-gold-faint)] bg-navy-900 py-36 max-[640px]:py-20">
      <Reveal>
        <div className="content flex flex-col items-start gap-10">
          <h2 className="type-display-lg max-w-[14em] text-balance text-stone-50">
            Work with people who think in{'\u00A0'}generations.
          </h2>
          <div className="flex flex-wrap gap-5">
            <Button variant="solid" size="lg" href="/#partner">
              Become a Partner
            </Button>
            <Button size="lg" href="/partners-club">
              The Partners Club
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
