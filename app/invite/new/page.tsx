import type { Metadata } from 'next';
import { InviteGenerator } from '@/components/invite/InviteGenerator';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';

/**
 * Partner-relations console: compose a personal invitation link to send a
 * prospect. Always noindexed — an internal tool, never public.
 */

export const metadata: Metadata = {
  title: 'Compose an Invitation',
  description: 'Partner-relations tool — compose a personal invitation link.',
  robots: { index: false, follow: false },
};

export default function InviteNewPage() {
  return (
    <main className="gutter flex min-h-screen flex-col items-center justify-center bg-navy-950 py-40">
      <div className="flex w-full max-w-[520px] flex-col gap-9">
        <Reveal>
          <Eyebrow>Partner Relations</Eyebrow>
        </Reveal>
        <Reveal delay={120}>
          <h1 className="type-display-md text-balance text-stone-50">Compose an invitation.</h1>
        </Reveal>
        <Reveal delay={220}>
          <p className="type-body max-w-[34em] text-navy-100">
            Type a prospect&rsquo;s name and send them a link of their own — an invitation, not a
            marketing blast.
          </p>
        </Reveal>
        <Reveal delay={340}>
          <InviteGenerator />
        </Reveal>
      </div>
    </main>
  );
}
