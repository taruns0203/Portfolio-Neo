import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { TechnologyTile } from "@/components/tech/technology-tile";
import { portfolioSkills, skillGroups } from "@/data/portfolio-skills";
export function TechStackSection() {
  return (
    <Section
      decoration="technology"
      id="tech-stack"
      aria-labelledby="tech-stack-title"
    >
      <Container className="expertise-layout tech-stack-layout max-w-home">
        <div className="expertise-intro">
          <Badge variant="yellow" className="portfolio-section-badge">
            <Image
              src="/assets/tech-achievements/icon-layers.svg"
              width={25}
              height={25}
              alt=""
            />
            Tech Stack
          </Badge>
          <SectionHeading
            className="expertise-heading tech-stack-heading"
            headingId="tech-stack-title"
            heading="My Developer"
            highlight="Arsenal."
            description="The tools and technologies I use to build scalable, high-performance and delightful products."
          />
        </div>
        <div className="expertise-art tech-workspace-art" aria-hidden="true">
          <Image
            src="/assets/tech-achievements/decor-yellow-orb.svg"
            width={420}
            height={420}
            alt=""
            className="expertise-orb"
          />
          <Image
            src="/assets/tech-achievements/tech-workspace-illustration.svg"
            width={480}
            height={345}
            alt=""
            className="expertise-illustration"
          />
          <Image
            src="/assets/tech-achievements/doodle-arrow.svg"
            width={110}
            height={70}
            alt=""
            className="expertise-arrow"
          />
          <Image
            src="/assets/tech-achievements/doodle-burst.svg"
            width={80}
            height={70}
            alt=""
            className="expertise-burst"
          />
        </div>
        <ul className="technology-grid" aria-label="Technologies I use">
          {portfolioSkills.map((skill) => (
            <li key={skill.name}>
              <TechnologyTile skill={skill} />
            </li>
          ))}
        </ul>
        <dl className="resume-skill-groups">
          {skillGroups.map((group) => (
            <div key={group.title}>
              <dt>{group.title}</dt>
              <dd>{group.skills}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
