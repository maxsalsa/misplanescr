import {
  searchKnowledgeBase,
  rebuildKnowledgeBase,
} from "@/services/rag-bridge";

/**
 * Knowledge Base Service - Standard Adapter
 */
export async function scanAndIndexDocs() {
  return await rebuildKnowledgeBase();
}

export async function getIndexedDocs() {
  // Placeholder to list processed docs
  return [];
}

export async function searchMEP(query, filters = {}) {
  return await searchKnowledgeBase(query, filters.modalidad, filters.nivel);
}
