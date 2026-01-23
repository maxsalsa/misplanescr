# -*- coding: utf-8 -*-
"""
ANTIGRAVITY LEARNING ECOSYSTEM
Generador de Recursos de Repaso, Gamificación y Vídeos Oficiales
"""
import json
import hashlib
import hmac
import os
import random
from datetime import datetime

class AntigravityLearningEcosystem:
    def __init__(self):
        self.super_user = "Max Salazar Sánchez"
        self.master_key = os.environ.get("ANTIGRAVITY_MASTER_KEY", "MAX_SALAZAR_SECRET_DIAMOND_KEY_2026")

    def generar_ecosistema_repaso(self, subarea, nivel):
        """
        Genera el catálogo de recursos educativos alineados a IT Essentials / MEP.
        """
        print(f"🎮 Construyendo Ecosistema de Aprendizaje para: {subarea} ({nivel})...")
        
        recursos = {
            "metadata": {
                "programa": subarea,
                "nivel": nivel,
                "aligned_with": "IT Essentials / Cisco / MEP 2026",
                "generated_at": datetime.now().isoformat()
            },
            "modulo_videos_oficiales": self._get_biblioteca_videos(),
            "zona_gamificacion": self._get_actividades_ludicas(),
            "simuladores_practica": self._get_simuladores(),
            "flashcards_inteligentes": self._get_flashcards()
        }
        
        # Sellar Contenido para Evitar Manipulación de Puntajes
        self._sellar_contenido(recursos)
        
        return recursos

    def _get_biblioteca_videos(self):
        return [
            {
                "titulo": "Arquitectura de Computadoras (Von Neumann)",
                "tema": "Fundamentos de TI",
                "url": "https://youtu.be/video_id_architecture",
                "duracion": "10:15",
                "offline_download": True
            },
            {
                "titulo": "Instalación Limpia de Windows 11",
                "tema": "Sistemas Operativos",
                "url": "https://youtu.be/video_id_win11",
                "duracion": "15:30",
                "offline_download": True
            },
            {
                "titulo": "Cómo ponchar un cable de red (Normas T568A/B)",
                "tema": "Redes y Conectividad",
                "url": "https://youtu.be/video_id_cabling",
                "duracion": "08:45",
                "offline_download": True
            },
            {
                "titulo": "Ingeniería Social y Phishing",
                "tema": "Ciberseguridad",
                "url": "https://youtu.be/video_id_security",
                "duracion": "12:00",
                "offline_download": True
            }
        ]

    def _get_actividades_ludicas(self):
        return [
            {
                "tipo": "Quiz Gamificado",
                "nombre": "BIOS Master Challenge",
                "objetivo": "Configurar orden de arranque en < 30 segs.",
                "xp_reward": 500,
                "mobile_view": "Story Mode"
            },
            {
                "tipo": "Escape Room Digital",
                "nombre": "Misión: La PC no enciende",
                "objetivo": "Diagnosticar fallo de RAM vs Fuente de Poder.",
                "xp_reward": 1000,
                "mobile_view": "Interactive Chat"
            },
            {
                "tipo": "Ticket de Salida",
                "nombre": "Fast Check: Puertos",
                "objetivo": "3 preguntas rápidas al final de la clase.",
                "xp_reward": 100,
                "mobile_view": "Pop-up Quiz"
            }
        ]

    def _get_simuladores(self):
        return [
            {
                "nombre": "Ensamble Virtual 3D",
                "plataforma": "Cisco IT Essentials Virtual Desktop",
                "acceso": "Integrado en Antigravity",
                "skill": "Motora Fina y Secuencia Lógica"
            }
        ]

    def _get_flashcards(self):
        return {
            "deck_name": "Dictado de Puertos y Conectores",
            "tarjetas": [
                {"frente": "HDMI", "reverso": "Audio/Video Digital de Alta Definición"},
                {"frente": "RJ-45", "reverso": "Conector Ethernet para Redes LAN"},
                {"frente": "DDR4", "reverso": "Ranura de Memoria RAM con muesca desplazada"}
            ]
        }

    def _sellar_contenido(self, data):
        """
        Firma el catálogo. Si un estudiante modifica el JSON local para 'ganar' XP, el hash no coincidirá.
        """
        payload = json.dumps(data, sort_keys=True)
        data['security_hash'] = hmac.new(
            self.master_key.encode(), payload.encode(), hashlib.sha256
        ).hexdigest()

    def exportar_catalogo(self, recursos):
        filename = "recursos_repaso_soporte_ti.json"
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(recursos, f, indent=2, ensure_ascii=False)
        print(f"📚 Catálogo de Recursos Generado: {filename}")
        print(f"🔒 Content Hash: {recursos['security_hash'][:16]}...")
        return filename

if __name__ == "__main__":
    ecosystem = AntigravityLearningEcosystem()
    catalog = ecosystem.generar_ecosistema_repaso("Soporte TI", "10mo")
    ecosystem.exportar_catalogo(catalog)
