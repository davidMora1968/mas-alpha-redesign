'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { Reveal, EASE_REVEAL } from '@/components/ui/Reveal';

/* ------------------------------------------------------------------ *
 *  THE INSTRUMENT — /ecosystem
 *  One gold hairline runs down the left margin. A scroll-bound pulse of
 *  light travels it and ignites six movements; all of it ends at one desk.
 *  Gold is a 1px whisper; one ease for everything; no bounce.
 *  Fully composed under prefers-reduced-motion.
 * ------------------------------------------------------------------ */

const GOLD = '#C2A36B';

// Shared rail geometry — the line, the nodes, and the content all key off these.
const RAIL = 'left-[28px] md:left-[92px]';
const PAD = 'pl-[64px] pr-[var(--page-gutter)] md:pl-[156px] md:pr-[8vw]';

type Accent = 'aperture' | 'ledger' | 'watch' | 'report' | 'invite' | 'door';

const MOVEMENTS: {
  num: string;
  verb: string;
  title: string;
  sub: string;
  mono: string;
  accent: Accent;
  apex?: boolean;
}[] = [
  {
    num: 'I',
    verb: 'Greets',
    title: 'Arrival is acknowledged before a word is exchanged.',
    sub: 'The site receives each visit composed and certain of itself — the firm’s first impression, kept by the system.',
    mono: '— received',
    accent: 'aperture',
  },
  {
    num: 'II',
    verb: 'Records',
    title: 'Every inquiry is committed the instant it is written.',
    sub: 'Nothing is lost between the page and the desk. Nothing is made public.',
    mono: '→ partner-relations desk',
    accent: 'ledger',
  },
  {
    num: 'III',
    verb: 'Watches',
    title: 'It reads how the firm is named in the press — without rest.',
    sub: 'A continuous, patient watch; what the world says is held before anyone has to look.',
    mono: '→ partner-relations desk',
    accent: 'watch',
  },
  {
    num: 'IV',
    verb: 'Reports',
    title: 'Before the desk is staffed, the week’s reading is sealed and sent.',
    sub: 'Composed overnight, delivered every Monday — written while leadership sleeps.',
    mono: 'composed · sent — mon 06:00 est',
    accent: 'report',
    apex: true,
  },
  {
    num: 'V',
    verb: 'Invites',
    title: 'Invitations drawn in the firm’s own hand.',
    sub: 'Each carries the house name forward — stationery cream, a gold hairline, the seal of MAS Alpha.',
    mono: '— for the attention of —',
    accent: 'invite',
  },
  {
    num: 'VI',
    verb: 'Opens',
    title: 'One door, kept for those it has chosen.',
    sub: 'The investor portal — closed to all others, opened only by name.',
    mono: 'open',
    accent: 'door',
  },
];

/* ----------------------------- heartbeat ---------------------------- */
function Heartbeat({ size = 7, reduced }: { size?: number; reduced: boolean | null }) {
  const halo = size * 3.4;
  return (
    <span className="relative inline-flex items-center justify-center" style={{ width: halo, height: halo }}>
      <span
        aria-hidden="true"
        className="absolute rounded-full"
        style={{ width: halo, height: halo, background: 'radial-gradient(circle, rgba(194,163,107,0.4), transparent 68%)' }}
      />
      {reduced ? (
        <span className="rounded-full" style={{ width: size, height: size, background: GOLD, opacity: 0.8 }} />
      ) : (
        <motion.span
          className="rounded-full"
          style={{ width: size, height: size, background: GOLD }}
          animate={{ opacity: [0.45, 1, 0.45], scale: [1, 1.14, 1] }}
          transition={{ duration: 4, repeat: Infinity, repeatType: 'mirror', ease: EASE_REVEAL }}
        />
      )}
    </span>
  );
}

