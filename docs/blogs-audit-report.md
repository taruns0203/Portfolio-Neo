# Blogs audit report

Date: 14 November 2026. Scope: `/blogs`, existing draft detail routes, and their integration with the portfolio.

## 1. Executive summary

**Ready with minor caveats as a draft journal.** Search, filters, pagination, navigation, initial HTML rendering, and responsive layouts have been corrected and verified. This is not a finished publishing system: all seven records remain sample/draft outlines. No article content, author, publication date, or production domain was invented.

Verified issues fixed:

- **P1:** Search omitted category names; independently stored input could become stale on history navigation. URL updates replaced category/page history and navigated through the server on every keystroke.
- **P2:** The static Suspense fallback omitted the listing from initial HTML. Results now render at request time, with browser-only history updates afterward.
- **P2:** Undefined `rounded-2xl` classes (the project resets Tailwind radii), custom palette literals, inconsistent category badges, small controls, clipped titles, and image overlap with card chrome.
- **P2:** Unnecessary below-fold image priority, deprecated image props, timezone-dependent dates, draft indexing, and SVG social-preview metadata.

Discovery: Next.js 16.4.6, React 19.3.1, TypeScript 6, Tailwind 4 CSS-first theme, App Router. Content is local typed data in `src/data/blogs.ts`; no MDX or CMS. About and Projects are homepage sections, not independent routes. Reviewed root layout, header/link/footer integration, homepage sections, design-system/component docs, shared styles/tokens, writing badges, blog components, and assets. No original Antigravity prompt/reference was found in the provided project. Existing homepage screenshots and the running homepage supplied comparison evidence.

Pre-change audit checklist: inspect routes/content and shared tokens; check URL/filter/pagination logic; validate destinations/assets/drafts; check semantics, focus and motion; assess initial rendering/metadata; run checks and browser widths; inspect screenshots; review changes against the baseline.

## 2. Design system compliance

| Requirement                | Result                      | Evidence / action                                                                                                   |
| -------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Neo-brutalist identity     | Pass                        | Existing ink borders, offset shadows, pastel surfaces, illustrated cards retained                                   |
| Font family                | Pass                        | Unchanged Space Grotesk, Inter, JetBrains Mono via root `next/font`                                                 |
| Heading hierarchy / sizing | Pass                        | One h1; named listing h2 before card h3; hero uses existing display-size token; full card titles                    |
| Palette / background       | Pass after fix              | CSS token mixes replace literal card background colors                                                              |
| Borders / hard shadows     | Pass                        | Existing 2/3px borders and brutalist shadow tokens retained                                                         |
| Radius conventions         | Pass after fix              | Undefined 2xl utility replaced with defined xl token                                                                |
| Buttons / links / badges   | Pass after fix              | Existing interaction treatment retained; shared Badge primitive and one category tone map                           |
| Spacing / width            | Pass                        | Existing gutters, `max-w-home`, responsive spacing and split grid retained                                          |
| Icons / decoration         | Pass after fix              | Lucide and existing SVGs; artwork now reserves room for window dots and arrow                                       |
| Hover / focus / pressed    | Pass for inspected controls | Native semantics, inherited violet outline, pressed filters; reduced-motion transforms suppressed within blog pages |
| Mobile navigation          | Pass                        | Shared menu; active Blogs link, Escape close/focus return verified                                                  |
| No new visual system       | Pass                        | No fonts, dependencies, gradients or global theme changes                                                           |

## 3. Functionality

- Counts derive from data: All 7, Frontend 2, System Design 1, Performance 3, Engineering 1. Featured content deliberately also appears in the complete listing.
- Search matches title, excerpt, tags and category; case and surrounding whitespace are ignored for matching. Input preserves typed whitespace.
- Canonical interaction parameter is `search`; existing `q` links remain supported. Unknown query parameters are preserved.
- Native History API integrates with Next's search-parameter hook: category/page/reset actions push history; typing replaces the current entry to avoid an entry per keystroke. Back/Forward restores input, filters and results. No network navigation is needed for filtering.
- Six results per page; page 2 contains the remaining article. Filtering resets page; invalid/noninteger/out-of-range page values are safely clamped for rendering. The incoming invalid URL is not automatically rewritten.
- Combined filters, clear, reset and no-results state passed browser checks. Empty category data tested in unit tests (all real categories currently contain articles).
- All seven existing slug routes returned 200; an unknown slug returned HTTP 404. Draft outlines were preserved.
- Header section destinations resolve to `/#about`, `/#work`, etc.; portfolio controls link to `/#work`, which exists. No literal placeholder `href="#"` in blog functional UI. Not every homepage section link was clicked in E2E.

