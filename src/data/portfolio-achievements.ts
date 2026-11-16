import type { SkillTone } from "./portfolio-skills";
export interface PortfolioAchievement {
  id: string;
  metric: string;
  title: string;
  description: string;
  icon: string;
  tone: SkillTone;
}
// Supplied verified content. A performance score is not a CWV pass-rate claim.
// There is no measured baseline for the reference image's 2X claim; do not use it.
export const portfolioAchievements: readonly PortfolioAchievement[] = [
  {
    id: "migration",
    metric: "1,200+",
    title: "Pages Migrated",
    description: "Sitecore → Contentful in three months, with zero downtime",
    icon: "icon-window.svg",
    tone: "mint",
  },
  {
    id: "performance",
    metric: "90+",
    title: "Page Speed Score",
    description: "Resume-reported 90+ page speed score for Junk.com",
    icon: "icon-bolt.svg",
    tone: "yellow",
  },
  {
    id: "leadership",
    metric: "3",
    title: "Developers Led",
    description: "Led a three-person team on the Junk.com project",
    icon: "icon-users.svg",
    tone: "lavender",
  },
  {
    id: "architecture",
    metric: "30%",
    title: "Fewer Redundant Requests",
    description:
      "Reduced redundant network requests with AWS AppSync at Movingful",
    icon: "icon-trending.svg",
    tone: "pink",
  },
];
