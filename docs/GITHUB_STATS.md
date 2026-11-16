# GitHub Stats

The section follows Projects and precedes Tech Stack. It shares the site's home container, gutters, section spacing, fonts, and colors. Supplied mascot artwork includes its yellow backdrop, so no second orb is layered. Mockup chart images and statistics are never rendered.

## Configuration

The username defaults to the existing `site.profileLinks.github` profile in `src/config/site.ts`. Optional `GITHUB_USERNAME` overrides it; usernames are validated before constructing API/profile URLs. An explicitly empty or invalid override disables data and omits the profile CTA. If copying `.env.example`, remove the empty username assignment to keep the site-config fallback, or fill it with the desired account.

`GITHUB_TOKEN` is optional, server-only, and needed for the authenticated contribution calendar. Store it in ignored local environment configuration or deployment secrets. Never use a NEXT_PUBLIC prefix or commit a token. No token values are sent to components or logged. Setting a token requires a rebuild/restart or deployment environment refresh.

## Data and caching

- Public repository count and followers: GitHub REST `/users/{username}`.
- Stars: sum across all public, owned, non-fork repositories from paginated REST lists (100 per page). Public repository count includes forks; star and language totals exclude them, as labeled.
- Languages: each eligible repository's language byte totals, aggregated into the five largest languages plus Other; percentage text rounded to one decimal. This measures code bytes, not proficiency or time spent. React is not inserted as a language.
- Contributions: authenticated GraphQL `contributionsCollection` calendar, rolling year through UTC midnight. Query dates are stable for a given UTC day. The unauthenticated REST events endpoint is not used as a substitute.
- Requests use Next.js force-cache and 3600-second revalidation. The homepage also revalidates hourly. No fabricated last-updated timestamp or real-time claim.
- Public API requests can hit unauthenticated rate limits. Requests are bounded to four concurrent language calls, a 25-second overall fetch signal, and 50 repository pages. If pagination cannot complete, stars and languages remain unavailable rather than publishing incomplete totals. If language requests fail after star aggregation, verified stars remain visible.
- Errors, 403/429 responses, missing permissions, and malformed data preserve independent panels and never deliberately throw through the homepage. Ready/partial/unavailable/loading display states are supported. The production page is statically rendered and revalidated; there is no client polling.

References: [REST repository endpoints](https://docs.github.com/en/rest/repos/repos), [GraphQL contribution types](https://docs.github.com/en/graphql/reference/users).

## Files

- `src/lib/github.ts`: server-only fetching, username validation, aggregation, and fallback handling.
- `src/types/github.ts`: typed data model.
- `src/components/sections/github-stats-section.tsx`: intro, mascot, cards, status and panels.
- `src/components/github/`: API-driven heatmap and CSS donut with text legend.
- `src/styles/github.css`: responsive section and charts.
- `src/app/page.tsx`, `src/app/globals.css`, `.env.example`: integration and configuration.
- `public/assets/github/`: supplied assets copied unchanged; decorative chart examples retained as unused assets only.
- `scripts/check-github.mjs`: deterministic API fixtures; run with Node 22 from repository root.

The section and charts are Server Components, with no extra chart library. Each contribution cell exposes its date and count, the scroll region is keyboard-focusable, and the donut has a full text legend. Only the heatmap scrolls horizontally on narrow screens.

## Validation

TypeScript, ESLint, and webpack production build passed. Chromium checks at 375/768/1024/1440px found no horizontal page overflow, broken section artwork, or page errors. Real REST data rendered successfully; contributions use the honest unavailable state because no token was configured.

Fixture tests cover missing/invalid username, missing token, successful GraphQL, pagination beyond 100 repositories, fork/private exclusion, empty repositories, 403/429/500, network errors, incomplete pagination, language failure, and stable Other aggregation. Separate browser-only fixtures exercise 371 day cells, keyboard focus, huge statistic values, and long language names. Fixture data is never stored in production config or shown on the live preview.

No authenticated live calendar test, cross-browser audit, or screen-reader audit was performed. Screenshots: `github-desktop.png`, `github-mobile.png`. Preview: http://localhost:3004/#github-stats.
