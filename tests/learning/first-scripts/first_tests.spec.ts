import { test } from "@playwright/test";

test("First test", async ({ page }) => {
  await page.goto("http://tredgate.com/pmtool/");
  await page.locator("#username").fill("pw_academy");
  await page.locator("#password").fill("Playwright123!");
  await page.locator(".btn").click();
});
