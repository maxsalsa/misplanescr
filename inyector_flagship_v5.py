# -*- coding: utf-8 -*-
"""
INYECTOR FLAGSHIP v5.0
Ejecuta la inyección de las Unidades Maestras (Web, Mate, Inglés) usando AntigravityEngine
"""
import os
import time
from antigravity_engine import engine

def inyectar_flagship():
    print("🚀 Iniciando Inyección Flagship v5.0...")
    
    archivos = [
        "ULTRA_WEB_11.json",
        "ULTRA_MATH_9.json",
        "ULTRA_ENGLISH_74.json"
    ]
    
    exitos = 0
    fallos = 0
    
    for archivo in archivos:
        if not os.path.exists(archivo):
            print(f"⚠️ Archivo no encontrado: {archivo}")
            fallos += 1
            continue
            
        print(f"\n📂 Procesando {archivo}...")
        try:
            import json
            with open(archivo, 'r', encoding='utf-8') as f:
                data = json.load(f)
                
            # Usar el motor v5.0
            resultado = engine.sync_to_neon(data)
            
            if resultado:
                unidad = data.get('header', {}).get('unidad', 'Unidad Desconocida')
                print(f"   ✅ Sincronizado: {unidad}")
                exitos += 1
            else:
                print("   ❌ Fallo en sincronización Neon")
                fallos += 1
                
        except Exception as e:
            print(f"   ❌ Error procesando archivo: {e}")
            fallos += 1
            
    print("\n" + "="*40)
    print(f"🏆 REPORTE FLAGSHIP")
    print(f"Total: {len(archivos)}")
    print(f"Éxitos: {exitos}")
    print(f"Fallos: {fallos}")
    print("="*40)

if __name__ == "__main__":
    inyectar_flagship()
