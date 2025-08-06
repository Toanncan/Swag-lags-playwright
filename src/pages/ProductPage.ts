import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductPage extends BasePage {
    readonly titlePage: Locator;
    readonly sortDropdown: Locator;
    readonly allproduct: Locator;
    readonly allPriceProduct: Locator;

    constructor(page: Page) {
        super(page);
        this.titlePage = page.locator(".title");
        this.sortDropdown = page.locator(".product_sort_container");
        this.allproduct = page.locator(".inventory_item_name");
        this.allPriceProduct = page.locator(".inventory_item_price");
    }

    async getProductTitlePage(): Promise<string> {
        return this.getTitle();
    }

    async selectSort(value: string) {
        await this.sortDropdown.selectOption(value);
    }

    async isProductNameSortByDescending(): Promise<boolean> {
        const actualProductNameAtUI: string[] = [];

        const productCount = await this.allproduct.count();
        for (let i = 0; i < productCount; i++) {
            const productName = await this.allproduct.nth(i).textContent();
            actualProductNameAtUI.push((productName) ?? "");
        }

        const expectedProductName: string[] = [];

        for (const product of actualProductNameAtUI) {
            expectedProductName.push(product);
        }

        const expectedSort = expectedProductName.sort().reverse();

        return actualProductNameAtUI === expectedSort;
    }

    async isProductNameSortByAscending(): Promise<boolean> {
        const actualProductNameAtUI: string[] = [];

        const productCount = await this.allproduct.count();
        for (let i = 0; i < productCount; i++) {
            const productName = await this.allproduct.nth(i).textContent();
            actualProductNameAtUI.push((productName) ?? "");
        }

        const expectedProductName: string[] = [];
        for (const product of actualProductNameAtUI) {
            expectedProductName.push(product);
        }

        const expectedSort = expectedProductName.sort();

        return actualProductNameAtUI === expectedSort;
    };

    async isProductPriceSortByAscending(): Promise<boolean> {
        const actualProductPrice: number[] = [];

        const productCount = await this.allPriceProduct.count();

        for (let i = 0; i < productCount; i++) {
            const productPrice = Number((await this.allPriceProduct.nth(i).textContent())?.replace("$", ""));
            actualProductPrice.push(productPrice);
        }

        const expectProductPrice: number[] = [];

        for (const productPrice of actualProductPrice) {
            expectProductPrice.push(productPrice);
        }

        const expectSort = expectProductPrice.sort();

        return actualProductPrice === expectSort;
    };

    async isProductPriceSortByDescending(): Promise<boolean> {
        const actualProductPrice: number[] = [];

        const productCount = await this.allPriceProduct.count();

        for (let i = 0; i < productCount; i++) {
            const productPrice = Number((await this.allPriceProduct.nth(i).textContent())?.replace("$", ""));
            actualProductPrice.push(productPrice);
        }

        const expectProductPrice: number[] = [];

        for (const productPrice of actualProductPrice) {
            expectProductPrice.push(productPrice);
        }

        const expectedSort = expectProductPrice.sort().reverse();

        return actualProductPrice === expectedSort;
    }
};

