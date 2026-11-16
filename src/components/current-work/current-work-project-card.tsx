import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { CurrentWorkProject } from "@/data/current-work";

export function CurrentWorkProjectCard({
  project,
}: {
  project: CurrentWorkProject;
}) {
  return (
    <Card variant="colored" className="current-work-project">
      <Image
        src="/assets/current-work/nuvexa-concept-mark.svg"
        width={112}
        height={112}
        alt=""
        className="current-work-mark"
      />
      <div className="current-work-identity">
        <h3>{project.name}</h3>
        <p>{project.subtitle}</p>
      </div>
      <Badge variant="yellow" className="current-work-status">
        <span aria-hidden="true" />
        {project.status}
      </Badge>
    </Card>
  );
}
