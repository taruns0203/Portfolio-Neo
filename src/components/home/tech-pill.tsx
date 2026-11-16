import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export interface TechPillProps {
  label: string;
  icon: string;
}
export function TechPill({ label, icon }: TechPillProps) {
  return (
    <Badge
      variant="outlined"
      className="tech-pill rounded-md border-2 bg-surface font-sans"
    >
      <Image src={`/assets/hero/${icon}`} width={26} height={26} alt="" />
      {label}
    </Badge>
  );
}
