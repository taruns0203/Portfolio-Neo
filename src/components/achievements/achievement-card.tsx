import Image from "next/image";
import { Card } from "@/components/ui/card";
import type { PortfolioAchievement } from "@/data/portfolio-achievements";
export interface AchievementCardProps {
  achievement: PortfolioAchievement;
}
export function AchievementCard({ achievement }: AchievementCardProps) {
  return (
    <Card
      variant="outlined"
      className={`achievement-card expertise-tone-${achievement.tone}`}
    >
      <Image
        src={`/assets/tech-achievements/${achievement.icon}`}
        width={44}
        height={44}
        alt=""
      />
      <p
        className={`achievement-metric${achievement.id === "architecture" ? " achievement-metric-text" : ""}`}
      >
        {achievement.metric}
      </p>
      <h3>{achievement.title}</h3>
      <p className="achievement-description">{achievement.description}</p>
      <span
        className={`achievement-accent achievement-accent-${achievement.tone}`}
        aria-hidden="true"
      />
    </Card>
  );
}
