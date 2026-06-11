import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

const PILLARS: [string, string][] = [
  [
    'One point of contact',
    'A dedicated concierge desk for every partner — one call, any request, across the portfolio.',
  ],
  [
    'Access across the portfolio',
    'First nights at the lodge, first seats at the stages. The assets are yours to experience, not merely to hold.',
  ],
  [
    'A seat at the table',
    'Briefings before announcements. The first call is always to partners.',
  ],
];

/**
 * The Partner Experience — light stone band with three quiet pillars under
 * gold hairlines. Mirrors ClubExperience in the design prototype.
 */
export function ClubExperience() {
  return (
    <section aria-label="The Partner Experience" className="gutter bg-stone-100 py-36 max-[640px]:py-20">
      <div className="content">
        <Reveal>
          <SectionHeading
            onDark={false}
            eyebrow="The Partner Experience"
            title="A partner is never a customer."
            maxWidth="13em"
          />
        </Reveal>
        <Reveal delay={180}>
          <div className="mt-24 grid grid-cols-3 gap-10 max-[900px]:grid-cols-1 max-[640px]:mt-16">
            {PILLARS.map(([title, body]) => (
              <div key={title} className="border-t border-[var(--hairline-gold)] pt-[26px]">
                <h3
                  className="text-navy-900"
                  style={{ font: '400 20px/1.35 var(--font-serif-display)' }}
                >
                  {title}
                </h3>
                <p className="type-body-sm mt-3.5 max-w-[30em] text-ink-600">{body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
