import type { Metadata } from 'next';
import { EcosystemInstrument } from '@/components/ecosystem/EcosystemInstrument';

export const metadata: Metadata = {
  title: 'The Instrument',
  description:
    'MAS Alpha as a working system — receiving, recording, watching, and reporting on its own. Traced end to end.',
  // Internal showcase — never indexed, regardless of the demo flag.
  robots: { index: false, follow: false },
};

export default function EcosystemPage() {
  return <EcosystemInstrument />;
}
