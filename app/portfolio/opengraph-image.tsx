import { ogCard, OG_SIZE } from '@/lib/og';

export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = 'Mas Alpha Securities — Meadowlark Ski & Lake Lodge.';

export default function Image() {
  return ogCard('Meadowlark Ski & Lake Lodge.', 'Flagship portfolio · MAS Tierra');
}
