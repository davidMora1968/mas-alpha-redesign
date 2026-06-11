import type { Metadata } from 'next';
import Image from 'next/image';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { PortalGate } from '@/components/portal/PortalGate';

export const metadata: Metadata = {
  title: 'Investor Portal',
  // The portal door is for partners, not for search engines — noindex
  // unconditionally, independent of the demo-mode flag in app/layout.tsx.
  robots: { index: false, follow: false },
};

export default function PortalPage() {
  return (
    <main className="gutter flex min-h-svh items-center justify-center bg-navy-950 py-36">
      <div className="flex w-full max-w-[400px] flex-col items-center text-center">
        <Reveal>
          <Image
            src="/assets/logos/mas-icon-gold.png"
            alt="Mas Alpha Securities"
            width={211}
            height={209}
            priority
            className="h-14 w-auto"
          />
        </Reveal>
        <Reveal delay={120} className="mt-8 w-full">
          <Eyebrow rule={false} className="justify-center">
            Investor Portal
          </Eyebrow>
        </Reveal>
        <Reveal delay={220} className="mt-5 w-full">
          <h1 className="type-display-md text-stone-50">For partners of the firm.</h1>
        </Reveal>
        <Reveal delay={340} className="mt-14 w-full">
          <PortalGate />
        </Reveal>
      </div>
    </main>
  );
}
