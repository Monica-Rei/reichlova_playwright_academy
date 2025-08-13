import { test } from "@playwright/test";
import { HomePage } from "../../src/pages/tredgate-eshop/home.page";
import { MyAccountPage } from "../../src/pages/tredgate-eshop/myaccount.page";
import { RegisterPage } from "../../src/pages/tredgate-eshop/register.page";

test("Eshop - registrace na Eshopu", async ({ page }) => {
  const home = new HomePage(page);
  const myAccount = new MyAccountPage(page);
  const register = new RegisterPage(page);

  await home.goto();
  await home.clickMyAccount();
  await myAccount.clickRegister();

  await register.fillForm({
    firstName: "Monica",
    lastName: "Rei",
    email: "monica@test.cz",
    telephone: "666777888",
    password: "123456",
    confirmPassword: "123456",
  });

  await register.submit();
});