/* ----------------------------- live clock --------------------------- */
function useEstClock(reduced: boolean | null) {
  const [t, setT] = useState('04:12');
  useEffect(() => {
    if (reduced) return;
    const fmt = () =>
      new Date().toLocaleTimeString('en-US', {
        timeZone: 'America/New_York',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
    setT(fmt());
    const id = setInterval(() => setT(fmt()), 20000);
    return () => clearInterval(id);
  }, [reduced]);
  return t;
}

/* --------------------- the live RECORDS ledger ---------------------- */
function pad(n: number) {
  return n.toString().padStart(2, '0');
}
function stamp(i: number) {
  // Pure arithmetic, always increasing — no Date (avoids hydration drift).
  const m = 4 * 60 + 12 + i * 37; // from 04:12, ~37-min gaps
  return `mon ${pad(Math.floor(m / 60) % 24)}:${pad(m % 60)} · inquiry · sealed`;
}

function RecordsLedger({ reduced }: { reduced: boolean | null }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  const [rows, setRows] = useState<{ id: number; text: string }[]>(() =>
    [0, 1, 2].map((i) => ({ id: i, text: stamp(i) })),
  );

  useEffect(() => {
    if (reduced || !inView) return;
    let i = 3;
    const id = setInterval(() => {
      setRows((prev) => [...prev, { id: i, text: stamp(i) }].slice(-5));
      i += 1;
    }, 2600);
    return () => clearInterval(id);
  }, [reduced, inView]);

  return (
    <div ref={ref} className="mt-9 w-full max-w-[360px]">
      <div className="flex items-center gap-2.5 border-b border-[var(--hairline-gold-faint)] pb-2">
        <Heartbeat size={6} reduced={reduced} />
        <span className="type-mono-detail text-navy-300">the ledger · writing</span>
      </div>
      <ul className="mt-1.5 flex flex-col">
        {rows.map((r) =>
          reduced ? (
            <li key={r.id} className="type-mono-detail border-b border-[var(--hairline-on-dark)] py-2 text-navy-100">
              {r.text}
            </li>
          ) : (
            <motion.li
              key={r.id}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_REVEAL }}
              className="type-mono-detail border-b border-[var(--hairline-on-dark)] py-2 text-navy-100"
            >
              {r.text}
            </motion.li>
          ),
        )}
      </ul>
    </div>
  );
}

/* --------------------------- station accents ------------------------ */
const STROKE = { stroke: GOLD, strokeWidth: 1, fill: 'none', strokeOpacity: 0.55 } as const;
const DRAW = {
  initial: { pathLength: 0 },
  whileInView: { pathLength: 1 },
  viewport: { once: true, amount: 0.6 },
} as const;

function Accent({ accent, reduced }: { accent: Accent; reduced: boolean | null }) {
  if (accent === 'ledger') return <RecordsLedger reduced={reduced} />;

  if (accent === 'aperture')
    return (
      <svg width="64" height="64" viewBox="0 0 64 64" className="mt-9" aria-hidden="true">
        {reduced ? (
          <circle cx="32" cy="32" r="22" {...STROKE} />
        ) : (
          <motion.circle cx="32" cy="32" r="22" {...STROKE} {...DRAW} transition={{ duration: 1, ease: EASE_REVEAL }} />
        )}
        <circle cx="32" cy="32" r="2" fill={GOLD} fillOpacity={0.8} />
      </svg>
    );

  if (accent === 'watch')
    return (
      <div className="mt-9 flex w-full max-w-[320px] flex-col gap-3">
        {[0, 1, 2].map((i) => (
          <Reveal key={i} delay={i * 120}>
            <div className="h-9 border border-[var(--hairline-gold-faint)]" />
          </Reveal>
        ))}
      </div>
    );

  if (accent === 'report')
    return (
      <svg width="120" height="86" viewBox="0 0 120 86" className="mt-9" aria-hidden="true">
        {reduced ? (
          <>
            <rect x="8" y="14" width="104" height="64" {...STROKE} />
            <path d="M8 14 L60 50 L112 14" {...STROKE} />
            <circle cx="60" cy="50" r="5" fill={GOLD} fillOpacity={0.85} />
          </>
        ) : (
          <>
            <motion.rect x="8" y="14" width="104" height="64" {...STROKE} {...DRAW} transition={{ duration: 1, ease: EASE_REVEAL }} />
            <motion.path d="M8 14 L60 50 L112 14" {...STROKE} {...DRAW} transition={{ duration: 0.8, ease: EASE_REVEAL, delay: 0.5 }} />
            <motion.circle
              cx="60"
              cy="50"
              r="5"
              fill={GOLD}
              fillOpacity={0.85}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5, ease: EASE_REVEAL, delay: 1.2 }}
              style={{ transformOrigin: '60px 50px' }}
            />
          </>
        )}
      </svg>
    );

  if (accent === 'invite')
    return (
      <div className="mt-9 w-full max-w-[300px]">
        <svg width="100%" viewBox="0 0 300 150" aria-hidden="true">
          {reduced ? (
            <rect x="1" y="1" width="298" height="148" {...STROKE} />
          ) : (
            <motion.rect x="1" y="1" width="298" height="148" {...STROKE} {...DRAW} transition={{ duration: 1.1, ease: EASE_REVEAL }} />
          )}
          <line x1="40" y1="92" x2="260" y2="92" stroke={GOLD} strokeWidth={1} strokeOpacity={0.3} />
          <circle cx="150" cy="118" r="9" {...STROKE} />
          <circle cx="150" cy="118" r="2" fill={GOLD} fillOpacity={0.7} />
          <text
            x="150"
            y="64"
            textAnchor="middle"
            fill="#FAF7F0"
            style={{ font: 'italic 300 16px var(--font-serif-display)' }}
          >
            for the attention of
          </text>
        </svg>
      </div>
    );

  // door
  return (
    <div className="relative mt-9 h-[150px] w-[120px]" aria-hidden="true">
      <div
        className="absolute inset-0 m-auto h-[120px] w-[80px]"
        style={{ background: 'radial-gradient(circle, rgba(250,247,240,0.16), transparent 70%)' }}
      />
      <motion.div
        className="absolute top-[15px] h-[120px] w-[36px] border border-[var(--hairline-gold)]"
        style={{ left: 24 }}
        initial={reduced ? false : { x: 0 }}
        whileInView={reduced ? undefined : { x: -6 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1, ease: EASE_REVEAL, delay: 0.3 }}
      />
      <motion.div
        className="absolute top-[15px] h-[120px] w-[36px] border border-[var(--hairline-gold)]"
        style={{ right: 24 }}
        initial={reduced ? false : { x: 0 }}
        whileInView={reduced ? undefined : { x: 6 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1, ease: EASE_REVEAL, delay: 0.3 }}
      />
      <span className="type-mono-detail absolute inset-x-0 top-[64px] text-center text-stone-50">open</span>
    </div>
  );
}

