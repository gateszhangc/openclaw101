import { expect, test } from "@playwright/test";

test("homepage exposes both tutorial and resource entry points", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "学会 OpenClaw，别再被文档淹没。" }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "开始学习" }).first()).toHaveAttribute(
    "href",
    "/tutorials",
  );
  await expect(page.getByRole("link", { name: "浏览资源" }).first()).toHaveAttribute(
    "href",
    "/resources",
  );
  await expect(page.getByText("精选教程")).toBeVisible();
  await expect(page.getByText("精选资源")).toBeVisible();
});

test("roadmap links phases and guide content", async ({ page }) => {
  await page.goto("/roadmap");

  await expect(
    page.getByRole("heading", { name: "从零开始，按阶段掌握，而不是按零散文章跳读" }),
  ).toBeVisible();
  await page
    .getByTestId("roadmap-phase-phase-install")
    .getByRole("link", { name: "进入本阶段" })
    .click();
  await expect(page).toHaveURL(/\/phases\/phase-install$/);
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
