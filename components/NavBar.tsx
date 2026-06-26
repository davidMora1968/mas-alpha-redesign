'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { EASE_REVEAL } from '@/components/ui/Reveal';

const LINKS = [
  { label: 'Approach', href: '/approach' },
  { label: 'Verticals', href: '/verticals' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Partners Club', href: '/partners-club' },
  { label: 'Team', href: '/team' },
  { label: 'Press', href: '/press' },
];

/**
 * Sticky site navigation. Transparent over hero; solid navy after 80px scroll.
 * Below 900px the links row gives way to a text-only "Menu" trigger that opens
 * a full-screen typographic overlay.
 */
export function NavBar() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setSolid(window.scrollY > 80);
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Safety net: close the overlay whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // While open: trap focus inside the dialog (background goes inert), lock body
  // scroll, Escape closes, and focus returns to the trigger on close.
  useEffect(() => {
    if (!open) return;

    // Remember what opened the menu so we can restore focus on close.
    const trigger = document.activeElement as HTMLElement | null;

    // Take everything behind the overlay out of the tab order + a11y tree.
    const backdrop = Array.from(
      document.querySelectorAll('nav[aria-label="Primary"], main, footer'),
    ) as HTMLElement[];
    backdrop.forEach((el) => {
      el.setAttribute('inert', '');
      el.setAttribute('aria-hidden', 'true');
    });

    // Move focus into the dialog so keyboard/SR users start inside it.
    closeButtonRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      backdrop.forEach((el) => {
        el.removeAttribute('inert');
        el.removeAttribute('aria-hidden');
      });
      trigger?.focus();
    };
  }, [open]);

  /** Staggered fade/rise for overlay items; static under reduced motion. */
  const rise = (index: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, ease: EASE_REVEAL, delay: 0.15 + index * 0.06 },
        };

  return (
    <>
      <nav
        aria-label="Primary"
        className={`gutter fixed inset-x-0 top-0 z-50 flex items-center gap-12 transition-[background-color,height,box-shadow] duration-[350ms] ease-reveal ${
          solid
            ? 'h-[72px] bg-[rgba(10,27,51,0.92)] backdrop-blur-[12px] shadow-[var(--shadow-nav)]'
            : 'h-[92px] bg-transparent'
        }`}
      >
        <Link
          href="/"
          aria-label="Mas Alpha Securities — home"
          className="nav-brand-in block shrink-0"
        >
          <Image
            src="/assets/logos/mas-wordmark-cream.png"
            alt="Mas Alpha Securities"
            width={264}
            height={44}
            priority
            className="h-14 w-auto [filter:drop-shadow(0_1px_10px_rgba(6,15,29,0.45))]"
          />
        </Link>
        <div className="ml-auto flex items-center gap-9 max-[900px]:hidden">
          {LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`type-nav whitespace-nowrap no-underline transition-colors duration-[350ms] ease-reveal hover:text-gold-300 ${
                pathname === href ? 'text-gold-300' : 'text-navy-100'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="type-nav ml-auto hidden min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center border-0 bg-transparent uppercase text-navy-100 transition-colors duration-[350ms] ease-reveal hover:text-gold-300 max-[900px]:inline-flex"
        >
          Menu
        </button>
        <Button href="/portal" className="px-[22px] py-[11px] max-[900px]:hidden">
          Investor Portal
        </Button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={reduced ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? { opacity: 1, transition: { duration: 0 } } : { opacity: 0 }}
            transition={reduced ? { duration: 0 } : { duration: 0.5, ease: EASE_REVEAL }}
            className="gutter fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-navy-950"
          >
            <div className="flex h-[92px] shrink-0 items-center justify-between">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                aria-label="Mas Alpha Securities — home"
                className="block shrink-0"
              >
                <Image
                  src="/assets/logos/mas-wordmark-cream.png"
                  alt="Mas Alpha Securities"
                  width={264}
                  height={44}
                  className="h-14 w-auto"
                />
              </Link>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setOpen(false)}
                className="type-nav -m-2 inline-flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center border-0 bg-transparent p-2 uppercase text-stone-50 transition-colors duration-[350ms] ease-reveal hover:text-gold-300"
              >
                Close
              </button>
            </div>

            <div className="mt-[6vh] flex flex-col items-start gap-7">
              {LINKS.map(({ label, href }, i) => (
                <motion.div key={href} {...rise(i)}>
                  <Link
                    href={href}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline gap-4 no-underline"
                  >
                    <span aria-hidden="true" className="type-eyebrow text-gold-400">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`type-display-md transition-colors duration-[350ms] ease-reveal group-hover:text-gold-300 ${
                        pathname === href ? 'text-gold-300' : 'text-stone-50'
                      }`}
                    >
                      {label}
                    </span>
                  </Link>
                </motion.div>
              ))}
              <motion.div
                {...rise(LINKS.length)}
                className="mt-5"
                onClick={() => setOpen(false)}
              >
                <Button href="/portal" className="px-[22px] py-[11px]">
                  Investor Portal
                </Button>
              </motion.div>
            </div>

            <div className="mt-auto shrink-0 border-t border-[var(--hairline-on-dark)] pt-5 pb-8">
              <p className="type-caption text-navy-300">Coral Gables, Miami, Florida</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
