import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { CurrentWorkIllustration } from "@/components/current-work/current-work-illustration";
import { CurrentWorkProjectCard } from "@/components/current-work/current-work-project-card";
import { CurrentWorkFeature } from "@/components/current-work/current-work-feature";
import { CurrentWorkFocusCard } from "@/components/current-work/current-work-focus-card";
import { CurrentWorkProgress } from "@/components/current-work/current-work-progress";
import { currentWork, currentWorkFeatures } from "@/data/current-work";

export function CurrentWorkSection() {
  return (
    <Section
      decoration="building"
      id="current-work"
      aria-labelledby="current-work-title"
    >
      <Container className="current-work-layout max-w-home">
        <div className="current-work-top">
          <div className="current-work-intro">
            <Badge variant="yellow" className="portfolio-section-badge">
              <Image
                src="/assets/current-work/icon-flask.svg"
                width={25}
                height={25}
                alt=""
              />
              Current Work
            </Badge>
            <SectionHeading
              headingId="current-work-title"
              heading="Currently"
              highlight="Building."
              description={currentWork.summary}
              className="current-work-heading"
            />
            <Image
              src="/assets/current-work/doodle-purple-arrow.svg"
              width={130}
              height={80}
              alt=""
              className="current-work-arrow"
            />
          </div>
          <CurrentWorkIllustration />
        </div>
        <div className="current-work-middle">
          <CurrentWorkProjectCard project={currentWork} />
          <ul
            className="current-work-features"
            aria-label="Nuvexa product direction"
          >
            {currentWorkFeatures.map((feature) => (
              <CurrentWorkFeature key={feature.id} feature={feature} />
            ))}
          </ul>
        </div>
        <div className="current-work-bottom">
          <div className="current-work-focus">
            <h3>Key Focus Areas</h3>
            <ul className="current-work-focus-list">
              {currentWork.focusAreas.map((area) => (
                <CurrentWorkFocusCard key={area.id} area={area} />
              ))}
            </ul>
          </div>
          <CurrentWorkProgress project={currentWork} />
        </div>
      </Container>
    </Section>
  );
}
