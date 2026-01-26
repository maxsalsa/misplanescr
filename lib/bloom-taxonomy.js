// Taxonomía de Bloom - Verbos para redacción pedagógica MEP Costa Rica

export const BLOOM_TAXONOMY = {
  conocimiento: {
    name: "Conocimiento",
    description: "Recordar información previamente aprendida",
    verbs: [
      "Identifica",
      "Enumera",
      "Define",
      "Nombra",
      "Lista",
      "Describe",
      "Reconoce",
      "Reproduce",
      "Selecciona",
      "Localiza",
      "Menciona",
      "Memoriza",
      "Recuerda",
      "Repite",
      "Etiqueta",
      "Señala",
    ],
    color: "bg-red-500",
  },
  comprension: {
    name: "Comprensión",
    description: "Demostrar entendimiento de hechos e ideas",
    verbs: [
      "Explica",
      "Describe",
      "Interpreta",
      "Resume",
      "Parafrasea",
      "Clasifica",
      "Compara",
      "Contrasta",
      "Ejemplifica",
      "Ilustra",
      "Traduce",
      "Discute",
      "Distingue",
      "Expone",
      "Generaliza",
    ],
    color: "bg-orange-500",
  },
  aplicacion: {
    name: "Aplicación",
    description: "Usar el conocimiento en situaciones nuevas",
    verbs: [
      "Aplica",
      "Demuestra",
      "Utiliza",
      "Implementa",
      "Ejecuta",
      "Resuelve",
      "Calcula",
      "Emplea",
      "Opera",
      "Practica",
      "Experimenta",
      "Construye",
      "Modifica",
      "Prepara",
      "Produce",
    ],
    color: "bg-yellow-500",
  },
  analisis: {
    name: "Análisis",
    description: "Descomponer información en sus partes",
    verbs: [
      "Analiza",
      "Diferencia",
      "Compara",
      "Categoriza",
      "Examina",
      "Descompone",
      "Distingue",
      "Investiga",
      "Relaciona",
      "Selecciona",
      "Separa",
      "Organiza",
      "Cuestiona",
      "Diagrama",
      "Inspecciona",
    ],
    color: "bg-green-500",
  },
  sintesis: {
    name: "Síntesis",
    description: "Combinar elementos para formar algo nuevo",
    verbs: [
      "Crea",
      "Diseña",
      "Desarrolla",
      "Elabora",
      "Propone",
      "Planifica",
      "Construye",
      "Compone",
      "Formula",
      "Genera",
      "Integra",
      "Inventa",
      "Combina",
      "Organiza",
      "Reescribe",
    ],
    color: "bg-blue-500",
  },
  evaluacion: {
    name: "Evaluación",
    description: "Justificar decisiones con criterios",
    verbs: [
      "Evalúa",
      "Valora",
      "Juzga",
      "Critica",
      "Argumenta",
      "Justifica",
      "Recomienda",
      "Defiende",
      "Comprueba",
      "Prioriza",
      "Selecciona",
      "Decide",
      "Califica",
      "Mide",
      "Revisa",
    ],
    color: "bg-purple-500",
  },
}

export const ACTIVITY_TYPES = [
  { id: "introduccion", name: "Introducción", description: "Activación de conocimientos previos", icon: "🎯" },
  { id: "desarrollo", name: "Desarrollo", description: "Construcción del aprendizaje", icon: "📚" },
  { id: "cierre", name: "Cierre", description: "Consolidación y reflexión", icon: "✅" },
  { id: "proyecto", name: "Proyecto", description: "Aplicación práctica integrada", icon: "🚀" },
  { id: "evaluacion", name: "Evaluación", description: "Verificación de aprendizajes", icon: "📊" },
  { id: "laboratorio", name: "Laboratorio", description: "Práctica guiada en taller", icon: "🔬" },
  { id: "reto", name: "Reto/Challenge", description: "Desafío de aplicación", icon: "🏆" },
  { id: "gamificado", name: "Gamificado", description: "Aprendizaje lúdico", icon: "🎮" },
  { id: "colaborativo", name: "Colaborativo", description: "Trabajo en equipo", icon: "👥" },
  { id: "investigacion", name: "Investigación", description: "Búsqueda y análisis", icon: "🔍" },
]

export const DUA_PRINCIPLES = {
  representacion: {
    name: "Múltiples formas de representación",
    description: "Ofrecer diversas formas de presentar la información",
    strategies: [
      "Usar recursos visuales (diagramas, videos, infografías)",
      "Proporcionar material escrito y audiovisual",
      "Ofrecer ejemplos concretos y abstractos",
      "Usar organizadores gráficos",
      "Proporcionar glosarios y vocabulario clave",
    ],
  },
  accion_expresion: {
    name: "Múltiples formas de acción y expresión",
    description: "Permitir diversas formas de demostrar el aprendizaje",
    strategies: [
      "Permitir presentaciones orales, escritas o multimedia",
      "Ofrecer opciones de herramientas tecnológicas",
      "Proporcionar plantillas y organizadores",
      "Permitir trabajo individual o grupal",
      "Ofrecer diferentes niveles de complejidad",
    ],
  },
  implicacion: {
    name: "Múltiples formas de implicación",
    description: "Motivar y mantener el interés del estudiante",
    strategies: [
      "Conectar con intereses del estudiante",
      "Ofrecer opciones y autonomía",
      "Proporcionar retroalimentación frecuente",
      "Crear ambiente seguro para el error",
      "Celebrar logros y progreso",
    ],
  },
}

export function getVerbsByLevel(level) {
  return BLOOM_TAXONOMY[level]?.verbs || []
}

export function getAllVerbs() {
  return Object.values(BLOOM_TAXONOMY).flatMap((level) => level.verbs)
}

export function suggestVerbs(activityType) {
  const suggestions = {
    introduccion: ["Identifica", "Reconoce", "Explica", "Describe"],
    desarrollo: ["Aplica", "Implementa", "Desarrolla", "Construye"],
    cierre: ["Evalúa", "Reflexiona", "Resume", "Sintetiza"],
    proyecto: ["Diseña", "Crea", "Desarrolla", "Implementa"],
    evaluacion: ["Demuestra", "Aplica", "Resuelve", "Justifica"],
    laboratorio: ["Ejecuta", "Practica", "Experimenta", "Documenta"],
    reto: ["Resuelve", "Propone", "Diseña", "Optimiza"],
    gamificado: ["Participa", "Compite", "Colabora", "Demuestra"],
    colaborativo: ["Colabora", "Discute", "Presenta", "Construye"],
    investigacion: ["Investiga", "Analiza", "Compara", "Documenta"],
  }
  return suggestions[activityType] || getAllVerbs().slice(0, 8)
}
