import { expect, test } from "@playwright/test";

test("homepage funnels users into the new product-style guide flow", async ({ page }) => {
  await page.goto("/");

  const heroHeading = page.locator("h1").first();
  await expect(heroHeading).toContainText("学会 OpenClaw");
  await expect(heroHeading).toContainText("不靠硬啃文档");
  await expect(page.getByRole("link", { name: "从第 1 篇开始" }).first()).toHaveAttribute(
    "href",
    "/guide/01-what-is-openclaw",
  );
  await expect(page.getByRole("link", { name: "我先查资源" }).first()).toHaveAttribute(
    "href",
    "/resources",
  );
  await expect(page.getByTestId("home-start-panel")).toContainText("把上手顺序压缩成一个可执行的面板");
  await expect(page.getByTestId("home-resource-section")).toContainText("把最常回查的入口先收起来");
  await expect(page.getByTestId("home-resource-section")).toContainText("官方入门指南");
  await expect(page.getByTestId("site-logo-mark")).toBeVisible();
  await expect(page.locator('[aria-label="Toggle color theme"]')).toHaveCount(0);
  await expect(page.locator('link[rel="icon"]').first()).toHaveAttribute("href", /icon/i);
  await expect(page.locator('meta[property="og:image"]').first()).toHaveAttribute(
    "content",
    /branding\/site-og\.png/,
  );

  const howLink = page.locator('a[href="/#how-it-works"]');
  await expect(howLink.first()).toHaveCount(1);
});

test("homepage does not fetch bundled webfont assets on first paint", async ({ page }) => {
  const fontResponses: string[] = [];

  page.on("response", (response) => {
    const url = response.url();

    if (url.includes("/_next/static/media/") && url.endsWith(".woff2")) {
      fontResponses.push(url);
    }
  });

  await page.goto("/", { waitUntil: "networkidle" });
  expect(fontResponses).toEqual([]);
});

test("guide page maps phases to guides and support resources", async ({ page }) => {
  await page.goto("/guide");

  await expect(
    page.getByRole("heading", { name: "从零开始，按正确顺序把 OpenClaw 走通" }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "从导读开始" }).first()).toHaveAttribute(
    "href",
    "/guide/01-what-is-openclaw",
  );

  const installPhase = page.getByTestId("guide-phase-phase-install");
  await expect(installPhase).toContainText("核心教程");
  await expect(installPhase).toContainText("卡住时先查这些");
  await expect(installPhase.getByRole("link", { name: "进入阶段" })).toHaveAttribute(
    "href",
    "/phases/phase-install",
  );
});

test("roadmap remains a secondary stage overview", async ({ page }) => {
  await page.goto("/roadmap");

  await expect(
    page.getByRole("heading", { name: "当你已经知道顺序，再按阶段深入" }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "回到 Guide" })).toHaveAttribute(
    "href",
    "/guide",
  );

  const installLink = page
    .getByTestId("roadmap-phase-phase-install")
    .getByRole("link", { name: "进入本阶段" });
  await expect(installLink).toHaveAttribute("href", "/phases/phase-install");

  await page.goto("/phases/phase-install");
  await expect(page.getByRole("heading", { name: "安装与启动" })).toBeVisible();
  await expect(page.getByText("本阶段推荐资源")).toBeVisible();
});

test("guide detail renders MDX content blocks and navigation", async ({ page }) => {
  await page.goto("/guide/02-install-and-dashboard");

  await expect(
    page.getByRole("heading", {
      name: "OpenClaw 从零陪跑 02｜先把它跑起来：安装、onboard、Dashboard、Gateway",
    }),
  ).toBeVisible();
  await expect(page.getByText("章节目录")).toBeVisible();
  await expect(page.getByTestId("guide-hero-cover")).toBeVisible();
  await expect(page.getByTestId("guide-callout").first()).toBeVisible();
  await expect(page.getByTestId("guide-figure")).toHaveCount(1);
  await expect(page.getByTestId("guide-step")).toHaveCount(2);
  await expect(page.getByTestId("guide-command").first()).toBeVisible();
  await expect(page.locator('meta[property="og:image"]').first()).toHaveAttribute(
    "content",
    /guides\/02-install-and-dashboard\/og\.png/,
  );
  await expect(page.locator("a").filter({ hasText: "下一篇" })).toHaveCount(1);
});

test("legacy tutorial routes are removed", async ({ page }) => {
  await page.goto("/tutorials");

  await expect(page.getByRole("heading", { name: "这个页面不存在" })).toBeVisible();
});

