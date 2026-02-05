// 🧠 CEREBRO ANTIGRAVITY (VERSIÓN 3.1 - BUGFIXED)

export const PEDAGOGY_MATRIX = {
  HARD_TECH: {
    // CORRECCIÓN: Eliminamos "ia" (muy corto) y usamos "inteligencia artificial".
    keywords: [
      "ciber",
      "software",
      "web",
      "redes",
      "inteligencia artificial",
      "datos",
      "nube",
      "programacion",
      "informatica",
      "computacion",
    ],
    icon: "Terminal",
    color: "slate",
    moments: [
      {
        name: "1. CONEXIÓN",
        desc: "Análisis de Caso Forense / Fallo Real",
        dua: "Captar interés (7.1)",
      },
      {
        name: "2. COLABORACIÓN",
        desc: "Code Review / Diseño de Arquitectura en Equipo",
        dua: "Comunidad (8.3)",
      },
      {
        name: "3. CONSTRUCCIÓN",
        desc: "Laboratorio Técnico (Coding/Config)",
        dua: "Acción física (4.1)",
        component: "CodeMockup",
      },
      {
        name: "4. CLARIFICACIÓN",
        desc: "Debugging y optimización.",
        dua: "Autoevaluación (9.3)",
      },
    ],
    evaluation: {
      instrument: "Rúbrica de Producto",
      evidence: "Repositorio Git / Bitácora Técnica",
    },
  },
  SCIENCE: {
    // CORRECCIÓN: Prioridad a raíces científicas
    keywords: [
      "ciencia",
      "biolo",
      "quimica",
      "fisica",
      "naturales",
      "indagacion",
      "laboratorio",
    ],
    icon: "FlaskConical",
    color: "emerald",
    moments: [
      {
        name: "1. FOCALIZACIÓN",
        desc: "Pregunta Investigable / Problema del Entorno",
        dua: "Relevancia (7.2)",
      },
      {
        name: "2. EXPLORACIÓN",
        desc: "Recolección de Datos / Trabajo de Campo",
        dua: "Percepción (1.2)",
      },
      {
        name: "3. CONTRASTACIÓN",
        desc: "Análisis de Resultados vs Teoría",
        dua: "Comprensión (3.3)",
      },
      {
        name: "4. APLICACIÓN",
        desc: "Resolución del Problema",
        dua: "Transferencia (6.2)",
      },
    ],
    evaluation: {
      instrument: "V de Gowin / Informe",
      evidence: "Reporte de Laboratorio",
    },
  },
  SERVICE: {
    keywords: [
      "turismo",
      "hotel",
      "ejecutivo",
      "secretariado",
      "cliente",
      "banca",
      "finan",
      "contabilidad",
    ],
    icon: "Briefcase", // CORRECCIÓN: Icono alineado con el Test
    color: "rose",
    moments: [
      {
        name: "1. ENGANCHE",
        desc: "Video de 'Mal Servicio' para análisis",
        dua: "Opciones de percepción",
      },
      {
        name: "2. ENSAYO",
        desc: "Diseño de Guiones y Protocolos",
        dua: "Expresión y comunicación",
      },
      {
        name: "3. SIMULACIÓN",
        desc: "Roleplay: Atención al Cliente en Escenario",
        dua: "Acción (4.2)",
      },
      {
        name: "4. REFLEXIÓN",
        desc: "Video-feedback y análisis de lenguaje corporal",
        dua: "Monitoreo (6.4)",
      },
    ],
    evaluation: {
      instrument: "Lista de Cotejo Conductual",
      evidence: "Video Simulación",
    },
  },
  INDUSTRIAL: {
    keywords: [
      "mecanic",
      "electric",
      "mader",
      "metal",
      "automot",
      "construc",
      "agro",
    ],
    icon: "Wrench",
    color: "orange",
    moments: [
      {
        name: "1. SEGURIDAD",
        desc: "Charla de seguridad industrial",
        dua: "Entorno seguro",
      },
      {
        name: "2. DEMOSTRACIÓN",
        desc: "Modelado de uso de maquinaria",
        dua: "Representación",
      },
      {
        name: "3. PRÁCTICA",
        desc: "Ejecución supervisada",
        dua: "Acción física",
      },
      { name: "4. MANTENIMIENTO", desc: "Limpieza y guardado", dua: "Rutinas" },
    ],
  },
  ACADEMIC: {
    keywords: [
      "espanol",
      "sociales",
      "civica",
      "matematica",
      "idioma",
      "filosofia",
      "orientacion",
    ],
    icon: "BookOpen",
    color: "blue",
    moments: [
      {
        name: "1. CONEXIÓN",
        desc: "Activación de conocimientos previos",
        dua: "Conocimiento previo",
      },
      {
        name: "2. COLABORACIÓN",
        desc: "Discusión socrática / Análisis de textos",
        dua: "Colaboración",
      },
      {
        name: "3. CONSTRUCCIÓN",
        desc: "Resolución de problemas / Producción textual",
        dua: "Práctica graduada",
      },
      {
        name: "4. CIERRE",
        desc: "Síntesis y metacognición",
        dua: "Auto-reflexión",
      },
    ],
  },
};

export function analyzeSubject(filename) {
  const name = filename
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  // EL ORDEN IMPORTA: SCIENCE VA ANTES QUE HARD_TECH PARA EVITAR COLISIONES EN "CIENCIAS DE LA COMPUTACION"
  if (PEDAGOGY_MATRIX.SCIENCE.keywords.some((k) => name.includes(k)))
    return { type: "SCIENCE", ...PEDAGOGY_MATRIX.SCIENCE };
  if (PEDAGOGY_MATRIX.HARD_TECH.keywords.some((k) => name.includes(k)))
    return { type: "HARD_TECH", ...PEDAGOGY_MATRIX.HARD_TECH };
  if (PEDAGOGY_MATRIX.SERVICE.keywords.some((k) => name.includes(k)))
    return { type: "SERVICE", ...PEDAGOGY_MATRIX.SERVICE };
  if (PEDAGOGY_MATRIX.INDUSTRIAL.keywords.some((k) => name.includes(k)))
    return { type: "INDUSTRIAL", ...PEDAGOGY_MATRIX.INDUSTRIAL };

  // DEFAULT
  return { type: "ACADEMIC", ...PEDAGOGY_MATRIX.ACADEMIC };
}
