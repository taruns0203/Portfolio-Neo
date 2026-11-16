import type { BlogArticle } from "@/data/blogs";
import { BlogCard } from "@/components/blogs/blog-card";

interface BlogGridProps {
  articles: readonly BlogArticle[];
}

export function BlogGrid({ articles }: BlogGridProps) {
  if (articles.length === 0) {
    return null;
  }

  // If there are more than 3 articles, match the reference layout:
  // Row 1: 3 larger cards (lg:grid-cols-3)
  // Subsequent rows: 4 cards (xl:grid-cols-4 or lg:grid-cols-4, md:grid-cols-2, 1-col mobile)
  const showSplitLayout = articles.length > 3;
  const primaryRow = showSplitLayout ? articles.slice(0, 3) : articles;
  const secondaryRow = showSplitLayout ? articles.slice(3) : [];

  return (
    <div className="space-y-6 md:space-y-8" aria-label="Articles list">
      {/* Primary Row (3 cards desktop) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {primaryRow.map((article, index) => (
          <BlogCard key={article.id} article={article} index={index} />
        ))}
      </div>

      {/* Secondary Row (4 cards desktop, 2 tablet, 1 mobile) */}
      {secondaryRow.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-6">
          {secondaryRow.map((article, index) => (
            <BlogCard key={article.id} article={article} index={index + 3} />
          ))}
        </div>
      )}
    </div>
  );
}
