import type { ReactNode } from 'react';

/**
 * Tracked uppercase label, optionally preceded by a gold hairline dash.
 */
export function Eyebrow({
  children,
  onDark = true,
  rule = true,
  className = '',
}: {
  children: ReactNode;
  onDark?: boolean;
  rule?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`type-eyebrow flex items-center gap-4 ${onDark ? 'text-gold-400' : 'text-gold-500'} ${className}`}
    >
      {rule && (
        <span
          aria-hidden="true"
          className="w-10 shrink-0 border-t border-[var(--hairline-gold)]"
        />
      )}
      <span className="whitespace-nowrap">{children}</span>
    </div>
  );
}
