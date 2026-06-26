'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Reveal, EASE_REVEAL } from '@/components/ui/Reveal';

/* ------------------------------------------------------------------ *
 *  THE ECOSYSTEM — /ecosystem
 *  A cinematic walk through the firm's working system: six full-bleed
 *  movements over the firm's own imagery, one of them writing itself
 *  live. Internal showcase (unlinked, noindexed).
 * ------------------------------------------------------------------ */

const GOLD = '#C2A36B';

type Movement = {
  num: string;
  verb: string;
  title: string;
  sub: string;
  mono: string;
  image: string;
  alt: string;
  pos: string;
  live?: boolean;
};

const MOVEMENTS: Movement[] = [
  {
    num: 'I',
    verb: 'Greets',
    title: 'It receives a partner before a word is exchanged.',
    sub: 'Every arrival meets a digital home composed and certain of itself — the firm’s first impression, kept by the system, not left to chance.',
    mono: 'visit → received',
    image: '/assets/imagery/brickell-skyline-hero.jpg',
    alt: 'The Brickell skyline at dusk',
    pos: 'center 45%',
  },
  {
    num: 'II',
    verb: 'Records',
    title: 'Every inquiry is committed the instant it is written.',
    sub: 'A “Become a Partner” note lands in a sealed ledger the moment it is sent — nothing lost between the page and the desk, nothing made public.',
    mono: 'inquiry → sealed → partner-relations desk',
    image: '/assets/imagery/team-investor-night.jpg',
    alt: 'The firm at work after hours',
    pos: 'center 50%',
    live: true,
  },
  {
    num: 'III',
    verb: 'Watches',
    title: 'It reads how the firm is named in the press — without rest.',
    sub: 'A continuous, patient watch over the firm’s coverage. What the world says is gathered and held before anyone on the desk has to go looking.',
    mono: 'press → gathered → held',
    image: '/assets/imagery/miami-shoreline.jpg',
    alt: 'The Miami shoreline',
    pos: 'center 55%',
  },
  {
    num: 'IV',
    verb: 'Reports',
    title: 'Before the desk is staffed, the week is sealed and sent.',
    sub: 'Composed overnight and delivered every Monday — inquiries, coverage, the week ahead — the firm briefing its own leadership while the office is still dark.',
    mono: 'composed · sent — mon 06:00 est',
    image: '/assets/imagery/wyoming-range.avif',
    alt: 'First light over the Wyoming range',
    pos: 'center 50%',
  },
  {
    num: 'V',
    verb: 'Invites',
    title: 'Invitations drawn in the firm’s own hand.',
    sub: 'A tool that issues a personal invitation for a named prospect — stationery cream, a gold hairline, the seal of MAS Alpha. Outreach that feels chosen, not marketed.',
    mono: '— for the attention of —',
    image: '/assets/imagery/club-night-pavilion.jpg',
    alt: 'The MAS Partners Club pavilion at night',
    pos: 'center 50%',
  },
  {
    num: 'VI',
    verb: 'Opens',
    title: 'One door, kept for those it has chosen.',
    sub: 'The investor portal — closed to all others, opened only by name. The single threshold the system keeps for the partners already inside.',
    mono: 'portal → opened by name',
    image: '/assets/imagery/club-humidor.jpg',
    alt: 'An interior of the MAS Partners Club',
    pos: 'center 50%',
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
        <span className="rounded-full" style={{ width: size, height: size, background: GOLD, opacity: 0.85 }} />
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
  const m = 4 * 60 + 12 + i * 37; // from 04:12, ~37-min gaps; pure arithmetic (no hydration drift)
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
    <div
      ref={ref}
      className="mt-2 w-full max-w-[400px] border border-[var(--hairline-gold-faint)] bg-[rgba(6,15,29,0.6)] p-5 backdrop-blur-sm"
    >
      <div className="flex items-center gap-2.5 border-b border-[var(--hairline-gold-faint)] pb-2.5">
        <Heartbeat size={6} reduced={reduced} />
        <span className="type-mono-detail text-gold-400">the ledger · writing</span>
      </div>
      <ul className="mt-1 flex flex-col">
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

/* ----------------------------- a movement --------------------------- */
function Panel({ m, reduced }: { m: Movement; reduced: boolean | null }) {
  return (
    <section
      aria-label={`${m.verb}`}
      className="relative flex min-h-[92vh] flex-col justify-end overflow-hidden bg-navy-900"
    >
      <Image src={m.image} alt={m.alt} fill sizes="100vw" className="object-cover" style={{ objectPosition: m.pos }} />
      <div aria-hidden="true" className="absolute inset-0" style={{ background: 'var(--scrim-panel)' }} />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: 'linear-gradient(90deg, rgba(6,15,29,0.7) 0%, rgba(6,15,29,0.25) 42%, transparent 68%)' }}
      />
      <div className="content gutter relative flex w-full flex-col items-start gap-6 pb-24 pt-40">
        <Reveal>
          <div className="type-eyebrow text-gold-400">
            {m.num} · {m.verb}
          </div>
        </Reveal>
        <Reveal delay={120}>
          <h2
            className="type-display-lg max-w-[16em] text-balance text-stone-50"
            style={{ textShadow: '0 2px 26px rgba(6,15,29,0.6)' }}
          >
            {m.title}
          </h2>
        </Reveal>
        <Reveal delay={240}>
          <p className="type-lede max-w-[34em] text-navy-100" style={{ textShadow: '0 1px 14px rgba(6,15,29,0.55)' }}>
            {m.sub}
          </p>
        </Reveal>
        {m.live && <RecordsLedger reduced={reduced} />}
        <Reveal delay={360}>
          <span className="type-mono-detail text-gold-300">{m.mono}</span>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------- page ----------------------------- */
export function EcosystemInstrument() {
  const reduced = useReducedMotion();
  const clock = useEstClock(reduced);

  return (
    <main id="main" tabIndex={-1} className="scroll-mt-[92px] overflow-hidden bg-navy-950">
      {/* ============================ HERO ============================ */}
      <section className="relative flex h-screen min-h-[660px] flex-col justify-end overflow-hidden bg-navy-950">
        <Image
          src="/assets/imagery/miami-skyline-hero.jpg"
          alt="The Miami skyline at dusk"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: 'center 48%' }}
        />
        <div aria-hidden="true" className="absolute inset-0" style={{ background: 'var(--scrim-hero)' }} />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: 'linear-gradient(90deg, rgba(6,15,29,0.72) 0%, rgba(6,15,29,0.28) 44%, transparent 70%)' }}
        />
        <div className="content gutter relative flex w-full flex-col items-start gap-7 pb-24">
          <Reveal>
            <div className="type-eyebrow text-gold-400">The Ecosystem</div>
          </Reveal>
          <Reveal delay={150}>
            <h1
              className="type-display-xl max-w-[11em] text-balance text-stone-50"
              style={{ textShadow: '0 2px 30px rgba(6,15,29,0.7)' }}
            >
              Not a website. An instrument.
            </h1>
          </Reveal>
          <Reveal delay={300}>
            <p
              className="type-lede max-w-[36em] text-navy-100"
              style={{ textShadow: '0 1px 16px rgba(6,15,29,0.55)' }}
            >
              Mas Alpha is a working system — it greets, records, watches, reports, and invites, on its own.
              Six functions, one current, every path ending at your desk.
            </p>
          </Reveal>
          <Reveal delay={450}>
            <div className="flex items-center gap-2.5">
              <Heartbeat size={6} reduced={reduced} />
              <span className="type-mono-detail text-navy-100" suppressHydrationWarning>
                system active · {clock} est
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ====================== INDEX / OVERVIEW ===================== */}
      <section className="gutter border-y border-[var(--hairline-gold-faint)] bg-navy-950 py-20">
        <div className="content">
          <Reveal>
            <p className="type-display-md max-w-[18em] text-balance text-stone-50">
              Six functions. One system. Every path ends at the partner-relations desk.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-[var(--hairline-gold-faint)] pt-7">
              {MOVEMENTS.map((m) => (
                <span key={m.num} className="type-eyebrow inline-flex items-baseline gap-2.5 text-navy-300">
                  <span className="text-gold-400" style={{ font: '300 13px/1 var(--font-serif-display)' }}>
                    {m.num}
                  </span>
                  {m.verb}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========================= MOVEMENTS ======================== */}
      {MOVEMENTS.map((m) => (
        <Panel key={m.num} m={m} reduced={reduced} />
      ))}

      {/* ========================== CLOSING ========================= */}
      <section className="relative flex min-h-[90vh] flex-col justify-end overflow-hidden bg-navy-950">
        <Image
          src="/assets/imagery/brickell-skyline-hero.jpg"
          alt="The Brickell skyline at dusk"
          fill
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: 'center 42%' }}
        />
        <div aria-hidden="true" className="absolute inset-0" style={{ background: 'var(--scrim-panel)' }} />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: 'linear-gradient(90deg, rgba(6,15,29,0.74) 0%, rgba(6,15,29,0.3) 44%, transparent 70%)' }}
        />
        <div className="content gutter relative flex w-full flex-col items-start gap-7 pb-24 pt-40">
          <div className="flex items-center gap-3">
            <Heartbeat size={11} reduced={reduced} />
            <span className="type-mono-detail text-gold-300">the partner-relations desk</span>
          </div>
          <Reveal>
            <h2
              className="type-display-lg max-w-[15em] text-balance text-stone-50"
              style={{ textShadow: '0 2px 26px rgba(6,15,29,0.6)' }}
            >
              Six movements. One desk. Every path ends here.
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <p className="type-lede max-w-[40em] text-navy-100" style={{ textShadow: '0 1px 14px rgba(6,15,29,0.55)' }}>
              Not a brochure that sits still — a system that greets, records, watches, reports, and invites,
              and reports back to you. The website you are looking at is only its first instrument.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <Link href="/portal" className="ma-portal-link type-button inline-block text-stone-50 no-underline">
              Enter the Portal →
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
