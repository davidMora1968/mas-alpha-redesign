import type { Metadata } from 'next';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';

/**
 * The personal invitation — a tool for Partner Relations. A prospective
 * partner receives a link like /invite?for=Robert%20Delgado and opens a
 * ceremonial page addressed to them by name, extended by a named steward.
 * Outreach as an engraved invitation, not a marketing blast.
 * Always noindexed: these pages are personal, never public.
 */

export const metadata: Metadata = {
  title: 'An Invitation',
  description: 'An invitation to a conversation about partnership.',
  robots: { index: false, follow: false },
  openGraph: {
    title: 'An Invitation — Mas Alpha Securities',
    description: 'An invitation to a conversation about partnership.',
  },
};

function clean(value: string | string[] | undefined, max = 60): string | null {
  if (typeof value !== 'string') return null;
  const s = value.replace(/[<>{}\\]/g, '').trim().slice(0, max);
  return s.length > 0 ? s : null;
}

export default async function InvitePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const guest = clean(params.for);
  const host = clean(params.from) ?? 'Moises Jattin · Head of Partner Relations';

  return (
    <main id="main" tabIndex={-1} className="gutter flex min-h-screen flex-col items-center justify-center bg-navy-950 py-40 text-center">
      <div className="flex w-full max-w-[560px] flex-col items-center gap-9">
        <Reveal>
          <span className="inline-flex rounded-full p-3 shadow-[0_0_0_1px_var(--hairline-gold-faint)]">
            <Image
              src="/assets/logos/mas-icon-knockout.png"
              alt=""
              width={120}
              height={120}
              className="h-12 w-12"
            />
          </span>
        </Reveal>
        <Reveal delay={120}>
          <span className="inline-flex items-center gap-4 text-stone-50 [text-shadow:0_1px_12px_rgba(6,15,29,0.5)]">
            <span aria-hidden="true" className="w-9 border-t border-[var(--hairline-gold)]" />
            <span className="type-eyebrow tracking-[0.34em]">An Invitation</span>
            <span aria-hidden="true" className="w-9 border-t border-[var(--hairline-gold)]" />
          </span>
        </Reveal>
        <Reveal delay={240}>
          <h1 className="type-display-lg text-balance text-stone-50">
            {guest ? <>For {guest}.</> : <>For our future{' '}partners.</>}
          </h1>
        </Reveal>
        <Reveal delay={360}>
          <p className="type-lede max-w-[30em] text-balance text-navy-100">
            Mas Alpha Securities invites you into a conversation about partnership — quiet,
            personal, and without obligation. The firm acquires what cannot be built again,
            and holds it for generations.
          </p>
        </Reveal>
        <Reveal delay={460}>
          <span aria-hidden="true" className="block w-10 border-t border-gold-400" />
        </Reveal>
        <Reveal delay={560}>
          <div className="flex flex-col items-center gap-6">
            <Button variant="solid" size="lg" href="/#partner">
              Begin the Conversation
            </Button>
            <p className="type-caption text-navy-300">Extended by {host}</p>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
