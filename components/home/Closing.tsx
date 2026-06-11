import Image from 'next/image';

import { PartnerCta } from '@/components/home/PartnerCta';
import { Reveal } from '@/components/ui/Reveal';

/**
 * Closing CTA — "Partner with Mas Alpha."
 * Mirrors .closing in the static reference: navy-900 surface, 200px vertical
 * padding, centered stack (icon / display title / email / CTA row) in a
 * single reveal.
 */
export function Closing() {
  return (
    <section
      id="partner"
      aria-label="Partner with Mas Alpha"
      className="bg-navy-900 gutter py-[200px] text-center"
    >
      <Reveal className="flex flex-col items-center gap-9">
        <Image
          src="/assets/logos/mas-icon-gold.png"
          alt="MAS"
          width={211}
          height={209}
          className="w-16 h-auto"
        />
        <h2 className="type-display-lg text-stone-50 max-w-[12em] text-balance">
          Partner with Mas{'\u00A0'}Alpha.
        </h2>
        <p className="type-body text-navy-100">
          <a
            href="mailto:ir@masalphasecurities.com"
            className="text-gold-300 no-underline border-b border-[var(--hairline-gold)]"
          >
            ir@masalphasecurities.com
          </a>
        </p>
        <PartnerCta />
      </Reveal>
    </section>
  );
}
