const fs = require('fs');
const path = require('path');

const FORBIDDEN_TERM = 'AutoPlanea';
const ALLOWED_FILES = ['brand-check.js', 'migration-logs']; // Exceptions

function scanDirectory(dir) {
    let hasError = false;
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            if (file === 'node_modules' || file === '.git' || file === '.next') continue;
            if (scanDirectory(fullPath)) hasError = true;
        } else {
            if (ALLOWED_FILES.some(allowed => fullPath.includes(allowed))) continue;

            try {
                const content = fs.readFileSync(fullPath, 'utf-8');
                // Case insensitive check
                if (content.toLowerCase().includes(FORBIDDEN_TERM.toLowerCase())) {
                    console.error(`🚨 BRAND VIOLATION DETECTED: ${fullPath}`);
                    console.error(`   Contains forbidden term: "${FORBIDDEN_TERM}"`);
                    hasError = true;
                }
            } catch (error) {
                // Ignore binary files error
            }
        }
    }
    return hasError;
}

console.log('🛡️  AULAPLAN BRAND GUARDIAN PROTOCOL INITIATED...');
const rootDir = path.resolve(__dirname, '..'); // Assuming scripts/ folder
const foundViolations = scanDirectory(path.join(rootDir, 'src'));

if (foundViolations) {
    console.error('❌ BRAND INTEGRITY CHECK FAILED. BUILD ABORTED.');
    process.exit(1);
} else {
    console.log('✅ BRAND INTEGRITY VERIFIED. SYSTEM IS CLEAN.');
    process.exit(0);
}
