'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { EASE_REVEAL } from '@/components/ui/Reveal';

interface StatDef {
  /** Final rendered string — always server-rendered as-is. */
  value: string;
  label: string;
  /** Numeric target for the count-up; omit for non-numeric stats. */
  num?: number;
  /** Zero-pad width while counting (e.g. 2 → "03"). */
  pad?: number;
}

const STATS: readonly StatDef[] = [
  { value: '2023', num: 2023, label: 'Founded · Miami, FL' },
  { value: '03', num: 3, pad: 2, label: 'Verticals' },
  { value: '∞', label: 'Generational Hold Horizon' },
  { value: 'F-500', label: 'Infrastructure Lineage' },
  { value: '230', num: 230, label: 'Acres in Bighorn National Forest' },
  { value: 'US', label: 'Nationwide Mandate' },
];

const COUNT_DURATION = 1500;
const STAGGER_MS = 180;

function easeOutQuart(p: number): number {
  return 1 - Math.pow(1 - p, 4);
}

/**
 * Count-up numeral. Server-renders the FINAL value; only resets to a
 * zero-start counter after mount, once `active` flips true (section in
 * view, reduced motion off). Mirrors runCountUp in static-reference js.
 */
function CountUp({
  target,
  pad = 0,
  final,
  delay,
  active,
}: {
  target: number;
  pad?: number;
  final: string;
  delay: number;
  active: boolean;
}) {
  const [text, setText] = useState(final);

  useEffect(() => {
    if (!active) return;
    let raf = 0;
    let t0: number | null = null;

    setText(String(0).padStart(pad, '0'));

    const tick = (now: number) => {
      if (t0 === null) t0 = now;
      const elapsed = now - t0 - delay;
      if (elapsed < 0) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const p = Math.min(elapsed / COUNT_DURATION, 1);
      setText(String(Math.round(easeOutQuart(p) * target)).padStart(pad, '0'));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setText(final);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, pad, final, delay]);

  return <span className="tabular-nums">{text}</span>;
}

/** .stat — padding + gold hairline; first cell of each row is flush. */
function statClass(i: number): string {
  const base = 'flex flex-col gap-3';
  if (i === 0) return base; // first of row in both layouts
  const bordered = `${base} border-l border-[var(--hairline-gold-faint)] px-5`;
  if (i % 3 === 0) return `${bordered} max-[1100px]:border-l-0 max-[1100px]:px-0`;
  return bordered;
}

export function CredibilityBand() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.35 });
  const reduced = useReducedMotion();
  const animate = inView && !reduced;

  return (
    <section
      ref={sectionRef}
      id="cred"
      aria-label="Firm facts"
      className="gutter border-y border-[var(--hairline-gold-faint)] bg-navy-900 py-24"
    >
      <div className="content grid grid-cols-6 max-[1100px]:grid-cols-3 max-[1100px]:gap-y-10">
        {STATS.map((stat, i) => {
          const cell = (
            <div className={statClass(i)}>
              <div className="type-numeral text-stone-50 [overflow-wrap:anywhere]">
                {stat.num !== undefined ? (
                  <CountUp
                    target={stat.num}
                    pad={stat.pad}
                    final={stat.value}
                    delay={i * STAGGER_MS}
                    active={animate}
                  />
                ) : (
                  stat.value
                )}
              </div>
              <div className="type-eyebrow text-navy-300">{stat.label}</div>
            </div>
          );

          if (reduced) {
            // Static final values, no stagger.
            return <div key={stat.label}>{cell}</div>;
          }

          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 18 }}
              animate={animate ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{
                duration: 0.9,
                ease: EASE_REVEAL,
                delay: (i * STAGGER_MS) / 1000,
              }}
            >
              {cell}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