## 4. Responsive verification

Chromium production-browser checks at **320, 375, 430, 768, 1024, 1280, 1440 and 1920px**, height 900px:

- Document width never exceeded viewport width.
- Images completed loading with nonzero natural width at every tested breakpoint.
- Full-page screenshots captured at every width in `docs/blogs-audit/` and reviewed in a contact sheet. Mobile 375px reviewed at readable full resolution; earlier 320/1440 captures also informed the fixes.
- Hero/featured content stacks below desktop, filters wrap, search remains visible, pagination fits, and titles wrap rather than truncate.
- Retained original split-grid behavior, including an incomplete final row at some widths; this is design intent, not missing articles.
- Mobile menu and Escape tested at 375px. Physical touch, Safari, Firefox, landscape devices and browser zoom were not tested.

Screenshots: [375px](blogs-audit/blogs-375.png), [768px](blogs-audit/blogs-768.png), [1440px](blogs-audit/blogs-1440.png), [homepage comparison](blogs-audit/home-1440.png). The same folder contains all eight widths.

## 5. Accessibility

Added a named listing section and polite result count, retained `aria-pressed` filters and `aria-current` pagination, and focused the listing heading on page changes. Search now names all searchable fields. Clear/reset/filter targets are at least 44px; active navigation retains a usable height. Duplicate card-image titles are decorative empty alt text; existing meaningful hero alt remains. No clickable divs or nested controls introduced.

Keyboard Enter activates a filter, its computed focus outline is solid, and the mobile menu restores focus on Escape. Reduced-motion hover resolves to no movement. These are targeted checks, not a complete screen-reader or WCAG certification.

Calculated token contrast: ink/white 17.66:1, muted/white 6.60:1, muted/page 6.45:1, disabled text/background 4.69:1, violet/white 6.15:1. Category ink/pastel pairs range 10.22–15.15:1. These pass AA normal-text thresholds; not every decorative/opacity combination was measured.

## 6. Performance and SEO

- Removed unneeded memoization/callback wrappers over seven records; one pure filter/pagination helper supports direct regression tests. No new dependencies or state library.
- Listing initial HTML now contains actual query-filtered articles, verified with JavaScript disabled. This intentionally changes `/blogs` from static output to request-time rendering; hosting must support the existing Next server runtime. Hero and featured structure remain server components.
- Removed three unnecessary grid image priority hints. Existing above-fold images use eager loading instead of deprecated `priority`. SVGs are small local assets (each occupies 4KB or less on disk); reserved aspect ratios remain.
- Fonts and shared layout unchanged. No measured LCP, CLS, INP, Lighthouse score, or bundle-size improvement is claimed; production field metrics remain a follow-up.
- Existing canonical URLs reuse root `metadataBase` (`https://tarunsharma.dev`); no domain invented. Added explicit Twitter summary metadata. Removed draft SVG OG image declarations rather than claiming unsupported SVGs are valid social previews; raster social artwork remains optional follow-up.
- Draft detail pages have `noindex, follow`. Publication dates remain null and draft labels remain visible. Date formatting explicitly uses UTC to avoid server/client day shifts.
- No Article JSON-LD was added for unpublished outlines. There is no existing sitemap integration; add published routes when actual articles are ready.

## 7. Code quality and changed files

Source changes are limited to:

- `src/app/blogs/page.tsx`, `src/app/blogs/[slug]/page.tsx`: initial rendering and metadata.
- `src/components/blogs/blogs-client-container.tsx`: URL-driven state, simpler handlers, result semantics.
- `src/lib/blog-results.ts` (new): filtering and bounded pagination.
- `src/components/blogs/blog-category-badge.tsx` (new): existing Badge primitive with consistent tones.
- `src/components/blogs/blog-card.tsx`, `blog-grid.tsx`, `blog-hero.tsx`, `blog-filters.tsx`, `featured-article.tsx`, `empty-state.tsx`: focused visual/accessibility/image changes.
- `src/data/blogs.ts`: UTC date formatting only; article content unchanged.
- `src/styles/blogs.css`: tokens, control sizing, headline sizing, wrapping, reduced motion.
- `scripts/check-blogs.mjs`, `scripts/check-blogs-browser.mjs` (new): regression verification.
- This report and `docs/blogs-audit/*.png` evidence.

