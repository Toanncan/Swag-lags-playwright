import { expect, Locator, Page } from "@playwright/test";
import * as allure from "allure-js-commons";

export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigate(url: string) {
        await allure.step(`Navigate to ${url}`, async () => {
            await this.page.goto(url);
        });
    }

    async getTitle(): Promise<string> {
        return await this.page.title();
    }

    async elementIsDisplayed(locator: Locator): Promise<void> {
        await expect(locator).toBeVisible();
    }

    /**
     * Helper method to add detailed steps within a parent step
     */
    protected async addDetailStep(stepName: string, stepFunction: () => Promise<void>): Promise<void> {
        await allure.step(stepName, async () => {
            await stepFunction();
        });
    }
}


