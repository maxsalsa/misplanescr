# -*- coding: utf-8 -*-
"""
ANTIGRAVITY CORE v8.0 (Idiomas)
Motor de Ingesta Universal (Técnica + Académica + Humanidades + Idiomas)
"""
import json
from biblioteca_industrial import BibliotecaIndustrial

class AntigravityCoreV7:
    """
    Motor v8.0 para Estructuras de Memoria Oficial Diamante.
    Soporta módulos específicos: Humanidades, Idiomas, Técnica, Académica.
    """
    def __init__(self, admin="Max Salazar Sánchez"):
        self.admin = admin
        self.version = "8.0-Diamond-Universal"

    def fabricar_diamante(self, data_raw):
        """
        Genera el JSON final con la estructura adaptable v8.0.
        """
        # Recuperar estrategias contextualizadas
        rutas = BibliotecaIndustrial.get_rutas_ultra(
            data_raw.get('asignatura', ''), 
            data_raw.get('unidad', '')
        )
        # Fix para Idiomas (keyword matching extra)
        if not rutas and "trouble" in data_raw.get('unidad', '').lower():
             rutas = BibliotecaIndustrial.get_rutas_ultra("Inglés Técnico", "Troubleshooting")
        
        # Estructura Binomio Sagrado
        binomio_docente = "El docente facilita..."
        binomio_estudiante = "El estudiante construye..."
        if rutas:
            binomio_docente = rutas[0]['docente']
            binomio_estudiante = rutas[0]['estudiante']

        modulo = data_raw.get('modulo', 'General')
        bloque = data_raw.get('bloque', modulo) # V8 usa 'bloque' en Idiomas
        
        # Estructura Base
        struct = {
            "memoria_oficial": {
                "admin": self.admin,
                "version": self.version,
                "bloque": bloque, # Idiomas v8 requirement
                "ingesta_data": {
                    "id_unico": data_raw.get('id_unico'),
                    "asignatura": data_raw.get('asignatura'),
                    "nivel": data_raw.get('nivel'),
                    "unidad": data_raw.get('unidad'),
                    "ra_focus": data_raw.get('ra_focus'),
                    # Adaptable output based on module
                }
            }
        }
        
        # Adaptador de Esquema
        if bloque == "Idiomas":
             struct["memoria_oficial"]["ingesta_data"]["mediacion_ultra"] = {
                "binomio_docente": binomio_docente,
                "binomio_estudiante": binomio_estudiante,
                "rutas_variedad": [r['tipo'].split('/')[0].strip() for r in rutas],
                "ajustes_inclusion": {
                    "discapacidad_auditiva": "Uso de subtítulos/guiones.",
                    "tadh": "Gamificación de respuesta rápida.",
                    "especificos": [r.get('ajuste_inclusion') for r in rutas]
                }
            }
             struct["memoria_oficial"]["ingesta_data"]["evidencias"] = {
                "conocimiento": "Prueba de vocabulario.",
                "desempeño": "Role-play grabado.",
                "producto": "Guía o Manual visual."
            }
             
        elif modulo == "Humanidades":
            struct["memoria_oficial"]["ingesta_data"]["mediacion_ultra"] = {
                "binomio_docente": binomio_docente,
                "binomio_estudiante": binomio_estudiante,
                "rutas_variedad": [r['tipo'].split('/')[0].strip() for r in rutas],
                "detalles_rutas": rutas, 
                "ajustes_inclusion": {
                    "dislexia": "Uso de audiolibros.",
                    "adecuacion_acceso": "Tipografía accesible.",
                    "especificos": [r.get('ajuste_inclusion') for r in rutas]
                }
            }
            struct["memoria_oficial"]["ingesta_data"]["evidencias"] = {
                "conocimiento": "Ensayo o Prueba.",
                "desempeño": "Debate o Foro.",
                "producto": "Infografía o Mapa."
            }
        else:
            # Default Technical Schema
            struct["memoria_oficial"]["ingesta_data"]["seccion_tecnica"] = {
                "binomio_docente": binomio_docente,
                "binomio_estudiante": binomio_estudiante,
                "rutas_variedad_detalle": rutas,
                "rutas_variedad_tags": [r['tipo'].split('/')[0].strip() for r in rutas],
                "ajustes_inclusion": {
                    "tea": "Adaptaciones específicas.",
                    "alta_dotacion": "Retos de complejidad.",
                    "general": [r.get('ajuste_inclusion') for r in rutas]
                }
            }

        return struct
