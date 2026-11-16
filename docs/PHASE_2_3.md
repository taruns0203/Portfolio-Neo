# Header, hero, and About implementation

The root now contains Header, Hero, and About only. Header uses the existing Button variants and Container; Hero reuses Badge, Section, and Container. Mobile navigation is a small client component with Escape dismissal. Planned Work, Experience, and Writing links open explicit native dialog notices. About now links to the real section. GitHub and contact are configured from the user's supplied destinations.

## Files

- `src/components/layout/{site-header,site-link,destination-notices}.tsx`
- `src/components/home/{hero-section,tech-pill}.tsx`
- `src/components/sections/about-section.tsx`
- `src/components/about/{about-intro,about-illustration,about-feature-card,about-metrics}.tsx`
- `src/data/about.ts`
- `src/styles/{home,about}.css`
- Updated `src/app/{page.tsx,globals.css}`, `src/config/site.ts`, `src/styles/{tokens,utilities}.css`, `src/lib/utils.ts`, and the design-system palette.
- Copied supplied assets unchanged into `public/assets/hero/` and `public/assets/about/`.

About uses Server Components throughout. It keeps the supplied biography and four verified metrics. The image reference's different example metrics were intentionally not copied. Mobile reading order is introduction, illustration and statistics, then features. Desktop places the features under the introduction and statistics beneath the illustration.

## Validation

Strict TypeScript, ESLint, and production build passed after the combined implementation. Browser inspection verified loaded About assets, real text headings, and no horizontal document overflow at 375, 768, 1024, and 1440px. Header/Hero were also checked at 320 and 1774px during Phase 2. Mobile menu Escape, closing on navigation, dialog dismissal, and focus restoration were exercised. GitHub and mailto href values match the supplied destinations; no email was sent.

The supplied PNGs are raster cutouts and retain their original edge quality. No new imagery or dependencies were introduced. Reduced-motion CSS is inherited; OS preference switching and screen-reader testing were not performed. Preview runs locally at http://127.0.0.1:3000/; About is at /#about. Use Node from `.nvmrc` and `pnpm dev` to restart it.
