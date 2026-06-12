import Image from 'next/image';
import type { CSSProperties } from 'react';

/**
 * Leadership grid unit: portrait (or quiet serif monogram placeholder), name, title.
 * Portraits get the brand's slight desaturation.
 */
export function LeaderCard({
  name,
  title,
  src,
  objectPosition = 'center',
  note,
  onDark = true,
  className = '',
  style,
}: {
  name: string;
  title: string;
  src?: string;
  /** Crop anchor for tall portraits — e.g. 'center top' keeps heads in frame. */
  objectPosition?: string;
  note?: string;
  onDark?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('');
  return (
    <div className={`flex flex-col gap-5 ${className}`} style={style}>
      <div
        className={`relative flex items-center justify-center overflow-hidden border-b border-[var(--hairline-gold-faint)] ${
          onDark ? 'bg-navy-800' : 'bg-stone-200'
        }`}
        style={{ aspectRatio: '3 / 3.6' }}
      >
        {src ? (
          <Image
            src={src}
            alt={name}
            fill
            sizes="(max-width: 900px) 100vw, 20vw"
            className="object-cover [filter:grayscale(0.2)]"
            style={{ objectPosition }}
          />
        ) : (
          <span
            aria-hidden="true"
            className={onDark ? 'text-navy-300' : 'text-stone-300'}
            style={{ font: '200 64px/1 var(--font-serif-display)' }}
          >
            {initials}
          </span>
        )}
      </div>
      <div>
        <div
          className={onDark ? 'text-stone-50' : 'text-navy-900'}
          style={{ font: '400 21px/1.3 var(--font-serif-display)' }}
        >
          {name}
        </div>
        <div
          className={`type-caption mt-1.5 uppercase tracking-[0.1em] ${
            onDark ? 'text-navy-300' : 'text-ink-600'
          }`}
        >
          {title}
        </div>
        {note && (
          <p className={`type-body-sm mt-2.5 ${onDark ? 'text-navy-100' : 'text-ink-600'}`}>
            {note}
          </p>
        )}
      </div>
    </div>
  );
}
