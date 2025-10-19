import { expect } from '@playwright/test';

export class BasePage {
    constructor(page) {
        this.page = page;
    }

    async navigateTo(url) {
        await this.page.goto(url);
    }

    async verifyUrl(expectedUrl) {
        await expect(this.page).toHaveURL(new RegExp(expectedUrl));
    }
    
    async click(selector) {
        await this.page.click(selector);
    }

    async fill(selector, text) {
        await this.page.fill(selector, text);
    }

    async clear(selector) {
        await this.page.fill(selector, '');
    }

    async getText(selector) {
        return await this.page.textContent(selector);
    }

    async elementToBeVisible(selector) {
        await expect(this.page.locator(selector)).toBeVisible();
    }

    /**
     * Select dropdown option by visible text or value
     * @param {string} locator - CSS or XPath selector for the <select> element
     * @param {string} optionText - Option visible text or value
     */
    async selectFromDropdown(locator, optionText) {
        const dropdown = this.page.locator(locator);
        await dropdown.waitFor({ state: 'visible', timeout: 5000 });

        // Try selecting by label first, then value
        const options = await dropdown.locator('option').allTextContents();
        const matchByLabel = options.find(o => o.trim() === optionText.trim());

        if (matchByLabel) {
            await dropdown.selectOption({ label: optionText.trim() });
        } else {
            await dropdown.selectOption({ value: optionText.trim() });
        }

        // Optional wait for UI update
        await this.page.waitForTimeout(500);
    }

}

// module.exports = { BasePage };
