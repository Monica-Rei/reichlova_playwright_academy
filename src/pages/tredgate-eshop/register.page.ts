import { Page } from "@playwright/test";

export class RegisterPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async fillForm(fields: {
    firstName: string;
    lastName: string;
    email: string;
    telephone: string;
    password: string;
    confirmPassword: string;
  }) {
    await this.page.fill("#input-firstname", fields.firstName);
    await this.page.fill("#input-lastname", fields.lastName);
    await this.page.fill("#input-email", fields.email);
    await this.page.fill("#input-telephone", fields.telephone);
    await this.page.fill("#input-password", fields.password);
    await this.page.fill("#input-confirm", fields.confirmPassword);
  }

  async submit() {
    await this.page.click('input[type="submit"]');
  }
}
