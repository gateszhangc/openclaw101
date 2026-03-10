import { expect, test } from "@playwright/test";

const NEW_GA_SCRIPT = "https://www.googletagmanager.com/gtag/js?id=G-V10JVNN7T9";
const OLD_GA_SCRIPT = "https://www.googletagmanager.com/gtag/js?id=G-BT11LQZ7RV";
const NEW_CLARITY_SCRIPT = "https://www.clarity.ms/tag/vth7ia2ttm";
const OLD_CLARITY_SCRIPT = "https://www.clarity.ms/tag/vtaufjgukb";

test("homepage defers analytics until interaction and uses the new ids", async ({ page }) => {
  test.setTimeout(60_000);
  await page.goto("/", { waitUntil: "domcontentloaded" });

  await expect(page.locator(`script[src="${NEW_GA_SCRIPT}"]`)).toHaveCount(0);
  await expect(page.locator(`script[src="${OLD_GA_SCRIPT}"]`)).toHaveCount(0);
  await expect(page.locator(`script[src="${NEW_CLARITY_SCRIPT}"]`)).toHaveCount(0);
  await expect(page.locator(`script[src="${OLD_CLARITY_SCRIPT}"]`)).toHaveCount(0);

  await page.click("body", { position: { x: 20, y: 20 } });

  await expect(page.locator(`script[src="${NEW_GA_SCRIPT}"]`)).toHaveCount(1, { timeout: 35_000 });
  await expect(page.locator(`script[src="${OLD_GA_SCRIPT}"]`)).toHaveCount(0);
  await expect(page.locator(`script[src="${NEW_CLARITY_SCRIPT}"]`)).toHaveCount(1, { timeout: 35_000 });
  await expect(page.locator(`script[src="${OLD_CLARITY_SCRIPT}"]`)).toHaveCount(0);
});
