'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { CSSProperties, ReactNode } from 'react';

export const EASE_REVEAL = [0.22, 1, 0.36, 1] as const;

/**
 * Fades + rises children when they enter the viewport. Once only.
 * Mirrors the design system's Reveal: 28px rise, 900ms, slow ease.
 * Honors prefers-reduced-motion (renders static).
 */
export function Reveal({
  children,
  delay = 0,
  className,
  style,
}: {
  children: ReactNode;
  delay?: number; // ms, matching the prototype's delay props
  className?: string;
  style?: CSSProperties;
}) {
  const reduced = useReducedMotion();
  if (reduced) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.9, ease: EASE_REVEAL, delay: delay / 1000 }}
    >
      {children}
    </motion.div>
  );
}
