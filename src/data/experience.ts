export interface ExperienceItem {
  id: string;
  title: string;
  employer: string;
  dateLabel: string;
  confirmed: boolean;
  summary: string;
  note?: string;
  highlights: readonly { title: string; points: readonly string[] }[];
}
// Source: user-supplied Tarun-Sharma-Resume (2).pdf.
export const experience: readonly ExperienceItem[] = [
  {
    id: "allmysons",
    title: "Senior Full Stack Developer",
    employer: "Client: Allmysons.com",
    dateLabel: "Mar 2022 – Present",
    confirmed: true,
    summary:
      "Secure platforms, a zero-downtime CMS migration, and frontend leadership across Allmysons.com, Junk.com, and Movingful.",
    note: "Continuous client engagement across GNB Labs → Astria Digital → Dotsoft Business Solutions → Astria Digital. Company changes reflect contract changes, not voluntary job changes.",
    highlights: [
      {
        title: "Allmysons.com · Full Stack Developer",
        points: [
          "Architected JWT authentication with refresh-token rotation and reuse detection; implemented TOTP MFA with encrypted secrets and QR provisioning.",
          "Designed Admin, Seller, and Customer RBAC with PostgreSQL/Prisma, Redis sessions, and token blacklisting.",
          "Migrated 1,200+ pages from Sitecore to Contentful within three months, with zero downtime; modernized to Next.js App Router and SSR for SEO and Core Web Vitals.",
          "Resolved an API waterfall through request batching and strategic caching, eliminating redundant network calls.",
          "Built an AWS Lambda partner-onboarding pipeline to automate lead capture and processing.",
          "Used Cursor to accelerate TypeScript refactors and strengthen type safety and code review quality.",
        ],
      },
      {
        title: "Junk.com · Frontend Lead",
        points: [
          "Led a three-engineer team on a greenfield Next.js App Router, TypeScript, and Material UI website, owning architecture, reviews, and sprint delivery.",
          "Integrated HubSpot for lead capture and ticket routing; achieved a 90+ page speed score through memoization, lazy loading, and code splitting.",
          "Automated branch-based dev, staging, and production deployments on AWS Amplify.",
        ],
      },
      {
        title: "Movingful · Frontend Developer",
        points: [
          "Built an accessible React/TypeScript component library from Figma designs with Storybook.",
          "Integrated AWS AppSync GraphQL, reducing redundant network requests by 30%.",
          "Enforced TypeScript and code-quality standards through structured code review.",
        ],
      },
    ],
  },
  {
    id: "multimetal",
    title: "Full Stack Developer",
    employer: "Multimetal Limited · Kota, Rajasthan",
    dateLabel: "Jul 2021 – Feb 2022",
    confirmed: true,
    summary:
      "Built ERP modules for secretarial operations and delivery tracking.",
    highlights: [
      {
        title: "ERP development",
        points: [
          "Developed and enhanced ERP modules using React.js, PHP, Laravel, and SQL.",
          "Built responsive interfaces, integrated REST APIs, and optimized SQL queries for faster retrieval.",
        ],
      },
    ],
  },
  {
    id: "lata",
    title: "Full Stack Developer",
    employer: "Lata Software · Kota, Rajasthan",
    dateLabel: "Mar 2020 – Jun 2021",
    confirmed: true,
    summary:
      "Delivered web and cross-platform mobile applications for client projects.",
    highlights: [
      {
        title: "Web & mobile delivery",
        points: [
          "Built and deployed JavaScript, PHP, React.js, and Cordova apps for Android and iOS.",
          "Integrated real-time chat, payment gateways, Zoom APIs, and e-commerce functionality.",
        ],
      },
    ],
  },
];
