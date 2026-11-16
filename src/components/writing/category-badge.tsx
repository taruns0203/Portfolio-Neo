import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import type { ArticleCategory } from "@/data/articles";

const categories: Record<
  ArticleCategory,
  { icon: string; tone: "pink" | "mint" | "lavender" | "yellow" | "blue" }
> = {
  "System Design": { icon: "icon-bolt.svg", tone: "pink" },
  Performance: { icon: "icon-rocket.svg", tone: "mint" },
  React: { icon: "icon-react-atom.svg", tone: "lavender" },
  JavaScript: { icon: "icon-terminal.svg", tone: "yellow" },
  "Node.js": { icon: "icon-server.svg", tone: "mint" },
  Other: { icon: "icon-pencil.svg", tone: "blue" },
};

export function CategoryBadge({ category }: { category: ArticleCategory }) {
  const { icon, tone } = categories[category];
  return (
    <Badge variant={tone} className="writing-category">
      <Image src={`/assets/blog/${icon}`} width={20} height={20} alt="" />
      {category}
    </Badge>
  );
}
