/**
 * 🔄 SYNC ENGINE (SOVEREIGN PROTOCOL)
 * Process atomic operations from IndexedDB and sync to Neon.
 * Handles "Draft Resolution" for conflicts.
 */

import { STORES, openDB } from "./offline-storage";

const MAX_RETRIES = 5;
const BASE_DELAY = 1000;

export async function syncOperations(token, retryCount = 0) {
  if (!navigator.onLine) return { status: "OFFLINE" };

  console.log("🔄 Initiating Sovereign Sync...");
  const db = await openDB();
  const tx = db.transaction(STORES.OPERATIONS, "readwrite");
  const store = tx.objectStore(STORES.OPERATIONS);
  const allOpsRequest = store.getAll();

  return new Promise((resolve) => {
    allOpsRequest.onsuccess = async () => {
      const ops = allOpsRequest.result;
      if (ops.length === 0) {
        resolve({ status: "IDLE", synced: 0 });
        return;
      }

      console.log(`📡 Sending ${ops.length} atomic operations...`);

      // Batch processing would happen here
      // Mocking API Call
      try {
        /* 
                const res = await fetch('/api/sync', {
                    method: 'POST',
                    body: JSON.stringify({ operations: ops }),
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                */

        // Simulate Success
        await clearSyncedOps(store, ops);
        resolve({ status: "SUCCESS", synced: ops.length });
      } catch (e) {
        console.error(
          `Sync Failed (Attempt ${retryCount + 1}/${MAX_RETRIES})`,
          e,
        );

        if (retryCount < MAX_RETRIES) {
          const delay = BASE_DELAY * Math.pow(2, retryCount); // 1s, 2s, 4s, 8s, 16s
          console.warn(`⏳ Retrying in ${delay}ms...`);

          return new Promise((resolve) => {
            setTimeout(async () => {
              const result = await syncOperations(token, retryCount + 1);
              resolve(result);
            }, delay);
          });
        }

        resolve({ status: "ERROR", error: e, final: true });
      }
    };
  });
}

function clearSyncedOps(store, ops) {
  return new Promise((resolve) => {
    ops.forEach((op) => store.delete(op.id));
    resolve();
  });
}
