# Tarun Sharma · Portfolio foundation

The portfolio now includes the Phase 1 design system, Phase 2 header and hero, and Phase 3 About section. Experience and Featured Projects are implemented in Phase 4. Employment details await confirmation, and project URLs remain unset. Writing remains a planned destination with an explicit notice. Contact and GitHub use the verified links in `src/config/site.ts`.

## Local development

Use Node 22.21+ and pnpm 11.25.0. With nvm installed:

```sh
nvm use
corepack enable
corepack prepare pnpm@11.25.0 --activate
pnpm install
pnpm dev
```

Open http://localhost:3000 and http://localhost:3000/design-system.

```sh
pnpm typecheck
pnpm lint
pnpm format:check
pnpm build
pnpm start
```

`pnpm format` formats source and documentation. Commit `pnpm-lock.yaml`; subsequent installs can use `pnpm install --frozen-lockfile`.

`next/font/google` downloads Space Grotesk, Inter, and JetBrains Mono during development/build and self-hosts them at runtime. The initial build needs access to Google's font endpoints.

## Internal showcase

`/design-system` is available in development. Production returns 404 unless the server is explicitly started with `ENABLE_DESIGN_SYSTEM=true`. It also sets `noindex, nofollow`. For local production QA:

```sh
pnpm build
ENABLE_DESIGN_SYSTEM=true pnpm start
```

Do not set that flag on the public portfolio deployment. This guard limits exposure; it is not an authentication mechanism.

## Architecture

- `src/app`: App Router, shared fonts/global CSS, minimal root, internal showcase.
- `src/components/ui`: ten reusable typed primitives. Server-compatible by default; React 19 refs pass through native props.
- `src/components/design-system`: showcase-only palette and a single client interaction demo.
- `src/styles`: semantic tokens, fluid typography roles, common interaction utilities.
- `src/lib/utils.ts`: `cn()` combines clsx and tailwind-merge.
- `src/config/site.ts`: shared site identity and metadata.
- `src/types`, `src/assets`: reserved for future shared types and source assets; no speculative abstractions.
- `docs`: design decisions, component guidance, validation evidence.

Next.js App Router, React Server Components, strict TypeScript, Tailwind v4 CSS-first theme configuration, ESLint flat config, and Prettier. No component framework, animation library, or global state library.

## References

The setup follows the official [Next.js installation guidance](https://nextjs.org/docs/app/getting-started/installation), [Tailwind PostCSS integration](https://tailwindcss.com/docs/installation/using-postcss), and [Tailwind theme variables](https://tailwindcss.com/docs/theme).

See [Design system](docs/DESIGN_SYSTEM.md), [Component guidelines](docs/COMPONENT_GUIDELINES.md), and [Validation](docs/VALIDATION.md).

## Tooling compatibility

TypeScript is pinned to 6.0.x for the current lint parser. ESLint 9 remains necessary for Next.js's React/import/accessibility plugin peer ranges; npm marks that major deprecated. See the validation notes before upgrading these together.

## Tech Stack and Achievements

Phase 5 adds typed technology and achievement data, SVG illustrations, and responsive sections after Projects. See [Phase 5 implementation and validation](docs/PHASE_5.md).
