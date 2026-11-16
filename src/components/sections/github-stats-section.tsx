import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { ContributionHeatmap } from "@/components/github/contribution-heatmap";
import { LanguageBreakdown } from "@/components/github/language-breakdown";
import { fetchGithubData, validateGithubUsername } from "@/lib/github";
import { site } from "@/config/site";
import type { GithubData } from "@/types/github";

export function GithubStatsView({ data }: { data: GithubData }) {
  const stats = [
    {
      label: "Repositories",
      value: data.repositories,
      icon: "icon-repository.svg",
      tone: "lavender",
      note: "Public repositories",
    },
    {
      label: "Stars Earned",
      value: data.stars,
      icon: "icon-star.svg",
      tone: "yellow",
      note: "Owned public repos · no forks",
    },
    {
      label: "Followers",
      value: data.followers,
      icon: "icon-followers.svg",
      tone: "mint",
      note: "GitHub followers",
    },
    {
      label: "Contributions",
      value: data.calendar?.totalContributions ?? null,
      icon: "icon-contributions.svg",
      tone: "pink",
      note: "Last 12 months",
    },
  ];
  return (
    <Section
      decoration="github"
      id="github-stats"
      aria-labelledby="github-stats-heading"
    >
      <Container className="max-w-home">
        <div className="github-top">
          <div className="github-intro">
            <Badge variant="yellow" className="portfolio-section-badge">
              <Image
                src="/assets/github/icon-github-mark.svg"
                width={25}
                height={25}
                alt=""
              />
              GitHub Stats
            </Badge>
            <SectionHeading
              headingId="github-stats-heading"
              heading="My Open Source"
              highlight="Footprint."
              description="A snapshot of my activity, contributions, and the technologies I work with on GitHub."
              className="github-heading"
            />
            {data.username ? (
              <a
                className={`${buttonVariants({ variant: "outline" })} github-cta`}
                href={`https://github.com/${data.username}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
                <Image
                  src="/assets/github/icon-arrow-up-right.svg"
                  width={20}
                  height={20}
                  alt=""
                />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : (
              <p className="github-source">
                Connect GitHub to display live stats.
              </p>
            )}
          </div>
          <Image
            className="github-art"
            src="/assets/github/github-hero-mascot.svg"
            width={700}
            height={540}
            alt=""
          />
          <div className="github-stats-grid">
            {stats.map((stat) => (
              <Card
                key={stat.label}
                variant="brutalist"
                className={`github-stat github-tone-${stat.tone}`}
              >
                <Image
                  src={`/assets/github/${stat.icon}`}
                  width={36}
                  height={36}
                  alt=""
                />
                <div>
                  <p className="github-stat-number">
                    {stat.value === null ? (
                      <span className="github-unavailable">
                        {data.state === "loading" ? "Loading…" : "Unavailable"}
                      </span>
                    ) : (
                      stat.value.toLocaleString("en-US")
                    )}
                  </p>
                  <h3>{stat.label}</h3>
                  <p className="github-stat-note">{stat.note}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
        <p className="github-source" role="status">
          {data.state === "loading"
            ? "Loading GitHub data…"
            : !data.username
              ? "Data not configured."
              : data.state === "unavailable"
                ? "GitHub data could not be verified. Please check back later."
                : `${data.state === "partial" ? "Some GitHub data is unavailable. " : ""}Source: GitHub API · cached for up to one hour.`}
        </p>
        <div className="github-panels">
          <Card variant="outlined" className="github-panel">
            <div className="github-panel-header">
              <Image
                src="/assets/github/icon-calendar.svg"
                width={32}
                height={32}
                alt=""
              />
              <h3>Contribution Activity</h3>
            </div>
            <ContributionHeatmap data={data} />
          </Card>
          <Card variant="outlined" className="github-panel">
            <div className="github-panel-header">
              <Image
                src="/assets/github/icon-code.svg"
                width={32}
                height={32}
                alt=""
              />
              <h3>Most Used Languages</h3>
            </div>
            <LanguageBreakdown languages={data.languages} />
          </Card>
        </div>
      </Container>
    </Section>
  );
}
export async function GithubStatsSection() {
  const configured = site.profileLinks.github?.match(
    /^https:\/\/github\.com\/([^/]+)\/?$/,
  )?.[1];
  const username = validateGithubUsername(
    process.env.GITHUB_USERNAME ?? configured,
  );
  const data = await fetchGithubData({
    username,
    token: process.env.GITHUB_TOKEN,
  });
  return <GithubStatsView data={data} />;
}
