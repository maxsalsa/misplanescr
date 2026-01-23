# -*- coding: utf-8 -*-
"""
ANTIGRAVITY GAMIFIER
Motor de Gamificación, Recompensas y Experiencia de Usuario (UX)
"""
import json
import hashlib
import hmac
import os
from datetime import datetime

class AntigravityGamifier:
    def __init__(self):
        self.super_user = "Max Salazar Sánchez"
        self.master_key = os.environ.get("ANTIGRAVITY_MASTER_KEY", "MAX_SALAZAR_SECRET_DIAMOND_KEY_2026")

    def generar_manifiesto_gamificacion(self):
        """
        Genera el archivo maestro de configuración para la interfaz gamificada.
        """
        print(f"🎬 Construyendo Manifiesto de Gamificación para: {self.super_user}...")
        
        manifiesto = {
            "metadata": {
                "version": "GameCore v2.0",
                "engine": "Framer Motion + React Confetti",
                "seo_meta": "OpenGraph Ready",
                "generated_at": datetime.now().isoformat()
            },
            "sistema_medallas": self._definir_medallas(),
            "catalogo_retos": self._definir_retos(),
            "banco_frases": self._definir_frases_motivacionales(),
            "curva_progreso": {
                "nivel_1": {"xp": 0, "titulo": "Novato Técnico"},
                "nivel_2": {"xp": 1000, "titulo": "Especialista Junior"},
                "nivel_3": {"xp": 2500, "titulo": "Ingeniero Industrial"},
                "nivel_max": {"xp": 5000, "titulo": "Leyenda Antigravity"}
            }
        }
        
        # Sellar Manifiesto
        self._sellar_integridad(manifiesto)
        
        return manifiesto

    def _definir_medallas(self):
        return [
            {
                "id": "BADGE_BIOS_MASTER",
                "nombre": "Master en BIOS",
                "descripcion": "Configuró el orden de arranque en < 30 segundos.",
                "categoria": "Técnica",
                "tier": "DIAMANTE 💎",
                "icono": "bios_chip_gold.svg"
            },
            {
                "id": "BADGE_EFFICIENCY",
                "nombre": "Eficiencia Técnica",
                "descripcion": "Entregó el Portafolio de Evidencias antes de la fecha límite.",
                "categoria": "Responsabilidad",
                "tier": "ORO 🥇",
                "icono": "flash_speed.svg"
            },
            {
                "id": "BADGE_NETWORK_NINJA",
                "nombre": "Ninja de Redes",
                "descripcion": "Completó el ponchado de cable sin errores de par trenzado.",
                "categoria": "Habilidad Manual",
                "tier": "PLATA 🥈",
                "icono": "ethernet_cable.svg"
            }
        ]

    def _definir_retos(self):
        return [
            {
                "tipo": "Escape Room",
                "titulo": "Laboratorio en Crisis: La PC no enciende",
                "mecanica": "Resolver acertijos sobre voltajes, sockets y BIOS para salir.",
                "recompensa_xp": 800,
                "dispositivo_optimo": "PC (Teclado+Mouse)"
            },
            {
                "tipo": "Duelo de Trivias",
                "titulo": "Cyber-Safety Duel",
                "mecanica": "Competencia PvP en tiempo real sobre protocolos de seguridad.",
                "recompensa_xp": 300,
                "dispositivo_optimo": "Móvil (Touch Swipe)"
            }
        ]

    def _definir_frases_motivacionales(self):
        return [
            "¡Calidad de Grado Industrial, Max!",
            "¡Excelente! Tu código es tan limpio como una instalación nueva de Linux.",
            "Has alcanzado el Nivel 3. ¡Eres una máquina de productividad!",
            "¡Sigue así! La excelencia técnica es tu marca personal.",
            "¡Impecable! Este trabajo merece estar en el manual oficial."
        ]

    def _sellar_integridad(self, data):
        """
        Garantiza que nadie edite los valores de XP o desbloquee medallas ilegalmente.
        """
        payload = json.dumps(data, sort_keys=True)
        data['security_integrity_hash'] = hmac.new(
            self.master_key.encode(), payload.encode(), hashlib.sha256
        ).hexdigest()

    def exportar_manifiesto(self, data):
        filename = "antigravity_gamified_manifest.json"
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        print(f"🎮 Manifiesto Exportado: {filename}")
        print(f"🔒 Security Seal: {data['security_integrity_hash'][:16]}...")

if __name__ == "__main__":
    gamifier = AntigravityGamifier()
    manifest = gamifier.generar_manifiesto_gamificacion()
    gamifier.exportar_manifiesto(manifest)
