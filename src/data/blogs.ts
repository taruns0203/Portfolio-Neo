export type BlogCategory =
  "Frontend" | "System Design" | "Performance" | "Engineering";

export type BlogStatus = "draft" | "published" | "demo";

export type BlogAccent = "yellow" | "lavender" | "coral" | "blue" | "mint";

export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  tags: readonly string[];
  coverImage: string;
  readingMinutes: number;
  publishedAt: string | null;
  featured: boolean;
  status: BlogStatus;
  accent: BlogAccent;
  number: string;
  outline: readonly string[];
  keyTakeaways: readonly string[];
}

export const blogs: readonly BlogArticle[] = [
  {
    id: "microfrontends",
    slug: "from-monolith-to-micro-frontends",
    title: "From Monolith to Micro Frontends",
    excerpt:
      "A practical guide to breaking a large frontend into independent, scalable micro frontends with real-world trade-offs.",
    category: "Frontend",
    tags: [
      "Micro Frontends",
      "Architecture",
      "Module Federation",
      "Webpack",
      "Scalability",
    ],
    coverImage: "/images/blogs/article-microfrontends.svg",
    readingMinutes: 12,
    publishedAt: null,
    featured: true,
    status: "draft",
    accent: "coral",
    number: "01/",
    outline: [
      "Why Monoliths Hit Organizational Ceilings at Scale",
      "Module Federation vs. Build-Time Packages: The Trade-off Matrix",
      "Designing Shared Contract Interfaces and Versioning Protocols",
      "State Sharing & Cross-Microfrontend Communication Patterns",
      "Zero-Downtime Deployment & Independent CI/CD Pipelines",
    ],
    keyTakeaways: [
      "Micro frontends are an organizational scaling tool, not a technical default.",
      "Module Federation enables dynamic runtime sharing without heavy bundle duplication.",
      "Strict contract boundaries prevent brittle runtime version mismatches.",
    ],
  },
  {
    id: "core-web-vitals",
    slug: "mastering-core-web-vitals",
    title: "Optimizing Next.js for Core Web Vitals — A Demonstration",
    excerpt:
      "A demonstration of a thoughtful performance workflow: discover the critical content, keep interactions small, and make room for every pixel.",
    category: "Performance",
    tags: ["Core Web Vitals", "LCP", "INP", "CLS", "Web Performance"],
    coverImage: "/images/blogs/article-core-web-vitals.svg",
    readingMinutes: 10,
    publishedAt: null,
    featured: false,
    status: "demo",
    accent: "yellow",
    number: "01/",
    outline: [
      "Deconstructing Largest Contentful Paint (LCP): Fetch Priority & Image CDN Pipelines",
      "Taming Interaction to Next Paint (INP): Long Tasks, Yielding & Scheduler API",
      "Eliminating Cumulative Layout Shift (CLS): Explicit Aspect Ratios & Font Fallbacks",
      "Real-User Monitoring (RUM) Instrumentation vs. Synthetic Lab Testing",
      "Continuous Performance Guardrails in Pull Request Workflows",
    ],
    keyTakeaways: [
      "LCP is dominated by server response time and resource load discovery delays.",
      "Optimizing INP requires breaking up JavaScript execution into micro-tasks.",
      "Reserve layout slots early to keep CLS below the 0.1 threshold.",
    ],
  },
  {
    id: "system-design-crm",
    slug: "designing-a-scalable-real-estate-crm",
    title: "Designing a Scalable Real Estate CRM",
    excerpt:
      "Key architectural principles, multi-tenant data modeling, and performance decisions for an enterprise CRM.",
    category: "System Design",
    tags: [
      "System Design",
      "Multi-tenancy",
      "Architecture",
      "PostgreSQL",
      "Event-Driven",
    ],
    coverImage: "/images/blogs/article-system-design.svg",
    readingMinutes: 14,
    publishedAt: null,
    featured: false,
    status: "draft",
    accent: "lavender",
    number: "02/",
    outline: [
      "Multi-Tenant Isolation Models: Row-Level Security vs. Schema Per Tenant",
      "Event-Driven Audit Logging with Outbox Patterns and Kafka",
      "Optimizing Heavy Search Queries across Millions of Property Records",
      "Handling Real-Time Notification Pipelines with WebSockets and Redis",
      "Resilient Role-Based Access Control (RBAC) in Enterprise Workflows",
    ],
    keyTakeaways: [
      "PostgreSQL Row-Level Security provides cost-effective tenant data isolation.",
      "Transactional outboxes prevent lost events between database writes and message brokers.",
      "Denormalized read projections drastically improve complex search query latencies.",
    ],
  },
  {
    id: "react-rendering",
    slug: "react-rendering-what-really-changed",
    title: "React Rendering: What Really Changed?",
    excerpt:
      "A deep dive into React concurrent rendering, selective hydration, and what modern React developers need to know.",
    category: "Frontend",
    tags: [
      "React 19",
      "Concurrent Mode",
      "Server Components",
      "Fiber",
      "Reconciliation",
    ],
    coverImage: "/images/blogs/article-frontend-architecture.svg",
    readingMinutes: 8,
    publishedAt: null,
    featured: false,
    status: "draft",
    accent: "coral",
    number: "03/",
    outline: [
      "From Synchronous Recursion to Fiber Time-Slicing",
      "Transitions and Action States: Prioritizing User Input over Background Work",
      "React Server Components (RSC): Moving the Component Boundary to the Server",
      "Selective Hydration and Streaming HTML Architecture",
      "Common Mental Model Pitfalls in Concurrent React",
    ],
    keyTakeaways: [
      "Concurrent rendering is about interruptible work, not parallel multi-threading.",
      "Server Components render once to a serializable stream, shipping 0kB JS.",
      "startTransition prevents slow rendering from freezing user typing and clicks.",
    ],
  },
  {
    id: "nextjs-optimization",
    slug: "how-i-optimized-a-nextjs-app",
    title: "How I Optimized a Next.js App",
    excerpt:
      "A real-world case study diagnosing bundle bloat, caching bottlenecks, and shaving 1.8s off TTFB.",
    category: "Performance",
    tags: [
      "Next.js",
      "Bundle Analysis",
      "SSR",
      "Image Optimization",
      "Turbopack",
    ],
    coverImage: "/images/blogs/article-nextjs-performance.svg",
    readingMinutes: 11,
    publishedAt: null,
    featured: false,
    status: "draft",
    accent: "mint",
    number: "04/",
    outline: [
      "Profiling Bundle Sizes with @next/bundle-analyzer and Webpack Stat Graphs",
      "Eliminating Heavy Client-Side Icon and Date Libraries",
      "Tuning Full Route Cache and Data Cache in Next.js App Router",
      "Configuring Next/Image for Modern AVIF/WebP Formats with Edge CDN Caching",
      "Measuring Before/After Metrics: From 52 to 98 Lighthouse Score",
    ],
    keyTakeaways: [
      "Server Component boundaries prevent heavy utility libraries from reaching client bundles.",
      "Selective dynamic imports postpone loading non-critical modal and chart modules.",
      "Fine-grained tag-based revalidation delivers instant cache hits with fresh data.",
    ],
  },
  {
    id: "idempotency-keys",
    slug: "idempotency-keys-build-reliable-apis",
    title: "Idempotency Keys: Build Reliable APIs",
    excerpt:
      "Preventing duplicate payments and erratic retries by implementing distributed idempotency keys.",
    category: "Engineering",
    tags: [
      "API Design",
      "Distributed Systems",
      "Redis",
      "Resilience",
      "Transactions",
    ],
    coverImage: "/images/blogs/article-idempotency.svg",
    readingMinutes: 9,
    publishedAt: null,
    featured: false,
    status: "draft",
    accent: "blue",
    number: "05/",
    outline: [
      "The Anatomy of Network Failures and Unsafe HTTP Mutations",
      "Designing the Idempotency Key Lifecycle: IN_PROGRESS, SUCCEEDED, FAILED",
      "Distributed Locking with Redis Redlock and Atomic Set-If-Not-Exists",
      "Caching Payload Hashes to Prevent Tampered Payload Collisions",
      "End-to-End Implementation in Node.js / TypeScript Middleware",
    ],
    keyTakeaways: [
      "Network timeouts are ambiguous: the server might have succeeded while the response dropped.",
      "Locking during request processing prevents concurrent race conditions on the same key.",
      "Payload hashing verifies the sender did not recycle the key for a different operation.",
    ],
  },
  {
    id: "cdn-caching",
    slug: "cdn-caching-performance-at-scale",
    title: "CDN, Caching & Performance at Scale",
    excerpt:
      "Architecting multi-tier caching strategies across edge CDNs, reverse proxies, and client memory.",
    category: "Performance",
    tags: [
      "CDN",
      "Cache-Control",
      "Edge Computing",
      "Stale-While-Revalidate",
      "HTTP",
    ],
    coverImage: "/images/blogs/article-caching.svg",
    readingMinutes: 13,
    publishedAt: null,
    featured: false,
    status: "draft",
    accent: "lavender",
    number: "06/",
    outline: [
      "The Multi-Tier Cache Hierarchy: Browser, Service Worker, Edge CDN, Origin",
      "Demystifying HTTP Headers: max-age, s-maxage, stale-while-revalidate, and immutable",
      "Edge Compute for Geolocation Routing and Dynamic Header Injection",
      "Cache Invalidation Architectures: Surrogate-Keys and Purge APIs",
      "Handling Stale Data Gracefully with Optimistic UI Patterns",
    ],
    keyTakeaways: [
      "stale-while-revalidate serves instantaneous responses while fetching updates asynchronously.",
      "Surrogate keys (Cache-Tags) enable targeted, instant invalidation of related pages.",
      "Proper Vary headers prevent cache poisoning between compressed and mobile variants.",
    ],
  },
];

