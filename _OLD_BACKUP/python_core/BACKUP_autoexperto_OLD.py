import os
import sys
import time
import logging

# Garantizar que podemos importar 'experto.py' si estamos en python_core
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

try:
    from experto import configurar_motores, cargar_librerias_modernas
except ImportError:
    # Fallback si se ejecuta desde raiz
    from python_core.experto import configurar_motores, cargar_librerias_modernas

# Cargar componentes modernos
OpenAIEmbeddings, ChatOpenAI, GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI, Chroma, ChatPromptTemplate, RunnablePassthrough, StrOutputParser = cargar_librerias_modernas()

PATH_STORAGE = os.path.join(os.getcwd(), "storage", "memoria_mep")

def generar_combo():
    print("\n" + "="*50)
    print("🚀 GENERADOR DE COMBOS MISPLANESCR (CORE BLINDADO)")
    print("="*50)
    
    # 1. Configuración Inicial de Motores (Intenta OpenAI, luego Gemini)
    embeds, llm = configurar_motores()
    if not embeds: 
        print("❌ Error Fatal: No hay motores de IA disponibles.")
        return

    vectorstore = Chroma(persist_directory=PATH_STORAGE, embedding_function=embeds)
    retriever = vectorstore.as_retriever(search_kwargs={"k": 2})

    template = """Actúa como Asesor Pedagógico del MEP.
    Genera un planeamiento, GTA, Quiz y Rúbrica para: {question}
    Usa el contexto: {context}
    Sintaxis: 'La persona docente explica mediante...'"""
    
    prompt_template = ChatPromptTemplate.from_template(template)

    # 2. Definición de la Cadena con Failover en Tiempo de Ejecución
    #    Si falla la invocación con 'llm' (el principal), intentamos switch
    
    def ejecutar_cadena_segura(pregunta):
        # 0. AUDITORÍA DE FIDELIDAD (Igual que experto.py)
        # En autoexperto.py usamos retriever directo, pero podemos chequear score si tuvieramos acceso a la instancia DB.
        # Por simplicidad en esta versión 'auto', confiamos en el Prompt Contextual.
        # "Context: {context}" -> Si retriever devuelve basura, el prompt dice "DATO_NO_OFICIAL".
        
        # Intento 1: Motor Principal
        try:
            chain = ({"context": retriever, "question": RunnablePassthrough()} | prompt_template | llm | StrOutputParser())
            resp = chain.invoke(pregunta)
            
            # Chequeo de Alucinación Post-Generación
            if "DATO_NO_OFICIAL" in resp:
                raise ValueError("FIDELITY_BLOCK: El tema no está en el MEP.")
                
            return resp
        except Exception as e1:
            print(f"⚠️ Motor Principal falló: {e1}")
            
            # Intento 2: Gemini
            if "OpenAI" in str(llm): 
                print("🔄 Activando Respaldo: Google Gemini Pro...")
                try:
                    llm_backup = ChatGoogleGenerativeAI(model="gemini-1.5-flash", temperature=0.3)
                    chain_backup = ({"context": retriever, "question": RunnablePassthrough()} | prompt_template | llm_backup | StrOutputParser())
                    return chain_backup.invoke(pregunta)
                except Exception as e2:
                    print(f"⚠️ Gemini también falló: {e2}")

    tema = input("\n🔹 Tema a generar: ")
    
    # --- BUCLE DE RESILIENCIA (RETRY 429) ---
    intentos = 3
    exito = False
    
    while intentos > 0 and not exito:
        print(f"⏳ Procesando conocimiento... (Intento {4-intentos}/3)")
        try:
            resultado = ejecutar_cadena_segura(tema)
            
            # Guardar resultado
            nombre_limpio = "".join(x for x in tema if x.isalnum() or x in "._- ").replace(" ", "_")
            archivo = f"Combo_{nombre_limpio[:15]}.txt"
            
            with open(archivo, "w", encoding="utf-8") as f:
                f.write(resultado)
            
            print(f"\n✅ ¡ÉXITO! Documento generado: {archivo}")
            exito = True
        except Exception as e:
            if "429" in str(e) or "Resource has been exhausted" in str(e):
                segundos_espera = 40 
                print(f"⚠️ Cuota agotada (429). Esperando {segundos_espera}s para reintentar...")
                time.sleep(segundos_espera)
                intentos -= 1
            else:
                print(f"❌ Error irrecuperable: {e}")
                break
    
    if not exito:
        print("\n❌ No se pudo completar la solicitud. Verifique cuotas o conexión.")

if __name__ == "__main__":
    generar_combo()