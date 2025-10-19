import { BasePage } from './basePage.js';
import { expect } from 'playwright/test';
import { loginSelectors } from '../data/objectRepository.js';

export class LoginPage extends BasePage {
    async enterUsername(username) {
        await this.clear(loginSelectors.usernameInput);
        await this.fill(loginSelectors.usernameInput, username);
    }

    async enterPassword(password) {
        await this.clear(loginSelectors.passwordInput);
        await this.fill(loginSelectors.passwordInput, password);
    }

    async clickLogin() {
        await this.click(loginSelectors.loginBtn);
    }

    async login(username, password) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLogin();
    }

    async verifyErrorMessage(expectedMessage){
        const actualMessage = await this.getText(loginSelectors.errorBtn);
        await expect(actualMessage).toContain(expectedMessage);
    }
}
