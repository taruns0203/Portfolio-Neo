import assert from "node:assert/strict";
import { test } from "node:test";
import { getBlogResults } from "../src/lib/blog-results.ts";
import {
  blogs,
  getBlogBySlug,
  getCategoryCounts,
  formatBlogDate,
} from "../src/data/blogs.ts";

test("all categories and computed counts match source data", () => {
  for (const { name, count } of getCategoryCounts()) {
    assert.equal(getBlogResults(blogs, name, "", null).totalArticles, count);
  }
});
test("search matches title, excerpt, tags and category, ignoring case and whitespace", () => {
  for (const [query, slug] of [
    ["  MONOLITH ", blogs[0].slug],
    ["trade-offs", blogs[0].slug],
    ["Webpack", blogs[0].slug],
    ["Engineering", "idempotency-keys-build-reliable-apis"],
  ]) {
    assert.ok(
      getBlogResults(blogs, "All", query, null).articles.some(
        (a) => a.slug === slug,
      ),
    );
  }
});
test("combined filters, empty results, empty category and clearing search", () => {
  assert.equal(
    getBlogResults(blogs, "Performance", "React", "2").totalArticles,
    0,
  );
  assert.equal(getBlogResults(blogs, "Performance", "", "2").totalArticles, 3);
  assert.equal(getBlogResults([], "Engineering", "", null).page, 1);
});
test("pagination has deterministic, disjoint and complete pages and clamps invalid values", () => {
  const first = getBlogResults(blogs, "All", "", "1");
  const second = getBlogResults(blogs, "All", "", "2");
  assert.deepEqual([...first.articles, ...second.articles], blogs);
  assert.equal(first.articles.length, 6);
  for (const page of ["-1", "NaN", "2junk", "1.5", "Infinity"])
    assert.equal(getBlogResults(blogs, "All", "", page).page, 1);
  assert.equal(getBlogResults(blogs, "All", "", "999").page, 2);
  assert.equal(getBlogResults(blogs, "Frontend", "", "2").page, 1);
});
test("every slug resolves uniquely and unknown slugs are absent", () => {
  assert.equal(new Set(blogs.map((a) => a.slug)).size, blogs.length);
  for (const article of blogs)
    assert.equal(getBlogBySlug(article.slug), article);
  assert.equal(getBlogBySlug("unknown"), undefined);
});
test("dates are deterministic and drafts never receive invented dates", () => {
  assert.equal(formatBlogDate(null), null);
  assert.equal(formatBlogDate("invalid"), null);
  assert.equal(formatBlogDate("2026-01-01"), "Jan 1, 2026");
});
