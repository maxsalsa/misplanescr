import os
import hashlib
import logging
from dotenv import load_dotenv
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_community.vectorstores import Chroma

# Configuración de Logs profesional
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - [SISTEMA-INCADIBLE] %(message)s')
logger = logging.getLogger(__name__)

# Cargar variables de entorno desde el root (2 niveles arriba)
BASE_DIR = os.path.dirname(os.path.abspath(__file__)) # public/mep-docs
ROOT_DIR = os.path.dirname(os.path.dirname(BASE_DIR)) # autoplanea-mep
load_dotenv(os.path.join(ROOT_DIR, ".env"))

# Rutas Dinámicas
PATH_PDFS = os.path.join(BASE_DIR, "MEP_ORDENADO")
# Usamos el storage central en python_core para consistencia, o el local si se prefiere aislameinto.
# El usuario dijo "son tu memoria", y hay un 'cerebro_mep' ahi. Usaremos ese path local para cumplir.
PATH_STORAGE = os.path.join(BASE_DIR, "cerebro_mep") 

def obtener_motor_embeddings():
    """Intenta usar OpenAI, si falla, salta a Gemini automáticamente"""
    openai_key = os.getenv("OPENAI_API_KEY")
    
    try:
        if openai_key and "sk-" in openai_key:
            motor = OpenAIEmbeddings(model="text-embedding-3-small")
            # Prueba rápida
            motor.embed_query("test")
            logger.info("✅ Motor principal: OpenAI activo.")
            return motor
    except Exception as e:
        logger.warning(f"⚠️ OpenAI falló ({e}). Activando respaldo: Google Gemini...")
    
    return GoogleGenerativeAIEmbeddings(model="models/embedding-001")

def calcular_hash(archivo):
    hasher = hashlib.md5()
    with open(archivo, 'rb') as f:
        buf = f.read()
        hasher.update(buf)
    return hasher.hexdigest()

def ejecutar_entrenamiento_blindado():
    logger.info(f"🚀 Iniciando entrenamiento. Storage: {PATH_STORAGE}")
    
    motor_embeddings = obtener_motor_embeddings()
    vectorstore = Chroma(persist_directory=PATH_STORAGE, embedding_function=motor_embeddings)
    
    metadatos_existentes = vectorstore.get()
    hashes_en_memoria = set(metadatos_existentes['metadatas'][i].get('file_hash', '') 
                             for i in range(len(metadatos_existentes['metadatas'])))

    documentos_nuevos = []
    
    if not os.path.exists(PATH_PDFS):
        logger.error(f"❌ No se encuentra el directorio de PDFs: {PATH_PDFS}")
        return

    for raiz, _, archivos in os.walk(PATH_PDFS):
        for f in archivos:
            if f.lower().endswith(".pdf") and not "(" in f: 
                ruta = os.path.join(raiz, f)
                f_hash = calcular_hash(ruta)
                
                if f_hash in hashes_en_memoria:
                    continue
                
                try:
                    logger.info(f"📖 Procesando: {f}")
                    loader = PyPDFLoader(ruta)
                    docs = loader.load()
                    for d in docs:
                        # ENRIQUECIMIENTO DE METADATA (MEJORA ESTRUCTURAL)
                        d.metadata['file_hash'] = f_hash
                        d.metadata['filename'] = f
                        d.metadata['source_path'] = ruta
                        # page ya viene en metadata['page']
                    documentos_nuevos.extend(docs)
                except Exception as e:
                    logger.error(f"❌ Error leyendo {f}: {e}")

    if not documentos_nuevos:
        logger.info("✅ Memoria al día.")
        return

    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    fragmentos = text_splitter.split_documents(documentos_nuevos)
    
    batch_size = 50 
    logger.info(f"🧩 Insertando {len(fragmentos)} fragmentos...")
    
    for i in range(0, len(fragmentos), batch_size):
        lote = fragmentos[i:i + batch_size]
        try:
            vectorstore.add_documents(lote)
            logger.info(f"✔️ Lote {i//batch_size + 1} guardado.")
        except Exception as e:
            logger.error(f"🚨 Error en lote {i}: {e}")
            break 

    logger.info("🏁 Entrenamiento finalizado.")

if __name__ == "__main__":
    ejecutar_entrenamiento_blindado()