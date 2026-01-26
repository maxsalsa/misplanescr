# -*- coding: utf-8 -*-
"""
ANTIGRAVITY ALERT SYSTEM
Sistema de Alerta Temprana, Gestión de Evidencias y Matrices de Cotejo (Niveles 1-3)
"""
import csv
import json
import os
from datetime import datetime

class AntigravityAlertSystem:
    def __init__(self):
        self.super_user = "Max Salazar Sánchez"
        
        # Base de Conocimiento de Indicadores (Lista de Cotejo Oficial)
        self.lista_cotejo = [
            {
                "id": "I1",
                "tema": "Componentes Internos",
                "nivel_1": "Presenta dificultades para identificar los componentes.",
                "nivel_2": "Identifica algunos componentes, pero omite detalles.",
                "nivel_3": "Identifica y describe todos con ejemplos claros."
            },
            {
                "id": "I2",
                "tema": "Desmontaje y Ensamble",
                "nivel_1": "Presenta confusión al explicar el proceso.",
                "nivel_2": "Explica el proceso, pero omite pasos clave.",
                "nivel_3": "Explica el proceso de manera clara y detallada."
            }
        ]
        
        # Perfiles de Estudiantes (Simulación Real)
        self.estudiantes = [
            {
                "nombre": "María López",
                "seccion": "10-1",
                "indicador_actual": "Identifica componentes...",
                "nivel_logro": 1,
                "evidencia_status": "NO_ENTREGADA"
            },
            {
                "nombre": "Carlos Solís",
                "seccion": "10-1",
                "indicador_actual": "Explica desmontaje...",
                "nivel_logro": 2,
                "evidencia_status": "INCOMPLETA"
            },
            {
                "nombre": "Lucía Méndez",
                "seccion": "10-1",
                "indicador_actual": "Identifica componentes...",
                "nivel_logro": 3,
                "evidencia_status": "COMPLETA"
            }
        ]

    def analizar_riesgos_upre(self):
        """
        Analiza el estado de cada estudiante y determina la alerta UX/UI.
        """
        print(f"🚨 Ejecutando Análisis de Riesgo UPRE para: {self.super_user}...")
        
        reporte_alertas = []
        
        for est in self.estudiantes:
            alerta = self._determinar_estado(est)
            
            registro = {
                "Estudiante": est['nombre'],
                "Indicador": est['indicador_actual'],
                "Nivel (1-3)": est['nivel_logro'],
                "Descripción Logro": self._get_descripcion_nivel(est['nivel_logro']),
                "Estado Evidencia": est['evidencia_status'],
                "Alerta UX": alerta['mensaje'],
                "Color UI": alerta['color'],
                "Acción Automática": alerta['accion']
            }
            reporte_alertas.append(registro)
            print(f"   👤 {est['nombre']}: {alerta['mensaje']}")

        return reporte_alertas

    def _determinar_estado(self, estudiante):
        # Lógica UPRE: Nivel 1 o Sin Evidencia -> Alerta Roja
        if estudiante['nivel_logro'] == 1 or estudiante['evidencia_status'] == "NO_ENTREGADA":
            return {
                "mensaje": "🚨 UPRE: Riesgo Académico",
                "color": "ROJO",
                "accion": "Notificación Push + Ficha UPRE Auto-completada"
            }
        # Nivel 2 o Incompleta -> Alerta Amarilla
        elif estudiante['nivel_logro'] == 2 or estudiante['evidencia_status'] == "INCOMPLETA":
            return {
                "mensaje": "🟡 Seguimiento Requerido",
                "color": "AMARILLO",
                "accion": "Recordatorio de Entrega / Refuerzo"
            }
        # Nivel 3 y Completa -> Verde
        else:
            return {
                "mensaje": "🟢 Estable",
                "color": "VERDE",
                "accion": "Ninguna (Felicitar)"
            }

    def _get_descripcion_nivel(self, nivel):
        # Mapeo simple basado en la Lista de Cotejo I1 (ejemplo genérico para el reporte)
        if nivel == 1: return "Presenta dificultades para identificar componentes."
        if nivel == 2: return "Identifica algunos componentes, pero omite detalles."
        if nivel == 3: return "Identifica y describe todos con ejemplos claros."
        return "N/A"

    def generar_artefactos(self, alertas):
        # 1. CSV Reporte de Alertas
        csv_alertas = "reporte_alertas_evidencias_antigravity.csv"
        with open(csv_alertas, 'w', newline='', encoding='utf-8') as f:
            writer = csv.DictWriter(f, fieldnames=alertas[0].keys())
            writer.writeheader()
            writer.writerows(alertas)
            
        # 2. CSV Matriz Lista de Cotejo
        csv_matriz = "matriz_lista_cotejo_1_al_3.csv"
        with open(csv_matriz, 'w', newline='', encoding='utf-8') as f:
            writer = csv.DictWriter(f, fieldnames=["Indicador", "Nivel 1 (Inicial)", "Nivel 2 (Intermedio)", "Nivel 3 (Avanzado)"])
            writer.writeheader()
            for item in self.lista_cotejo:
                writer.writerow({
                    "Indicador": f"{item['id']}: {item['tema']}",
                    "Nivel 1 (Inicial)": item['nivel_1'],
                    "Nivel 2 (Intermedio)": item['nivel_2'],
                    "Nivel 3 (Avanzado)": item['nivel_3']
                })
                
        print(f"\n✅ Artefactos Generados: {csv_alertas}, {csv_matriz}")

if __name__ == "__main__":
    system = AntigravityAlertSystem()
    alertas = system.analizar_riesgos_upre()
    system.generar_artefactos(alertas)
