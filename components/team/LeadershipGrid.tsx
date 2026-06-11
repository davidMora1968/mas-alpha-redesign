import { Reveal } from '@/components/ui/Reveal';
import { LeaderCard } from '@/components/site/LeaderCard';

/**
 * Leadership grid — founder featured beside the founding-conviction
 * statement (firm voice, not a personal quote), then a four-up row.
 * Portraits are intentionally the quiet serif monogram placeholder
 * (no `src`), per the design. Mirrors TeamGrid in the prototype.
 */
export function LeadershipGrid() {
  return (
    <section className="gutter bg-stone-100 pb-36">
      <div className="content">
        <Reveal>
          <div className="grid grid-cols-[4fr_8fr] items-end gap-16 border-t border-[var(--hairline-gold)] pt-16 max-[900px]:grid-cols-1">
            <LeaderCard
              name="Jose Mas Jr."
              title="Founder, CEO & CIO"
              note="Second generation of the MasTec infrastructure family."
              onDark={false}
            />
            <p className="type-quote max-w-[18em] pb-2 text-balance text-navy-900">
              Founded on a conviction formed over two generations of building: the rarest assets
              are not made — they are kept.
            </p>
          </div>
        </Reveal>
        <Reveal delay={150}>
          <div className="mt-24 grid grid-cols-4 gap-10 max-[1100px]:grid-cols-2 max-[640px]:grid-cols-1">
            <LeaderCard name="Isabella Katz" title="Chief Marketing Officer" onDark={false} />
            <LeaderCard name="Moises Jattin" title="Head of Partner Relations" onDark={false} />
            <LeaderCard name="Gabriel Freire" title="Chief Financial Officer" onDark={false} />
            <LeaderCard name="Mary deVenoge" title="Director, The MAS Partners Club" onDark={false} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
