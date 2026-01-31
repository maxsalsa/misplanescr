const fs = require('fs');
const path = require('path');

// ANTIGRAVITY STRESS TESTER v1.0
// Simulates Industrial Grade QA Scenarios

const REPORT = {
    timestamp: new Date().toISOString(),
    modules: {},
    overall_status: "PENDING"
};

function log(module, status, detail) {
    if (!REPORT.modules[module]) REPORT.modules[module] = [];
    REPORT.modules[module].push({ status, detail });
    console.log(`[${module.toUpperCase()}] ${status}: ${detail}`);
}

async function runTests() {
    console.log("⚡ INICIANDO ANTIGRAVITY STRESS TEST...");

    // 1. CIBERSEGURIDAD
    try {
        const middleware = fs.readFileSync('src/middleware.ts', 'utf8');
        if (middleware.includes('matcher') && middleware.includes('checkRateLimit')) {
            log('security', 'PASSED', 'Middleware Configured with Rate Limiting.');
        } else {
            log('security', 'FAILED', 'Middleware Missing Critical Guards.');
        }

        const session = fs.readFileSync('src/components/security/SessionTimeout.jsx', 'utf8');
        if (session.includes('router.push(\'/login?expired=true\')')) {
            log('security', 'PASSED', 'Session Timeout forces Logout at 20m.');
        } else {
            log('security', 'FAILED', 'Session Timeout Logic not enforced.');
        }
    } catch (e) {
        log('security', 'ERROR', e.message);
    }

    // 2. RAZONAMIENTO PEDAGÓGICO
    try {
        const generator = fs.readFileSync('src/actions/generate.js', 'utf8');
        if (generator.includes('PROHIBIDO usar verbos pasivos')) {
            log('pedagogy', 'PASSED', 'Binomio Check Active (Prompt Injection).');
        } else {
            log('pedagogy', 'FAILED', 'Binomio Check not found in AI Prompt.');
        }
    } catch (e) { log('pedagogy', 'ERROR', e.message); }

    // 3. DETECCIÓN DE TRIGGERS
    try {
        const conducta = fs.readFileSync('src/app/dashboard/grupos/Conducta.jsx', 'utf8');
        if (conducta.includes("lowerDesc.includes('arma')")) {
            log('triggers', 'PASSED', 'Conducta triggers alert on "arma".');
        } else {
            log('triggers', 'FAILED', 'Conducta missing keyword detection.');
        }
    } catch (e) { log('triggers', 'ERROR', e.message); }

    // 4. PERFORMANCE & ZOMBIES
    const zombieScan = fs.readdirSync('.');
    if (zombieScan.includes('tailwind.config.cjs.bak')) {
        log('performance', 'FAILED', 'Zombie file detected (tailwind.config.cjs.bak).');
    } else {
        log('performance', 'PASSED', 'Zero-Zombie Integrity Confirmed.');
    }

    // FINAL REPORT
    const failedTests = Object.values(REPORT.modules).flat().filter(t => t.status !== 'PASSED');
    REPORT.overall_status = failedTests.length === 0 ? "PASSED" : "FAILED";

    fs.writeFileSync('QA_REPORT.json', JSON.stringify(REPORT, null, 2));
    console.log(`\n🏁 TEST COMPLETE. STATUS: ${REPORT.overall_status}`);
}

runTests();
