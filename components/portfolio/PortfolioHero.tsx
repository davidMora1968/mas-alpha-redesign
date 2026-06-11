'use client';

import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';

/**
 * Portfolio hero — cinematic Bighorn range stage with gentle parallax
 * (background drifts at 18% of scroll), scrim, and a bottom-anchored
 * content-width stack: eyebrow, flagship headline, coordinates line.
 * Mirrors PortfolioHero in portfolio-sections.jsx.
 */
export function PortfolioHero() {
  const reduced = useReducedMotion();

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, (v) => v * 0.18);

  const bgImage = (
    <Image
      src="/assets/imagery/wyoming-range.avif"
      alt="The Bighorn mountain range rising over forested Wyoming wilderness"
      fill
      priority
      className="object-cover"
      style={{ objectPosition: 'center 55%' }}
      sizes="100vw"
    />
  );

  return (
    <section className="relative h-[92vh] min-h-[620px] overflow-hidden bg-navy-950">
      {/* Parallax wrapper — oversized vertically so the drift never exposes edges */}
      {reduced ? (
        <div className="absolute" style={{ inset: '-12% 0' }}>
          {bgImage}
        </div>
      ) : (
        <motion.div className="absolute" style={{ inset: '-12% 0', y }}>
          {bgImage}
        </motion.div>
      )}

      {/* Image protection */}
      <div aria-hidden="true" className="absolute inset-0" style={{ background: 'var(--scrim-hero)' }} />

      {/* Content — anchored to the bottom edge */}
      <div className="absolute inset-x-0 bottom-0">
        <div className="content gutter flex flex-col items-start gap-[30px] pb-24">
          <Reveal>
            <Eyebrow>Flagship Portfolio · MAS Tierra</Eyebrow>
          </Reveal>
          <Reveal delay={150}>
            <h1 className="type-display-xl max-w-[10em] text-stone-50">
              Meadowlark Ski & Lake{'\u00A0'}Lodge.
            </h1>
          </Reveal>
          <Reveal delay={300}>
            <p className="type-eyebrow whitespace-nowrap text-navy-300">
              Bighorn National Forest, Wyoming · 44.16° N, 107.21° W
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
