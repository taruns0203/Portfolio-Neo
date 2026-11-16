import type { BlogCategory } from "@/data/blogs";
import { Badge, type BadgeProps } from "@/components/ui/badge";

const tones: Record<BlogCategory, BadgeProps["variant"]> = {
  Frontend: "lavender",
  "System Design": "pink",
  Performance: "mint",
  Engineering: "blue",
};

export function BlogCategoryBadge({ category }: { category: BlogCategory }) {
  return <Badge variant={tones[category]}>{category}</Badge>;
}
