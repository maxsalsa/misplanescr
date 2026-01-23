import os
import shutil
import sys
from entrena import ejecutar_entrenamiento_elite, PATH_STORAGE

def disaster_recovery_protocol():
    print("🚨 INICIANDO PROTOCOLO DE RECUPERACIÓN DE DESASTRES (DRP) 🚨")
    print("⚠️ ESTA ACCIÓN BORRARÁ TODA LA MEMORIA VECTORIAL Y LA RECONSTRUIRÁ.")
    
    confirm = input("¿Está seguro? Escriba 'CONFIRMAR' para proceder: ")
    if confirm != "CONFIRMAR":
        print("❌ Operación cancelada.")
        return

    # 1. Nuke Storage
    if os.path.exists(PATH_STORAGE):
        print(f"🔥 Eliminando base de datos corrupta en: {PATH_STORAGE}")
        try:
            shutil.rmtree(PATH_STORAGE)
            print("✅ Limpieza completada.")
        except Exception as e:
            print(f"❌ Error eliminando archivos: {e}")
            return
    else:
        print("ℹ️ No se encontró base de datos previa.")

    # 2. Rebuild
    print("🏗️ Iniciando reconstrucción desde Fuente Original (PDFs)...")
    try:
        ejecutar_entrenamiento_elite()
        print("✅ SISTEMA RECUPERADO EXITOSAMENTE.")
    except Exception as e:
        print(f"❌ FALLO CRÍTICO EN RECONSTRUCCIÓN: {e}")
        sys.exit(1)

if __name__ == "__main__":
    disaster_recovery_protocol()
