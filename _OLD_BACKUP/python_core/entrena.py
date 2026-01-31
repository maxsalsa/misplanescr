import os
import hashlib
import logging
from dotenv import load_dotenv
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_community.vectorstores import Chroma

# Cargar variables de entorno
load_dotenv(os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env'))

# Configuración de Logs profesional
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - [SISTEMA-INCADIBLE] %(message)s')
logger = logging.getLogger(__name__)

# --- LLAVES DE EMERGENCIA (Asegúrate de que al menos una funcione) ---
# --- LLAVES DE EMERGENCIA (Asegúrate de que al menos una funcione) ---
# Se intenta leer del entorno primero
OPENAI_KEY = os.getenv("OPENAI_API_KEY", "")
GEMINI_KEY = os.getenv("GOOGLE_API_KEY", "")

os.environ["GOOGLE_API_KEY"] = GEMINI_KEY

# Rutas
PATH_PDFS = os.path.join(os.getcwd(), "public", "mep-docs", "MEP_ORDENADO")
PATH_STORAGE = os.path.join(os.getcwd(), "storage", "memoria_mep")

def obtener_motor_embeddings():
    """Intenta usar OpenAI, si falla, salta a Gemini automáticamente"""
    try:
        # Probamos OpenAI primero
        if "sk-" in OPENAI_KEY:
            os.environ["OPENAI_API_KEY"] = OPENAI_KEY
            motor = OpenAIEmbeddings(model="text-embedding-3-small")
            # Prueba rápida de conexión
            motor.embed_query("test")
            logger.info("✅ Motor principal: OpenAI activo.")
            return motor
    except Exception as e:
        logger.warning(f"⚠️ OpenAI falló ({e}). Activando respaldo: Google Gemini...")
    
    # Si falla o no hay llave OpenAI, usamos Gemini
    return GoogleGenerativeAIEmbeddings(model="models/text-embedding-004")

def calcular_hash(archivo):
    hasher = hashlib.md5()
    with open(archivo, 'rb') as f:
        buf = f.read()
        hasher.update(buf)
    return hasher.hexdigest()

def ejecutar_entrenamiento_blindado():
    logger.info("🚀 Iniciando proceso de entrenamiento con protección de caídas...")
    
    # Inicializar motor y base de datos
    motor_embeddings = obtener_motor_embeddings()
    vectorstore = Chroma(persist_directory=PATH_STORAGE, embedding_function=motor_embeddings)
    
    # Obtener qué archivos ya hemos procesado (Checkpoint)
    metadatos_existentes = vectorstore.get()
    hashes_en_memoria = set(metadatos_existentes['metadatas'][i].get('file_hash', '') 
                             for i in range(len(metadatos_existentes['metadatas'])))

    documentos_nuevos = []
    
    for raiz, _, archivos in os.walk(PATH_PDFS):
        for f in archivos:
            if f.lower().endswith(".pdf") and not "(" in f: # Filtro de duplicados (1)
                ruta = os.path.join(raiz, f)
                f_hash = calcular_hash(ruta)
                
                if f_hash in hashes_en_memoria:
                    logger.info(f"⏩ Saltando (Ya está en memoria): {f}")
                    continue
                
                try:
                    logger.info(f"📖 Leyendo archivo nuevo: {f}")
                    loader = PyPDFLoader(ruta)
                    docs = loader.load()
                    for d in docs:
                        d.metadata['file_hash'] = f_hash # Etiquetamos para no repetir
                    documentos_nuevos.extend(docs)
                except Exception as e:
                    logger.error(f"❌ Error leyendo {f}: {e}")

    if not documentos_nuevos:
        logger.info("✅ Todo está al día. No hay PDFs nuevos que procesar.")
        return

    # Fragmentación
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    fragmentos = text_splitter.split_documents(documentos_nuevos)
    
    # PROCESAMIENTO POR LOTES (La clave para que no se caiga)
    batch_size = 50 # Grupos de 50 para no saturar la API
    logger.info(f"🧩 Procesando {len(fragmentos)} fragmentos en lotes de {batch_size}...")
    
    for i in range(0, len(fragmentos), batch_size):
        lote = fragmentos[i:i + batch_size]
        try:
            vectorstore.add_documents(lote)
            logger.info(f"✔️ Lote {i//batch_size + 1} guardado con éxito (Progreso: {i+len(lote)}/{len(fragmentos)})")
        except Exception as e:
            logger.error(f"🚨 Error en lote {i//batch_size + 1}: {e}")
            logger.info("💡 Guardando progreso actual y deteniendo para seguridad...")
            break 

    logger.info(f"🏁 Proceso finalizado. Memoria actualizada en {PATH_STORAGE}")

if __name__ == "__main__":
    ejecutar_entrenamiento_blindado()