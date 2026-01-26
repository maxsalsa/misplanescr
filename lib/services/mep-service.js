import mepCore from '../../../MEP-Core-v2.json';

// EXPANDED MOCK DATA (For Demo Purposes)
const extraModules = [
    {
        id: "IA_10_U1",
        specialty: "Inteligencia Artificial",
        level: 10,
        ui_family: "HARD_TECH",
        tags: ["AI", "Python"],
        learning_outcomes: [
            { code: "RA1", action_verb: "Entrenar", description: "Entrenar modelos de ML básicos.", essential_knowledge: ["Regresión Lineal", "Datasets"], dua_options: { visual: "Gráficos de dispersión" } }
        ]
    },
    {
        id: "TUR_12_U2",
        specialty: "Turismo",
        level: 12,
        ui_family: "SOFT_SKILLS",
        tags: ["Service", "English"],
        learning_outcomes: [
            { code: "RA1", action_verb: "Ejecutar", description: "Ejecutar protocolos de check-in.", essential_knowledge: ["Customer Service", "PMS Software"], dua_options: { kinesthetic: "Roleplay de recepción" } }
        ]
    }
];

const fullCatalog = [...mepCore.modules, ...extraModules];

// 📡 MOCK SERVICE FOR MEP CURRICULUM
// Simulates DB latency and returns programs.

export const MepService = {
    getPrograms: async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(fullCatalog);
            }, 400); // 400ms latency simulation
        });
    },

    getProgramById: async (id) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const program = fullCatalog.find(m => m.id === id);
                resolve(program);
            }, 200);
        });
    }
};
