
// 🌩️ STRESS TEST SIMULATION (Kaizen 35.0)
// Simulates concurrent requests to verify Rate Limiting and Cache.

const TARGET_URL = 'http://localhost:3000/api/curriculum/v2'; // Adjust if needed

async function attack() {
    console.log(`🌩️ INITIATING STRESS TEST [TARGET: ${TARGET_URL}]`);
    const requests = [];
    const START_TIME = Date.now();

    for (let i = 0; i < 150; i++) {
        requests.push(fetch(TARGET_URL).then(res => ({ status: res.status, time: Date.now() - START_TIME })));
    }

    const results = await Promise.all(requests);

    const accepted = results.filter(r => r.status === 200).length;
    const limited = results.filter(r => r.status === 429).length;
    const errors = results.filter(r => r.status !== 200 && r.status !== 429).length;

    console.log(`📊 RESULTS:`);
    console.log(`✅ Accepted: ${accepted}`);
    console.log(`⛔ Limited (429): ${limited}`);
    console.log(`❌ Errors: ${errors}`);

    if (limited > 0) {
        console.log('🛡️ RATE LIMITER ACTIVE: CONFIRMED.');
    } else {
        console.warn('⚠️ RATE LIMITER DID NOT TRIGGER (Check Threshold).');
    }

    if (errors === 0 && accepted > 0) {
        console.log('✅ API STABILITY: GREEN.');
    }
}

attack();
