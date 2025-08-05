import { test as baseTest } from "@playwright/test";
import { LoginPage } from "../src/pages/LoginPage";

const test = baseTest.extend<{
    loginPage: LoginPage;
}>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    }
});

export { test };