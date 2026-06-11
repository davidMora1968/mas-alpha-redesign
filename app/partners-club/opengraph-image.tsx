import { ogCard, OG_SIZE } from '@/lib/og';

export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = 'Mas Alpha Securities — The MAS Partners Club.';

export default function Image() {
  return ogCard('The MAS Partners Club.', 'Invitation only');
}
