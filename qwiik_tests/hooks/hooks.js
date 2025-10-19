import { Before, After, AfterStep } from '@cucumber/cucumber';
import { chromium } from 'playwright';
import { BasePage } from '../pages/basePage.js';
import { LoginPage } from '../pages/loginPage.js';
import { InventoryPage } from '../pages/inventoryPage.js';
import { CartPage } from '../pages/cartPage.js';
import { CheckoutPage } from '../pages/checkoutPage.js';
import { OverviewPage } from '../pages/overviewPage.js';
import { CompletePage } from '../pages/completePage.js';
import path from 'path';
import fs from 'fs';

let browser, context, page;

/**
 * ✅ Launch browser only for @ui scenarios
 */
Before({ tags: '@ui' }, async function () {
  browser = await chromium.launch({ headless: false });
  context = await browser.newContext({ recordVideo: { dir: path.join('reports', 'videos') } });
  page = await context.newPage();

  this.page = page;
  this.basePage = new BasePage(page);
  this.loginPage = new LoginPage(page);
  this.inventoryPage = new InventoryPage(page);
  this.cartPage = new CartPage(page);
  this.checkoutPage = new CheckoutPage(page);
  this.overviewPage = new OverviewPage(page);
  this.completePage = new CompletePage(page);
});

/**
 * ✅ Capture screenshot after each step only for @ui
 */
AfterStep({ tags: '@ui' }, async function () {
  const screenshot = await this.page.screenshot();
  const screenshotName = `screenshot-${Date.now()}.png`;
  const screenshotPath = path.join('reports', screenshotName);
  fs.writeFileSync(screenshotPath, screenshot);

  if (this.attach) {
    await this.attach(screenshot, 'image/png');
  }
});

/**
 * ✅ Close browser & attach video only for @ui
 */
After({ tags: '@ui' }, async function () {
  try {
    if (context) await context.close();
    if (browser) await browser.close();

    if (this.page?.video) {
      const videoPath = await this.page.video()?.path();
      if (videoPath && fs.existsSync(videoPath) && this.attach) {
        const videoBuffer = fs.readFileSync(videoPath);
        await this.attach(videoBuffer, 'video/webm');
      }
    }
  } catch (err) {
    console.warn('Error attaching video:', err.message);
  }
});