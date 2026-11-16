# Article experience verification

Verified on 16 November 2026 against the production build.

## Result

The MDX demonstration is available at `/blogs/mastering-core-web-vitals`. Other article routes preserve their draft outlines. The article uses the existing navigation, fonts, tokens, and blog cards, with a reading column capped at 720px and a sticky desktop table of contents.

The server-only loader in `src/lib/article-content.ts` compiles allowlisted local MDX, derives stable heading IDs and reading time, and supplies typed metadata. Add future article files to `src/content/articles` and the loader's explicit source map, alongside their listing metadata in `src/data/blogs.ts`. Only trusted local content should enter this compiler. Demo labels follow the `demonstration` metadata flag; the current demo has no invented author or publication date.

Reusable components cover captioned images, wide diagrams, galleries with modal viewing, keyboard-operated image comparison, highlighted code with copying, callouts, scrollable tables, quotes, and opt-in YouTube embeds. Video embeds make no provider request before activation.

## Checks

- `pnpm lint`: passed.
- `pnpm typecheck`: passed.
- `pnpm format:check`: passed.
- `node --experimental-strip-types --test scripts/check-article.mjs scripts/check-blogs.mjs scripts/check-github.mjs`: all 10 tests passed.
- `pnpm build`: default Turbopack production build passed, including static article generation. Earlier port-permission failures were resolved by running with permission to create local workers.
- `scripts/check-article-browser.mjs`: passed against the production server in Chromium.
- `scripts/check-blogs-browser.mjs`: passed existing listing regression checks for search, filters, pagination, browser history, keyboard/focus behavior, mobile navigation, eight widths, all seven article routes, 404s, and HTML without JavaScript; no page errors.

Browser coverage includes MDX rendering, canonical URL and factual JSON-LD, code highlighting and clipboard actions, TOC anchors and active section, reading progress, gallery keyboard dismissal and focus restoration, image comparison keyboard input, reduced motion, image decoding, scrollable tables, listing/detail navigation, unknown-slug 404s, and article HTML with JavaScript disabled. No page errors were observed.

Responsive checks passed at 320, 375, 768, 1024, and 1440 CSS pixels: no document overflow, reading width at most 720px, images rendered, and sticky desktop reading tools. Desktop and mobile screenshots were visually reviewed. The browser test excludes the closed lightbox image from visible-page checks and waits for image decoding before capturing evidence.

## Evidence and limits

Screenshots are saved as `article-320.png`, `article-375.png`, `article-768.png`, `article-1024.png`, and `article-1440.png` in this directory.

These checks are not a complete WCAG certification. Screen-reader testing, Safari/Firefox coverage, live third-party video playback, and field performance measurement were not performed. The demo deliberately uses labeled placeholder artwork and makes no measured performance claims. This work was not deployed.
