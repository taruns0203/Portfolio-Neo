export type ArticleStatus = "draft" | "published";
export type ArticleCategory =
  | "System Design"
  | "Performance"
  | "React"
  | "JavaScript"
  | "Node.js"
  | "Other";
export interface PortfolioArticle {
  id: string;
  title: string;
  excerpt: string;
  category: ArticleCategory;
  status: ArticleStatus;
  illustration: string;
  accent: "pink" | "mint" | "lavender" | "blue" | "yellow";
  /** Add only a confirmed published article URL. */
  href?: string;
  publishedAt?: string;
  readingMinutes?: number;
}

// Design examples are drafts. Publication dates, reading times and URLs are unknown.
export const articles: readonly PortfolioArticle[] = [
  {
    id: "microfrontends",
    title: "Monolith vs Micro Frontends",
    excerpt:
      "When should you split your frontend? A practical look at trade-offs and real-world use cases.",
    category: "System Design",
    status: "draft",
    illustration: "article-microfrontends.svg",
    accent: "pink",
  },
  {
    id: "web-vitals",
    title: "Core Web Vitals Made Simple",
    excerpt:
      "Understanding LCP, INP and CLS through practical optimization examples.",
    category: "Performance",
    status: "draft",
    illustration: "article-web-vitals.svg",
    accent: "mint",
  },
  {
    id: "react-rendering",
    title: "React 18 Under the Hood",
    excerpt: "A practical look at rendering, streaming, and Server Components.",
    category: "React",
    status: "draft",
    illustration: "article-react.svg",
    accent: "blue",
  },
];
