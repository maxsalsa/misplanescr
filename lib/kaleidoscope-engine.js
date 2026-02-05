/**
 * KALEIDOSCOPE ENGINE V1.0 (CREATIVITY CORE)
 * "Death to Monotony"
 *
 * Capabilities:
 * - Combinatorial Generation: Mixes Roles, Outputs, and Instruments.
 * - Context Awareness: adapts to Preschool, Math, Tech, etc.
 */

// --- BUCKETS ---
export const BUCKETS = {
  ROLES: [
    "The Skeptic (Debater)",
    "The Builder (Maker)",
    "The Investigator (Researcher)",
    "The Artist (Creator)",
    "The Coder (Programmer)",
  ],
  OUTPUTS: {
    DIGITAL: [
      "Podcast",
      "Blog Post",
      "Video Vlog",
      "Infographic",
      "Code Repository",
    ],
    PHYSICAL: ["Diorama", "Circuit", "3D Model", "Roleplay Skit", "Lapbook"],
  },
  INSTRUMENTS: [
    "Rúbrica de Oralidad",
    "Lista de Cotejo de Seguridad",
    "Escala de Creatividad",
    "Rúbrica de Producto",
    "Bitácora de Proceso",
  ],
};

// --- CONTEXT RULES ---
const CONTEXT_MODIFIERS = {
  PRESCHOOL: {
    focus: "Texture, Movement, Song, Routine",
    filters: { roles: ["The Builder", "The Artist"], outputs: ["Physical"] },
  },
  MATH: {
    focus: "Real-world problems (Finance, Construction)",
    filters: { roles: ["The Investigator", "The Builder", "The Coder"] },
  },
  LANGUAGES: {
    focus: "Communication (Ordering food, Interviews)",
    filters: {
      roles: ["The Skeptic", "The Artist"],
      outputs: ["Digital", "Physical"],
    },
  },
  TECHNICAL: {
    focus: "Industry Standards (Safety, ISO, Protocols)",
    filters: {
      roles: ["The Builder", "The Coder"],
      instruments: ["Lista de Cotejo de Seguridad"],
    },
  },
};

/**
 * Generates a unique, non-boring strategy combination.
 * @param {string} subjectContext - 'MATH', 'PRESCHOOL', 'TECHNICAL', 'LANGUAGES' or 'GENERAL'
 */
export function spinKaleidoscope(subjectContext = "GENERAL") {
  const modifier = CONTEXT_MODIFIERS[subjectContext] || {};

  // Filter Roles
  let availableRoles = BUCKETS.ROLES;
  if (modifier.filters?.roles) {
    availableRoles = BUCKETS.ROLES.filter((r) =>
      modifier.filters.roles.some((mr) => r.includes(mr.split(" ")[1])),
    ); // Crude match, can be refined
    if (availableRoles.length === 0) availableRoles = modifier.filters.roles; // Fallback
  }

  // Filter Outputs
  let availableOutputs = [
    ...BUCKETS.OUTPUTS.DIGITAL,
    ...BUCKETS.OUTPUTS.PHYSICAL,
  ];
  if (modifier.filters?.outputs) {
    availableOutputs = [];
    if (modifier.filters.outputs.includes("Digital"))
      availableOutputs.push(...BUCKETS.OUTPUTS.DIGITAL);
    if (modifier.filters.outputs.includes("Physical"))
      availableOutputs.push(...BUCKETS.OUTPUTS.PHYSICAL);
  }

  // Filter Instruments
  let availableInstruments = BUCKETS.INSTRUMENTS;
  if (modifier.filters?.instruments) {
    availableInstruments = modifier.filters.instruments;
  }

  // Random Selection
  const role =
    availableRoles[Math.floor(Math.random() * availableRoles.length)];
  const output =
    availableOutputs[Math.floor(Math.random() * availableOutputs.length)];
  const instrument =
    availableInstruments[
      Math.floor(Math.random() * availableInstruments.length)
    ];

  return {
    role,
    output,
    instrument,
    focus: modifier.focus || "General Creative Application",
    description: `Students act as '${role}' to create a '${output}', evaluated via '${instrument}'.`,
  };
}
