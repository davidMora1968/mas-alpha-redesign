'use client';

import { useEffect, useId, useState } from 'react';

// Field styling mirrors the contact form / portal door.
const FIELD_CLS =
  'type-body w-full rounded-none border-0 border-b border-[var(--hairline-on-dark)] bg-transparent px-0 py-3 text-stone-50 placeholder:text-navy-300 focus:border-gold-400 focus:outline-none transition-[border-color] duration-[350ms] ease-reveal';

const DEFAULT_FROM = 'Moises Jattin · Head of Partner Relations';

/**
 * Partner-relations tool: compose a personal invitation link. Type a
 * prospect's name, get a ready-to-send link to /invite addressed to them
 * and extended by the steward. The link is built from the live origin, so
 * it works on the preview today and on the real domain after cutover.
 */
export function InviteGenerator() {
  const [name, setName] = useState('');
  const [from, setFrom] = useState(DEFAULT_FROM);
  const [origin, setOrigin] = useState('');
  const [copied, setCopied] = useState(false);
  const formId = useId();

  useEffect(() => setOrigin(window.location.origin), []);

  const params = new URLSearchParams();
  const trimmedName = name.trim();
  const trimmedFrom = from.trim();
  if (trimmedName) params.set('for', trimmedName);
  if (trimmedFrom && trimmedFrom !== DEFAULT_FROM) params.set('from', trimmedFrom);
  const path = `/invite${params.toString() ? `?${params.toString()}` : ''}`;
  const fullUrl = origin ? origin + path : path;
  const ready = trimmedName.length > 0;

  async function copy() {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // clipboard blocked — the field is selectable as a fallback
    }
  }

  return (
    <div className="flex w-full flex-col gap-9">
      <div className="flex flex-col gap-7 text-left">
        <div className="flex flex-col gap-2">
          <label htmlFor={`${formId}-name`} className="type-eyebrow text-navy-300">
            Prospect&rsquo;s name
          </label>
          <input
            id={`${formId}-name`}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Robert Delgado"
            maxLength={60}
            autoComplete="off"
            autoFocus
            className={FIELD_CLS}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor={`${formId}-from`} className="type-eyebrow text-navy-300">
            Extended by
          </label>
          <input
            id={`${formId}-from`}
            type="text"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            maxLength={80}
            autoComplete="off"
            className={FIELD_CLS}
          />
        </div>
      </div>

      {/* The generated link */}
      <div className="flex flex-col gap-4 border-t border-[var(--hairline-gold-faint)] pt-8">
        <span className="type-eyebrow text-gold-400">The link to send</span>
        <p
          className="break-all text-navy-100"
          style={{ font: '400 13px/1.6 var(--font-mono, ui-monospace, Menlo, monospace)' }}
        >
          {ready ? fullUrl : 'Enter a name to compose the invitation…'}
        </p>
        <div className="mt-2 flex items-center gap-6">
          <button
            type="button"
            onClick={copy}
            disabled={!ready}
            className="type-button inline-flex cursor-pointer items-center justify-center rounded-none border border-transparent bg-gold-400 px-7 py-3.5 text-navy-950 transition-[background-color] duration-[350ms] ease-reveal hover:bg-gold-300 disabled:cursor-default disabled:opacity-40"
          >
            {copied ? 'Copied' : 'Copy Link'}
          </button>
          {ready && (
            <a
              href={path}
              target="_blank"
              rel="noopener noreferrer"
              className="type-button border-b border-[var(--hairline-gold)] px-0.5 py-1 text-stone-50 no-underline transition-colors duration-[350ms] ease-reveal hover:text-gold-400"
            >
              Preview {'→'}
            </a>
          )}
        </div>
      </div>

      <p className="type-caption max-w-[34em] text-navy-300">
        Share the link by text or email. It opens an invitation addressed to your prospect by
        name — quiet, personal, and carrying the firm.
      </p>
    </div>
  );
}
