import { test } from "../fixtures/fixtures";
import { expect } from "@playwright/test";

test.use({ storageState: "playwright/.auth/user.json" });

test.beforeEach(async ({ page, productPage }) => {
    await page.goto("https://www.saucedemo.com/inventory.html");


    await productPage.clickButton("Sauce Labs Backpack", "add");
    await productPage.clickShoppingCartIcon();
});

test("Click remove button", async ({ cartPage }) => {
    cartPage.clickRemovedButtonAtProductName("Sauce Labs Backpack");

    cartPage.productIsRemoved("Sauce Labs Backpack");
});

test("Click Continute Shopping", async ({ cartPage, productPage }) => {
    await cartPage.clickContinueShoppingButton();

    await expect(await productPage.getProductTitlePage()).toBe("Swag Labs");

});

test("Checkout product", async ({ cartPage }) => {
    await cartPage.clickCheckoutButton();

    await cartPage.inputCheckoutInformation("Toan", "Can", "56000");

    await cartPage.clickFinishButton();

    await cartPage.isProductCheckoutSuccess();
})
