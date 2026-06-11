import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

const FACTS: ReadonlyArray<readonly [string, string]> = [
  ['NYSE: MTZ', 'The family company'],
  ['Fortune 500', 'American infrastructure'],
  ['2023', 'Mas Alpha founded · Coral Gables'],
];

/**
 * The MasTec lineage — light stone band: 5/7 split of heading vs.
 * two paragraphs and a hairline facts ledger. Mirrors TeamLineage
 * in the prototype (team-sections.jsx).
 */
export function Lineage() {
  return (
    <section className="gutter bg-stone-100 py-36 max-[640px]:py-20">
      <div className="content grid grid-cols-[5fr_7fr] items-start gap-24 max-[900px]:grid-cols-1 max-[900px]:gap-16">
        <Reveal>
          <SectionHeading
            eyebrow="The MasTec Lineage"
            title={<>Infrastructure is the family{'\u00A0'}trade.</>}
            onDark={false}
            maxWidth="10em"
          />
        </Reveal>
        <Reveal delay={180}>
          <div>
            <p className="type-body max-w-[34em] text-ink-900">
              For two generations, the Mas family has built the systems the United States runs on
              — the towers, lines, and roads behind MasTec, the Fortune-500 company that carries
              the family name.
            </p>
            <p className="type-body mt-5 max-w-[34em] text-ink-600">
              Mas Alpha Securities is the next generation&apos;s continuation of that work: the
              same discipline, applied not to building infrastructure, but to owning what cannot
              be built again.
            </p>
            <div className="mt-10 border-t border-[var(--hairline-gold)]">
              {FACTS.map(([fact, label]) => (
                <div
                  key={fact}
                  className="grid grid-cols-[150px_1fr] items-baseline gap-5 border-b border-[var(--hairline-navy)] py-3.5 max-[640px]:grid-cols-[110px_1fr]"
                >
                  <span
                    className="text-navy-900"
                    style={{ font: '300 19px/1.2 var(--font-serif-display)' }}
                  >
                    {fact}
                  </span>
                  <span className="type-eyebrow text-ink-600">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
