/**
 * 🛡️ SOVEREIGN OFFLINE STORAGE (INDEXEDDB WRAPPER)
 * Provides a secure, transaction-based local database.
 * Includes "Kill Switch" for Sovereign Data Protection.
 */

const DB_NAME = 'AulaPlan_Sovereign_DB';
const DB_VERSION = 1;

export const STORES = {
    OPERATIONS: 'offline_operations', // Sync Queue
    CACHE: 'semantic_rag_cache',      // Speed Frontier
    DRAFTS: 'local_drafts'            // Resilience
};

function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            // Operational Queue
            if (!db.objectStoreNames.contains(STORES.OPERATIONS)) {
                db.createObjectStore(STORES.OPERATIONS, { keyPath: 'id' });
            }
            // Semantic Cache
            if (!db.objectStoreNames.contains(STORES.CACHE)) {
                db.createObjectStore(STORES.CACHE, { keyPath: 'hash' });
            }
            // Local Drafts
            if (!db.objectStoreNames.contains(STORES.DRAFTS)) {
                db.createObjectStore(STORES.DRAFTS, { keyPath: 'id' });
            }
        };

        request.onsuccess = (event) => resolve(event.target.result);
        request.onerror = (event) => reject(event.target.error);
    });
}

/**
 * 🚜 ADD OPERATION TO QUEUE
 * @param {string} type - 'CREATE_CONDUCT', 'UPDATE_GRADE'
 * @param {object} payload - The data
 */
export async function queueOperation(type, payload) {
    const db = await openDB();
    const tx = db.transaction(STORES.OPERATIONS, 'readwrite');
    const store = tx.objectStore(STORES.OPERATIONS);

    const operation = {
        id: crypto.randomUUID(),
        idempotencyKey: `${type}-${crypto.randomUUID()}-${Date.now()}`, // THE IRON KEY
        type,
        payload,
        createdAt: new Date().toISOString(),
        synced: false,
        retryCount: 0
    };

    return new Promise((resolve, reject) => {
        const request = store.add(operation);
        request.onsuccess = () => {
            console.log(`🔒 Operation Locked: ${operation.idempotencyKey}`);
            resolve(operation);
        };
        request.onerror = () => reject(request.error);
    });
}

/**
 * ☠️ KILL SWITCH (DATA PURGE)
 * Must be called on Logout.
 */
export async function purgeLocalData() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.deleteDatabase(DB_NAME);
        request.onsuccess = () => {
            console.log('🛡️ Sovereign Data Purged.');
            resolve(true);
        };
        request.onerror = () => reject(request.error);
    });
}

/**
 * 🔍 SEMANTIC CACHE RETRIEVAL
 */
export async function getCachedRAG(hash) {
    const db = await openDB();
    return new Promise((resolve) => {
        const tx = db.transaction(STORES.CACHE, 'readonly');
        const store = tx.objectStore(STORES.CACHE);
        const request = store.get(hash);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => resolve(null);
    });
}
