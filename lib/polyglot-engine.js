/**
 * POLYGLOT ENGINE V1.0 (SPECIALIST MODE)
 * Capabilities:
 * - Languages: CEFR Based, Task-Based Learning (TBL), Oral Focus.
 * - Workshops: Project-Based, Safety First.
 */

export const POLYGLOT_CONFIG = {
  ENGLISH: {
    framework: "CEFR (Marco Común Europeo)",
    focus: "Communication (Listening/Speaking)",
    banned: ["Grammar Translation Tests", "Isolated Vocabulary Lists"],
    instruments: ["Oral Production Rubric", "Listening Comprehension Check"],
  },
  FRENCH: {
    framework: "CEFR",
    focus: "Action-Oriented Approach",
    instruments: ["Roleplay Rubric", "Cultural Portfolio"],
  },
  WORKSHOP: {
    framework: "Exploratory / Modular",
    focus: "Safety & Procedures (Aprender Haciendo)",
    instruments: ["Safety Checklist (EPP)", "Finished Product Rubric"],
  },
  INDIGENOUS: {
    framework: "Cosmovisión / Educación Propia",
    focus: "Oral Tradition & Relationship with Nature",
    instruments: ["Dialogue Circle", "Vivencial Observation"],
  },
  THIRD_LANG: {
    framework: "CEFR (Italian/German/Mandarin)",
    focus: "Cultural Immersion (Gastronomy/Art)",
    instruments: ["Oral Presentation", "Cultural Portfolio"],
  },
};

/**
 * Generates a Task-Based Learning (TBL) strategy for Languages.
 */
export function generateLangTask(level, topic) {
  return {
    title: `TBL Task: ${topic}`,
    phases: {
      pre_task: "Vocabulary activation via images/video.",
      task_cycle:
        "Students perform the communicative task (e.g., ordering food) in pairs.",
      language_focus: "Teacher highlights useful phrases used during the task.",
    },
    evaluation:
      "Oral Rubric: Fluency, Interaction, Pronunciation (No Grammar penalization).",
  };
}

/**
 * Generates a Project-Based strategy for Vocational Workshops.
 */
export function generateWorkshopProject(specialty, project) {
  return {
    title: `Workshop Project: ${project}`,
    phases: {
      planning: "Sketching and material selection.",
      execution: "Building the artifact following safety protocols (EPP).",
      quality_control:
        "Inspecting the finish against the 'Rubric of Finished Product'.",
    },
    safety_check:
      "Prior to start: Verify goggles, gloves, and workspace order.",
  };
}
