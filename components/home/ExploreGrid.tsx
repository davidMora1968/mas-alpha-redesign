import Image from 'next/image';
import Link from 'next/link';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';

type Tile = {
  href: string;
  span: string;
  height: string;
  src: string;
  objectPosition: string;
  sizes: string;
  num: string;
  title: string;
  line: string;
};

const TILES: Tile[] = [
  {
    href: '/approach',
    span: 'col-span-7',
    height: 'h-[360px]',
    src: '/assets/imagery/meadowlark-snowmobile.avif',
    objectPosition: 'center 68%',
    sizes: '(max-width: 900px) 100vw, 60vw',
    num: '01',
    title: 'Approach',
    line: 'Why permanence outlasts performance.',
  },
  {
    href: '/verticals',
    span: 'col-span-5',
    height: 'h-[360px]',
    src: '/assets/imagery/meadowlark-snowboard.avif',
    objectPosition: 'center 30%',
    sizes: '(max-width: 900px) 100vw, 40vw',
    num: '02',
    title: 'Verticals',
    line: 'Three arenas. One discipline.',
  },
  {
    href: '/portfolio',
    span: 'col-span-12',
    height: 'h-[440px]',
    src: '/assets/imagery/wyoming-range.avif',
    objectPosition: 'center 55%',
    sizes: '100vw',
    num: '03',
    title: 'Portfolio',
    line: 'The assets that cannot be built again.',
  },
  {
    href: '/partners-club',
    span: 'col-span-7',
    height: 'h-[360px]',
    src: '/assets/imagery/club-humidor.jpg',
    objectPosition: 'center 62%',
    sizes: '(max-width: 900px) 100vw, 60vw',
    num: '04',
    title: 'Partners Club',
    line: 'An invitation, not a transaction.',
  },
  {
    href: '/team',
    span: 'col-span-5',
    height: 'h-[360px]',
    src: '/assets/imagery/team-investor-night.jpg',
    objectPosition: 'center 22%',
    sizes: '(max-width: 900px) 100vw, 40vw',
    num: '05',
    title: 'Team',
    line: 'The next generation of a building legacy.',
  },
];

export function ExploreGrid() {
  return (
    <section id="explore" aria-label="Explore the firm" className="gutter bg-navy-950 py-36 max-[640px]:py-20">
      <div className="content">
        <Reveal>
          <Eyebrow>Explore the Firm</Eyebrow>
        </Reveal>
        <Reveal delay={150}>
          <div className="mt-16 grid grid-cols-12 gap-6">
            {TILES.map((tile) => (
              <Link
                key={tile.href}
                href={tile.href}
                className={`group relative block overflow-hidden bg-navy-800 border border-[var(--hairline-gold-faint)] hover:border-[var(--hairline-gold)] transition-[border-color] duration-[350ms] ease-reveal ${tile.span} ${tile.height} max-[900px]:col-span-12 max-[640px]:h-[300px]`}
              >
                <div className="absolute inset-0 transform-gpu scale-100 transition-transform duration-[1600ms] ease-reveal group-hover:scale-[1.03] motion-reduce:transition-none">
                  <Image
                    src={tile.src}
                    alt=""
                    fill
                    className="object-cover"
                    style={{ objectPosition: tile.objectPosition }}
                    sizes={tile.sizes}
                  />
                </div>
                <div aria-hidden="true" className="absolute inset-0" style={{ background: 'var(--scrim-panel)' }} />
                <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2.5 px-8 py-7">
                  <span className="type-eyebrow text-gold-400">{tile.num}</span>
                  <span className="type-display-md flex items-baseline gap-3.5 text-stone-50">
                    {tile.title}{' '}
                    <span
                      aria-hidden="true"
                      className="inline-block text-gold-400 translate-x-0 transition-transform duration-[350ms] ease-reveal group-hover:translate-x-1.5 motion-reduce:transition-none"
                      style={{ font: '300 0.7em/1 var(--font-serif-display)' }}
                    >
                      {'→'}
                    </span>
                  </span>
                  <span className="type-body-sm text-navy-100">{tile.line}</span>
                </div>
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
