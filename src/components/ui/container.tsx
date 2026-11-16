import type { ComponentPropsWithRef } from "react";
import { cn } from "@/lib/utils";
export type ContainerProps = ComponentPropsWithRef<"div">;
export function Container({ className, ...props }: ContainerProps) {
  return (
    <div
      {...props}
      className={cn("mx-auto w-full max-w-page px-[var(--gutter)]", className)}
    />
  );
}
