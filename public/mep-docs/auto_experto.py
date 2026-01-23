import os
import time
import logging
from experto import configurar_motores, cargar_librerias_modernas

# Cargar componentes modernos
OpenAIEmbeddings, ChatOpenAI, GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI, Chroma, ChatPromptTemplate, RunnablePassthrough, StrOutputParser = cargar_librerias_modernas()

PATH_STORAGE = os.path.join(os.getcwd(), "storage", "memoria_mep")

def generar_combo():
    print("\n" + "="*50)
    print("🚀 GENERADOR DE COMBOS MISPLANESCR (MODO PACIENTE)")
    print("="*50)
    
    embeds, llm = configurar_motores()
    if not embeds: return

    # Reducimos k a 2 para intentar pasar bajo el radar de la cuota de Google
    vectorstore = Chroma(persist_directory=PATH_STORAGE, embedding_function=embeds)
    retriever = vectorstore.as_retriever(search_kwargs={"k": 2})

    template = """Actúa como Asesor Pedagógico del MEP.
    Genera un planeamiento, GTA, Quiz y Rúbrica para: {question}
    Usa el contexto: {context}
    Sintaxis: 'La persona docente explica mediante...'"""
    
    prompt = ChatPromptTemplate.from_template(template)
    chain = ({"context": retriever, "question": RunnablePassthrough()} | prompt | llm | StrOutputParser())

    tema = input("\n🔹 Tema a generar: ")
    
    # --- BUCLE DE RESILIENCIA ---
    intentos = 3
    exito = False
    
    while intentos > 0 and not exito:
        print(f"⏳ Procesando conocimiento... (Intento {4-intentos}/3)")
        try:
            resultado = chain.invoke(tema)
            
            # Guardar resultado
            nombre_limpio = "".join(x for x in tema if x.isalnum() or x in "._- ").replace(" ", "_")
            archivo = f"Combo_{nombre_limpio[:15]}.txt"
            
            with open(archivo, "w", encoding="utf-8") as f:
                f.write(resultado)
            
            print(f"\n✅ ¡ÉXITO! Documento generado: {archivo}")
            exito = True
        except Exception as e:
            if "429" in str(e):
                segundos_espera = 40 # Google pidió 32, le damos 40 para estar seguros
                print(f"⚠️ Cuota agotada. Esperando {segundos_espera} segundos para reintentar automáticamente...")
                time.sleep(segundos_espera)
                intentos -= 1
            else:
                print(f"❌ Error inesperado: {e}")
                break
    
    if not exito:
        print("\n❌ No se pudo completar por saturación de Google. Intente en 5 minutos.")

if __name__ == "__main__":
    generar_combo()