import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

export function WritingIntro() {
  return (
    <div className="writing-top">
      <div className="writing-intro">
        <Badge variant="lavender" className="portfolio-section-badge">
          <Image
            src="/assets/blog/icon-pencil.svg"
            width={25}
            height={25}
            alt=""
          />
          Blogs &amp; Articles
        </Badge>
        <SectionHeading
          headingId="writing-heading"
          heading="Thoughts,"
          highlight="Typed Out."
          description="Technical deep-dives, real-world learnings, and thoughts from my developer journey."
          className="writing-heading"
        />
        <Link
          href="/blogs"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "writing-all-link",
          )}
        >
          Read All Articles
          <Image
            src="/assets/blog/icon-arrow-right.svg"
            width={24}
            height={24}
            alt=""
          />
        </Link>
      </div>
      <Image
        src="/assets/blog/hero-writing-workspace.svg"
        width={1000}
        height={540}
        alt=""
        className="writing-workspace"
      />
    </div>
  );
}
