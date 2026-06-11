import { ogCard, OG_SIZE } from '@/lib/og';

export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = 'Mas Alpha Securities — Stewards of the irreplaceable.';

export default function Image() {
  return ogCard('Stewards of the irreplaceable.', 'The next generation of a building legacy');
}
