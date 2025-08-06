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
})