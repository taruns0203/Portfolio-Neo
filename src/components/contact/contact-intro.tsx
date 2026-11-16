import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/ui/section-heading";
import { ContactArtwork } from "./contact-artwork";

export function ContactIntro() {
  return (
    <div className="contact-intro-row">
      <div className="contact-intro">
        <Badge variant="yellow" className="portfolio-section-badge">
          <Image
            src="/assets/contact/icon-paper-plane.svg"
            width={25}
            height={25}
            alt=""
          />
          Contact
        </Badge>
        <SectionHeading
          headingId="contact-heading"
          heading={"Let's Build\nSomething Cool"}
          highlight="Together."
          description="Have an idea, opportunity or just want to talk tech, products, or real estate SaaS? I'd love to hear from you."
          className="contact-heading"
        />
        <Image
          src="/assets/contact/doodle-double-underline.svg"
          width={160}
          height={32}
          alt=""
          className="contact-underline"
        />
      </div>
      <ContactArtwork />
    </div>
  );
}
