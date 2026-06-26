'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Reveal, EASE_REVEAL } from '@/components/ui/Reveal';

/* ------------------------------------------------------------------ *
 *  THE ECOSYSTEM — /ecosystem
 *  A plain-spoken, cinematic walk through what the website actually does
 *  for the firm: six things, over the firm's own imagery, one of them
 *  writing itself live. Internal showcase (unlinked, noindexed).
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
    title: 'It welcomes every new partner.',
    sub: 'The moment someone arrives, the site greets them the way the firm would. A strong first impression, every time, handled for you.',
    mono: 'every visit · welcomed',
    image: '/assets/imagery/brickell-skyline-hero.jpg',
    alt: 'The Brickell skyline at dusk',
    pos: 'center 45%',
  },
  {
    num: 'II',
    verb: 'Records',
    title: 'It saves every inquiry the second it comes in.',
    sub: 'When someone asks to become a partner, their note is saved right away and sent straight to your desk. Nothing slips through, and nothing is ever made public.',
    mono: 'saved · sent to the desk',
    image: '/assets/imagery/meadowlark-horses.avif',
    alt: 'Open country at the firm’s Meadowlark holding',
    pos: 'center 50%',
    live: true,
  },
  {
    num: 'III',
    verb: 'Watches',
    title: 'It keeps an eye on the firm’s press.',
    sub: 'It follows what is being written about Mas Alpha, so you are never the last to know. The coverage is gathered and waiting for you.',
    mono: 'coverage · gathered',
    image: '/assets/imagery/miami-shoreline.jpg',
    alt: 'The Miami shoreline',
    pos: 'center 55%',
  },
  {
    num: 'IV',
    verb: 'Reports',
    title: 'It sends leadership a brief every week.',
    sub: 'Early every Monday, before anyone is at their desk, the site pulls together the week’s inquiries, press, and what is ahead, and emails it to the team.',
    mono: 'sent every monday, 6am',
    image: '/assets/imagery/wyoming-range.avif',
    alt: 'First light over the Wyoming range',
    pos: 'center 50%',
  },
  {
    num: 'V',
    verb: 'Invites',
    title: 'It writes invitations in the firm’s name.',
    sub: 'Type a name and the site creates a personal invitation, set in the firm’s own stationery and ready to send. It feels chosen, never mass mailed.',
    mono: 'ready to send, in your name',
    image: '/assets/imagery/club-night-pavilion.jpg',
    alt: 'The MAS Partners Club pavilion at night',
    pos: 'center 50%',
  },
  {
    num: 'VI',
    verb: 'Opens',
    title: 'It opens the door for partners.',
    sub: 'The investor portal stays closed to everyone else and opens only by name. It is the one door the system keeps for the people already inside.',
    mono: 'opened only by name',
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
        <span className="type-mono-detail text-gold-400">the ledger, writing</span>
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
      aria-label={m.verb}
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
              className="type-display-xl max-w-[12em] text-balance text-stone-50"
              style={{ textShadow: '0 2px 30px rgba(6,15,29,0.7)' }}
            >
              Not just a website. A system that works for you.
            </h1>
          </Reveal>
          <Reveal delay={300}>
            <p
              className="type-lede max-w-[36em] text-navy-100"
              style={{ textShadow: '0 1px 16px rgba(6,15,29,0.55)' }}
            >
              The website does not only sit there and look good. It welcomes new partners, saves every inquiry,
              follows the firm’s press, sends a brief to leadership each week, and writes personal invitations.
              Everything it does comes back to your desk.
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
              Six things it does for you. Every one of them comes back to your desk.
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
            <span className="type-mono-detail text-gold-300">the partner relations desk</span>
          </div>
          <Reveal>
            <h2
              className="type-display-lg max-w-[15em] text-balance text-stone-50"
              style={{ textShadow: '0 2px 26px rgba(6,15,29,0.6)' }}
            >
              Six jobs. One desk. It all comes back to you.
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <p className="type-lede max-w-[40em] text-navy-100" style={{ textShadow: '0 1px 14px rgba(6,15,29,0.55)' }}>
              This is not a brochure that sits still. It is a system that works for the firm and reports back to
              you. What you are looking at is only the first piece of it.
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
