import type { ComponentProps, ReactNode } from "react";
import hljs from "highlight.js";
import { ArticleImage, WideImage } from "./article-media";
import { ImageGallery } from "./image-gallery";
import { ImageCompare } from "./image-compare";
import { VideoEmbed } from "./video-embed";
import { CopyButton } from "./copy-button";

export function CodeBlock({
  children,
  language = "text",
}: {
  children: string;
  language?: string;
}) {
  const html = hljs.highlight(children, {
    language: hljs.getLanguage(language) ? language : "plaintext",
  }).value;
  return (
    <figure className="article-code">
      <figcaption>
        <span>{language}</span>
        <CopyButton text={children} />
      </figcaption>
      <pre tabIndex={0}>
        <code dangerouslySetInnerHTML={{ __html: html }} />
      </pre>
    </figure>
  );
}
export function Callout({
  children,
  variant = "note",
}: {
  children: ReactNode;
  variant?: "note" | "tip" | "warning" | "important";
}) {
  return (
    <aside className={`article-callout article-callout-${variant}`}>
      <strong>{variant.toUpperCase()}</strong>
      {children}
    </aside>
  );
}
export function ResponsiveTable({ children }: { children: ReactNode }) {
  return (
    <div
      className="article-table"
      role="region"
      aria-label="Article comparison table"
      tabIndex={0}
    >
      {children}
    </div>
  );
}
export function ArticleQuote({
  children,
  cite,
}: {
  children: ReactNode;
  cite?: string;
}) {
  return (
    <blockquote>
      {children}
      {cite && <footer>— {cite}</footer>}
    </blockquote>
  );
}
export const mdxComponents = {
  ArticleImage,
  WideImage,
  ImageGallery,
  ImageCompare,
  VideoEmbed,
  CodeBlock,
  Callout,
  ResponsiveTable,
  ArticleQuote,
  table: (props: ComponentProps<"table">) => (
    <ResponsiveTable>
      <table {...props} />
    </ResponsiveTable>
  ),
  pre: ({ children }: { children?: ReactNode }) => {
    const child = children as {
      props?: { children?: string; className?: string };
    };
    return (
      <CodeBlock language={child?.props?.className?.replace("language-", "")}>
        {child?.props?.children ?? ""}
      </CodeBlock>
    );
  },
};
