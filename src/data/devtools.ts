import type { ArchitectureNode, CodeExample } from "@/types/devtools";

export const devtoolsTabs = [
  { id: "overview", label: "Overview", icon: "overview" },
  { id: "architecture", label: "Architecture", icon: "architecture" },
  { id: "performance", label: "Performance", icon: "performance" },
  { id: "stack", label: "Tech Stack", icon: "tech-stack" },
  { id: "code", label: "Code Explorer", icon: "code-explorer" },
  { id: "decisions", label: "Design Decisions", icon: "design-decisions" },
  { id: "experiments", label: "Experiments", icon: "experiments" },
  { id: "about", label: "About This Site", icon: "about-site" },
] as const;
export type DevtoolsTab = (typeof devtoolsTabs)[number]["id"];

// No public repository or deployment has been verified for this portfolio.
export const publicRepositoryUrl: string | null = null;
export const deploymentProvider: string | null = null;
export const codeQuestUrl: string | null = null;

export const architectureNodes: ArchitectureNode[] = [
  {
    id: "browser",
    title: "Browser",
    icon: "browser",
    summary: "Readable HTML first, with focused interactive controls.",
    source: "src/components",
    boundary:
      "Client components own filters, copying, galleries and this drawer. Static prose does not need client state.",
    strategy:
      "The DevTools drawer is loaded on demand; the native modal makes the background inert.",
    tradeoff:
      "Small interactive boundaries reduce shipped code. A fully client-rendered app would simplify shared state but require more browser JavaScript.",
  },
  {
    id: "router",
    title: "App Router",
    icon: "terminal",
    summary: "Layouts, route rendering and per-article metadata.",
    source: "src/app/page.tsx · src/app/blogs/[slug]/page.tsx",
    boundary:
      "Server components compose the home page and compile local articles; browser APIs stay in client components.",
    strategy:
      "Home revalidates hourly. Article slugs are statically generated. Blog search uses dynamic rendering for initial URL-dependent results.",
    tradeoff:
      "Static pages are fast to serve but content changes need a rebuild. Dynamic rendering keeps query-dependent HTML accurate at request time.",
  },
  {
    id: "content",
    title: "Content & data",
    icon: "database",
    summary:
      "Typed local content, trusted MDX and server-side GitHub requests.",
    source: "src/data · src/lib/article-content.ts · src/lib/github.ts",
    boundary:
      "The article loader uses an explicit local file allowlist. GitHub credentials remain on the server.",
    strategy:
      "GitHub fetches use a one-hour revalidation policy and independent unavailable states. MDX derives headings and reading time.",
    tradeoff:
      "Local files keep authoring simple and versionable. A CMS could support editors, but would add a service and integration overhead.",
  },
  {
    id: "hosting",
    title: "Deployment",
    icon: "deployment",
    summary: "Provider not verified in this workspace.",
    source: "package.json",
    boundary:
      "A production build and start command exist. They do not establish where this website is hosted.",
    strategy: "No deployment platform or production cache behavior is claimed.",
    tradeoff:
      "Managed and self-hosted Next.js deployments have different operational costs. No choice is attributed to this project without evidence.",
  },
];

// Deliberately authored excerpts. Never read arbitrary files into the browser.
export const codeExamples: CodeExample[] = [
  {
    id: "route",
    path: "app/blogs/[slug]/page.tsx",
    label: "Portfolio code",
    description:
      "Excerpt: known local article slugs are generated at build time.",
    code: "export async function generateStaticParams() {\n  const blogs = getAllBlogs();\n  return blogs.map((blog) => ({\n    slug: blog.slug,\n  }));\n}",
  },
  {
    id: "utility",
    path: "lib/utils.ts",
    label: "Portfolio code",
    description:
      "Excerpt: the shared helper uses clsx and the project’s configured Tailwind merge function.",
    code: "export function cn(...inputs: ClassValue[]) {\n  return twMerge(clsx(inputs));\n}",
  },
  {
    id: "example",
    path: "examples/status.tsx",
    label: "Illustrative snippet",
    description:
      "Purpose-written example: represent missing measurements honestly. This is not a live metric collector.",
    code: 'type Metric = { value: number; unit: string } | null;\n\nexport function MetricLabel({ metric }: { metric: Metric }) {\n  return (\n    <span>\n      {metric ? `${metric.value} ${metric.unit}` : "Not measured"}\n    </span>\n  );\n}',
  },
];
export const decisions = [
  {
    title: "Server rendering, focused interactions",
    context:
      "Most portfolio content is editorial; a few controls need browser state.",
    decision:
      "Compose pages on the server and mark interactive components with use client.",
    alternatives: "A client-rendered SPA, or a purely static site.",
    tradeoffs:
      "Less client JavaScript for content, with more care needed around serializable props and server/client boundaries.",
    source: "src/app/page.tsx · src/components/article",
  },
  {
    title: "One visual vocabulary",
    context:
      "Home, journal and interactive tools share a recognizable identity.",
    decision:
      "Reuse Tailwind theme tokens, Space Grotesk, Inter, JetBrains Mono and shared controls.",
    alternatives: "Page-specific styles or a separate component framework.",
    tradeoffs:
      "Consistent color and spacing; shared tokens require care because changes affect several pages.",
    source: "src/styles/tokens.css · src/components/ui/button.tsx",
  },
  {
    title: "Local, trusted MDX",
    context: "Technical articles need code, images and interactive examples.",
    decision:
      "Compile allowlisted local MDX and derive heading IDs and reading time from the content.",
    alternatives: "A hosted CMS or plain Markdown without custom components.",
    tradeoffs:
      "Flexible authoring without another service. Content is trusted code and changes require a deployment.",
    source: "src/lib/article-content.ts · src/lib/article-analysis.ts",
  },
  {
    title: "Resilient external data",
    context:
      "GitHub can be unavailable or rate-limited independently of the portfolio.",
    decision:
      "Fetch on the server, cache hourly and preserve independent unavailable states.",
    alternatives: "Client-side API requests or manually maintained counters.",
    tradeoffs:
      "Protects credentials and reduces requests, but statistics can be stale between refreshes.",
    source: "src/lib/github.ts",
  },
];
export const performanceWork = [
  [
    "Code splitting",
    "This drawer loads on demand via next/dynamic. Its code viewer loads only when opened.",
  ],
  [
    "Lazy media",
    "Article images use next/image with intrinsic dimensions; ordinary images retain lazy loading.",
  ],
  [
    "Caching",
    "Home and GitHub data use hourly revalidation. This is a configured policy, not a measured cache hit rate.",
  ],
  [
    "Server rendering",
    "Articles have build-time HTML. Blog results are rendered for the requested URL, including without JavaScript.",
  ],
  [
    "Image delivery",
    "Next.js Image handles eligible assets. Local SVG illustrations are served as SVG, not raster-optimized.",
  ],
  [
    "Bundle strategy",
    "Interactive features use client boundaries. No bundle-size baseline or reduction is claimed.",
  ],
];
