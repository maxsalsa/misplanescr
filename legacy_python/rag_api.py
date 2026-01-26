# -*- coding: utf-8 -*-
"""
PUENTE VECTORIAL (RAG -> JSON -> PRISMA)
"""
import os
import sys
import json
import argparse
from experto_config import configurar_motores
from langchain_chroma import Chroma

def generar_json_curricular(asignatura, nivel="N/A"):
    embeds, llm = configurar_motores()
    path_storage = os.path.join(os.getcwd(), "storage", "memoria_mep")
    
    if not os.path.exists(path_storage):
        return {"error": "Storage vectorial no encontrado. Ejecuta entrena.py primero."}

    vectorstore = Chroma(persist_directory=path_storage, embedding_function=embeds)
    retriever = vectorstore.as_retriever(search_kwargs={"k": 5})

    # Recuperar Contexto
    query_context = f"{asignatura} {nivel} programas estudio objetivos indicadores"
    docs = retriever.invoke(query_context)
    contexto_texto = "\n\n".join([d.page_content for d in docs])

    # Prompt de "La Magia"
    prompt = f"""
    ACTUA COMO: Pedagogo y Arquitecto de Datos MEP.
    CONTEXTO RECUPERADO (VECTORES):
    {contexto_texto[:4000]} 
    
    TAREA: Basado estrictamente en este contexto de {asignatura} ({nivel}), genera un OBJETO JSON válido.
    
    REGLAS DE GENERACION:
    1. Extrae la 1era Unidad visible.
    2. Identifica los SABERES ESENCIALES (Contenidos).
    3. Para cada Indicador, GENERA actividades que cubran esos Saberes.
    
    FORMATO JSON DE SALIDA (Estrictamente este schema):
    {{
      "curriculum_family": "{asignatura}",
      "level": "{nivel}",
      "units": [
        {{
          "title": "Titulo de Unidad",
          "learning_outcomes": [
            {{
              "description": "Objetivo General",
              "essential_knowledges": ["Saber 1", "Saber 2"],
              "indicators": [
                {{
                  "description": "Indicador especifico",
                  "suggested_lessons": 4, 
                  "activities": [
                    {{
                      "title": "Nombre Actividad",
                      "type": "COTIDIANO", 
                      "covers_knowledges": ["Saber 1"],
                      "evaluation_instrument": "RUBRICA",
                      "evidence_required": "FOTO",
                      "dua_suggestion": "Texto DUA",
                      "rubric": {{ "criteria": "X", "level_1_desc": "...", "level_3_desc": "..." }},
                      "variants": []
                    }}
                  ]
                }}
              ]
            }}
          ]
        }}
      ]
    }}
    
    IMPORTANTE: DEVUELVE SOLAMENTE EL JSON. SIN MARKDOWN. SIN COMENTARIOS.
    """
    
    try:
        respuesta = llm.invoke(prompt)
        content = respuesta.content.strip()
        # Clean potential markdown
        if content.startswith("```json"):
            content = content.replace("```json", "").replace("```", "")
        return json.loads(content)
    except Exception as e:
        return {"error": f"Fallo en generacion LLM: {str(e)}"}

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--subject", required=True, help="Nombre de la asignatura (ej: Matematicas)")
    parser.add_argument("--level", required=True, help="Nivel (ej: 7mo)")
    args = parser.parse_args()
    
    output = generar_json_curricular(args.subject, args.level)
    print(json.dumps(output, indent=2))
