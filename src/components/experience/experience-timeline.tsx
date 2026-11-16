import { experience } from "@/data/experience";
import { ExperienceTimelineItem } from "./experience-timeline-item";
export function ExperienceTimeline() {
  return (
    <div className="career-history">
      <p className="type-small mb-5 text-muted-foreground">
        {experience.some((item) => !item.confirmed)
          ? "Career details are being confirmed. This timeline is a layout preview."
          : "A timeline of my professional experience."}
      </p>
      <ol className="career-timeline" aria-label="Career timeline">
        {experience.map((item, index) => (
          <ExperienceTimelineItem
            key={item.id}
            item={item}
            current={index === 0}
          />
        ))}
      </ol>
    </div>
  );
}
