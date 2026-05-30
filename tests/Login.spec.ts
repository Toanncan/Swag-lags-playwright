import { expect } from "@playwright/test";
import { test } from "../fixtures/fixtures";
import { readExcel } from "../utils/excelReader";
import { captureScreenshot } from "../utils/helpers";

const usersLogin = readExcel("Data.xlsx", "Login");

test.describe("Login", () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.gotoLoginPage();
    });

    usersLogin.forEach((user: any, index: number) => {
        test(`Login row ${index + 1}`, async ({ loginPage, productPage, page }) => {
            await loginPage.login(user.UserName, user.Password);

            const testStatus = (user.Status.trim()).toLowerCase();
            if (testStatus === "pass") {
                expect(await productPage.getProductTitlePage()).toBe(user.Expected);
            } else if (testStatus === "fail") {
                expect(await loginPage.getErrorMessage()).toBe(user.Expected);
            } else {
                throw new Error(`Invalid data in Row ${index + 1}`);
            }
            await captureScreenshot(page, `Login ${user.Status}`);
        })
    })
})

