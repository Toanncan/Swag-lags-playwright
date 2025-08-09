import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CartPage extends BasePage {
    readonly productName: Locator;

    constructor(page: Page) {
        super(page);
        this.productName = page.locator(".inventory_item_name");
    }

    async getOneProductNameAtUI(): Promise<string> {
        return ((await this.productName.textContent()) ?? "");
    }

    async isProductAtUIMappingWithProductToAdd(...products: string[]): Promise<boolean> {
        const acctualProductAtUI: string[] = [];

        const productCount = await this.productName.count();

        for (let i = 0; i < productCount; i++) {
            acctualProductAtUI.push((await this.productName.nth(i).textContent()) ?? "");
        }

        return await acctualProductAtUI.sort() === products.sort();
    }
}