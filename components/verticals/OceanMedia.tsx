'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * Looping ocean footage for the Essential Infrastructure panel.
 * Mirrors the prototype's OceanMedia (verticals-sections.jsx): autoplay,
 * muted, looped, playsInline, with a slow 1800ms fade-in once the stream
 * can play. Under prefers-reduced-motion the video stays paused on its
 * first frame instead.
 *
 * A small pause/play control (WCAG 2.2.2) lets anyone stop the motion — the
 * <video> itself stays decorative (aria-hidden + tabIndex=-1).
 */
export function OceanMedia() {
  const reduced = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // canplay may have fired before hydration attached the listener.
    if (video.readyState >= 3) setReady(true);

    if (reduced) {
      video.pause();
      setPaused(true);
      try {
        video.currentTime = 0; // rest on the first frame
      } catch {
        // not seekable yet — the loaded frame is fine
      }
      return;
    }

    // Re-assert muted before play() — some browsers ignore the attribute alone.
    video.muted = true;
    const playing = video.play();
    if (playing) playing.catch(() => {});
  }, [reduced]);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.muted = true;
      void video.play();
    } else {
      video.pause();
    }
  };

  return (
    <div className="relative h-full w-full">
      <video
        ref={videoRef}
        src="/assets/imagery/ocean-move.mp4"
        autoPlay={!reduced}
        loop={!reduced}
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
        onPlay={() => setPaused(false)}
        onPause={() => setPaused(true)}
        onCanPlay={() => setReady(true)}
        className="h-full w-full object-cover"
        style={
          reduced
            ? undefined
            : { opacity: ready ? 1 : 0, transition: 'opacity 1800ms var(--ease-reveal)' }
        }
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={paused ? 'Play background video' : 'Pause background video'}
        className="absolute right-5 top-5 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--hairline-on-dark)] bg-[rgba(6,15,29,0.45)] text-stone-50 backdrop-blur-[6px] transition-colors duration-[350ms] ease-reveal hover:border-gold-400 hover:text-gold-300 focus-visible:border-gold-400"
      >
        {paused ? (
          <svg width="13" height="15" viewBox="0 0 13 15" fill="currentColor" aria-hidden="true">
            <path d="M1.5 1.1v12.8a.7.7 0 0 0 1.07.6l10-6.4a.7.7 0 0 0 0-1.2l-10-6.4a.7.7 0 0 0-1.07.6Z" />
          </svg>
        ) : (
          <svg width="12" height="14" viewBox="0 0 12 14" fill="currentColor" aria-hidden="true">
            <rect x="1.5" y="1" width="3" height="12" rx="0.5" />
            <rect x="7.5" y="1" width="3" height="12" rx="0.5" />
          </svg>
        )}
      </button>
    </div>
  );
}
