import { test, expect } from "@playwright/test"
import { LoginPage } from "../src/pages/LoginPage"



test("Don't input value", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.gotoLoginPage();
    await loginPage.login("", "");

    await expect(await loginPage.getErrorMessage()).toBe("Epic sadface: Username is required");
})


test("Login with invalid password", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.gotoLoginPage();
    await loginPage.login("standard_user", "111");

    await expect(await loginPage.getErrorMessage()).toBe("Epic sadface: Username and password do not match any user in this service");

})