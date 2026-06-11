import type { Metadata } from 'next';
import { Hero } from '@/components/home/Hero';
import { Philosophy } from '@/components/home/Philosophy';
import { CredibilityBand } from '@/components/home/CredibilityBand';
import { ExploreGrid } from '@/components/home/ExploreGrid';
import { Closing } from '@/components/home/Closing';
import { FeaturedInStrip } from '@/components/home/FeaturedInStrip';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Philosophy />
      <CredibilityBand />
      <ExploreGrid />
      <Closing />
      <FeaturedInStrip />
    </main>
  );
}
