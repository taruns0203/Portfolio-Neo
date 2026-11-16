import type { ComponentPropsWithRef, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { HighlightText } from "./highlight-text";
export interface SectionHeadingProps extends Omit<
  ComponentPropsWithRef<"div">,
  "title"
> {
  eyebrow?: string;
  heading: string;
  highlight?: string;
  description?: string;
  action?: ReactNode;
  headingId?: string;
  as?: "h2" | "h3";
}
export function SectionHeading({
  eyebrow,
  heading,
  highlight,
  description,
  action,
  headingId,
  as: Heading = "h2",
  className,
  ...props
}: SectionHeadingProps) {
  return (
    <div
      {...props}
      className={cn(
        "mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end",
        className,
      )}
    >
      <div className="max-w-prose">
        {eyebrow && (
          <p className="eyebrow mb-4 text-muted-foreground">{eyebrow}</p>
        )}
        <Heading
          id={headingId}
          className={Heading === "h2" ? "type-h2" : "type-h3"}
        >
          {heading}
          {highlight && (
            <>
              {" "}
              <HighlightText>{highlight}</HighlightText>
            </>
          )}
        </Heading>
        {description && (
          <p className="type-body mt-4 max-w-prose text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
