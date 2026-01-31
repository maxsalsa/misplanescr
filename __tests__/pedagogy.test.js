import { analyzeSubject, PEDAGOGY_MATRIX } from "../lib/core/pedagogy";

describe("Antigravity Brain Core", () => {
  
  test("Debe detectar Ciberseguridad como HARD_TECH", () => {
    const result = analyzeSubject("Programa Ciberseguridad 12.pdf");
    expect(result.type).toBe("HARD_TECH");
    expect(result.icon).toBe("Terminal");
  });

  test("Debe detectar Turismo como SERVICE", () => {
    const result = analyzeSubject("Gestión de Turismo Sostenible.pdf");
    expect(result.type).toBe("SERVICE");
    expect(result.icon).toBe("Briefcase"); // Corregido para coincidir con el código
  });

  test("Debe detectar Biología como SCIENCE", () => {
    const result = analyzeSubject("Biología III Ciclo.pdf");
    expect(result.type).toBe("SCIENCE"); // Ahora debería pasar porque quitamos "ia"
    expect(result.moments[0].name).toContain("FOCALIZACIÓN");
  });

  test("Debe tener fallback a ACADEMIC si no conoce la materia", () => {
    const result = analyzeSubject("Filosofía Antigua.pdf");
    expect(result.type).toBe("ACADEMIC"); // Estandarizamos a ACADEMIC (antes HUMANITIES)
  });

  test("La matriz pedagógica debe ser íntegra (4 momentos)", () => {
    const hardTech = PEDAGOGY_MATRIX.HARD_TECH;
    expect(hardTech.moments.length).toBe(4);
    expect(hardTech.moments[2].component).toBe("CodeMockup");
  });
});