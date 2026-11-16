import Image from "next/image";
export function AboutIllustration() {
  return (
    <div className="about-art">
      <Image
        src="/assets/about/decor-yellow-orb.svg"
        width={700}
        height={600}
        alt=""
        className="about-orb"
      />
      <Image
        src="/assets/about/developer-workspace-transparent.png"
        width={764}
        height={472}
        sizes="(min-width: 1680px) 760px, (min-width: 1024px) 47vw, (min-width: 768px) 80vw, 94vw"
        alt="Illustrated developer thinking at a laptop, with a coffee cup and plant on the desk."
        className="about-workspace"
        style={{ height: "auto" }}
      />
      <Image
        src="/assets/about/floating-code-window.svg"
        width={220}
        height={180}
        alt=""
        className="about-code-window"
      />
      <Image
        src="/assets/about/floating-code-tile.svg"
        width={140}
        height={140}
        alt=""
        className="about-code-tile"
      />
      <Image
        src="/assets/about/floating-rocket-tile.svg"
        width={140}
        height={140}
        alt=""
        className="about-rocket"
      />
      <Image
        src="/assets/about/doodle-burst.svg"
        width={80}
        height={70}
        alt=""
        className="about-burst"
      />
    </div>
  );
}
