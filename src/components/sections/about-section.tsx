import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { AboutIntro } from "@/components/about/about-intro";
import { AboutIllustration } from "@/components/about/about-illustration";
import { AboutFeatureCard } from "@/components/about/about-feature-card";
import { AboutMetrics } from "@/components/about/about-metrics";
import { about } from "@/data/about";
export function AboutSection() {
  return (
    <Section
      decoration="about"
      id="about"
      aria-labelledby="about-title"
      spacing="roomy"
      className="about-section"
    >
      <Container className="about-layout max-w-home">
        <AboutIntro />
        <div className="about-visual">
          <AboutIllustration />
          <AboutMetrics />
        </div>
        <div className="about-features">
          {about.features.map((feature) => (
            <AboutFeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
