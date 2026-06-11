import type { Metadata } from 'next';
import Image from 'next/image';
import { OceanMedia } from '@/components/verticals/OceanMedia';
import { VerticalPanel } from '@/components/verticals/VerticalPanel';
import { VerticalsClosing } from '@/components/verticals/VerticalsClosing';
import { VerticalsHero } from '@/components/verticals/VerticalsHero';

const description =
  'Three ways to own the irreplaceable — essential infrastructure, experiential hospitality, and media & entertainment.';

export const metadata: Metadata = {
  title: 'Verticals',
  description,
  alternates: { canonical: '/verticals' },
  openGraph: {
    title: 'Verticals',
    description,
    images: ['/assets/imagery/meadowlark-snowboard.avif'],
  },
};

export default function VerticalsPage() {
  return (
    <main>
      <VerticalsHero />
      <VerticalPanel
        id="essential-infrastructure"
        num="01"
        name="Essential Infrastructure"
        statement="The systems a country cannot run without."
        body="Energy, water, transport — essential positions protected by regulation, geography, and necessity."
        media={<OceanMedia />}
      />
      <VerticalPanel
        id="experiential-hospitality"
        num="02"
        name="Experiential Hospitality"
        statement="Places people return to for generations."
        body="Land-led hospitality anchored by terrain that cannot be copied — beginning with MAS Tierra in the Bighorn National Forest of Wyoming."
        media={
          <Image
            src="/assets/imagery/meadowlark-snowboard.avif"
            alt="A snowboarder carving down a powder slope at Meadowlark Ski & Lake Lodge"
            fill
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: 'center 38%' }}
          />
        }
        link="The flagship: Meadowlark Ski & Lake Lodge →"
        linkHref="/portfolio"
      />
      <VerticalPanel
        id="media-entertainment"
        num="03"
        name="Media & Entertainment"
        statement="The rights and stages culture returns to."
        body="Enduring venues, catalogues, and rights — cultural assets whose audiences outlive any cycle."
        media={
          <Image
            src="/assets/imagery/meadowlark-horses.avif"
            alt="Horses grazing in an open mountain meadow"
            fill
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: 'center 55%' }}
          />
        }
      />
      <VerticalsClosing />
    </main>
  );
}
