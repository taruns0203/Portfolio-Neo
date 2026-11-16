import Image from "next/image";
import { Card } from "@/components/ui/card";
import { CategoryBadge } from "@/components/writing/category-badge";
import { ArticleMeta } from "@/components/writing/article-meta";
import type { PortfolioArticle } from "@/data/articles";

export function ArticleCard({
  article,
  headingLevel = "h3",
}: {
  article: PortfolioArticle;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  const href =
    article.status === "published" && article.href ? article.href : undefined;
  const readingMinutes = article.readingMinutes;
  return (
    <article
      className="writing-article"
      aria-labelledby={`article-${article.id}`}
    >
      <Card variant="outlined" className="writing-card">
        <div className="writing-card-top">
          <CategoryBadge category={article.category} />
          {typeof readingMinutes === "number" &&
            Number.isFinite(readingMinutes) &&
            readingMinutes > 0 && (
              <span className="writing-reading-time">
                <Image
                  src="/assets/blog/icon-clock.svg"
                  width={16}
                  height={16}
                  alt=""
                />
                {readingMinutes} min read
              </span>
            )}
        </div>
        <div className="writing-card-body">
          <div className="writing-card-copy">
            <Heading id={`article-${article.id}`}>
              {href ? <a href={href}>{article.title}</a> : article.title}
            </Heading>
            <p>{article.excerpt}</p>
          </div>
          <div
            className={`writing-card-art writing-accent-${article.accent}`}
            aria-hidden="true"
          >
            <Image
              src={`/assets/blog/${article.illustration}`}
              width={400}
              height={290}
              alt=""
            />
          </div>
        </div>
        <div className="writing-card-footer">
          <ArticleMeta article={article} />
          {href ? (
            <a
              className="writing-article-link"
              href={href}
              aria-label={`Read ${article.title}`}
            >
              <Image
                src="/assets/blog/icon-arrow-right.svg"
                width={24}
                height={24}
                alt=""
              />
            </a>
          ) : article.status === "draft" ? (
            <span className="writing-draft">Draft</span>
          ) : null}
        </div>
      </Card>
    </article>
  );
}
