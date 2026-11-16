import Image from "next/image";
import type { CurrentWorkFeature } from "@/data/current-work";

export function CurrentWorkFocusCard({ area }: { area: CurrentWorkFeature }) {
  return (
    <li className={`current-work-focus-card current-work-tone-${area.tone}`}>
      <Image
        src={`/assets/current-work/${area.icon}`}
        width={36}
        height={36}
        alt=""
      />
      <span>{area.title}</span>
    </li>
  );
}
