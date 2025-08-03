import { test as base } from '@playwright/test';

const test = base.extend({});

// Auto attach screenshot on failure
test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
        const screenshot = await page.screenshot({ fullPage: true });
        await testInfo.attach('📸 Screenshot on Failure', {
            body: screenshot,
            contentType: 'image/png',
        });
    }
});

export { test };
