import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef } from "react";
import { cn } from "@/lib/utils";
const highlightVariants = cva("box-decoration-clone text-foreground", {
  variants: {
    variant: {
      marker:
        "bg-[linear-gradient(transparent_48%,var(--color-yellow)_48%,var(--color-yellow)_92%,transparent_92%)] px-1",
      pill: "rounded-pill bg-primary-soft px-3",
      underline:
        "underline decoration-primary-soft decoration-[0.15em] underline-offset-[0.08em]",
    },
  },
  defaultVariants: { variant: "marker" },
});
export interface HighlightTextProps
  extends
    ComponentPropsWithRef<"span">,
    VariantProps<typeof highlightVariants> {}
export function HighlightText({
  className,
  variant,
  ...props
}: HighlightTextProps) {
  return (
    <span
      {...props}
      className={cn(highlightVariants({ variant }), className)}
    />
  );
}
