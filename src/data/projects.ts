export interface FeaturedProject {
  id: string;
  title: string;
  description: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  tags: readonly string[];
  tone: "pink" | "mint" | "yellow";
  url: string | null;
}
// Preview images are supplied concept illustrations, not production screenshots.
// Only replace null URLs with confirmed public destinations.
export const projects: readonly FeaturedProject[] = [
  {
    id: "allmysons",
    title: "AllMySons.com",
    description:
      "Migrated 1,200+ pages from Sitecore to Contentful in three months with zero downtime. Built secure JWT/MFA authentication, RBAC, and AWS Lambda onboarding.",
    image: "project-allmysons-preview.png",
    imageWidth: 415,
    imageHeight: 212,
    tags: ["Next.js", "Contentful", "Prisma", "Redis", "AWS"],
    tone: "pink",
    url: null,
  },
  {
    id: "junk",
    title: "Junk.com",
    description:
      "Led three engineers on a Next.js website with HubSpot lead capture, a 90+ page speed score, and branch-based CI/CD on AWS Amplify.",
    image: "project-junk-preview.png",
    imageWidth: 423,
    imageHeight: 212,
    tags: ["Next.js", "TypeScript", "Material UI", "HubSpot"],
    tone: "mint",
    url: null,
  },
  {
    id: "movingful",
    title: "Movingful",
    description:
      "Built an accessible React/TypeScript component library using Figma and Storybook. Integrated AWS AppSync GraphQL, reducing redundant network requests by 30%.",
    image: "project-movingful-preview.svg",
    imageWidth: 417,
    imageHeight: 212,
    tags: ["React", "TypeScript", "Storybook", "AWS AppSync"],
    tone: "yellow",
    url: null,
  },
];
