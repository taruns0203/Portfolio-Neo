# Section decorations

Six original SVG shapes live in `public/assets/decorations/`: mint wave, yellow orbit, lavender petal, pink swoop, blue pebble, and yellow scallop. Colors follow the existing banner palette.

`SectionDecoration` assigns distinct pairings to the ten homepage sections below the hero. The shared `Section` accepts an optional typed `decoration` prop; other usages retain their existing behavior. The banner keeps its original artwork. Contact's old CSS corners were replaced to avoid duplicate decorations.

`src/styles/section-decoration.css` clips only the decorative layer, positions it behind content, disables pointer events, and scales down the artwork on mobile. It does not change container spacing or animate. Decorations have empty alt text and an aria-hidden wrapper.

Validation: TypeScript, ESLint, and webpack production build passed. Browser checks at 375, 768, 1024, and 1440px confirmed ten decorated sections, twenty loaded SVGs, no page overflow, and noninteractive decorative layers. Desktop/mobile writing previews were visually inspected; left corner petals were rotated for better visibility.
