import Image from 'next/image';

/**
 * Disclosure footer. Every page closes with the quiet compliance line:
 * informational only; not an offer; accredited investors only.
 */
export function Footer() {
  return (
    <footer className="gutter border-t border-[var(--hairline-gold-faint)] bg-navy-950 py-16">
      <div className="content flex flex-col gap-7">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <Image
            src="/assets/logos/mas-wordmark-cream.png"
            alt="Mas Alpha Securities"
            width={96}
            height={16}
            className="h-4 w-auto opacity-85"
          />
          <div className="type-caption text-navy-300">
            Coral Gables, Miami, Florida · Founded 2023
          </div>
        </div>
        <p className="type-caption max-w-[88em] text-navy-300 opacity-80">
          This material is provided for informational purposes only and does not constitute an
          offer to sell, or a solicitation of an offer to buy, any security. Any such offer will be
          made only to accredited investors by means of definitive offering documents. Past
          activity of affiliated persons or entities is not indicative of future results. © 2026
          Mas Alpha Securities.
        </p>
      </div>
    </footer>
  );
}
