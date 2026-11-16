import {
  SectionDecoration,
  type SectionDecorationVariant,
} from "./section-decoration";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef } from "react";
import { cn } from "@/lib/utils";
const sectionVariants = cva("relative", {
  variants: {
    spacing: { standard: "section-standard", roomy: "section-roomy", none: "" },
  },
  defaultVariants: { spacing: "standard" },
});
export interface SectionProps
  extends
    ComponentPropsWithRef<"section">,
    VariantProps<typeof sectionVariants> {
  decoration?: SectionDecorationVariant;
}
export function Section({
  className,
  spacing,
  decoration,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      {...props}
      className={cn(
        sectionVariants({ spacing }),
        decoration && "section-decorated",
        className,
      )}
    >
      {decoration && <SectionDecoration variant={decoration} />}
      {children}
    </section>
  );
}
