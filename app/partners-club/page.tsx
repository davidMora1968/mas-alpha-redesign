import type { Metadata } from 'next';
import { ClubHero } from '@/components/partners-club/ClubHero';
import { ClubExperience } from '@/components/partners-club/ClubExperience';
import { ClubCalendar } from '@/components/partners-club/ClubCalendar';
import { ClubClosing } from '@/components/partners-club/ClubClosing';

export const metadata: Metadata = {
  title: 'The MAS Partners Club',
  description:
    'Partnership extends beyond capital — a concierge relationship and a calendar kept intentionally small.',
  alternates: { canonical: '/partners-club' },
  openGraph: {
    title: 'The MAS Partners Club',
    description:
      'Partnership extends beyond capital — a concierge relationship and a calendar kept intentionally small.',
  },
};

export default function PartnersClubPage() {
  return (
    <main>
      <ClubHero />
      <ClubExperience />
      <ClubCalendar />
      <ClubClosing />
    </main>
  );
}
