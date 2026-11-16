import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ExperienceItem } from "@/data/experience";
export interface ExperienceTimelineItemProps {
  item: ExperienceItem;
  current?: boolean;
}
export function ExperienceTimelineItem({
  item,
  current = false,
}: ExperienceTimelineItemProps) {
  return (
    <li className={cn("career-item", current && "career-item-current")}>
      <span className="career-node" aria-hidden="true" />
      <Card variant="brutalist" className="career-card">
        <span className="career-icon" aria-hidden="true">
          <Image
            src="/assets/experience-projects/icon-building.svg"
            width={28}
            height={28}
            alt=""
          />
        </span>
        <div className="career-role">
          <h3>{item.title}</h3>
          <p>{item.employer}</p>
        </div>
        <Badge variant="lavender" className="career-date">
          {item.dateLabel}
        </Badge>
        <div className="career-details">
          <p>{item.summary}</p>
          <details>
            <summary>Responsibilities &amp; impact</summary>
            {item.note && <p className="career-engagement-note">{item.note}</p>}
            {item.highlights.map((group) => (
              <div key={group.title} className="career-highlight-group">
                <h4>{group.title}</h4>
                <ul>
                  {group.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </details>
        </div>
      </Card>
    </li>
  );
}
