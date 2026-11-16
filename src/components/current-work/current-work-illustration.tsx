import Image from "next/image";

export function CurrentWorkIllustration() {
  return (
    <div className="current-work-art">
      <Image
        src="/assets/current-work/decor-yellow-orb.svg"
        width={640}
        height={640}
        alt=""
        className="current-work-orb"
      />
      <Image
        src="/assets/current-work/nuvexa-dashboard-workspace.svg"
        width={1280}
        height={550}
        alt="Nuvexa dashboard concept on a laptop, with a coffee mug and plant"
        className="current-work-workspace"
      />
      <Image
        src="/assets/current-work/tile-buildings.svg"
        width={180}
        height={180}
        alt=""
        className="current-work-tile current-work-tile-buildings"
      />
      <Image
        src="/assets/current-work/tile-sparkles.svg"
        width={180}
        height={180}
        alt=""
        className="current-work-tile current-work-tile-sparkles"
      />
      <Image
        src="/assets/current-work/tile-growth.svg"
        width={180}
        height={180}
        alt=""
        className="current-work-tile current-work-tile-growth"
      />
      <Image
        src="/assets/current-work/doodle-black-burst.svg"
        width={110}
        height={90}
        alt=""
        className="current-work-art-burst"
      />
    </div>
  );
}
