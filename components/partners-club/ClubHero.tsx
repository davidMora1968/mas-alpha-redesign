'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Reveal, EASE_REVEAL } from '@/components/ui/Reveal';

/**
 * Partners Club hero — the one deliberately centered, ceremonial page in the
 * set. Full-bleed night-pavilion photograph with a slow fade/settle on load,
 * then a centered stack: the MAS seal in a hairline ring, the refined
 * "Invitation Only" kicker (cream, wide tracking, champagne hairlines), the
 * display title, the lede, and a single gold dash.
 * Mirrors ClubHero in the design prototype (club-sections.jsx).
 */
export function ClubHero() {
  const reduced = useReducedMotion();
  const [ready, setReady] = useState(false);

  const bgImage = (
    <Image
      src="/assets/imagery/club-night-pavilion.jpg"
      alt="The Partners Club pavilion at night"
      fill
      priority
      className="object-cover"
      style={{ objectPosition: 'center 38%' }}
      sizes="100vw"
      onLoad={() => setReady(true)}
      onError={() => setReady(true)} // never leave the hero dark
    />
  );

  return (
    <section className="relative flex min-h-[78vh] items-center justify-center overflow-hidden bg-navy-950">
      {/* Background photograph — slow fade + settle on load */}
      {reduced ? (
        <div className="absolute inset-0">{bgImage}</div>
      ) : (
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.05 }}
          transition={{
            opacity: { duration: 1.8, ease: EASE_REVEAL },
            scale: { duration: 5.2, ease: EASE_REVEAL },
          }}
        >
          {bgImage}
        </motion.div>
      )}

      {/* Image protection */}
      <div aria-hidden="true" className="absolute inset-0" style={{ background: 'var(--scrim-hero)' }} />

      {/* Centered ceremonial stack */}
      <div className="gutter relative flex flex-col items-center gap-[34px] pb-24 pt-40 text-center">
        <Reveal>
          <Image
            src="/assets/logos/mas-icon-knockout.png"
            alt=""
            width={211}
            height={209}
            className="mx-auto h-auto w-[60px] rounded-full"
            style={{ boxShadow: '0 0 0 1px var(--hairline-gold-faint)' }}
          />
        </Reveal>
        <Reveal delay={150}>
          <span
            className="type-eyebrow inline-flex items-center gap-5 text-stone-50"
            style={{
              letterSpacing: '0.34em',
              textShadow: '0 1px 18px rgba(6,15,29,0.6)',
            }}
          >
            <span aria-hidden="true" className="inline-block w-9 border-t border-[var(--hairline-gold)]" />
            Invitation{'\u00A0'}Only
            <span aria-hidden="true" className="inline-block w-9 border-t border-[var(--hairline-gold)]" />
          </span>
        </Reveal>
        <Reveal delay={250}>
          <h1 className="type-display-xl max-w-[9em] text-balance text-stone-50">
            The MAS Partners{'\u00A0'}Club.
          </h1>
        </Reveal>
        <Reveal delay={380}>
          <p className="type-lede max-w-[28em] text-navy-100">
            Partnership extends beyond capital — a concierge relationship and a calendar kept
            intentionally small.
          </p>
        </Reveal>
        <Reveal delay={500}>
          <div aria-hidden="true" className="mx-auto mt-3.5 w-10 border-t border-[var(--hairline-gold)]" />
        </Reveal>
      </div>
    </section>
  );
}
