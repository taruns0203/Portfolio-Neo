import { BlogCategoryBadge } from "@/components/blogs/blog-category-badge";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import type { BlogArticle } from "@/data/blogs";
import { formatBlogDate } from "@/data/blogs";

interface BlogCardProps {
  article: BlogArticle;
  index: number;
}

export function BlogCard({ article, index }: BlogCardProps) {
  const publishedDate = formatBlogDate(article.publishedAt);
  const formattedIndex = String(index + 1).padStart(2, "0") + "/";

  // Accent styling for the image box background
  const artBgClass = `blog-art-bg-${article.accent}`;
  const accentClass = `accent-${article.accent}`;

  return (
    <article
      className="blog-card group"
      aria-labelledby={`blog-title-${article.id}`}
    >
      <Link
        href={`/blogs/${article.slug}`}
        className="flex flex-col h-full focus:outline-none"
        aria-label={`Read article: ${article.title}`}
      >
        {/* Top Image Window */}
        <div
          className={`relative w-full aspect-[800/520] px-4 pt-12 pb-4 flex items-center justify-center border-b-2 border-border-strong ${artBgClass}`}
        >
          {/* Retro window dots */}
          <div
            className="absolute top-3.5 left-4 flex items-center gap-1.5"
            aria-hidden="true"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-border-strong" />
            <span className="w-2.5 h-2.5 rounded-full bg-border-strong opacity-40" />
            <span className="w-2.5 h-2.5 rounded-full bg-border-strong opacity-20" />
          </div>

          {/* Top-Right Arrow Badge */}
          <div
            className="absolute top-3.5 right-4 w-8 h-8 rounded-full bg-surface border-2 border-border-strong flex items-center justify-center shadow-[1px_1px_0px_var(--color-border-strong)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:bg-yellow transition-transform"
            aria-hidden="true"
          >
            <ArrowUpRight className="w-4 h-4 text-foreground" />
          </div>

          {/* Artwork */}
          <div className="relative w-full h-full max-h-[180px]">
            <Image
              src={article.coverImage}
              alt=""
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-contain"
            />
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 md:p-6 flex-1 flex flex-col justify-between bg-surface">
          <div>
            {/* Expressive Number Block & Category */}
            <div className="flex items-center justify-between gap-2 mb-3.5">
              <span
                className={`blog-number-badge ${accentClass}`}
                aria-hidden="true"
              >
                {formattedIndex}
              </span>
              <BlogCategoryBadge category={article.category} />
            </div>

            {/* Title */}
            <h3
              id={`blog-title-${article.id}`}
              className="font-display text-lg md:text-xl font-extrabold text-foreground tracking-tight leading-snug group-hover:text-primary transition-colors "
            >
              {article.title}
            </h3>

            {/* Excerpt */}
            <p className="mt-2.5 text-muted-foreground text-sm line-clamp-2 leading-relaxed">
              {article.excerpt}
            </p>
          </div>

          {/* Footer Meta Row */}
          <div className="mt-5 pt-4 border-t border-border flex items-center justify-between text-xs font-mono">
            {publishedDate ? (
              <time
                dateTime={article.publishedAt!}
                className="text-muted-foreground font-semibold"
              >
                {publishedDate}
              </time>
            ) : (
              <span className="inline-flex items-center bg-disabled text-disabled-foreground text-[11px] font-bold px-2 py-0.5 rounded-sm border border-border-strong/30">
                {article.status === "demo" ? "DEMONSTRATION" : "SAMPLE / DRAFT"}
              </span>
            )}

            <span className="inline-flex items-center gap-1 text-muted-foreground font-medium">
              <Clock className="w-3.5 h-3.5" aria-hidden="true" />
              {article.readingMinutes} min read
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
