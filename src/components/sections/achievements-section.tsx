import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { AchievementCard } from "@/components/achievements/achievement-card";
import { portfolioAchievements } from "@/data/portfolio-achievements";
export function AchievementsSection() {
  return (
    <Section
      decoration="achievements"
      id="achievements"
      aria-labelledby="achievements-title"
      className="achievements-section"
    >
      <Container className="expertise-layout achievements-layout max-w-home">
        <div className="expertise-intro">
          <Badge variant="lavender" className="portfolio-section-badge">
            <Image
              src="/assets/tech-achievements/icon-trophy.svg"
              width={25}
              height={25}
              alt=""
            />
            Achievements
          </Badge>
          <SectionHeading
            className="expertise-heading achievements-heading"
            headingId="achievements-title"
            heading={"Impact,\nNot Just"}
            highlight="Code."
            description="A few highlights that reflect the impact, scale, and ownership in my work."
          />
        </div>
        <div className="expertise-art trophy-art" aria-hidden="true">
          <Image
            src="/assets/tech-achievements/decor-pink-orb.svg"
            width={360}
            height={360}
            alt=""
            className="expertise-orb"
          />
          <Image
            src="/assets/tech-achievements/achievement-trophy-illustration.svg"
            width={360}
            height={390}
            alt=""
            className="expertise-illustration"
          />
          <Image
            src="/assets/tech-achievements/doodle-burst.svg"
            width={80}
            height={70}
            alt=""
            className="expertise-burst"
          />
        </div>
        <ul className="achievement-grid" aria-label="Professional achievements">
          {portfolioAchievements.map((achievement) => (
            <li key={achievement.id}>
              <AchievementCard achievement={achievement} />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
