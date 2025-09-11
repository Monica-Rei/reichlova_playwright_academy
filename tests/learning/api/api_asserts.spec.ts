import { test, expect } from "@playwright/test";

test("Assert response 200 OK", async ({ request }) => {
  const response = await request.get(
    "https://tegb-backend-877a0b063d29.herokuapp.com/eshop/4"
  );
  expect(response.status(), "Eshop User Response is 200").toBe(200);
});

test("Assert Response Header", async ({ request }) => {
  const response = await request.get(
    "https://tegb-backend-877a0b063d29.herokuapp.com/train"
  );
  // Získání hlaviček z response
  const headers = response.headers();
  const contentType = headers["content-type"];
  expect(contentType, "Header content-type have value").toBe(
    "application/json; charset=utf-8"
  );
  expect(contentType, "Header content-type contains value").toContain(
    "application/json"
  );
});

test("Response Body Asserts", async ({ request }) => {
  const response = await request.get(
    "https://tegb-backend-877a0b063d29.herokuapp.com/train"
  );
  // ? Získáme tělo odpovědi
  const responseBody = await response.json();

  // * Kontroly
  // ? Kontrola existence property
  expect(responseBody).toHaveProperty("timestamp");
  // ? Kontrola konkrétní hodnoty (number, string)
  expect(responseBody.id).toBe(1);
  expect(responseBody.message).toBe("TEG#B Training GET request successful");
  // ? Můžeme zkontrolovat i část stringu
  expect(responseBody.message).toContain("TEG#B Training");
  // ? Kontrola typu property
  expect(typeof responseBody.id).toBe("number");
});
