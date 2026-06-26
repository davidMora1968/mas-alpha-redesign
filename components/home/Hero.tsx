'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { Reveal, EASE_REVEAL } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';

/**
 * Homepage hero. Full-viewport navy stage: the Miami skyline at blue hour as
 * a muted autoplay video loop (4K, ~20MB) with its first frame as an instant
 * poster, a slow fade/settle on load, parallax drift, scrims for legibility,
 * and bottom-anchored content. Under prefers-reduced-motion it falls back to
 * the still poster image.
 */
export function Hero() {
  const reduced = useReducedMotion();
  const [ready, setReady] = useState(false);

  // Gentle parallax: background drifts down at 18% of scroll.
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, (v) => v * 0.18);

  const videoRef = useRef<HTMLVideoElement>(null);

  // Some browsers need muted asserted in JS before autoplay will fire.
  useEffect(() => {
    if (reduced) return;
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    const p = v.play();
    if (p) p.catch(() => {});
  }, [reduced]);

  const POSTER = '/assets/imagery/hero-miami-poster.jpg';

  const bg = reduced ? (
    <Image
      src={POSTER}
      alt="The Miami skyline at blue hour"
      fill
      priority
      className="object-cover"
      style={{ objectPosition: 'center 42%' }}
      sizes="100vw"
      onLoad={() => setReady(true)}
    />
  ) : (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster={POSTER}
      aria-hidden="true"
      className="h-full w-full object-cover"
      style={{ objectPosition: 'center 42%' }}
      onLoadedData={() => setReady(true)}
      onError={() => setReady(true)} // never leave the hero dark
    >
      <source src="/assets/imagery/hero-miami.mp4" type="video/mp4" />
    </video>
  );

  return (
    <section id="hero" className="relative h-screen min-h-[640px] overflow-hidden bg-navy-950">
      {/* Parallax wrapper — oversized vertically so the drift never exposes edges */}
      {reduced ? (
        <div className="absolute" style={{ inset: '-12% 0' }}>
          <div className="absolute inset-0">{bg}</div>
        </div>
      ) : (
        <motion.div className="absolute" style={{ inset: '-12% 0', y }}>
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.06 }}
            animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.06 }}
            transition={{
              opacity: { duration: 1.8, ease: EASE_REVEAL },
              scale: { duration: 5.2, ease: EASE_REVEAL },
            }}
          >
            {bg}
          </motion.div>
        </motion.div>
      )}

      {/* Image protection — base scrim, top fade, and a stronger bottom-left
          wash so the headline stays legible over bright skyline reflections. */}
      <div aria-hidden="true" className="absolute inset-0" style={{ background: 'var(--scrim-hero)' }} />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[140px]"
        style={{ background: 'linear-gradient(180deg, rgba(6, 15, 29, 0.55), transparent)' }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(0deg, rgba(6,15,29,0.86) 0%, rgba(6,15,29,0.55) 26%, rgba(6,15,29,0.12) 52%, transparent 70%)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: 'linear-gradient(90deg, rgba(6,15,29,0.55) 0%, rgba(6,15,29,0.16) 38%, transparent 62%)' }}
      />

      {/* Content — anchored to the bottom edge */}
      <div className="gutter absolute inset-x-0 bottom-0 flex flex-col items-start gap-8 pb-24">
        <Reveal>
          <span
            className="inline-flex items-center gap-[18px] text-[14px] font-semibold uppercase tracking-[0.3em] text-stone-50"
            style={{
              fontFamily: 'var(--font-grotesque)',
              textShadow: '0 1px 16px rgba(6, 15, 29, 0.65)',
            }}
          >
            <span aria-hidden="true" className="inline-block w-11 shrink-0 border-t border-gold-400" />
            The next generation of the MasTec{'\u00A0'}family
          </span>
        </Reveal>
        <Reveal delay={150}>
          <h1
            className="type-display-xl max-w-[11em] text-stone-50"
            style={{ textShadow: '0 2px 30px rgba(6, 15, 29, 0.72), 0 1px 10px rgba(6, 15, 29, 0.55)' }}
          >
            We own what cannot be replaced.
          </h1>
        </Reveal>
        <Reveal delay={300}>
          <p
            className="type-lede max-w-[32em] text-navy-100"
            style={{ textShadow: '0 1px 18px rgba(6, 15, 29, 0.6), 0 1px 6px rgba(6, 15, 29, 0.55)' }}
          >
            Mas Alpha Securities deploys private capital to acquire premier infrastructure assets
            across the United States.
          </p>
        </Reveal>
        <Reveal delay={450}>
          <Button size="lg" href="#partner">
            Become a Partner
          </Button>
        </Reveal>
      </div>

      {/* Scroll cue — hidden on phones, where it collides with the content stack */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 flex flex-col items-center gap-3.5 max-[640px]:hidden"
        style={{ right: 'var(--page-gutter)' }}
      >
        <span className="type-eyebrow text-navy-300 [writing-mode:vertical-rl]">Scroll</span>
        <span
          className="relative block h-[72px] w-px overflow-hidden"
          style={{ background: 'var(--hairline-on-dark)' }}
        >
          <span
            className="ma-scroll-cue-dash absolute left-0 top-0 block h-9 w-px bg-gold-400"
            style={{ animation: 'ma-scroll-cue 3s var(--ease-reveal) infinite' }}
          />
        </span>
      </div>
    </section>
  );
}
