// module.exports = {
//     usernameInput: '#user-name',
//     passwordInput: '#password',
//     loginButton: '#login-button',
//   };

export const generalComponentSelectors = {
  titleLabel: '[data-test="title"]',
}

export const loginSelectors = {
  usernameInput: '#user-name',
  passwordInput: '#password',
  loginBtn: '//input[@value="Login"]',
};

export const inventorySelectors = {
  addToCartBtn: (productName) => `//div[normalize-space()='${productName}']/ancestor::div[@class='inventory_item_description']//button[normalize-space()='Add to cart']`,
  removeBtn: (productName) => `//div[normalize-space()='${productName}']/ancestor::div[@class='inventory_item_description']//button[normalize-space()='Remove']`,
  cartIcon: '.shopping_cart_link',
  productSortSelect: '[data-test="product-sort-container"]',
};

export const cartSelectors = {
  removeBtn: (productName) => `//a[div[normalize-space()='${productName}']]//following-sibling::div[@class='item_pricebar']//button[normalize-space()='Remove']`,
  checkoutBtn: 'button#checkout',
  continueShoppingBtn: 'button#continue-shopping',
};

export const checkoutSelectors = {
  firstNameInput: 'input#first-name',
  lastNameInput: 'input#last-name',
  postalCodeInput: 'input#postal-code',
  continueBtn: 'input#continue',
  cancelBtn: 'button#cancel'
};

export const overviewSelectors = {
  informationValueLabel: (label) => `//div[normalize-space()='${label}:']//following::div[1]`,
  itemTotalValueLabel: '[data-test="subtotal-label"]',
  taxValueLabel: '[data-test="tax-label"]',
  totalValueLabel: '[data-test="total-label"]',
  finishBtn: 'button#finish',
  cancelBtn: 'button#cancel',
};

export const completeSelectors = {
  completeHeaderLabel: '[data-test="complete-header"]',
  completeTextLabel: '[data-test="complete-text"]',
  backHomeBtn: 'button#back-to-products',
};