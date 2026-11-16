import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Asterisk,
  Check,
  Code2,
  Command,
  Layers,
  MoveUpRight,
  Sparkles,
  Terminal,
  X,
  TriangleAlert,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Divider } from "@/components/ui/divider";
import { HighlightText } from "@/components/ui/highlight-text";
import { IconBadge } from "@/components/ui/icon-badge";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Surface } from "@/components/ui/surface";
import { InteractionDemo } from "@/components/design-system/interaction-demo";
import { Palette } from "@/components/design-system/palette";

export const metadata: Metadata = {
  title: "Design system",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";
const chapters = [
  ["colors", "Color"],
  ["typography", "Typography"],
  ["buttons", "Buttons"],
  ["details", "Details"],
  ["cards", "Cards"],
  ["layout", "Layout"],
  ["finishes", "Finishes"],
  ["interaction", "Interaction"],
] as const;
const buttonKinds = [
  "primary",
  "secondary",
  "outline",
  "brutalist",
  "ghost",
  "link",
] as const;
const badgeKinds = [
  "lavender",
  "yellow",
  "mint",
  "pink",
  "blue",
  "neutral",
  "outlined",
] as const;

export default function DesignSystemPage() {
  // Opt-in permits QA on a production build without publishing the internal guide by default.
  if (
    process.env.NODE_ENV === "production" &&
    process.env.ENABLE_DESIGN_SYSTEM !== "true"
  )
    notFound();
  return (
    <>
      <header className="border-b border-border">
        <Container className="flex min-h-24 flex-wrap items-center justify-between gap-4 py-5">
          <Link
            href="/"
            aria-label="Tarun Sharma home"
            className="flex min-h-11 items-center gap-3 font-display text-lg font-bold tracking-tight"
          >
            <span className="flex size-10 items-center justify-center rounded-md bg-foreground font-mono text-sm text-background">
              ts<span className="text-yellow">.</span>
            </span>
            <span>
              Tarun Sharma
              <span className="ml-3 hidden font-sans text-small font-normal text-muted-foreground sm:inline">
                / Design system
              </span>
            </span>
          </Link>
          <Badge variant="outlined">
            <span className="size-1.5 rounded-pill bg-success" />
            Foundation v1.0
          </Badge>
        </Container>
      </header>
      <main id="main-content" tabIndex={-1}>
        <Container>
          <Section spacing="roomy" aria-labelledby="guide-title">
            <div className="grid items-end gap-12 lg:grid-cols-[1fr_280px]">
              <div>
                <p className="eyebrow mb-6 flex items-center gap-2 text-muted-foreground">
                  <span className="h-px w-8 bg-primary" />
                  The building blocks / 001
                </p>
                <h1 id="guide-title" className="type-display-xl">
                  A little playful.
                  <br />A lot <HighlightText>intentional.</HighlightText>
                </h1>
                <p className="type-body-lg mt-8 max-w-xl text-muted-foreground">
                  The visual language behind my corner of the internet. Built
                  for clarity, with just enough character to make it mine.
                </p>
                <a
                  href="#colors"
                  className="text-link mt-8 inline-flex min-h-11 items-center gap-2 text-small font-semibold"
                >
                  Explore the foundations{" "}
                  <ArrowDown size={16} aria-hidden="true" />
                </a>
              </div>
              <div className="border-l-2 border-primary-soft pl-6">
                <Asterisk
                  className="mb-6 size-12 text-primary"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <p className="font-display text-xl font-bold leading-snug">
                  Playful engineering.
                  <br />
                  Polished minimalism.
                </p>
                <dl className="mt-6 space-y-3 text-small">
                  {[
                    ["Modern minimalism", "50%"],
                    ["Playful neo-brutalism", "30%"],
                    ["Bento composition", "20%"],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between gap-4">
                      <dt className="text-muted-foreground">{label}</dt>
                      <dd className="font-mono">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </Section>
          <nav
            aria-label="Design system chapters"
            className="flex flex-wrap gap-x-6 gap-y-2 border-y border-border py-4"
          >
            {chapters.map(([id, name], index) => (
              <a
                key={id}
                href={`#${id}`}
                className="text-link inline-flex min-h-11 items-center gap-2 text-small no-underline"
              >
                <span className="font-mono text-caption text-muted-foreground">
                  0{index + 1}
                </span>
                {name}
              </a>
            ))}
          </nav>

          <Section id="colors" aria-labelledby="colors-title">
            <SectionHeading
              headingId="colors-title"
              eyebrow="01 / Color palette"
              heading="Warm canvas."
              highlight="Bright ideas."
              description="An easy-on-the-eyes foundation, one confident violet, and a considered handful of pastels. Color always has a purpose."
            />
            <Palette />
            <Surface tone="lavender" className="mt-10 rounded-md p-6">
              <p className="type-small">
                <strong>A simple rule:</strong> dark ink on pastels. White on
                primary violet. Semantic feedback always includes a label or
                icon, so color never carries the message alone.
              </p>
            </Surface>
          </Section>
          <Divider />

          <Section id="typography" aria-labelledby="type-title">
            <SectionHeading
              headingId="type-title"
              eyebrow="02 / Typography"
              heading="Good type does"
              highlight="the talking."
              description="Space Grotesk brings character. Inter keeps things readable. JetBrains Mono adds a quiet engineering signature."
            />
            <div className="mb-12 grid gap-8 md:grid-cols-3">
              <div>
                <p className="eyebrow text-muted-foreground">01 / Display</p>
                <p className="mt-3 font-display text-3xl font-bold">
                  Space Grotesk
                </p>
                <p className="type-small mt-2 text-muted-foreground">
                  Bold · Tight tracking · Clear hierarchy
                </p>
              </div>
              <div>
                <p className="eyebrow text-muted-foreground">02 / Body</p>
                <p className="mt-3 text-3xl font-semibold">Inter</p>
                <p className="type-small mt-2 text-muted-foreground">
                  Regular & medium · Room to read
                </p>
              </div>
              <div>
                <p className="eyebrow text-muted-foreground">03 / Technical</p>
                <p className="mt-3 font-mono text-2xl">JetBrains Mono</p>
                <p className="type-small mt-2 text-muted-foreground">
                  Labels · Metadata · A line of code
                </p>
              </div>
            </div>
            <div className="divide-y divide-border">
              {[
                [
                  "Display XL",
                  "clamp(3.5rem, 6vw, 6rem)",
                  "type-display-xl",
                  "Build with care.",
                ],
                [
                  "Display LG",
                  "clamp(2.75rem, 5vw, 4.75rem)",
                  "type-display-lg",
                  "Make it matter.",
                ],
                [
                  "Heading 1",
                  "clamp(2.5rem, 4.5vw, 4.25rem)",
                  "type-h1",
                  "Ideas into interfaces.",
                ],
                [
                  "Heading 2",
                  "clamp(2rem, 3.5vw, 3.25rem)",
                  "type-h2",
                  "Details make the difference.",
                ],
                [
                  "Heading 3",
                  "clamp(1.5rem, 2.5vw, 2rem)",
                  "type-h3",
                  "Thoughtfully put together.",
                ],
                [
                  "Body large",
                  "18px / 1.7",
                  "type-body-lg",
                  "Useful software starts with understanding the people who use it.",
                ],
                [
                  "Body",
                  "16px / 1.75",
                  "type-body",
                  "Clean interfaces make complex systems feel simple. Give the content space, keep the next step clear, and let the details earn their place.",
                ],
                [
                  "Small",
                  "14px / 1.65",
                  "type-small",
                  "A little context goes a long way.",
                ],
                [
                  "Caption",
                  "12px / 1.5",
                  "type-caption",
                  "Considered from the first pixel to the final interaction.",
                ],
                [
                  "Monospace",
                  "14px / 1.65",
                  "type-small font-mono",
                  "const craft = clarity + character;",
                ],
              ].map(([name, size, style, copy]) => (
                <div
                  key={name}
                  className="grid gap-4 py-8 lg:grid-cols-[220px_1fr]"
                >
                  <div>
                    <p className="text-small font-semibold">{name}</p>
                    <p className="mt-1 font-mono text-caption text-muted-foreground">
                      {size}
                    </p>
                  </div>
                  <p className={`${style} min-w-0 max-w-prose`}>{copy}</p>
                </div>
              ))}
            </div>
          </Section>
          <Divider />

          <Section id="buttons" aria-labelledby="buttons-title">
            <SectionHeading
              headingId="buttons-title"
              eyebrow="03 / Buttons"
              heading="An invitation"
              highlight="to interact."
              description="A clear primary action, quieter supporting actions, and a little tactile feedback. Every size keeps a minimum 44px touch target."
            />
            <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {buttonKinds.map((variant) => (
                <div key={variant}>
                  <p className="eyebrow mb-4 text-muted-foreground">
                    {variant}
                  </p>
                  <Button variant={variant} trailingIcon={<ArrowUpRight />}>
                    {variant === "primary"
                      ? "Make something great"
                      : variant === "brutalist"
                        ? "Add a little bold"
                        : "Explore the details"}
                  </Button>
                </div>
              ))}
            </div>
            <div className="mt-14 grid gap-12 lg:grid-cols-2">
              <div>
                <h3 className="mb-6 text-small font-semibold">
                  Three sizes. One rhythm.
                </h3>
                <div className="flex flex-wrap items-center gap-5">
                  <Button size="sm" variant="secondary">
                    Small
                  </Button>
                  <Button size="md" variant="secondary">
                    Medium
                  </Button>
                  <Button size="lg" variant="secondary">
                    Large
                  </Button>
                </div>
              </div>
              <div>
                <h3 className="mb-6 text-small font-semibold">
                  States that communicate.
                </h3>
                <div className="flex flex-wrap gap-5">
                  <Button disabled>Unavailable</Button>
                  <Button loading loadingLabel="Working…">
                    Submit
                  </Button>
                  <Button
                    variant="outline"
                    aria-label="Add an item"
                    className="px-3"
                    leadingIcon={<Sparkles />}
                  />
                </div>
              </div>
            </div>
            <Surface tone="white" className="mt-12 rounded-lg p-6 md:p-8">
              <p className="eyebrow mb-6 text-muted-foreground">
                State specimens / hover, keyboard focus, pressed
              </p>
              <div className="flex flex-wrap gap-8">
                <Button className="hover-example">Hover</Button>
                <Button className="focus-example">Focus visible</Button>
                <Button className="pressed-example">Pressed</Button>
              </div>
              <p className="type-small mt-8 text-muted-foreground">
                These three specimens hold a visual state for comparison. Try
                the controls above with your mouse or keyboard to see the actual
                states.
              </p>
            </Surface>
          </Section>
          <Divider />

          <Section id="details" aria-labelledby="details-title">
            <SectionHeading
              headingId="details-title"
              eyebrow="04 / The small things"
              heading="Character, in"
              highlight="small doses."
              description="Labels, highlights, and icon containers add rhythm without competing with the content."
            />
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <h3 className="mb-6 text-small font-semibold">
                  Badges & labels
                </h3>
                <div className="flex flex-wrap gap-3">
                  {badgeKinds.map((variant) => (
                    <Badge key={variant} variant={variant}>
                      {variant}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="mb-6 text-small font-semibold">Icon badges</h3>
                <div className="flex flex-wrap items-center gap-4">
                  {(
                    [
                      "lavender",
                      "yellow",
                      "mint",
                      "pink",
                      "blue",
                      "coral",
                    ] as const
                  ).map((variant, index) => (
                    <IconBadge
                      key={variant}
                      variant={variant}
                      size={index === 0 ? "sm" : index === 5 ? "lg" : "md"}
                      label={`${variant} code icon`}
                    >
                      <Code2 />
                    </IconBadge>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {(["marker", "pill", "underline"] as const).map((variant) => (
                <div key={variant}>
                  <p className="eyebrow mb-5 text-muted-foreground">
                    {variant}
                  </p>
                  <p className="font-display text-2xl font-bold">
                    Built with{" "}
                    <HighlightText variant={variant}>intention.</HighlightText>
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2">
              <div>
                <p className="eyebrow mb-5 text-muted-foreground">
                  Minimal divider
                </p>
                <Divider />
              </div>
              <div>
                <p className="eyebrow mb-5 text-muted-foreground">
                  Decorative divider
                </p>
                <Divider variant="decorative" />
              </div>
            </div>
            <h3 className="mt-12 mb-5 text-small font-semibold">
              Surface tones
            </h3>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {(
                [
                  "base",
                  "white",
                  "lavender",
                  "yellow",
                  "pink",
                  "mint",
                  "blue",
                  "coral",
                ] as const
              ).map((tone) => (
                <Surface
                  key={tone}
                  tone={tone}
                  className="rounded-md px-5 py-8 font-mono text-caption"
                >
                  {tone}
                </Surface>
              ))}
            </div>
          </Section>
          <Divider />

          <Section id="cards" aria-labelledby="cards-title">
            <SectionHeading
              headingId="cards-title"
              eyebrow="05 / Cards"
              heading="Give the content"
              highlight="a home."
              description="Start minimal. Add a border for structure, color for a theme, or a hard shadow for something that deserves the spotlight."
            />
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {(
                [
                  [
                    "minimal",
                    "01",
                    "Less, but considered.",
                    "A quiet surface for supporting content. Whitespace does most of the work here.",
                  ],
                  [
                    "outlined",
                    "02",
                    "A little definition.",
                    "A subtle edge groups related information without adding visual weight.",
                  ],
                  [
                    "brutalist",
                    "03",
                    "One confident statement.",
                    "Reserve the hard border and shadow for a featured idea or a key interaction.",
                  ],
                  [
                    "colored",
                    "04",
                    "A change of tone.",
                    "A soft wash introduces a different kind of content. Always pair pastels with dark ink.",
                  ],
                  [
                    "elevated",
                    "05",
                    "Quietly above the rest.",
                    "Soft depth adds separation where a border would feel too heavy.",
                  ],
                ] as const
              ).map(([variant, number, title, copy]) => (
                <Card key={variant} variant={variant}>
                  <span className="eyebrow text-muted-foreground">
                    {number} / {variant}
                  </span>
                  <h3 className="mt-8 font-display text-2xl font-bold leading-tight tracking-tight">
                    {title}
                  </h3>
                  <p className="type-small mt-4 text-muted-foreground">
                    {copy}
                  </p>
                </Card>
              ))}
            </div>
          </Section>
          <Divider />

          <Section id="layout" aria-labelledby="layout-title">
            <SectionHeading
              headingId="layout-title"
              eyebrow="06 / Layout & rhythm"
              heading="Leave room"
              highlight="to breathe."
              description="An editorial foundation, a 4px spacing rhythm, and the occasional asymmetric grid. Composition follows the content."
            />
            <div className="grid gap-8 border-y border-border py-12 md:grid-cols-[1fr_2fr]">
              <p className="eyebrow text-primary">A / Editorial composition</p>
              <div>
                <h3 className="type-h3 max-w-lg">
                  Good design makes room for what matters.
                </h3>
                <p className="mt-5 max-w-prose text-muted-foreground">
                  The strongest layouts don’t need a container around every
                  idea. A clear heading, readable line lengths, and deliberate
                  spacing are often enough. Let the content set the pace.
                </p>
                <p className="mt-5 max-w-prose text-muted-foreground">
                  Use an offset column for context, then give the main narrative
                  the space it deserves. Simple, flexible, and easy to read on
                  every screen.
                </p>
              </div>
            </div>
            <p className="eyebrow mt-12 mb-6 text-primary">
              B / A purposeful bento
            </p>
            <div className="grid gap-6 md:grid-cols-3">
              <Surface
                tone="lavender"
                className="flex flex-col justify-between rounded-xl p-8 md:col-span-2 md:row-span-2 md:p-12"
              >
                <IconBadge variant="yellow" label="Layers">
                  <Layers />
                </IconBadge>
                <div className="mt-16 max-w-md">
                  <Badge variant="outlined">The bigger picture</Badge>
                  <h3 className="type-h2 mt-6">
                    Make space for
                    <br />
                    <HighlightText>the main idea.</HighlightText>
                  </h3>
                  <p className="mt-5 text-muted-foreground">
                    One anchor, two supporting notes. Different proportions give
                    the eye somewhere to start.
                  </p>
                </div>
              </Surface>
              <Surface tone="mint" className="rounded-xl p-8">
                <Code2 aria-hidden="true" className="mb-8 size-7" />
                <h3 className="font-display text-xl font-bold">
                  Built to fit.
                </h3>
                <p className="type-small mt-3">
                  Columns become a simple, readable stack on smaller screens.
                </p>
              </Surface>
              <Card variant="outlined">
                <Command aria-hidden="true" className="mb-8 size-7" />
                <h3 className="font-display text-xl font-bold">
                  Room for the details.
                </h3>
                <p className="type-small mt-3 text-muted-foreground">
                  Supporting content stays useful, without shouting for
                  attention.
                </p>
              </Card>
            </div>
            <p className="eyebrow mt-12 mb-6 text-primary">
              C / Space is a design decision
            </p>
            <div className="flex flex-wrap items-end gap-x-6 gap-y-8">
              {[4, 8, 12, 16, 24, 32, 48, 64, 80, 96, 128].map((space) => (
                <div key={space} className="flex flex-col items-center gap-3">
                  <div
                    className="w-6 rounded-sm bg-primary-soft"
                    style={{ height: space }}
                  />
                  <span className="font-mono text-caption text-muted-foreground">
                    {space}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              <Surface tone="white" className="rounded-lg px-6">
                <Section aria-label="Standard section spacing example">
                  <p className="eyebrow text-primary">Standard section</p>
                  <p className="mt-3 text-small">
                    56px mobile → 72px tablet → 96px desktop
                  </p>
                </Section>
              </Surface>
              <Surface tone="lavender" className="rounded-lg px-6">
                <Section
                  spacing="roomy"
                  aria-label="Roomy section spacing example"
                >
                  <p className="eyebrow text-primary">Roomy section</p>
                  <p className="mt-3 text-small">
                    72px mobile → 96px tablet → 128px desktop
                  </p>
                </Section>
              </Surface>
            </div>
          </Section>
          <Divider />

          <Section id="finishes" aria-labelledby="finishes-title">
            <SectionHeading
              headingId="finishes-title"
              eyebrow="07 / Borders, radius & shadows"
              heading="Edges with"
              highlight="intention."
              description="A small set of finishes keeps the system coherent. Emphasis is most effective when it’s used sparingly."
            />
            <h3 className="mb-6 text-small font-semibold">Border weights</h3>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                ["border-minimal", "Minimal / 1px"],
                ["border-brutalist", "Brutalist / 2px"],
                ["border-display", "Display / 3px"],
              ].map(([style, label]) => (
                <div
                  key={label}
                  className={`${style} rounded-md p-8 font-mono text-caption`}
                >
                  {label}
                </div>
              ))}
            </div>
            <h3 className="mt-12 mb-6 text-small font-semibold">
              Corner radius
            </h3>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-5">
              {[
                ["rounded-sm", "8px / Small"],
                ["rounded-md", "12px / Medium"],
                ["rounded-lg", "20px / Large"],
                ["rounded-xl", "28px / XL"],
                ["rounded-pill", "9999px / Pill"],
              ].map(([style, label]) => (
                <div
                  key={label}
                  className={`${style} border border-border-strong bg-lavender-surface px-4 py-8 text-center font-mono text-caption`}
                >
                  {label}
                </div>
              ))}
            </div>
            <h3 className="mt-12 mb-6 text-small font-semibold">Shadows</h3>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["shadow-minimal", "Minimal", "Soft, ambient separation"],
                ["shadow-brutalist", "Brutalist", "4px × 4px hard offset"],
                [
                  "shadow-brutalist-lg",
                  "Brutalist large",
                  "6px × 6px hard offset",
                ],
                ["shadow-pressed", "Pressed", "1px × 1px hard offset"],
              ].map(([style, label, description]) => (
                <div
                  key={label}
                  className={`${style} rounded-md bg-surface p-6`}
                >
                  <p className="text-small font-semibold">{label}</p>
                  <p className="type-caption mt-2 text-muted-foreground">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </Section>
          <Divider />

          <Section id="interaction" aria-labelledby="interaction-title">
            <SectionHeading
              headingId="interaction-title"
              eyebrow="08 / Interaction & accessibility"
              heading="Feels good."
              highlight="Works for everyone."
              description="Visible focus, clear feedback, gentle motion, and comfortable touch targets are part of the foundation—not finishing touches."
            />
            <InteractionDemo />
            <div className="mt-8 grid gap-8 md:grid-cols-2">
              <Card variant="colored" hoverable>
                <IconBadge className="bg-surface">
                  <MoveUpRight />
                </IconBadge>
                <h3 className="type-h3 mt-6">A subtle lift.</h3>
                <p className="mt-3 text-muted-foreground">
                  Hover this card, or focus its link. Movement is small and
                  disappears when reduced motion is preferred.
                </p>
                <a
                  href="#cards"
                  className="text-link mt-5 inline-flex min-h-11 items-center gap-2 text-small font-semibold"
                >
                  Revisit the cards <ArrowRight size={16} aria-hidden="true" />
                </a>
              </Card>
              <Card variant="minimal">
                <IconBadge variant="mint">
                  <Terminal />
                </IconBadge>
                <h3 className="type-h3 mt-6">Keyboard comes first.</h3>
                <p className="mt-3 text-muted-foreground">
                  Use Tab and Shift + Tab to move through the page. Every link
                  and button has a visible focus ring.
                </p>
                <details className="mt-5">
                  <summary className="min-h-11 py-2 text-small font-semibold underline underline-offset-4">
                    A note on reduced motion
                  </summary>
                  <p className="type-small mt-3 text-muted-foreground">
                    The system honors your device preference: transitions become
                    instant, hover movement is removed, and loading remains
                    understandable through text.
                  </p>
                </details>
              </Card>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4 text-small font-medium">
              <p className="flex items-center gap-2 text-success">
                <Check size={18} aria-hidden="true" />
                Changes saved
              </p>
              <p className="flex items-center gap-2 text-error">
                <X size={18} aria-hidden="true" />
                Something needs attention
              </p>
              <p className="flex items-center gap-2 text-warning">
                <TriangleAlert size={18} aria-hidden="true" />
                Review before continuing
              </p>
            </div>
          </Section>
          <Divider />
        </Container>
      </main>
      <footer>
        <Container className="flex flex-col justify-between gap-4 py-10 text-small text-muted-foreground sm:flex-row">
          <p>
            Tarun Sharma{" "}
            <span className="mx-2" aria-hidden="true">
              /
            </span>{" "}
            Thoughtfully built, from the ground up.
          </p>
          <p className="font-mono text-caption">
            Phase 01 · Internal style guide
          </p>
        </Container>
      </footer>
    </>
  );
}
