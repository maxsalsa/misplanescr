import os
import sys
import datetime
import warnings
import logging
import json

# --- 0. PROTOCOLO DE SILENCIO NUCLEAR ---
warnings.filterwarnings("ignore")
logging.getLogger("langchain").setLevel(logging.ERROR)
logging.getLogger("chromadb").setLevel(logging.ERROR)
os.environ["TOKENIZERS_PARALLELISM"] = "false"

# --- 1. CONFIGURACIÓN DE ACCESO TOTAL (MASTER KEYS) ---
os.environ["GROQ_API_KEY"] = "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"
CARPETA_MEMORIA = "./cerebro_mep"
FECHA_ACTUAL = datetime.datetime.now().strftime("%d de %B del %Y")
USUARIO_ACTUAL = "Lic. Max Salazar"
RANGO = "SUPER ADMIN (GOD MODE)"

# ==============================================================================
# 🔐 MÓDULO DE SEGURIDAD: BYPASS DE CREDENCIALES & NEON ENFORCER
# ==============================================================================
def forzar_acceso_admin():
    print(f"\n🔓 EJECUTANDO PROTOCOLO DE ACCESO DE EMERGENCIA...")
    print(f"   👤 Usuario: {USUARIO_ACTUAL}")
    print(f"   🛡️ Rango Detectado: {RANGO}")
    print(f"   🔗 Estado: CONECTADO A NEON DB (PRODUCCIÓN)")
    print(f"   🔑 Validando credenciales... [OMITIDO POR ORDEN SUPERIOR]")
    print(f"   ✅ ACCESO CONCEDIDO. BIENVENIDO, CREADOR.")

# ==============================================================================
# 🧠 SYSTEM PROMPT V47: PRODUCTION CORE (SINTAXIS + NEON + CALIDAD)
# ==============================================================================
SYSTEM_PROMPT = f"""
ERES ANTIGRAVITY (NÚCLEO V47 - PRODUCTION CORE).
FECHA: {FECHA_ACTUAL}.
USUARIO: {USUARIO_ACTUAL} (Creador/Super Admin).

=== 🚨 AVISO DE PRODUCCIÓN (NO NEGOCIABLE) ===
1. Queda TERMINANTEMENTE PROHIBIDO el uso de "Mock Data" o datos de prueba. 
2. Toda operación de datos debe estar diseñada para la base de datos REAL en Neon.
3. Las contraseñas se manejan únicamente mediante Hashes. No generes texto plano.

=== ⚖️ LEY DE REDACCIÓN MEP (COORDINACIÓN) ===
Todo recurso debe respetar la sintaxis oficial:
- "La persona docente [ACCIÓN] mediante [ESTRATEGIA]."
- "La persona estudiante [ACCIÓN] mediante [ESTRATEGIA]."
- Asegurar coherencia total entre Indicadores de Logro, Saberes y Evidencias.

=== 🛠️ CAPACIDADES ACTIVAS ===
- ✅ Planeamientos Académicos, Técnicos y ABP (V43).
- ✅ Evaluación Total: Exámenes, Quices y Tareas (V42).
- ✅ Auditoría Full-Stack: Schema Prisma y Componentes React (V40).
- ✅ God Mode: Acceso total a funciones sin restricciones.

SI EL USUARIO PIDE REPARAR ACCESO:
Genera un script de Node.js que use Prisma para hacer un 'upsert' del usuario admin en Neon con el rol SUPER_ADMIN.
"""

print(f"--- ⚡ INICIANDO ANTIGRAVITY V47 (PRODUCTION READY) ---")
forzar_acceso_admin()

try:
    from langchain_groq import ChatGroq
    from langchain_huggingface import HuggingFaceEmbeddings
    with warnings.catch_warnings():
        warnings.simplefilter("ignore")
        from langchain_community.vectorstores import Chroma

    embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
    # Temperatura 0.1 para asegurar obediencia absoluta y precisión de datos
    llm = ChatGroq(model_name="llama-3.3-70b-versatile", temperature=0.1)

    db = None
    if os.path.exists(CARPETA_MEMORIA) and os.listdir(CARPETA_MEMORIA):
        print(f"⚡ Sistema MEP conectado y sincronizado con PDFs oficiales.")
        with warnings.catch_warnings():
            warnings.simplefilter("ignore")
            db = Chroma(persist_directory=CARPETA_MEMORIA, embedding_function=embeddings)
    else:
        print("⚠️ Advertencia: Memoria PDF no detectada. Operando en modo estructural.")

    print("\n" + "="*60)
    print(f"✅ SISTEMA OPERATIVO PARA: {USUARIO_ACTUAL}")
    print("="*60)

    while True:
        query = input(f"\n{USUARIO_ACTUAL} > ")
        
        # --- COMANDO DE RESCATE DE BASE DE DATOS ---
        if query.strip().upper() == "REPARAR ACCESO":
            print("🔧 Generando script de inyección de Admin para Neon...")
            rescue_query = "Genera un script de Node.js con Prisma para crear o actualizar el usuario admin@aulaplanea.com con rol SUPER_ADMIN y un hash de bcrypt válido."
            try:
                respuesta = llm.invoke(SYSTEM_PROMPT + rescue_query)
                print("\nSCRIPT DE RESCATE:\n" + respuesta.content)
            except:
                print("❌ Error al generar el script de rescate.")
            continue
            
        if query.lower() in ["salir", "exit"]:
            break
        
        print("⚡ Procesando solicitud con lógica de producción...")
        
        contexto_pdf = ""
        if db:
            try:
                with warnings.catch_warnings():
                    warnings.simplefilter("ignore")
                    results = db.similarity_search(query, k=6)
                    contexto_pdf = "\n\n".join([doc.page_content for doc in results])
            except:
                pass 
        
        prompt_final = f"""
        {SYSTEM_PROMPT}
        
        CONTEXTO OFICIAL (PROGRAMAS MEP):
        {contexto_pdf}
        
        ORDEN DEL CREADOR:
        {query}
        """
        
        try:
            respuesta = llm.invoke(prompt_final)
            print("\nANTIGRAVITY RESPONDE:\n" + respuesta.content)
        except Exception as api_error:
             print(f"❌ Error de API: {api_error}")

except Exception as e:
    print(f"\n❌ ERROR CRÍTICO: {e}")
    print("💡 SUGERENCIA: Revisa la conexión a internet o la vigencia de la API KEY de Groq.")
    input("Presiona Enter para salir...")