No package or lockfile changes. This directory has no `.git`, so `git status` and a Git diff were unavailable. Compared source against a pre-edit copy in `/tmp/blogs-audit-baseline` using `diff -rq` / `diff -ru`; changes were confined to the files above. No unrelated source files changed.

## 8. Testing evidence

Commands used Node **22.21.0** by prepending its nvm bin path (the shell default was Node 15).

| Command / check                                                  | Actual outcome                                                                                 |
| ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `pnpm lint`                                                      | Pass, zero warnings                                                                            |
| `pnpm typecheck`                                                 | Pass                                                                                           |
| `pnpm format:check`                                              | Pass                                                                                           |
| `node --experimental-strip-types --test scripts/check-blogs.mjs` | 6/6 tests pass; harmless Node module-type inference warning                                    |
| `pnpm build` (Turbopack)                                         | Failed: worker port binding denied (`Operation not permitted`); same result on escalated retry |
| `pnpm exec next build --webpack`                                 | Pass, including TypeScript and static generation; final build repeated after styling fixes     |
| `pnpm start --hostname 127.0.0.1 --port 3100`                    | Production preview started successfully                                                        |
| `node scripts/check-blogs-browser.mjs` with runtime paths below  | Pass against final production build; no page-error events                                      |
| Contrast calculation                                             | Text pairs listed above meet AA                                                                |
| Baseline source diff                                             | Only scoped blog source changes                                                                |

Browser script uses an existing Playwright installation without adding a project dependency. Reproduce with installed Playwright, or set `PLAYWRIGHT_MODULE` to its `index.mjs` and `CHROMIUM_EXECUTABLE` to a compatible browser. This run used:

```sh
export PATH=/Users/taruns117/.nvm/versions/node/v22.21.0/bin:$PATH
export PLAYWRIGHT_MODULE=/Users/taruns117/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs
export CHROMIUM_EXECUTABLE=/Users/taruns117/Library/Caches/ms-playwright/chromium_headless_shell-1248/chrome-headless-shell-mac-arm64/chrome-headless-shell
node scripts/check-blogs-browser.mjs
```

The suite verifies listing/featured rendering, every category, search and combined empty states, clear/reset, legacy query URLs, history restoration, pagination, keyboard/focus, mobile navigation, reduced motion, eight widths, loaded images, seven detail routes, HTTP 404 and no-JavaScript initial results. Early test iterations exposed asynchronous assertion timing and an equivalent identity transform; tests were corrected to wait for actual state and accept a zero-movement identity matrix. The final run passed.

No existing test framework was present. Node's built-in test runner was used for focused behavior tests. No accessibility scanner, screen reader, field performance measurement or cross-browser matrix was run.

## 9. Remaining issues

| Severity                            | Location                                             | Next action                                                                                                                                                  |
| ----------------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| P1 if marketed as finished articles | `src/data/blogs.ts`, `src/app/blogs/[slug]/page.tsx` | Owner review and supply real article bodies, validated claims, dates and reading times before publication. Current routes intentionally show draft outlines. |
| P2 environment/build caveat         | Default `pnpm build` / Turbopack worker startup      | Rerun default build in deployment CI with normal worker permissions, or explicitly use the verified webpack build. Default script was not silently changed.  |
| P2 verification limit               | Blog UI                                              | Cross-browser, zoom, assistive-technology and field CWV checks before claiming full WCAG/performance compliance.                                             |
| P3                                  | Blog metadata / missing sitemap                      | Supply raster share images and integrate published articles with a sitemap when publishing.                                                                  |
| P3                                  | `src/data/blogs.ts` model                            | A future published status needs a real body renderer; the existing detail template is draft-only. Do not flip status alone.                                  |

## 10. Final verdict

**Ready with minor caveats for the existing draft-journal scope**, using the verified webpack production build. No demonstrated interaction or responsive blocker remains in tested Chromium scenarios. A completed public article library and a clean default Turbopack CI run are not claimed. Manual review should confirm the draft presentation, token-aligned visual adjustments and request-time rendering tradeoff.
