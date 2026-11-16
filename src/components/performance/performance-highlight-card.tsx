import Image from "next/image";
import { Card } from "@/components/ui/card";
import type { PerformanceHighlight } from "@/data/performance";

export function PerformanceHighlightCard({
  highlight,
}: {
  highlight: PerformanceHighlight;
}) {
  return (
    <Card
      className={`performance-highlight performance-tone-${highlight.tone}`}
    >
      <Image
        src={`/assets/performance/${highlight.icon}`}
        width={46}
        height={46}
        alt=""
      />
      <h3>{highlight.title}</h3>
      <p>{highlight.description}</p>
    </Card>
  );
}
