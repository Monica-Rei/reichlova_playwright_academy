import { expect, Locator, Page } from "@playwright/test";
import { ProjectTasksPage } from "./project_tasks_page";
import { ProjectsPage } from "../projects_page.ts";

export class CreateNewProjectModal {
  readonly page: Page;
  readonly saveButton: Locator;
  readonly nameInput: Locator;
  readonly titleHeader: Locator;
  readonly infoTab: Locator;
  readonly prioritySelect: Locator;
  readonly priorityLabel: Locator;
  readonly statusSelect: Locator;
  readonly statusLabel: Locator;
  readonly nameLabel: Locator;
  readonly nameValidationDiv: Locator;
  readonly startDateInput: Locator;
  readonly startDateLabel: Locator;
  readonly descriptionFrame: string;
  readonly descriptionLabel: Locator;
  readonly attachmentsButton: Locator;
  readonly attachmentsLabel: Locator;
  readonly closeButton: Locator;
  readonly alertMessageDiv: Locator;
  readonly deleteAttachmentButton: Locator;
  readonly firstAttachmentName: Locator;
  readonly wishListButton: Locator;
  readonly compareButton: Locator;
  readonly productHeader: Locator;
  readonly brandLabel: Locator;
  readonly brandName: Locator;
  readonly productCodeLabel: Locator;
  readonly availabilityLabel: Locator;
  readonly priceLabel: Locator;
  readonly priceExTaxLabel: Locator;
  readonly quantityLabel: Locator;
  readonly quantityInput: Locator;
  readonly addToCartButton: Locator;
  readonly addToCartValidationMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.locator('//div[@data-testid="Name"]/input');
    this.saveButton = page.locator('//button[@type="submit"]');
    this.titleHeader = page.locator(".modal-title");
    this.infoTab = page.locator('//ul[@id="form_tabs"]//li[1]');
    this.prioritySelect = page.locator(
      '//div[@data-testid="Priority"]//select'
    );
    this.priorityLabel = page.locator(
      '//div[@data-testid="Priority"]//ancestor::div[contains(@class, "form-group")]/label'
    );
    this.statusSelect = page.locator('//div[@data-testid="Status"]//select');
    this.statusLabel = page.locator(
      '//div[@data-testid="Status"]//ancestor::div[contains(@class, "form-group")]/label'
    );
    this.nameLabel = page.locator(
      '//div[@data-testid="Name"]//ancestor::div[contains(@class, "form-group")]/label'
    );
    this.nameValidationDiv = page.locator('[data-testid="Name"] label.error');
    this.startDateInput = page.locator(
      '//div[@data-testid="Start Date"]//input'
    );
    this.startDateLabel = page.locator(
      '//div[@data-testid="Start Date"]//ancestor::div[contains(@class, "form-group")]/label'
    );
    this.descriptionFrame = '//div[@data-testid="Description"]//iframe';
    this.descriptionLabel = page.locator(
      '//div[@data-testid="Description"]//ancestor::div[contains(@class, "form-group")]/label'
    );
    this.attachmentsButton = page.locator(
      '//div[@data-testid="Attachments"]//div[contains(@class, "btn-upload")]'
    );
    this.attachmentsLabel = page.locator(
      '//div[@data-testid="Attachments"]//ancestor::div[contains(@class, "form-group")]/label'
    );
    this.closeButton = page.locator(".btn-close");
    this.alertMessageDiv = page.locator("#form-error-container .alert");
    this.deleteAttachmentButton = page.locator(
      '//div[@data-testid="Attachments"]//label[contains(@class, "delete_attachments")]'
    );
    this.firstAttachmentName = page.locator(
      '//div[@data-testid="Attachments"]//div[contains(@class, "attachments-form-list")]//tr[1]/td[1]'
    );
    this.wishListButton = page.locator('//div[@class="btn-group"]//button[1]');
    this.compareButton = page.locator('//div[@class="btn-group"]//button[2]');
    this.productHeader = page.locator(
      '//div[@id="content"]//div[@class="col-sm-4"]//h1'
    );
    this.brandLabel = page.locator(
      '//div[@class="col-sm-4"]//ul[@class="list-unstyled"][1]/li[1]'
    );
    this.brandName = page.locator(
      '//div[@class="col-sm-4"]//ul[@class="list-unstyled"][1]/li[1]/a'
    );
    /*this.productCodeLabel = page.locator(
      '//div[@class="col-sm-4"]//ul[@class="list-unstyled"][1]/li[2]'
    ); */

