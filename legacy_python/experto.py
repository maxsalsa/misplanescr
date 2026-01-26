# -*- coding: utf-8 -*-
"""
ANTIGRAVITY CORE: MEMORIA LARGO PLAZO (RAG INGESTION)
Procesa los 170 programas MEP y construye el storage vectorial
"""
import os
import hashlib
import warnings
warnings.filterwarnings("ignore")

from dotenv import load_dotenv
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_google_genai import GoogleGenerativeAIEmbeddings

# Cargar variables de entorno
load_dotenv()

# Rutas
PATH_PDFS = os.path.join(os.getcwd(), "public", "mep-docs", "MEP_ORDENADO")
PATH_STORAGE = os.path.join(os.getcwd(), "storage", "memoria_mep")

def obtener_motor_embeddings():
    """Wrapper para embeddings con failover"""
    from langchain_openai import OpenAIEmbeddings
    from langchain_google_genai import GoogleGenerativeAIEmbeddings
    
    OPENAI_KEY = os.getenv("OPENAI_API_KEY", "")
    GEMINI_KEY = os.getenv("GOOGLE_API_KEY", "")
    
    try:
        if "sk-" in OPENAI_KEY:
            return OpenAIEmbeddings(model="text-embedding-3-small")
    except:
        pass
    return GoogleGenerativeAIEmbeddings(model="models/embedding-001", google_api_key=GEMINI_KEY)

def calcular_hash(archivo):
    hasher = hashlib.md5()
    with open(archivo, 'rb') as f:
        hasher.update(f.read())
    return hasher.hexdigest()

def ejecutar_ingesta_completa():
    print("🚀 ANTIGRAVITY INGESTA: Iniciando...")
    
    from langchain_community.vectorstores import Chroma
    
    if not os.path.exists(PATH_STORAGE):
        os.makedirs(PATH_STORAGE)
    
    motor_embeddings = obtener_motor_embeddings()
    vectorstore = Chroma(persist_directory=PATH_STORAGE, embedding_function=motor_embeddings)
    
    # Checkpoint: archivos ya procesados
    metadatos_existentes = vectorstore.get()
    hashes_en_memoria = set(
        metadatos_existentes['metadatas'][i].get('file_hash', '') 
        for i in range(len(metadatos_existentes.get('metadatas', [])))
    )
    
    documentos_nuevos = []
    total_pdfs = 0
    
    for raiz, _, archivos in os.walk(PATH_PDFS):
        for f in archivos:
            if f.lower().endswith(".pdf") and "(" not in f:  # Evitar duplicados
                ruta = os.path.join(raiz, f)
                f_hash = calcular_hash(ruta)
                
                if f_hash in hashes_en_memoria:
                    continue
                
                total_pdfs += 1
                try:
                    loader = PyPDFLoader(ruta)
                    docs = loader.load()
                    for d in docs:
                        d.metadata['file_hash'] = f_hash
                        d.metadata['programa'] = f.replace('.pdf', '')
                    documentos_nuevos.extend(docs)
                    print(f"✓ {f}")
                except Exception as e:
                    print(f"✗ {f}: {e}")

    if not documentos_nuevos:
        print("✅ Storage actualizado. No hay PDFs nuevos.")
        return
    
    print(f"\n📚 Fragmentando {len(documentos_nuevos)} documentos...")
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    fragmentos = text_splitter.split_documents(documentos_nuevos)
    
    print(f"💾 Guardando {len(fragmentos)} fragmentos en ChromaDB...")
    batch_size = 50
    for i in range(0, len(fragmentos), batch_size):
        lote = fragmentos[i:i + batch_size]
        try:
            vectorstore.add_documents(lote)
            print(f"  └─ Lote {i//batch_size + 1}/{(len(fragmentos)//batch_size)+1}")
        except Exception as e:
            print(f"  └─ Error en lote {i//batch_size + 1}: {e}")
            break
    
    print(f"\n🏁 COMPLETADO: {total_pdfs} programas procesados")
    print(f"📍 Storage: {PATH_STORAGE}")

if __name__ == "__main__":
    ejecutar_ingesta_completa()