import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import remarkGfm from "remark-gfm";
import { getBlogBySlug, type BlogCategory } from "@/data/blogs";
import { analyzeArticle, type TocHeading } from "./article-analysis";

export interface ArticleMetadata {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  tags: readonly string[];
  author: { name: string; url?: string } | null;
  publishedAt: string | null;
  updatedAt?: string;
  coverImage: string;
  coverImageAlt: string;
  readingTime: number;
  featured: boolean;
  demonstration: boolean;
}
// Explicit allowlist: never derive filesystem paths from a request slug.
const sources: Record<
  string,
  {
    file: string;
    author: ArticleMetadata["author"];
    coverImageAlt: string;
    demonstration: boolean;
  }
> = {
  "mastering-core-web-vitals": {
    file: "core-web-vitals.mdx",
    author: null,
    coverImageAlt:
      "Illustrated performance gauge, used as demonstration artwork",
    demonstration: true,
  },
};

export const getArticleContent = cache(async (slug: string) => {
  const source = Object.hasOwn(sources, slug) ? sources[slug] : undefined;
  const blog = getBlogBySlug(slug);
  if (!source || !blog) return null;
  const body = await readFile(
    path.join(process.cwd(), "src/content/articles", source.file),
    "utf8",
  );
  let analysis: { headings: TocHeading[]; readingTime: number } = {
    headings: [],
    readingTime: 1,
  };
  const compiled = await evaluate(body, {
    ...runtime,
    remarkPlugins: [
      remarkGfm,
      () => (tree) => {
        analysis = analyzeArticle(tree);
      },
    ],
  });
  const metadata: ArticleMetadata = {
    slug,
    title: blog.title,
    excerpt: blog.excerpt,
    category: blog.category,
    tags: blog.tags,
    author: source.author,
    publishedAt: blog.publishedAt,
    coverImage: blog.coverImage,
    coverImageAlt: source.coverImageAlt,
    readingTime: analysis.readingTime,
    featured: blog.featured,
    demonstration: source.demonstration,
  };
  return { Content: compiled.default, metadata, headings: analysis.headings };
});
