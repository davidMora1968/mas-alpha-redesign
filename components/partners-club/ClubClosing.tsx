import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';

/**
 * Closing — navy-900 band under a faint gold hairline: the membership
 * statement, Mary deVenoge's credit line, and the Partner CTA beside the
 * IR email. Mirrors ClubClosing in the design prototype.
 */
export function ClubClosing() {
  return (
    <section
      aria-label="Membership begins with partnership"
      className="gutter border-t border-[var(--hairline-gold-faint)] bg-navy-900 py-36"
    >
      <Reveal>
        <div className="content flex flex-col items-start gap-9">
          <h2 className="type-display-lg max-w-[13em] text-balance text-stone-50">
            Membership begins with{'\u00A0'}partnership.
          </h2>
          <p className="type-eyebrow text-navy-300">
            Mary deVenoge · Director, The MAS Partners Club
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <Button variant="solid" size="lg" href="/#partner">
              Become a Partner
            </Button>
            <Button variant="text" href="mailto:ir@masalphasecurities.com">
              ir@masalphasecurities.com
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
