import { getArticleContent } from "@/lib/article-content";
import { connection } from "next/server";
import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { DestinationNotices } from "@/components/layout/destination-notices";
import { BlogHero } from "@/components/blogs/blog-hero";
import { FeaturedArticle } from "@/components/blogs/featured-article";
import { BlogsClientContainer } from "@/components/blogs/blogs-client-container";
import { getAllBlogs, getFeaturedBlog, getCategoryCounts } from "@/data/blogs";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Engineering Journal",
  description:
    "Technical deep-dives, frontend architecture, system design notes, and real-world performance lessons by Tarun Sharma.",
  alternates: {
    canonical: "/blogs",
  },
  twitter: {
    card: "summary",
    title: `Engineering Journal · ${site.name}`,
    description:
      "Technical deep-dives, frontend architecture, and system design notes.",
  },
  openGraph: {
    title: `Engineering Journal · ${site.name}`,
    description:
      "Technical deep-dives, frontend architecture, system design notes, and real-world performance lessons.",
    url: "/blogs",
    type: "website",
  },
};

export default async function BlogsPage() {
  // Render URL-dependent results in the initial HTML, including without JavaScript.
  await connection();
  const allBlogs = await Promise.all(
    getAllBlogs().map(async (blog) => {
      const article = await getArticleContent(blog.slug);
      return article
        ? { ...blog, readingMinutes: article.metadata.readingTime }
        : blog;
    }),
  );
  const featuredBlog = getFeaturedBlog();
  const categoryCounts = getCategoryCounts(allBlogs);

  return (
    <>
      <SiteHeader />
      <main
        id="main-content"
        tabIndex={-1}
        className="blog-page min-h-screen pb-20"
      >
        <Container className="max-w-home">
          {/* Hero Section */}
          <BlogHero />

          {/* Featured Article Banner */}
          <FeaturedArticle article={featuredBlog} />

          {/* Interactive Topic Filters, Grid & Pagination */}
          <BlogsClientContainer
            articles={allBlogs}
            categoriesWithCounts={categoryCounts}
          />
        </Container>
      </main>
      <DestinationNotices />
      <SiteFooter />
    </>
  );
}
