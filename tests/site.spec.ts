import { expect, test } from "@playwright/test";

test("homepage presents the curated learning route and entry points", async ({ page }) => {
  await page.goto("/");

  const heroHeading = page.locator("h1").first();
  await expect(heroHeading).toContainText("学会 OpenClaw");
  await expect(heroHeading).toContainText("别再被文档淹没。");
  await expect(page.getByRole("link", { name: "开始学习" }).first()).toHaveAttribute(
    "href",
    "/tutorials",
  );
  await expect(page.getByRole("link", { name: "查看路线" }).first()).toHaveAttribute(
    "href",
    "/roadmap",
  );
  await expect(page.getByTestId("home-route-snapshot")).toBeVisible();
  await expect(page.getByTestId("home-curated-section")).toContainText("精选教程");
  await expect(page.getByTestId("home-curated-section")).toContainText("精选资源");
  await expect(page.getByRole("heading", { name: "FAQ" })).toHaveCount(0);
});

test("roadmap links phases and guide content", async ({ page }) => {
  await page.goto("/roadmap");

  await expect(
    page.getByRole("heading", { name: "从零开始，按阶段掌握，而不是按零散文章跳读" }),
  ).toBeVisible();
  const installLink = page
    .getByTestId("roadmap-phase-phase-install")
    .getByRole("link", { name: "进入本阶段" });
  await expect(installLink).toHaveAttribute("href", "/phases/phase-install");
  await page.goto("/phases/phase-install");
  await expect(page.getByRole("heading", { name: "安装与启动" })).toBeVisible();
  await expect(page.getByText("本阶段推荐资源")).toBeVisible();
});

test("tutorial detail renders markdown content and navigation", async ({ page }) => {
  await page.goto("/tutorials/02-install-and-dashboard");

  await expect(
    page.getByRole("heading", {
      name: "OpenClaw 从零陪跑 02｜先把它跑起来：安装、onboard、Dashboard、Gateway",
    }),
  ).toBeVisible();
  await expect(page.getByText("章节目录")).toBeVisible();
  await expect(page.getByRole("link", { name: "下一篇" })).toBeVisible();
});

test("resources page supports search and filtering", async ({ page }) => {
  await page.goto("/resources");

  await expect(
    page.getByRole("heading", { name: "把官方、社区、部署、视频等高价值资料整理到一起" }),
  ).toBeVisible();
  await page.getByPlaceholder("搜索资源、来源或关键词").fill("GitHub");
  const browser = page.getByTestId("resource-browser");
  await expect(browser.getByTestId("resource-card")).toHaveCount(3);
  await expect(browser.getByTestId("resource-card").filter({ hasText: "GitHub 仓库" })).toHaveCount(
    1,
  );
  await expect(
    browser.getByTestId("resource-card").filter({ hasText: "ClawHub 技能生态" }),
  ).toHaveCount(0);
});
