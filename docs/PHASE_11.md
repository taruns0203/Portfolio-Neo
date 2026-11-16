# Phase 11 — Portfolio DevTools

Implemented on 16 November 2026 using the supplied Phase 11 brief and visual assets.

## Experience

A global lavender launcher opens a right-docked native dialog. Desktop keeps part of the portfolio visible; narrow screens use a full-height panel and section selector. The header stays fixed while content scrolls. Keyboard focus stays inside, Escape/backdrop/close dismiss the panel, focus returns to the launcher, and document scrolling is restored. Footer spacing reserves room for the launcher.

Eight functional sections cover Overview, Architecture, Performance, Tech Stack, Code Explorer, Design Decisions, Experiments, and About This Site. Architecture nodes reveal implementation details. Decisions expand to explain context and tradeoffs. Experiments change only their own preview, honoring system reduced motion. The supplied character appears inside About This Site; existing homepage artwork is preserved.

## Confirmed facts and unavailable data

- Installed package versions are read on the server and passed as four public strings: Next.js 16.4.6, React 19.3.1, TypeScript 6.0.3, and Tailwind CSS 4.3.5.
- The app uses App Router, server components, typed local content, trusted local MDX, and server-side GitHub requests. Home/GitHub revalidation is configured for one hour; articles use static slug generation.
- No portfolio Lighthouse/CWV measurement, deployment provider, public portfolio repository, or CodeQuest destination was verified. The UI shows explicit unavailable states, without fabricated numbers or links.
- Career project performance is clearly separate from measurements of this portfolio.
- No new dependencies were added. The drawer loads on demand; the code viewer and its TypeScript syntax highlighter are deferred until requested.

## Source map

- `src/components/devtools/devtools-launcher.tsx`: global entry point and deferred drawer.
- `src/components/devtools/devtools-drawer.tsx`: modal lifecycle, focus wrapping, section navigation and expansion.
- `src/components/devtools/devtools-panels.tsx`: eight content sections and contained experiments.
- `src/components/devtools/code-explorer.tsx`: curated file selection, highlighted lines and clipboard feedback.
- `src/data/devtools.ts`: editable architecture, decisions, performance approach, code excerpts and optional public destinations.
- `src/types/devtools.ts`: typed component data.
- `src/lib/devtools-model.ts`: server-only installed-version extraction.
- `src/styles/devtools.css`: scoped visual styles, responsive layout and launcher clearance.
- `src/app/layout.tsx` and `src/app/globals.css`: global integration.
- `public/assets/devtools/`: supplied asset pack. Reference charts and mockup numbers are not presented as data.

The code explorer exposes only authored, allowlisted excerpts stored in its data module. There is no filesystem endpoint, terminal execution, arbitrary code evaluation, or environment-variable serialization. Portfolio excerpts are distinguished from the illustrative example. Source paths are explanatory labels, not unverified repository links.

## Verification

- Strict TypeScript, ESLint, Prettier and default Turbopack production build passed.
- Eleven Node tests passed across article, blog, GitHub fixtures and DevTools empty-code/no-public-repository rendering.
- Chromium interaction checks cover open/close, Escape, backdrop, forward/reverse keyboard focus wrapping, focus restoration, scroll locking, expansion, all eight sections, architecture details, missing data states, copying/highlighting, decision cards, preview styling, reduced motion, and links to existing sections.
- Responsive coverage: 320, 375, 768, 1280 and 1440 CSS pixels, including overflow assertions for every section. Screenshots are in `docs/devtools-verification/`.
- Existing article browser regression checks passed with the global launcher present, including gallery behavior, clipboard, TOC, five widths, images, navigation and no-JavaScript content.

Commands: `pnpm typecheck`, `pnpm lint`, `pnpm format:check`, `pnpm build`, and `node --experimental-strip-types --test scripts/check-article.mjs scripts/check-blogs.mjs scripts/check-github.mjs scripts/check-devtools.mjs`. Browser scripts use an existing Playwright installation via `PLAYWRIGHT_MODULE` and `CHROMIUM_EXECUTABLE`; `DEVTOOLS_BASE_URL` selects the production server.

Development testing caught and fixed a modal cleanup issue under React effect replay and added explicit Tab wrapping to keep keyboard focus inside the page dialog. Tests wait for CSS transitions and React cleanup before checking final state.

This is not a complete WCAG certification. Safari/Firefox, real assistive technology, field performance and production hosting behavior were not tested. The feature has not been deployed.
