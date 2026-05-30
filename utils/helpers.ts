import { Page, test } from '@playwright/test';

export async function captureScreenshot(page: Page, name: string): Promise<void> {
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
}
