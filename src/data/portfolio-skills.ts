export type SkillTone = "lavender" | "yellow" | "blue" | "mint" | "pink";
export interface PortfolioSkill {
  name: string;
  icon: string;
  tone: SkillTone;
}
export const portfolioSkills: readonly PortfolioSkill[] = [
  { name: "React", icon: "tech-react.svg", tone: "lavender" },
  { name: "Next.js", icon: "tech-nextjs.svg", tone: "yellow" },
  { name: "TypeScript", icon: "tech-typescript.svg", tone: "blue" },
  { name: "Node.js", icon: "tech-nodejs.svg", tone: "mint" },
  { name: "PostgreSQL", icon: "tech-postgresql.svg", tone: "mint" },
  { name: "AWS", icon: "tech-aws.svg", tone: "lavender" },
  { name: "Docker", icon: "tech-docker.svg", tone: "yellow" },
  { name: "Tailwind CSS", icon: "tech-tailwind.svg", tone: "pink" },
];

export const skillGroups = [
  {
    title: "Frontend",
    skills:
      "React.js, Next.js App & Pages Router, TypeScript, JavaScript ES6+, HTML5, CSS3, Tailwind CSS, Material UI 5, Redux, Zustand",
  },
  {
    title: "Backend & API Design",
    skills:
      "Node.js, Express.js, REST APIs, GraphQL / AWS AppSync, JWT, OAuth2, RBAC",
  },
  {
    title: "Data & Caching",
    skills:
      "PostgreSQL, Prisma ORM, Redis sessions, caching strategies, token blacklisting",
  },
  {
    title: "Cloud, DevOps & Architecture",
    skills:
      "AWS ECS Fargate, ECR, ALB, IAM, S3, Lambda, Amplify; Docker, GitHub Actions, CI/CD, Turborepo, microservices, system design",
  },
  {
    title: "Tools & Practices",
    skills:
      "Storybook, HubSpot API, Contentful, Sitecore, Git/GitHub, Agile/Scrum, Figma, technical leadership and mentorship",
  },
] as const;
