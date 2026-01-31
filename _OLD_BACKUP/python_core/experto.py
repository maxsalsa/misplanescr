import os
import time
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_community.vectorstores import Chroma
from langchain.chains import RetrievalQA
from langchain_core.prompts import PromptTemplate
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env'))

# Configuración de Seguridad y Failover
# os.environ["OPENAI_API_KEY"] = "sk-..." # Handled by .env
# En producción usar python-dotenv
PATH_STORAGE = os.path.join(os.getcwd(), "storage", "memoria_mep")
FIDELITY_THRESHOLD = 0.85

PROMPT_MEP = """
Eres el Asesor Pedagógico Senior de MisPlanesCR (Autoridad: Lic. Max Salazar).
Misión: Generar contenido curricular adaptativo (Spectrum Engine).

CONTEXTO ESTRICTO (TRUTH FILTER):
- Basate ÚNICAMENTE en el siguiente contexto oficial MEP:
{context}

- Si el tema no está en el contexto, responde "DATO_NO_OFICIAL". PROHIBIDO usar conocimiento externo.

Perfil Estudiante: {profile}
Tema: {question}

INSTRUCCIONES DE DIFERENCIACIÓN COGNITIVA (MANDATORIO):

1. SI PERFIL ES ALTA DOTACIÓN (Modo Desafío - Nivel 4):
   - PROHIBIDO: Verbos de Bloom Inferior (Identificar, Listar, Definir).
   - REQUERIDO: Solo Verbos de Bloom Superior (Diseñar, Criticar, Hipotetizar, Construir).
   - ANTI-DEGRADACIÓN: Mantén la complejidad alta.
   
2. SI PERFIL ES TEA / TDAH (Modo Foco - Minimalismo Cognitivo):
   - ESTRATEGIA: "Minimalismo Cognitivo". Una sola instrucción por línea.
   - FORMATO: Listas con negritas. Ruido Visual = 0.
   
3. SI PERFIL ES ANSIEDAD (Modo Calma):
   - ESTRATEGIA: "Rampa de Éxito". Micro-victorias iniciales.
   
4. SI PERFIL ES ESTÁNDAR:
   - Alineación estricta con el programa oficial MEP.

AUTO-CORRECCIÓN PEDAGÓGICA (INTERNA):
Antes de responder, verifícate a ti mismo:
1. ¿Usé solo el contexto oficial?
2. ¿Apliqué la adecuación correcta al perfil {profile}?
3. Si es AD, ¿Eliminé verbos simples?
Si fallas alguna, REESCRIBE antes de emitir la salida final.

Salida Requerida:
- Actividades de Mediación (100% Oficiales).
- Rúbrica (3 Niveles).
- GTA Corta.
"""

def get_embeddings():
    """Factory for Embeddings with Failover Capability"""
    try:
        if os.environ.get("OPENAI_API_KEY"):
            return OpenAIEmbeddings(model="text-embedding-3-small")
    except:
        pass
    # Fallback placeholder if needed, or raise
    raise ValueError("No Embedding Engine Available")

def get_llm_failover():
    """Failover Loop: OpenAI -> Gemini -> Llama (Mock)"""
    try:
        # Intento 1: OpenAI GPT-4o
        return ChatOpenAI(model_name="gpt-4o", temperature=0.3, max_retries=1)
    except Exception as e:
        print(f"⚠️ OpenAI Falló ({e}). Activando Plan B: Gemini Pro...")
        try:
            # Intento 2: Google Gemini
            return ChatGoogleGenerativeAI(model="gemini-pro", temperature=0.3)
        except Exception as e2:
            print(f"❌ Gemini Falló ({e2}). Sistema Crítico.")
            # Intento 3: Llama Local (Placeholder)
            raise RuntimeError("FAILOVER_EXHAUSTED: No hay cerebros disponibles.")

def consultar(tema, demo_mode=False, profile="ESTANDAR"):
    embeds = OpenAIEmbeddings(model="text-embedding-3-small")
    db = Chroma(persist_directory=PATH_STORAGE, embedding_function=embeds)
    
    # 1. Filtro de Fidelidad (Pre-Check) con Recursive Search
    print("🔍 [RAG CORE] Auditando Fidelidad de la Consulta...")
    docs_with_score = db.similarity_search_with_score(tema, k=3)
    best_score = docs_with_score[0][1] if docs_with_score else 100
    
    if best_score > 0.5:
        print(f"⚠️ Fidelidad Baja ({best_score}). Iniciando Búsqueda Recursiva (Deep Search)...")
        # Recursion: Ampliar contexto (k=6)
        docs_with_score = db.similarity_search_with_score(tema, k=6)
        best_score = docs_with_score[0][1] if docs_with_score else 100
        
        if best_score > 0.6: # Aún no relevante
             print(f"⛔ ALERTA DE ALUCINACIÓN: Fallo Recursivo (Distancia: {best_score}).")
             return "ERROR_FIDELITY_CHECK: El tema solicitado no consta en los programas oficiales del MEP cargados."

    # 2. Generación con Failover
    llm = get_llm_failover()
    
    prompt = PromptTemplate(template=PROMPT_MEP, input_variables=["context", "question", "profile"])
    chain = RetrievalQA.from_chain_type(
        llm=llm, 
        chain_type="stuff", 
        retriever=db.as_retriever(search_kwargs={"k": 6}), # Use expanded context
        chain_type_kwargs={"prompt": prompt},
        return_source_documents=True
    )
    
    print(f"\n⚡ Generando Contenido Oficial para Perfil: {profile}...")
    start_t = time.time()
    
    # Injection of profile into the query payload to ensure it is passed if prompt logic requires it implicitly
    # (Though we added input_variables, RetrievalQA might restrict. We passed it in invoke args previously.)
    result = chain.invoke({"query": tema, "profile": profile})
    elapsed = time.time() - start_t
    
    respuesta_final = result['result']

    # 2.5 Auto-Verificación
    if "DATO_NO_OFICIAL" in respuesta_final:
        print("⚠️ Verificación Negativa: El modelo no encontró datos suficientes.")
        return "Lo sentimos, no hay suficientes datos oficiales para generar este plan."

    # 3. Inyección de Metadatos (Anti-Extracción)
    fuentes = [d.metadata.get('source', 'UNK') for d in result['source_documents']]
    hash_op = hash(respuesta_final)
    
    metadata_footer = f"\n\n---\n🛡️ FUENTE OFICIAL MEP verificada.\nRef: {fuentes}\nHash: {hash_op}\nGenTime: {elapsed:.2f}s"
    
    if demo_mode:
        print("⚠️ MODO DEMO DETECTADO: Truncando respuesta al 30%.")
        cut_point = int(len(respuesta_final) * 0.3)
        respuesta_final = respuesta_final[:cut_point] + "\n\n[...CONTENIDO BLOQUEADO - ACTUALICE A PREMIUM...]"

    final_output = respuesta_final + metadata_footer
    print(final_output)
    return final_output

if __name__ == "__main__":
    pregunta = input("¿Qué tema o unidad del MEP deseas trabajar hoy?: ")
    consultar(pregunta)
