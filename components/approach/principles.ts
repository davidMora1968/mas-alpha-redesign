/**
 * The three principles of the Mas Alpha investment philosophy.
 * Shared by the hero index strip and the principle rows.
 * Copy is character-exact from the design prototype (approach-sections.jsx).
 */
export interface Principle {
  numeral: string;
  id: string;
  title: string;
  statement: string;
  body: readonly string[];
  detail: string;
}

export const PRINCIPLES: readonly Principle[] = [
  {
    numeral: 'I.',
    id: 'principle-i',
    title: 'Irreplaceable assets',
    statement: 'Assets that cannot be built again.',
    body: [
      'We pursue positions protected by geography, regulation, and history — the highest barriers to entry. A mountain cannot be moved. A right-of-way cannot be re-granted. A landmark cannot be rebuilt.',
      'Where others underwrite growth, we underwrite permanence. Scarcity of this kind does not appear on a balance sheet, but it governs everything on one.',
    ],
    detail: 'High barriers to entry · Geography, regulation & history',
  },
  {
    numeral: 'II.',
    id: 'principle-ii',
    title: 'Long-term ownership',
    statement: 'No predefined holding period.',
    body: [
      'We hold across cycles, across decades, across generations. There is no fund clock and no forced exit — value compounds quietly when no one is forced to sell.',
      'Our partners measure outcomes the way the assets themselves do: patiently.',
    ],
    detail: 'No fund clock · No forced exit',
  },
  {
    numeral: 'III.',
    id: 'principle-iii',
    title: 'A hybrid strategy',
    statement: 'Public-market discipline, private-market patience.',
    body: [
      'We apply the rigor of an institution to assets held with the patience of a family — a hybrid public and private strategy.',
      'Public-market discipline sets the standard for underwriting, governance, and reporting; private ownership frees the assets from the quarter.',
    ],
    detail: 'Institutional rigor · Family patience',
  },
];
