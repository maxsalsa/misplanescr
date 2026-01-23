# -*- coding: utf-8 -*-
"""
ANTIGRAVITY ULTRA: Adaptabilidad Total por Modalidad
Configuración de retos y binomios según tipo de asignatura
"""

# Configuración por modalidad
MODALIDAD_CONFIG = {
    "Técnica": {
        "binomio_docente": "facilita procesos industriales con equipos especializados",
        "binomio_estudiante": "construye soluciones técnicas mediante prototipado y simulación",
        "reto_bronce": {
            "tipo": "Diagnóstico Técnico",
            "enfoque": "Identificación de componentes y configuración básica",
            "ejemplo": "Analiza un sistema existente e identifica sus componentes principales"
        },
        "reto_plata": {
            "tipo": "Simulación Colaborativa",
            "enfoque": "Trabajo en equipo con herramientas industriales",
            "ejemplo": "En equipos, diseñen y simulen un proceso técnico completo"
        },
        "reto_oro": {
            "tipo": "Prototipo Industrial",
            "enfoque": "Proyecto integrador con cliente real/simulado",
            "ejemplo": "Desarrolla un prototipo funcional que resuelva un problema técnico específico"
        }
    },
    "Académica": {
        "binomio_docente": "facilita análisis crítico mediante debates y casos de estudio",
        "binomio_estudiante": "construye argumentos fundamentados y resuelve problemas complejos",
        "reto_bronce": {
            "tipo": "Análisis Individual",
            "enfoque": "Comprensión y síntesis de conceptos",
            "ejemplo": "Analiza un caso de estudio e identifica variables clave"
        },
        "reto_plata": {
            "tipo": "Debate Colaborativo",
            "enfoque": "Construcción colectiva de conocimiento",
            "ejemplo": "Participa en un debate estructurado defendiendo una postura con evidencia"
        },
        "reto_oro": {
            "tipo": "Investigación Aplicada",
            "enfoque": "Proyecto de investigación con metodología científica",
            "ejemplo": "Investiga un fenómeno local y presenta conclusiones con rigor académico"
        }
    },
    "Idiomas": {
        "binomio_docente": "facilita la comunicación auténtica mediante inmersión y role-playing",
        "binomio_estudiante": "produce textos y discursos orales con fluidez creciente",
        "reto_bronce": {
            "tipo": "Comprensión Auditiva/Lectora",
            "enfoque": "Decodificación y vocabulario contextual",
            "ejemplo": "Escucha/lee un material auténtico e identifica ideas principales"
        },
        "reto_plata": {
            "tipo": "Role-Playing Colaborativo",
            "enfoque": "Simulación de situaciones comunicativas reales",
            "ejemplo": "En parejas, simulen una situación cotidiana (compra, entrevista, debate)"
        },
        "reto_oro": {
            "tipo": "Producción Auténtica",
            "enfoque": "Presentación oral o escrita extensa",
            "ejemplo": "Graba un podcast/video o escribe un artículo sobre un tema de interés"
        }
    },
    "Taller": {
        "binomio_docente": "facilita la exploración vocacional mediante proyectos maker y descubrimiento",
        "binomio_estudiante": "explora diferentes oficios y crea productos con herramientas manuales",
        "reto_bronce": {
            "tipo": "Exploración Guiada",
            "enfoque": "Descubrimiento de herramientas y técnicas básicas",
            "ejemplo": "Experimenta con 3 herramientas diferentes y documenta su uso"
        },
        "reto_plata": {
            "tipo": "Proyecto Maker Colaborativo",
            "enfoque": "Creación de producto funcional en equipo",
            "ejemplo": "Construyan un prototipo funcional usando materiales reciclados"
        },
        "reto_oro": {
            "tipo": "Feria Vocacional",
            "enfoque": "Presentación de oficio/carrera explorada",
            "ejemplo": "Presenta tu proyecto final en una feria vocacional simulada"
        }
    }
}

def get_modality_config(tipo_asignatura: str) -> dict:
    """
    Retorna la configuración específica por modalidad
    
    Args:
        tipo_asignatura: "Técnica", "Académica", "Idiomas", o "Taller"
    
    Returns:
        dict: Configuración de binomios y retos
    """
    return MODALIDAD_CONFIG.get(tipo_asignatura, MODALIDAD_CONFIG["Técnica"])

if __name__ == "__main__":
    # Test
    for modalidad in MODALIDAD_CONFIG.keys():
        config = get_modality_config(modalidad)
        print(f"\n🎯 {modalidad}:")
        print(f"  Docente: {config['binomio_docente'][:50]}...")
        print(f"  Reto Oro: {config['reto_oro']['tipo']}")
