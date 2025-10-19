const report = require('multiple-cucumber-html-reporter');
const fs = require('fs');
const path = require('path');

const jsonReportPath = path.join('reports', 'cucumber-report.json');

// Ensure JSON report exists
if (!fs.existsSync(jsonReportPath)) {
  console.error('Cucumber JSON report not found:', jsonReportPath);
  process.exit(1);
}

// Read JSON report
let jsonData = JSON.parse(fs.readFileSync(jsonReportPath, 'utf-8'));

// multiple-cucumber-html-reporter expects an array
if (!Array.isArray(jsonData)) jsonData = [jsonData];

// Optional: overwrite JSON with array format (prevents errors)
fs.writeFileSync(jsonReportPath, JSON.stringify(jsonData, null, 2));

report.generate({
  jsonDir: 'reports',                  // folder containing JSON report
  reportPath: 'reports/html',          // folder where HTML will be generated
  displayDuration: true,
  metadata: {
    browser: { name: 'chrome', version: 'latest' },
    device: 'Local Test Machine',
    platform: { name: process.platform, version: process.version }
  },
  customData: {
    title: 'Run Info',
    data: [
      { label: 'Project', value: 'Swag Labs Automation' },
      { label: 'Environment', value: 'QA' },
      { label: 'Executed', value: new Date().toLocaleString() }
    ]
  }
});

console.log('HTML report generated at: reports/html/index.html');