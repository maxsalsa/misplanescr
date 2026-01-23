
import os
import sqlite3
import json

def find_db_paths():
    base_dir = os.getcwd()
    candidates = [
        os.path.join(base_dir, "cerebro_mep"),
        os.path.join(base_dir, "storage", "memoria_mep"),
        os.path.join(base_dir, "public", "mep-docs", "cerebro_mep")
    ]
    found = []
    for c in candidates:
        if os.path.exists(c):
            # Check for sqlite file inside
            for root, dirs, files in os.walk(c):
                if "chroma.sqlite3" in files:
                    found.append(os.path.join(root, "chroma.sqlite3"))
    return found

def extract_vectors(db_file):
    print(f"🔍 Reading Brain: {db_file}")
    conn = sqlite3.connect(db_file)
    cursor = conn.cursor()
    
    data = []
    
    # Chroma Schema Analysis
    try:
        # Check for 'embeddings' table (Old Chroma) or 'segments' (New Chroma)
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
        tables = [r[0] for r in cursor.fetchall()]
        print(f"   Tables found: {tables}")

        if 'embeddings' in tables:
            # V3 Structure
            # Columns: id, embedding, document, metadata
            cursor.execute("SELECT document, metadata FROM embeddings")
            rows = cursor.fetchall()
            for doc, meta in rows:
                meta_obj = json.loads(meta) if meta else {}
                data.append({"text": doc, "metadata": meta_obj, "source": "chroma_v3"})
        
        elif 'embedding_fulltext_search_content' in tables or 'embedding_metadata' in tables:
             # V4 Structure (Often has 'embedding_metadata' with string_value for ids, but text might be in another table or not stored if not configured? actually usually 'embeddings' table still exists or 'segments')
             # Actually V4 usually keeps 'embeddings' table or 'collection_embeddings'.
             # Let's try to find any table with 'document' column.
             pass
             # Fallback: Just grab whatever text we find in any table that looks like content
    except Exception as e:
        print(f"⚠️ Error reading {db_file}: {e}")
    finally:
        conn.close()
    
    return data

def main():
    print("🧠 STARTING BRAIN EXPORT (PYTHON BRIDGE)...")
    dbs = find_db_paths()
    all_knowledge = []
    
    if not dbs:
        print("❌ No ChromaDB found. Checking for Raw Text fallback...")
        # Fallback: Maybe specific file?
    
    for db in dbs:
        k = extract_vectors(db)
        all_knowledge.extend(k)
        
    print(f"✅ Recovered {len(all_knowledge)} fragments from Vector Store.")
    
    output = "brain_dump.json"
    with open(output, "w", encoding="utf-8") as f:
        json.dump(all_knowledge, f, indent=2)
    
    print(f"💾 Dump saved to {output}")

if __name__ == "__main__":
    main()
