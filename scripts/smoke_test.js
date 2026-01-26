const http = require('http');

const CONFIG = {
    hostname: 'localhost',
    port: 3000,
    timeout: 2000
};

// ANSI Colors
const RESET = "\x1b[0m";
const RED = "\x1b[31m";
const GREEN = "\x1b[32m";
const BLUE = "\x1b[34m";
const BOLD = "\x1b[1m";

function log(status, msg) {
    const icon = status === 'PASS' ? '✅' : status === 'FAIL' ? '❌' : 'ℹ️';
    const color = status === 'PASS' ? GREEN : status === 'FAIL' ? RED : BLUE;
    console.log(`${icon} ${color}${BOLD}[${status}]${RESET} ${msg}`);
}

async function checkUrl(path, expectedStatus, expectedRedirect = null) {
    return new Promise((resolve) => {
        const options = {
            hostname: CONFIG.hostname,
            port: CONFIG.port,
            path: path,
            method: 'GET',
            followRedirect: false // Important to check redirects manually
        };

        const req = http.request(options, (res) => {
            // Next.js middleware often returns 307 for redirects
            const isRedirect = res.statusCode >= 300 && res.statusCode < 400;
            const location = res.headers.location;

            if (res.statusCode === expectedStatus) {
                // Check Redirect Location if expected
                if (expectedRedirect && isRedirect) {
                    if (location && location.includes(expectedRedirect)) {
                        log('PASS', `Path '${path}': Got ${res.statusCode} -> Redirect to '${location}' matches '${expectedRedirect}'`);
                        resolve(true);
                    } else {
                        log('FAIL', `Path '${path}': Got ${res.statusCode}, but redirect '${location}' != expected '${expectedRedirect}'`);
                        resolve(false);
                    }
                } else {
                    log('PASS', `Path '${path}': Got expected status ${res.statusCode}`);
                    resolve(true);
                }
            } else if (expectedStatus === 200 && isRedirect && expectedRedirect) {
                // Sometimes we expect 200 but get 307 Redirect (e.g. root to login)
                if (location && location.includes(expectedRedirect)) {
                    log('PASS', `Path '${path}': Redirected to '${location}' (Acceptable for root protection)`);
                    resolve(true);
                } else {
                    log('FAIL', `Path '${path}': Unexpected redirect to '${location}'`);
                    resolve(false);
                }
            } else {
                log('FAIL', `Path '${path}': Expected ${expectedStatus}, got ${res.statusCode}`);
                resolve(false);
            }
        });

        req.on('error', (e) => {
            log('FAIL', `Path '${path}': Connection error - ${e.message}`);
            resolve(false);
        });

        req.end();
    });
}

async function runTests() {
    console.log(`\n${BOLD}🚀 ANTIGRAVITY QA SMOKE TEST${RESET}\n==============================`);

    // Wait slightly
    await new Promise(r => setTimeout(r, 1000));

    let passed = 0;
    let failed = 0;

    // 1. Root Protection (Expected: Redirect to /login)
    // Sometimes middleware sends 307
    if (await checkUrl('/', 307, '/login')) passed++; else failed++;

    // 2. Login Page Availability (Expected: 200)
    // Note: Next.js might 200 OK the login page
    if (await checkUrl('/login', 200)) passed++; else failed++;

    // 3. Dashboard Protection (Expected: Redirect to /login)
    if (await checkUrl('/dashboard', 307, '/login')) passed++; else failed++;

    // 4. Admin Protection (Expected: Redirect to /login)
    if (await checkUrl('/admin', 307, '/login')) passed++; else failed++;

    console.log(`\n==============================`);
    console.log(`${BOLD}SUMMARY:${RESET} ${passed} Passed, ${failed} Failed`);

    if (failed === 0) {
        console.log(`${GREEN}${BOLD}SYSTEM INTEGRITY CONFIRMED.${RESET}`);
        process.exit(0);
    } else {
        console.log(`${RED}${BOLD}SYSTEM INTEGRITY COMPROMISED.${RESET}`);
        process.exit(1);
    }
}

// Simple retry logic to wait for server
let attempts = 0;
const maxAttempts = 30; // 30 seconds wait

function waitForServer() {
    const req = http.get(`http://localhost:${CONFIG.port}`, (res) => {
        runTests();
    });

    req.on('error', () => {
        attempts++;
        if (attempts < maxAttempts) {
            if (attempts % 5 === 0) process.stdout.write('.');
            setTimeout(waitForServer, 1000);
        } else {
            console.error("\nTIMEOUT: Server did not start in time.");
            process.exit(1);
        }
    });
}

console.log("Waiting for Antigravity Server...");
waitForServer();
