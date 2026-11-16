import Image from "next/image";
import type { CurrentWorkFeature as Feature } from "@/data/current-work";

export function CurrentWorkFeature({ feature }: { feature: Feature }) {
  return (
    <li className="current-work-feature">
      <span
        className={`current-work-feature-icon current-work-tone-${feature.tone}`}
      >
        <Image
          src={`/assets/current-work/${feature.icon}`}
          width={32}
          height={32}
          alt=""
        />
      </span>
      <p>{feature.title}</p>
      {feature.detail && <small>{feature.detail}</small>}
    </li>
  );
}
