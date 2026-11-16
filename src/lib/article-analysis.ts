export interface TocHeading {
  id: string;
  title: string;
  depth: number;
}
interface ContentNode {
  type: string;
  value?: string;
  depth?: number;
  children?: ContentNode[];
  data?: { hProperties?: Record<string, unknown> };
}
export function analyzeArticle(tree: ContentNode) {
  const headings: TocHeading[] = [];
  const used = new Set<string>();
  let words = 0;
  function text(node: ContentNode): string {
    return node.value ?? node.children?.map(text).join("") ?? "";
  }
  function walk(node: ContentNode) {
    if (
      node.type === "heading" &&
      node.depth &&
      node.depth >= 2 &&
      node.depth <= 3
    ) {
      const title = text(node);
      const base =
        title
          .toLowerCase()
          .normalize("NFKD")
          .replace(/[^\p{L}\p{N}\s-]/gu, "")
          .trim()
          .replace(/\s+/g, "-") || "section";
      let id = base;
      let suffix = 2;
      while (used.has(id)) id = `${base}-${suffix++}`;
      used.add(id);
      node.data = {
        ...node.data,
        hProperties: { ...node.data?.hProperties, id, tabIndex: -1 },
      };
      headings.push({ id, title, depth: node.depth });
    }
    if (node.type === "text" || node.type === "code")
      words += (node.value ?? "").trim().split(/\s+/).filter(Boolean).length;
    node.children?.forEach(walk);
  }
  walk(tree);
  return { headings, readingTime: Math.max(1, Math.ceil(words / 200)) };
}
