import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CartPage extends BasePage {
    readonly productName: Locator;
    readonly continueShoppingButton: Locator;
    readonly checkoutButton: Locator;
    readonly firstNameTextbox: Locator;
    readonly lastNameTextbox: Locator;
    readonly zipcodeTextbox: Locator;
    readonly continueButton: Locator;
    readonly finishButton: Locator;
    readonly checkoutSuccessMesssage: string;
    readonly successMessageLocator: Locator;

    constructor(page: Page) {
        super(page);
        this.productName = page.locator(".inventory_item_name");
        this.continueShoppingButton = page.locator("#continue-shopping");
        this.checkoutButton = page.locator("#checkout");
        this.firstNameTextbox = page.locator("#first-name");
        this.lastNameTextbox = page.locator("#last-name");
        this.zipcodeTextbox = page.locator("#postal-code");
        this.continueButton = page.locator("#continue");
        this.finishButton = page.locator("#finish");
        this.checkoutSuccessMesssage = "Your order has been dispatched, and will arrive just as fast as the pony can get there!";
        this.successMessageLocator = page.locator(".complete-text");
    }

    async getOneProductNameAtUI(): Promise<string> {
        return ((await this.productName.textContent()) ?? "");
    }

    removeButtonAtProduct(productName: string): Locator {
        return this.page.locator(`//div[text()='${productName}']/parent::a/parent::div//button[text()='Remove']`)
    };

    async isProductAtUIMappingWithProductToAdd(...products: string[]): Promise<boolean> {
        const acctualProductAtUI: string[] = [];

        const productCount = await this.productName.count();

        for (let i = 0; i < productCount; i++) {
            acctualProductAtUI.push((await this.productName.nth(i).textContent()) ?? "");
        }

        return await acctualProductAtUI.sort() === products.sort();
    }

    private async getRemovedButtonByProductName(...productNames: string[]): Promise<Locator[]> {
        const removedButtons: Locator[] = [];
        for (const product of productNames) {
            await removedButtons.push((await this.removeButtonAtProduct(product)) ?? "");
        }

        return removedButtons;
    }

    async clickRemovedButtonAtProductName(...productNames: string[]) {
        for (const removedButton of await this.getRemovedButtonByProductName(...productNames)) {
            await removedButton.click();
        }
    }

    async productIsRemoved(...productNames: string[]): Promise<boolean> {
        for (const product of productNames) {
            const isHidden = await this.page.locator(`//div[text()='${product}']`).isHidden();
            if (!isHidden) {
                return false;
            }
        }
        return true;
    }

    async clickContinueShoppingButton() {
        await this.continueShoppingButton.click();
    }

    async clickCheckoutButton() {
        await this.checkoutButton.click();
    }

    async inputCheckoutInformation(firstName: string, lastName: string, zipcode: string) {
        await this.firstNameTextbox.fill(firstName);
        await this.lastNameTextbox.fill(lastName);
        await this.zipcodeTextbox.fill(zipcode);
        await this.continueButton.click();
    }

    async clickFinishButton() {
        await this.finishButton.click();
    }

    async isProductCheckoutSuccess(): Promise<void> {
        const acctualSuccessMessage = await this.successMessageLocator.textContent();

        await expect(acctualSuccessMessage).toBe(this.checkoutSuccessMesssage);
    }
}