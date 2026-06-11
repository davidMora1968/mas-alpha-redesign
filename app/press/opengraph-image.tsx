import { ogCard, OG_SIZE } from '@/lib/og';

export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = 'Mas Alpha Securities — What is being said about the places we steward.';

export default function Image() {
  return ogCard('What is being said about the places we steward.', 'Press');
}
