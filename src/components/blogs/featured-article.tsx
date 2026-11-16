import { BlogCategoryBadge } from "@/components/blogs/blog-category-badge";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import type { BlogArticle } from "@/data/blogs";
import { formatBlogDate } from "@/data/blogs";

interface FeaturedArticleProps {
  article: BlogArticle;
}

export function FeaturedArticle({ article }: FeaturedArticleProps) {
  const publishedDate = formatBlogDate(article.publishedAt);

  return (
    <section className="mb-14" aria-labelledby="featured-article-title">
      <div className="featured-article-card overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* Left Visual Illustration */}
          <div className="lg:col-span-6 p-6 md:p-8 flex items-center justify-center blog-art-bg-coral border-b-2 lg:border-b-0 lg:border-r-3 border-border-strong relative">
            {/* Retro window chrome dots */}
            <div
              className="absolute top-4 left-5 flex items-center gap-1.5"
              aria-hidden="true"
            >
              <span className="w-3 h-3 rounded-full bg-border-strong" />
              <span className="w-3 h-3 rounded-full bg-border-strong opacity-40" />
              <span className="w-3 h-3 rounded-full bg-border-strong opacity-20" />
            </div>

            <div className="relative w-full aspect-[800/520] max-w-[540px] mt-4 lg:mt-0">
              <Image
                src={article.coverImage}
                alt={article.title}
                fill
                loading="eager"
                sizes="(max-width: 1024px) 100vw, 540px"
                className="object-contain"
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-6 p-6 md:p-10 flex flex-col justify-between bg-surface">
            <div>
              {/* Badges / Meta row */}
              <div className="flex flex-wrap items-center gap-2.5 mb-4">
                <span className="inline-flex items-center gap-1 bg-yellow text-foreground font-mono text-xs font-black uppercase px-2.5 py-1 rounded-sm border-2 border-border-strong shadow-[2px_2px_0px_var(--color-border-strong)]">
                  ★ FEATURED
                </span>
                <BlogCategoryBadge category={article.category} />
                {publishedDate ? (
                  <span className="font-mono text-xs text-muted-foreground font-semibold">
                    {publishedDate}
                  </span>
                ) : (
                  <span className="inline-flex items-center bg-disabled text-disabled-foreground font-mono text-xs font-bold px-2.5 py-0.5 rounded-sm border border-border-strong/40">
                    SAMPLE / DRAFT
                  </span>
                )}
                <span className="inline-flex items-center gap-1 font-mono text-xs text-muted-foreground ml-auto">
                  <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                  {article.readingMinutes} min read
                </span>
              </div>

              {/* Title */}
              <h2
                id="featured-article-title"
                className="font-display text-2xl md:text-4xl font-extrabold text-foreground tracking-tight leading-tight hover:text-primary transition-colors"
              >
                <Link href={`/blogs/${article.slug}`}>{article.title}</Link>
              </h2>

              {/* Excerpt */}
              <p className="mt-4 text-muted-foreground font-medium text-base md:text-lg leading-relaxed">
                {article.excerpt}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-6">
                {article.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-xs text-muted-foreground bg-background border border-border px-2 py-0.5 rounded-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-8 pt-6 border-t-2 border-dashed border-border flex items-center justify-between">
              <Link
                href={`/blogs/${article.slug}`}
                className="inline-flex items-center gap-2.5 bg-yellow text-foreground font-sans text-base font-bold px-6 py-3.5 rounded-md border-2 border-border-strong shadow-brutalist hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-pressed active:translate-x-1 active:translate-y-1 transition-all"
                aria-label={`Read featured article: ${article.title}`}
              >
                READ ARTICLE
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Link>
              <span className="font-mono text-xs text-muted-foreground uppercase font-bold tracking-wider hidden sm:inline">
                TECHNICAL DEEP-DIVE
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
