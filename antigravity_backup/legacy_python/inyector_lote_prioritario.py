# -*- coding: utf-8 -*-
"""
INYECTOR LOTE PRIORITARIO (Producción Industrial)
Generación Masiva de Especialidades de Alta Demanda (Informática, Contabilidad, Ejecutivo)
Meta: +60 Programas
"""
from antigravity_omni_engine import AntigravityOmniEngine
import random

def generar_lote_prioritario():
    engine = AntigravityOmniEngine()
    lote_masivo = []
    
    # 1. INFORMÁTICA (Desarrollo, Soporte, Ciberseguridad) - 10mo, 11mo, 12mo
    subareas_info = [
        ("Programación", "Desarrollo de Software", ["Python", "Java", "Web"]),
        ("Soporte TI", "Mantenimiento Hardware", ["Diagnóstico", "Ensamblaje", "Sistemas Op"]),
        ("Redes", "Infraestructura", ["Cisco", "Cabling", "Routing"]),
        ("Ciberseguridad", "Seguridad Defensiva", ["Firewalls", "Ethical Hacking", "Forensic"])
    ]
    
    for nivel in ["10", "11", "12"]:
        for sub, tema, saberes in subareas_info:
            lote_masivo.append({
                "especialidad": "INFORMATICA", "materia": f"{sub} {nivel}mo", "nivel": f"{nivel}mo", 
                "unidad_id": f"INFO_{sub[:3].upper()}_{nivel}_U1", "bloque": "Tecnico",
                "datos_generales": {"subarea": sub},
                "ras": [{"texto": f"Aplicar competencias de {tema} en entornos simulados.", "tema": tema, "saberes": saberes}]
            })

    # 2. CONTABILIDAD Y FINANZAS - 10mo, 11mo, 12mo
    subareas_conta = [
        ("Contabilidad", "Ciclo Contable", ["Asientos", "Mayorización", "Balance"]),
        ("Costos", "Contabilidad de Costos", ["Materia Prima", "Mano de Obra", "CIF"]),
        ("Auditoría", "Control Interno", ["Normas NIA", "Riesgos", "Papeles de Trabajo"])
    ]
    
    for nivel in ["10", "11", "12"]:
        for sub, tema, saberes in subareas_conta:
            lote_masivo.append({
                "especialidad": "CONTABILIDAD", "materia": f"{sub} {nivel}mo", "nivel": f"{nivel}mo", 
                "unidad_id": f"CONT_{sub[:3].upper()}_{nivel}_U1", "bloque": "Comercial",
                "datos_generales": {"subarea": sub},
                "ras": [{"texto": f"Ejecutar procesos de {tema} según normativa.", "tema": tema, "saberes": saberes}]
            })

    # 3. SECRETARIADO EJECUTIVO - 10mo, 11mo, 12mo
    subareas_sec = [
        ("Gestión", "Servicio al Cliente", ["Protocolo", "Etiqueta", "Comunicación"]),
        ("Ofimática", "Procesadores de Texto", ["Word Avanzado", "Excel", "Macros"]),
        ("Inglés Comercial", "Business English", ["Telephone", "Email", "Meetings"])
    ]
    
    for nivel in ["10", "11", "12"]:
        for sub, tema, saberes in subareas_sec:
            lote_masivo.append({
                "especialidad": "SECRETARIADO", "materia": f"{sub} {nivel}mo", "nivel": f"{nivel}mo", 
                "unidad_id": f"SECR_{sub[:3].upper()}_{nivel}_U1", "bloque": "Comercial",
                "datos_generales": {"subarea": sub},
                "ras": [{"texto": f"Demonstrate {tema} skills in office environments.", "tema": tema, "saberes": saberes}]
            })
            
    # 4. IDIOMAS (Inglés 3er Ciclo y Diversificada) - Para asegurar el ejemplo de 9no
    lote_masivo.append({
        "especialidad": "ACADEMICA", "materia": "Inglés", "nivel": "9no", "unidad_id": "ING_9_TECH", "bloque": "Idiomas",
        "datos_generales": {"subarea": "Technology"},
        "ras": [{"texto": "Expressing opinions about technology and its impact.", "tema": "Technology", "saberes": ["Debate", "Future Tense"]}]
    })

    print(f"🏭 PRODUCCIÓN EN SERIE: {len(lote_masivo)} Nuevos Programas Prioritarios.")
    print("🌊 Iniciando Inyección Masiva...")
    
    engine.procesar_universo(lote_masivo)

if __name__ == "__main__":
    generar_lote_prioritario()
