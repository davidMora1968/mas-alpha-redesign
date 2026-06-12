import { Reveal } from '@/components/ui/Reveal';
import { LeaderCard } from '@/components/site/LeaderCard';

/**
 * Leadership grid — founder featured beside the founding-conviction
 * statement (firm voice, not a personal quote), then a four-up row.
 * Portraits arrive as the firm supplies them (assets/team/); leaders
 * without one keep the quiet serif monogram placeholder.
 */
export function LeadershipGrid() {
  return (
    <section className="gutter bg-stone-100 pb-36 max-[640px]:pb-20">
      <div className="content">
        <Reveal>
          <div className="grid grid-cols-[4fr_8fr] items-end gap-16 border-t border-[var(--hairline-gold)] pt-16 max-[900px]:grid-cols-1 max-[640px]:gap-10">
            <LeaderCard
              name="Jose Mas Jr."
              title="Founder, CEO & CIO"
              src="/assets/team/jose-mas.jpg"
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
          <div className="mt-24 grid grid-cols-4 gap-10 max-[1100px]:grid-cols-2 max-[640px]:grid-cols-1 max-[640px]:mt-16">
            <LeaderCard
              name="Isabella Katz"
              title="Chief Marketing Officer"
              src="/assets/team/isabella-katz.jpg"
              onDark={false}
            />
            <LeaderCard
              name="Moises Jattin"
              title="Head of Partner Relations"
              src="/assets/team/moises-jattin.jpg"
              onDark={false}
            />
            <LeaderCard
              name="Gabriel Freire"
              title="Chief Financial Officer"
              src="/assets/team/gabriel-freire.jpg"
              onDark={false}
            />
            <LeaderCard
              name="Mary deVenoge"
              title="Director, The MAS Partners Club"
              src="/assets/team/mary-devenoge.jpg"
              onDark={false}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
