import assert from "node:assert/strict";
import { test } from "node:test";
import { readFile } from "node:fs/promises";
import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import remarkGfm from "remark-gfm";
import { analyzeArticle } from "../src/lib/article-analysis.ts";

test("heading IDs are stable, unique, and account for natural suffixes", () => {
  const make = () => ({
    type: "root",
    children: ["Overview", "Overview", "Overview-2", "Overview", "!!!"].map(
      (value) => ({
        type: "heading",
        depth: 2,
        children: [{ type: "text", value }],
      }),
    ),
  });
  const tree = make();
  const first = analyzeArticle(tree);
  assert.deepEqual(
    first.headings.map((h) => h.id),
    ["overview", "overview-2", "overview-2-2", "overview-3", "section"],
  );
  assert.deepEqual(first, analyzeArticle(make()));
  assert.equal(tree.children[0].data.hProperties.id, "overview");
  assert.equal(tree.children[0].data.hProperties.tabIndex, -1);
});
test("reading time ignores JSX source and uses prose/code words", () => {
  const tree = {
    type: "root",
    children: [
      { type: "mdxJsxFlowElement", value: "ignored ".repeat(900) },
      { type: "text", value: "word ".repeat(401) },
    ],
  };
  assert.equal(analyzeArticle(tree).readingTime, 3);
  assert.equal(analyzeArticle({ type: "root", children: [] }).readingTime, 1);
});
test("demo MDX compiles with generated headings and a real component function", async () => {
  const source = await readFile(
    new URL("../src/content/articles/core-web-vitals.mdx", import.meta.url),
    "utf8",
  );
  let result;
  const compiled = await evaluate(source, {
    ...runtime,
    remarkPlugins: [
      remarkGfm,
      () => (tree) => {
        result = analyzeArticle(tree);
      },
    ],
  });
  assert.equal(typeof compiled.default, "function");
  assert.ok(result.headings.length >= 5);
  assert.equal(
    new Set(result.headings.map((h) => h.id)).size,
    result.headings.length,
  );
  assert.ok(result.readingTime > 0);
  for (const component of [
    "ArticleImage",
    "ImageGallery",
    "WideImage",
    "Callout",
  ])
    assert.ok(source.includes("<" + component));
  assert.ok((source.match(/<ArticleImage\b/g) || []).length >= 3);
});
