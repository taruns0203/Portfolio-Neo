import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { BlogCategoryBadge } from "@/components/blogs/blog-category-badge";
import { BlogCard } from "@/components/blogs/blog-card";
import { getRelatedBlogs, formatBlogDate } from "@/data/blogs";
import type { getArticleContent } from "@/lib/article-content";
import { site } from "@/config/site";
import { mdxComponents } from "./mdx-components";
import { ReadingTools } from "./reading-tools";
import { CopyButton } from "./copy-button";

type Article = NonNullable<Awaited<ReturnType<typeof getArticleContent>>>;
export function ArticlePage({ article }: { article: Article }) {
  const { Content, metadata: meta, headings } = article;
  const canonical = `${site.url}/blogs/${meta.slug}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta.title,
    description: meta.excerpt,
    url: canonical,
    mainEntityOfPage: canonical,
    image: `${site.url}${meta.coverImage}`,
    inLanguage: "en",
    articleSection: meta.category,
    ...(meta.author
      ? {
          author: {
            "@type": "Person",
            name: meta.author.name,
            ...(meta.author.url ? { url: meta.author.url } : {}),
          },
        }
      : {}),
    ...(meta.publishedAt ? { datePublished: meta.publishedAt } : {}),
    ...(meta.updatedAt ? { dateModified: meta.updatedAt } : {}),
  };
  return (
    <>
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="article-page">
        <Container className="max-w-page">
          <nav className="article-breadcrumb" aria-label="Breadcrumb">
            <Link href="/blogs">← All articles</Link>
            <span aria-hidden="true">/</span>
            <span>Engineering journal</span>
          </nav>
          <article aria-labelledby="article-title">
            <header className="article-header">
              <div className="article-meta">
                <BlogCategoryBadge category={meta.category} />
                {meta.demonstration && (
                  <span className="article-demo-badge">
                    Demonstration article
                  </span>
                )}
                <span>{meta.readingTime} min read</span>
              </div>
              <h1 id="article-title">{meta.title}</h1>
              <p className="article-deck">{meta.excerpt}</p>
              <div className="article-byline">
                <div>
                  {meta.author && <span>By {meta.author.name} · </span>}
                  {meta.publishedAt ? (
                    <time dateTime={meta.publishedAt}>
                      {formatBlogDate(meta.publishedAt)}
                    </time>
                  ) : (
                    <span>
                      {meta.demonstration ? "Editorial demo · " : ""}
                      No publication date
                    </span>
                  )}
                  {meta.updatedAt && (
                    <span>
                      {" "}
                      · Updated{" "}
                      <time dateTime={meta.updatedAt}>
                        {formatBlogDate(meta.updatedAt)}
                      </time>
                    </span>
                  )}
                </div>
                <CopyButton label="Copy article link" />
              </div>
              <ul className="article-tags" aria-label="Article tags">
                {meta.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </header>
            <figure className="article-cover">
              <Image
                src={meta.coverImage}
                alt={meta.coverImageAlt}
                width={800}
                height={520}
                sizes="(max-width: 768px) 100vw, 960px"
                loading="eager"
              />
              {meta.demonstration && (
                <figcaption>
                  Illustrative artwork. This demonstration does not report
                  measured project results.
                </figcaption>
              )}
            </figure>
            <div className="article-layout">
              <ReadingTools headings={headings} />
              <div id="article-body" className="article-prose">
                <Content components={mdxComponents} />
              </div>
            </div>
            <footer className="article-end">
              <span>
                {meta.demonstration ? "End of demonstration" : "End of article"}
              </span>
              <Link href="/blogs">← Back to all articles</Link>
            </footer>
          </article>
          <section
            className="article-related"
            aria-labelledby="related-heading"
          >
            <p className="eyebrow">Keep exploring</p>
            <h2 id="related-heading" className="type-h3">
              More from the journal
            </h2>
            <div>
              {getRelatedBlogs(meta.slug, 3).map((blog, index) => (
                <BlogCard key={blog.slug} article={blog} index={index} />
              ))}
            </div>
          </section>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
            }}
          />
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
