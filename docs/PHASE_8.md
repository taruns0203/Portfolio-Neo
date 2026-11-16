# Phase 8 — Blogs & Articles

Added `#writing` after Current Work, with the shared home container, editorial heading, supplied workspace artwork, and three article previews. Existing sections are unchanged; Contact was not added.

## Files

- `src/data/articles.ts`: typed article configuration; three supplied example topics are drafts.
- `src/components/sections/writing-section.tsx`: section composition.
- `src/components/writing/`: writing intro, article card, category badge, author metadata.
- `src/styles/writing.css`: responsive layout, card styles, and accessible link states using existing tokens.
- `src/app/writing/page.tsx`: real, statically rendered article index using the same data; explains that drafts are unpublished and provides a return link.
- `src/app/page.tsx`, `src/app/globals.css`: section and stylesheet integration.
- `src/config/site.ts`: Writing now targets the real section, removing the placeholder dialog and preventing duplicate writing IDs.
- `public/assets/blog/`: all 32 supplied assets copied unchanged. Renders SVG workspace, article illustrations, category/arrow icons, yellow doodle, and the provided avatar placeholder; reference crop is unused.
- `docs/phase8-desktop.png`, `docs/phase8-mobile.png`: verified production screenshots.

## Content and behavior

No confirmed published URLs, dates, reading times, or approved portrait were found. The three design topics remain Draft, with no article actions or invented metadata. The supplied avatar is a generic placeholder, not a portrait. Published URLs and verified metadata can later be added through configuration. Read All Articles links to `/writing`; Back to portfolio returns to `/#writing`.

The section and index use Server Components without added dependencies, animation, or client state. Artwork has intrinsic dimensions and lazy loading. All content text is HTML. Existing visible focus and reduced-motion rules remain in effect, and interactive targets are at least 44px tall.

## Spacing correction

The homepage section now uses `max-w-home`, matching adjacent sections, and 40px mobile / 48px tablet-and-desktop gaps between the introduction and cards. The standalone writing index retains its existing layout.

## Validation

TypeScript and ESLint passed on Node 22.21.0. Production build passed with `pnpm exec next build --webpack`, continuing the working build method used in earlier phases after the environment's Turbopack worker-port failure. No build settings were changed.

Chromium checks at 375, 768, 1024, and 1440px found no horizontal overflow, broken section images, or page errors. Article grids use 1/2/2/3 columns respectively. Preview screenshots were reviewed. The `/writing` CTA, return link, three draft labels, absence of draft links, single writing ID, and mobile index overflow were checked.

The vector artwork differs from the raster reference. No cross-browser, screen-reader, or field-performance audit was performed. Publication data remains intentionally unset.

Session preview: http://localhost:3004/#writing and http://localhost:3004/writing.