test("resources page supports direct entry filters plus search and filtering", async ({ page }) => {
  await page.goto("/resources?category=%E6%8A%80%E8%83%BD");

  await expect(
    page.getByRole("heading", { name: "把 OpenClaw 里会反复查的入口整理成一个工具页" }),
  ).toBeVisible();
  await expect(page.getByText("Guide 负责顺序，Resources 负责检索")).toBeVisible();

  const browser = page.getByTestId("resource-browser");
  await expect(browser.getByTestId("resource-card")).toHaveCount(1);
  await expect(
    browser.getByTestId("resource-card").filter({ hasText: "ClawHub 技能生态" }),
  ).toHaveCount(1);

  await browser.locator("select").first().selectOption("all");
  await page.getByPlaceholder("搜索资源、来源或关键词").fill("GitHub");
  await expect(browser.getByTestId("resource-card")).toHaveCount(3);
  await expect(
    browser.getByTestId("resource-card").filter({ hasText: "GitHub 仓库" }),
  ).toHaveCount(1);
});

test("english locale keeps localized routes, copy, and filters", async ({ page }) => {
  test.setTimeout(45_000);
  await page.goto("/en");

  await expect(page.locator("html")).toHaveAttribute("lang", "en");

  const heroHeading = page.locator("h1").first();
  await expect(heroHeading).toContainText("Learn OpenClaw");
  await expect(heroHeading).toContainText("without brute-forcing the docs.");
  await expect(page.getByRole("link", { name: "Start with episode 1" }).first()).toHaveAttribute(
    "href",
    "/en/guide/01-what-is-openclaw",
  );
  await expect(page.getByRole("link", { name: "Browse resources first" }).first()).toHaveAttribute(
    "href",
    "/en/resources",
  );
  await expect(page.getByTestId("site-logo-mark")).toBeVisible();

  await page.goto("/en/guide", { waitUntil: "domcontentloaded" });
  await expect(
    page.getByRole("heading", {
      name: "Start from zero and move through OpenClaw in the right order",
    }),
  ).toBeVisible();

  const installPhase = page.getByTestId("guide-phase-phase-install");
  await expect(installPhase).toContainText("Core lesson");
  await expect(installPhase).toContainText("Open these first when blocked");
  await expect(installPhase.getByRole("link", { name: "Enter stage" })).toHaveAttribute(
    "href",
    "/en/phases/phase-install",
  );

  await page.getByRole("link", { name: "中文" }).click();
  await expect(page).toHaveURL(/\/guide$/);

  await page.goto("/en/resources?category=skills", { waitUntil: "domcontentloaded" });

  await expect(
    page.getByRole("heading", {
      name: "Turn OpenClaw links you revisit into a real tool page",
    }),
  ).toBeVisible();
  await expect(page.getByText("Current filters: category=Skills")).toBeVisible();
  await expect(page.getByRole("link", { name: "中文" })).toHaveAttribute(
    "href",
    "/resources?category=skills",
  );

  const browser = page.getByTestId("resource-browser");
  await expect(browser.getByTestId("resource-card")).toHaveCount(1);
  await expect(
    browser.getByTestId("resource-card").filter({ hasText: "ClawHub Skill Ecosystem" }),
  ).toHaveCount(1);

  await browser.locator("select").first().selectOption("all");
  await page.getByPlaceholder("Search resources, sources, or keywords").fill("GitHub");
  await expect(browser.getByTestId("resource-card")).toHaveCount(3);
  await expect(
    browser.getByTestId("resource-card").filter({ hasText: "GitHub Repository" }),
  ).toHaveCount(1);
});

test("core pages avoid horizontal overflow", async ({ page }) => {
  for (const path of ["/", "/guide", "/resources", "/guide/02-install-and-dashboard"]) {
    await page.goto(path);
    const hasOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth + 1,
    );
    expect(hasOverflow).toBeFalsy();
  }
});

test("guide artwork is shared across locales", async ({ page }) => {
  await page.goto("/guide/03-models-and-auth", { waitUntil: "domcontentloaded" });
  const zhCover = page.getByTestId("guide-hero-cover-image");
  await expect(zhCover).toBeVisible();
  const zhCoverSrc = await zhCover.getAttribute("src");

  await page.goto("/en/guide/03-models-and-auth", { waitUntil: "domcontentloaded" });
  const enCover = page.getByTestId("guide-hero-cover-image");
  await expect(enCover).toBeVisible();
  await expect(page.getByTestId("guide-figure")).toHaveCount(1);
  const enCoverSrc = await enCover.getAttribute("src");

  expect(zhCoverSrc).toBeTruthy();
  expect(enCoverSrc).toBe(zhCoverSrc);
});
