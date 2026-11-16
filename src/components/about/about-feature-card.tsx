import Image from "next/image";
import { Card } from "@/components/ui/card";
export interface AboutFeatureCardProps {
  title: string;
  description: string;
  icon: string;
  tone: "lavender" | "yellow" | "mint";
}
export function AboutFeatureCard({
  title,
  description,
  icon,
  tone,
}: AboutFeatureCardProps) {
  return (
    <Card variant="brutalist" className={`about-feature about-tone-${tone}`}>
      <Image src={`/assets/about/${icon}`} width={36} height={36} alt="" />
      <h3>{title}</h3>
      <p>{description}</p>
    </Card>
  );
}
