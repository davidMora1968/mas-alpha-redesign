import { ogCard, OG_SIZE } from '@/lib/og';

export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = 'Mas Alpha Securities — Permanence is the rarest asset class.';

export default function Image() {
  return ogCard('Permanence is the rarest asset class.', 'Our approach');
}
