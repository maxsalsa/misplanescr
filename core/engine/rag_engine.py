import os
import json
import argparse
from langchain_postgres import PGVector
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import RetrievalQA
from config import OPENAI_API_KEY
from dotenv import load_dotenv

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")

# Prompt Template para Salida JSON Estricta
JSON_RAG_PROMPT = """
ROL: Eres el Director de Currículo y Arquitecto de Datos del MEP. BASE DE CONOCIMIENTO: Operas consultando estrictamente la normativa oficial de Costa Rica (Programas de Estudio, Política Educativa y Reglamentos).

TUS 4 DIRECTRICES IRROMPIBLES (KERNEL v6.0):
1. Mediación Transformadora (Los 4 Momentos):
    ◦ Toda secuencia didáctica debe seguir el flujo oficial de la Educación Combinada: Conexión (enganche), Colaboración (trabajo grupal), Clarificación (análisis/modelado) y Construcción/Aplicación (producto final).
    ◦ Prohibido: Clases magistrales pasivas. El estudiante siempre debe "hacer" o "resolver".

2. Neuro-Inclusión (DUA 3.0):
    ◦ No diseñes para un "estudiante promedio". Diseña para la variabilidad cerebral.
    ◦ Ofrece múltiples formas de Representación (Red de Reconocimiento), Acción y Expresión (Red Estratégica) y Compromiso (Red Afectiva).

3. Evaluación Técnica (Escudo Legal):
    ◦ Regla de Oro: No se puede asignar una nota sin un instrumento técnico (Rúbrica/Lista de Cotejo).
    ◦ Define claramente si la evidencia es de Conocimiento, Desempeño o Producto.

4. Integración Tecnológica Contextualizada:
    ◦ Utiliza las herramientas recomendadas: Kahoot/Quizizz (Gamificación), Canva/Genially (Diseño), IDEs (Hard Tech).

CONTEXTO (Fragmentos de Planes Oficiales):
{context}

CONSULTA DEL DOCENTE:
{question}

INSTRUCCIONES DE FORMATO JSON (Estricto):
Responde ÚNICAMENTE con un objeto JSON válido.
{{
  "unit_title": "string",
  "specialty_family": "string (HARD_TECH | SOFT_SKILLS | ACADEMIC)",
  "mediation_strategy": {{
    "moment_1_connection": {{
      "activity": "string",
      "resource": "string",
      "dua_tag": "string (Engagement)"
    }},
    "moment_2_collaboration": {{
      "activity": "string",
      "tools": "string"
    }},
    "moment_3_clarification": {{
      "activity": "string (Modelado Docente)",
      "tools": "string"
    }},
    "moment_4_construction": {{
      "activity": "string",
      "tools": ["string"],
      "evidence_type": "string (Producto | Desempeño | Conocimiento)"
    }}
  }},
  "evaluation_instrument": {{
    "type": "string (Rúbrica Analítica | Lista de Cotejo)",
    "criteria": [
      {{
        "indicator": "string",
        "levels": ["Inicial", "Intermedio", "Avanzado"],
        "weight": "string (opt)"
      }}
    ]
  }},
  "safety_check": "Clean" | "RED_BUTTON_TRIGGERED"
}}
"""

def query_rag(query: str):
    if not OPENAI_API_KEY:
        return json.dumps({"error": "No API Key configured"})
    
    if not DATABASE_URL:
        return json.dumps({"error": "No DATABASE_URL configured"})

    # 1. Conectar a Neon Vector DB
    embedding_function = OpenAIEmbeddings(model="text-embedding-3-small")
    
    try:
        db = PGVector(
            embeddings=embedding_function,
            collection_name="mep_curriculum_vectors",
            connection=DATABASE_URL,
            use_jsonb=True,
        )
    except Exception as e:
         return json.dumps({"error": "DB Connection Failed", "details": str(e)})
    
    # 2. Configurar Retriever
    retriever = db.as_retriever(search_kwargs={"k": 4})
    
    # 3. Configurar LLM
    llm = ChatOpenAI(model="gpt-4o", temperature=0.2) # GPT-4o para mejor seguimiento de JSON
    
    # 4. Configurar Chain
    prompt = PromptTemplate(
        template=JSON_RAG_PROMPT,
        input_variables=["context", "question"]
    )
    
    qa_chain = RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",
        retriever=retriever,
        chain_type_kwargs={"prompt": prompt}
    )
    
    # 5. Ejecutar
    try:
        response = qa_chain.invoke({"query": query})
        result_text = response['result'].strip()
        
        # Limpieza simple por si el LLM pone markdown
        if result_text.startswith("```json"):
            result_text = result_text.replace("```json", "").replace("```", "")
        
        # Validar JSON
        json_result = json.loads(result_text)
        return json.dumps(json_result, indent=2)
        
    except Exception as e:
        return json.dumps({
            "error": "Processing Failed",
            "details": str(e),
            "raw_response": result_text if 'result_text' in locals() else "N/A"
        })

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Antigravity RAG Engine")
    parser.add_argument("query", type=str, help="La consulta pedagógica del docente")
    args = parser.parse_args()
    
    print(query_rag(args.query))
