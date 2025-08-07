//import test from "node:test";
import { LoginPage } from "../../../src/pages/pmtool/login_page.ts";
import { test } from "@playwright/test";

test("Page Objects Test", async ({ page }) => {
  //test code
  const loginPage = new LoginPage(page);

  await loginPage.openPmtool();
  await loginPage.fillUsername("pw_academy");
  await loginPage.fillPassword("Playwright321!");
  await loginPage.clickLogin();
});
