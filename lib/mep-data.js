// ============================================================================
// 🇨🇷 ARQUITECTURA CURRICULAR OFICIAL MEP (2026)
// Este archivo define toda la oferta educativa disponible en AulaPlan.
// ============================================================================

export const MEP_ARCH = {
  // --------------------------------------------------------------------------
  // 1. EDUCACIÓN PREESCOLAR (PRIMERA INFANCIA)
  // --------------------------------------------------------------------------
  "PREESCOLAR": {
    label: "Primera Infancia",
    levels: ["Ciclo Materno Infantil", "Ciclo de Transición"],
    subjects: [
      "Autonomía Personal",
      "Convivencia Social",
      "Interacción con el Medio",
      "Comunicación y Lenguaje",
      "Expresión Artística",
      "Motora (Gruesa y Fina)"
    ]
  },

  // --------------------------------------------------------------------------
  // 2. EDUCACIÓN GENERAL BÁSICA (PRIMARIA)
  // --------------------------------------------------------------------------
  "PRIMARIA": {
    label: "I y II Ciclo (Escuela)",
    levels: ["Primero", "Segundo", "Tercero", "Cuarto", "Quinto", "Sexto"],
    subjects: [
      "Matemáticas",
      "Español (Lectoescritura)",
      "Ciencias",
      "Estudios Sociales",
      "Inglés",
      "Educación Religiosa",
      "Educación Musical",
      "Artes Plásticas",
      "Educación Física",
      "Informática Educativa (FOD)",
      "Afectividad y Sexualidad"
    ]
  },

  // --------------------------------------------------------------------------
  // 3. SECUNDARIA ACADÉMICA (COLEGIO TRADICIONAL)
  // --------------------------------------------------------------------------
  "SECUNDARIA": {
    label: "III Ciclo y Educación Diversificada",
    levels: ["Sétimo", "Octavo", "Noveno", "Décimo", "Undécimo"],
    subjects: [
      "Matemáticas",
      "Español",
      "Ciencias (7-9)",
      "Biología (10-11)",
      "Química (10-11)",
      "Física (10-11)",
      "Estudios Sociales",
      "Educación Cívica",
      "Inglés Académico",
      "Francés",
      "Psicología",
      "Filosofía",
      "Artes Industriales",
      "Educación para el Hogar"
    ]
  },

  // --------------------------------------------------------------------------
  // 4. EDUCACIÓN TÉCNICA PROFESIONAL (CTP - ETP)
  // Aquí está el dinero y la complejidad. Subáreas técnicas.
  // --------------------------------------------------------------------------
  "TECNICA": {
    label: "Colegios Técnicos (ETP)",
    levels: ["Décimo (Técnico)", "Undécimo (Técnico)", "Duodécimo (Técnico)"],
    families: {
      "COMERCIO_SERVICIOS": {
        label: "Comercio y Servicios",
        specialties: [
          "Contabilidad",
          "Banca y Finanzas",
          "Ejecutivo para Centros de Servicio",
          "Turismo (Alimentos y Bebidas)",
          "Turismo (Gestión)",
          "Secretariado Ejecutivo",
          "Logística y Distribución"
        ]
      },
      "INDUSTRIA": {
        label: "Industrial y Construcción",
        specialties: [
          "Electrotecnia",
          "Electrónica Industrial",
          "Mecánica de Precisión",
          "Mecánica Automotriz",
          "Refrigeración y Aire Acondicionado",
          "Dibujo Arquitectónico",
          "Construcción Civil",
          "Ingeniería en Maderas",
          "Diseño y Confección de Moda"
        ]
      },
      "TIC": {
        label: "Tecnologías de Información (TIC)",
        specialties: [
          "Informática Empresarial",
          "Desarrollo de Software",
          "Ciberseguridad",
          "Inteligencia Artificial",
          "Configuración y Soporte de Redes",
          "Diseño y Desarrollo Web"
        ]
      },
      "AGRO": {
        label: "Agropecuario",
        specialties: [
          "Agroecología",
          "Agroindustria Alimentaria",
          "Riego y Drenaje",
          "Producción Pecuaria"
        ]
      }
    },
    // Materias transversales obligatorias en CTP
    common_subjects: [
      "Gestión Empresarial",
      "Salud Ocupacional",
      "Inglés Técnico (Conversational)",
      "Ética Profesional"
    ]
  },

  // --------------------------------------------------------------------------
  // 5. EDUCACIÓN JÓVENES Y ADULTOS (CINDEA / IPEC)
  // --------------------------------------------------------------------------
  "ADULTOS": {
    label: "CINDEA / IPEC",
    levels: ["I Nivel (Escuela)", "II Nivel (7-8-9)", "III Nivel (Bachillerato)"],
    subjects: [
      "Módulos de Matemáticas",
      "Módulos de Ciencias",
      "Módulos de Español",
      "Módulos de Estudios Sociales",
      "Cursos Libres Técnicos"
    ]
  }
};
