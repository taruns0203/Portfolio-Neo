import type { CSSProperties } from "react";
import type { GithubLanguage } from "@/types/github";
const colors = [
  "var(--color-primary)",
  "var(--color-yellow)",
  "var(--color-mint)",
  "var(--color-pink)",
  "var(--color-blue)",
  "var(--color-border)",
];
export function LanguageBreakdown({
  languages,
}: {
  languages: GithubLanguage[] | null;
}) {
  if (!languages)
    return (
      <div className="github-empty">
        <strong>Language data is unavailable.</strong>
        <p>
          Repository language totals could not be verified. Please check back
          later.
        </p>
      </div>
    );
  if (!languages.length)
    return (
      <div className="github-empty">
        <strong>A fresh canvas.</strong>
        <p>
          No language bytes reported for public, owned, non-fork repositories.
        </p>
      </div>
    );
  const gradient = languages
    .map((language, index) => {
      const start = languages
        .slice(0, index)
        .reduce((sum, item) => sum + item.percent, 0);
      const offset = start + language.percent;
      return `${colors[index % colors.length]} ${start}% ${offset}%`;
    })
    .join(",");
  return (
    <div className="github-chart-body">
      <div className="github-language-content">
        <div
          className="github-donut"
          aria-hidden="true"
          style={{ background: `conic-gradient(${gradient})` }}
        >
          <span>
            Code
            <br />
            by bytes
          </span>
        </div>
        <ul className="github-language-legend">
          {languages.map((language, index) => (
            <li key={language.name}>
              <span
                className="github-language-dot"
                aria-hidden="true"
                style={
                  { background: colors[index % colors.length] } as CSSProperties
                }
              />
              <span>{language.name}</span>
              <strong>{language.percent.toFixed(1)}%</strong>
            </li>
          ))}
        </ul>
      </div>
      <p className="github-chart-note">
        Share of language bytes across public, owned, non-fork repositories. Not
        time spent or proficiency.
      </p>
    </div>
  );
}
