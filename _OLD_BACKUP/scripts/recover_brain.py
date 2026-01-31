
import os
import json
import chromadb
from langchain_community.vectorstores import Chroma
# We don't need real embeddings just to get data, but Langchain checks content.
# unique_document_id might be needed.

# Direct ChromaDB Client approach to avoid LangChain embedding requirement for 'get'
def recover_via_client():
    print("🧠 STARTING BRAIN RECOVERY (NATIVE CHROMA)...")
    
    # Paths to try
    paths = [
        os.path.join(os.getcwd(), "storage", "memoria_mep"),
        os.path.join(os.getcwd(), "cerebro_mep"),
        os.path.join(os.getcwd(), "public", "mep-docs", "cerebro_mep")
    ]
    
    data_found = []

    for p in paths:
        if os.path.exists(p):
            print(f"🔍 Checking path: {p}")
            try:
                # Try new Chroma Client
                client = chromadb.PersistentClient(path=p)
                col_name = "langchain" # Default for LangChain
                
                # Check collections
                cols = client.list_collections()
                print(f"   Collections found: {[c.name for c in cols]}")
                
                for c in cols:
                    print(f"   extracting from {c.name}...")
                    # Get all
                    results = c.get() # Returns dict with 'ids', 'embeddings', 'metadatas', 'documents'
                    
                    if results['documents']:
                        count = len(results['documents'])
                        print(f"   ✅ Found {count} documents in {c.name}")
                        
                        for i in range(count):
                            item = {
                                "text": results['documents'][i],
                                "metadata": results['metadatas'][i] if results['metadatas'] else {},
                                "id": results['ids'][i]
                            }
                            data_found.append(item)
            except Exception as e:
                print(f"⚠️ Error accessing {p}: {e}")

    print(f"🏁 TOTAL RECOVERED FRAGMENTS: {len(data_found)}")
    
    if data_found:
        with open("brain_dump.json", "w", encoding="utf-8") as f:
            json.dump(data_found, f, indent=2)
        print("💾 Saved to brain_dump.json")
    else:
        print("❌ No data recovered.")

if __name__ == "__main__":
    recover_via_client()
