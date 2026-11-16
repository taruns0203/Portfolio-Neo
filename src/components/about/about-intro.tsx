import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
export function AboutIntro() {
  return (
    <div className="about-intro">
      <Badge variant="lavender" className="about-eyebrow">
        <Image
          src="/assets/about/icon-user.svg"
          width={26}
          height={26}
          alt=""
        />
        About Me
      </Badge>
      <h2 id="about-title" className="about-title">
        The Human Behind
        <br />
        the <span className="about-code">Code.</span>
        <Image
          src="/assets/about/doodle-arrow.svg"
          width={110}
          height={70}
          alt=""
          className="about-arrow"
        />
      </h2>
      <div className="about-biography">
        <p>
          Hi, I’m <strong>Tarun Sharma</strong> — a Senior Full Stack Engineer
          with <strong>6+ years</strong> building production platforms with
          React, Next.js, TypeScript, and Node.js.
        </p>
        <p>
          I combine frontend performance with backend system design: secure JWT
          authentication, TOTP multi-factor authentication, RBAC,
          PostgreSQL/Prisma, Redis, and AWS serverless. I led a zero-downtime
          CMS migration spanning <strong>1,200+ pages</strong>.
        </p>
      </div>
      <div className="about-education">
        <h3>Education</h3>
        <p>
          <strong>B.Tech, Computer Science · 2017</strong>
          <br />
          Career Point University, Kota, Rajasthan
        </p>
      </div>
      <a
        className={buttonVariants({ variant: "outline" }) + " about-resume"}
        href="/resume/Tarun-Sharma-Resume.pdf"
        download
      >
        Download Resume <span aria-hidden="true">↓</span>
      </a>
    </div>
  );
}
