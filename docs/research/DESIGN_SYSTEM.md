# TITARVL — design system (rule-level extraction)

**Source of truth:** `docs/research/spec/*.json`, produced by `scripts/extract-spec.mjs`.

These values are read from the published site's **CSSOM rules**, not inferred from
rendered pixels. That distinction matters: a flattened HTML/CSS export bakes every
token down to a computed pixel value, which is what destroyed the system on the
first attempt. Rules carry their media queries, so responsive behaviour is
*declared* rather than sampled.

## How the extraction works

| Capability | Result |
|---|---|
| Stylesheets readable | 21 of 21, none blocked |
| CSS rules captured | 1093 (home) |
| Named layers (`data-framer-name`) | 441 (home) |
| Media queries at rule level | 7 |

Framer renders **every breakpoint variant into a single DOM**, hiding the inactive
ones with `hidden-<hash>` classes. `framer-extract.json → hydrate.breakpoints` maps
each hash to its media query, so one page load yields all breakpoints with
certainty about which is which. No viewport resizing, no sampling.

### Tooling

| Script | Purpose |
|---|---|
| `scripts/extract-spec.mjs` | Dump rule-level spec per page |
| `scripts/spec.mjs` | Query it (`list` / `show <layer>` / `tree`) |
| `scripts/compare-live.mjs` | Verify geometry live vs local across widths |
| `scripts/probe-lines.mjs` | Line-box structure, reveals wrap points |
| `scripts/probe-chain.mjs` | Ancestor chain with box model |

Verification only. Never derive values from the local build — it is a derivative.

## Breakpoints

Two layout families plus two type-only switches:

| Token | Value | Role |
|---|---|---|
| `tablet` | `810px` | phone → tablet |
| `desktop` | `1200px` | tablet → desktop, most layout variants |
| `wide` | `1400px` | **type only** — `jskmgv` final step |
| `max` | `1440px` | **type only** — `pcouyd` final step |

The 1400/1440 split is genuine: the h3/stat preset steps at 1400px while the h2
preset steps at 1440px. Replicate it; do not normalise the two together.

Layout variant queries as declared: `(max-width: 809.98px)`,
`(min-width: 810px) and (max-width: 1199.98px)`, `(min-width: 1200px)`.

## Colour

Three tokens on `body`, nothing else is a real colour decision.

| Token | Value |
|---|---|
| `--color-ink` | `#000` |
| `--color-paper` | `#fff` |
| `--color-muted` | `#a7a7a7` |
| `--color-selection` | `#ff0c10` |

`rgb(0,0,238)` seen in dumps is the browser's default link blue — noise, not a token.

## Type levels

One utility per Framer preset, in `src/app/globals.css`. Responsive steps belong to
the level so components never restate a font size.

| Utility | Preset | Spec |
|---|---|---|
| `type-label` | `u1p157` | Martian Mono 12px/400, lh 1.3em, ls −0.05em, upper |
| `type-label-strong` | `10gezu1` | Martian Mono 12px/600, lh 1.2em, ls −0.05em, upper |
| `type-body` | `zw6rd6` | Inter Display 16px/500, lh 1.1em, ls 0 |
| `type-h3` | `jskmgv` | Inter Display 500, ls −0.01em, upper — 18 → 23 → 29 → 36px |
| `type-display` | `1dpvgwi` | Inter Display 48px/500, lh 1.2em, ls −0.01em, upper |
| `type-h2` | `pcouyd` | Inter Display 500, lh 1em, ls −0.04em, upper — 41 → 51 → 64px |

`type-h3` line-height is `1em` on phone and `0.9em` from 810px up.

## Spacing

The source is px-authored on a 10px rhythm with an irregular scale. The Tailwind
base step is set to `--spacing: 1px`, so every utility maps 1:1 to the extracted
value (`pb-96` is 96px). Recurring values: 5 10 12 16 20 24 30 36 42 52 60 76 96 150.

Named aliases: `gutter` 10px, `header` 52px, `headline` 76px, `section` 96px.

## Page wrap

| Property | Value |
|---|---|
| Outer cap | `3840px` (`site-main`) |
| Section cap | `1920px` (`section-wrap`) |
| Side padding | `10px`, constant at every breakpoint |
| Grid | `repeat(N, minmax(50px, 1fr))` — 5-col latest, 12-col stacks, 2-col splits |

Verified identical live vs local at 390 / 810 / 1200 / 1440 / 1920.

## Radii

`0` default, `8px` media frames, `10px` and `15px` rare.

## Component map (home)

12 named sections, in order: Hero, Latest, Services, What I Do, Video, Quote,
Benefits, Showcase Reel, FAQ, Testimonial, Contact, Photos.

Framer does not publish component boundaries — `data-framer-name` gives layer names
("Nav Links", "Project Info", "Service Card Images Desktop"), which is a strong
proxy but a map you infer, not a file you extract.

## Editorial header

Kicker + tag + headline, used by Benefits, FAQ and Contact.

- under 1200px: kicker and tag share row 1, headline drops to row 2, full width
- 1200px and up: kicker in column 1; headline and tag share column 2, headline
  flush left, tag flush right, **column gap 0** (columns split the content box
  exactly in half — headline starts at x=960 in a 1920 viewport)
- kicker and headline **shrink-wrap**; they must not stretch to the column

Headlines wrap at deterministic points: the rendered box width is exactly
proportional to font size across breakpoints (535.2px at 64px → 342.8px at 41px,
a ratio of 41/64). That only happens with fixed breaks, so breaks live in
`src/content/headlines.ts` as a `lines` array rather than as CSS guesswork.

## Known residual deltas

- Nav links sit 1.4px lower on live: its brand row is 34px tall vs 31.2px local,
  so `align-items: center` centres the link column slightly lower.
- Headline boxes are ~0.9% wider locally (534.9 vs 529.7 at 64px) — webfont
  rendering, one weight loaded locally vs the full family.
- Headline box height 128px local vs 141px live — live wraps each line in
  animation containers that add height.

## Rest vs Appear vs Hover

- **Rest** = no pointer, after load and scroll. This is the default CSS.
- **Appear** = one-shot in-view only. Never reuse appear offsets as rest.
- **Hover** = only what changes on pointer (FAQ wipe, letter roll, stat roll).
- Stat rest values are `10+ / 5+ / 25+ / 100%`; never copy the `0+` counter start.

## Content

Copy, imagery, video and the wordmark in `public/` and `src/content/` are the
original template's, kept only as placeholders so layout can be verified. They are
not licensed for publication and must be replaced before this goes anywhere public.
