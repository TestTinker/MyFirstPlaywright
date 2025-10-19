import { BasePage } from './basePage.js';
import { checkoutSelectors } from '../data/objectRepository.js';

export class CheckoutPage extends BasePage {
    async enterCustomerInfo(firstName, lastName, zip) {
        await this.clear(checkoutSelectors.firstNameInput);
        await this.fill(checkoutSelectors.firstNameInput, firstName);
        await this.clear(checkoutSelectors.lastNameInput);
        await this.fill(checkoutSelectors.lastNameInput, lastName);
        await this.clear(checkoutSelectors.postalCodeInput);
        await this.fill(checkoutSelectors.postalCodeInput, zip);
    }

    async clickContinue() {
        await this.click(checkoutSelectors.continueBtn);
    }
}
