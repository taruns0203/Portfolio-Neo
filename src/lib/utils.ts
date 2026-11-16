import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Keep custom sizes distinct from colors such as text-primary-foreground.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        "hero",
        "display-xl",
        "display-lg",
        "heading-1",
        "heading-2",
        "heading-3",
        "body-lg",
        "body",
        "small",
        "caption",
      ],
      radius: ["pill"],
      shadow: ["minimal", "brutalist", "brutalist-lg", "pressed"],
      container: ["page", "home", "prose"],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