    /* this.productCodeLabel = page.locator(
      '//div[@class="col-sm-4"]//li[contains(text(), "Product Code")]'
    ); */

    this.productCodeLabel = page.locator(
      '//div[contains(@class,"col-sm-4")]//li[starts-with(normalize-space(.), "Product Code")]'
    );

    this.availabilityLabel = page.locator(
      '//div[@class="col-sm-4"]//ul[@class="list-unstyled"][1]/li[3]'
    );
    this.priceLabel = page.locator('//ul[@class="list-unstyled"]//h2');
    this.priceExTaxLabel = page.locator(
      '//div[@class="col-sm-4"]//ul[@class="list-unstyled"][2]/li[2]'
    );
    this.quantityLabel = page.locator(
      '//div[@class="form-group"]/label[@class="control-label"]'
    );
    this.quantityInput = page.locator('//input[@id="input-quantity"]');
    this.addToCartButton = page.locator('//button[@id="button-cart"]');
    this.addToCartValidationMessage = page.locator(
      '//div[@class="alert alert-success alert-dismissible"]'
    );
  }

  async fillName(projectName: string): Promise<this> {
    await this.nameInput.fill(projectName);
    return this;
  }
  async clickSave(): Promise<ProjectTasksPage> {
    await this.saveButton.click();
    return new ProjectTasksPage(this.page);
  }

  async clickClose(): Promise<ProjectsPage> {
    await this.closeButton.click();
    return new ProjectsPage(this.page);
  }

  async selectPriority(priorityValue: string): Promise<this> {
    await this.prioritySelect.selectOption(priorityValue);
    return this;
  }

  async selectStatus(statusValue: string): Promise<this> {
    await this.statusSelect.selectOption(statusValue);
    return this;
  }

  async fillStartDate(startDate: string): Promise<this> {
    await this.startDateInput.fill(startDate);
    return this;
  }

  async fillDescription(description: string): Promise<this> {
    const iframe = this.page.frameLocator(this.descriptionFrame);
    await iframe.locator("body").fill(description);
    return this;
  }

  async uploadFile(filePath: string): Promise<this> {
    const fileChooserPromise = this.page.waitForEvent("filechooser");
    await this.attachmentsButton.click();
    const fileInput = await fileChooserPromise;
    await fileInput.setFiles(filePath);
    await expect(this.deleteAttachmentButton).toBeVisible();
    return this;
  }

  async triggerNameInputValidation(): Promise<this> {
    await this.nameInput.clear();
    await this.saveButton.click();
    return this;
  }

  async triggerAlarmMessage(): Promise<this> {
    await this.triggerNameInputValidation();
    return this;
  }

  async triggerNameValidation(): Promise<CreateNewProjectModal> {
    // ? Ověření, že je pole pro název prázdné
    await this.nameInput.clear();
    // ? Po kliknutí na tlačítko "Uložit" by se měla zobrazit validační hláška
    await this.saveButton.click();
    return this;
  }

  async triggerAlertMessage(): Promise<CreateNewProjectModal> {
    // ? Pro zobrazení validační hlášky je potřeba kliknout na tlačítko "Uložit" bez vyplnění povinných polí, my na to využijeme už existující metodu triggerNameValidation. Mohlo by se zdát, že jde o duplicitu, ale z pohledu psaní testů nám tato metoda může zjednodušit hledání této metody v testech.
    // ? V testech pak můžeme použít triggerAlertMessage() a nemusíme se starat o to, co přesně se děje v této metodě.
    return await this.triggerNameValidation();
  }

  async addToCart(): Promise<CreateNewProjectModal> {
    await this.addToCartButton.click();
    await expect.soft(this.addToCartValidationMessage).toBeVisible();
    return this;
  }
}
