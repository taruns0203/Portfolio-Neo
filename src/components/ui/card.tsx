import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef } from "react";
import { cn } from "@/lib/utils";

const cardVariants = cva("min-w-0 rounded-lg p-6 md:p-8", {
  variants: {
    variant: {
      minimal: "bg-surface",
      outlined: "border-minimal bg-surface",
      brutalist: "border-brutalist bg-surface shadow-brutalist",
      colored: "bg-lavender-surface",
      elevated: "bg-surface shadow-minimal",
    },
    hoverable: {
      true: "control-motion hover:-translate-y-1 focus-within:-translate-y-1 motion-reduce:transform-none",
      false: "",
    },
  },
  defaultVariants: { variant: "minimal", hoverable: false },
});
export interface CardProps
  extends ComponentPropsWithRef<"div">, VariantProps<typeof cardVariants> {}
export function Card({ className, variant, hoverable, ...props }: CardProps) {
  return (
    <div
      {...props}
      className={cn(cardVariants({ variant, hoverable }), className)}
    />
  );
}
