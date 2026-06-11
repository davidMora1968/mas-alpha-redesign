import { ogCard, OG_SIZE } from '@/lib/og';

export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = 'Mas Alpha Securities — Three ways to own the irreplaceable.';

export default function Image() {
  return ogCard('Three ways to own the irreplaceable.', 'Essential infrastructure · Hospitality · Media');
}
