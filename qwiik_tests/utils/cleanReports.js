import fs from 'fs';
import path from 'path';

const REPORTS_FOLDER = path.join(process.cwd(), 'reports');

if (fs.existsSync(REPORTS_FOLDER)) {
  fs.rmSync(REPORTS_FOLDER, { recursive: true, force: true });
  console.log('🧹 Reports folder cleaned');
}
fs.mkdirSync(REPORTS_FOLDER, { recursive: true });
