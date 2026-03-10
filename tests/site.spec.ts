import { expect, test } from "@playwright/test";

test("homepage funnels users to Guide and Resources", async ({ page }) => {
  await page.goto("/");

  const heroHeading = page.locator("h1").first();
  await expect(heroHeading).toContainText("先走对顺序");
  await expect(heroHeading).toContainText("再开始折腾 OpenClaw");
  await expect(page.getByRole("link", { name: "查看 Guide" }).first()).toHaveAttribute(
    "href",
    "/guide",
  );
  await expect(page.getByRole("link", { name: "浏览资源" }).first()).toHaveAttribute(
    "href",
    "/resources",
  );
  await expect(page.getByTestId("home-start-panel")).toContainText("先看导读");
  await expect(page.getByTestId("home-resource-section")).toContainText(
    "把 OpenClaw 最常用的入口先收进一个地方",
  );
  await expect(page.getByTestId("home-resource-section")).toContainText("官方入门指南");
});

test("guide page maps phases to guides and support resources", async ({ page }) => {
  await page.goto("/guide");

  await expect(
    page.getByRole("heading", { name: "从零开始，按正确顺序上手 OpenClaw" }),
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
  await expect(page.getByTestId("guide-callout").first()).toBeVisible();
  await expect(page.getByTestId("guide-step")).toHaveCount(2);
  await expect(page.getByTestId("guide-command").first()).toBeVisible();
  await expect(page.getByRole("link", { name: "下一篇" })).toBeVisible();
});

test("legacy tutorial routes are removed", async ({ page }) => {
  await page.goto("/tutorials");

  await expect(page.getByRole("heading", { name: "这个页面不存在" })).toBeVisible();
});

test("resources page supports direct entry filters plus search and filtering", async ({ page }) => {
  await page.goto("/resources?category=%E6%8A%80%E8%83%BD");

  await expect(
    page.getByRole("heading", { name: "把 OpenClaw 里会反复查的入口先收进一个地方" }),
  ).toBeVisible();
  await expect(page.getByText("你来这里不是按顺序学习")).toBeVisible();

  const browser = page.getByTestId("resource-browser");
  await expect(browser.getByTestId("resource-card")).toHaveCount(1);
  await expect(browser.getByTestId("resource-card").filter({ hasText: "ClawHub 技能生态" })).toHaveCount(
    1,
  );

  await browser.locator("select").first().selectOption("全部");
  await page.getByPlaceholder("搜索资源、来源或关键词").fill("GitHub");
  await expect(browser.getByTestId("resource-card")).toHaveCount(3);
  await expect(browser.getByTestId("resource-card").filter({ hasText: "GitHub 仓库" })).toHaveCount(
    1,
  );
});

test("english locale keeps localized routes, copy, and filters", async ({ page }) => {
  await page.goto("/en");

  await expect(page.locator("html")).toHaveAttribute("lang", "en");

  const heroHeading = page.locator("h1").first();
  await expect(heroHeading).toContainText("Get the order right");
  await expect(heroHeading).toContainText("then start bending OpenClaw to your needs.");
  await expect(page.getByRole("link", { name: "Open Guide" }).first()).toHaveAttribute(
    "href",
    "/en/guide",
  );
  await expect(page.getByRole("link", { name: "Browse Resources" }).first()).toHaveAttribute(
    "href",
    "/en/resources",
  );

  await page.getByRole("link", { name: "Open Guide" }).first().click();
  await expect(page).toHaveURL(/\/en\/guide$/);
  await expect(
    page.getByRole("heading", { name: "Start from zero and learn OpenClaw in the right order" }),
  ).toBeVisible();

  const installPhase = page.getByTestId("guide-phase-phase-install");
  await expect(installPhase).toContainText("Core guide");
  await expect(installPhase).toContainText("Check these when you are blocked");
  await expect(installPhase.getByRole("link", { name: "Enter stage" })).toHaveAttribute(
    "href",
    "/en/phases/phase-install",
  );

  await page.getByRole("link", { name: "中文" }).click();
  await expect(page).toHaveURL(/\/guide$/);

  await page.goto("/en/resources?category=skills");

  await expect(
    page.getByRole("heading", {
      name: "Collect the OpenClaw links you will keep revisiting in one place",
    }),
  ).toBeVisible();
  await expect(page.getByText("Current filters: category=Skills")).toBeVisible();
  await expect(page.getByRole("link", { name: "中文" })).toHaveAttribute(
    "href",
    "/resources?category=skills",
  );

  const browser = page.getByTestId("resource-browser");
  await expect(browser.getByTestId("resource-card")).toHaveCount(1);
  await expect(browser.getByTestId("resource-card").filter({ hasText: "ClawHub Skill Ecosystem" })).toHaveCount(
    1,
  );

  await browser.locator("select").first().selectOption("all");
  await page.getByPlaceholder("Search resources, sources, or keywords").fill("GitHub");
  await expect(browser.getByTestId("resource-card")).toHaveCount(3);
  await expect(browser.getByTestId("resource-card").filter({ hasText: "GitHub Repository" })).toHaveCount(
    1,
  );
});
