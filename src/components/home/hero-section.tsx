import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SiteLink } from "@/components/layout/site-link";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";
import { TechPill } from "./tech-pill";

export function HeroSection() {
  const { hero, destinations } = site;
  return (
    <Section
      spacing="none"
      aria-labelledby="hero-title"
      className="hero-section"
    >
      <div className="hero-decoration" aria-hidden="true">
        <Image
          className="hero-purple"
          src="/assets/hero/decor-purple-corner.svg"
          width={315}
          height={265}
          alt=""
        />
        <Image
          className="hero-yellow"
          src="/assets/hero/decor-yellow-circle.svg"
          width={500}
          height={500}
          alt=""
        />
        <Image
          className="hero-mint"
          src="/assets/hero/decor-mint-corner.svg"
          width={340}
          height={225}
          alt=""
        />
      </div>
      <Container className="hero-layout max-w-home">
        <div className="hero-copy">
          <Badge
            variant="outlined"
            className="hero-availability border-2 bg-surface font-sans"
          >
            <span className="availability-dot" aria-hidden="true" />
            {hero.availability}
          </Badge>
          <h1 id="hero-title" className="hero-title">
            <span className="block">{hero.headline.first}</span>
            <span className="hero-title-line">
              {hero.headline.second}{" "}
              <span className="hero-highlight">
                <span>{hero.headline.highlight}</span>
              </span>
            </span>
          </h1>
          <p className="hero-description">{hero.description}</p>
          <ul className="hero-skills" aria-label="Core technologies">
            {hero.skills.map((skill) => (
              <li key={skill.label}>
                <TechPill {...skill} />
              </li>
            ))}
          </ul>
          <div className="hero-actions">
            <SiteLink
              destination={destinations.work}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "portfolio-button hero-primary bg-accent-pink shadow-brutalist",
              )}
            >
              {hero.workLabel}
              <Image
                src="/assets/hero/arrow-up-right.svg"
                width={26}
                height={26}
                alt=""
              />
            </SiteLink>
            <SiteLink
              destination={destinations.github}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "portfolio-button bg-surface shadow-brutalist",
              )}
            >
              <Image
                src="/assets/hero/tech-github.svg"
                width={27}
                height={27}
                alt=""
              />
              {hero.githubLabel}
            </SiteLink>
          </div>
        </div>
        <div className="hero-artwork">
          <Image
            className="hero-burst"
            src="/assets/hero/decor-burst.svg"
            width={106}
            height={92}
            alt=""
            aria-hidden="true"
          />
          <Image
            src="/assets/hero/hero-laptop-illustration.png"
            width={727}
            height={559}
            sizes="(min-width: 1680px) 710px, (min-width: 1024px) 43vw, (min-width: 768px) 70vw, 94vw"
            preload
            alt="Illustrated purple laptop displaying code, with a pink code sticker and a steaming terminal-logo coffee mug."
            className="hero-laptop"
          />
        </div>
      </Container>
    </Section>
  );
}
