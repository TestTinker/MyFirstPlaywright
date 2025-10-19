export class PaymentInfoModel {
    #sauceCardNumber;
    #shippingInfo;
    #itemTotal;
    #tax;
    #total;

    constructor() {}

    // --- Payment info ---
    get sauceCardNumber() {
        return this.#sauceCardNumber;
    }
    set sauceCardNumber(value) {
        this.#sauceCardNumber = value?.trim().replace("SauceCard ", "") || null;        
    }

    // --- Shipping ---
    get shippingInfo() {
        return this.#shippingInfo;
    }
    set shippingInfo(value) {
        this.#shippingInfo = value?.trim() || null;
    }

    // --- Summary values ---
    get itemTotal() {
        return this.#itemTotal;
    }
    set itemTotal(value) {
        this.#itemTotal = value?.trim() || null;
    }

    get tax() {
        return this.#tax;
    }
    set tax(value) {
        this.#tax = value?.trim() || null;
    }

    get total() {
        return this.#total;
    }
    set total(value) {
        this.#total = value?.trim() || null;
    }

    // --- Utility methods ---
    printSummary() {
        console.log(`
        💳 Payment Info:
        SauceCard: ${this.sauceCardNumber || '-'}
        Shipping: ${this.#shippingInfo || '-'}
        Item Total: ${this.#itemTotal || '-'}
        Tax: ${this.#tax || '-'}
        Total: ${this.#total || '-'}
        `);
    }
}
