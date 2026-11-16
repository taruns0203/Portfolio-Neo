import type { GithubData } from "@/types/github";

export function ContributionHeatmap({ data }: { data: GithubData }) {
  if (!data.calendar)
    return (
      <div className="github-empty">
        <strong>Every contribution has a story.</strong>
        <p>{data.calendarNote}</p>
      </div>
    );
  const days = data.calendar.weeks.flatMap((week) => week.contributionDays);
  const max = Math.max(1, ...days.map((day) => day.contributionCount));
  return (
    <div className="github-chart-body">
      <div
        className="github-heatmap-scroll"
        role="region"
        aria-label="Daily contributions for the last twelve months; scroll horizontally"
        tabIndex={0}
      >
        <div className="github-heatmap">
          {data.calendar.weeks.map((week, index) => (
            <div className="github-week" key={index}>
              {week.contributionDays.map((day) => {
                const level =
                  day.contributionCount === 0
                    ? 0
                    : Math.min(4, Math.ceil((day.contributionCount / max) * 4));
                return (
                  <span
                    key={day.date}
                    role="img"
                    aria-label={`${day.date}: ${day.contributionCount} contributions`}
                    title={`${day.date}: ${day.contributionCount} contributions`}
                    className={`github-day github-level-${level}`}
                    style={{
                      gridRow:
                        new Date(`${day.date}T00:00:00Z`).getUTCDay() + 1,
                    }}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <p className="github-chart-total">
        <strong>
          {data.calendar.totalContributions.toLocaleString("en-US")}
        </strong>{" "}
        contributions in the last 12 months
      </p>
      <div className="github-heatmap-legend" aria-hidden="true">
        Less{" "}
        {[0, 1, 2, 3, 4].map((level) => (
          <span key={level} className={`github-day github-level-${level}`} />
        ))}{" "}
        More
      </div>
      <p className="github-chart-note">{data.calendarNote}</p>
    </div>
  );
}
