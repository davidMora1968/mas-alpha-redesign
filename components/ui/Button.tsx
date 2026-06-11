import Link from 'next/link';
import type { CSSProperties, MouseEventHandler, ReactNode } from 'react';

/**
 * Mas Alpha button. Square corners, tracked caps, hairline gold.
 * variants: "outline" (default), "solid", "text"
 */
export function Button({
  variant = 'outline',
  onDark = true,
  size = 'md',
  href,
  type = 'button',
  className = '',
  style,
  children,
  onClick,
  disabled,
  'aria-expanded': ariaExpanded,
  'aria-controls': ariaControls,
  'aria-disabled': ariaDisabled,
}: {
  variant?: 'outline' | 'solid' | 'text';
  onDark?: boolean;
  size?: 'md' | 'lg';
  href?: string;
  type?: 'button' | 'submit';
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  'aria-expanded'?: boolean;
  'aria-controls'?: string;
  'aria-disabled'?: boolean;
}) {
  const ink = onDark ? 'text-stone-50' : 'text-navy-900';
  const pad = size === 'lg' ? 'px-9 py-[18px]' : 'px-7 py-3.5';

  const variants = {
    // bg lives on the variant, never the base — stacking bg-transparent with
    // bg-gold-400 lets stylesheet order (not class order) pick the winner.
    outline: `${ink} ${pad} bg-transparent border border-[var(--hairline-gold)] hover:border-gold-400 hover:bg-gold-400 hover:text-navy-950`,
    solid: `text-navy-950 ${pad} bg-gold-400 border border-transparent hover:bg-gold-300`,
    text: `${ink} px-0.5 py-1 bg-transparent border-b border-[var(--hairline-gold)] hover:text-gold-400`,
  } as const;

  const cls = [
    'type-button inline-flex items-center justify-center gap-2.5 cursor-pointer whitespace-nowrap no-underline rounded-none',
    'transition-[background-color,color,border-color] duration-[350ms] ease-reveal',
    variants[variant],
    className,
  ].join(' ');

  if (href) {
    const external = href.startsWith('http') || href.startsWith('mailto:');
    if (external || href.startsWith('#')) {
      return (
        <a href={href} className={cls} style={style}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls} style={style}>
        {children}
      </Link>
    );
  }
  return (
    <button
      type={type}
      className={`${cls} disabled:cursor-default disabled:opacity-70 aria-disabled:cursor-default aria-disabled:opacity-70`}
      style={style}
      onClick={onClick}
      disabled={disabled}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
      aria-disabled={ariaDisabled}
    >
      {children}
    </button>
  );
}
