import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
// Use an existing Playwright installation; no production dependency is needed.
const { chromium } = await import(
  process.env.PLAYWRIGHT_MODULE || "playwright"
);
const base = process.env.BLOGS_BASE_URL || "http://127.0.0.1:3100";
const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROMIUM_EXECUTABLE,
});
const page = await browser.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
await mkdir("docs/blogs-audit", { recursive: true });
const cards = page.locator(".blog-card");
async function count(n) {
  await page.waitForFunction(
    (expected) => document.querySelectorAll(".blog-card").length === expected,
    n,
  );
  assert.equal(await cards.count(), n);
}
try {
  await page.goto(base + "/blogs");
  await count(6);
  assert.equal(
    await page.locator("#featured-article-title").innerText(),
    "From Monolith to Micro Frontends",
  );
  for (const [name, n] of [
    ["Frontend", 2],
    ["System Design", 1],
    ["Performance", 3],
    ["Engineering", 1],
    ["All Articles", 6],
  ]) {
    await page
      .getByRole("button", { name: new RegExp("^" + name + " \\(") })
      .click();
    await count(n);
  }
  await page.getByRole("button", { name: "Go to next page" }).click();
  await count(1);
  assert.equal(
    await page
      .getByRole("button", { name: "Page 2", exact: true })
      .getAttribute("aria-current"),
    "page",
  );
  assert.ok(
    await page.getByRole("button", { name: "Go to next page" }).isDisabled(),
  );
  await page.goBack();
  await count(6);
  await page.goForward();
  await count(1);
  await page.getByRole("button", { name: "Frontend (2)", exact: true }).click();
  await count(2);
  const search = page.getByRole("searchbox");
  await search.fill("  REACT ");
  await count(1);
  await page
    .getByRole("button", { name: "Performance (3)", exact: true })
    .click();
  await page.getByRole("heading", { name: "No articles found" }).waitFor();
  await page.goBack();
  await count(1);
  assert.equal(await search.inputValue(), "  REACT ");
  await page.goForward();
  await page.getByRole("heading", { name: "No articles found" }).waitFor();
  await page.getByRole("button", { name: "Clear search text" }).click();
  await count(3);
  await search.fill("Engineering");
  await page.getByRole("heading", { name: "No articles found" }).waitFor();
  await page
    .getByRole("button", { name: "RESET ALL FILTERS", exact: true })
    .click();
  await count(6);
  await search.fill("Engineering");
  await count(1);
  await search.fill("zzzzzz");
  await page.getByRole("heading", { name: "No articles found" }).waitFor();
  await page.goto(base + "/blogs?q=Webpack&page=999");
  await count(1);
  await page.goto(base + "/blogs?search=Engineering");
  await count(1);
  await page.goto(base + "/blogs");
  await count(6);
  await page
    .getByRole("button", { name: "Engineering (1)", exact: true })
    .focus();
  await page.keyboard.press("Enter");
  await count(1);
  assert.equal(
    await page
      .getByRole("button", { name: "Engineering (1)", exact: true })
      .evaluate((e) => getComputedStyle(e).outlineStyle),
    "solid",
  );
  await page.goto(base + "/blogs");
  const widths = [320, 375, 430, 768, 1024, 1280, 1440, 1920];
  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 });
    await page.evaluate(() => document.fonts.ready);
    assert.ok(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      `overflow ${width}`,
    );
    await page.locator("footer").scrollIntoViewIfNeeded();
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({
      path: `docs/blogs-audit/blogs-${width}.png`,
      fullPage: true,
    });
    assert.equal(
      await page
        .locator("img")
        .evaluateAll(
          (imgs) =>
            imgs.filter((i) => !i.complete || i.naturalWidth === 0).length,
        ),
      0,
      `images ${width}`,
    );
  }
  await page.setViewportSize({ width: 375, height: 900 });
  await page.getByRole("button", { name: "Open navigation menu" }).click();
  assert.ok(
    await page
      .getByRole("navigation", { name: "Mobile navigation" })
      .isVisible(),
  );
  assert.equal(
    await page
      .getByRole("navigation", { name: "Mobile navigation" })
      .getByRole("link", { name: "Blogs", exact: true })
      .getAttribute("aria-current"),
    "page",
  );
  await page.keyboard.press("Escape");
  assert.ok(
    await page
      .getByRole("button", { name: "Open navigation menu" })
      .evaluate((e) => e === document.activeElement),
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  await cards.first().hover();
  await page.waitForFunction(() =>
    ["none", "matrix(1, 0, 0, 1, 0, 0)"].includes(
      getComputedStyle(document.querySelector(".blog-card")).transform,
    ),
  );
  const slugs = [
    "from-monolith-to-micro-frontends",
    "mastering-core-web-vitals",
    "designing-a-scalable-real-estate-crm",
    "react-rendering-what-really-changed",
    "how-i-optimized-a-nextjs-app",
    "idempotency-keys-build-reliable-apis",
    "cdn-caching-performance-at-scale",
  ];
  for (const slug of slugs) {
    const r = await page.goto(base + "/blogs/" + slug);
    assert.equal(r.status(), 200);
    assert.equal(await page.locator("h1").count(), 1);
    assert.match(
      await page.locator('meta[name="robots"]').getAttribute("content"),
      /noindex/,
    );
  }
  const missing = await page.goto(base + "/blogs/not-a-real-article");
  assert.equal(missing.status(), 404);
  await page.goto(base);
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.screenshot({ path: "docs/blogs-audit/home-1440.png" });
  const noJS = await browser.newContext({ javaScriptEnabled: false });
  const staticPage = await noJS.newPage();
  await staticPage.goto(base + "/blogs?category=engineering");
  assert.equal(await staticPage.locator(".blog-card").count(), 1);
  await noJS.close();
  assert.deepEqual(errors, []);
  console.log(
    "PASS: filters, search, combined/empty states, URL/history, pagination, keyboard, focus, mobile navigation, reduced motion, 8 widths, images, 7 routes, 404, SSR without JS; no page errors.",
  );
} finally {
  await browser.close();
}
