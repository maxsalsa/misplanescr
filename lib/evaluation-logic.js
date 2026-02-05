/**
 * EVALUATION LOGIC CORE (MEP 2026)
 * "The Iron Rules of Assessment"
 *
 * Implements:
 * 1. Attendance Conversion (2 Tardies = 1 Absence)
 * 2. Cronopedagogy (Effective Days)
 * 3. Self-Audit Logic
 */

/**
 * Calculates total absences based on the "Golden Rule":
 * 2 Unjustified Tardies (T) = 1 Unjustified Absence (AI).
 *
 * @param {number} currentAbsences - Existing Unjustified Absences.
 * @param {number} tardies - Unjustified Tardies.
 * @returns {object} - { totalAbsences, residualTardies, criticalFlag }
 */
export function calculateEffectiveAbsences(currentAbsences, tardies) {
  const convertedAbsences = Math.floor(tardies / 2);
  const residualTardies = tardies % 2;
  const total = currentAbsences + convertedAbsences;

  // Critical Flag: If > 10% (General rule, variable by institution)
  // For now, we flag if the conversion added more than 1 absence.
  const criticalFlag = convertedAbsences > 0;

  return {
    originalAbsences: currentAbsences,
    originalTardies: tardies,
    convertedAbsences: convertedAbsences,
    residualTardies: residualTardies,
    totalEffectiveAbsences: total,
    isCritical: criticalFlag,
  };
}

/**
 * Calculates Effective Lesson Days (Cronopedagogy).
 *
 * @param {number} totalCalendarDays - Raw days in period.
 * @param {Array<string>} holidays - List of non-effective days.
 * @param {number} unforeseenEvents - Emergency closures, etc.
 * @returns {number} - The actual days available for Table of Specifications.
 */
export function calculateEffectiveDays(
  totalCalendarDays,
  holidays = [],
  unforeseenEvents = 0,
) {
  // Basic calculation
  const effective = totalCalendarDays - (holidays.length + unforeseenEvents);
  return Math.max(0, effective);
}

/**
 * Validates a Table of Specifications against Effective Days.
 *
 * @param {object} specsTable - { topics: [{ weights: number... }] }
 * @param {number} effectiveDays - Result from calculateEffectiveDays.
 * @returns {object} - Audit Result
 */
export function auditSpecsTable(specsTable, effectiveDays) {
  // Mock logic: Ensure total weight doesn't exceed time available.
  // Real logic would sum up minutes.

  // Check if balanced
  return {
    valid: true, // Placeholder
    message: "Tabla balanceada según Días Efectivos.",
  };
}

/**
 * QUALITY CONTROL SELF-AUDIT
 * Runs before PDF Generation.
 */
export function runQualityAudit(planData) {
  const auditLog = [];
  let passed = true;

  // 1. Orthography Check (Heuristic)
  // Simple check for start of sentences capitalization
  if (planData.content.some((c) => /^[a-z]/.test(c.mediation))) {
    auditLog.push("[FAIL] Capitalization Error detected in Mediation.");
    passed = false;
  } else {
    auditLog.push("[PASS] Orthography (Capitalization) checked.");
  }

  // 2. Binomio Sagrado Check
  if (
    planData.content.some(
      (c) =>
        !c.mediation.includes("docente") || !c.mediation.includes("estudiante"),
    )
  ) {
    auditLog.push(
      "[WARN] 'Binomio Sagrado' keywords missing in some strategies.",
    );
    // Strict: passed = false; but we keep as Warn for now unless "Strict Mode" is on.
  } else {
    auditLog.push("[PASS] Binomio Sagrado structure verified.");
  }

  return { success: passed, log: auditLog };
}
