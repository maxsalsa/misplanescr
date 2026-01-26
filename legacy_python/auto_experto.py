# -*- coding: utf-8 -*-
import os
from experto_config import configurar_motores
from langchain_chroma import Chroma

def motor_antigravity_ultra(tema, modalidad, nivel="N/A"):
    """Motor central que genera planeamiento con rigor cronopedagogico."""
    embeds, llm = configurar_motores()
    path_storage = os.path.join(os.getcwd(), "storage", "memoria_mep")
    
    vectorstore = Chroma(persist_directory=path_storage, embedding_function=embeds)
    retriever = vectorstore.as_retriever(search_kwargs={"k": 5})

    # Prompt con ADN de MisPlanesCR
    prompt_template = f"""
    Director Pedagogico Antigravity. 
    Contexto MEP: {{context}}
    Tarea: Generar Planeamiento Integral para {tema} ({modalidad}).
    Nivel: {nivel}.
    
    REGLAS ULTRA:
    1. Binomio: Docente media con tecnologia / Estudiante construye.
    2. Tiempo: Bloques reales de 40/80 min.
    3. Retos: Incluir Retos Bronce, Plata y Oro.
    4. Canal Oficial: Redactar anuncio para Microsoft Teams y Correo @est.mep.go.cr.
    5. Prohibido: WhatsApp o comunicacion informal.
    """
    
    # Logica de cadena (simplificada para estabilidad)
    # Nota: Aqui se invoca la cadena RAG completa
    contexto = retriever.invoke(tema)
    prompt_final = prompt_template.format(context=contexto)
    respuesta = llm.invoke(prompt_final)
    
    return respuesta.content