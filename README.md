# Trafiqo — B2G landing page

Single-page marketing site for **Trafiqo**, an AI-driven decision-support platform
for cities and transport authorities.

> Smarter choices. Smoother cities.

## Run / preview

No build step, no npm, no framework. Just open the file:

```bash
# from this folder
open index.html          # macOS
xdg-open index.html      # Linux
# or serve it
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Stack

- Static **`index.html`** + `assets/` — nothing to compile.
- **Tailwind CSS via CDN** (`cdn.tailwindcss.com`) with an inline `tailwind.config`.
- **Vanilla JS** for: mobile nav, FAQ accordion, smooth-scroll active-link
  highlighting, and the contact-form confirmation. No dependencies.
- Fonts: **Inter** via Google Fonts (falls back to system sans).
- Fully responsive (desktop + mobile), semantic HTML, accessible
  (skip link, `aria-expanded`, labelled form fields, reduced-motion support).

## Brand

| Token | Hex |
|-------|-----|
| Magenta (primary) | `#D6206B` |
| Orange (accent) | `#F5821F` |
| Green (accent) | `#1FA86B` |

## Placeholders to replace before launch

- **Logo** — currently a typographic wordmark + 3-dot mark in brand colours.
  Drop in the official logo asset. *(Note: the supplied logo art uses
  blue/green/yellow/red; the page is built to the stated magenta/orange/green
  palette — align these before launch.)*
- **Technical brief** — `assets/Trafiqo-Technical-Brief.pdf` is a placeholder.
- **Team & partners** — names, photos and partner logos are placeholders.
- **Contact form** — submits client-side only and shows a confirmation. Wire the
  `#demo-form` handler to your inbox/CRM endpoint (or a `mailto:` action).

## Content guardrails (kept intentionally)

- Simulation figures are labelled **"Simulation / illustrative — not a pilot result."**
- Validation is **future-tense** (no completed pilot is claimed).
- "Why cities care" stats are marked **external sources** (TomTom 2025, BKK 2025).
- The **Trust & Data Governance** copy (headline, subheadline, 6 statements,
  7-question FAQ) is used **verbatim** from the approved governance section —
  the legal-safe version.
