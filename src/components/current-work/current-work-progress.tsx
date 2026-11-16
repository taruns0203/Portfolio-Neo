import type { CurrentWorkProject } from "@/data/current-work";

export function CurrentWorkProgress({
  project,
}: {
  project: CurrentWorkProject;
}) {
  const percent = project.progressPercent;
  const hasProgress =
    percent !== null &&
    Number.isFinite(percent) &&
    percent >= 0 &&
    percent <= 100;
  return (
    <div className="current-work-progress">
      <h3 id="current-work-progress-title">Project Progress</h3>
      {hasProgress ? (
        <div
          className="current-work-progress-track"
          role="progressbar"
          aria-label={`${project.name} development progress`}
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <span
            className="current-work-progress-fill"
            style={{ width: `${percent}%` }}
          />
          <span className="current-work-progress-value">{percent}%</span>
        </div>
      ) : (
        <>
          <p className="current-work-progress-status">
            <span aria-hidden="true" />
            {project.status}
          </p>
          <p className="current-work-progress-note">
            Building the core experience.
          </p>
        </>
      )}
    </div>
  );
}
