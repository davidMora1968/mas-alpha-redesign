import type { Metadata } from 'next';
import { PortfolioHero } from '@/components/portfolio/PortfolioHero';
import { PortfolioStory } from '@/components/portfolio/PortfolioStory';
import { PortfolioUndisclosed } from '@/components/portfolio/PortfolioUndisclosed';
import { PortfolioClosing } from '@/components/portfolio/PortfolioClosing';

const description =
  'The Meadowlark Ski & Lake Lodge — land-led hospitality in the Bighorn National Forest of Wyoming. Further holdings across our verticals are disclosed selectively, to partners.';

export const metadata: Metadata = {
  title: 'Portfolio',
  description,
  alternates: { canonical: '/portfolio' },
  openGraph: {
    title: 'Portfolio',
    description,
  },
};

export default function PortfolioPage() {
  return (
    <main>
      <PortfolioHero />
      <PortfolioStory />
      <PortfolioUndisclosed />
      <PortfolioClosing />
    </main>
  );
}
