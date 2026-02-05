/**
 * GAMIFICATION ENGINE v1.0
 * "The Fun Factor"
 *
 * Capabilities:
 * - Transforms standard Questions into Kahoot-ready XLS structure.
 * - Generates "Distractor" logic (User System Prompt Requirement).
 */

export function generateKahootExport(questions) {
  // 1. Header Row (Standard Kahoot Import Format)
  const header = [
    "Question",
    "Answer 1",
    "Answer 2",
    "Answer 3",
    "Answer 4",
    "Time Limit",
    "Correct Answer",
  ];

  // 2. Data Rows
  const rows = questions.map((q) => {
    return [
      q.question,
      q.options[0] || "",
      q.options[1] || "",
      q.options[2] || "",
      q.options[3] || "",
      q.timeLimit || 20, // Default 20s
      q.correctIndex || 1, // 1-based index for correct answer
    ];
  });

  return [header, ...rows];
}

/**
 * AUTO-DISTRACTOR GENERATOR (SIMULATION)
 * In a real scenario, this would use LLM to generate plausible wrong answers.
 * Here we provide a structure helper.
 */
export function enhanceTriviaQuestion(question, correctAnswer) {
  return {
    type: "QUIZ",
    question: question,
    options: [
      correctAnswer,
      "Respuesta Plausible Incorrecta A", // Distractor 1
      "Respuesta Plausible Incorrecta B", // Distractor 2
      "Respuesta Absurda C", // Distractor 3
    ],
    correctIndex: 1, // First option is correct (shuffled in UI)
    timeLimit: 30,
  };
}
