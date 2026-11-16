"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import type { ArticleImageProps } from "./article-media";
export function ImageGallery({
  images,
  label = "Article image gallery",
}: {
  images: ArticleImageProps[];
  label?: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const [selected, setSelected] = useState(0);
  const image = images[selected];
  function close() {
    dialog.current?.close();
  }
  return (
    <div className="article-gallery" role="group" aria-label={label}>
      {images.map((item, index) => (
        <figure key={`${item.src}-${index}`}>
          <button
            type="button"
            aria-label={`Enlarge image: ${item.alt}`}
            onClick={(event) => {
              trigger.current = event.currentTarget;
              setSelected(index);
              dialog.current?.showModal();
            }}
          >
            <Image
              {...{
                src: item.src,
                alt: item.alt,
                width: item.width,
                height: item.height,
              }}
              sizes="(max-width: 600px) 100vw, 360px"
            />
            <span>View image ↗</span>
          </button>
          {item.caption && <figcaption>{item.caption}</figcaption>}
        </figure>
      ))}
      {image && (
        <dialog
          ref={dialog}
          className="article-lightbox"
          aria-label={`Image viewer: ${image.alt}`}
          onClose={() => trigger.current?.focus()}
          onClick={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <div className="article-lightbox-inner">
            <Button variant="brutalist" onClick={close}>
              Close image
            </Button>
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes="90vw"
            />
            <p>{image.caption ?? image.alt}</p>
            <div className="article-lightbox-controls">
              <Button
                variant="outline"
                disabled={selected === 0}
                onClick={() => setSelected(selected - 1)}
              >
                Previous image
              </Button>
              <span aria-live="polite">
                {selected + 1} / {images.length}
              </span>
              <Button
                variant="outline"
                disabled={selected === images.length - 1}
                onClick={() => setSelected(selected + 1)}
              >
                Next image
              </Button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}
