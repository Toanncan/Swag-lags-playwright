import { test } from "./fixtures";
import { expect } from "@playwright/test";

test.beforeEach(async ({ loginPage }) => {
    await loginPage.gotoLoginPage();

    await loginPage.login("standard_user", "secret_sauce");
});

test("Sort Name Z to A", async ({ productPage }) => {
    await productPage.selectSort("Name (Z to A)");

    await expect(productPage.isProductNameSortByDescending()).toBeTruthy();
});

test("Sort Name A to Z", async ({ productPage }) => {
    await productPage.selectSort("Name (A to Z)");

    await expect(productPage.isProductNameSortByAscending()).toBeTruthy();
});

test("Sort Price (low to high)", async ({ productPage }) => {
    await productPage.selectSort("Price (low to high)");

    await expect(productPage.isProductPriceSortByAscending()).toBeTruthy();
});

test("Sort Price (high to low)", async ({ productPage }) => {
    await productPage.selectSort("Price (high to low)");

    await expect(productPage.isProductPriceSortByDescending()).toBeTruthy();
});

test("Click add to cart button at Sauce Labs Backpack", async ({ page, productPage, cartPage }) => {
    await (await productPage.getAddToCartButtonByProductName("Sauce Labs Backpack")).click();

    await productPage.isRemoveButtonDisplayAtProduct("Sauce Labs Backpack");

    await productPage.clickShoppingCartIcon();

    await expect(await cartPage.getOneProductNameAtUI()).toBe("Sauce Labs Backpack");

});

test("Add more product to Cart", async ({ productPage, cartPage }) => {
    await (await productPage.getAddToCartButtonByProductName("Sauce Labs Onesie")).click();
    await (await productPage.getAddToCartButtonByProductName("Sauce Labs Bolt T-Shirt")).click();

    await productPage.clickShoppingCartIcon();

    await cartPage.isProductAtUIMappingWithProductToAdd("Sauce Labs Onesie", "Sauce Labs Bolt T-Shirt");

    //test ci
})