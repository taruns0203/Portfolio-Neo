"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
export function VideoEmbed({
  videoId,
  title,
}: {
  videoId: string;
  title: string;
}) {
  const [enabled, setEnabled] = useState(false);
  if (!/^[\w-]{11}$/.test(videoId)) return <p>Video unavailable.</p>;
  return (
    <figure className="article-video">
      {enabled ? (
        <iframe
          title={title}
          src={`https://www.youtube-nocookie.com/embed/${videoId}`}
          allow="fullscreen; picture-in-picture"
          referrerPolicy="no-referrer"
          allowFullScreen
        />
      ) : (
        <div>
          <p>{title}</p>
          <p>
            Loading connects to YouTube. No video or thumbnail is requested
            before you choose to load it.
          </p>
          <Button variant="outline" onClick={() => setEnabled(true)}>
            Load video
          </Button>
        </div>
      )}
    </figure>
  );
}
