import { BasePage } from './basePage.js';
import { overviewSelectors } from '../data/objectRepository.js';
import { expect } from '@playwright/test';
import { PaymentInfoModel } from '../models/paymentInfoModel.js';

export class OverviewPage extends BasePage {
    #paymentInfo = new PaymentInfoModel();
    get paymentInfo() {
        return this.#paymentInfo;
    }

    async verifyInformationNotEmpty(label) {
        const text = await this.getText(overviewSelectors.informationValueLabel(label));
        expect(text).not.toBe('');
    }

    async getSauceCardNumberText() {
        const sauceCardNumber = await this.getText(overviewSelectors.informationValueLabel('Payment Information'));
        this.#paymentInfo.sauceCardNumber = sauceCardNumber;
        console.log(`SauceCard: ${this.#paymentInfo.sauceCardNumber}`);
    }

    async verifyPriceDetails(itemTotal, tax, total) {
        const actualItemTotal = await this.getText(overviewSelectors.itemTotalValueLabel);
        const actualTax = await this.getText(overviewSelectors.taxValueLabel);
        const actualTotal = await this.getText(overviewSelectors.totalValueLabel);

        expect(actualItemTotal).toContain(itemTotal);
        expect(actualTax).toContain(tax);
        expect(actualTotal).toContain(total);
    }

    async clickFinish() {
        await this.click(overviewSelectors.finishBtn);
    }
}
