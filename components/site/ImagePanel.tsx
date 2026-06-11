import Image from 'next/image';
import type { CSSProperties, ReactNode } from 'react';
import { Eyebrow } from '@/components/ui/Eyebrow';

/**
 * Full-bleed reverent image panel with scrim and bottom-anchored editorial text.
 * The brand's vertical/portfolio unit. Hover = slow 1.03 zoom (CSS only).
 */
export function ImagePanel({
  src,
  alt = '',
  objectPosition = 'center',
  eyebrow,
  index,
  title,
  body,
  height = '64vh',
  minHeight = '440px',
  align = 'left',
  sizes = '100vw',
  priority = false,
  children,
  className = '',
  style,
}: {
  src: string;
  alt?: string;
  objectPosition?: string;
  eyebrow?: ReactNode;
  index?: string;
  title?: ReactNode;
  body?: ReactNode;
  height?: string;
  minHeight?: string;
  align?: 'left' | 'right';
  sizes?: string;
  priority?: boolean;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const right = align === 'right';
  return (
    <section
      className={`group relative overflow-hidden bg-navy-950 ${className}`}
      style={{ height, minHeight, ...style }}
    >
      <div className="absolute inset-0 transform-gpu transition-transform duration-[1600ms] ease-reveal group-hover:scale-[1.03] motion-reduce:transition-none">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
          style={{ objectPosition }}
        />
      </div>
      <div aria-hidden="true" className="absolute inset-0" style={{ background: 'var(--scrim-panel)' }} />
      <div
        className={`gutter absolute inset-x-0 bottom-0 flex flex-col gap-[18px] py-16 ${
          right ? 'items-end text-right' : 'items-start text-left'
        }`}
      >
        {(eyebrow || index) && (
          <Eyebrow rule={!right}>
            {index && <span className={eyebrow ? 'mr-3.5' : ''}>{index}</span>}
            {eyebrow}
          </Eyebrow>
        )}
        {title && (
          <h3 className="type-display-md m-0 max-w-[14em] text-balance text-stone-50">{title}</h3>
        )}
        {body && <p className="type-body m-0 max-w-[34em] text-navy-100">{body}</p>}
        {children}
      </div>
    </section>
  );
}
