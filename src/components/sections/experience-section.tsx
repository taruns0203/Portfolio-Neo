import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { HighlightText } from "@/components/ui/highlight-text";
import { ExperienceTimeline } from "@/components/experience/experience-timeline";
export function ExperienceSection() {
  return (
    <Section
      decoration="experience"
      id="experience"
      aria-labelledby="experience-title"
      className="experience-section"
    >
      <Container className="experience-layout max-w-home">
        <div className="career-intro">
          <Badge variant="lavender" className="portfolio-section-badge">
            <Image
              src="/assets/experience-projects/icon-briefcase.svg"
              width={25}
              height={25}
              alt=""
            />
            Experience
          </Badge>
          <h2 id="experience-title" className="portfolio-section-title">
            The Career
            <br />
            <HighlightText variant="pill" className="career-highlight">
              Timeline.
            </HighlightText>
          </h2>
          <p className="career-description">
            A 6+ year journey of building, shipping, and scaling real-world
            products.
          </p>
        </div>
        <div className="career-art">
          <Image
            src="/assets/experience-projects/experience-illustration-original-crop.png"
            width={441}
            height={292}
            sizes="(min-width: 1440px) 24vw, (min-width: 1024px) 32vw, (min-width: 768px) 42vw, 90vw"
            alt="Illustrated purple laptop with a coffee mug, plant, and stacked books."
            className="career-illustration"
          />
          <Image
            src="/assets/experience-projects/doodle-purple-arrow.svg"
            width={100}
            height={65}
            alt=""
            className="career-arrow"
          />
        </div>
        <ExperienceTimeline />
      </Container>
    </Section>
  );
}
