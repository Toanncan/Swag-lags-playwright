import { test as baseTest } from "@playwright/test";
import { LoginPage } from "../src/pages/LoginPage";
import { ProductPage } from "../src/pages/ProductPage";

const test = baseTest.extend<{
    loginPage: LoginPage;
    productPage: ProductPage;
}>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
    productPage: async ({ page }, use) => {
        const productPage = new ProductPage(page);
        await use(productPage);
    },
});

export { test };