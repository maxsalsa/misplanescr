import os
import json
import logging
import uuid
from neon_injector import NeonInjector

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - [MUSIC-LXP] - %(message)s')
logger = logging.getLogger(__name__)

class MusicGamifiedInjector:
    """
    🎵 MUSIC GAMIFIED INJECTOR (10th Grade)
    Injects Unit 1 with LXP (Gamification & Collaboration) Mechanics.
    """

    def __init__(self):
        self.injector = NeonInjector()
        self.base_metadata = {
            "subject": "Educación Musical",
            "grade_level": "10",
            "module_id": "MUS-10",
            "module_name": "Artes y Expresión - Música",
            "source": "Sovereign Curriculum Engine",
            "curriculum_year": 2026,
            "modalities": ["Diurna", "Nocturna", "IPEC", "CINDEA"],
            "is_gamified": True
        }

    def generate_unit_1_data(self):
        """Generates payload for Music Unit 1: Soundscape & Society"""
        return {
            "jsonbData": {
                "unit": "Unidad de Estudio 1: El paisaje sonoro y la música como fenómeno sociocultural",
                "learning_outcomes": [
                    {
                        "id": "RA-01",
                        "description": "Analizar la influencia del paisaje sonoro y los géneros musicales en la identidad sociocultural.",
                        "saberes": [
                            "Paisaje Sonoro", "Ecología Acústica", "Contaminación Sónica",
                            "Géneros Musicales", "Identidad Cultural", "Historia de la Música"
                        ],
                        "indicators": [
                            "Identifica los componentes del paisaje sonoro en su entorno inmediato.",
                            "Compara diversos géneros musicales y su impacto en la sociedad costarricense."
                        ],
                        "mediation_strategies": [
                            {
                                "phase": "Exploración",
                                "context": "Entorno Escolar/Comunitario",
                                "topic": "Paisaje Sonoro y Ecología Acústica",
                                "teacher_role": "La persona docente (Game Master) lanza el 'Reto del Mapa Sonoro' y guía a los grupos en la identificación de fuentes sonoras.",
                                "student_role": "La persona estudiante (Explorador) captura sonidos del entorno mediante dispositivos y construye un mapa interactivo grupal.",
                                "gamification_props": {
                                    "mechanic": "Scavenger Hunt",
                                    "rewards": ["Puntos por 'Sonidos Raros'", "Medalla: Ecologista Acústico"],
                                    "status_boost": "+10 Percepción Auditiva"
                                }
                            },
                            {
                                "phase": "Construcción",
                                "context": "Aula Interactiva",
                                "topic": "Géneros Musicales y Sociedad",
                                "teacher_role": "La persona docente (Game Master) propone una 'Batalla de Épocas' y facilita recursos históricos y auditivos.",
                                "student_role": "La persona estudiante (Cronista) investiga un género asignado y expone mediante una 'Línea del Tiempo' colaborativa.",
                                "gamification_props": {
                                    "mechanic": "Peer Rating",
                                    "interaction": "Los pares otorgan 'Estrellas de Talento' y 'Likes' a las exposiciones más creativas.",
                                    "unlockable": "Skin de Avatar: Músico Retro"
                                }
                            }
                        ],
                        "dua_strategies": [
                            {
                                "population": "Sordera / Baja Audición",
                                "teacher_role": "La persona docente facilita visualizadores de ondas sonoras y transductores vibratorios.",
                                "student_role": "La persona estudiante analiza el ritmo mediante vibraciones físicas y crea una composición visual.",
                                "gamified_adjustment": "Avance mediante 'Hitos Visuales' y puntos por precisión rítmica táctil."
                            },
                            {
                                "population": "TDAH / TDA",
                                "teacher_role": "La persona docente fragmenta la clase en 'Micro-sesiones' de 15 min con recompensas inmediatas.",
                                "student_role": "La persona estudiante completa retos rápidos de reconocimiento auditivo con retroalimentación instantánea.",
                                "gamified_adjustment": "Barra de energía que se recarga al completar tareas cortas."
                            },
                             {
                                "population": "Alta Dotación",
                                "teacher_role": "La persona docente propone la creación de una banda sonora original para un corto metraje.",
                                "student_role": "La persona estudiante dirige la producción técnica y compone usando software profesional.",
                                "gamified_adjustment": "Desbloqueo de 'Misiones Épicas' con mayor complejidad técnica."
                            }
                        ],
                        "evidence": "Mapa sonoro interactivo y Línea del tiempo comentada."
                    }
                ],
                "evaluation_instruments": [
                    {
                        "type": "GamifiedRubric",
                        "title": "A. Trabajo Cotidiano (Dashboard del Estudiante)",
                        "criteria": [
                            {
                                "name": "Análisis Crítico Musical",
                                "levels": {
                                    "nivel_1": {
                                        "label": "Aprendiz (Inicial)",
                                        "descriptor": "Identifica el género pero no explica su contexto social."
                                    },
                                    "nivel_2": {
                                        "label": "Maestro (Intermedio)",
                                        "descriptor": "Analiza el género y su impacto social con claridad."
                                    },
                                    "nivel_3": {
                                        "label": "Leyenda (Avanzado)",
                                        "descriptor": "Realiza análisis profundos y propone conexiones culturales innovadoras.",
                                        "reward": "Badge: 'Crítico de Élite'"
                                    }
                                }
                            }
                        ]
                    },
                    {
                        "type": "CollaborativeProject",
                        "title": "B. Proyecto: 'La Banda del CTP'",
                        "description": "Formación de grupos con roles especializados.",
                        "roles": [
                            {"role": "Productor", "task": "Liderazgo y Gestión"},
                            {"role": "Investigador", "task": "Contenido Lírico e Histórico"},
                            {"role": "Diseñador", "task": "Visuals y Estética"},
                            {"role": "Técnico", "task": "Audio y Montaje"},
                            {"role": "Exponente", "task": "Voz y Presentación"}
                        ],
                        "evaluation_method": "Peer Review (Estrellas) + Rúbrica Docente"
                    }
                ]
            },
            "mepMetadata": {
                **self.base_metadata,
                "unit_id": "MUS-10-U01"
            },
            "logicRules": {
                "sequence": ["RA-01"],
                "prerequisites": ["Artes 9no"],
                "steam_focus": "Ingeniería de Sonido & Acústica"
            },
            "classificationTags": ["Música", "Gamificación", "Paisaje Sonoro", "Cultura", "LXP"]
        }

    def run(self):
        units = [self.generate_unit_1_data()]

        logger.info(f"🚀 Starting Music LXP Injection...")
        
        # Ensure seed directory exists
        seed_dir = os.path.join(os.path.dirname(__file__), "sovereign_seeds")
        os.makedirs(seed_dir, exist_ok=True)
        
        full_payload = []

        for unit_data in units:
            unit_id = unit_data["mepMetadata"]["unit_id"]
            unit_name = unit_data["jsonbData"]["unit"]
            full_payload.append(unit_data)
            
            # Generate Deterministic Semantic Hash
            semantic_hash = str(uuid.uuid5(uuid.NAMESPACE_DNS, f"{unit_id}-{unit_name}"))
            
            logger.info(f"   Injecting {unit_id}: {unit_name}...")
            
            # Try DB Injection
            success = self.injector.upsert_kernel_knowledge(unit_data, semantic_hash)
            
            if success:
                logger.info(f"   ✅ Success: {unit_id}")
            else:
                logger.warning(f"   ⚠️ DB Fail (Offline Mode): {unit_id}. Saving to local seed.")

        # Save to File
        seed_file = os.path.join(seed_dir, "MUS10_GAMIFIED_CURRICULUM.json")
        with open(seed_file, "w", encoding="utf-8") as f:
            json.dump(full_payload, f, indent=4, ensure_ascii=False)
            
        logger.info(f"💾 Sovereign Seed Saved: {seed_file}")
        logger.info("🏁 Music LXP Injection Complete.")

if __name__ == "__main__":
    injector = MusicGamifiedInjector()
    injector.run()
