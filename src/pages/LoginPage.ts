import { Locator, Page } from "playwright/test";
import { BasePage } from "./BasePage";

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
        await this.userNameTextbox.fill(userName);
        await this.passwordTextbox.fill(password);
        await this.loginButton.click();
    }

    async getErrorMessage(): Promise<string> {
        return (await this.errorMessage.textContent()) ?? "";
    }
}