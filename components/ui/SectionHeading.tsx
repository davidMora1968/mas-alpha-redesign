import type { CSSProperties, ReactNode } from 'react';
import { Eyebrow } from '@/components/ui/Eyebrow';

/**
 * Section opener: eyebrow + large Spectral statement + optional lede.
 */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  onDark = true,
  size = 'lg',
  as: Heading = 'h2',
  maxWidth = '18em',
  className = '',
  style,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  lede?: ReactNode;
  onDark?: boolean;
  size?: 'xl' | 'lg' | 'md';
  as?: 'h1' | 'h2' | 'h3';
  maxWidth?: string;
  className?: string;
  style?: CSSProperties;
}) {
  const titleClass =
    size === 'xl' ? 'type-display-xl' : size === 'md' ? 'type-display-md' : 'type-display-lg';
  return (
    <header className={`flex flex-col gap-7 ${className}`} style={style}>
      {eyebrow && <Eyebrow onDark={onDark}>{eyebrow}</Eyebrow>}
      <Heading
        className={`${titleClass} text-balance ${onDark ? 'text-stone-50' : 'text-navy-900'}`}
        style={{ maxWidth }}
      >
        {title}
      </Heading>
      {lede && (
        <p className={`type-lede max-w-[34em] text-pretty ${onDark ? 'text-navy-100' : 'text-ink-600'}`}>
          {lede}
        </p>
      )}
    </header>
  );
}
