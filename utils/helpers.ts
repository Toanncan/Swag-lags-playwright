import { Page, test } from '@playwright/test';
import * as allure from 'allure-js-commons';

export async function captureScreenshot(page: Page, name: string, testStatus?: string): Promise<void> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const path = `test-results/screenshots/${name}-${timestamp}.png`;

    await page.screenshot({
        path,
        fullPage: true,
    });

    await test.info().attach(name, {
        path,
        contentType: 'image/png'
    });

    // Attach screenshot to Allure report
    await allure.attachment(name, path, 'image/png');
}

/**
 * Capture screenshot for passed tests and attach to Allure
 */
export async function captureScreenshotForPassedTest(page: Page, testName: string): Promise<void> {
    await allure.step(`Capture screenshot for passed test: ${testName}`, async () => {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const path = `test-results/screenshots/${testName}-passed-${timestamp}.png`;

        await page.screenshot({
            path,
            fullPage: true,
        });

        await test.info().attach(`${testName}-passed`, {
            path,
            contentType: 'image/png'
        });

        // Attach to Allure
        await allure.attachment(`Test Result Screenshot - ${testName}`, path, 'image/png');
    });
}
