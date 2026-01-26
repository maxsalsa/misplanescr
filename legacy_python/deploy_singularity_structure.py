# -*- coding: utf-8 -*-
"""
ANTIGRAVITY DEPLOYER: SINGULARITY STRUCTURE
Generador de Contratos de Datos 'Singularity' (Plan con 6 Rutas Dinámicas)
"""
import json
import os
import hashlib
import hmac
from datetime import datetime

class AntigravitySingularityDeployer:
    def __init__(self):
        self.super_user = "Max Salazar Sánchez"
        # Simulación de Key segura
        self.master_key = os.environ.get("ANTIGRAVITY_MASTER_KEY", "MAX_SALAZAR_SECRET_DIAMOND_KEY_2026")

    def generar_plan_singularity(self, subarea, nivel, ra_code, tema):
        """
        Construye el 'Contrato de Datos' JSON con las 6 rutas de mediación.
        """
        print(f"💎 Generando Plan Singularity para: {subarea} - {tema}...")
        
        # 1. Definición de Rutas (Variedad Infinita)
        rutas = {
            "tecnica": {
                "titulo": "Ruta Técnica (Hands-On)",
                "actividad": "Desmontaje físico y reconocimiento de componentes en hardware real.",
                "evidencia": "Lista de Cotejo: Ensamble Correcto",
                "recursos": ["Kit de herramientas", "Gabinete ATX"]
            },
            "steam": {
                "titulo": "Ruta STEAM (Diseño)",
                "actividad": "Diseño lógico de arquitecturas de hardware usando diagramas de flujo.",
                "evidencia": "Prototipo Digital (Diagrama)",
                "recursos": ["Software LucidChart", "Pizarra"]
            },
            "ludica": {
                "titulo": "Ruta Lúdica (Gamificiación)",
                "actividad": "'Speed-Run' de identificación de componentes por equipos (Competencia).",
                "evidencia": "Tabla de Puntajes / Badge de Velocidad",
                "recursos": ["Cronómetro", "Componentes sueltos"]
            },
            "analitica": {
                "titulo": "Ruta Analítica (Científica)",
                "actividad": "Comparativa científica de rendimiento: Arquitectura x86 vs ARM.",
                "evidencia": "Cuadro Comparativo Técnico",
                "recursos": ["Benchmarks", "Artículos IEEE"]
            },
            "social": {
                "titulo": "Ruta Social (Ética)",
                "actividad": "Debate sobre la gestión de desechos electrónicos (E-Waste) y ciclo de vida.",
                "evidencia": "Ensayo Reflexivo",
                "recursos": ["Documental E-Waste", "Guía de debate"]
            },
            "inclusiva": {
                "titulo": "Ruta Inclusiva (DUA/TEA)",
                "actividad": "Uso de apoyos visuales y manipulación de piezas grandes con etiquetas de color.",
                "evidencia": "Puzzel de Hardware Completado",
                "recursos": ["Piezas etiquetadas", "Guía visual"]
            }
        }

        # 2. Estructura Base del Plan
        plan = {
            "metadata": {
                "super_usuario": self.super_user,
                "plan_id": f"PLAN-{subarea[:3].upper()}-{nivel}-{ra_code}",
                "version": "ANTIGRAVITY-CORE-V11",
                "generated_at": datetime.now().isoformat()
            },
            "contexto_curricular": {
                "subarea": subarea,
                "nivel": nivel,
                "resultado_aprendizaje": ra_code,
                "contenido": tema
            },
            "mediacion_dinamica": {
                "instruccion": "Seleccione la ruta de mediación para la sesión de hoy:",
                "rutas_disponibles": rutas
            },
            "indicadores_evaluacion": [
                {"nivel": "Inicial", "criterio": "Identifica componentes básicos."},
                {"nivel": "Intermedio", "criterio": "Relaciona función con componente."},
                {"nivel": "Avanzado", "criterio": "Diagnostica fallos en componentes."}
            ]
        }

        # 3. Sellado de Integridad (Ciberseguridad)
        # Firmamos el contenido 'mediacion_dinamica' para asegurar que nadie alteró las actividades
        payload_string = json.dumps(plan['mediacion_dinamica'], sort_keys=True)
        security_hash = hmac.new(
            self.master_key.encode('utf-8'),
            payload_string.encode('utf-8'),
            hashlib.sha256
        ).hexdigest()
        
        plan['security_hash'] = security_hash
        
        return plan

    def exportar_json(self, plan):
        filename = f"PLAN_SINGULARITY_{plan['contexto_curricular']['subarea'].replace(' ', '_').upper()}.json"
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(plan, f, indent=2, ensure_ascii=False)
        print(f"✅ Archivo generado: {filename} (Integrity Secured)")
        return filename

if __name__ == "__main__":
    deployer = AntigravitySingularityDeployer()
    
    # Generar Ejemplo Soporte TI
    plan_singular = deployer.generar_plan_singularity(
        subarea="Soporte TI",
        nivel="10mo",
        ra_code="RA1",
        tema="Arquitectura y Ensamble de Computadoras"
    )
    
    deployer.exportar_json(plan_singular)
