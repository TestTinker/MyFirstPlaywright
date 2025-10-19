import { BasePage } from './basePage.js';
import { inventorySelectors } from '../data/objectRepository.js';

export class InventoryPage extends BasePage {
    async addToCart(productName) {
        const selector = inventorySelectors.addToCartBtn(productName);
        await this.click(selector);
    }

    async removeFromCart(productName) {
        const selector = inventorySelectors.removeBtn(productName);
        await this.click(selector);
    }

    async openCart() {
        await this.click(inventorySelectors.cartIcon);
    }

    async sortProductsBy(optionText) {
        await this.selectFromDropdown(inventorySelectors.productSortSelect, optionText);
    }

    async verifyCartIconVisible() {
        await this.elementToBeVisible(inventorySelectors.cartIcon);
    }
}
