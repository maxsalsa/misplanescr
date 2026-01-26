# -*- coding: utf-8 -*-
"""
INYECTOR OLEADA 2 (Idiomas & Exploratoria)
Ejecuta la Ingesta del Bloque de Captación (7mo-9no + Idiomas)
"""
from antigravity_omni_engine import AntigravityOmniEngine

def ejecutar_oleada_2():
    engine = AntigravityOmniEngine()
    
    # Lote de Idiomas (Conversacional y Técnico)
    lote_idiomas = [
        {
            "especialidad": "IDIOMAS", "materia": "Inglés Conversacional", "nivel": "7mo", "unidad_id": "ING_CONV_U1", "bloque": "Idiomas",
            "datos_generales": {"subarea": "Oral Communication"},
            "ras": [{"texto": "Participate in simple conversations.", "tema": "Inglés Técnico", "saberes": ["Greetings", "Role-play"]}]
        },
        {
            "especialidad": "IDIOMAS", "materia": "Francés", "nivel": "8vo", "unidad_id": "FRA_U2", "bloque": "Idiomas",
            "datos_generales": {"subarea": "Culture"},
            "ras": [{"texto": "Décrire des activités quotidiennes.", "tema": "Francés", "saberes": ["Routine", "Verbes"]}]
        },
        {
            "especialidad": "IDIOMAS", "materia": "Inglés Técnico", "nivel": "12mo", "unidad_id": "ING_TECH_U5", "bloque": "Idiomas",
            "datos_generales": {"subarea": "Customer Service"},
            "ras": [{"texto": "Handle customer complaints effectively.", "tema": "Troubleshooting", "saberes": ["Empathy", "Solutions"]}]
        }
    ]
    
    # Lote Exploratorio (Talleres 7mo-9no) to capture subscribers
    lote_exploratorio = [
        {
            "especialidad": "EXPLORATORIA", "materia": "Taller Exploratorio", "nivel": "7mo", "unidad_id": "ROBOTICA_U1", "bloque": "Vocacional",
            "datos_generales": {"subarea": "Robótica Básica"},
            "ras": [{"texto": "Construir robots simples con material reciclado.", "tema": "Vocacional", "saberes": ["Circuitos", "Motores"]}]
        },
        {
            "especialidad": "EXPLORATORIA", "materia": "Taller Exploratorio", "nivel": "8vo", "unidad_id": "MADERA_U1", "bloque": "Vocacional",
            "datos_generales": {"subarea": "Maderas"},
            "ras": [{"texto": "Aplicar técnicas de lijado y acabado.", "tema": "Vocacional", "saberes": ["Herramientas", "Seguridad"]}]
        },
        {
            "especialidad": "EXPLORATORIA", "materia": "Taller Exploratorio", "nivel": "9no", "unidad_id": "GASRTONOMIA_U1", "bloque": "Vocacional",
            "datos_generales": {"subarea": "Cocina Básica"},
            "ras": [{"texto": "Preparar platillos básicos con higiene.", "tema": "Vocacional", "saberes": ["Manipulación", "Recetas"]}]
        }
    ]
    
    print("\n🌊 Iniciando Oleada 2: Eje Lingüístico (Idiomas)...")
    engine.procesar_universo(lote_idiomas)
    
    print("\n🌊 Iniciando Oleada 2: Eje de Exploración (Talleres)...")
    engine.procesar_universo(lote_exploratorio)

if __name__ == "__main__":
    ejecutar_oleada_2()
