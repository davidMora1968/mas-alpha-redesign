# Mas Alpha Securities — Marketing Site

**"Irreplaceable."** The marketing site for Mas Alpha Securities, a private
investment firm founded 2023 in Coral Gables by the next generation of the
MasTec family (NYSE: MTZ). Implemented from the firm's Claude Design handoff
bundle; the original static prototype implementation is preserved in
[`static-reference/`](static-reference/) as the pixel-fidelity reference.

## Stack

Next.js 15 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 ·
framer-motion · next/font (Spectral + Hanken Grotesk) · next/image ·
Supabase + Resend (contact form).

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in — see below
npm run dev                  # http://localhost:3000
npm run build                # production build (all routes prerender static)
```

> Heads-up for local dev on the founder's machine: port 3000 may be occupied
> by an ssh tunnel — use `npx next dev -p 3005`.

## Environment

| Var | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for metadata/sitemap/robots |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL (leads insert) |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only key used by the contact API route |
| `RESEND_API_KEY` | Resend API key (inquiry notification email) |
| `CONTACT_NOTIFY_EMAIL` | Where inquiries are sent (default ir@masalphasecurities.com) |
| `CONTACT_FROM_EMAIL` | Verified Resend sender (falls back to Resend's sandbox sender) |

Never commit `.env*` files — `.gitignore` already excludes them.

## Contact form

"Become a Partner" (closing section of the homepage) unfolds a quiet inline
form that POSTs to `app/api/contact/route.ts`, which inserts into the Supabase
`leads` table and notifies via Resend. Both sinks are env-gated and independent
— the route degrades gracefully when either is unconfigured. Create the table
once with [`supabase/leads.sql`](supabase/leads.sql). Spam control: honeypot
field + length caps + control-character stripping.

## Routes

`/` (homepage) · `/approach` · `/verticals` · `/portfolio` · `/partners-club`
· `/team` · `/press` — shared fixed nav (transparent over heroes, solid navy
after 80px) and disclosure footer come from `app/layout.tsx`.

SEO: per-page titles/descriptions/Open Graph + canonicals, `app/sitemap.ts`,
`app/robots.ts`, Organization JSON-LD (layout) and Person JSON-LD (/team).

## Structure

```
app/                  routes, layout, globals.css, api/contact
components/ui/        Reveal, Button, Eyebrow, SectionHeading, PullQuote
components/site/      ImagePanel, LeaderCard
components/home/      homepage sections + PartnerCta form
components/<route>/   per-page sections
public/assets/        imagery + logos from the design system
supabase/leads.sql    one-time DDL for the leads table
static-reference/     the original static implementation (visual source of truth)
```

## Brand rules (do not break)

- Gold (`#C2A36B`) is hairlines, eyebrows, numerals only — never a surface
  fill (exception: the solid gold button).
- Corners square everywhere; the only shadow is under the scrolled nav.
- Motion: fade + rise, ~900ms, `cubic-bezier(.22,1,.36,1)`, honors
  `prefers-reduced-motion`. No bounce, nothing playful.
- Copy: sentence case, no exclamation marks, no emoji, no icons; investors are
  "partners"; **never** returns, AUM, or projections. Every page ends with the
  accredited-investors disclosure.

## Open items

- **Rate limiting on `/api/contact`** — v1 ships with honeypot + length caps
  only; add a per-IP limit (platform WAF rule or `@upstash/ratelimit`,
  ~5 req/hour) as a fast follow, and set a daily-send alert in Resend.
- Investor Portal buttons are inert until a portal URL exists.
- `/press` article links point to `#` until the real URLs are supplied.
- Leadership portraits render as serif monograms; pass `src` to `LeaderCard`
  when headshots arrive.
- No mobile nav pattern (desktop-first design); link row hides under 900px.
- If the firm licenses Canela / GT Sectra, swap Spectral via `next/font`.
