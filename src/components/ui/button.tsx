import { cva, type VariantProps } from "class-variance-authority";
import { LoaderCircle } from "lucide-react";
import type { ComponentPropsWithRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "control-motion inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-md border-2 text-small font-semibold leading-snug enabled:hover:-translate-y-0.5 enabled:active:translate-y-0 motion-reduce:transform-none disabled:translate-y-0 disabled:border-transparent disabled:bg-disabled disabled:text-disabled-foreground disabled:shadow-none [&_svg]:size-4",
  {
    variants: {
      variant: {
        primary:
          "border-border-strong bg-primary text-primary-foreground shadow-brutalist enabled:hover:bg-primary/90 enabled:active:translate-x-0.5 enabled:active:translate-y-0.5 enabled:active:shadow-pressed",
        secondary:
          "border-transparent bg-lavender-surface text-foreground enabled:hover:bg-primary-soft",
        outline:
          "border-border-strong bg-transparent text-foreground enabled:hover:bg-lavender-surface",
        brutalist:
          "border-border-strong bg-yellow text-foreground shadow-brutalist enabled:hover:bg-yellow/80 enabled:active:translate-x-0.5 enabled:active:translate-y-0.5 enabled:active:shadow-pressed",
        ghost:
          "border-transparent bg-transparent text-foreground enabled:hover:bg-lavender-surface",
        link: "border-transparent bg-transparent text-primary underline decoration-1 underline-offset-4 enabled:hover:decoration-2",
      },
      size: {
        sm: "px-4 py-2",
        md: "px-6 py-3",
        lg: "min-h-14 px-8 py-4 text-body",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends ComponentPropsWithRef<"button">, VariantProps<typeof buttonVariants> {
  loading?: boolean;
  loadingLabel?: string;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
}

// React 19 forwards ref as a regular prop, with no client wrapper required.
export function Button({
  className,
  variant,
  size,
  loading = false,
  loadingLabel = "Loading",
  disabled,
  children,
  leadingIcon,
  trailingIcon,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(buttonVariants({ variant, size }), className)}
    >
      {loading ? (
        <LoaderCircle
          aria-hidden="true"
          className="animate-spin motion-reduce:animate-none"
        />
      ) : leadingIcon ? (
        <span aria-hidden="true">{leadingIcon}</span>
      ) : null}
      {loading ? loadingLabel : children}
      {!loading && trailingIcon ? (
        <span aria-hidden="true">{trailingIcon}</span>
      ) : null}
    </button>
  );
}
