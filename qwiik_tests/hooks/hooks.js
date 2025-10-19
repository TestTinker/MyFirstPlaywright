// import { Before, After, AfterStep } from '@cucumber/cucumber';
// import { chromium, firefox, webkit } from 'playwright';
// import { BasePage } from '../pages/basePage.js';
// import { LoginPage } from '../pages/loginPage.js';
// import { InventoryPage } from '../pages/inventoryPage.js';
// import { CartPage } from '../pages/cartPage.js';
// import { CheckoutPage } from '../pages/checkoutPage.js';
// import { OverviewPage } from '../pages/overviewPage.js';
// import { CompletePage } from '../pages/completePage.js';
// import path from 'path';
// import fs from 'fs';

// let browser, context, page;

// /**
//  * ✅ Launch browser for @ui scenarios with multiple browser types
//  */
// Before({ tags: '@ui', timeout: 30_000 }, async function () {
//   // Choose browser type from scenario context or default to chromium
//   const browserType = this.parameters?.browser || 'chromium';
//   switch (browserType.toLowerCase()) {
//     case 'firefox':
//       browser = await firefox.launch({ headless: false });
//       break;
//     case 'webkit':
//       browser = await webkit.launch({ headless: false });
//       break;
//     case 'chromium':
//     default:
//       browser = await chromium.launch({ headless: false });
//       break;
//   }

//   context = await browser.newContext({
//     recordVideo: { dir: path.join('reports', 'videos') },
//   });

//   page = await context.newPage();

//   // Assign pages to world
//   this.page = page;
//   this.basePage = new BasePage(page);
//   this.loginPage = new LoginPage(page);
//   this.inventoryPage = new InventoryPage(page);
//   this.cartPage = new CartPage(page);
//   this.checkoutPage = new CheckoutPage(page);
//   this.overviewPage = new OverviewPage(page);
//   this.completePage = new CompletePage(page);
// });

// /**
//  * ✅ Capture screenshot after each step for @ui
//  */
// AfterStep({ tags: '@ui', timeout: 30_000 }, async function () {
//   if (!this.page) return;

//   const screenshot = await this.page.screenshot();
//   const screenshotName = `screenshot-${Date.now()}.png`;
//   const screenshotPath = path.join('reports', screenshotName);
//   fs.writeFileSync(screenshotPath, screenshot);

//   if (this.attach) {
//     await this.attach(screenshot, 'image/png');
//   }
// });

// /**
//  * ✅ Close browser & attach video only for @ui
//  */
// After({ tags: '@ui', timeout: 30_000 }, async function () {
//   try {
//     if (context) await context.close();
//     if (browser) await browser.close();

//     // Attach video if available
//     if (page?.video) {
//       const videoPath = await page.video()?.path();
//       if (videoPath && fs.existsSync(videoPath) && this.attach) {
//         const videoBuffer = fs.readFileSync(videoPath);
//         await this.attach(videoBuffer, 'video/webm');
//       }
//     }
//   } catch (err) {
//     console.warn('Error attaching video:', err.message);
//   }
// });

import { Before, After, AfterStep } from '@cucumber/cucumber';
import { chromium, firefox, webkit } from 'playwright';
import { BasePage } from '../pages/basePage.js';
import { LoginPage } from '../pages/loginPage.js';
import { InventoryPage } from '../pages/inventoryPage.js';
import { CartPage } from '../pages/cartPage.js';
import { CheckoutPage } from '../pages/checkoutPage.js';
import { OverviewPage } from '../pages/overviewPage.js';
import { CompletePage } from '../pages/completePage.js';
import path from 'path';
import fs from 'fs';

// Each scenario gets its own browser instance (parallel safe)
Before({ tags: '@ui', timeout: 60_000 }, async function ({ pickle }) {
  // Get browser type from world parameters or default to chromium
  const browserType = this.parameters?.browser || 'chromium';
  const videoDir = path.join('reports', 'videos', browserType, `${Date.now()}`);

  // Launch the correct browser
  let browserInstance;
  switch (browserType.toLowerCase()) {
    case 'firefox':
      browserInstance = await firefox.launch({ headless: false });
      break;
    case 'webkit':
      browserInstance = await webkit.launch({ headless: false });
      break;
    case 'chromium':
    default:
      browserInstance = await chromium.launch({ headless: false });
      break;
  }

  // Create new context per scenario
  const context = await browserInstance.newContext({
    recordVideo: { dir: videoDir },
  });
  const page = await context.newPage();

  // Store objects in world (this) for steps
  this.browser = browserInstance;
  this.context = context;
  this.page = page;
  this.basePage = new BasePage(page);
  this.loginPage = new LoginPage(page);
  this.inventoryPage = new InventoryPage(page);
  this.cartPage = new CartPage(page);
  this.checkoutPage = new CheckoutPage(page);
  this.overviewPage = new OverviewPage(page);
  this.completePage = new CompletePage(page);

  // Optional: store folder paths for screenshots/videos
  this._videoDir = videoDir;

  // Add metadata for reporter
  this.metadata = {
    browser: { name: browserType },
    platform: { name: process.platform }
  };
});

// Capture screenshot after each step
AfterStep({ tags: '@ui', timeout: 30_000 }, async function ({ pickle, result }) {
  if (!this.page) return;

  const screenshot = await this.page.screenshot({ encoding: 'base64' });
  const screenshotDir = path.join('reports', 'screenshots', this.parameters?.browser || 'chromium');
  if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });
  const screenshotName = `screenshot-${Date.now()}.png`;
  const screenshotPath = path.join(screenshotDir, screenshotName);
  fs.writeFileSync(screenshotPath, screenshot);

  if (this.attach) {
    await this.attach(screenshot, 'image/png');
  }
});

// Close browser & attach video
After({ tags: '@ui', timeout: 60_000 }, async function () {
  try {
    if (this.context) await this.context.close();
    if (this.browser) await this.browser.close();

    // Attach video(s)
    const videoFolder = this._videoDir;
    if (videoFolder && fs.existsSync(videoFolder) && this.attach) {
      const files = fs.readdirSync(videoFolder);
      for (const file of files) {
        const videoPath = path.join(videoFolder, file);
        const videoBuffer = fs.readFileSync(videoPath);
        await this.attach(videoBuffer, 'video/webm');
      }
    }
  } catch (err) {
    console.warn('Error closing browser or attaching video:', err.message);
  }
});
