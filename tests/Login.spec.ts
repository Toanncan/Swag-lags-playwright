import { expect } from "@playwright/test";
import { test } from "../fixtures/fixtures";
import { readExcel } from "../utils/excelReader";
import { captureScreenshotForPassedTest } from "../utils/helpers";
import * as allure from "allure-js-commons";

const usersLogin = readExcel("Data.xlsx", "Login");

test.describe("Login", () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.gotoLoginPage();
    });

    usersLogin.forEach((user: any, index: number) => {
        test(`Login row ${index + 1}`, async ({ loginPage, productPage, page }) => {
            const testStatus = (user.Status.trim()).toLowerCase();

            if (testStatus === "pass") {
                await allure.step(`Execute login test case ${index + 1} with username '${user.UserName}'`, async () => {
                    await loginPage.login(user.UserName, user.Password);
                    const actualTitle = await productPage.getProductTitlePage();
                    expect(actualTitle).toBe(user.Expected);
                });
                await captureScreenshotForPassedTest(page, `Login-Row-${index + 1}`);
            } else if (testStatus === "fail") {
                await allure.step(`Execute login test case ${index + 1} with username '${user.UserName}' - expecting failure`, async () => {
                    await loginPage.login(user.UserName, user.Password);
                    const errorMessage = await loginPage.getErrorMessage();
                    expect(errorMessage).toBe(user.Expected);
                });
                await captureScreenshotForPassedTest(page, `Login-Row-${index + 1}-Failed`);
            } else {
                throw new Error(`Invalid data in Row ${index + 1}`);
            }
        })
    })
})

