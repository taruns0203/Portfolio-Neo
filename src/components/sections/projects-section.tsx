import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { HighlightText } from "@/components/ui/highlight-text";
import { FeaturedProjectCard } from "@/components/projects/featured-project-card";
import { projects } from "@/data/projects";
export function ProjectsSection() {
  return (
    <Section
      decoration="projects"
      id="work"
      aria-labelledby="projects-title"
      className="projects-section"
    >
      <Container className="projects-layout max-w-home">
        <div className="projects-intro">
          <Badge variant="yellow" className="portfolio-section-badge">
            <Image
              src="/assets/experience-projects/icon-project-cube.svg"
              width={25}
              height={25}
              alt=""
            />
            Projects
          </Badge>
          <h2 id="projects-title" className="portfolio-section-title">
            Proof of
            <br />
            <HighlightText variant="pill" className="work-highlight">
              Work.
            </HighlightText>
          </h2>
          <Image
            src="/assets/experience-projects/doodle-yellow-arrow.svg"
            width={95}
            height={65}
            alt=""
            className="projects-arrow"
          />
          <p>
            Real-world products I’ve built, led, and shipped — from large-scale
            migrations to performance optimization.
          </p>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <FeaturedProjectCard key={project.id} project={project} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
