import { test } from "./fixtures";
import { expect } from "@playwright/test";

test.beforeEach(async ({ loginPage, productPage }) => {
    await loginPage.gotoLoginPage();
    await loginPage.login("standard_user", "secret_sauce");

})