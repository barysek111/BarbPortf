# Session handoff — 2026-09-25

## Dev
- App: `npm run dev` → **http://localhost:3002**
- Design system catalogue: **/design-system**

## What’s done

### Ageras (`/ageras`) — full case study
- **ProjectHero** + **2-col solid** hero **ImageRow** (phone + pricing)
- **Chapter** stack: SCOPE + 6 chapters from `ageras-refined.md`
- **Image rows** under **Direction** (sitemaps fill, login solid) and **Design System** (6 rows + icons/tabs) and **Prototype & Validation** (fullpages solid, 3-col fill mockups)
- **Next project** canvas (scatter + drag) → Powermatch
- Content: `src/content/solara.ts` (also wired via `getCaseStudy("ageras")`)

### Other 7 projects — text-only case studies
Routes use **`CaseStudyPage`** + **`getCaseStudy(slug)`**:
`plinto-ai-invoicing`, `powermatch-invoice-reconciliation`, `coco-care-app`, `rokoko-brand-identity`, `rokoko-website-revamp`, `weld-digital-presence`, `eat-grim-brand-identity`

Each has: **ProjectHero** (copy aligned with barboragadlinova.com / gentle handoff) + **SCOPE** (live background + challenge bullets as numbered list) + chapters from refined MD.

No hero **ImageRow**, no chapter **imageRows**, no next-project block yet.

### Components & rules
- **`ImageFrame`**: solid | fill | background; **max height 800px**; fill uses block img (not zero-height)
- **`ImageRow`**: 1/2/3 col, **gap-gutter** between frames
- **Stacked ImageRows** (`globals.css`): consecutive rows **pb-gutter**; last in stack **pb-section**
- **`Chapter`**: optional **`imageRows`** on chapter objects (Ageras only so far)
- Routing: **`src/app/[slug]/page.tsx`** (removed `src/app/works/[slug]/page.tsx`); **`/works`** list unchanged

### Content pipeline
- Refined MD: originally `/Users/spagett/Downloads/files (3)/*-refined.md`
- Parsed JSON: `src/content/case-studies/generated/*.json`
- Regenerate: `node scripts/generate-case-study-chapters.mjs`
- Per-project TS: `src/content/case-studies/{plinto,powermatch,...}.ts`
- Registry: `src/content/case-studies/index.ts`

### Assets
- Ageras case images: `public/images/works/ageras/` (many from `portfolio-redesign-gentle/public/ageras/`)
- Project thumbs / list grids: `public/images/works/` + `list/{slug}/`

## Likely next session
1. Hero **ImageRow** (or skip) per project
2. Chapter **imageRows** from gentle/public folders or Framer exports
3. **Next project** footer per case study (title + href from `projects.nextSlug`)
4. **Chapter → first ImageRow** spacing: user asked about large gap (Chapter **pb-section** 96px); optional rule: Chapter `:has(+ Image Row)` → **pb-gutter**
5. Left-column empty space beside long **Chapter** copy (headline left, sections right) — layout question, not a bug
6. Commit when ready (large untracked `public/images/works/`)

## Git
- Branch: **main**, many modified + untracked files, **not committed** this session

## Key files
| Area | Path |
|------|------|
| Case study shell | `src/components/work/CaseStudyPage.tsx` |
| Ageras content | `src/content/solara.ts` |
| Other case studies | `src/content/case-studies/` |
| Dynamic route | `src/app/[slug]/page.tsx` |
| Image row spacing | `src/app/globals.css` (Image row stack spacing) |
| Projects list data | `src/content/projects.ts` |
