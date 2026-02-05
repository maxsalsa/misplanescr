/**
 * INTELLIGENCE ENGINE (KAIZEN 110.0 & 120.0)
 * The "Neuro-Link" between Curriculum and Mediation.
 */

// Keyword mapping for Strategy Suggestion
const STRATEGY_MAP = {
  analizar: ["Seis Sombreros", "Debate Socrático", "Estudio de Caso"],
  identificar: ["Mapa Mental", "Lluvia de Ideas", "Galería"],
  construir: ["ABP (Prototipo)", "Maqueta", "Roleplay"],
  resolver: ["Resolución de Problemas", "Gamificación", "Taller"],
  default: ["Técnica de la Pregunta", "Trabajo Cooperativo", "Bitácora"],
};

export const suggestStrategies = async (db, indicatorText) => {
  // 1. Analyze Indicator Verb (Heuristic)
  const lowerText = indicatorText.toLowerCase();
  let bestMatchKey = "default";

  for (const key of Object.keys(STRATEGY_MAP)) {
    if (lowerText.includes(key)) {
      bestMatchKey = key;
      break;
    }
  }

  const suggestedNames = STRATEGY_MAP[bestMatchKey];

  // 2. Query Neon "BancoMediacion" (Simulated Prism call)
  // const strategies = await db.bancoMediacion.findMany({ where: { nombre: { in: suggestedNames } } });

  // Returning simulated intelligent selection
  return suggestedNames.map((name) => ({
    name,
    reason: `Recomendado porque el indicador requiere '${bestMatchKey}'.`,
    duaCheck: "Visual/Auditivo",
    estimatedMinutes: 40, // Default standard lesson
  }));
};

// KAIZEN 120.0: MOTOR DE TIEMPOS (UNIT GOVERNOR)
export const calculateTimeBudget = (unitTotalHours, selectedActivities) => {
  // unitTotalHours: number (e.g., 40)
  // selectedActivities: array of objects { minutes: 40, ... }

  const totalAvailableMinutes = unitTotalHours * 60;
  const currentUsedMinutes = selectedActivities.reduce(
    (sum, act) => sum + (act.minutes || 40),
    0,
  );

  const remaining = totalAvailableMinutes - currentUsedMinutes;

  // "Alerta Técnica Proactiva" logic
  return {
    totalAvailableMinutes,
    currentUsedMinutes,
    remaining,
    status:
      remaining < 0 ? "OVERFLOW" : remaining === 0 ? "PERFECT" : "UNDER_BUDGET",
    message:
      remaining < 0
        ? `¡ALERTA TÉCNICA! Excede el tiempo de la unidad por ${(Math.abs(remaining) / 60).toFixed(1)} horas. Ajuste la mediación.`
        : `Tiempo disponible: ${(remaining / 60).toFixed(1)} horas para cierre o refuerzo.`,
  };
};

import MATRICES from "./data/matrices.json";

// ... existing code ...

// KAIZEN 130.0: PROTOCOLO OMEGA (MATRICES)
export const calculateInclusionProfile = (studentProfile) => {
  if (!studentProfile || !studentProfile.dua_profile)
    return { supports: [], materials: [] };

  const { category, level } = studentProfile.dua_profile;
  const spedData = MATRICES.SPED_SUPPORT_2025.profiles;

  // Simple heuristic matching
  let recommendedSupports = [];
  let concreteMaterials = [];

  // Find condition match
  for (const condition of spedData) {
    // This logic can be improved with better matching if "category" string varies
    // For now, we search subtypes
    const subtype = condition.subtypes.find(
      (s) => category && category.includes(s.type),
    );
    if (subtype) {
      recommendedSupports = [...recommendedSupports, ...subtype.tech_supports];
      concreteMaterials = [...concreteMaterials, ...subtype.concrete_materials];
    }
  }

  return {
    recommendedSupports,
    concreteMaterials,
    legalNote:
      level === "SIGNIFICATIVA"
        ? "Requiere PEI Aprobado"
        : "Circular DVM-AC-003-2013",
  };
};

export const getTechnicalSafetyContext = (specialty) => {
  const workshops = MATRICES.CTP_SAFETY_PROTOCOLS.workshops;
  const match = workshops.find(
    (w) => specialty && specialty.includes(w.specialty),
  );

  if (match) {
    return {
      riskLevel: match.risk_level,
      ppe: match.mandatory_ppe,
      protocol: "CTP_SAFETY_PROTOCOLS",
    };
  }
  return null;
};

export const getIndigenousContext = (topic) => {
  const list = MATRICES.INDIGENOUS_CONTEXT_SCIENCES.pedagogy_mediation;
  // Fuzzy search topic in official_topic
  // Note: JSON key is 'pedagogical_mediation', fixing query key below
  const strategies = MATRICES.INDIGENOUS_CONTEXT_SCIENCES.pedagogical_mediation;

  const match = strategies.find(
    (s) =>
      topic && topic.toLowerCase().includes(s.official_topic.toLowerCase()),
  );

  if (match) {
    return {
      concept: match.ancestral_concept,
      strategy: match.mediation_strategy,
      culture: MATRICES.INDIGENOUS_CONTEXT_SCIENCES.culture_focus,
    };
  }
  return null;
};

export const verifySinpeAuth = (userId, superAdminOverride = false) => {
  // KAIZEN 110: Financial Sovereignty
  if (superAdminOverride) return true;
  // Check Subscription DB...
  return false; // Strict by default
};

export const encryptPersonalData = (data) => {
  // KAIZEN 110: GDPR/Ley 8968 Compliance
  const encrypted = `ENC[${Buffer.from(JSON.stringify(data)).toString("base64")}]`; // Simulatd
  return encrypted;
};
