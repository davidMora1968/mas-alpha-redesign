import type { Metadata } from 'next';
import { Hero } from '@/components/team/Hero';
import { Lineage } from '@/components/team/Lineage';
import { LeadershipGrid } from '@/components/team/LeadershipGrid';
import { Closing } from '@/components/team/Closing';

const description =
  'Led by the next generation of the MasTec family — NYSE: MTZ, a Fortune-500 American infrastructure company.';

export const metadata: Metadata = {
  title: 'Team',
  description,
  alternates: { canonical: '/team' },
  openGraph: {
    title: 'Team',
    description,
    // The team hero is a pure navy stage with no photograph; fall back
    // to the site's signature hero image for link previews.
    images: ['/assets/imagery/miami-shoreline.jpg'],
  },
};

const LEADERS = [
  { name: 'Jose Mas Jr.', jobTitle: 'Founder, CEO & CIO' },
  { name: 'Isabella Katz', jobTitle: 'Chief Marketing Officer' },
  { name: 'Moises Jattin', jobTitle: 'Head of Partner Relations' },
  { name: 'Gabriel Freire', jobTitle: 'Chief Financial Officer' },
  { name: 'Mary deVenoge', jobTitle: 'Director, The MAS Partners Club' },
];

const personJsonLd = LEADERS.map((leader) => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: leader.name,
  jobTitle: leader.jobTitle,
  worksFor: {
    '@type': 'Organization',
    name: 'Mas Alpha Securities',
  },
}));

export default function TeamPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <Hero />
      <Lineage />
      <LeadershipGrid />
      <Closing />
    </main>
  );
}
