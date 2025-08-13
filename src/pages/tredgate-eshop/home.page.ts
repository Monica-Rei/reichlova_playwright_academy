import { Page } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly myAccountIcon = "#top-links a i.fa-user";

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("https://tredgate.com/eshop/");
  }

  async clickMyAccount() {
    await this.page.click(this.myAccountIcon);
  }
}
