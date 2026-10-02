# Component map (Framer reference — not a build backlog)

Extracted from the template site’s `data-framer-name` and `data-framer-components`.
**Do not treat this file as work to implement.** The live app is defined by routes in
`src/app/` and the catalogue in `src/app/design-system/page.tsx`.

## Live app (what we ship)

| Route | Sections / components |
|-------|------------------------|
| `/` | Nav, Hero (+ HeroRing), WorksDisplay, Services, WhatIDo, Footer |
| `/works` | Nav, WorksDisplay (`title="Works"`), Footer |
| `/about` | Nav, Chapter (about opener + optional section images), CredentialSection ×2 (Experience, Education), Services, Footer |
| `/[slug]` | Nav, ProjectHero, ChapterBlock (Chapter + ImageRow), NextProject (`slug`), Footer |
| `/design-system` | Internal catalogue only (noindex) |

Project slugs: `plinto`, `powermatch`, `ageras`, `cococare`, `rokokobrand`, `rokokoweb`, `weld`, `eatgrim`.
Each listed project has a case study in `src/content/case-studies/` and a static page via `generateStaticParams`.
Long Framer-style URLs redirect in `next.config.ts` to those slugs.

**Not in the app (removed from template scope):** FAQ, Testimonial, Contact form, Photos ticker, Video, Quote, Benefits, Showcase Reel, `/contact`, legal pages.

## Framer template — home (historical order)

Nav → Hero → Latest → Services → What I Do → Video → Quote → Benefits → Showcase Reel → FAQ → Testimonial → Contact → Photos → Footer

Only the segments through **What I Do** (plus Nav/Footer) were kept for this rebuild.

## Framer IDs → closest live component (when useful for parity checks)

| ID | Framer role | Live counterpart |
|----|-------------|------------------|
| `framer-fEHtQ` | Nav | `layout/Nav.tsx` |
| `framer-m1lJq` | Bracket button | `ui/Button.tsx` |
| `framer-Z7L99` | Footer | `layout/Footer.tsx` |
| `framer-8ifp0` | Work card | `work/WorkCard.tsx` |
| `framer-59R6F` | Service row | `home/Services.tsx` |
| `framer-iIqb4` / `6iyeJ` / `iw6ol` | Hero / carousel | `home/Hero.tsx`, `home/HeroRing.tsx` |
| `framer-WZqEJ` | Editorial split header | `sections/Chapter.tsx` (about + case studies) |

Removed template-only (no live component): Contact form (`framer-igYKE`), photo ticker (`framer-OwnOa`), FAQ (`framer-SlX0i`), testimonial (`framer-txG6L`), stats block (`framer-VU2OY`).

## Framer template — other pages (historical)

- About: thinking/making + Experience + Services (matches `/about` structurally via Chapter + CredentialSection + Services)
- Works: grid/list + cards → `sections/WorksDisplay.tsx`
- Case study: hero, about, meta, gallery → `work/ProjectHero.tsx`, `sections/Chapter.tsx`, `sections/ImageRow.tsx`
