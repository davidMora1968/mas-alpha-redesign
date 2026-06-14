'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { EASE_REVEAL } from '@/components/ui/Reveal';

type Status = 'idle' | 'open' | 'submitting' | 'success' | 'error';

const FIELD_CLS =
  'type-body w-full rounded-none border-0 border-b border-[var(--hairline-on-dark)] bg-transparent px-0 py-3 text-stone-50 placeholder:text-navy-300 focus:border-gold-400 focus:outline-none transition-[border-color] duration-[350ms] ease-reveal';

/**
 * The closing "Become a Partner" action: a quiet inline inquiry form that
 * unfolds beneath the CTA row and POSTs to /api/contact. An invitation,
 * not a transaction — no modal, no urgency.
 */
export function PartnerCta() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const reduced = useReducedMotion();
  const formId = useId();
  const successRef = useRef<HTMLParagraphElement>(null);

  // Move keyboard focus to the confirmation so screen readers announce it —
  // the form (and the previously focused submit button) unmounts on success.
  useEffect(() => {
    if (status === 'success') successRef.current?.focus();
  }, [status]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'submitting') return;
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus('submitting');
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          message: data.get('message'),
          company: data.get('company'), // honeypot
        }),
      });
      const json: { ok?: boolean; error?: string } = await res.json();
      if (!res.ok || !json.ok) {
        setError(json.error ?? 'We could not record your inquiry. Please email ir@masalphasecurities.com.');
        setStatus('error');
        return;
      }
      setStatus('success');
    } catch {
      setError('We could not record your inquiry. Please email ir@masalphasecurities.com.');
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <p
        ref={successRef}
        tabIndex={-1}
        className="type-lede max-w-[28em] text-balance text-navy-100 focus:outline-none"
        role="status"
      >
        Received. We will be in{' '}touch.
      </p>
    );
  }

  const open = status !== 'idle';

  return (
    <div className="flex w-full flex-col items-center gap-9">
      <div className="flex flex-wrap justify-center gap-5">
        <Button
          variant="solid"
          size="lg"
          type="button"
          aria-expanded={open}
          aria-controls={open ? formId : undefined}
          onClick={() => {
            if (status === 'submitting') return; // never collapse a form mid-flight
            setStatus(open ? 'idle' : 'open');
          }}
        >
          Become a Partner
        </Button>
        <Button size="lg" href="/portal">
          Investor Portal
        </Button>
      </div>

      {open && (
        <motion.div
          id={formId}
          className="w-full max-w-[440px] overflow-hidden"
          initial={reduced ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_REVEAL }}
        >
          <form onSubmit={onSubmit} className="flex flex-col gap-7 text-left" noValidate>
            <div className="flex flex-col gap-2">
              <label htmlFor={`${formId}-name`} className="type-eyebrow text-navy-300">
                Name
              </label>
              <input
                id={`${formId}-name`}
                name="name"
                type="text"
                required
                maxLength={200}
                autoComplete="name"
                className={FIELD_CLS}
              />
            </div>
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
              <label htmlFor={`${formId}-message`} className="type-eyebrow text-navy-300">
                A line about you <span className="normal-case tracking-normal">— optional</span>
              </label>
              <textarea
                id={`${formId}-message`}
                name="message"
                rows={3}
                maxLength={2000}
                className={`${FIELD_CLS} resize-none`}
              />
            </div>
            {/* Honeypot — hidden from humans, tempting to bots */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label htmlFor={`${formId}-company`}>Company</label>
              <input
                id={`${formId}-company`}
                name="company"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
            {status === 'error' && (
              <p className="type-body-sm text-gold-300" role="alert">
                {error}
              </p>
            )}
            <div className="flex items-baseline justify-between gap-6">
              {/* aria-disabled (not disabled) so keyboard focus survives the
                  submitting state; onSubmit guards against double-fire */}
              <Button variant="solid" type="submit" aria-disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Sending' : 'Submit Inquiry'}
              </Button>
              <span className="type-caption text-navy-300">For accredited investors.</span>
            </div>
          </form>
        </motion.div>
      )}
    </div>
  );
}
