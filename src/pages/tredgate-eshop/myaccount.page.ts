import { Page } from "@playwright/test";

export class MyAccountPage {
  readonly page: Page;
  readonly registerLink =
    '.dropdown-menu a[href="https://tredgate.com/eshop/index.php?route=account/register"]';

  constructor(page: Page) {
    this.page = page;
  }

  async clickRegister() {
    await this.page.click(this.registerLink);
  }
}
