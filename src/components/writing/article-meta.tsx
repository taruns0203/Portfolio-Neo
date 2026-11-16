import Image from "next/image";
import { site } from "@/config/site";
import type { PortfolioArticle } from "@/data/articles";

export function ArticleMeta({ article }: { article: PortfolioArticle }) {
  const date =
    article.status === "published" &&
    article.publishedAt &&
    Number.isFinite(Date.parse(article.publishedAt))
      ? article.publishedAt
      : null;
  return (
    <div className="writing-author">
      <Image
        src="/assets/blog/author-avatar-placeholder.svg"
        width={40}
        height={40}
        alt=""
      />
      <div>
        <p>{site.name}</p>
        {date && (
          <time dateTime={date}>
            {new Intl.DateTimeFormat("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
              timeZone: "UTC",
            }).format(new Date(date))}
          </time>
        )}
      </div>
    </div>
  );
}
