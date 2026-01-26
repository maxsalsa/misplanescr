# -*- coding: utf-8 -*-
"""
INYECTOR DIAMANTE v7.0
Ejecuta la Ingesta de Matemáticas y Secretariado con Schema Core V7
"""
from antigravity_core_v7 import AntigravityCoreV7
from antigravity_super_admin import super_admin # Reusamos conector DB

def ejecutar_protocolo_diamante():
    print("💎 Ejecutando Protocolo Diamante v7.0...")
    core = AntigravityCoreV7()
    
    lote_v7 = [
        {
            "id_unico": "MAT_10_CIRCUNFERENCIA",
            "asignatura": "Matemáticas",
            "nivel": "10mo",
            "unidad": "Geometría Analítica (La Circunferencia)",
            "ra_focus": "Representar algebraicamente y gráficamente circunferencias.",
            "especialidad": "ACADEMICA" # Para ID builder
        },
        {
            "id_unico": "OFIM_12_MACROS",
            "asignatura": "Secretariado Ejecutivo / Ofimática",
            "nivel": "12mo",
            "unidad": "Automatización (Macros)",
            "ra_focus": "Automatizar tareas repetitivas mediante macros.",
            "especialidad": "TECNICA" # Para ID builder
        }
    ]
    
    exitos = 0
    for item in lote_v7:
        print(f"💠 Cristalizando: {item['unidad']}...")
        
        # 1. Fabricar JSON 7.0
        json_v7 = core.fabricar_diamante(item)
        
        # 2. Adaptar para Injection (SuperAdmin espera ciertas keys root o en json)
        # SuperAdmin v6 espera un objeto directo con 'mediacion_6_rutas' para validación
        # Pero estamos inyectando un esquema v7 anidado.
        # Vamos a envolverlo de forma inteligente para que pase la validación del SuperAdmin
        # y guarde el JSON v7 limpio en la columna json.
        
        # Extraemos rutas para el validador
        rutas_val = json_v7['memoria_oficial']['ingesta_data']['seccion_tecnica']['rutas_variedad_detalle']
        
        # Payload Híbrido:
        # - Keys raíz para SuperAdmin Logic (ID, Validations)
        # - Key data para el contenido real
        payload_db = {
            "especialidad": item['especialidad'],
            "nivel": item['nivel'],
            "unidad_id": item['id_unico'],
            # Bypass de validación manual o mapping
            "mediacion_6_rutas": rutas_val, 
            # El contenido real V7
            "memoria_oficial": json_v7['memoria_oficial']
        }
        
        # NOTA: AntigravitySuperAdmin inyecta todo el payload como JSON.
        # Esto guardará 'mediacion_6_rutas' duplicado en el root, pero asegura que 'memoria_oficial' esté dentro.
        # Es aceptable para mantener compatibilidad con el validador V6.
        
        if super_admin.inyectar_bloque_validado(payload_db):
            exitos += 1
            
    print(f"\n💎 LOTE DIAMANTE FINALIZADO: {exitos}/{len(lote_v7)}")

if __name__ == "__main__":
    ejecutar_protocolo_diamante()
