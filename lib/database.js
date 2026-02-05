"use client";

// IndexedDB wrapper for AulaPlan CR
const DB_NAME = "aulaplan_cr_db";
const DB_VERSION = 2;

const STORES = {
  users: "users",
  curriculum: "curriculum",
  subjects: "subjects",
  units: "units",
  learningResults: "learningResults",
  activities: "activities",
  groups: "groups",
  students: "students",
  attendance: "attendance",
  instruments: "instruments",
  planeamientos: "planeamientos",
  config: "config",
};

export function initDB() {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      resolve(null);
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      Object.values(STORES).forEach((storeName) => {
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName, { keyPath: "id" });
        }
      });
    };
  });
}

export async function dbAdd(storeName, data) {
  const db = await initDB();
  if (!db) return null;
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    const id =
      data.id || `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const request = store.add({
      ...data,
      id,
      createdAt: new Date().toISOString(),
    });
    request.onsuccess = () => resolve(id);
    request.onerror = () => reject(request.error);
  });
}

export async function dbGet(storeName, id) {
  const db = await initDB();
  if (!db) return null;
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readonly");
    const store = tx.objectStore(storeName);
    const request = store.get(id);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function dbGetAll(storeName) {
  const db = await initDB();
  if (!db) return [];
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readonly");
    const store = tx.objectStore(storeName);
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => reject(request.error);
  });
}

export async function dbUpdate(storeName, data) {
  const db = await initDB();
  if (!db) return null;
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    const request = store.put({ ...data, updatedAt: new Date().toISOString() });
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function dbDelete(storeName, id) {
  const db = await initDB();
  if (!db) return null;
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    const request = store.delete(id);
    request.onsuccess = () => resolve(true);
    request.onerror = () => reject(request.error);
  });
}

export async function dbClear(storeName) {
  const db = await initDB();
  if (!db) return null;
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    const request = store.clear();
    request.onsuccess = () => resolve(true);
    request.onerror = () => reject(request.error);
  });
}

// LocalStorage helpers
export function lsGet(key, defaultValue = null) {
  if (typeof window === "undefined") return defaultValue;
  try {
    const stored = localStorage.getItem(`aulaplan_${key}`);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch {
    return defaultValue;
  }
}

export function lsSet(key, value) {
  if (typeof window === "undefined") return;
  localStorage.setItem(`aulaplan_${key}`, JSON.stringify(value));
}

export const lsSave = lsSet;

export function lsRemove(key) {
  if (typeof window === "undefined") return;
  localStorage.removeItem(`aulaplan_${key}`);
}

export { STORES };
