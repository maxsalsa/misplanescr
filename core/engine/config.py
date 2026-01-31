import os
from dotenv import load_dotenv

# Cargar variables de entorno desde el root del proyecto
# Asumiendo que este script corre desde root o que .env está en root
load_dotenv()

# Rutas Base
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
STORAGE_DIR = os.path.join(BASE_DIR, "storage")
CHROMA_DB_DIR = os.path.join(STORAGE_DIR, "chroma_db_v2")

# Crear directorios si no existen
os.makedirs(CHROMA_DB_DIR, exist_ok=True)

# Configuración de Modelos
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

# Configuración Educación Técnica
HARD_TECH_KEYWORDS = ["informática", "desarrollo web", "ciberseguridad", "redes", "electrónica", "programación"]
SOFT_SKILLS_KEYWORDS = ["turismo", "ejecutivo", "contabilidad", "secretariado", "inglés"]

if not OPENAI_API_KEY and not GOOGLE_API_KEY:
    print("⚠️ WARNING: No API Keys found. RAG Engine will fail to generate embeddings/responses.")
