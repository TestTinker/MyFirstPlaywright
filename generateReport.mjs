import fs from "fs";
import path from "path";
import open from "open";
import { generate } from "multiple-cucumber-html-reporter";

const reportDir = path.join("reports", "json");
const outputDir = path.join("reports", "html");

// ✅ Ensure folder exists
if (!fs.existsSync(reportDir)) {
  console.error(`❌ JSON report folder not found: ${reportDir}`);
  process.exit(1);
}

const jsonFiles = fs.readdirSync(reportDir).filter(f => f.endsWith(".json"));
if (jsonFiles.length === 0) {
  console.error(`❌ No JSON files found in ${reportDir}`);
  process.exit(1);
}

const needMerge = jsonFiles.length > 1;
let jsonToUseDir = reportDir;

if (needMerge) {
  console.log(`🔹 Multiple JSON files detected. Merging scenarios by feature per browser...`);

  const mergedFeatures = [];
  const seenScenarioKeys = new Set();

  for (const file of jsonFiles) {
    const browserName = file.replace(".json", ""); // e.g., chromium.json -> chromium
    const data = JSON.parse(fs.readFileSync(path.join(reportDir, file), "utf8"));

    for (const feature of data) {
      // Add browser info to feature name to prevent duplicates
      const featureNameWithBrowser = `${feature.name} [${browserName}]`;

      // Filter duplicate scenarios globally
      const uniqueElements = feature.elements?.filter(s => {
        const key = `${featureNameWithBrowser}::${s.name}`.trim().toLowerCase();
        if (seenScenarioKeys.has(key)) return false;
        seenScenarioKeys.add(key);
        return true;
      }) || [];

      if (uniqueElements.length > 0) {
        mergedFeatures.push({
          ...feature,
          name: featureNameWithBrowser,
          uri: `${browserName}-${feature.uri || "feature"}`,
          elements: uniqueElements,
        });
      }
    }
  }

  // ✅ Save merged JSON to temp folder
  const tempDir = path.join(reportDir, "merged_only");
  fs.mkdirSync(tempDir, { recursive: true });
  fs.writeFileSync(path.join(tempDir, "merged.json"), JSON.stringify(mergedFeatures, null, 2));

  jsonToUseDir = tempDir;
} else {
  console.log(`🔹 Single JSON file detected. No merge needed.`);
}

// ✅ Generate HTML report
generate({
  jsonDir: jsonToUseDir,
  reportPath: outputDir,
  reportName: "Playwright UI Report",
  metadata: {
    platform: { name: process.platform },
  },
  customData: {
    title: "Execution Summary",
    data: [
      { label: "Project", value: "Playwright BDD Framework" },
      { label: "Generated on", value: new Date().toLocaleString() },
    ],
  },
});

console.log(`✅ Report generated successfully at: ${outputDir}/index.html`);
await open(path.join(outputDir, "index.html"));
