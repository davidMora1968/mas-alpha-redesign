import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

/**
 * The Monday Brief — a weekly internal briefing for the leadership team,
 * sent from the site itself (Vercel cron, see vercel.json: Mondays 12:00 UTC
 * ≈ 8am Miami). Composes three sections:
 *   1. New partner inquiries  — Supabase `leads`, past 7 days
 *   2. In the press           — Google News results for the firm's names
 *   3. The week ahead         — standing focus list, edited in code below
 *
 * Auth: requires CRON_SECRET via the Authorization header only (Vercel sends
 * `Authorization: Bearer <secret>` automatically when the env var exists);
 * never accept the secret in the URL — query strings land in request logs.
 * Manual preview without sending:
 *   curl -H "Authorization: Bearer $CRON_SECRET" "https://<site>/api/brief?dry=1"
 * Cadence change: edit vercel.json ("0 12 * * 1" → "0 12 * * *" for daily).
 */

export const maxDuration = 60;

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

// Standing focus list — edit freely; data-driven items are added at runtime.
const WEEK_AHEAD: string[] = [
  'Reply to every open inquiry before Wednesday.',
  'Partners Club — confirm the next event date and guest list.',
  'Press — one outreach note to a Wyoming or Miami outlet.',
];

type Lead = { name: string; email: string; message: string | null; created_at: string };
type PressItem = { title: string; link: string; source: string; date: Date };

async function getLeads(): Promise<{ items: Lead[]; configured: boolean; errored: boolean }> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return { items: [], configured: false, errored: false };
  try {
    const supabase = createClient(url, key, { auth: { persistSession: false } });
    const since = new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString();
    const { data, error } = await supabase
      .from('leads')
      .select('name,email,message,created_at')
      .gte('created_at', since)
      .order('created_at', { ascending: false })
      .limit(25);
    if (error) throw error;
    return { items: data ?? [], configured: true, errored: false };
  } catch (err) {
    console.error('[brief] leads query failed:', err);
    return { items: [], configured: true, errored: true };
  }
}

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'");
}

async function getPress(): Promise<{ items: PressItem[]; errored: boolean }> {
  const queries = ['"Mas Alpha Securities"', '"Meadowlark Ski"', '"MAS Tierra"'];
  const cutoff = Date.now() - 14 * 24 * 3600 * 1000;
  const seen = new Set<string>();
  const items: PressItem[] = [];
  let failures = 0;
  for (const q of queries) {
    // Bound both the fetch AND the body read — an unauthenticated upstream that
    // accepts the connection then stalls must not consume the 60s function budget
    // and silently drop the whole send. An abort degrades to "Press unavailable".
    const ac = new AbortController();
    const timer = setTimeout(() => ac.abort(), 8000);
    try {
      const res = await fetch(
        `https://news.google.com/rss/search?q=${encodeURIComponent(q)}&hl=en-US&gl=US&ceid=US:en`,
        {
          headers: { 'user-agent': 'Mozilla/5.0 (MasAlphaBrief/1.0)' },
          cache: 'no-store',
          signal: ac.signal,
        },
      );
      if (!res.ok) {
        failures += 1;
        continue;
      }
      const xml = await res.text();
      for (const m of xml.matchAll(/<item>([\s\S]*?)<\/item>/g)) {
        const block = m[1];
        const title = decodeEntities(
          (block.match(/<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/)?.[1] ?? '').trim(),
        );
        const link = (block.match(/<link>([\s\S]*?)<\/link>/)?.[1] ?? '').trim();
        const source = decodeEntities(
          (block.match(/<source[^>]*>([\s\S]*?)<\/source>/)?.[1] ?? '').trim(),
        );
        const pub = new Date((block.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1] ?? '').trim());
        if (!title || !link || Number.isNaN(pub.getTime()) || pub.getTime() < cutoff) continue;
        const dedupe = title.toLowerCase().slice(0, 60);
        if (seen.has(dedupe)) continue;
        seen.add(dedupe);
        items.push({ title, link, source, date: pub });
      }
    } catch (err) {
      failures += 1;
      console.error('[brief] press fetch failed for', q, err);
    } finally {
      clearTimeout(timer);
    }
  }
  return {
    items: items.sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 8),
    errored: failures === queries.length,
  };
}

