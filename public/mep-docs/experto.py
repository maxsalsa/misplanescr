import os
import re

def limpiar_recursivo(directorio_base):
    # Patrón para archivos duplicados: "archivo (1).pdf", "archivo - copia.pdf"
    patron_duplicado = re.compile(r'.* \(\d+\)\.pdf$|.* - copia\.pdf$')
    
    print(f"--- Iniciando Barrido en: {directorio_base} ---")
    
    # os.walk recorre carpetas y subcarpetas
    for raiz, directorios, archivos in os.walk(directorio_base):
        for archivo in archivos:
            if patron_duplicado.match(archivo):
                ruta_completa = os.path.join(raiz, archivo)
                try:
                    os.remove(ruta_completa)
                    print(f"🗑️ Eliminado duplicado en {os.path.basename(raiz)}: {archivo}")
                except Exception as e:
                    print(f"❌ Error en {archivo}: {e}")

    print("--- Limpieza Kaizen Completa ---")

# Ejecutar en el directorio actual
limpiar_recursivo(".")