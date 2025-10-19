import { BasePage } from './basePage.js';
import { cartSelectors } from '../data/objectRepository.js';
import { expect } from '@playwright/test';

export class CartPage extends BasePage {
    async verifyProductInCart(expectedProduct, expectedQuantity, expectedPrice) {
        const itemLocator = this.page.locator('[data-test="inventory-item"]').filter({
            has: this.page.locator('[data-test="inventory-item-name"]', { hasText: expectedProduct })
        });

        await expect(itemLocator).toHaveCount(1);

        const actualQuantity = (await itemLocator.locator('[data-test="item-quantity"]').textContent()).trim();
        const actualPrice = (await itemLocator.locator('[data-test="inventory-item-price"]').textContent()).trim();

        expect(actualQuantity).toEqual(expectedQuantity);
        expect(actualPrice).toEqual(expectedPrice);
    }

    async clickCheckout() {
        await this.click(cartSelectors.checkoutBtn);
    }
}
