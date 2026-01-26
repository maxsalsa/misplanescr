# -*- coding: utf-8 -*-
"""
ANTIGRAVITY CLASSROOM MANAGER (MEP STRICT)
Motor de Evaluación y Control de Asistencia con Rigor Reglamentario
"""
import psycopg2
import os
import json
from psycopg2.extras import Json

# Fallback URL
NEON_URL = os.environ.get("NEON_URL", "postgresql://neondb_owner:npg_xK9vyfs2VpoQ@ep-wild-block-ahxdtdv6-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require")

class AntigravityClassroomManager:
    """
    Gestor de Aula: Procesa evaluación y asistencia con lógica MEP.
    Convierte lo visual (Rúbricas, Checkbux) en NOTA NUMÉRICA estricta.
    """
    def __init__(self, db_url=None):
        self.db_url = db_url if db_url else NEON_URL
        self.super_user = "Max Salazar Sánchez"

    def calcular_nota_final_automatica(self, estudiante_id, datos_materia, registros_estudiante):
        """
        Ejecuta el cálculo automático basado en los pesos del MEP.
        Asignatura Académica vs Técnica.
        """
        # Configuración de Pesos (Ejemplo: Académica standard)
        # Esto debería venir de la DB 'normativa'
        pesos = datos_materia.get('pesos', {
            "cotidiano": 45, # %
            "pruebas": 35,
            "tareas": 10,
            "proyecto": 0, # A veces no aplica
            "asistencia": 10
        })
        
        # 1. CÁLCULO DE TRABAJO COTIDIANO (De lo Visual a lo Numérico)
        # Origen: Indicadores de la Unidad (Rúbricas/Listas de Cotejo)
        # Ejemplo: 3 pts (Avanzado), 2 pts (Intermedio), 1 pt (Inicial)
        puntos_obtenidos_cot = 0
        puntos_totales_cot = 0
        
        for indicador in registros_estudiante.get('indicadores_cotidiano', []):
            # indicador['nivel_logro'] puede ser 3, 2, 1
            puntos_obtenidos_cot += indicador.get('puntos_logrados', 0)
            puntos_totales_cot += indicador.get('puntos_posibles', 3) # Default 3 pts per indicator
            
        nota_cotidiano_raw = (puntos_obtenidos_cot / puntos_totales_cot) * 100 if puntos_totales_cot > 0 else 0
        nota_cotidiano_ponderada = nota_cotidiano_raw * (pesos['cotidiano'] / 100)

        # 2. CÁLCULO DE ASISTENCIA (Bloques 1-4 Lecciones)
        # Regla: Ausencia Injustificada (AI) resta puntos directos o porcentaje
        # Simplificación MEP: % Presencialidad * Valor Porcentual
        asistencias = registros_estudiante.get('registro_asistencia', [])
        total_lecciones = 0
        lecciones_presentes = 0
        
        for dia in asistencias:
            bloque = dia.get('bloque_lecciones', 1)  # 1 a 4 lecciones
            estado = dia.get('estado') # P (Presente), AI (Ausencia Injust), TJ (Tardía Just), etc.
            
            total_lecciones += bloque
            if estado == 'P' or estado == 'AJ': # AJ suele contar como presente para nota, pero se registra
                lecciones_presentes += bloque
            elif estado == 'TJ':
                lecciones_presentes += bloque # Depende reglamento exacto, a veces tardías suman fallas
            # AI resta todo el bloque
            
        nota_asistencia_raw = (lecciones_presentes / total_lecciones) * 100 if total_lecciones > 0 else 100
        nota_asistencia_ponderada = nota_asistencia_raw * (pesos['asistencia'] / 100)

        # 3. OTROS COMPONENTES (Pruebas, Tareas, Proyectos)
        # Simples promedios aritméticos de notas 0-100
        promedio_pruebas = self._promedio(registros_estudiante.get('pruebas', []))
        nota_pruebas_pond = promedio_pruebas * (pesos['pruebas'] / 100)
        
        promedio_tareas = self._promedio(registros_estudiante.get('tareas', []))
        nota_tareas_pond = promedio_tareas * (pesos['tareas'] / 100)
        
        promedio_proyecto = self._promedio(registros_estudiante.get('proyectos', []))
        nota_proyecto_pond = promedio_proyecto * (pesos['proyecto'] / 100)

        # 4. NOTA FINAL (Suma de Ponderados)
        nota_final = nota_cotidiano_ponderada + nota_asistencia_ponderada + nota_pruebas_pond + nota_tareas_pond + nota_proyecto_pond
        
        return {
            "estudiante_id": estudiante_id,
            "desglose": {
                "cotidiano": {"pts_raw": puntos_obtenidos_cot, "calif_100": round(nota_cotidiano_raw, 2), "ponderado": round(nota_cotidiano_ponderada, 2)},
                "asistencia": {"lecciones_total": total_lecciones, "lecciones_ok": lecciones_presentes, "ponderado": round(nota_asistencia_ponderada, 2)},
                "pruebas": {"promedio": round(promedio_pruebas, 2), "ponderado": round(nota_pruebas_pond, 2)},
                "tareas": {"promedio": round(promedio_tareas, 2), "ponderado": round(nota_tareas_pond, 2)},
                "proyecto": {"promedio": round(promedio_proyecto, 2), "ponderado": round(nota_proyecto_pond, 2)}
            },
            "nota_final_periodo": round(nota_final, 2),
            "estado": "APROBADO" if nota_final >= 65 else "REPROBADO" # 65 o 70 segun ciclo
        }

    def _promedio(self, lista_notas):
        if not lista_notas: return 0
        return sum(lista_notas) / len(lista_notas)

    def procesar_cierre_periodo(self, grupo_id, periodo, datos_clase):
        """
        Calcula notas finales y genera el JSON consolidado.
        """
        print(f"🏫 Procesando Cierre Configurable: {grupo_id} ({periodo})...")
        registros_procesados = []
        
        config_materia = datos_clase.get('configuracion_materia', {}) # Pesos especificos
        
        for est in datos_clase.get('estudiantes', []):
             resultado = self.calcular_nota_final_automatica(est['id'], config_materia, est)
             registros_procesados.append(resultado)

        json_maestro = {
            "registro_clase": {
                "docente_admin": self.super_user,
                "grupo_id": grupo_id,
                "periodo": periodo,
                "configuracion_usada": config_materia,
                "evaluacion_sumativa_grupo": registros_procesados
            }
        }
        
        self._guardar_registro(grupo_id, periodo, json_maestro)

    def _guardar_registro(self, grupo_id, periodo, data):
        try:
            with psycopg2.connect(self.db_url) as conn:
                with conn.cursor() as cur:
                    cur.execute("""
                        INSERT INTO classroom_records_antigravity (id, docente_admin, grupo_id, periodo, registro_json, updated_at)
                        VALUES (gen_random_uuid(), %s, %s, %s, %s, NOW())
                    """, (self.super_user, grupo_id, periodo, Json(data)))
            print(f"✅ Registro Riguroso Sincronizado: {grupo_id}")
        except Exception as e:
            print(f"❌ Error Classroom DB: {e}")

