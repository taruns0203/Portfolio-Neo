# Phase 4: Experience and Featured Projects

Implemented after About, using the existing Section, Container, Badge, Card, HighlightText, typography, and color tokens. All new components are Server Components. No packages were added.

## Exact source changes

Created:

- `src/components/sections/experience-section.tsx`
- `src/components/sections/projects-section.tsx`
- `src/components/experience/experience-timeline.tsx`
- `src/components/experience/experience-timeline-item.tsx`
- `src/components/projects/featured-project-card.tsx`
- `src/data/experience.ts`
- `src/data/projects.ts`
- `src/styles/experience-projects.css`
- `docs/PHASE_4.md`

Updated `src/app/page.tsx`, `src/app/globals.css`, `src/config/site.ts`, and `README.md`. Also made the existing About image’s automatic height explicit to address a Next.js development warning. Copied all 21 supplied asset files unchanged into `public/assets/experience-projects/`. Added `docs/phase4-desktop.jpg` as visual evidence.

## Content accuracy

The user confirmed that verified career details and project URLs are not currently available. Timeline roles and employers are neutral placeholders, explicitly labeled for confirmation. Reference dates are retained only in a DESIGN_PLACEHOLDERS source comment, never presented as employment facts. Replace the typed data and set confirmed=true when actual resume details arrive.

All three project URLs remain null. Cards have no fake links, hover-lift behavior, or external-link icons. The project descriptions are the supplied brief's content. Thumbnail alt text explicitly describes illustrations, not deployed-site screenshots.

## Assets and visual choices

The original experience crop preserves better edges than the provided cutout. It sits on the warm ivory section with a soft CSS edge mask. Its existing orb and burst are retained; only one separate lavender arrow is added. Project previews retain their complete laptop screens through object-fit:contain. Raster concept assets retain their source resolution and cannot supply the detail of actual production screenshots.

## Verification

TypeScript, ESLint, and the production build passed. Responsive document overflow checks covered 375, 768, 1024, 1440, and 1728px. Project cards stack on mobile, use two columns on tablet and three from 1024px, with an editorial fourth column from 1440px. Employment pills reflow inside cards on narrow screens.

No automated screen-reader or cross-engine audit was performed. Preview: http://127.0.0.1:3000/#experience and /#work. Run `nvm use` then `pnpm dev` if restarting.
