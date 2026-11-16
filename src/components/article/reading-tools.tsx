"use client";
import { useEffect, useState } from "react";
import type { TocHeading } from "@/lib/article-analysis";
export function ReadingTools({ headings }: { headings: TocHeading[] }) {
  const [active, setActive] = useState(headings[0]?.id ?? "");
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let frame = 0;
    function update() {
      frame = 0;
      const body = document.getElementById("article-body");
      if (!body) return;
      const rect = body.getBoundingClientRect();
      const distance = Math.max(1, rect.height - window.innerHeight);
      setProgress(
        Math.round(Math.max(0, Math.min(100, (-rect.top / distance) * 100))),
      );
      let current = headings[0]?.id ?? "";
      for (const heading of headings) {
        if (
          (document.getElementById(heading.id)?.getBoundingClientRect().top ??
            Infinity) <= 160
        )
          current = heading.id;
      }
      setActive(current);
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const observer = new ResizeObserver(schedule);
    const body = document.getElementById("article-body");
    if (body) observer.observe(body);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [headings]);
  return (
    <aside className="article-reading-tools article-toc">
      <progress
        className="article-progress"
        max={100}
        value={progress}
        aria-label="Article reading progress"
      />
      <nav aria-label="Table of contents">
        <details open>
          <summary>On this page</summary>
          <ol>
            {headings.map((h) => (
              <li
                key={h.id}
                className={h.depth === 3 ? "toc-subheading" : undefined}
              >
                <a
                  href={`#${h.id}`}
                  aria-current={active === h.id ? "location" : undefined}
                >
                  {h.title}
                </a>
              </li>
            ))}
          </ol>
        </details>
      </nav>
      <p className="article-reading-percent" aria-hidden="true">
        {progress}% read
      </p>
    </aside>
  );
}
