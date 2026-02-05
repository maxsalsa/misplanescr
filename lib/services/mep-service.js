// SERVICIO MEP UNIFICADO (SIN DEPENDENCIAS EXTERNAS)
// Versión: Omega Stable

// DATOS CORE (INCRUSTADOS PARA ESTABILIDAD)
const MEP_DATA = {
  version: "2.0",
  programs: [
    { id: "mat-7", name: "Matemáticas 7°", level: "7mo", type: "ACADEMICA" },
    { id: "esp-7", name: "Español 7°", level: "7mo", type: "ACADEMICA" },
    { id: "cie-7", name: "Ciencias 7°", level: "7mo", type: "ACADEMICA" },
    {
      id: "est-7",
      name: "Estudios Sociales 7°",
      level: "7mo",
      type: "ACADEMICA",
    },
    {
      id: "tur-10",
      name: "Turismo Ecológico 10°",
      level: "10mo",
      type: "TECNICA",
    },
    { id: "con-10", name: "Contabilidad 10°", level: "10mo", type: "TECNICA" },
    {
      id: "inf-10",
      name: "Informática (Desarrollo) 10°",
      level: "10mo",
      type: "TECNICA",
    },
    {
      id: "rob-club",
      name: "Taller de Robótica",
      level: "Club",
      type: "TALLER",
    },
  ],
};

export const getMepPrograms = async () => {
  // Retornamos los datos estáticos garantizados
  return MEP_DATA.programs;
};

export const getProgramById = async (id) => {
  return MEP_DATA.programs.find((p) => p.id === id) || null;
};

// Función auxiliar para simular búsqueda inteligente
export const searchProgram = async (query) => {
  const lower = query.toLowerCase();
  return MEP_DATA.programs.filter((p) => p.name.toLowerCase().includes(lower));
};

const MepService = { getMepPrograms, getProgramById };
export default MepService;
