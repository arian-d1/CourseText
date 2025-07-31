import fs from 'fs';
import path from 'path';
import { parse } from "csv-parse/sync";

const codeSet = new Set();
function scanDir(dir) {
    for (const fname of fs.readdirSync(dir)) {
        const fullPath = path.join(dir, fname);
        if (fs.statSync(fullPath).isDirectory()) {
            scanDir(fullPath);
        } else if (fname.endsWith('.csv')) {
            parseCsvFile(fullPath);
        } else {
            // Do Nothing
        }
    }
}

function parseCsvFile(filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const records = parse(fileContent, {
        columns: true,
        skip_empty_lines: true
    });

    records.forEach(record => {
        // Assuming the course code is in a field named 'Course Code'
        if (record['Subject'] && record['Course']) {
            // console.log(`Found course code: ${record['Subject']}-${record['Course']} in file: ${filePath}`);
            codeSet.add(`${record['Subject']}-${record['Course']}`);
        }
    });
}

scanDir(path.join( 'scripts', '..', 'data', '2024W'));

for (const course of codeSet) {
    fs.writeFileSync(
        path.join('scripts', '..', 'data', 'courseCodes.txt'),
        course + '\n',
        { flag: 'a' }
    );
}