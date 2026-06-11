# Mas Alpha Securities — Marketing Site

Production implementation of the homepage from the Claude Design handoff bundle
(`mas-alpha-securities-design-system`, exported 2026-06-11, source:
`ui_kits/homepage/index.html`).

**"Irreplaceable."** Deep navy dominates, warm stone breathes, champagne gold is a
hairline whisper. Spectral serif for display, Hanken Grotesk for body. Square
corners, full-bleed photography under navy scrims, slow reveals, no emoji, no
icons, never performance figures.

## Stack

Static HTML + CSS + vanilla JS — no build step, no dependencies. The design
prototype used React as its design medium; per the handoff instructions the
visual output was recreated, not the prototype's internals. Deploy by serving
this folder from any static host.

```
index.html        — the homepage (the only page implemented so far)
css/tokens.css    — design tokens, carried verbatim from the design system
css/main.css      — base rules, components, sections, motion
js/main.js        — nav state, parallax, reveals, stat count-ups
assets/           — imagery + logos copied from the design system
```

View locally: `python3 -m http.server 8000` in this folder → http://localhost:8000
(or just open `index.html`; everything is relative-path).

## Page anatomy (canonical order)

Nav → Hero ("We own what cannot be replaced.", B&W Miami shoreline, parallax)
→ Philosophy (distilled single statement) → Credibility band (six firm-level
stats, staggered count-up) → Explore grid (five tiles → Approach / Verticals /
Portfolio / Partners Club / Team) → Closing CTA → "As Featured In" strip →
Disclosure footer.

## Not yet implemented / open items

- **Secondary pages** — nav and tiles link to `approach.html`, `verticals.html`,
  `portfolio.html`, `partners-club.html`, `team.html`, `press.html`; those pages
  exist in the design bundle's UI kit but are not built yet, so the links 404.
- **Investor Portal** — both buttons are inert (`<button>`); the prototype had no
  destination either. Wire to the real portal URL when one exists.
- **"Become a Partner" (closing)** — also inert in the prototype; consider
  pointing it at `mailto:ir@masalphasecurities.com` or an intake form.
- **Mobile nav** — the prototype is desktop-first and defines no mobile nav; below
  900px the link row is hidden (no hamburger). Decide on a pattern before launch.
- **Fonts** — Spectral + Hanken Grotesk load from Google Fonts. If the firm
  licenses Canela / GT Sectra (the brief's target energy), self-host and swap.
- **Imagery licensing** — photos carried over from the design bundle as-is.

## Brand rules (do not break)

- Gold (`--gold-400 #C2A36B`) is hairlines, eyebrows, numerals only — never a
  surface fill (exception: solid gold button).
- Corners square everywhere; the only shadow is under the scrolled nav.
- Motion: fade + rise, 700–1100ms, `cubic-bezier(.22,1,.36,1)`. No bounce.
- Copy: sentence case, no exclamation marks, no emoji, investors are "partners",
  never returns/AUM/projections.
