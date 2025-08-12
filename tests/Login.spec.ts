import { expect } from "@playwright/test";
import { test } from "./fixtures";

test.beforeEach(async ({ loginPage }) => {
    loginPage.gotoLoginPage();
})

test("Don't input value", async ({ loginPage }) => {
    await loginPage.login("", "");

    await expect(await loginPage.getErrorMessage()).toBe("Epic sadface: Username is required");
});

test("Don't input value 1", async ({ loginPage }) => {
    await loginPage.login("", "22");

    await expect(await loginPage.getErrorMessage()).toBe("Epic sadface: Username is required");
});


test("Don't input value 2", async ({ loginPage }) => {
    await loginPage.login("", "22");

    await expect(await loginPage.getErrorMessage()).toBe("Epic sadface: Username is required");
});

test("Don't input value 3", async ({ loginPage }) => {
    await loginPage.login("", "22");

    await expect(await loginPage.getErrorMessage()).toBe("Epic sadface: Username is required");
});

test("Don't input value 4", async ({ loginPage }) => {
    await loginPage.login("", "22");

    await expect(await loginPage.getErrorMessage()).toBe("Epic sadface: Username is required");
});

test("Login with invalid password", async ({ loginPage }) => {
    await loginPage.login("standard_user", "111");

    await expect(await loginPage.getErrorMessage()).toBe("Epic sadface: Username and password do not match any user in this service");

});


test("Login with invalid password 2", async ({ loginPage }) => {
    await loginPage.login("standard_user", "1234");

    await expect(await loginPage.getErrorMessage()).toBe("Epic sadface: Username and password do not match any user in this service");

});



test("Login with valid value", async ({ loginPage, productPage }) => {
    await loginPage.login("standard_user", "secret_sauce");

    await expect(await productPage.getProductTitlePage()).toBe("Swag Labs");

});