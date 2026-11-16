import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef } from "react";
import { cn } from "@/lib/utils";
const iconBadgeVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-md text-foreground",
  {
    variants: {
      variant: {
        lavender: "bg-lavender-surface",
        yellow: "bg-yellow",
        mint: "bg-mint",
        pink: "bg-pink",
        blue: "bg-blue",
        coral: "bg-coral",
      },
      size: {
        sm: "size-10 [&_svg]:size-5",
        md: "size-12 [&_svg]:size-6",
        lg: "size-16 [&_svg]:size-8",
      },
    },
    defaultVariants: { variant: "lavender", size: "md" },
  },
);
export interface IconBadgeProps
  extends
    ComponentPropsWithRef<"span">,
    VariantProps<typeof iconBadgeVariants> {
  label?: string;
}
export function IconBadge({
  className,
  variant,
  size,
  label,
  children,
  ...props
}: IconBadgeProps) {
  return (
    <span
      {...props}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cn(iconBadgeVariants({ variant, size }), className)}
    >
      <span aria-hidden="true">{children}</span>
    </span>
  );
}