const fmtDate = (d: Date) =>
  d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'America/New_York' });
const fmtShort = (d: Date) =>
  d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'America/New_York' });

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

type LeadsResult = { items: Lead[]; configured: boolean; errored: boolean };
type PressResult = { items: PressItem[]; errored: boolean };

function leadsEmptyCopy(leads: LeadsResult): string {
  if (!leads.configured) return 'Inquiry tracking is not yet connected.';
  if (leads.errored) return 'Inquiry feed unavailable this week — check the server logs.';
  return 'No new inquiries this week.';
}

function pressEmptyCopy(press: PressResult): string {
  if (press.errored) return 'Press feed unavailable this week — check the server logs.';
  return 'Quiet week — no new coverage found.';
}

function renderHtml(leads: LeadsResult, press: PressResult): string {
  const today = fmtDate(new Date());
  const gold = '#C2A36B';
  const navy = '#0A1B33';
  const ink = '#16263F';
  const muted = '#44536B';
  const hairline = 'border-top:1px solid #E5DCC8;';
  const h2 = `margin:0 0 4px;font:600 11px/1.4 Helvetica,Arial,sans-serif;letter-spacing:0.18em;text-transform:uppercase;color:${gold};`;
  const serif = `font-family:Georgia,'Iowan Old Style',serif;`;

  const leadRows = leads.items.length
    ? leads.items
        .map(
          (l) => `
      <tr><td style="padding:10px 0;${hairline}">
        <div style="${serif}font-size:16px;color:${ink};">${esc(l.name)} <span style="font-size:12px;color:${muted};font-family:Helvetica,Arial,sans-serif;">· ${esc(l.email)} · ${fmtShort(new Date(l.created_at))}</span></div>
        ${l.message ? `<div style="font:13px/1.5 Helvetica,Arial,sans-serif;color:${muted};margin-top:2px;">${esc(l.message.slice(0, 160))}</div>` : ''}
      </td></tr>`,
        )
        .join('')
    : `<tr><td style="padding:10px 0;${hairline}font:14px/1.5 Helvetica,Arial,sans-serif;color:${muted};">${leadsEmptyCopy(leads)}</td></tr>`;

  const pressRows = press.items.length
    ? press.items
        .map(
          (p) => `
      <tr><td style="padding:10px 0;${hairline}">
        <a href="${esc(p.link)}" style="${serif}font-size:15px;color:${ink};text-decoration:none;">${esc(p.title)}</a>
        <div style="font:12px/1.5 Helvetica,Arial,sans-serif;color:${muted};margin-top:2px;">${esc(p.source || 'Press')} · ${fmtShort(p.date)}</div>
      </td></tr>`,
        )
        .join('')
    : `<tr><td style="padding:10px 0;${hairline}font:14px/1.5 Helvetica,Arial,sans-serif;color:${muted};">${pressEmptyCopy(press)}</td></tr>`;

  const weekAhead = [
    ...(leads.items.length
      ? [`${leads.items.length} new ${leads.items.length === 1 ? 'inquiry' : 'inquiries'} awaiting a personal reply.`]
      : []),
    ...WEEK_AHEAD,
  ]
    .map(
      (item) => `
      <tr><td style="padding:8px 0;${hairline}font:14px/1.6 Helvetica,Arial,sans-serif;color:${ink};">
        <span style="color:${gold};">—</span>&nbsp;&nbsp;${esc(item)}
      </td></tr>`,
    )
    .join('');

  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head><body style="margin:0;padding:0;background:#F4EFE6;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F4EFE6;padding:24px 12px;">
<tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
  <tr><td style="background:${navy};padding:28px 32px;">
    <img src="${SITE}/assets/logos/mas-wordmark-cream.png" alt="Mas Alpha Securities" height="18" style="display:block;border:0;">
    <div style="margin-top:14px;${serif}font-size:26px;font-weight:normal;color:#FAF7F0;">The Monday Brief</div>
    <div style="margin-top:4px;font:600 11px/1.4 Helvetica,Arial,sans-serif;letter-spacing:0.18em;text-transform:uppercase;color:${gold};">${today}</div>
  </td></tr>
  <tr><td style="background:#FAF7F0;padding:28px 32px 8px;">
    <div style="${h2}">New partner inquiries</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${leadRows}</table>
  </td></tr>
  <tr><td style="background:#FAF7F0;padding:20px 32px 8px;">
    <div style="${h2}">In the press</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${pressRows}</table>
  </td></tr>
  <tr><td style="background:#FAF7F0;padding:20px 32px 28px;">
    <div style="${h2}">The week ahead</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${weekAhead}</table>
  </td></tr>
  <tr><td style="background:${navy};padding:18px 32px;">
    <div style="font:11px/1.6 Helvetica,Arial,sans-serif;color:#8FA1B8;">
      Internal briefing · generated by <a href="${SITE}" style="color:${gold};text-decoration:none;">the firm's digital home</a> · Mondays, 8am Miami
    </div>
  </td></tr>
</table>
</td></tr></table>
</body></html>`;
}

function renderText(leads: LeadsResult, press: PressResult): string {
  const lines = [
    `THE MONDAY BRIEF — ${fmtDate(new Date())}`,
    '',
    'NEW PARTNER INQUIRIES',
    ...(leads.items.length
      ? leads.items.map((l) => `- ${l.name} (${l.email}, ${fmtShort(new Date(l.created_at))})`)
      : [`- ${leadsEmptyCopy(leads)}`]),
    '',
    'IN THE PRESS',
    ...(press.items.length
      ? press.items.map((p) => `- ${p.title} (${p.source}, ${fmtShort(p.date)})\n  ${p.link}`)
      : [`- ${pressEmptyCopy(press)}`]),
    '',
    'THE WEEK AHEAD',
    ...WEEK_AHEAD.map((w) => `- ${w}`),
  ];
  return lines.join('\n');
}

export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  const url = new URL(req.url);
  const dry = url.searchParams.get('dry') === '1';
  const supplied = req.headers.get('authorization');

  if (!secret) {
    // Unconfigured: never send; allow local-only dry runs for development.
    if (dry && process.env.NODE_ENV !== 'production') {
      const [leads, press] = await Promise.all([getLeads(), getPress()]);
      return new Response(renderHtml(leads, press), {
      headers: {
        'content-type': 'text/html; charset=utf-8',
        'cache-control': 'no-store',
        'referrer-policy': 'no-referrer',
      },
    });
    }
    return NextResponse.json({ error: 'CRON_SECRET is not configured.' }, { status: 503 });
  }

  const authorized = supplied === `Bearer ${secret}`;
  if (!authorized) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

  const [leads, press] = await Promise.all([getLeads(), getPress()]);

  if (dry) {
    return new Response(renderHtml(leads, press), {
      headers: {
        'content-type': 'text/html; charset=utf-8',
        'cache-control': 'no-store',
        'referrer-policy': 'no-referrer',
      },
    });
  }

  const resendKey = process.env.RESEND_API_KEY;
  const recipients = (process.env.BRIEF_RECIPIENTS || process.env.CONTACT_NOTIFY_EMAIL || 'ir@masalphasecurities.com')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  if (!resendKey) {
    console.error('[brief] RESEND_API_KEY not set — brief composed but not sent');
    return NextResponse.json({ error: 'Email is not configured; brief not sent.' }, { status: 503 });
  }

  if (recipients.length === 0) {
    console.error('[brief] no recipients configured — brief not sent');
    return NextResponse.json({ error: 'No recipients configured; brief not sent.' }, { status: 503 });
  }

  try {
    const resend = new Resend(resendKey);
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || 'Mas Alpha Securities <onboarding@resend.dev>',
      to: recipients,
      subject: `The Monday Brief · ${fmtDate(new Date())}`,
      html: renderHtml(leads, press),
      text: renderText(leads, press),
    });
    if (error) throw error;
  } catch (err) {
    console.error('[brief] send failed:', err);
    return NextResponse.json({ error: 'Brief composed but sending failed.' }, { status: 502 });
  }

  return NextResponse.json({
    ok: true,
    recipients: recipients.length,
    leads: leads.items.length,
    press: press.items.length,
    leadsErrored: leads.errored,
    pressErrored: press.errored,
  });
}
