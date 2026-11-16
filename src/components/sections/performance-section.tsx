import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { CoreWebVitalsPanel } from "@/components/performance/core-web-vitals-panel";
import { PerformanceComparison } from "@/components/performance/performance-comparison";
import { PerformanceHighlightCard } from "@/components/performance/performance-highlight-card";
import { PerformanceIllustration } from "@/components/performance/performance-illustration";
import { performanceHighlights } from "@/data/performance";

export function PerformanceSection() {
  return (
    <Section
      decoration="performance"
      id="performance"
      aria-labelledby="performance-title"
      className="performance-section"
    >
      <Container className="max-w-home">
        <div className="performance-top">
          <div className="performance-intro">
            <Badge variant="yellow" className="portfolio-section-badge">
              <Image
                src="/assets/performance/icon-bolt.svg"
                width={25}
                height={25}
                alt=""
              />
              Performance
            </Badge>
            <SectionHeading
              headingId="performance-title"
              heading="Built for"
              highlight="Speed & Scale."
              description="I focus on measurable improvements—faster pages, more responsive interactions, and better user experiences."
              className="performance-heading"
            />
            <Image
              src="/assets/performance/decor-underline.svg"
              width={145}
              height={42}
              alt=""
              className="performance-underline"
            />
          </div>
          <PerformanceIllustration />
          <CoreWebVitalsPanel />
        </div>
        <div className="performance-bottom">
          <PerformanceComparison />
          <ul
            className="performance-highlights"
            aria-label="Performance practices"
          >
            {performanceHighlights.map((highlight) => (
              <li key={highlight.id}>
                <PerformanceHighlightCard highlight={highlight} />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
