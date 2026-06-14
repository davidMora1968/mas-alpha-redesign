import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { ImagePanel } from '@/components/site/ImagePanel';

const FACTS: [string, string][] = [
  ['Setting', 'Bighorn National Forest, Wyoming'],
  ['Season', 'Ski in winter · lake in summer'],
  ['Vertical', 'Experiential Hospitality'],
];

/**
 * "Land first. Lodge second." — light stone band: editorial split
 * (heading + quiet facts ledger / lede + body), then the full-width
 * winter photograph. Mirrors PortfolioStory in portfolio-sections.jsx.
 */
export function PortfolioStory() {
  return (
    <section aria-label="Land-led hospitality" className="gutter bg-stone-100 py-36 max-[640px]:py-20">
      <div className="content">
        <div className="grid grid-cols-[5fr_7fr] items-start gap-24 max-[900px]:grid-cols-1 max-[900px]:gap-16">
          <Reveal>
            <div>
              <Eyebrow onDark={false}>Land-led Hospitality</Eyebrow>
              <h2 className="type-display-lg mt-7 max-w-[9em] text-navy-900">
                Land first. Lodge{'\u00A0'}second.
              </h2>
              <div className="mt-16 border-t border-[var(--hairline-gold)]">
                {FACTS.map(([k, v]) => (
                  <div
                    key={k}
                    className="grid grid-cols-[110px_1fr] gap-5 border-b border-[var(--hairline-navy)] py-4"
                  >
                    <span className="type-eyebrow text-gold-600">{k}</span>
                    <span className="type-body-sm text-ink-600">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={180}>
            <div className="pt-[6px]">
              <p className="type-lede max-w-[30em] text-ink-900">
                In the Bighorn National Forest of Wyoming, MAS Tierra begins with land — thousands of acres of
                wilderness held first for what it is, not for what it can be made into.
              </p>
              <p className="type-body mt-7 max-w-[34em] text-ink-600">
                The Meadowlark Ski & Lake Lodge rises from that land: ski in winter, lake in summer, a lodge in
                the oldest sense of the word. Hospitality here is led by terrain. The mountain cannot be moved,
                licensed, or copied — which is precisely why we own it.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
      <Reveal className="mt-24 max-[640px]:mt-16">
        <ImagePanel
          src="/assets/imagery/meadowlark-snowboard.avif"
          alt="A snowboarder carving through deep powder at Meadowlark"
          eyebrow="Winter at Meadowlark"
          height="74vh"
          objectPosition="center 30%"
          sizes="100vw"
        />
      </Reveal>
    </section>
  );
}
