import { expect, test } from "@playwright/test";
import { mkdir } from "fs/promises";

const authFile = "playwright/.auth/user.json";

test("authenticate", async ({ page }) => {
    await mkdir("playwright/.auth", { recursive: true });

    await page.goto("https://www.saucedemo.com/");
    await page.locator("#user-name").fill("standard_user");
    await page.locator("#password").fill("secret_sauce");
    await page.locator("#login-button").click();

    await expect(page).toHaveURL(/inventory\.html/);
    await page.context().storageState({ path: authFile });
});