if __name__ == "__main__":
    manager = AntigravityClassroomManager()
    
    # Datos Mock Detallados (Rigor MEP)
    mock_data = {
        "configuracion_materia": {"pesos": {"cotidiano": 45, "pruebas": 35, "tareas": 10, "proyecto": 0, "asistencia": 10}},
        "estudiantes": [
            {
                "id": "EST-001",
                "indicadores_cotidiano": [
                    {"indicador": "Identifica hardware", "nivel_logro": 3, "puntos_posibles": 3, "puntos_logrados": 3},
                    {"indicador": "Explica topologías", "nivel_logro": 2, "puntos_posibles": 3, "puntos_logrados": 2},
                    {"indicador": "Configura IP", "nivel_logro": 3, "puntos_posibles": 3, "puntos_logrados": 3}
                ],
                "registro_asistencia": [
                    {"fecha": "2026-02-10", "bloque_lecciones": 2, "estado": "P"},
                    {"fecha": "2026-02-17", "bloque_lecciones": 2, "estado": "AI"}, # Pierde 2 lecciones
                    {"fecha": "2026-02-24", "bloque_lecciones": 2, "estado": "P"}
                ],
                "pruebas": [85, 90],
                "tareas": [100, 100],
                "proyectos": []
            }
        ]
    }
    
    manager.procesar_cierre_periodo("10-1_PROTOCOLOS_MEP", "I_Semestre_2026", mock_data)
