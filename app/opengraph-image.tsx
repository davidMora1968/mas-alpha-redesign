import { ogCard, OG_SIZE } from '@/lib/og';

export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = 'Mas Alpha Securities — We own what cannot be replaced.';

export default function Image() {
  return ogCard('We own what cannot be replaced.', 'The next generation of the MasTec family');
}
