import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

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

    // addToCartButton(productName: string): Locator {
    //     return this.page.locator(`//div[text()='${productName}']/parent::a/parent::div/following-sibling::div/button`);
    // }

    // removeButton(productName: string): Locator {
    //     return this.page.locator(`//div[text()='${productName}']/parent::a/parent::div/following-sibling::div/button`);
    // }

    button(productName: string, type: "add" | "remove"): Locator {
        return this.page.locator(
            `//div[text()='${productName}']/parent::a/parent::div/following-sibling::div/button[text()= '${type === "add" ? "Add to cart" : "Remove"}']`
        );
    }

    async clickButton(productName: string, type: "add" | "remove") {
        await this.button(productName, type).click();
    }


    // async isProductNameSortByDescending(): Promise<boolean> {
    //     const actualProductNameAtUI: string[] = [];

    //     const productCount = await this.allproduct.count();
    //     for (let i = 0; i < productCount; i++) {
    //         const productName = await this.allproduct.nth(i).textContent();
    //         actualProductNameAtUI.push((productName) ?? "");
    //     }

    //     const expectedProductName: string[] = [];

    //     for (const product of actualProductNameAtUI) {
    //         expectedProductName.push(product);
    //     }

    //     const expectedSort = expectedProductName.sort().reverse();

    //     return actualProductNameAtUI === expectedSort;
    // }

    // async isProductNameSortByAscending(): Promise<boolean> {
    //     const actualProductNameAtUI: string[] = [];

    //     const productCount = await this.allproduct.count();
    //     for (let i = 0; i < productCount; i++) {
    //         const productName = await this.allproduct.nth(i).textContent();
    //         actualProductNameAtUI.push((productName) ?? "");
    //     }

    //     const expectedProductName: string[] = [];
    //     for (const product of actualProductNameAtUI) {
    //         expectedProductName.push(product);
    //     }

    //     const expectedSort = expectedProductName.sort();

    //     return actualProductNameAtUI === expectedSort;
    // };

    // async isProductPriceSortByAscending(): Promise<boolean> {
    //     const actualProductPrice: number[] = [];

    //     const productCount = await this.allPriceProduct.count();

    //     for (let i = 0; i < productCount; i++) {
    //         const productPrice = Number((await this.allPriceProduct.nth(i).textContent())?.replace("$", ""));
    //         actualProductPrice.push(productPrice);
    //     }

    //     const expectProductPrice: number[] = [];

    //     for (const productPrice of actualProductPrice) {
    //         expectProductPrice.push(productPrice);
    //     }

    //     const expectSort = expectProductPrice.sort();

    //     return actualProductPrice === expectSort;
    // };

    // async isProductPriceSortByDescending(): Promise<boolean> {
    //     const actualProductPrice: number[] = [];

    //     const productCount = await this.allPriceProduct.count();

    //     for (let i = 0; i < productCount; i++) {
    //         const productPrice = Number((await this.allPriceProduct.nth(i).textContent())?.replace("$", ""));
    //         actualProductPrice.push(productPrice);
    //     }

    //     const expectProductPrice: number[] = [];

    //     for (const productPrice of actualProductPrice) {
    //         expectProductPrice.push(productPrice);
    //     }

    //     const expectedSort = expectProductPrice.sort().reverse();

    //     return actualProductPrice === expectedSort;
    // };

    // async getAddToCartButtonByProductName(productName: string): Promise<Locator> {
    //     return await this.addToCartButton(productName);
    // };

    // async isRemoveButtonDisplayAtProduct(productName: string): Promise<boolean> {
    //     return await this.removeButton(productName).isVisible();
    // };

    buttonIsDisplayed(productName: string, type: "add" | "remove") {
        this.elementIsDisplayed(this.button(productName, type));
    }

    async clickShoppingCartIcon(): Promise<void> {
        await this.shoppingCartIcon.click();
    }

    async sortByProductName(sort: "asc" | "desc"): Promise<boolean> {
        const actualProductNames: string[] = [];

        const productCount = await this.allproduct.count();

        for (let i = 0; i < productCount; i++) {
            const productName = await this.allproduct.nth(i).textContent();
            actualProductNames.push(productName ?? "");
        }

        //copy Array --> sort
        const expectedProductNames = actualProductNames.slice();
        expectedProductNames.sort();

        if (sort === "desc") {
            expectedProductNames.reverse();
        }

        //compare value Array
        return actualProductNames.every((val, idx) => val === expectedProductNames[idx]);
    }

    async sortByProductPrice(sort: "asc" | "desc"): Promise<boolean> {
        const actualProductPrices: number[] = [];

        const productCount = await this.allPriceProduct.count();
        for (let i = 0; i < productCount; i++) {
            const productPrice = Number(
                (await this.allPriceProduct.nth(i).textContent())?.replace("$", "")
            );
            actualProductPrices.push(productPrice);
        }

        //Copy Array --> Sort
        const expectedPrices = actualProductPrices.slice();
        expectedPrices.sort((a, b) => a - b);

        // console.log("Actual Prices: ", actualProductPrices);
        // console.log("Expected Prices (asc): ", expectedPrices);

        if (sort === "desc") {
            expectedPrices.reverse();
        }

        return actualProductPrices.every((val, idx) => val === expectedPrices[idx]);
    }
};

