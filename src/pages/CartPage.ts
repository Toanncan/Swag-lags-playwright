import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import * as allure from "allure-js-commons";

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

    async productAddMappingWithUI(...products: string[]): Promise<boolean> {
        const actualProductsAdded: string[] = [];

        const productCount = await this.productName.count();
        for (let i = 0; i < productCount; i++) {
            actualProductsAdded.push((await this.productName.nth(i).textContent()) ?? "");
        }

        actualProductsAdded.sort();

        const expectProducts = products.sort();

        return actualProductsAdded.every((val, idx) => val === expectProducts[idx]);
    }

    private async getRemovedButtonByProductName(...productNames: string[]): Promise<Locator[]> {
        const removedButtons: Locator[] = [];
        for (const product of productNames) {
            await removedButtons.push((await this.removeButtonAtProduct(product)) ?? "");
        }

        return removedButtons;
    }

    async clickRemovedButtonAtProductName(...productNames: string[]) {
        await allure.step(`Remove products from cart: ${productNames.join(", ")}`, async () => {
            for (const productName of productNames) {
                await allure.step(`Click 'Remove' button for product '${productName}' using locator: //div[text()='${productName}']/parent::a/parent::div//button[text()='Remove']`, async () => {
                    const removeButton = this.removeButtonAtProduct(productName);
                    await removeButton.click();
                    await this.page.waitForLoadState("networkidle");
                });
            }
        });
    }

    async productIsRemoved(...productNames: string[]): Promise<boolean> {
        let result = true;
        await allure.step(`Verify product(s) successfully removed from cart: ${productNames.join(", ")}`, async () => {
            for (const product of productNames) {
                await allure.step(`Check product '${product}' is not visible using locator: //div[text()='${product}']`, async () => {
                    const isHidden = await this.page.locator(`//div[text()='${product}']`).isHidden();
                    if (!isHidden) {
                        result = false;
                    }
                });
            }
        });
        return result;
    }

    async clickContinueShoppingButton() {
        await allure.step(`Click 'Continue Shopping' button using locator: #continue-shopping`, async () => {
            await this.continueShoppingButton.click();
            await this.page.waitForLoadState("networkidle");
        });
    }

    async clickCheckoutButton() {
        await allure.step(`Click 'Checkout' button using locator: #checkout`, async () => {
            await this.checkoutButton.click();
            await this.page.waitForLoadState("networkidle");
        });
    }

    async inputCheckoutInformation(firstName: string, lastName: string, zipcode: string) {
        await allure.step(`Fill shipping information with first name: '${firstName}', last name: '${lastName}', zipcode: '${zipcode}'`, async () => {
            await allure.step(`Fill first name field with value '${firstName}' using locator: #first-name`, async () => {
                await this.firstNameTextbox.fill(firstName);
            });

            await allure.step(`Fill last name field with value '${lastName}' using locator: #last-name`, async () => {
                await this.lastNameTextbox.fill(lastName);
            });

            await allure.step(`Fill postal code field with value '${zipcode}' using locator: #postal-code`, async () => {
                await this.zipcodeTextbox.fill(zipcode);
            });

            await allure.step(`Click 'Continue' button using locator: #continue`, async () => {
                await this.continueButton.click();
                await this.page.waitForLoadState("networkidle");
            });
        });
    }

    async clickFinishButton() {
        await allure.step(`Click 'Finish' button to complete purchase using locator: #finish`, async () => {
            await this.finishButton.click();
            await this.page.waitForLoadState("networkidle");
        });
    }

    async isProductCheckoutSuccess(): Promise<void> {
        await allure.step(`Verify checkout success with message using locator: .complete-text`, async () => {
            const acctualSuccessMessage = await this.successMessageLocator.textContent();
            await expect(acctualSuccessMessage).toBe(this.checkoutSuccessMesssage);
        });
    }
}