import { ogCard, OG_SIZE } from '@/lib/og';

export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = 'Mas Alpha Securities — The Daily Brief, Edition No. 1';

export default function Image() {
  return ogCard('The Daily Brief.', 'Edition No. 1 · Mas Alpha Securities');
}
