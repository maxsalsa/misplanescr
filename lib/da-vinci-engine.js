/**
 * DA VINCI ENGINE V1.0 (PROTAGONIST: LIFE ITSELF)
 * "Education for Life - The Holistic Bridge"
 * 
 * Capabilities:
 * - Maps Standard Curriculum to Real World Scenarios (Scenario-Based Learning).
 * - Infuses "Competencias para la Vida" (Employability, Coexistence, Sustainability).
 * - Cross-Curricular Integration logic.
 */

export const LIFE_COMPETENCIES = {
    WORK: {
        name: "Employability & Entrepreneurship",
        skills: ["Financial Literacy", "Digital Etiquette", "Leadership", "Soft Skills"],
        trigger_subjects: ["MATH", "TECNICA", "COMPUTACION"]
    },
    COEXISTENCE: {
        name: "Democratic Coexistence",
        skills: ["Empathy", "Conflict Resolution", "Human Rights", "Anti-bullying"],
        trigger_subjects: ["ESTUDIOS_SOCIALES", "CIVICA", "ESPANOL", "RELIGION"]
    },
    SUSTAINABILITY: {
        name: "Sustainability & Health",
        skills: ["Circular Economy", "Healthy Lifestyle", "Environmental Protection"],
        trigger_subjects: ["CIENCIAS", "BIOLOGIA", "QUIMICA", "FISICA", "EDUCACION_FISICA"]
    }
};

export const REAL_WORLD_SCENARIOS = {
    MATH: [
        { topic: "Fractions/Percentages", scenario: "Project: Baking a Cake (Adjusting Recipes)", domain: "Culinary Arts" },
        { topic: "Statistics", scenario: "Simulation: Market Research for a Start-up", domain: "Business" },
        { topic: "Algebra", scenario: "Project: Construction Budgeting for a Dog House", domain: "Engineering" }
    ],
    SCIENCE: [
        { topic: "Ecosystems", scenario: "Project: Designing a Self-Sustaining Terrarium", domain: "Ecology" },
        { topic: "Chemical Reactions", scenario: "Forensic Lab: Analyzing 'Crime Scene' Substances", domain: "Forensics" },
        { topic: "Human Body", scenario: "First Aid Course: CPR and Injury Response", domain: "Health" }
    ],
    SOCIAL_STUDIES: [
        { topic: "Democracy", scenario: "Simulation: Town Hall Meeting on Local Traffic", domain: "Civics" },
        { topic: "Geography", scenario: "Project: Planning a Eco-Tourism Trip", domain: "Tourism" }
    ],
    LANGUAGE: [
        { topic: "Persuasion", scenario: "Shark Tank Pitch: Selling a Sustainable Product", domain: "Business" },
        { topic: "Narrative", scenario: "Podcast Production: 'Stories of my Community'", domain: "Media" }
    ]
};

/**
 * Infuses the pedagogical strategy with a Life Competency.
 * @param {string} subject - The subject key (e.g., MATH).
 * @param {string} topic - The specific topic proposed.
 */
export function infuseLifeSkills(subject, topic) {
    // 1. Detect Competency Domain
    let competency = LIFE_COMPETENCIES.WORK; // Default
    if (LIFE_COMPETENCIES.COEXISTENCE.trigger_subjects.includes(subject)) {
        competency = LIFE_COMPETENCIES.COEXISTENCE;
    } else if (LIFE_COMPETENCIES.SUSTAINABILITY.trigger_subjects.includes(subject)) {
        competency = LIFE_COMPETENCIES.SUSTAINABILITY;
    }

    // 2. Find or Generate Scenario
    const scenarios = REAL_WORLD_SCENARIOS[subject] || [];
    // Simple matching logic (could be AI-enhanced later)
    const match = scenarios.find(s => topic.includes(s.topic) || s.topic.includes(topic))
        || { scenario: `Project: Applying ${topic} to solving a community problem`, domain: "General Life" };

    return {
        competency_focus: competency.name,
        target_skills: competency.skills,
        real_world_scenario: match.scenario,
        transversal_domain: match.domain,
        triad: {
            saber: `Concepts of ${topic}`,
            hacer: `Executing the ${match.scenario}`,
            ser: `Demonstrating ${competency.skills[0]} during the process`
        }
    };
}
