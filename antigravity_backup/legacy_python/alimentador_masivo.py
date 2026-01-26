# -*- coding: utf-8 -*-
"""
ALIMENTADOR MASIVO NEON: Synchro-Engine
Carga lotes de unidades JSON estructuradas a la base de datos.
"""
import json
import os
import time
from auto_exporter import actualizar_core_neon

def alimentar_neon_masivo(archivos):
    print(f"🚀 Iniciando Alimentación Masiva de {len(archivos)} Unidades...")
    
    exitos = 0
    fallos = 0
    
    for ruta_archivo in archivos:
        if not os.path.exists(ruta_archivo):
            print(f"⚠️ Archivo no encontrado: {ruta_archivo}")
            fallos += 1
            continue
            
        try:
            with open(ruta_archivo, 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            unidad_nombre = data['metadata']['unidad_nombre']
            print(f"🔄 Procesando: {unidad_nombre}...")
            
            resultado = actualizar_core_neon(data)
            
            if "Exitosa" in resultado:
                print(f"   ✅ Sincronizado: {unidad_nombre}")
                exitos += 1
            else:
                print(f"   ❌ Fallo: {resultado}")
                fallos += 1
                
        except Exception as e:
            print(f"   ❌ Error Crítico procesando {ruta_archivo}: {e}")
            fallos += 1
            
    print("\n" + "="*40)
    print(f"🏆 RESUMEN DE EJECUCIÓN")
    print(f"Total: {len(archivos)}")
    print(f"Éxitos: {exitos}")
    print(f"Fallos: {fallos}")
    print("="*40)

if __name__ == "__main__":
    archivos_feed = [
        "ULTRA_TI_U1.json",
        "ULTRA_SEG_U2.json",
        "ULTRA_ELE_U3.json"
    ]
    
    # Pre-Flight Check de Schema
    print("🛠️ Ejecutando verificación de esquema previa...")
    os.system("python schema_check.py")
    time.sleep(2)
    
    alimentar_neon_masivo(archivos_feed)
