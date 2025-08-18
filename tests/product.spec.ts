import { test } from "../fixtures/fixtures";
import { expect } from "@playwright/test";

test.beforeEach(async ({ loginPage }) => {
    await loginPage.gotoLoginPage();

    await loginPage.login("standard_user", "secret_sauce");
});

test("Sort Name Z to A", async ({ productPage }) => {
    await productPage.selectSort("Name (Z to A)");

    // await expect(productPage.isProductNameSortByDescending()).toBeTruthy();
    expect(await productPage.sortByProductName("desc")).toBeTruthy();
});

test("Sort Name A to Z", async ({ productPage }) => {
    await productPage.selectSort("Name (A to Z)");

    // await expect(productPage.isProductNameSortByAscending()).toBeTruthy();
    expect(await productPage.sortByProductName("asc")).toBeTruthy();
});

test("Sort Price (low to high)", async ({ productPage }) => {
    await productPage.selectSort("Price (low to high)");

    // await expect(productPage.isProductPriceSortByAscending()).toBeTruthy();
    expect(await productPage.sortByProductPrice("asc")).toBeTruthy();
});

test("Sort Price (high to low)", async ({ productPage }) => {
    await productPage.selectSort("Price (high to low)");

    // await expect(productPage.isProductPriceSortByDescending()).toBeTruthy();
    expect(await productPage.sortByProductPrice("desc")).toBeTruthy();
});

test("Click add to cart button at Sauce Labs Backpack", async ({ page, productPage, cartPage }) => {
    // await (await productPage.getAddToCartButtonByProductName("Sauce Labs Backpack")).click();
    await productPage.clickButton("Sauce Labs Backpack", "add");

    // await productPage.isRemoveButtonDisplayAtProduct("Sauce Labs Backpack");
    await productPage.buttonIsDisplayed("Sauce Labs Backpack", "remove");

    await productPage.clickShoppingCartIcon();

    await expect(await cartPage.getOneProductNameAtUI()).toBe("Sauce Labs Backpack");

});

test("Add more product to Cart", async ({ productPage, cartPage }) => {
    // await (await productPage.getAddToCartButtonByProductName("Sauce Labs Onesie")).click();
    // await (await productPage.getAddToCartButtonByProductName("Sauce Labs Bolt T-Shirt")).click();

    await productPage.clickButton("Sauce Labs Onesie", "add");
    await productPage.clickButton("Sauce Labs Bolt T-Shirt", "add");

    await productPage.clickShoppingCartIcon();

    await cartPage.isProductAtUIMappingWithProductToAdd("Sauce Labs Onesie", "Sauce Labs Bolt T-Shirt");
})