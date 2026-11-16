import Image from "next/image";
export interface ArticleImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}
export function ArticleImage({
  src,
  alt,
  width,
  height,
  caption,
}: ArticleImageProps) {
  return (
    <figure className="article-image">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(max-width: 768px) 100vw, 720px"
      />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
export function WideImage(props: ArticleImageProps) {
  return (
    <div className="article-wide">
      <ArticleImage {...props} />
    </div>
  );
}
