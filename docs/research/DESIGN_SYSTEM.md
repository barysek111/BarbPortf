# TITARVL — design system (rule-level extraction)

**Framer reference:** `docs/research/spec/*.json` from `scripts/extract-spec.mjs`.

**Live app:** tokens and components are implemented in `src/app/globals.css` and
`src/components/`. The catalogue is `src/app/design-system/page.tsx` — prefer that
over this doc for current behaviour.

Values below describe the **published Framer site** unless noted as **live app**.

## Tooling

| Script | Purpose |
|---|---|
| `scripts/extract-spec.mjs` | Dump rule-level spec per page |
| `scripts/spec.mjs` | Query it (`list` / `show <layer>` / `tree`) |
| `scripts/compare-live.mjs` | Verify geometry live vs local across widths |
| `scripts/check-spacing.mjs` | Enforce numeric spacing utilities in `src/` |
| `scripts/probe-lines.mjs` | Line-box structure, wrap points |
| `scripts/probe-chain.mjs` | Ancestor chain with box model |

## Breakpoints

| Token | Value | Layout role (live app) |
|---|---|---|
| `tablet` | `810px` | Nav inline (no menu overlay); footer 4-col; works grid 4-up; ImageRow columns; chapter/hero splits |
| `desktop` | `1200px` | Works list row + CTA; ProjectHero title half-width + about column pad; type-h2 size step |
| `wide` | `1400px` | **Type only** — `type-h3` / `type-stat` final step |
| `max` | `1440px` | **Type only** — `type-h2` final step |

Custom variant: `below-tablet` = width &lt; 810px.

Framer layout queries (reference): `(max-width: 809.98px)`,
`(min-width: 810px) and (max-width: 1199.98px)`, `(min-width: 1200px)`.

## Colour

| Token | Value |
|---|---|
| `--color-ink` | `#000` |
| `--color-paper` | `#fff` |
| `--color-muted` | `#a7a7a7` |
| `--color-surface` | `#f0f0f0` |
| `--color-selection` | `#ff0c10` |

## Type levels

Defined in `src/app/globals.css`. Components use utilities only — no ad-hoc font sizes.

| Utility | Spec (summary) |
|---|---|
| `type-label` | Martian Mono 12px/400, lh 1.3em, ls −0.05em, upper |
| `type-body` | Inter Display 16px/500, lh 1.1em |
| `type-h3` | Inter Display 500, upper — 18 → 23 → 29 → 36px (810 / 1200 / 1400) |
| `type-stat` | Same size ramp as h3; lh 0.8em, ls −0.05em, normal case |
| `type-display` | Inter Display 48px/500 — open mobile nav |
| `type-h2` | Inter Display 500, upper — 41 → 51 → 64px (1200 / 1440) |

## Spacing (live app)

**Numeric only** in class strings: `gap-12`, `pb-96`, `pt-216`, etc. The number is
**pixels** (`gap-12` = 12px). No semantic spacing class names (`gap-gutter`, `pb-section`, …).

Allowed scale (see `scripts/check-spacing.mjs`):

`0 2 4 8 12 16 20 24 32 36 44 56 64 76 96 104 152 176 216`

Common rhythm:

| Utility | px | Role |
|---|---|---|
| `gap-12` / `p-12` | 12 | Grid gutters; Chapter body paragraphs; `page-inline` at ≤1200 |
| `gap-36` | 36 | Section headline → content (Services, WhatIDo, CredentialSection, Chapter stack) |
| `gap-56` | 56 | ProjectHero copy stacks (legacy note — hero meta grid uses gap-12) |
| `gap-96` | 96 | `page-main` between top-level page children; footer link row → wordmark |
| `py-96` | 96 | Footer band vertical padding |
| `pt-page-top` / `--spacing-page-top` | 216 | First `page-main` child below fixed nav (unless `data-skip-page-top`) |
| `scroll-mt-96` | 96 | In-page anchor offset (design-system, archive) |

Framer source used a different px rhythm (often 10px gutters in extract); the live
app standardises on the table above.

## Layout (live app)

| Primitive | Role |
|---|---|
| `page-inset` | Site column cap (3840), centred, **`padding-inline`** 12px ≤1200 / 24px above — nav, scroll column, footer inner |
| `page-main` | Flex column, **`gap-96`** between direct children; each child gets the **1920** inner column (same rules as `section-wrap`) except **`footer-bleed`** and **`data-page-bleed`**; first child gets **`pt-page-top`** unless `data-skip-page-top` |
| `section-wrap` | Explicit **1920** cap — **nav** bar row and **footer** inner content; live section components omit it |
| `data-page-bleed` | Opt out of the automatic `page-main` inner column when a block must use the full `page-inset` width |
| `footer-bleed` | Full-bleed footer background; pair with `page-inset` on inner content |
| `works-grid` | 2 col → 4 col @810 |

## Nav & footer (live app)

- **Nav:** Menu overlay **&lt;810px** only. From 810px: inline **Works**, **About**, **NavClock** (no Home link). Logo → home.
- **Footer:** **`py-96`** on the band; **`gap-96`** between link row and wordmark. No extra top margin — spacing from **`page-main` gap-96** only. Contact left-aligned &lt;810, right-aligned ≥810 on tablet; columns swap at desktop 1200.

## Radii

`0` default, `8px` media (`radius-media`), `10px` / `15px` rare.

## Motion

- **Appear** — one-shot in-view (`SmoothScroll` + `.is-in`), not hover.
- **Hover** — bracket label roll, stat roll, FAQ-style patterns on reference site.

## Content

Copy and assets in `src/content/` and `public/` match the Framer template as
placeholders until replaced for publication.
