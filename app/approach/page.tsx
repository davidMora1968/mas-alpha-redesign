import type { Metadata } from 'next';
import { ApproachHero } from '@/components/approach/ApproachHero';
import { ApproachQuote } from '@/components/approach/ApproachQuote';
import { ApproachPrinciples } from '@/components/approach/ApproachPrinciples';
import { ApproachClosing } from '@/components/approach/ApproachClosing';

export const metadata: Metadata = {
  title: 'Our Approach',
  description:
    'An investment philosophy built on scarcity, patience, and discipline — written once, applied without exception.',
  alternates: { canonical: '/approach' },
  openGraph: {
    title: 'Our Approach — Mas Alpha Securities',
    description:
      'An investment philosophy built on scarcity, patience, and discipline — written once, applied without exception.',
  },
};

export default function ApproachPage() {
  return (
    <main id="main" tabIndex={-1} className="scroll-mt-[92px]">
      <ApproachHero />
      <ApproachQuote />
      <ApproachPrinciples />
      <ApproachClosing />
    </main>
  );
}
