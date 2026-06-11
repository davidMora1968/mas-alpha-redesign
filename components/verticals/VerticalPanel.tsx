import type { ReactNode } from 'react';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';

/**
 * Full-bleed cinematic panel: media behind a navy scrim, copy anchored
 * bottom-left. Mirrors VerticalPanel in the prototype (verticals-sections.jsx) —
 * intentionally distinct from the shared ImagePanel (taller stage, display-lg
 * statement, staggered reveals, arbitrary media slot).
 */
export function VerticalPanel({
  id,
  num,
  name,
  statement,
  body,
  media,
  link,
  linkHref,
}: {
  id: string;
  num: string;
  name: string;
  statement: ReactNode;
  body: ReactNode;
  media: ReactNode;
  link?: string;
  linkHref?: string;
}) {
  return (
    <section
      id={id}
      aria-label={name}
      className="relative h-[88vh] min-h-[560px] overflow-hidden bg-navy-900"
    >
      <div className="absolute inset-0">{media}</div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: 'var(--scrim-panel)' }}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0">
        <div className="content gutter flex flex-col items-start gap-[26px] pb-16">
          <Reveal>
            <div className="flex items-baseline gap-5">
              <span
                className="text-gold-400"
                style={{ font: '200 30px/1 var(--font-serif-display)' }}
              >
                {num}
              </span>
              <span className="type-eyebrow whitespace-nowrap text-gold-400">{name}</span>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <h2 className="type-display-lg max-w-[13em] text-balance text-stone-50">
              {statement}
            </h2>
          </Reveal>
          <Reveal delay={280}>
            <p className="type-body max-w-[34em] text-navy-100">{body}</p>
          </Reveal>
          {link && linkHref ? (
            <Reveal delay={380} className="pointer-events-auto">
              <Button variant="text" href={linkHref}>
                {link}
              </Button>
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}
