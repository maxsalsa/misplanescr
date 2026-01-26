# session_config.py
# Módulo de Configuración de Sesión Inteligente (SaaS MEP)

import os
import json

class SessionManager:
    """
    Gestor de Estado de Sesión y Roles.
    Determina qué módulos UI se activan según el perfil.
    """
    
    def __init__(self, user_role, institution_context="DIURNA"):
        self.user_role = user_role  # SUPER_ADMIN, DOCENTE, ESTUDIANTE, FAMILIA
        self.context = institution_context # DIURNA (Académica), NOCTURNA (Técnica)
        self.features = self._load_features()

    def _load_features(self):
        """Carga los 'flags' de funcionalidad permitidos para el rol."""
        
        # DEFINICIÓN DE PERMISOS (RBAC)
        permissions = {
            "SUPER_ADMIN": {
                "can_audit": True,
                "can_edit_memory": True,
                "view_analytics": True,
                "ui_theme": "dark_admin"
            },
            "DOCENTE": {
                "can_audit": False,
                "can_create_plan": True,
                "can_approve_quiz": True,
                "ui_theme": "professional_blue"
            },
            "ESTUDIANTE": {
                "can_create_plan": False,
                "can_take_quiz": True,
                "view_gamification": True,
                "ui_theme": "gamified_vibrant"
            },
            "FAMILIA": {
                "view_progress": True,
                "view_capsules": True,
                "ui_theme": "simple_clean"
            }
        }
        
        return permissions.get(self.user_role, {})

    def get_ui_config(self):
        """Retorna la configuración JSON para el Frontend (Next.js)"""
        return {
            "role": self.user_role,
            "context": self.context,
            "show_admin_panel": self.features.get("can_audit", False),
            "show_gamification": self.features.get("view_gamification", False),
            "theme_mode": self.features.get("ui_theme", "light")
        }

    def switch_context(self, new_context):
        """Cambia el contexto institucional (ej. de Escuela a Colegio Nocturno)"""
        if self.user_role == "DOCENTE":
            print(f"🔄 Cambiando contexto pedagógico a: {new_context}")
            # Aquí se conectaría con la API para filtrar la memoria vectorial
            self.context = new_context
            return True
        return False

# Simulación de Uso
if __name__ == "__main__":
    # Prueba: Docente cambiando de turno
    sesion = SessionManager("DOCENTE", "DIURNA")
    print("Configuración Inicial:", json.dumps(sesion.get_ui_config(), indent=2))
    
    sesion.switch_context("NOCTURNA")
    print("Nueva Configuración:", json.dumps(sesion.get_ui_config(), indent=2))
