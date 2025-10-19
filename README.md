# Playwright Javascript with Cucumber framework

This repository contains **UI and API test automation** using **Playwright**, **Cucumber.js**, and **Node.js**.  
Tests are executed in parallel across multiple browsers, and HTML reports are generated automatically.

---

## **Project Structure**

- `qwiik_tests/features/` – Feature files for Cucumber BDD scenarios.
- `qwiik_tests/steps/` – Step definitions for UI and API scenarios.
- `qwiik_tests/pages/` – Page Object Model (POM) classes for UI automation.
- `qwiik_tests/data/` – Central object repository for UI elements.
- `qwiik_tests/hooks/` – Cucumber hooks for setup, teardown, screenshots, and videos.
- `qwiik_tests/models/` – Data models used in test automation.
- `qwiik_tests/utils/` – Utility scripts (e.g., `cleanReports.js`).
- `reports/` – Folder for JSON, screenshots, videos, and HTML reports.

---

## **Setup**

1. Install dependencies:

```bash
npm install
```

2. Make sure Playwright browsers are installed:

```bash
npx playwright install
```

---

## **Available npm Scripts**

| Script | Description |
|--------|-------------|
| `npm run clean:reports` | Cleans the `reports` folder (JSON, screenshots, videos) before running tests. |
| `npm run ui:chromium` | Run UI tests tagged `@ui` on **Chromium** in parallel (3 threads), output JSON to `reports/json/chromium.json`. |
| `npm run ui:firefox` | Run UI tests tagged `@ui` on **Firefox** in parallel (3 threads), output JSON to `reports/json/firefox.json`. |
| `npm run ui:webkit` | Run UI tests tagged `@ui` on **WebKit** in parallel (3 threads), output JSON to `reports/json/webkit.json`. |
| `npm run ui:all` | Run UI tests on **all browsers in parallel**, then generate HTML report. |
| `npm run api` | Run API tests tagged `@api` in parallel (3 threads), output JSON to `reports/json/api.json`, then generate report. |
| `npm run test:all` | Run **all UI and API tests in parallel** and generate a consolidated HTML report. |
| `npm run report` | Generate HTML report from JSON files using `generateReport.mjs`. |

---

## **Test Execution Examples**

- **Run Chromium UI tests only:**

```bash
npm run ui:chromium
```

- **Run all UI tests on all browsers and generate report:**

```bash
npm run ui:all
```

- **Run API tests only:**

```bash
npm run api
```

- **Run all UI + API tests and generate report:**

```bash
npm run test:all
```

- **Generate report manually from existing JSONs:**

```bash
npm run report
```

---

## **Reports**

- JSON files are saved under `reports/json/`.  
- Screenshots and videos (for UI tests) are saved under `reports/screenshots/` and `reports/videos/`.  
- HTML report is generated in `reports/html/index.html` and will automatically open after generation.

---

## 👋 A Note to Reviewers

Hi there! 👋

Thank you for taking the time to check out my test project. This repository showcases my **Playwright Javascript with Cucumber framework and API Testing**, along with my approach to **clean code, parallel execution, and well-structured reports**.

I hope this gives you a clear idea of how I work and how I approach automation challenges.

If you like what you see here, I’d be thrilled to **join your team and contribute to your projects**. So… hire me! 😄

Looking forward to connecting,  
**Restiyanti**

---
