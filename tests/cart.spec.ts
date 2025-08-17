import { test } from "../fixtures/fixtures";
import { expect } from "@playwright/test";

test.beforeEach(async ({ loginPage, productPage }) => {
    await loginPage.gotoLoginPage();
    await loginPage.login("standard_user", "secret_sauce");

    await (await productPage.getAddToCartButtonByProductName("Sauce Labs Backpack")).click();
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