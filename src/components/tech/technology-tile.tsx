import Image from "next/image";
import { Card } from "@/components/ui/card";
import type { PortfolioSkill } from "@/data/portfolio-skills";
export interface TechnologyTileProps {
  skill: PortfolioSkill;
}
export function TechnologyTile({ skill }: TechnologyTileProps) {
  return (
    <Card
      variant="brutalist"
      className={`technology-tile expertise-tone-${skill.tone}`}
    >
      <Image
        src={`/assets/tech-achievements/${skill.icon}`}
        width={64}
        height={64}
        alt=""
      />
      <span>{skill.name}</span>
    </Card>
  );
}
