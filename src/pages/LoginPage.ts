import { Locator, Page } from "playwright/test";
import { BasePage } from "./BasePage";
import * as allure from "allure-js-commons";

export class LoginPage extends BasePage {

    readonly userNameTextbox: Locator;
    readonly passwordTextbox: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.userNameTextbox = page.locator("#user-name");
        this.passwordTextbox = page.locator("#password");
        this.loginButton = page.locator("#login-button");
        this.errorMessage = page.locator("[data-test='error']");
    }

    async gotoLoginPage() {
        await this.navigate("https://www.saucedemo.com/");
    }

    async login(userName: string, password: string) {
        await allure.step(`Perform login with username '${userName}'`, async () => {
            await allure.step(`Fill username field with value '${userName}' using locator: #user-name`, async () => {
                await this.userNameTextbox.fill(userName);
            });

            await allure.step(`Fill password field using locator: #password`, async () => {
                await this.passwordTextbox.fill(password);
            });

            await allure.step(`Click 'LOGIN' button using locator: #login-button`, async () => {
                await this.loginButton.click();
                await this.page.waitForLoadState("networkidle");
            });
        });
    }

    async getErrorMessage(): Promise<string> {
        return (await this.errorMessage.textContent()) ?? "";
    }
}