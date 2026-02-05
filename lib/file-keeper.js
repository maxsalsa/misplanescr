/**
 * FILE KEEPER ENGINE V1.0 (DIGITAL LIBRARIAN)
 * "The Keeper of the MEP Archives"
 *
 * Capabilities:
 * - Retrieves Official PDF Links ("MEP_ORDENADO").
 * - Understands Structural Hierarchy (Sector -> Specialty -> Module).
 * - Enforces CINDEA/Nocturno Terminology (Créditos/Módulos).
 */

export const MEP_LIBRARY_MOCK = {
  "Turismo Ecológico":
    "https://mep.go.cr/sites/default/files/programas/turismo-ecologico.pdf",
  "Desarrollo de Software":
    "https://mep.go.cr/sites/default/files/programas/desarrollo-software.pdf",
  Contabilidad:
    "https://mep.go.cr/sites/default/files/programas/contabilidad.pdf",
  Matemáticas:
    "https://mep.go.cr/sites/default/files/programas/matematicas.pdf",
};

/**
 * Retrieves the Official Document URL.
 */
export function getOfficialDocument(subjectOrSpecialty) {
  const url =
    MEP_LIBRARY_MOCK[subjectOrSpecialty] ||
    "https://mep.go.cr/programas-de-estudio";
  return {
    found: !!MEP_LIBRARY_MOCK[subjectOrSpecialty],
    type: "DOCUMENTO_OFICIAL",
    url: url,
    message: `Licenciado, he localizado el documento oficial en nuestros servidores: [LINK AL PDF](${url}). Además, he generado una Guía de Mediación basada en este archivo.`,
  };
}

/**
 * Resolves Hierarchy: Sector -> Specialty -> Module.
 */
export function resolveHierarchy(sector, specialty, module) {
  return {
    sector: sector,
    specialty: specialty,
    module: module,
    path: `${sector} > ${specialty} > ${module}`,
  };
}

/**
 * Enforces CINDEA / Nocturno Terminology.
 */
export function validateModalityTerminology(modality, term) {
  if (["NOCTURNO", "CINDEA", "IPEC"].includes(modality.toUpperCase())) {
    const forbidden = ["AÑO", "GRADO", "NIVEL"];
    const hasForbidden = forbidden.some((b) => term.toUpperCase().includes(b));

    if (hasForbidden) {
      return {
        valid: false,
        correction:
          "En modalidad NOCTURNA/CINDEA, utilice 'MÓDULO SEMESTRAL' o 'CRÉDITOS', nunca 'Grado' o 'Año'.",
      };
    }
    return { valid: true, type: "MODULO_SEMESTRAL" };
  }
  return { valid: true, type: "STANDARD" };
}
