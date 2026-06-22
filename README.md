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

Palette derived from the official Trafiqo logo (blue / green / yellow / red):

| Token | Hex |
|-------|-----|
| Blue (primary) | `#1E63D6` |
| Green (accent) | `#2BA24A` |
| Yellow (accent) | `#F4B400` |
| Red (accent) | `#E0342A` |

Yellow is used only as a fill/badge with dark text (never as small text on
white) to keep contrast accessible.

## Placeholders to replace before launch

- **Logo** — currently a typographic wordmark + 3-dot mark in the logo colours.
  Drop in the official logo asset to replace the wordmark.
- **Technical brief** — `assets/Trafiqo-Technical-Brief.pdf` is a placeholder.
- **Team & partners** — names, photos and partner logos are placeholders.
- **Contact form** — the `#demo-form` opens the visitor's email app via a
  `mailto:` link (no backend). Set `CONTACT_EMAIL` in the inline script to the
  real inbox before launch.

## Content guardrails (kept intentionally)

- Simulation figures are labelled **"Simulation / illustrative — not a pilot result."**
- Validation is **future-tense** (no completed pilot is claimed).
- "Why cities care" stats are marked **external sources** (TomTom 2025, BKK 2025).
- The **Trust & Data Governance** copy (headline, subheadline, 6 statements,
  7-question FAQ) is used **verbatim** from the approved governance section —
  the legal-safe version.
