import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';

/**
 * Philosophy section — light stone band stating the firm's approach.
 * Mirrors `.philosophy` in the static reference.
 */
export function Philosophy() {
  return (
    <section id="approach" aria-label="Philosophy" className="gutter bg-stone-100 py-[200px] max-[640px]:py-24">
      <div className="content flex flex-col items-start gap-10">
        <Reveal>
          <Eyebrow onDark={false}>Our Approach</Eyebrow>
        </Reveal>
        <Reveal delay={150}>
          <h2 className="type-display-lg max-w-[13em] text-balance text-navy-900">
            Permanence is the rarest asset{'\u00A0'}class.
          </h2>
        </Reveal>
        <Reveal delay={300}>
          <p className="type-lede max-w-[28em] text-ink-600">
            We pursue assets that cannot be built again — and hold them without a clock.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
