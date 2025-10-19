import { BasePage } from './basePage.js';
import { completeSelectors } from '../data/objectRepository.js';
import { expect } from '@playwright/test';

export class CompletePage extends BasePage {
    async verifyHeaderMessage(expectedMessage) {
        const actual = await this.getText(completeSelectors.completeHeaderLabel);
        expect(actual).toEqual(expectedMessage);
    }

    async verifyTextMessage(expectedMessage) {
        const actual = await this.getText(completeSelectors.completeTextLabel);
        expect(actual).toEqual(expectedMessage);
    }

    async verifyBackHomeButtonVisible() {
        await this.elementToBeVisible(completeSelectors.backHomeBtn);
    }

    async clickBackHome() {
        await this.click(completeSelectors.backHomeBtn);
    }
}
