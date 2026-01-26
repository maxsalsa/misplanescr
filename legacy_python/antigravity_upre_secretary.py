# -*- coding: utf-8 -*-
"""
ANTIGRAVITY UPRE SECRETARY
Generador Automático de Fichas de Alerta Temprana (Formato UPRE)
"""
import psycopg2
import os
import json
from datetime import datetime

# Fallback URL
NEON_URL = os.environ.get("NEON_URL", "postgresql://neondb_owner:npg_xK9vyfs2VpoQ@ep-wild-block-ahxdtdv6-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require")

class AntigravityUPRESecretary:
    """
    UPRE Secretary: Redacta y estructura el informe técnico de Alerta Temprana.
    """
    def __init__(self, db_url=None):
        self.db_url = db_url if db_url else NEON_URL
        self.super_user = "Max Salazar Sánchez"

    def generar_reporte_upre_automatico(self, estudiante_id):
        """
        Construye el PDF (JSON Structure) de Alerta Temprana con datos reales.
        """
        print(f"📝 Redactando Informe UPRE para: {estudiante_id}...")
        
        # 1. Recolección de Evidencia (Mock DB Query)
        datos = self._obtener_historial_estudiante(estudiante_id)
        
        riesgos_detectados = []
        # Criterios UPRE
        if datos['ausencias_pct'] > 15 or datos['ausencias_consecutivas'] >= 3:
            riesgos_detectados.append("Ausentismo")
        if datos['promedio'] < 70:
            riesgos_detectados.append("Rendimiento Académico")
        if datos['conducta'] < 80 or datos['alertas_conductuales']:
            riesgos_detectados.append("Factores Socioeconómicos/Conducta")

        # 2. Construcción del Informe Formal
        informe_oficial = {
            "encabezado_administrativo": {
                "centro_educativo": "CTP/Liceo (Configurable en Perfil)",
                "docente_reporta": self.super_user,
                "asignatura_nivel": datos['contexto_academico'],
                "fecha_alerta": datetime.now().strftime("%d/%m/%Y")
            },
            "identificacion_riesgo": {
                "check_ausentismo": "Ausentismo" in riesgos_detectados,
                "check_rendimiento": "Rendimiento Académico" in riesgos_detectados,
                "check_socioeconomico": "Factores Socioeconómicos/Conducta" in riesgos_detectados
            },
            "detalle_evidencia": {
                "resumen_asistencia": f"El estudiante acumula {datos['ausencias_consecutivas']} ausencias consecutivas y un {datos['ausencias_pct']}% de ausentismo en el periodo.",
                "resumen_academico": f"Promedio ponderado actual: {datos['promedio']}. Indicadores con bajo logro: {', '.join(datos['indicadores_pendientes'])}."
            },
            "acciones_preventivas_sugeridas": self._sugerir_acciones(riesgos_detectados),
            "bloque_firmas": {
                "docente": True,
                "orientacion": True,
                "direccion": True
            },
            "metadata": {
                "status": "Generado - Pendiente de Firma",
                "formato": "UPRE-MEP-V10"
            }
        }
        
        return informe_oficial

    def _obtener_historial_estudiante(self, est_id):
        # Simulación de extracción desde Neon DB (tablas de notas y asistencia)
        # En producción: Query a analytics_antigravity y classroom_records_antigravity
        return {
            "nombre": "Estudiante Ejemplo UPRE",
            "contexto_academico": "Desarrollo Web - Nivel 2 Nocturno",
            "ausencias_pct": 20, # Critico (>15%)
            "ausencias_consecutivas": 4, # Critico (>=3)
            "promedio": 68, # Critico (<70)
            "conducta": 85,
            "alertas_conductuales": False,
            "indicadores_pendientes": ["ID-04: Protocolos de Seguridad", "ID-09: Despliegue SQL"]
        }

    def _sugerir_acciones(self, riesgos):
        acciones = []
        if "Ausentismo" in riesgos:
            acciones.append("1. Contacto telefónico inmediato con el hogar.")
            acciones.append("2. Aplicar estrategia de 'Re-vinculación Lúdica' en la próxima sesión.")
        if "Rendimiento Académico" in riesgos:
            acciones.append("3. Asignación de plan de recuperación enfocado en indicadores fallidos (ID-04, ID-09).")
            acciones.append("4. Adaptación temporal de evaluación (focalizada).")
        if "Factores Socioeconómicos/Conducta" in riesgos:
            acciones.append("5. Remisión inmediata al Departamento de Orientación.")
        return acciones

# Test Drive
if __name__ == "__main__":
    secretary = AntigravityUPRESecretary()
    
    # Generar Reporte
    reporte = secretary.generar_reporte_upre_automatico("EST-UPRE-001")
    print(json.dumps(reporte, indent=2, ensure_ascii=False))
