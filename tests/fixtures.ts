import { test as baseTest } from "@playwright/test";
import { ProductPage } from "../src/pages/ProductPage";
import { CartPage } from "../src/pages/CartPage";
import { LoginPage } from "../src/pages/LoginPage";


const test = baseTest.extend<{
    loginPage: LoginPage;
    productPage: ProductPage;
    cartPage: CartPage;
}>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
    productPage: async ({ page }, use) => {
        const productPage = new ProductPage(page);
        await use(productPage);
    },
    cartPage: async ({ page }, use) => {
        const cartPage = new CartPage(page);
        await use(cartPage);
    },
});

export { test };