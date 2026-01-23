
import os
import sys
import argparse
import json
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.embeddings import OpenAIEmbeddings
from langchain_community.vectorstores import Chroma
import time
from dotenv import load_dotenv

load_dotenv() # Load env vars from .env

# Configuration
BASE_DIR = os.getcwd() # Assumption: Running from project root
DOCS_ROOT = os.path.join(BASE_DIR, 'public', 'mep-docs', 'MEP_ORDENADO')
CATALOG_FILE = os.path.join(BASE_DIR, 'public', 'mep-docs', 'catalogo_mep.json')
DB_PATH = os.path.join(BASE_DIR, 'data', 'chroma_db')
# We now use OpenAI Embeddings instead of local SentenceTransformers for better accuracy
EMBEDDING_MODEL = "text-embedding-3-small"

def load_catalog():
    if not os.path.exists(CATALOG_FILE):
        print(f"Critical Error: Catalog master file not found at {CATALOG_FILE}")
        return None
    with open(CATALOG_FILE, 'r', encoding='utf-8-sig') as f:
        return json.load(f)

def get_file_path_from_catalog(modalidad, nivel, programa_key):
    """
    Reconstructs the strict file path based on the JSON selection.
    """
    return os.path.join(DOCS_ROOT, modality_folder_name(modalidad), str(nivel), programa_key) # Simplification, needs logic

# Helper to map generic names to folder names in catalog
def modality_folder_name(mod_name):
    # This logic depends on the specific keys in your JSON (ACADEMICO, TECNICO_CTP, etc.)
    # We will iterate the catalog to find matches instead of guessing.
    return mod_name

def index_all_files():
    """
    Indexes ALL PDF files found in the MEP_ORDENADO directory.
    Explores the filesystem recursively to ensure 100% mastery.
    """
    print("Starting Full Filesystem Scan of MEP_ORDENADO...")
    
    files_to_index = []
    
    # Walk the directory tree
    for root, dirs, files in os.walk(DOCS_ROOT):
        for file in files:
            if file.lower().endswith(".pdf"):
                full_path = os.path.join(root, file)
                
                # Infer metadata from path
                # Path structure: DOCS_ROOT / Modality / Level / ... / file.pdf
                rel_path = os.path.relpath(full_path, DOCS_ROOT)
                path_parts = rel_path.split(os.sep)
                
                modality = path_parts[0] if len(path_parts) > 0 else "UNKNOWN"
                level = path_parts[1] if len(path_parts) > 1 else "GENERAL"
                
                # Check for cached hash or similar? (Skipping for now, strict overwrite)
                
                files_to_index.append({
                    "path": full_path,
                    "metadata": {
                        "modalidad": modality,
                        "nivel": level,
                        "filename": file,
                        "source": full_path
                    }
                })

    print(f"Authorized Documents Found on Disk: {len(files_to_index)}")
    
    documents = []
    for entry in files_to_index:
        try:
            print(f"   Processing: {entry['metadata']['modalidad']} / {entry['metadata']['filename']}")
            loader = PyPDFLoader(entry['path'])
            docs = loader.load()
            
            # Enrich metadata
            for doc in docs:
                doc.metadata.update(entry['metadata'])
                
            documents.extend(docs)
        except Exception as e:
            print(f"Error processing {entry['path']}: {e}")

    if not documents:
        print("No documents found to index.")
        return

    # Text Splitting
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    splits = text_splitter.split_documents(documents)
    
    # Store
    # Store
    print(f"Embedding {len(splits)} official fragments...")
    embedding_function = SentenceTransformerEmbeddings(model_name=EMBEDDING_MODEL)
    Chroma.from_documents(documents=splits, embedding=embedding_function, persist_directory=DB_PATH)
    print("Strict Indexing Complete.")

def query_knowledge_base(query_text, modality=None, level=None, subject_keyword=None, n_results=4):
    """
    Queries ChromaDB with optional strict filtering logic.
    """
    if not os.path.exists(DB_PATH):
        print("DB not found. Run --mode index first.")
        return

    # Using Local Embeddings - No API Key needed for this part
    embedding_function = SentenceTransformerEmbeddings(model_name=EMBEDDING_MODEL)
    db = Chroma(persist_directory=DB_PATH, embedding_function=embedding_function)
    
    # Build Metadata Filter
    filter_dict = {}
    if modality: filter_dict["modalidad"] = modality
    if level: filter_dict["nivel"] = str(level)
    # Note: 'subject' is harder to filter strictly unless we have exact program ID.
    # We can rely on vector semantic search to pick the right subject if the query is specific.
    
    print(f"Query: '{query_text}' | Filter: {filter_dict}")
    
    if len(filter_dict) > 0:
        results = db.similarity_search(query_text, k=n_results, filter=filter_dict)
    else:
        results = db.similarity_search(query_text, k=n_results)
        
    for i, doc in enumerate(results):
        print(f"\n--- Result {i+1} ---")
        print(f"Official Source: {doc.metadata.get('filename')} ({doc.metadata.get('modalidad')})")
        print(f"Content: {doc.page_content[:300]}...")

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--mode", choices=["index", "query"], required=True)
    parser.add_argument("--query", type=str)
    parser.add_argument("--modalidad", type=str)
    parser.add_argument("--nivel", type=str)
    
    args = parser.parse_args()
    
    if args.mode == "index":
        index_all_files()
    elif args.mode == "query":
        if not args.query:
            print("Error: --query is required")
        else:
            query_knowledge_base(args.query, args.modalidad, args.nivel)
