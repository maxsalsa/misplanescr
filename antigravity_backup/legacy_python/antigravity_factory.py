# -*- coding: utf-8 -*-
"""
ANTIGRAVITY FACTORY (v6.0-Diamond)
Fábrica de JSONs de Grado Industrial para Neon DB.
"""
import json
from biblioteca_industrial import BibliotecaIndustrial

class AntigravityFactory:
    """
    Fábrica de JSONs de Grado Industrial para Neon DB.
    Garantiza: Orden, Binomio, Inclusión y 6 Rutas.
    """
    def __init__(self, super_usuario="Max Salazar Sánchez"):
        self.super_usuario = super_usuario

    def producir_unidad_ultra(self, programa_crudo):
        """
        Transforma un programa del MEP en una estructura JSON Diamante.
        """
        unidad_json = {
            "metadata": {
                "super_usuario": self.super_usuario,
                "identificador": f"{programa_crudo['area']}_{programa_crudo['nivel']}_{programa_crudo['unidad_id']}".upper(),
                "version": "6.0-Diamond"
            },
            "encabezado": {
                "materia": programa_crudo['materia'],
                "nivel": programa_crudo['nivel'],
                "especialidad": programa_crudo.get('especialidad', 'Académica')
            },
            "cuerpo": self._generar_columnas_mep(programa_crudo)
        }
        return unidad_json

    def _generar_columnas_mep(self, programa):
        ras = programa.get('ras', [])
        materia = programa.get('materia', '')
        # Generar lista de objetos RA con sus rutas
        return [self._redactar_binomio_y_rutas(ra, materia) for ra in ras]

    def _redactar_binomio_y_rutas(self, ra, materia):
        # Obtener rutas de la biblioteca industrial
        # Asumimos que el RA tiene un tema implícito o pasamos la materia
        rutas = BibliotecaIndustrial.get_rutas_ultra(materia, ra.get('tema', 'General'))
        
        return {
            "ra": ra.get('texto'),
            "saberes": ra.get('saberes', []),
            "indicador": ra.get('indicador', ''),
            "mediacion_6_rutas": rutas, # Aquí van las 6 rutas dinámicas
            "evidencias": {
                "conocimiento": "Prueba o Mapa Mental",
                "desempeño": "Lista de Cotejo o Simulación",
                "producto": "Proyecto o Bitácora"
            }
        }
