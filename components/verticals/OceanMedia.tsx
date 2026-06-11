'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * Looping ocean footage for the Essential Infrastructure panel.
 * Mirrors the prototype's OceanMedia (verticals-sections.jsx): autoplay,
 * muted, looped, playsInline, with a slow 1800ms fade-in once the stream
 * can play. Under prefers-reduced-motion the video stays paused on its
 * first frame instead.
 */
export function OceanMedia() {
  const reduced = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // canplay may have fired before hydration attached the listener.
    if (video.readyState >= 3) setReady(true);

    if (reduced) {
      video.pause();
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

  return (
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
      onCanPlay={() => setReady(true)}
      className="h-full w-full object-cover"
      style={
        reduced
          ? undefined
          : { opacity: ready ? 1 : 0, transition: 'opacity 1800ms var(--ease-reveal)' }
      }
    />
  );
}
