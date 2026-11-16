import { getArticleContent } from "@/lib/article-content";
import { ArticlePage } from "@/components/article/article-page";
import { BlogCategoryBadge } from "@/components/blogs/blog-category-badge";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Clock,
  Sparkles,
  BookOpen,
  CheckCircle2,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { DestinationNotices } from "@/components/layout/destination-notices";
import { BlogCard } from "@/components/blogs/blog-card";
import {
  getAllBlogs,
  getBlogBySlug,
  getRelatedBlogs,
  formatBlogDate,
} from "@/data/blogs";
import { site } from "@/config/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const blogs = getAllBlogs();
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Article Not Found",
    };
  }

  const article = await getArticleContent(slug);
  return {
    title: blog.title,
    robots:
      blog.status !== "published" ? { index: false, follow: true } : undefined,
    twitter: { card: "summary", title: blog.title, description: blog.excerpt },
    description: blog.excerpt,
    alternates: {
      canonical: `/blogs/${blog.slug}`,
    },
    openGraph: {
      title: `${blog.title} · ${site.name}`,
      description: blog.excerpt,
      url: `/blogs/${blog.slug}`,
      type: "article",
      ...(article?.metadata.author
        ? { authors: [article.metadata.author.name] }
        : {}),
      ...(article?.metadata.publishedAt
        ? { publishedTime: article.metadata.publishedAt }
        : {}),
      ...(article?.metadata.updatedAt
        ? { modifiedTime: article.metadata.updatedAt }
        : {}),
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const article = await getArticleContent(slug);
  if (article) return <ArticlePage article={article} />;

  const publishedDate = formatBlogDate(blog.publishedAt);
  const relatedBlogs = getRelatedBlogs(blog.slug, 3);
  const artBgClass = `blog-art-bg-${blog.accent}`;

  return (
    <>
      <SiteHeader />
      <main
        id="main-content"
        tabIndex={-1}
        className="blog-page min-h-screen pb-20"
      >
        <Container className="max-w-page pt-8 md:pt-12">
          {/* Top Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 font-mono text-xs md:text-sm font-bold text-foreground bg-surface border-2 border-border-strong px-3.5 py-2 rounded-md shadow-[2px_2px_0px_var(--color-border-strong)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-pressed active:translate-x-1 active:translate-y-1 transition-all"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              BACK TO ALL ARTICLES
            </Link>
          </nav>

          {/* Article Header */}
          <header className="space-y-4 max-w-4xl">
            {/* Meta tags */}
            <div className="flex flex-wrap items-center gap-2.5">
              <BlogCategoryBadge category={blog.category} />

              {publishedDate ? (
                <span className="font-mono text-xs text-muted-foreground font-semibold">
                  {publishedDate}
                </span>
              ) : (
                <span className="inline-flex items-center bg-disabled text-disabled-foreground font-mono text-xs font-bold px-2.5 py-1 rounded-sm border border-border-strong/40">
                  SAMPLE / DRAFT
                </span>
              )}

              <span className="inline-flex items-center gap-1 font-mono text-xs text-muted-foreground ml-auto">
                <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                {blog.readingMinutes} min read
              </span>
            </div>

            {/* Giant Title */}
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight leading-[1.08]">
              {blog.title}
            </h1>

            {/* Excerpt Lead */}
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-medium leading-relaxed">
              {blog.excerpt}
            </p>

            {/* Tag Badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-xs text-muted-foreground bg-background border border-border px-2.5 py-1 rounded-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </header>

          {/* Hero Artwork Frame */}
          <div
            className={`my-10 border-3 border-border-strong rounded-xl shadow-brutalist-lg p-6 md:p-12 flex items-center justify-center relative overflow-hidden ${artBgClass}`}
          >
            {/* Retro window dots */}
            <div
              className="absolute top-4 left-5 flex items-center gap-1.5"
              aria-hidden="true"
            >
              <span className="w-3 h-3 rounded-full bg-border-strong" />
              <span className="w-3 h-3 rounded-full bg-border-strong opacity-40" />
              <span className="w-3 h-3 rounded-full bg-border-strong opacity-20" />
            </div>

            <div className="relative w-full max-w-[700px] aspect-[800/520] mt-4">
              <Image
                src={blog.coverImage}
                alt={blog.title}
                fill
                loading="eager"
                sizes="(max-width: 1024px) 100vw, 700px"
                className="object-contain"
              />
            </div>
          </div>

          <section
            aria-labelledby="article-status-title"
            className="my-12 p-6 md:p-10 border-3 border-border-strong rounded-xl bg-surface shadow-brutalist-lg space-y-8"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-6 border-b-2 border-border-strong">
              <div className="w-12 h-12 rounded-xl bg-yellow border-2 border-border-strong flex items-center justify-center shadow-[2px_2px_0px_var(--color-border-strong)] shrink-0">
                <Sparkles
                  className="w-6 h-6 text-foreground"
                  aria-hidden="true"
                />
              </div>
              <div>
                <h2
                  id="article-status-title"
                  className="font-display text-xl md:text-2xl font-black text-foreground tracking-tight"
                >
                  Article in active draft — Coming soon
                </h2>
                <p className="text-sm md:text-base text-muted-foreground mt-0.5">
                  This technical deep-dive is being prepared for upcoming
                  publication. Below is an outline of what this piece covers.
                </p>
              </div>
            </div>

            {/* Topics Outline */}
            <div>
              <h3 className="font-mono text-xs md:text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2 mb-4">
                <BookOpen className="w-4 h-4" aria-hidden="true" />
                Table of Contents &amp; Planned Sections
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {blog.outline.map((item, idx) => (
                  <div
                    key={item}
                    className="p-4 bg-background border-2 border-border-strong rounded-lg shadow-[2px_2px_0px_var(--color-border-strong)] flex items-start gap-3"
                  >
                    <span className="font-mono text-sm font-black text-foreground bg-yellow px-2 py-0.5 rounded-sm border border-border-strong">
                      0{idx + 1}
                    </span>
                    <span className="font-sans text-sm font-semibold text-foreground leading-snug">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Takeaways */}
            <div className="pt-4">
              <h3 className="font-mono text-xs md:text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2 mb-4">
                <CheckCircle2
                  className="w-4 h-4 text-success"
                  aria-hidden="true"
                />
                Key Architectural Takeaways
              </h3>
              <ul className="space-y-3">
                {blog.keyTakeaways.map((takeaway) => (
                  <li
                    key={takeaway}
                    className="flex items-start gap-3 text-sm md:text-base text-foreground font-medium"
                  >
                    <span className="w-2 h-2 rounded-full bg-border-strong mt-2 shrink-0" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Related Articles Section */}
          {relatedBlogs.length > 0 && (
            <section
              className="mt-16 pt-10 border-t-2 border-border-strong"
              aria-labelledby="related-heading"
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    CONTINUE READING
                  </p>
                  <h2
                    id="related-heading"
                    className="font-display text-2xl md:text-3xl font-extrabold text-foreground tracking-tight mt-1"
                  >
                    More from the Journal
                  </h2>
                </div>
                <Link
                  href="/blogs"
                  className="font-mono text-xs font-bold uppercase text-primary underline underline-offset-4 hidden sm:inline"
                >
                  View all ({getAllBlogs().length}) →
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {relatedBlogs.map((article, index) => (
                  <BlogCard key={article.id} article={article} index={index} />
                ))}
              </div>
            </section>
          )}

          {/* Bottom Actions */}
          <div className="mt-14 pt-8 border-t-2 border-border-strong flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 bg-yellow text-foreground font-sans text-sm font-bold px-5 py-3 rounded-md border-2 border-border-strong shadow-brutalist hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-pressed active:translate-x-1 active:translate-y-1 transition-all"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              BACK TO JOURNAL
            </Link>

            <Link
              href="/#work"
              className="inline-flex items-center gap-2 bg-surface text-foreground font-sans text-sm font-bold px-5 py-3 rounded-md border-2 border-border-strong shadow-[2px_2px_0px_var(--color-border-strong)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-pressed active:translate-x-1 active:translate-y-1 transition-all"
            >
              PORTFOLIO HOME
            </Link>
          </div>
        </Container>
      </main>
      <DestinationNotices />
      <SiteFooter />
    </>
  );
}
