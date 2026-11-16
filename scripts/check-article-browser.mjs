import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
const { chromium } = await import(
  process.env.PLAYWRIGHT_MODULE || "playwright"
);
const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROMIUM_EXECUTABLE,
});
const base = process.env.BLOGS_BASE_URL || "http://127.0.0.1:3100";
const url = base + "/blogs/mastering-core-web-vitals";
const context = await browser.newContext({
  permissions: ["clipboard-read", "clipboard-write"],
});
const page = await context.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
try {
  await mkdir("docs/article-verification", { recursive: true });
  assert.equal((await page.goto(url)).status(), 200);
  await page.getByRole("heading", { level: 1 }).waitFor();
  assert.equal(await page.locator("h1").count(), 1);
  assert.ok((await page.locator("#article-body h2").count()) >= 5);
  const json = JSON.parse(
    await page.locator('script[type="application/ld+json"]').innerText(),
  );
  assert.equal(json["@type"], "Article");
  assert.equal(json.author, undefined);
  assert.equal(json.datePublished, undefined);
  assert.equal(
    await page.locator('link[rel="canonical"]').getAttribute("href"),
    "https://tarunsharma.dev/blogs/mastering-core-web-vitals",
  );
  await page
    .getByRole("button", { name: "Copy article link", exact: true })
    .click();
  assert.equal(await page.evaluate(() => navigator.clipboard.readText()), url);
  const copy = page
    .getByRole("button", { name: "Copy code", exact: true })
    .first();
  await copy.click();
  assert.ok(
    (await page.evaluate(() => navigator.clipboard.readText())).includes(
      "import",
    ),
  );
  assert.ok((await page.locator(".hljs-keyword").count()) > 0);
  const toc = page.getByRole("navigation", { name: "Table of contents" });
  const target = toc.getByRole("link").last();
  const href = await target.getAttribute("href");
  await target.click();
  await page.waitForFunction((hash) => location.hash === hash, href);
  await page.waitForFunction(
    (id) => document.querySelector(`a[href="${id}"][aria-current="location"]`),
    href,
  );
  assert.ok(
    Number(await page.getByRole("progressbar").getAttribute("value")) > 0,
  );
  const gallery = page.getByRole("button", { name: /Enlarge image:/ });
  await gallery.first().click();
  const dialog = page.getByRole("dialog");
  await dialog.waitFor({ state: "visible" });
  assert.ok(await dialog.evaluate((e) => e.contains(document.activeElement)));
  await page.keyboard.press("Tab");
  assert.ok(await dialog.evaluate((e) => e.contains(document.activeElement)));
  await page.getByRole("button", { name: "Next image", exact: true }).click();
  assert.ok(
    await page
      .getByRole("button", { name: "Next image", exact: true })
      .isDisabled(),
  );
  await page.keyboard.press("Escape");
  await dialog.waitFor({ state: "hidden" });
  assert.ok(
    await gallery.first().evaluate((e) => e === document.activeElement),
  );
  await gallery.nth(1).click();
  await page.getByRole("button", { name: "Close image", exact: true }).click();
  assert.ok(await gallery.nth(1).evaluate((e) => e === document.activeElement));
  const range = page.getByRole("slider");
  await range.focus();
  await page.keyboard.press("ArrowRight");
  assert.equal(await range.inputValue(), "51");
  await page.emulateMedia({ reducedMotion: "reduce" });
  assert.equal(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
    "auto",
  );
  for (const width of [320, 375, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(url);
    await page.evaluate(() => document.fonts.ready);
    for (const img of await page.locator("#article-body img:visible").all())
      await img.scrollIntoViewIfNeeded();
    await page
      .locator("#article-body img:visible")
      .evaluateAll((images) =>
        Promise.all(images.map((image) => image.decode())),
      );
    await page.evaluate(() => scrollTo(0, 0));
    assert.ok(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      `overflow ${width}`,
    );
    assert.equal(
      await page
        .locator("#article-body img:visible")
        .evaluateAll(
          (images) =>
            images.filter((i) => !i.complete || !i.naturalWidth).length,
        ),
      0,
    );
    const readingWidth = await page
      .locator("#article-body")
      .evaluate((e) => e.getBoundingClientRect().width);
    assert.ok(readingWidth <= 721);
    if (width >= 1024)
      assert.equal(
        await page
          .locator(".article-reading-tools")
          .evaluate((e) => getComputedStyle(e).position),
        "sticky",
      );
    await page.screenshot({
      path: `docs/article-verification/article-${width}.png`,
      fullPage: true,
    });
  }
  await page.setViewportSize({ width: 320, height: 900 });
  const table = page.getByRole("region", { name: "Article comparison table" });
  assert.ok(await table.evaluate((e) => e.scrollWidth > e.clientWidth));
  await page
    .getByRole("link", { name: "← Back to all articles", exact: true })
    .click();
  await page.waitForURL(base + "/blogs");
  await page
    .locator(".blog-card")
    .filter({ hasText: "Core Web Vitals" })
    .getByRole("link")
    .click();
  await page.waitForURL(url);
  assert.equal(
    (await page.goto(base + "/blogs/invalid-article-slug")).status(),
    404,
  );
  const noJS = await browser.newContext({ javaScriptEnabled: false });
  const staticPage = await noJS.newPage();
  await staticPage.goto(url);
  assert.ok((await staticPage.locator("#article-body h2").count()) >= 5);
  await noJS.close();
  assert.deepEqual(errors, []);
  console.log(
    "PASS article: MDX/SEO, clipboard, highlighting, TOC/current section, progress, gallery/focus/Escape, comparison keyboard, reduced motion, five widths, images, table overflow, listing links, 404, no-JS rendering, no page errors.",
  );
} finally {
  await browser.close();
}
