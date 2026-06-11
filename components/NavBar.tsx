'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/Button';

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
 */
export function NavBar() {
  const [solid, setSolid] = useState(false);
  const pathname = usePathname();

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

  return (
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
          className="h-11 w-auto [filter:drop-shadow(0_1px_10px_rgba(6,15,29,0.45))]"
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
      <Button className="px-[22px] py-[11px]">Investor Portal</Button>
    </nav>
  );
}
