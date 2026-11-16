import { GithubStatsSection } from "@/components/sections/github-stats-section";
import { ContactSection } from "@/components/sections/contact-section";
import { SiteFooter } from "@/components/layout/site-footer";
import { WritingSection } from "@/components/sections/writing-section";
import { CurrentWorkSection } from "@/components/sections/current-work-section";
import { PerformanceSection } from "@/components/sections/performance-section";
import { TechStackSection } from "@/components/sections/tech-stack-section";
import { AchievementsSection } from "@/components/sections/achievements-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { AboutSection } from "@/components/sections/about-section";
import { HeroSection } from "@/components/home/hero-section";
import { DestinationNotices } from "@/components/layout/destination-notices";
import { SiteHeader } from "@/components/layout/site-header";

export const revalidate = 3600;

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <GithubStatsSection />
        <TechStackSection />
        <AchievementsSection />
        <PerformanceSection />
        <CurrentWorkSection />
        <WritingSection />
        <ContactSection />
      </main>
      <DestinationNotices />
      <SiteFooter />
    </>
  );
}
