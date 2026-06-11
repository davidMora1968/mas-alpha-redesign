import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';

const VERTICALS = [
  { num: '01', id: 'essential-infrastructure', name: 'Essential Infrastructure' },
  { num: '02', id: 'experiential-hospitality', name: 'Experiential Hospitality' },
  { num: '03', id: 'media-entertainment', name: 'Media & Entertainment' },
] as const;

/**
 * Verticals hero — navy stage, bottom-anchored display title, and a
 * 01/02/03 index strip anchoring to each cinematic panel.
 * Mirrors VerticalsHero in the prototype (verticals-sections.jsx).
 */
export function VerticalsHero() {
  return (
    <section
      aria-label="Our Verticals"
      className="relative flex min-h-[62vh] flex-col justify-end bg-navy-950"
    >
      <div className="content gutter w-full pt-[180px]">
        <Reveal>
          <Eyebrow>Our Verticals</Eyebrow>
        </Reveal>
        <Reveal delay={150}>
          <h1 className="type-display-xl mt-9 max-w-[11em] text-balance text-stone-50">
            Three ways to own the irreplaceable.
          </h1>
        </Reveal>
      </div>
      <Reveal delay={300} className="mt-20">
        <div className="border-t border-[var(--hairline-gold-faint)]">
          <div className="content gutter flex flex-wrap gap-16 py-7 max-[640px]:gap-x-10 max-[640px]:gap-y-5">
            {VERTICALS.map((v) => (
              <a
                key={v.id}
                href={`#${v.id}`}
                className="type-eyebrow inline-flex items-baseline gap-3 whitespace-nowrap text-navy-300 no-underline"
              >
                <span
                  className="text-gold-400"
                  style={{ font: '300 13px/1 var(--font-serif-display)' }}
                >
                  {v.num}
                </span>
                {v.name}
              </a>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