/* ------------------------------- station ---------------------------- */
function Station({ m, reduced }: { m: (typeof MOVEMENTS)[number]; reduced: boolean | null }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.45 });

  return (
    <div ref={ref} className="relative py-[12vh] first:pt-[8vh]">
      {/* node where the station meets the rail */}
      <span
        aria-hidden="true"
        className={`absolute top-[12vh] h-2 w-2 -translate-x-1/2 rounded-full transition-[opacity,box-shadow] duration-700 ${RAIL}`}
        style={{
          background: GOLD,
          opacity: inView || reduced ? 0.95 : 0.28,
          boxShadow: inView && !reduced ? '0 0 14px 2px rgba(194,163,107,0.45)' : 'none',
        }}
      />
      <div className={`flex flex-col gap-5 ${PAD}`}>
        <Reveal>
          <div className="type-eyebrow text-gold-400">
            {m.num} · {m.verb}
          </div>
        </Reveal>
        <Reveal delay={120}>
          <h2 className={`${m.apex ? 'type-display-lg' : 'type-display-md'} max-w-[15em] text-balance text-stone-50`}>
            {m.title}
          </h2>
        </Reveal>
        <Reveal delay={220}>
          <p className="type-body-sm max-w-[32em] text-navy-300">{m.sub}</p>
        </Reveal>
        <Reveal delay={300}>
          <div className="flex flex-col items-start gap-3">
            <Accent accent={m.accent} reduced={reduced} />
            <span className="type-mono-detail mt-3 text-navy-300">{m.mono}</span>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

/* --------------------------------- page ----------------------------- */
export function EcosystemInstrument() {
  const reduced = useReducedMotion();
  const railRef = useRef<HTMLDivElement>(null);
  const clock = useEstClock(reduced);

  const { scrollYProgress } = useScroll({ target: railRef, offset: ['start center', 'end center'] });
  const pulseTop = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const poweredHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <main id="main" tabIndex={-1} className="scroll-mt-[92px] overflow-hidden bg-navy-950">
      {/* ============================ HERO ============================ */}
      <section className="relative flex h-screen min-h-[660px] flex-col justify-center overflow-hidden">
        {/* hero rail — dormant full height, a one-time "power on" sweep, heartbeat node */}
        <div className={`absolute top-0 h-full w-px -translate-x-1/2 ${RAIL}`} aria-hidden="true">
          <div className="absolute inset-0" style={{ background: 'rgba(194,163,107,0.18)' }} />
          {!reduced && (
            <motion.div
              className="absolute inset-x-0 top-0 origin-top"
              style={{ height: '100%', background: 'linear-gradient(180deg, rgba(194,163,107,0.6), transparent 60%)' }}
              initial={{ scaleY: 0, opacity: 1 }}
              animate={{ scaleY: 1, opacity: [1, 1, 0] }}
              transition={{ scaleY: { duration: 2.4, ease: EASE_REVEAL }, opacity: { duration: 1.1, delay: 2.2 } }}
            />
          )}
        </div>
        <div className={`absolute top-1/2 -translate-x-1/2 -translate-y-1/2 ${RAIL}`} aria-hidden="true">
          <Heartbeat size={9} reduced={reduced} />
        </div>

        <div className={PAD}>
          <Reveal>
            <div className="type-eyebrow text-navy-300">The Instrument — always running</div>
          </Reveal>
          <Reveal delay={150}>
            <h1 className="type-display-xl mt-8 max-w-[11em] text-balance text-stone-50">
              It does not sleep when leadership does.
            </h1>
          </Reveal>
          <Reveal delay={300}>
            <p className="type-lede mt-8 max-w-[34em] text-navy-100">
              Mas Alpha is no longer a website. It is a working system — receiving, recording, watching, and
              reporting on its own. What follows is the current, traced end to end.
            </p>
          </Reveal>
          <Reveal delay={450}>
            <div className="mt-9 flex items-center gap-2.5">
              <Heartbeat size={6} reduced={reduced} />
              <span className="type-mono-detail text-navy-300" suppressHydrationWarning>
                system active · {clock} est
              </span>
            </div>
          </Reveal>
          <Reveal delay={600}>
            <div className="type-mono-detail mt-14 text-navy-300/70">↓ trace the current</div>
          </Reveal>
        </div>
      </section>

      {/* ===================== STATIONS + THE DESK ==================== */}
      <section ref={railRef} className="relative">
        {/* dormant rail */}
        <div
          aria-hidden="true"
          className={`absolute bottom-0 top-0 w-px -translate-x-1/2 ${RAIL}`}
          style={{ background: 'rgba(194,163,107,0.18)' }}
        />
        {/* powered segment — fills from top to the pulse as you scroll */}
        <motion.div
          aria-hidden="true"
          className={`absolute top-0 w-px -translate-x-1/2 ${RAIL}`}
          style={{
            height: reduced ? '100%' : poweredHeight,
            background: 'linear-gradient(180deg, transparent, rgba(194,163,107,0.55))',
          }}
        />
        {/* the travelling pulse */}
        <motion.div
          aria-hidden="true"
          className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 ${RAIL}`}
          style={{ top: reduced ? '100%' : pulseTop }}
        >
          <span
            className="block rounded-full"
            style={{ width: 9, height: 9, background: GOLD, boxShadow: '0 0 18px 5px rgba(194,163,107,0.45)' }}
          />
        </motion.div>

        {MOVEMENTS.map((m) => (
          <Station key={m.num} m={m} reduced={reduced} />
        ))}

        {/* the desk — every path terminates here */}
        <div className="relative pb-[10vh] pt-[4vh]">
          <span className={`absolute top-[4vh] -translate-x-1/2 ${RAIL}`} aria-hidden="true">
            <Heartbeat size={13} reduced={reduced} />
          </span>
          <div className={PAD}>
            <span className="type-mono-detail text-gold-400">the partner-relations desk</span>
          </div>
        </div>
      </section>

      {/* ========================== CLOSING ========================= */}
      <section className={`flex flex-col gap-8 pb-40 pt-[6vh] ${PAD}`}>
        <Reveal>
          <h2 className="type-display-lg max-w-[16em] text-balance text-stone-50">
            Six movements. One desk. Every path ends here.
          </h2>
        </Reveal>
        <Reveal delay={150}>
          <p className="type-mono-detail max-w-[44em] text-navy-300">
            Mas Alpha Securities · the instrument runs whether or not you are watching.
          </p>
        </Reveal>
        <Reveal delay={300}>
          <Link href="/portal" className="ma-portal-link type-button inline-block text-stone-50 no-underline">
            Enter the Portal →
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
