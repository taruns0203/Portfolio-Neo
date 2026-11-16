import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { ArticleCard } from "@/components/writing/article-card";
import { articles } from "@/data/articles";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Technical writing and upcoming articles by Tarun Sharma on frontend architecture, performance, and React.",
};

export default function WritingPage() {
  const hasPublished = articles.some(
    (article) => article.status === "published",
  );
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="writing-index section-standard"
    >
      <Container>
        <Link
          href="/#writing"
          className={buttonVariants({ variant: "outline", size: "sm" })}
        >
          <ArrowLeft aria-hidden="true" />
          Back to portfolio
        </Link>
        <header className="writing-index-header">
          <p className="eyebrow">Blogs &amp; Articles</p>
          <h1 className="type-h1">The writing desk.</h1>
          <p>
            {hasPublished
              ? "Published articles and a look at what’s taking shape next."
              : "A few ideas taking shape. These articles are drafts and aren’t published yet—check back for the full stories."}
          </p>
        </header>
        <div className="writing-grid">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} headingLevel="h2" />
          ))}
        </div>
      </Container>
    </main>
  );
}
