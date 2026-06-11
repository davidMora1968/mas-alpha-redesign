import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';

const OUTLETS = [
  'Cowboy State Daily',
  'POWDER',
  'AOL',
  'Unofficial Networks',
  'Adventure Sports Network',
] as const;

/**
 * "As Featured In" press strip — navy band between the closing CTA and the
 * footer. The entire row is a single link to /press.
 * Mirrors .featured / .featured__row in the static reference.
 */
export function FeaturedInStrip() {
  return (
    <section
      aria-label="As featured in"
      className="gutter border-t border-[var(--hairline-on-dark)] bg-navy-950 py-16"
    >
      <Reveal>
        <Link
          href="/press"
          className="content flex flex-wrap items-baseline justify-center gap-x-16 gap-y-4 no-underline"
        >
          <span className="type-eyebrow text-navy-300">As Featured In</span>
          {OUTLETS.map((outlet) => (
            <span
              key={outlet}
              className="whitespace-nowrap text-navy-100 opacity-75 [font:300_17px/1.3_var(--font-serif-display)]"
            >
              {outlet}
            </span>
          ))}
        </Link>
      </Reveal>
    </section>
  );
}
