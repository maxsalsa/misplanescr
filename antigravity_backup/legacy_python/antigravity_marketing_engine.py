# -*- coding: utf-8 -*-
"""
ANTIGRAVITY MARKETING ENGINE
Motor de Neuromarketing, Gamificación Docente y Estrategia de Suscripción
"""
import json
import os
from datetime import datetime

class AntigravityMarketingEngine:
    def __init__(self):
        self.brand_name = "Antigravity (misplanescr.com)"
        self.target_audience = "Docentes Técnicos del MEP"

    def generar_manifiesto_marketing(self):
        """
        Genera la estrategia completa de Neuromarketing y Suscripción.
        """
        print(f"🧠 Diseñando Estrategia de Dopamina para: {self.brand_name}...")
        
        manifiesto = {
            "meta": {
                "fecha": datetime.now().isoformat(),
                "core_concept": "La Suscripción como Insignia de Honor",
                "gatillos_psicologicos": ["Alivio Cognitivo", "Estatus Profesional", "Curiosidad"]
            },
            "arquitectura_suscripcion": self._definir_slots(),
            "metricas_dopamina": self._calcular_alivio_cognitivo(),
            "gamificacion_docente": self._definir_medallas_docentes(),
            "embudo_conversion": self._estructurar_landing_page()
        }
        
        return manifiesto

    def _definir_slots(self):
        return {
            "modelo": "Slots de Especialidad",
            "niveles": [
                {
                    "nombre": "Especialista Unitario",
                    "slots": 1,
                    "acceso": "1 Subárea (ej: Soporte TI)",
                    "precio_psicologico": "Inversión Mínima vs Retorno Masivo"
                },
                {
                    "nombre": "Docente Multi-Skill",
                    "slots": 2,
                    "acceso": "2 Subáreas (ej: Soporte TI + Redes)",
                    "incentivo": "Descuento por expansión curricular"
                },
                {
                    "nombre": "FULL PASS (Super Admin)",
                    "slots": "INFINITO",
                    "acceso": "God Mode (Todas las áreas + Admin Panel)",
                    "exclusividad": "Solo para el Dueño de la Plataforma"
                }
            ]
        }

    def _calcular_alivio_cognitivo(self):
        """
        Gatillo 1: El Alivio de la Carga Cognitiva.
        """
        horas_manual = 4.5 # Horas promedio planeando a mano por semana
        horas_antigravity = 0.2 # Minutos generando en la plataforma
        ahorro_semanal = horas_manual - horas_antigravity
        
        return {
            "metricas_impacto": {
                "tiempo_ahorrado_semanal": f"{ahorro_semanal:.1f} horas",
                "tiempo_ahorrado_anual": f"{ahorro_semanal * 40:.1f} horas (aprox. 1 mes laboral)",
                "copy_impacto": "No estás comprando software. Estás comprando 170 horas de vida al año."
            }
        }

    def _definir_medallas_docentes(self):
        """
        Gatillo 2: Dopamina por Estatus.
        """
        return [
            {
                "titulo": "Especialista Certificado en Soporte TI",
                "requisito": "Suscripción Activa + 50 Planes Generados",
                "beneficio_visual": "Insignia Dorada en el Dashboard",
                "efecto": "Sentido de pertenencia a la élite técnica."
            },
            {
                "titulo": "Pionero de la Innovación",
                "requisito": "Uso temprano de la plataforma (Early Adopter)",
                "beneficio_visual": "Borde 'Holográfico' en el perfil",
                "efecto": "Reconocimiento de vanguardia."
            },
            {
                "titulo": "Dominio Curricular 100%",
                "requisito": "Uso de todas las rutas de mediación en un periodo",
                "beneficio_visual": "Barra de progreso completa (Efecto Zeigarnik resuelto)",
                "efecto": "Satisfacción de cierre."
            }
        ]

    def _estructurar_landing_page(self):
        """
        Gatillo 3: Embudo de Conversión.
        """
        return {
            "fase_atracccion": {
                "headline": "Sé el docente que todos admiran.",
                "subheadline": "Menos papeleo burocrático, más enseñanza real.",
                "visual": "Animación de un plan generándose en 3 segundos."
            },
            "fase_conversion": {
                "cta_primario": "Activar mi Core Pedagógico",
                "garantia": "Resultados inmediatos o cancela cuando quieras."
            },
            "fase_retencion": {
                "lock_screen": "🔒 Desbloquea 'Ciberseguridad Avanzada'",
                "upsell_strategy": "Mostrar contenido exclusivo grisado para activar curiosidad."
            }
        }

    def exportar_estrategia(self, data):
        filename = "MARKETING_STRATEGY_MANIFEST.md"
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(f"# 🧠 ANTIGRAVITY MARKETING STRATEGY\n\n")
            f.write(f"**Concepto Central:** {data['meta']['core_concept']}\n")
            f.write(f"**Gatillos:** {', '.join(data['meta']['gatillos_psicologicos'])}\n\n")
            
            f.write("## 1. Arquitectura de Suscripción (Slots)\n")
            for nivel in data['arquitectura_suscripcion']['niveles']:
                f.write(f"- **{nivel['nombre']}**: {nivel['acceso']} ({nivel.get('precio_psicologico') or nivel.get('incentivo')})\n")
            
            f.write("\n## 2. Métricas de Dopamina (Alivio Cognitivo)\n")
            f.write(f"> \"{data['metricas_dopamina']['metricas_impacto']['copy_impacto']}\"\n")
            f.write(f"- **Ahorro Anual**: {data['metricas_dopamina']['metricas_impacto']['tiempo_ahorrado_anual']}\n")
            
            f.write("\n## 3. Gamificación Docente (Estatus)\n")
            for badge in data['gamificacion_docente']:
                f.write(f"- 🏅 **{badge['titulo']}**: {badge['efecto']}\n")
            
            f.write("\n## 4. Embudo de Conversión (Landing Page)\n")
            f.write(f"- **Headline**: {data['embudo_conversion']['fase_atracccion']['headline']}\n")
            f.write(f"- **CTA**: {data['embudo_conversion']['fase_conversion']['cta_primario']}\n")
            f.write(f"- **Upsell**: {data['embudo_conversion']['fase_retencion']['lock_screen']}\n")
            
        print(f"✅ Estrategia Exportada: {filename}")

if __name__ == "__main__":
    engine = AntigravityMarketingEngine()
    manifest = engine.generar_manifiesto_marketing()
    engine.exportar_estrategia(manifest)
