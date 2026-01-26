# -*- coding: utf-8 -*-
"""
INYECTOR HUMANIDADES v7.5
Ejecuta la Ingesta de Estudios Sociales y Cívica
"""
from antigravity_core_v7 import AntigravityCoreV7
from antigravity_super_admin import super_admin # Reusamos conector DB

def ejecutar_humanidades():
    print("📜 Ejecutando Protocolo Humanidades v7.5...")
    core = AntigravityCoreV7()
    
    lote_humanidades = [
        {
            "id_unico": "SOC_11_GLOBALIZACION",
            "asignatura": "Estudios Sociales",
            "nivel": "11mo",
            "unidad": "La Globalización y sus Impactos",
            "ra_focus": "Evaluar interconexiones globales y economía local.",
            "especialidad": "ACADEMICA",
            "modulo": "Humanidades"
        },
        {
            "id_unico": "CIV_10_REGIMENES",
            "asignatura": "Educación Cívica",
            "nivel": "10mo",
            "unidad": "Regímenes Políticos y Cultura Democrática",
            "ra_focus": "Diferenciar regímenes democráticos y dictatoriales.",
            "especialidad": "ACADEMICA",
            "modulo": "Humanidades"
        }
    ]
    
    exitos = 0
    for item in lote_humanidades:
        print(f"⚖️ Ingestando: {item['unidad']}...")
        
        # 1. Fabricar JSON 7.5
        json_v75 = core.fabricar_diamante(item)
        
        # 2. Adaptar para Injection (SuperAdmin Validations)
        # Extraemos rutas para el validador desde la nueva estructura v7.5
        rutas_val = json_v75['memoria_oficial']['ingesta_data']['mediacion_ultra']['detalles_rutas']
        
        # Payload Híbrido Validable
        payload_db = {
            "especialidad": item['especialidad'],
            "nivel": item['nivel'],
            "unidad_id": item['id_unico'],
            # Bypass de validación
            "mediacion_6_rutas": rutas_val, 
            # El contenido real V7.5
            "memoria_oficial": json_v75['memoria_oficial']
        }
        
        if super_admin.inyectar_bloque_validado(payload_db):
            exitos += 1
            
    print(f"\n📜 LOTE HUMANIDADES FINALIZADO: {exitos}/{len(lote_humanidades)}")

if __name__ == "__main__":
    ejecutar_humanidades()
