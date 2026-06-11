'use client';

import { useEffect, useState } from 'react';

/**
 * The edition date, rendered at view time so the brief always reads current
 * (static prerender would freeze the build date). Until mount it shows the
 * edition label alone — no hydration mismatch.
 */
export function BriefDate() {
  const [date, setDate] = useState('');
  useEffect(() => {
    setDate(
      new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'America/New_York',
      }),
    );
  }, []);
  return (
    <span className="type-eyebrow text-gold-400">
      Edition No. 1{date ? <span> · {date}</span> : null}
    </span>
  );
}
