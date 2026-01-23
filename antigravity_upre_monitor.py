# -*- coding: utf-8 -*-
"""
ANTIGRAVITY UPRE MONITOR
Inteligencia Preventiva y Alerta Temprana (Permanencia y Éxito)
"""
import psycopg2
import os
import json
from psycopg2.extras import Json

# Fallback URL
NEON_URL = os.environ.get("NEON_URL", "postgresql://neondb_owner:npg_xK9vyfs2VpoQ@ep-wild-block-ahxdtdv6-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require")

class AntigravityUPREMonitor:
    """
    UPRE Monitor: Escanea expedientes en busca de factores de exclusión.
    """
    def __init__(self, db_url=None):
        self.db_url = db_url if db_url else NEON_URL
        self.super_user = "Max Salazar Sánchez"
        
        # Umbrales Críticos MEP
        self.umbrales = {
            "asistencia_critica": 85, # % Mínimo
            "nota_minima": 70, # Nota Mínima (varía por ciclo 65/70)
            "conducta_riesgo": 80
        }

    def verificar_alertas_upre(self, estudiante_id, historial_academico, historial_asistencia, historial_conducta=None):
        """
        Evalúa si un estudiante debe ser reportado en el sistema UPRE.
        """
        # 1. Análisis de Asistencia
        pct_asistencia = self._calcular_asistencia(historial_asistencia)
        
        # 2. Análisis Académico (Promedio Ponderado)
        promedio_notas = self._calcular_promedio_notas(historial_academico)
        
        # 3. Análisis Conductual (Si aplica)
        nota_conducta = 100
        if historial_conducta:
            nota_conducta = historial_conducta.get('nota_actual', 100)
            
        alertas = []
        acciones = []
        riesgo_detectado = False
        
        # Lógica de Detección
        if pct_asistencia < self.umbrales['asistencia_critica']:
            riesgo_detectado = True
            alertas.append(f"🔴 Ausentismo Crítico: {pct_asistencia}% (Umbral: {self.umbrales['asistencia_critica']}%)")
            acciones.append("Generar Boleta de Visita al Hogar")
            acciones.append("Referir a Beca Avancemos/Comedor")

        if promedio_notas < self.umbrales['nota_minima']:
            riesgo_detectado = True
            alertas.append(f"🟠 Riesgo Académico: Promedio {promedio_notas} (Bajo Rendimiento)")
            acciones.append("Activar Protocolo de Recuperación")
            acciones.append("Solicitar adecuación curricular (si aplica)")

        if nota_conducta < self.umbrales['conducta_riesgo']:
            riesgo_detectado = True
            alertas.append(f"🟡 Riesgo Conductual: Nota {nota_conducta}")
            acciones.append("Referir a Orientación")
            
        result = {
            "estudiante_id": estudiante_id,
            "status": "ALERTA UPRE ACTIVADA" if riesgo_detectado else "Estable",
            "nivel_riesgo": "Alto" if len(alertas) > 1 else ("Medio" if len(alertas) == 1 else "Bajo"),
            "detalles": alertas,
            "plan_accion_sugerido": acciones
        }
        
        return result

    def _calcular_asistencia(self, historial):
        # Lógica simplificada: espera un % o lista de booleanos
        if isinstance(historial, (int, float)): return historial
        if not historial: return 100
        # Si es lista de lecciones [1, 1, 0...]
        total = len(historial)
        presente = sum(historial)
        return round((presente/total)*100, 2)

    def _calcular_promedio_notas(self, historial):
        # Lógica simplificada: espera una nota o un cuadro
        if isinstance(historial, (int, float)): return historial
        # Si es un dict de componentes
        if isinstance(historial, dict):
            # Sumar ponderados si existen, o promedio simple de valores
            values = [v for k, v in historial.items() if isinstance(v, (int, float))]
            if not values: return 0
            return round(sum(values) / len(values), 2)
        return 0

# Test Drive
if __name__ == "__main__":
    monitor = AntigravityUPREMonitor()
    
    print("🚨 Escaneando Expedientes UPRE (Simulación)...")
    
    # Caso 1: Estudiante en Riesgo Total
    # - Asistencia 60% (Muy baja y peligrosa)
    # - Notas 65 (Reprobando)
    reporte_critico = monitor.verificar_alertas_upre(
        "EST-RIESGO-001", 
        historial_academico=65, 
        historial_asistencia=[1, 1, 0, 0, 1, 0, 0, 1, 1, 0], # 50% aprox
        historial_conducta={"nota_actual": 75}
    )
    print("\n[CASO CRÍTICO]")
    print(json.dumps(reporte_critico, indent=2, ensure_ascii=False))
    
    # Caso 2: Estudiante Estable
    reporte_estable = monitor.verificar_alertas_upre(
        "EST-ESTABLE-002",
        historial_academico=90,
        historial_asistencia=98
    )
    print("\n[CASO ESTABLE]")
    print(json.dumps(reporte_estable, indent=2, ensure_ascii=False))
