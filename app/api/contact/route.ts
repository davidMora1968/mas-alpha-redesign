import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

/**
 * "Become a Partner" inquiries: validate → insert into Supabase `leads`
 * → notify via Resend. Both sinks are env-gated and independent; the
 * request succeeds if at least one of the configured sinks succeeds.
 * See supabase/leads.sql for the table, .env.example for the vars.
 */

const MAX_NAME = 200;
const MAX_EMAIL = 320;
const MAX_MESSAGE = 2000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const CONTROL_CHARS = new RegExp('[\\u0000-\\u001F\\u007F]', 'g');

type Payload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  company?: unknown; // honeypot — humans never see this field
};

function clean(value: unknown, max: number): string {
  if (typeof value !== 'string') return '';
  // Strip ASCII control chars (incl. CR/LF — header-injection guard for the
  // email subject) but leave the text otherwise untouched.
  return value.replace(CONTROL_CHARS, ' ').trim().slice(0, max);
}

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  // Honeypot: pretend success, store nothing.
  if (typeof body.company === 'string' && body.company.trim() !== '') {
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name, MAX_NAME);
  const email = clean(body.email, MAX_EMAIL);
  const message = clean(body.message, MAX_MESSAGE);

  if (!name || !email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: 'Please provide your name and a valid email address.' },
      { status: 400 },
    );
  }

  const results: { sink: string; ok: boolean }[] = [];

  // — Supabase: insert into leads —
  // Accept either name: NEXT_PUBLIC_SUPABASE_URL (this repo's .env.example)
  // or SUPABASE_URL (the conventional server-side name, used on Vercel).
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (supabaseUrl && supabaseKey) {
    try {
      const supabase = createClient(supabaseUrl, supabaseKey, {
        auth: { persistSession: false },
      });
      const { error } = await supabase.from('leads').insert({
        name,
        email,
        message: message || null,
        source: 'website',
        user_agent: req.headers.get('user-agent')?.slice(0, 500) ?? null,
      });
      if (error) throw error;
      results.push({ sink: 'supabase', ok: true });
    } catch (err) {
      console.error('[contact] supabase insert failed:', err);
      results.push({ sink: 'supabase', ok: false });
    }
  }

  // — Resend: notify the firm —
  const resendKey = process.env.RESEND_API_KEY;
  const notifyTo = process.env.CONTACT_NOTIFY_EMAIL;
  if (resendKey && notifyTo) {
    try {
      const resend = new Resend(resendKey);
      const { error } = await resend.emails.send({
        from: process.env.CONTACT_FROM_EMAIL ?? 'Mas Alpha Securities <onboarding@resend.dev>',
        to: [notifyTo],
        replyTo: email,
        subject: `New partner inquiry — ${name}`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          '',
          message || '(no message)',
          '',
          '— Sent from the masalphasecurities.com contact form',
        ].join('\n'),
      });
      if (error) throw error;
      results.push({ sink: 'resend', ok: true });
    } catch (err) {
      console.error('[contact] resend send failed:', err);
      results.push({ sink: 'resend', ok: false });
    }
  }

  if (results.length === 0) {
    // Same outward copy as the 502 branch — the distinct status code and the
    // server log carry the configuration detail; visitors never see it.
    console.error('[contact] no sink configured — set Supabase and/or Resend env vars');
    return NextResponse.json(
      { error: 'We could not record your inquiry. Please email ir@masalphasecurities.com.' },
      { status: 503 },
    );
  }

  if (!results.some((r) => r.ok)) {
    return NextResponse.json(
      { error: 'We could not record your inquiry. Please email ir@masalphasecurities.com.' },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
