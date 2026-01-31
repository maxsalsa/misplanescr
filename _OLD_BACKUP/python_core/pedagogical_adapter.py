import logging
import re

# Configuración de Logs Sovereign
logger = logging.getLogger(__name__)

class PedagogicalAdapter:
    """
    🔄 PEDAGOGICAL ADAPTER (THE TRANSLATOR) - KAIZEN 500.0
    Localizes global resources to ALL MEP (Costa Rica) levels and modalities.
    """

    def __init__(self):
        # Mapeo de Niveles Globales -> MEP
        self.level_map = {
            # PREESCOLAR
            "preescolar": "Preescolar - Materno/Transición",
            "infantil": "Preescolar - Materno/Transición",
            "kinder": "Preescolar - Materno/Transición",
            "3 años": "Preescolar - Materno",
            "4 años": "Preescolar - Interactivo I",
            "5 años": "Preescolar - Transición",

            # PRIMARIA (I Y II CICLO)
            "first grade": "I Ciclo - Primer Año",
            "1er grado": "I Ciclo - Primer Año",
            "primero de primaria": "I Ciclo - Primer Año",
            "2do grado": "I Ciclo - Segundo Año",
            "segundo de primaria": "I Ciclo - Segundo Año",
            "3er grado": "I Ciclo - Tercer Año",
            "tercero de primaria": "I Ciclo - Tercer Año",
            "4to grado": "II Ciclo - Cuarto Año",
            "cuarto de primaria": "II Ciclo - Cuarto Año",
            "5to grado": "II Ciclo - Quinto Año",
            "quinto de primaria": "II Ciclo - Quinto Año",
            "6to grado": "II Ciclo - Sexto Año",
            "sexto de primaria": "II Ciclo - Sexto Año",

            # SECUNDARIA (TERCER CICLO Y DIVERSIFICADA)
            "7mo grado": "Tercer Ciclo - Séptimo Año",
            "1er año secundaria": "Tercer Ciclo - Séptimo Año",
            "8vo grado": "Tercer Ciclo - Octavo Año",
            "2do año secundaria": "Tercer Ciclo - Octavo Año",
            "9no grado": "Tercer Ciclo - Noveno Año",
            "3er año secundaria": "Tercer Ciclo - Noveno Año",
            
            # DIVERSIFICADA / CTP
            "10mo grado": "Educación Diversificada - Décimo Año",
            "4to año secundaria": "Educación Diversificada - Décimo Año",
            "11vo grado": "Educación Diversificada - Undécimo Año",
            "5to año secundaria": "Educación Diversificada - Undécimo Año",
            "12vo grado": "Educación Técnica - Duodécimo Año",
        }

        # DUA Tags Dictionary (Neurodiversity)
        self.dua_keywords = {
            "visual": ["TEA", "Dislexia", "Estilo Visual"],
            "pictogramas": ["TEA", "No Verbal", "AAC"],
            "audio": ["Dislexia", "TDAH", "Estilo Auditivo"],
            "kinestésico": ["TDAH", "Estilo Kinestésico"],
            "recortar": ["Motora Fina", "Terapia Ocupacional"],
            "colorear": ["Motora Fina", "Relajación"],
            "juego": ["Gamificación", "TDAH", "Engagement"],
            "resumen": ["Alta Dotación", "Síntesis"],
            "proyecto": ["ABP", "Alta Dotación", "Trabajo Cooperativo"]
        }

    def localize_level(self, global_level_text):
        """Translates a string like '1er Grado' to 'I Ciclo - Primer Año'."""
        normalized = global_level_text.lower()
        
        # Exact/Partial Match
        for key, value in self.level_map.items():
            if key in normalized:
                return value
        
        # Heuristic Fallback
        if "universidad" in normalized:
            return "Educación Superior / Para Docentes"
        
        return "Nivel General / Transversal"

    def tag_dua(self, description):
        """Auto-tags content for inclusion based on keywords."""
        tags = set()
        normalized = description.lower()
        for keyword, conditions in self.dua_keywords.items():
            if keyword in normalized:
                for cond in conditions:
                    tags.add(cond)
        
        return list(tags)

    def validate_compliance(self, pedagogical_data):
        """
        Validates if the resource complies with basic 'Reglamento de Evaluación' rules.
        """
        issues = []
        # Rule 1: Must have some objective or outcome
        if not pedagogical_data.get("objectives"):
            issues.append("Falta Objetivo de Aprendizaje")
        
        # Rule 2: If it's a test/rubric, needs criteria
        # Logic to be expanded...
        
        is_compliant = len(issues) == 0
        return is_compliant, issues