export const CATEGORIES: readonly BlogCategory[] = [
  "Frontend",
  "System Design",
  "Performance",
  "Engineering",
];

export interface CategoryCount {
  name: "All" | BlogCategory;
  count: number;
}

export function getAllBlogs(): readonly BlogArticle[] {
  return blogs;
}

export function getFeaturedBlog(): BlogArticle {
  return blogs.find((blog) => blog.featured) ?? blogs[0];
}

export function getBlogBySlug(slug: string): BlogArticle | undefined {
  return blogs.find((blog) => blog.slug === slug);
}

export function getRelatedBlogs(
  currentSlug: string,
  limit = 3,
): readonly BlogArticle[] {
  const current = getBlogBySlug(currentSlug);
  if (!current) return blogs.slice(0, limit);

  const sameCategory = blogs.filter(
    (b) => b.slug !== currentSlug && b.category === current.category,
  );
  const otherCategories = blogs.filter(
    (b) => b.slug !== currentSlug && b.category !== current.category,
  );

  return [...sameCategory, ...otherCategories].slice(0, limit);
}

export function getCategoryCounts(
  articles: readonly BlogArticle[] = blogs,
): readonly CategoryCount[] {
  const counts: CategoryCount[] = [
    {
      name: "All",
      count: articles.length,
    },
  ];

  for (const cat of CATEGORIES) {
    const count = articles.filter((b) => b.category === cat).length;
    counts.push({
      name: cat,
      count,
    });
  }

  return counts;
}

/** Formats a published date string, or returns null if draft/unspecified. Never fabricates dates. */
export function formatBlogDate(publishedAt: string | null): string | null {
  if (!publishedAt) return null;
  const date = new Date(publishedAt);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}
