# Design system

“Playful engineering meets polished minimalism.” The composition is approximately 50% modern minimalism, 30% playful neo-brutalism, and 20% bento. These are art-direction priorities, not quotas. The page should breathe. There is no dark theme in Phase 1.

## Source of truth

`src/styles/tokens.css` defines semantic color, spacing, radius, shadow, type-size, and motion tokens using Tailwind v4 `@theme`. Fonts use `@theme inline` to resolve variables supplied by `next/font`. Components reference semantic utility names or CSS variables. Palette hex labels in the showcase are documentation, never styling inputs; update them when changing colors.

The default Tailwind color/radius/shadow namespaces are reset so unrelated preset colors and finishes cannot accidentally enter the design language. A transparent background and inherited colors remain available.

## Color

| Role               | Token                          | Value                                 |
| ------------------ | ------------------------------ | ------------------------------------- |
| Page               | background                     | #FFFCF7                               |
| Neutral surface    | surface                        | #FFFFFF                               |
| Primary text       | foreground                     | #191724                               |
| Secondary text     | muted-foreground               | #5F5B68                               |
| Brand/action       | primary                        | #7137E8                               |
| On violet          | primary-foreground             | #FFFFFF                               |
| Soft brand         | primary-soft                   | #C7A7FF                               |
| Warm emphasis      | yellow                         | #FFDA58                               |
| Supporting accents | pink / mint / blue / coral     | #FFADD1 / #A8EDD8 / #B8DFFF / #FF987A |
| Soft panel         | lavender-surface               | #F3EAFF                               |
| Content boundary   | border                         | #DEDBE2                               |
| Strong boundary    | border-strong                  | #191724                               |
| Keyboard indicator | focus                          | #7137E8                               |
| Feedback           | success / error / warning      | #21634C / #B4233C / #835600           |
| Disabled           | disabled / disabled-foreground | #EEEBEF / #6C6673                     |

Every name is prefixed with `--color-`. Use dark ink on pastels and white on violet. Status colors are designed for text on ivory/white, not as arbitrary background/text combinations. Pair status with text or icons. The subtle border groups content; it is not a sufficient standalone boundary for an input. Use the strong boundary for interactive control edges. Disabled text stays readable rather than becoming faint.

## Typography

Space Grotesk for headings, Inter for reading, JetBrains Mono for code/metadata. Fonts are downloaded at build time and self-hosted. Variable fonts avoid multiple weight files. Display uses 700 weight; Space Grotesk does not need a synthetic extra-bold weight.

| Class           | Size                          | Line height |
| --------------- | ----------------------------- | ----------- |
| type-display-xl | clamp(3.5rem, 6vw, 6rem)      | 1.04        |
| type-display-lg | clamp(2.75rem, 5vw, 4.75rem)  | 1.07        |
| type-h1         | clamp(2.5rem, 4.5vw, 4.25rem) | 1.1         |
| type-h2         | clamp(2rem, 3.5vw, 3.25rem)   | 1.15        |
| type-h3         | clamp(1.5rem, 2.5vw, 2rem)    | 1.25        |
| type-body-lg    | 1.125rem                      | 1.7         |
| type-body       | 1rem                          | 1.75        |
| type-small      | .875rem                       | 1.65        |
| type-caption    | .75rem                        | 1.5         |

Headings use slightly negative tracking and balanced wrapping. Body content should remain within `max-w-prose` (65ch). Typography classes describe presentation, not heading semantics: maintain one h1 and logical h2/h3 nesting independently. Captions are for secondary metadata, never primary instructions.

## Spacing and layout

The base spacing unit is 4px. Preferred steps: 4, 8, 12, 16, 24, 32, 48, 64, 80, 96, and 128px. Other multiples of four are available when needed, including 20px mobile gutters and 44px hit targets.

Container is 1280px maximum outer width, including its gutters. Mobile gutters are 20px; at 768px, 32px; at 1024px, 48px. `Section` standard padding is 56/72/96px per side across those breakpoints; roomy is 72/96/128px. Use at least 24–32px between related cards and larger spacing between content groups. Content-height layouts must grow naturally.

Default to editorial columns and borderless text. Bento is appropriate for a small number of related items with unequal importance. Give it one large anchor and a few supporting cells. Stack in document order on mobile; never use visual reordering that breaks the reading sequence.

## Finishes

Radii: sm 8px, md 12px, lg 20px, xl 28px, pill 9999px. Use md for controls, lg for most cards, xl for larger compositions.

Borders: minimal 1px subtle neutral; brutalist 2px ink; display 3px ink. Strong display borders are rare.

Shadows:

- Minimal: `0 8px 32px rgb(25 23 36 / .06)`.
- Brutalist: `4px 4px 0` ink.
- Brutalist large: `6px 6px 0` ink.
- Pressed: `1px 1px 0` ink.

Never apply hard shadows globally. Use one dominant emphasis per content group.

## Interaction and accessibility

Controls use 180ms transitions, visible 3px violet focus outlines with 4px offset, and native button/link semantics. Every button size is at least 44px high; icon-only controls need an accessible name. Links use underlines and minimum 44px height when standing alone. Inline prose links may follow natural line height.

Use `prefers-reduced-motion` to remove hover transforms, stop spinner rotation, shorten transitions, and disable smooth scrolling. Loading text and live status messages preserve meaning without movement. Buttons use native disabled state and `aria-busy` during loading. Do not convey success, warning, or errors through color alone.

The root layout has a skip link. Pages supply `main#main-content` with a programmatic focus target. Card containers are not pretend buttons: put a real link or button inside. Do not introduce positive tab indices. Use landmarks and label sections through their heading IDs.

Check at 375, 768, 1024, and 1440px, plus keyboard-only navigation and reduced-motion settings. Aim for WCAG AA: 4.5:1 normal text, 3:1 large text and meaningful UI boundaries. Verify new color pairings rather than assuming every token combination works.
