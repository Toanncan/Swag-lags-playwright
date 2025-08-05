import { expect } from "@playwright/test";
import { test } from "./fixtures";

test.beforeEach(async ({ loginPage }) => {
    loginPage.gotoLoginPage();
})

test("Don't input value", async ({ loginPage }) => {
    await loginPage.login("", "");

    await expect(await loginPage.getErrorMessage()).toBe("Epic sadface: Username is required");
});


test("Login with invalid password", async ({ loginPage }) => {
    await loginPage.login("standard_user", "111");

    await expect(await loginPage.getErrorMessage()).toBe("Epic sadface: Username and password do not match any user in this service");

});
