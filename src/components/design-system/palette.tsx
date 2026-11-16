import type { CSSProperties } from "react";

// These are documentation labels; actual swatch styling always references tokens.css.
const groups = [
  {
    title: "The foundations",
    colors: [
      ["background", "Warm ivory", "#FFFCF7"],
      ["surface", "Paper white", "#FFFFFF"],
      ["foreground", "Ink", "#191724"],
      ["muted-foreground", "Muted ink", "#5F5B68"],
    ],
  },
  {
    title: "A little personality",
    colors: [
      ["primary", "Electric violet", "#7137E8"],
      ["accent-pink", "Action pink", "#F77EAF"],
      ["accent-mint", "Fresh accent", "#65E2C6"],
      ["primary-soft", "Soft violet", "#C7A7FF"],
      ["yellow", "Sunshine", "#FFDA58"],
      ["pink", "Bubblegum", "#FFADD1"],
      ["mint", "Fresh mint", "#A8EDD8"],
      ["blue", "Clear sky", "#B8DFFF"],
      ["coral", "Warm coral", "#FF987A"],
      ["lavender-surface", "Lavender wash", "#F3EAFF"],
    ],
  },
  {
    title: "Colors with a job",
    colors: [
      ["border", "Subtle border", "#DEDBE2"],
      ["border-strong", "Strong border", "#191724"],
      ["focus", "Keyboard focus", "#7137E8"],
      ["success", "Success", "#21634C"],
      ["error", "Error", "#B4233C"],
      ["warning", "Warning", "#835600"],
      ["disabled", "Disabled fill", "#EEEBEF"],
      ["disabled-foreground", "Disabled text", "#6C6673"],
      ["primary-foreground", "On violet", "#FFFFFF"],
    ],
  },
] as const;

export function Palette() {
  return (
    <div className="space-y-12">
      {groups.map((group) => (
        <div key={group.title}>
          <h3 className="mb-5 text-small font-semibold">{group.title}</h3>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 xl:grid-cols-5">
            {group.colors.map(([token, name, hex]) => (
              <figure key={token} className="min-w-0">
                <div
                  className="h-24 rounded-md border border-foreground/10 md:h-28"
                  style={
                    {
                      backgroundColor: `var(--color-${token})`,
                    } as CSSProperties
                  }
                />
                <figcaption className="mt-3">
                  <p className="text-small font-semibold">{name}</p>
                  <p className="mt-1 font-mono text-caption text-muted-foreground">
                    {hex}
                  </p>
                  <p className="mt-1 break-all font-mono text-caption text-muted-foreground">
                    --color-{token}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
