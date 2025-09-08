import { expect, test } from "@playwright/test";
import { CreateNewProjectModal } from "../../src/pages/pmtool/projects/create_new_project_modal.ts";

test.describe("Open URL", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(
      "https://tredgate.com/eshop/index.php?route=product/product&product_id=40"
    );
  });

  test("Modal Structure Tests", async ({ page }) => {
    const addProjectModal = new CreateNewProjectModal(page);

    await test.step("Upper Button Tests", async () => {
      await expect.soft(addProjectModal.wishListButton).toBeVisible();
      await expect.soft(addProjectModal.compareButton).toBeVisible();
    });

    await test.step("Title Header Tests", async () => {
      await expect(addProjectModal.productHeader).toBeVisible();
      await expect.soft(addProjectModal.productHeader).toHaveText("iPhone");
    });

    await test.step("Product Code Section Tests", async () => {
      await expect.soft(addProjectModal.productCodeLabel).toBeVisible();
      await expect
        .soft(addProjectModal.productCodeLabel)
        .toHaveText(/Product Code: product \d+/);
    });

    await test.step("Availability Section Tests", async () => {
      await expect.soft(addProjectModal.availabilityLabel).toBeVisible();
      await expect
        .soft(addProjectModal.availabilityLabel)
        .toHaveText(/Availability: .+/);
    });

    await test.step("Price Section Tests", async () => {
      await expect.soft(addProjectModal.priceLabel).toBeVisible();
      await expect
        .soft(addProjectModal.priceLabel)
        .toHaveText(/\s*\$\d+(\.\d{2})?/);
    });

    await test.step("Tax Section Tests", async () => {
      await expect.soft(addProjectModal.priceExTaxLabel).toBeVisible();
      await expect
        .soft(addProjectModal.priceExTaxLabel)
        .toHaveText(/\s*Ex Tax: \$\d+(\.\d{2})?/);
    });

    await test.step("Quantity Input Tests", async () => {
      await expect.soft(addProjectModal.quantityInput).toBeVisible();
      await expect.soft(addProjectModal.quantityInput).toBeEnabled();
      //await expect.soft(addProjectModal.quantityInput).toHaveText("*1");
      await expect.soft(addProjectModal.quantityLabel).toBeVisible();
      await expect.soft(addProjectModal.quantityLabel).toHaveText("Qty");
    });

    await test.step("Brand Section Tests", async () => {
      await expect.soft(addProjectModal.brandLabel).toBeVisible();
      await expect.soft(addProjectModal.brandLabel).toContainText("Brand:");
      //await expect.soft(addProjectModal.brandName).toBeVisible();
      await expect.soft(addProjectModal.brandName).toHaveText("Apple");
      await expect
        .soft(addProjectModal.brandName)
        .toHaveAttribute("href", /.*manufacturer_id=8/);
      await addProjectModal.brandName.click();
      await expect.soft(page).toHaveURL(/.*manufacturer_id=8/);
    });
  });

  test("Add to Cart Validation Message Test", async ({ page }) => {
    const addProjectModal = new CreateNewProjectModal(page);
    await addProjectModal.addToCart();
    await expect.soft(addProjectModal.addToCartButton).toBeVisible();
    await expect
      .soft(addProjectModal.addToCartValidationMessage)
      .toContainText("Success: You have added iPhone to your shopping cart!");
  });
});
