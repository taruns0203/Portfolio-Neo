import Image from "next/image";

const pairings = {
  about: ["lavender-petal", "mint-wave"],
  experience: ["blue-pebble", "pink-swoop"],
  projects: ["yellow-orbit", "lavender-petal"],
  github: ["lavender-petal", "mint-wave"],
  technology: ["pink-swoop", "yellow-scallop"],
  achievements: ["yellow-orbit", "blue-pebble"],
  performance: ["blue-pebble", "pink-swoop"],
  building: ["yellow-scallop", "mint-wave"],
  writing: ["lavender-petal", "pink-swoop"],
  contact: ["yellow-orbit", "mint-wave"],
} as const;

export type SectionDecorationVariant = keyof typeof pairings;

export function SectionDecoration({
  variant,
}: {
  variant: SectionDecorationVariant;
}) {
  return (
    <div
      className={`section-decoration section-decoration-${variant}`}
      aria-hidden="true"
    >
      {pairings[variant].map((shape, index) => (
        <Image
          key={`${shape}-${index}`}
          src={`/assets/decorations/${shape}.svg`}
          width={400}
          height={400}
          alt=""
          className={`section-edge section-edge-${index === 0 ? "top" : "bottom"}`}
        />
      ))}
    </div>
  );
}
