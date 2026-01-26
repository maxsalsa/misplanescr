# -*- coding: utf-8 -*-
"""
ANTIGRAVITY DATA INJECTOR
Generador de Ecosistema de Datos Completos (7 Tablas Inteligentes)
"""
import json
import hashlib
import hmac
import os
import random
from datetime import datetime

class AntigravityDataInjector:
    def __init__(self):
        self.super_user = "Max Salazar Sánchez"
        self.master_key = os.environ.get("ANTIGRAVITY_MASTER_KEY", "MAX_SALAZAR_SECRET_DIAMOND_KEY_2026")

    def generar_ecosistema_completo(self):
        """
        Genera el JSON maestro con las 7 tablas inteligentes pobladas.
        """
        print(f"💉 Inyectando Ecosistema de Datos Full-Stack para: {self.super_user}...")
        
        ecosistema = {
            "metadata": {
                "fecha_generacion": datetime.now().isoformat(),
                "autor": self.super_user,
                "version_core": "Antigravity v15.0"
            },
            "tablas_inteligentes": {
                "programas": self._generar_programas(),
                "estudiantes": self._generar_estudiantes(),
                "evaluaciones": self._generar_evaluaciones(),
                "asistencia": self._generar_asistencia(),
                "conducta": self._generar_conducta(),
                "incidentes": self._generar_incidentes(),
                "alertas_upre": self._generar_alertas_upre()
            }
        }
        
        # Validar Integridad Global
        self._sellar_ecosistema(ecosistema)
        
        return ecosistema

    def _generar_programas(self):
        # Muestra de los 170 planes
        return [
            {
                "id": "PROG-TI-10-1",
                "titulo": "Soporte TI 10mo - Fundamentos",
                "rutas_activas": ["Técnica", "STEAM", "Lúdica", "Analítica", "Social", "Inclusiva"],
                "indicadores": [
                    {"nivel": "Inicial", "texto": "Identifica componentes internos del hardware."},
                    {"nivel": "Avanzado", "texto": "Explica el ensamble de computadoras bajo normas de seguridad."}
                ],
                "security_hash": self._hash_record("PROG-TI-10-1")
            },
            {
                "id": "PROG-WEB-N2",
                "titulo": "Desarrollo Web - Nivel 2 Nocturno",
                "rutas_activas": 6,
                "security_hash": self._hash_record("PROG-WEB-N2")
            }
        ]

    def _generar_estudiantes(self):
        return [
            {"id": "EST-10-1-001", "nombre": "Carlos Solís", "seccion": "10-1", "modalidad": "Diurna"},
            {"id": "EST-N2-005", "nombre": "Ana Méndez", "seccion": "Nivel 2", "modalidad": "Nocturna"},
            {"id": "EST-RIESGO-99", "nombre": "Jorge Fallas", "seccion": "10-1", "modalidad": "Diurna"}
        ]

    def _generar_evaluaciones(self):
        return [
            {
                "estudiante_id": "EST-10-1-001", 
                "materia": "Soporte TI",
                "rubro": "Cotidiano",
                "nota": 100, 
                "observacion": "Excelente dominio del ensamble.",
                "security_hash": self._hash_record("EVAL-001")
            }
        ]

    def _generar_asistencia(self):
        return [
            {
                "estudiante_id": "EST-RIESGO-99",
                "fecha": "2026-02-15",
                "estado": "Ausente",
                "bloque": "4 Lecciones",
                "security_hash": self._hash_record("ASIST-99")
            }
        ]

    def _generar_conducta(self):
        return [
            {
                "estudiante_id": "EST-10-1-001",
                "falta": "Uso de celular en clase",
                "tipo": "Leve",
                "puntos_restados": 5,
                "nota_conducta_actual": 95,
                "security_hash": self._hash_record("COND-001")
            }
        ]

    def _generar_incidentes(self):
        return [
            {
                "id": "INC-ARMAS-01",
                "tipo": "Hallazgo Armas",
                "estudiante_reportado": "Carlos Solís (10-1)",
                "protocolo_paso_actual": 2, 
                "descripcion": "Hallazgo de navaja en el bulto durante taller de hardware.",
                "estado": "ACTIVO - Protocolo en Curso",
                "seguridad": "Integrity Seal Verified ✅"
            }
        ]

    def _generar_alertas_upre(self):
        return [
            {
                "estudiante_id": "EST-RIESGO-99",
                "riesgo": "Ausentismo > 15%",
                "mensaje": "El estudiante ha faltado a 3 bloques consecutivos.",
                "accion_sugerida": "Visita al Hogar",
                "security_hash": self._hash_record("UPRE-99")
            }
        ]

    def _hash_record(self, record_id):
        return hmac.new(
            self.master_key.encode(), 
            record_id.encode(), 
            hashlib.sha256
        ).hexdigest()

    def _sellar_ecosistema(self, data):
        # Sello global
        payload = json.dumps(data['tablas_inteligentes'], sort_keys=True)
        data['metadata']['global_integrity_hash'] = hmac.new(
            self.master_key.encode(), payload.encode(), hashlib.sha256
        ).hexdigest()

    def exportar_json(self, data):
        filename = "antigravity_full_data_injection.json"
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        print(f"📦 Archivo Inyectado: {filename}")
        print(f"🔒 Global Hash: {data['metadata']['global_integrity_hash'][:16]}...")

if __name__ == "__main__":
    injector = AntigravityDataInjector()
    data = injector.generar_ecosistema_completo()
    injector.exportar_json(data)
