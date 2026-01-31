import os
import argparse
from langchain_community.document_loaders import PyPDFLoader, DirectoryLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_postgres import PGVector
from langchain_postgres.vectorstores import PGVector
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

# Configuración
DOCS_DIR = "public/mep-docs/MEP_ORDENADO"
# Using standard PGVector connection string format
DATABASE_URL = os.getenv("DATABASE_URL")

def ingest_docs(source_dir):
    if not DATABASE_URL:
        print("❌ Error: DATABASE_URL no está definida en .env")
        return

    print(f"🚀 Iniciando Ingesta Masiva a Neon (PGVector)...")
    print(f"📂 Directorio: {source_dir}")

    # 1. Cargar Documentos PDF
    loader = DirectoryLoader(source_dir, glob="**/*.pdf", loader_cls=PyPDFLoader, show_progress=True)
    raw_documents = loader.load()
    print(f"📄 Documentos cargados: {len(raw_documents)}")

    # 2. Splitter (Chunking Estratégico para RAG)
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200,
        separators=["\n\n", "\n", " ", ""]
    )
    documents = text_splitter.split_documents(raw_documents)
    print(f"🧩 Chunks generados: {len(documents)}")

    # 3. Embeddings & Vector Store (Neon PGVector)
    print("🧠 Generando Embeddings (OpenAI) e inyectando a Neon...")
    
    embeddings = OpenAIEmbeddings(model="text-embedding-3-small")
    
    # Connection string for psycopg/pgvector
    # Note: langchain-postgres uses a slightly different init logic than community
    
    vector_store = PGVector(
        embeddings=embeddings,
        collection_name="mep_curriculum_vectors",
        connection=DATABASE_URL,
        use_jsonb=True,
    )

    # Add documents in batches to avoid timeouts
    batch_size = 100
    for i in range(0, len(documents), batch_size):
        batch = documents[i:i+batch_size]
        vector_store.add_documents(batch)
        print(f"   ✅ Batch {i//batch_size + 1} insertado ({len(batch)} chunks)")

    print("🎉 Ingesta Completada exitosamente en la Nube.")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Antigravity Ingestion Engine (Neon Edition)")
    parser.add_argument("source", type=str, nargs="?", default=DOCS_DIR, help="Carpeta fuente de PDFs")
    args = parser.parse_args()

    ingest_docs(args.source)
