import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import * as allure from "allure-js-commons";

export class ProductPage extends BasePage {
    readonly titlePage: Locator;
    readonly sortDropdown: Locator;
    readonly allproduct: Locator;
    readonly allPriceProduct: Locator;
    readonly shoppingCartIcon: Locator;

    constructor(page: Page) {
        super(page);
        this.titlePage = page.locator(".title");
        this.sortDropdown = page.locator(".product_sort_container");
        this.allproduct = page.locator(".inventory_item_name");
        this.allPriceProduct = page.locator(".inventory_item_price");
        this.shoppingCartIcon = page.locator(".shopping_cart_link");
    }

    async getProductTitlePage(): Promise<string> {
        return this.getTitle();
    }

    async selectSort(value: string) {
        await this.sortDropdown.selectOption(value);
    }

    button(productName: string, type: "add" | "remove"): Locator {
        return this.page.locator(
            `//div[text()='${productName}']/parent::a/parent::div/following-sibling::div/button[text()= '${type === "add" ? "Add to cart" : "Remove"}']`
        );
    }

    async clickButton(productName: string, type: "add" | "remove") {
        const actionText = type === "add" ? "Add to cart" : "Remove";
        await allure.step(`Click '${actionText}' button for product '${productName}' using locator: //div[text()='${productName}']/parent::a/parent::div/following-sibling::div/button`, async () => {
            await this.button(productName, type).click();
            await this.page.waitForLoadState("networkidle");
        });
    }

    buttonIsDisplayed(productName: string, type: "add" | "remove") {
        this.elementIsDisplayed(this.button(productName, type));
    }

    async clickShoppingCartIcon(): Promise<void> {
        await allure.step(`Click Shopping Cart icon using locator: .shopping_cart_link`, async () => {
            await this.shoppingCartIcon.click();
            await this.page.waitForLoadState("networkidle");
        });
    }

    async sortByProductName(sort: "asc" | "desc"): Promise<boolean> {
        let result = false;
        await allure.step(`Verify products are sorted by name in ${sort === "asc" ? "ascending" : "descending"} order`, async () => {
            const actualProductNames: string[] = [];

            const productCount = await this.allproduct.count();

            for (let i = 0; i < productCount; i++) {
                const productName = await this.allproduct.nth(i).textContent();
                actualProductNames.push(productName ?? "");
            }

            const expectedProductNames = actualProductNames.slice();
            expectedProductNames.sort();

            if (sort === "desc") {
                expectedProductNames.reverse();
            }

            result = actualProductNames.every((val, idx) => val === expectedProductNames[idx]);
        });
        return result;
    }

    async sortByProductPrice(sort: "asc" | "desc"): Promise<boolean> {
        let result = false;
        await allure.step(`Verify products are sorted by price in ${sort === "asc" ? "ascending" : "descending"} order`, async () => {
            const actualProductPrices: number[] = [];

            const productCount = await this.allPriceProduct.count();
            for (let i = 0; i < productCount; i++) {
                const productPrice = Number(
                    (await this.allPriceProduct.nth(i).textContent())?.replace("$", "")
                );
                actualProductPrices.push(productPrice);
            }

            const expectedPrices = actualProductPrices.slice();
            expectedPrices.sort((a, b) => a - b);

            if (sort === "desc") {
                expectedPrices.reverse();
            }

            result = actualProductPrices.every((val, idx) => val === expectedPrices[idx]);
        });
        return result;
    }
};

