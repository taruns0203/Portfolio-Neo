import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef } from "react";
import { cn } from "@/lib/utils";
const surfaceVariants = cva("text-foreground", {
  variants: {
    tone: {
      base: "bg-background",
      white: "bg-surface",
      lavender: "bg-lavender-surface",
      yellow: "bg-yellow",
      pink: "bg-pink",
      mint: "bg-mint",
      blue: "bg-blue",
      coral: "bg-coral",
    },
  },
  defaultVariants: { tone: "base" },
});
export interface SurfaceProps
  extends ComponentPropsWithRef<"div">, VariantProps<typeof surfaceVariants> {}
export function Surface({ className, tone, ...props }: SurfaceProps) {
  return (
    <div {...props} className={cn(surfaceVariants({ tone }), className)} />
  );
}
