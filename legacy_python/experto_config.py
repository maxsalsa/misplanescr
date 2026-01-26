# -*- coding: utf-8 -*-
"""
ANTIGRAVITY CORE: Sistema Nervioso
Maneja redundancia de LLMs y Embeddings (Ultra -> GPT-4o -> Gemini)
"""
import os
from dotenv import load_dotenv
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_community.vectorstores import Chroma
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser

# Cargar credenciales
load_dotenv()

GEMINI_KEY = os.getenv("GOOGLE_API_KEY", "")
OPENAI_KEY = os.getenv("OPENAI_API_KEY", "")

# Inyectar al entorno
os.environ["GOOGLE_API_KEY"] = GEMINI_KEY
os.environ["OPENAI_API_KEY"] = OPENAI_KEY

def cargar_librerias_modernas():
    """Exporta las clases necesarias para el ecosistema"""
    return (OpenAIEmbeddings, ChatOpenAI, GoogleGenerativeAIEmbeddings, 
            ChatGoogleGenerativeAI, Chroma, ChatPromptTemplate, 
            RunnablePassthrough, StrOutputParser)

def configurar_motores():
    """
    Configuración con Failover Industrial:
    1. OpenAI Embeddings (Prioridad por precisión en español técnico)
    2. Gemini Pro (Ventana de contexto superior para generación)
    """
    print("🚀 Antigravity: Inicializando motores...")
    
    # Embeddings: OpenAI primero, Gemini como respaldo
    try:
        if "sk-" in OPENAI_KEY:
            embeds = OpenAIEmbeddings(model="text-embedding-3-small", api_key=OPENAI_KEY)
            print("✅ Embeddings: OpenAI activo")
        else:
            raise ValueError("OpenAI key no válida")
    except Exception as e:
        print(f"⚠️ OpenAI embeddings fallido ({e}), usando Gemini...")
        embeds = GoogleGenerativeAIEmbeddings(model="models/embedding-001", google_api_key=GEMINI_KEY)
        print("✅ Embeddings: Gemini activo")

    # LLM: Gemini Pro (ventana de contexto mayor para programas MEP)
    try:
        llm = ChatGoogleGenerativeAI(model="gemini-1.5-pro", temperature=0.1, google_api_key=GEMINI_KEY)
        print("✅ LLM: Gemini 1.5 Pro activo")
    except Exception as e:
        print(f"⚠️ Gemini LLM fallido ({e}), usando OpenAI GPT-4o...")
        llm = ChatOpenAI(model="gpt-4o", temperature=0.3, api_key=OPENAI_KEY)
        print("✅ LLM: GPT-4o activo")
    
    return embeds, llm

if __name__ == "__main__":
    configurar_motores()
    print("✅ Sistema Nervioso: Operacional")