"use client";
import { useId, useState } from "react";
import Image from "next/image";
import type { ArticleImageProps } from "./article-media";
export function ImageCompare({
  before,
  after,
  caption,
}: {
  before: ArticleImageProps;
  after: ArticleImageProps;
  caption?: string;
}) {
  const [position, setPosition] = useState(50);
  const id = useId();
  return (
    <figure className="article-compare">
      <div
        className="article-compare-stage"
        style={{ aspectRatio: `${before.width} / ${before.height}` }}
      >
        <Image
          src={after.src}
          alt={`After: ${after.alt}`}
          fill
          sizes="(max-width: 768px) 100vw, 720px"
        />
        <div
          className="article-compare-overlay"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Image
            src={before.src}
            alt={`Before: ${before.alt}`}
            fill
            sizes="(max-width: 768px) 100vw, 720px"
          />
        </div>
        <span className="compare-before">Before</span>
        <span className="compare-after">After</span>
      </div>
      <label htmlFor={id}>Compare illustrations — {position}% before</label>
      <input
        id={id}
        type="range"
        min="0"
        max="100"
        value={position}
        onChange={(e) => setPosition(Number(e.target.value))}
        aria-valuetext={`${position}% before image, ${100 - position}% after image`}
      />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
