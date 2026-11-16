import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef } from "react";
import { cn } from "@/lib/utils";
const dividerVariants = cva("w-full border-0", {
  variants: {
    variant: {
      minimal: "h-px bg-border",
      decorative:
        "h-1 rounded-pill bg-[repeating-linear-gradient(90deg,var(--color-primary-soft)_0,var(--color-primary-soft)_12px,transparent_12px,transparent_20px)]",
    },
  },
  defaultVariants: { variant: "minimal" },
});
export interface DividerProps
  extends ComponentPropsWithRef<"hr">, VariantProps<typeof dividerVariants> {}
export function Divider({ variant, className, ...props }: DividerProps) {
  return (
    <hr {...props} className={cn(dividerVariants({ variant }), className)} />
  );
}
