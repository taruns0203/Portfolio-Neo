import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef } from "react";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-pill border px-3 py-1 font-mono text-caption font-medium leading-normal text-foreground",
  {
    variants: {
      variant: {
        lavender: "border-transparent bg-lavender-surface",
        yellow: "border-transparent bg-yellow",
        mint: "border-transparent bg-mint",
        pink: "border-transparent bg-pink",
        blue: "border-transparent bg-blue",
        neutral: "border-transparent bg-disabled",
        outlined: "border-border-strong bg-transparent",
      },
    },
    defaultVariants: { variant: "lavender" },
  },
);
export interface BadgeProps
  extends ComponentPropsWithRef<"span">, VariantProps<typeof badgeVariants> {}
export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span {...props} className={cn(badgeVariants({ variant }), className)} />
  );
}
