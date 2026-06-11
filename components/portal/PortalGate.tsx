'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';

// Field styling mirrors the contact form (components/home/PartnerCta.tsx):
// transparent, hairline bottom border, gold on focus.
const FIELD_CLS =
  'type-body w-full rounded-none border-0 border-b border-[var(--hairline-on-dark)] bg-transparent px-0 py-3 text-stone-50 placeholder:text-navy-300 focus:border-gold-400 focus:outline-none transition-[border-color] duration-[350ms] ease-reveal';

/**
 * The portal door. A quiet, believable sign-in form that never pretends to
 * authenticate: any submission is met with the same composed line directing
 * partners to their relationship contact. Same a11y pattern as PartnerCta's
 * success state — the form unmounts, so focus moves to the status line.
 */
export function PortalGate() {
  const [submitted, setSubmitted] = useState(false);
  const formId = useId();
  const statusRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (submitted) statusRef.current?.focus();
  }, [submitted]);

  return (
    <div className="flex w-full flex-col items-center gap-10">
      {submitted ? (
        <p
          ref={statusRef}
          tabIndex={-1}
          role="status"
          className="type-body max-w-[26em] text-balance text-navy-100 focus:outline-none"
        >
          Access is provisioned personally for partners of the firm. Your relationship contact
          can assist.
        </p>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
          className="flex w-full flex-col gap-7 text-left"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor={`${formId}-email`} className="type-eyebrow text-navy-300">
              Email
            </label>
            <input
              id={`${formId}-email`}
              name="email"
              type="email"
              required
              maxLength={320}
              autoComplete="email"
              className={FIELD_CLS}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor={`${formId}-passcode`} className="type-eyebrow text-navy-300">
              Passcode
            </label>
            <input
              id={`${formId}-passcode`}
              name="passcode"
              type="password"
              required
              maxLength={128}
              autoComplete="current-password"
              className={FIELD_CLS}
            />
          </div>
          <Button variant="solid" type="submit" className="mt-2 w-full">
            Sign In
          </Button>
        </form>
      )}
      <p className="type-caption max-w-[34em] text-balance text-navy-300">
        Portal access is provisioned for partners. For assistance, write to{' '}
        <a
          href="mailto:ir@masalphasecurities.com"
          className="text-gold-300 transition-colors duration-[350ms] ease-reveal hover:text-gold-400"
        >
          ir@masalphasecurities.com
        </a>
        .
      </p>
    </div>
  );
}
