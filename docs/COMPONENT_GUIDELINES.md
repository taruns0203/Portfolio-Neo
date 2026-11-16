# Component guidelines

Import primitives directly from `@/components/ui/<name>`. Components accept native HTML props, `className`, and React 19's native `ref` prop. `cn()` resolves conditional classes and Tailwind conflicts. Use CVA variants before reaching for class overrides. The primitives have no client directive; event handlers belong in a small client consumer, as demonstrated by `InteractionDemo`.

## APIs and intended use

| Component      | API                                                                                                                              | Use                                                                                                                                                    |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Button         | variant: primary, secondary, outline, brutalist, ghost, link; size: sm, md, lg; loading, loadingLabel, leadingIcon, trailingIcon | Native action, never navigation. Defaults to type=button. Loading disables activation and exposes aria-busy.                                           |
| Badge          | variant: lavender, yellow, mint, pink, blue, neutral, outlined                                                                   | Compact labels and metadata. A span, not a control.                                                                                                    |
| Card           | variant: minimal, outlined, brutalist, colored, elevated; hoverable                                                              | Related content. A div with no fake button semantics. Add an actual link for navigation.                                                               |
| Container      | Native div props                                                                                                                 | Max 1280px and responsive gutters. Nest Sections inside one page Container or place a Container inside each full-width section; avoid doubled gutters. |
| Section        | spacing: standard, roomy, none                                                                                                   | A semantic section. Supply aria-labelledby pointing to a real heading, or aria-label.                                                                  |
| SectionHeading | eyebrow, heading, highlight, description, action, headingId, as: h2 or h3                                                        | Group heading with optional trailing highlighted words and action. Match headingId to Section aria-labelledby.                                         |
| HighlightText  | variant: marker, pill, underline                                                                                                 | Short text emphasis. Use one short segment, not full paragraphs. Does not imply semantic importance; use strong/em separately if needed.               |
| IconBadge      | variant: lavender, yellow, mint, pink, blue, coral; size: sm, md, lg; label                                                      | Decorative by default. Supply label when the icon conveys independent meaning. Noninteractive; never use it as an icon button.                         |
| Divider        | variant: minimal, decorative                                                                                                     | Semantic thematic break. Add aria-hidden for a purely decorative separator.                                                                            |
| Surface        | tone: base, white, lavender, yellow, pink, mint, blue, coral                                                                     | Background wrapper without automatic borders, padding, or radius. Compose spacing explicitly.                                                          |

## Examples

```tsx
<Section aria-labelledby="example-title">
  <SectionHeading
    headingId="example-title"
    eyebrow="A useful label"
    heading="Thoughtfully"
    highlight="put together."
    description="A short introduction that helps the reader."
  />
  <Card variant="outlined">
    <h3 className="type-h3">A clear title</h3>
    <p className="mt-4 text-muted-foreground">Supporting content.</p>
  </Card>
</Section>
```

```tsx
// Inside a client consumer; only the consumer needs "use client".
<Button
  loading={saving}
  loadingLabel="Saving…"
  onClick={save}
  trailingIcon={<ArrowRight />}
>
  Save changes
</Button>
```

Icons supplied to Button are hidden from assistive technology; visible text carries the name. For an icon-only button, supply `aria-label` and enough horizontal padding to retain a 44px width. Supply an external live region when async completion matters; `aria-busy` is not a completion announcement.

For navigation use Next Link or an anchor with `text-link`; `variant="link"` still renders a button and is only for an action styled like text. Avoid nesting interactive controls. Card hover is optional and uses focus-within too; use it when the card contains an actionable link.

## Choosing visual emphasis

Start with minimal content and generous whitespace. Add an outlined card only when grouping would otherwise be ambiguous. Use elevated when gentle depth is useful. Use colored for a thematic shift. Use brutalist for an important featured card or primary action, preferably one per nearby group. Do not combine multiple competing hard shadows, bold borders, and decorative graphics in the same composition.

Violet signals primary actions. Yellow marks a high-value phrase or playful action. Mint, pink, blue, and coral should organize content or add a controlled accent. They are not automatic mappings to success, error, or warning; use semantic feedback tokens for that. Reuse an accent within one idea rather than distributing all colors evenly.

## Keeping the system consistent

- Reference semantic utilities (`bg-surface`, `text-muted-foreground`) instead of arbitrary color literals.
- Change tokens centrally; keep showcase labels and documentation synchronized.
- Use typography roles and spacing tokens instead of per-section inventions.
- Keep headline text concise and body lines bounded; let cards grow with content.
- Prefer one purposeful bento composition to rows of equal cards.
- Preserve native refs, attributes, keyboard support, and focus rings when extending components.
- Do not add effects, client boundaries, or state libraries unless interaction requires them.
- Update `/design-system` when adding a primitive variant; test small screens, keyboard focus, contrast, and reduced motion.

## Scope

This release is a foundation and an internal style guide. It intentionally stops before real portfolio sections, CMS integration, external form submission, analytics, dark mode, and animation libraries. No reference screenshots were supplied; the written design brief is the source of visual direction.
