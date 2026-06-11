import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';

/**
 * Team hero — bottom-anchored navy stage, no photography.
 * Mirrors TeamHero in the prototype (team-sections.jsx): 62vh minimum,
 * 180px top padding clears the fixed transparent nav.
 */
export function Hero() {
  return (
    <section className="relative flex min-h-[62vh] flex-col justify-end bg-navy-950">
      <div className="gutter content w-full pb-24 pt-[180px]">
        <Reveal>
          <Eyebrow>Our Team</Eyebrow>
        </Reveal>
        <Reveal delay={150}>
          <h1 className="type-display-xl mt-9 max-w-[10.5em] text-balance text-stone-50">
            Stewards of the irreplaceable.
          </h1>
        </Reveal>
        <Reveal delay={300}>
          <p className="type-lede mt-10 max-w-[32em] text-navy-100">
            Led by the next generation of the MasTec family — NYSE: MTZ, a Fortune-500 American
            infrastructure company.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
