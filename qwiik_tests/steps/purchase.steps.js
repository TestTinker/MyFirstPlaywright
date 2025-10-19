import { Given, When, Then } from '@cucumber/cucumber';
import { generalComponentSelectors } from '../data/objectRepository.js';
import { expect } from 'playwright/test';

When('I navigate to {string}', { timeout: 30000 }, async function (url) {
    await this.basePage.navigateTo(url);
});

Given('I enter username {string}', async function (username) {
    await this.loginPage.enterUsername(username);
});

Given('I enter password {string}', async function (password) {
    await this.loginPage.enterPassword(password);
});

Given('I click on {string}', async function (button) {
    switch (button) {
        case 'Login': await this.loginPage.clickLogin();
            break;
        case 'Shopping Cart': await this.inventoryPage.openCart();
            break;
        case 'Checkout': await this.cartPage.clickCheckout();
            break;
        case 'Continue': await this.checkoutPage.clickContinue();
            break;
        case 'Finish': await this.overviewPage.clickFinish();
        default:
            break;
    }
});

//
// Inventory products
//
Then('I should verify that the URL contains {string}', async function (expectedUrl) {
    await this.basePage.verifyUrl(expectedUrl);
});

Then('I should see Shopping Cart icon', async function () {
    await this.inventoryPage.verifyCartIconVisible();
});

When('I sort products by {string}', async function (optionText) {
    await this.inventoryPage.sortProductsBy(optionText);
});

When('I add the following products to the cart', async function (dataTable) {
    const products = dataTable.hashes();
    for (const { 'Product Names': productName } of products) {
        await this.inventoryPage.addToCart(productName);
    }
});

Then('I should see the page title {string}', async function (expectedTitle) {
    const actualTitle = await this.basePage.getText(generalComponentSelectors.titleLabel);
    expect(actualTitle).toEqual(expectedTitle);
});

//
// Cart
//
Then('I should see all products added to the cart with the details below', async function (dataTable) {
    const expectedProducts = dataTable.hashes();

    for (const expected of expectedProducts) {
        const expectedProduct = expected['Product Names'].trim();
        const expectedQuantity = expected['Quantity'].trim();
        const expectedPrice = expected['Product Price'].trim();

        await this.cartPage.verifyProductInCart(expectedProduct, expectedQuantity, expectedPrice);
    }
});

//
// Checkout
//
Then('I enter the following information', async function (dataTable) {
    const info = dataTable.hashes()[0];

    const firstName = info['First Name'];
    const lastName = info['Last Name'];
    const zip = info['Zip'];
    await this.checkoutPage.enterCustomerInfo(firstName, lastName, zip);
});

//
// OverviewPage
//
Then('I should see {string} is successfully generated', async function (label) {
    await this.overviewPage.verifyInformationNotEmpty(label);
});

Then('the price total should match the following details', async function (dataTable) {
    const data = dataTable.hashes()[0];

    const expectedItemTotal = data['Item total'];
    const expectedTax = data['Tax'];
    const expectedTotal = data['Total'];

    await this.overviewPage.verifyPriceDetails(expectedItemTotal, expectedTax, expectedTotal);
});

//
// Complete
//
Then('I should see the header message {string}', async function (expectedMessage) {
    await this.completePage.verifyHeaderMessage(expectedMessage);
});

Then('I should see the text message {string}', async function (expectedMessage) {
    await this.completePage.verifyTextMessage(expectedMessage);
});

Then('I should see the button Back Home', async function () {
    await this.completePage.verifyBackHomeButtonVisible();
});
