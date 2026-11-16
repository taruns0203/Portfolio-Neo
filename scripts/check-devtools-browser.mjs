import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
const { chromium } = await import(
  process.env.PLAYWRIGHT_MODULE || "playwright"
);
const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROMIUM_EXECUTABLE,
});
const base = process.env.DEVTOOLS_BASE_URL || "http://127.0.0.1:3101";
const context = await browser.newContext({
  permissions: ["clipboard-read", "clipboard-write"],
});
const page = await context.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
await mkdir("docs/devtools-verification", { recursive: true });
const launcher = page.getByRole("button", { name: "Open Portfolio DevTools" });
const dialog = page.getByRole("dialog", { name: "Portfolio DevTools" });
async function open() {
  await launcher.click();
  await dialog.waitFor({ state: "visible" });
}
async function navigate(name) {
  if (await page.getByLabel("DevTools section", { exact: true }).isVisible())
    await page
      .getByLabel("DevTools section", { exact: true })
      .selectOption({ label: name });
  else
    await page
      .getByRole("navigation", { name: "DevTools sections" })
      .getByRole("button", { name, exact: true })
      .click();
  await page.waitForFunction(
    (label) =>
      document.getElementById("dt-section-title")?.textContent === label,
    name,
  );
  await page.evaluate(
    () =>
      new Promise((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(resolve)),
      ),
  );
}
try {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(base + "/blogs/mastering-core-web-vitals");
  await open();
  assert.ok(await dialog.evaluate((el) => el.contains(document.activeElement)));
  assert.equal(
    await page.evaluate(() => document.body.style.overflow),
    "hidden",
  );
  for (let i = 0; i < 30; i++) {
    await page.keyboard.press("Tab");
    assert.ok(
      await dialog.evaluate((el) => el.contains(document.activeElement)),
    );
  }
  for (let i = 0; i < 30; i++) {
    await page.keyboard.press("Shift+Tab");
    assert.ok(
      await dialog.evaluate((el) => el.contains(document.activeElement)),
    );
  }
  await page.keyboard.press("Escape");
  await dialog.waitFor({ state: "hidden" });
  assert.ok(await launcher.evaluate((el) => el === document.activeElement));
  await page.waitForFunction(() => document.body.style.overflow !== "hidden");
  assert.notEqual(
    await page.evaluate(() => document.body.style.overflow),
    "hidden",
  );
  await open();
  await page.mouse.click(20, 500);
  await dialog.waitFor({ state: "hidden" });
  await open();
  await page
    .getByRole("button", { name: "Expand DevTools", exact: true })
    .click();
  assert.ok(
    await dialog.evaluate((el) => el.getBoundingClientRect().width > 760),
  );
  await page
    .getByRole("button", { name: "Collapse DevTools", exact: true })
    .click();
  await navigate("Architecture");
  await page
    .getByRole("button", { name: "Content & data", exact: true })
    .click();
  assert.ok(
    await page
      .getByText("The article loader uses an explicit local file allowlist.", {
        exact: false,
      })
      .isVisible(),
  );
  await page.getByRole("button", { name: "Deployment", exact: true }).click();
  assert.ok(
    await page
      .getByText("Provider not verified in this workspace.", { exact: true })
      .isVisible(),
  );
  await navigate("Performance");
  assert.equal(
    await dialog.getByText("Not measured", { exact: true }).count(),
    4,
  );
  assert.ok(
    await dialog
      .getByText("Metrics not yet connected", { exact: true })
      .isVisible(),
  );
  await navigate("Code Explorer");
  await dialog
    .getByRole("button", { name: "lib/utils.ts", exact: true })
    .click();
  await dialog.getByRole("button", { name: "Copy code", exact: true }).click();
  assert.ok(
    (await page.evaluate(() => navigator.clipboard.readText())).includes(
      "return twMerge(clsx(inputs))",
    ),
  );
  assert.ok(
    await dialog
      .getByText("Public repository link not available.", { exact: false })
      .isVisible(),
  );
  await dialog
    .getByRole("button", { name: "examples/status.tsx", exact: true })
    .click();
  assert.ok(
    await dialog.getByText("Illustrative snippet", { exact: true }).isVisible(),
  );
  assert.equal(
    (await dialog.locator(".dt-code .hljs-keyword").count()) > 0,
    true,
  );
  await navigate("Design Decisions");
  assert.equal(
    await page.locator(".dt-content").evaluate((el) => el.scrollTop),
    0,
  );
  await dialog.locator("summary").first().click();
  assert.ok(
    await dialog
      .getByText("A client-rendered SPA, or a purely static site.", {
        exact: true,
      })
      .isVisible(),
  );
  await navigate("Experiments");
  const preview = page.locator(".dt-experiment-preview");
  await page.getByLabel("Brutalist shadow", { exact: true }).uncheck();
  await page.waitForFunction(
    () =>
      getComputedStyle(document.querySelector(".dt-experiment-preview"))
        .boxShadow === "none",
  );
  assert.equal(
    await preview.evaluate((el) => getComputedStyle(el).boxShadow),
    "none",
  );
  await page.getByLabel("Highlight", { exact: true }).selectOption("mint");
  assert.ok((await preview.getAttribute("class")).includes("dt-preview-mint"));
  await page.getByLabel("Reduce preview motion", { exact: true }).check();
  await preview.hover();
  assert.equal(
    await preview.evaluate((el) => getComputedStyle(el).transform),
    "none",
  );
  await navigate("About This Site");
  assert.ok(
    await dialog
      .getByText("CodeQuest · Not available yet", { exact: true })
      .isVisible(),
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [320, 375, 768, 1280, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await navigate("Overview");
    await page.evaluate(() => document.fonts.ready);
    for (const tab of [
      "Overview",
      "Architecture",
      "Performance",
      "Tech Stack",
      "Code Explorer",
      "Design Decisions",
      "Experiments",
      "About This Site",
    ]) {
      await navigate(tab);
      assert.ok(
        await dialog.evaluate((el) => el.scrollWidth <= el.clientWidth),
        `dialog overflow ${tab} ${width}`,
      );
      assert.ok(
        await page
          .locator(".dt-content")
          .evaluate((el) => el.scrollWidth <= el.clientWidth),
        `content overflow ${tab} ${width}`,
      );
    }
    await navigate("Overview");
    await page.screenshot({
      path: `docs/devtools-verification/overview-${width}.png`,
    });
  }
  await navigate("Experiments");
  await preview.hover();
  assert.equal(
    await preview.evaluate((el) => getComputedStyle(el).transform),
    "none",
  );
  await navigate("About This Site");
  await dialog.getByRole("link", { name: "Projects", exact: false }).click();
  await dialog.waitFor({ state: "hidden" });
  await page.waitForURL(base + "/#work");
  assert.ok(await page.locator("#work").isVisible());
  await open();
  await page
    .getByRole("button", { name: "Close DevTools", exact: true })
    .click();
  await dialog.waitFor({ state: "hidden" });
  assert.ok(await launcher.evaluate((el) => el === document.activeElement));
  await page.locator(".contact-footer").scrollIntoViewIfNeeded();
  assert.ok(
    await page.evaluate(() => {
      const control = document
        .querySelector(".dt-launcher")
        .getBoundingClientRect();
      const link = document
        .querySelector(".contact-footer a")
        .getBoundingClientRect();
      return (
        control.top >= link.bottom ||
        control.left >= link.right ||
        control.right <= link.left
      );
    }),
  );
  assert.deepEqual(errors, []);
  console.log(
    "PASS DevTools: modal/focus/scroll/backdrop/Escape, 8 sections, architecture details, missing metrics/repository/CodeQuest, code copying/highlighting, decisions, experiments/reduced motion, navigation, 5 responsive widths, no page errors.",
  );
} finally {
  await browser.close();
}
