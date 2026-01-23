# -*- coding: utf-8 -*-
"""
INYECTOR OMNI v10.0
Ejecuta la Ingesta Masiva de las 2 Oleadas (Técnica y Académica)
"""
from antigravity_omni_engine import AntigravityOmniEngine

def ejecutar_omni_ingest():
    engine = AntigravityOmniEngine()
    
    # Muestra Representativa de los 170 Programas (Oleadas 1 y 2)
    # Cubriendo las áreas críticas solicitadas
    
    oleada_tecnica = [
        {
            "especialidad": "INFORMATICA", "materia": "Ciberseguridad", "nivel": "12mo", "unidad_id": "HACKING_U2", "bloque": "Tecnico",
            "datos_generales": {"subarea": "Seguridad Ofensiva"},
            "ras": [{"texto": "Ejecutar Pentesting Ético.", "tema": "Ciberseguridad", "saberes": ["Kali Linux", "Redes"]}]
        },
        {
            "especialidad": "INDUSTRIAL", "materia": "Mecánica de Precisión", "nivel": "11mo", "unidad_id": "TORNO_U3", "bloque": "Industrial",
            "datos_generales": {"subarea": "Mecanizado"},
            "ras": [{"texto": "Operar torno CNC con seguridad.", "tema": "Mantenimiento Industrial", "saberes": ["Metrología", "G-Code"]}]
        },
        {
            "especialidad": "COMERCIAL", "materia": "Contabilidad", "nivel": "10mo", "unidad_id": "IMPUESTOS_U4", "bloque": "Comercial",
            "datos_generales": {"subarea": "Legislación Tributaria"},
            "ras": [{"texto": "Declarar impuestos s/ renta.", "tema": "Contabilidad", "saberes": ["ATV", "Renta"]}]
        }
    ]
    
    oleada_academica = [
        {
            "especialidad": "ACADEMICA", "materia": "Ciencias (Química)", "nivel": "11mo", "unidad_id": "ESTEQ_U2", "bloque": "Ciencias",
            "datos_generales": {"subarea": "Estequiometría"},
            "ras": [{"texto": "Balancear ecuaciones químicas.", "tema": "Ciencias", "saberes": ["Moles", "Reacciones"]}]
        },
        {
            "especialidad": "ACADEMICA", "materia": "Español", "nivel": "7mo", "unidad_id": "LECTURA_U1", "bloque": "Letras",
            "datos_generales": {"subarea": "Comprensión Lectora"},
            "ras": [{"texto": "Analizar textos no literarios.", "tema": "Pensamiento Crítico", "saberes": ["Prensa", "Falacias"]}]
        }
    ]
    
    # Ejecución Masiva
    print("🌊 Iniciando Oleada 1: Fuerza de Trabajo (Técnica)...")
    engine.procesar_universo(oleada_tecnica)
    
    print("\n🌊 Iniciando Oleada 2: Tronco Académico...")
    engine.procesar_universo(oleada_academica)

if __name__ == "__main__":
    ejecutar_omni_ingest()
