import { test } from "../fixtures/fixtures";
import { expect } from "@playwright/test";
import { captureScreenshotForPassedTest } from "../utils/helpers";
import * as allure from "allure-js-commons";

test.use({ storageState: "playwright/.auth/user.json" });

test.beforeEach(async ({ page, productPage }) => {
    await allure.step("Setup: Navigate to inventory and prepare cart with test product", async () => {
        await page.goto("https://www.saucedemo.com/inventory.html");
        await page.waitForLoadState("networkidle");
        await productPage.clickButton("Sauce Labs Backpack", "add");
        await productPage.clickShoppingCartIcon();
    });
});

test("Remove item from cart", async ({ page, cartPage }) => {
    const productName = "Sauce Labs Backpack";
    await cartPage.clickRemovedButtonAtProductName(productName);
    const isRemoved = await cartPage.productIsRemoved(productName);
    expect(isRemoved).toBeTruthy();
    await captureScreenshotForPassedTest(page, 'Cart-RemoveItem');
});

test("Continue shopping from cart", async ({ cartPage, productPage, page }) => {
    await cartPage.clickContinueShoppingButton();
    const title = await productPage.getProductTitlePage();
    expect(title).toBe("Swag Labs");
    await captureScreenshotForPassedTest(page, 'Cart-ContinueShopping');
});

test("Complete checkout process", async ({ cartPage, page }) => {
    await cartPage.clickCheckoutButton();
    await cartPage.inputCheckoutInformation("Toan", "Can", "56000");
    await cartPage.clickFinishButton();
    await cartPage.isProductCheckoutSuccess();
    await captureScreenshotForPassedTest(page, 'Cart-CheckoutSuccess');
});
