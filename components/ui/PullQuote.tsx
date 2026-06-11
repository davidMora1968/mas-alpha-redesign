import type { CSSProperties, ReactNode } from 'react';

/**
 * Magazine-style pull quote: italic Spectral with a gold hairline and attribution.
 */
export function PullQuote({
  quote,
  attribution,
  onDark = false,
  className = '',
  style,
}: {
  quote: ReactNode;
  attribution?: ReactNode;
  onDark?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <figure
      className={`m-0 grid grid-cols-[56px_1fr] items-start gap-7 ${className}`}
      style={style}
    >
      <span aria-hidden="true" className="mt-[0.8em] border-t border-[var(--hairline-gold)]" />
      <div>
        <blockquote
          className={`type-quote m-0 text-balance ${onDark ? 'text-stone-50' : 'text-navy-900'}`}
        >
          “{quote}”
        </blockquote>
        {attribution && (
          <figcaption
            className={`type-eyebrow mt-5 ${onDark ? 'text-gold-400' : 'text-gold-500'}`}
          >
            {attribution}
          </figcaption>
        )}
      </div>
    </figure>
  );
}
