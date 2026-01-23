"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

/**
 * @fileoverview Groups Context Provider
 * Manages global state for Student Groups, Students, Grades, and Institutional assignments.
 * Acts as the centralized store for the "Mis Grupos" feature.
 * 
 * Key Features:
 * - CRUD operations for Groups and Students
 * - Grade management (Cotidiano, Tareas, Pruebas, Proyecto)
 * - Behavior/Conduct tracking (Boletas)
 * - Syncs with localStorage for persistence (mock DB behavior)
 */

const GroupsContext = createContext();

/**
 * GroupsProvider Component
 * Wraps the application or dashboard to provide access to group management logic.
 * 
 * @param {Object} props - React props
 * @param {React.ReactNode} props.children - Child components
 */
export function GroupsProvider({ children }) {
    // -------------------------------------------------------------------------
    // STATE: GROUPS & STUDENTS (MOCK DB)
    // -------------------------------------------------------------------------
    // -------------------------------------------------------------------------
    // STATE: GROUPS, STUDENTS, & INSTITUTIONS
    // -------------------------------------------------------------------------
    const [myInstitutions, setMyInstitutions] = useState([
        {
            id: 'inst-001',
            name: 'Liceo de Heredia',
            type: 'Académico',
            modality: 'academic',
            region: 'Heredia',
            pedagogy: 'standard'
        },
        {
            id: 'inst-002',
            name: 'CTP de Carrizal',
            type: 'Técnico',
            modality: 'technical',
            region: 'Alajuela',
            pedagogy: 'technical'
        }
    ]);
    const [activeInstitutionId, setActiveInstitutionId] = useState('inst-001'); // Default logic: First one

    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);

    // RULES STATE (Dynamic Regulation)
    const [rules, setRules] = useState({
        weights: { cotidiano: 30, tareas: 20, pruebas: 30, proyecto: 20 },
        conductPoints: { muyLeve: 5, leve: 10, grave: 20, gravisima: 35 }
    });

    // Initial Load
    useEffect(() => {
        const storedGroups = localStorage.getItem('mep_groups');
        const storedInst = localStorage.getItem('mep_institutions');

        if (storedInst) {
            setMyInstitutions(JSON.parse(storedInst));
            const active = localStorage.getItem('mep_active_inst');
            if (active) setActiveInstitutionId(active);
        }

        if (storedGroups) {
            setGroups(JSON.parse(storedGroups));
        } else {
            // Seed Demo Data if empty (Multi-Institutional)
            const demoGroups = [
                {
                    id: 'g-101',
                    institutionId: 'inst-001',
                    name: '10-3 (Desarrollo Web)',
                    grade: 'Décimo',
                    isGuideGroup: true,
                    students: [
                        { id: 's-101', name: 'Ana Sofía Vargas Rojas', email: 'ana.vargas.rojas@est.mep.go.cr', grades: { cotidiano: 90, tareas: 85, pruebas: 80, proyecto: 95 }, conduct: 100 },
                        { id: 's-102', name: 'Carlos Andrés Monge Solís', email: 'carlos.monge.solis@est.mep.go.cr', grades: { cotidiano: 70, tareas: 60, pruebas: 75, proyecto: 80 }, conduct: 85 },
                        { id: 's-103', name: 'María Paula Jimenez Castro', email: 'maria.jimenez.castro@est.mep.go.cr', grades: { cotidiano: 95, tareas: 90, pruebas: 92, proyecto: 98 }, conduct: 100 },
                        { id: 's-104', name: 'José Pablo Mora Abarca', email: 'jose.mora.abarca@est.mep.go.cr', grades: { cotidiano: 60, tareas: 55, pruebas: 65, proyecto: 70 }, conduct: 70 },
                        { id: 's-105', name: 'Daniela Segura Campos', email: 'daniela.segura.campos@est.mep.go.cr', grades: { cotidiano: 88, tareas: 85, pruebas: 90, proyecto: 92 }, conduct: 95 },
                        { id: 's-106', name: 'Gabriel Antonio Cruz Fernandez', email: 'gabriel.cruz.fernandez@est.mep.go.cr', grades: { cotidiano: 82, tareas: 80, pruebas: 85, proyecto: 88 }, conduct: 90 },
                        { id: 's-107', name: 'Lucía Fernández Herrera', email: 'lucia.fernandez.herrera@est.mep.go.cr', grades: { cotidiano: 98, tareas: 100, pruebas: 95, proyecto: 100 }, conduct: 100 },
                        { id: 's-108', name: 'Alejandro Soto Madrigal', email: 'alejandro.soto.madrigal@est.mep.go.cr', grades: { cotidiano: 75, tareas: 70, pruebas: 68, proyecto: 72 }, conduct: 80 },
                        { id: 's-109', name: 'Valeria Muñoz Zúñiga', email: 'valeria.munoz.zuniga@est.mep.go.cr', grades: { cotidiano: 92, tareas: 88, pruebas: 90, proyecto: 94 }, conduct: 100 },
                        { id: 's-110', name: 'Diego Alonso Ruiz Vega', email: 'diego.ruiz.vega@est.mep.go.cr', grades: { cotidiano: 65, tareas: 60, pruebas: 55, proyecto: 60 }, conduct: 65 },
                        { id: 's-111', name: 'Camila Torres Jiménez', email: 'camila.torres.jimenez@est.mep.go.cr', grades: { cotidiano: 85, tareas: 82, pruebas: 80, proyecto: 85 }, conduct: 95 },
                        { id: 's-112', name: 'Adrián Cordero Badilla', email: 'adrian.cordero.badilla@est.mep.go.cr', grades: { cotidiano: 78, tareas: 75, pruebas: 72, proyecto: 80 }, conduct: 88 },
                        { id: 's-113', name: 'Isabella Rojas Villalobos', email: 'isabella.rojas.villalobos@est.mep.go.cr', grades: { cotidiano: 96, tareas: 94, pruebas: 98, proyecto: 95 }, conduct: 100 },
                        { id: 's-114', name: 'Mateo Guzman Alfaro', email: 'mateo.guzman.alfaro@est.mep.go.cr', grades: { cotidiano: 72, tareas: 68, pruebas: 70, proyecto: 75 }, conduct: 85 },
                        { id: 's-115', name: 'Sofía Calvo Mendez', email: 'sofia.calvo.mendez@est.mep.go.cr', grades: { cotidiano: 89, tareas: 86, pruebas: 88, proyecto: 90 }, conduct: 98 },
                        { id: 's-116', name: 'Javier Fonseca Solano', email: 'javier.fonseca.solano@est.mep.go.cr', grades: { cotidiano: 68, tareas: 65, pruebas: 62, proyecto: 70 }, conduct: 75 },
                        { id: 's-117', name: 'Mariana Duarte Esquivel', email: 'mariana.duarte.esquivel@est.mep.go.cr', grades: { cotidiano: 91, tareas: 90, pruebas: 85, proyecto: 92 }, conduct: 96 },
                        { id: 's-118', name: 'Esteban Méndez Quirós', email: 'esteban.mendez.quiros@est.mep.go.cr', grades: { cotidiano: 84, tareas: 80, pruebas: 82, proyecto: 86 }, conduct: 92 },
                        { id: 's-119', name: 'Natalia Aguilar Salazar', email: 'natalia.aguilar.salazar@est.mep.go.cr', grades: { cotidiano: 93, tareas: 95, pruebas: 90, proyecto: 94 }, conduct: 100 },
                        { id: 's-120', name: 'Felipe Zamora Cerdas', email: 'felipe.zamora.cerdas@est.mep.go.cr', grades: { cotidiano: 76, tareas: 72, pruebas: 74, proyecto: 78 }, conduct: 89 },
                        { id: 's-121', name: 'Valentina Lobo Guevara', email: 'valentina.lobo.guevara@est.mep.go.cr', grades: { cotidiano: 87, tareas: 85, pruebas: 86, proyecto: 88 }, conduct: 94 },
                        { id: 's-122', name: 'Sebastián Chaves Nuñez', email: 'sebastian.chaves.nunez@est.mep.go.cr', grades: { cotidiano: 70, tareas: 65, pruebas: 68, proyecto: 72 }, conduct: 80 },
                        { id: 's-123', name: 'Emilia Arroyo Porras', email: 'emilia.arroyo.porras@est.mep.go.cr', grades: { cotidiano: 94, tareas: 92, pruebas: 95, proyecto: 96 }, conduct: 100 },
                        { id: 's-124', name: 'Tomás Ureña Navarro', email: 'tomas.urena.navarro@est.mep.go.cr', grades: { cotidiano: 80, tareas: 78, pruebas: 75, proyecto: 82 }, conduct: 90 },
                        { id: 's-125', name: 'Jimena Oviedo Blanco', email: 'jimena.oviedo.blanco@est.mep.go.cr', grades: { cotidiano: 90, tareas: 88, pruebas: 84, proyecto: 90 }, conduct: 97 }
                    ]
                },
                {
                    id: 'g-102',
                    institutionId: 'inst-002',
                    name: '11-1 (Soporte TI)',
                    grade: 'Undécimo',
                    isGuideGroup: false,
                    students: [
                        { id: 's-201', name: 'Andrés Villalobos', email: 'andres.villalobos@est.mep.go.cr', grades: { cotidiano: 85, tareas: 80, pruebas: 82, proyecto: 88 }, conduct: 95 },
                        { id: 's-202', name: 'Elena Ramírez', email: 'elena.ramirez@est.mep.go.cr', grades: { cotidiano: 92, tareas: 95, pruebas: 90, proyecto: 94 }, conduct: 100 },
                        { id: 's-203', name: 'Jorge Delgado', email: 'jorge.delgado@est.mep.go.cr', grades: { cotidiano: 70, tareas: 65, pruebas: 60, proyecto: 75 }, conduct: 80 },
                        { id: 's-204', name: 'Lucía Mendoza', email: 'lucia.mendoza@est.mep.go.cr', grades: { cotidiano: 88, tareas: 85, pruebas: 86, proyecto: 90 }, conduct: 98 },
                        { id: 's-205', name: 'Marcos Herrera', email: 'marcos.herrera@est.mep.go.cr', grades: { cotidiano: 75, tareas: 70, pruebas: 72, proyecto: 78 }, conduct: 85 },
                        { id: 's-206', name: 'Daniela Arias', email: 'daniela.arias@est.mep.go.cr', grades: { cotidiano: 60, tareas: 55, pruebas: 50, proyecto: 65 }, conduct: 70 },
                        { id: 's-207', name: 'Fabián Ríos', email: 'fabian.rios@est.mep.go.cr', grades: { cotidiano: 95, tareas: 92, pruebas: 94, proyecto: 96 }, conduct: 100 },
                        { id: 's-208', name: 'Gabriela Solano', email: 'gabriela.solano@est.mep.go.cr', grades: { cotidiano: 82, tareas: 80, pruebas: 78, proyecto: 85 }, conduct: 92 },
                        { id: 's-209', name: 'Héctor Valverde', email: 'hector.valverde@est.mep.go.cr', grades: { cotidiano: 68, tareas: 65, pruebas: 62, proyecto: 70 }, conduct: 78 },
                        { id: 's-210', name: 'Inés Cordero', email: 'ines.cordero@est.mep.go.cr', grades: { cotidiano: 90, tareas: 88, pruebas: 75, proyecto: 82 }, conduct: 100 },
                        { id: 's-211', name: 'Julio Blanco', email: 'julio.blanco@est.mep.go.cr', grades: { cotidiano: 78, tareas: 75, pruebas: 70, proyecto: 80 }, conduct: 88 },
                        { id: 's-212', name: 'Karla Navarro', email: 'karla.navarro@est.mep.go.cr', grades: { cotidiano: 85, tareas: 82, pruebas: 84, proyecto: 88 }, conduct: 94 }
                    ]
                },
                {
                    id: 'g-103',
                    institutionId: 'inst-001',
                    name: '12-1 (Ciberseguridad)',
                    grade: 'Duodécimo',
                    isGuideGroup: false,
                    students: [
                        { id: 's-301', name: 'Luis Morales', email: 'luis.morales@est.mep.go.cr', grades: { cotidiano: 98, tareas: 95, pruebas: 92, proyecto: 97 }, conduct: 100 },
                        { id: 's-302', name: 'Mónica Castro', email: 'monica.castro@est.mep.go.cr', grades: { cotidiano: 85, tareas: 80, pruebas: 82, proyecto: 88 }, conduct: 90 },
                        { id: 's-303', name: 'Nelson Vega', email: 'nelson.vega@est.mep.go.cr', grades: { cotidiano: 75, tareas: 70, pruebas: 68, proyecto: 72 }, conduct: 82 },
                        { id: 's-304', name: 'Paola Ortiz', email: 'paola.ortiz@est.mep.go.cr', grades: { cotidiano: 92, tareas: 88, pruebas: 90, proyecto: 94 }, conduct: 98 }
                    ]
                },
                {
                    id: 'g-104',
                    institutionId: 'inst-002',
                    name: '7-1 (Matemáticas)',
                    grade: 'Séptimo',
                    isGuideGroup: true,
                    students: [
                        { id: 's-401', name: 'Santiago Mora', email: 'santiago.mora@est.mep.go.cr', grades: { cotidiano: 80, tareas: 75, pruebas: 78, proyecto: 82 }, conduct: 88 },
                        { id: 's-402', name: 'Tatiana Rojas', email: 'tatiana.rojas@est.mep.go.cr', grades: { cotidiano: 95, tareas: 92, pruebas: 90, proyecto: 94 }, conduct: 100 },
                        { id: 's-403', name: 'Ulises Vargas', email: 'ulises.vargas@est.mep.go.cr', grades: { cotidiano: 65, tareas: 60, pruebas: 55, proyecto: 60 }, conduct: 70 }
                    ]
                },
                {
                    id: 'g-105',
                    institutionId: 'inst-002',
                    name: '10-5 (Contabilidad)',
                    grade: 'Décimo',
                    isGuideGroup: false,
                    students: [
                        { id: 's-501', name: 'Valeria Salas', email: 'valeria.salas@est.mep.go.cr', grades: { cotidiano: 88, tareas: 85, pruebas: 86, proyecto: 90 }, conduct: 95 },
                        { id: 's-502', name: 'Walter Murillo', email: 'walter.murillo@est.mep.go.cr', grades: { cotidiano: 72, tareas: 70, pruebas: 68, proyecto: 74 }, conduct: 80 },
                        { id: 's-503', name: 'Ximena Araya', email: 'ximena.araya@est.mep.go.cr', grades: { cotidiano: 94, tareas: 92, pruebas: 90, proyecto: 95 }, conduct: 100 }
                    ]
                }
            ];
            setGroups(demoGroups);
            localStorage.setItem('mep_groups', JSON.stringify(demoGroups));
        }
        setLoading(false);
    }, []);

    // Sync to Storage on Change
    useEffect(() => {
        if (!loading) {
            localStorage.setItem('mep_groups', JSON.stringify(groups));
            localStorage.setItem('mep_institutions', JSON.stringify(myInstitutions));
            localStorage.setItem('mep_active_inst', activeInstitutionId);
        }
    }, [groups, loading, myInstitutions, activeInstitutionId]);

    // -------------------------------------------------------------------------
    // ACTIONS: INSTITUTIONS
    // -------------------------------------------------------------------------
    const switchInstitution = (id) => {
        setActiveInstitutionId(id);
        toast.info("Contexto institucional actualizado.");
    };

    /**
     * Adds a new educational institution to the teacher's profile.
     * @param {Object} institutionData - { name, type, region }
     */
    const addInstitution = (institutionData) => {
        const newInst = {
            id: `inst-${Date.now()}`,
            ...institutionData
        };
        const updated = [...myInstitutions, newInst];
        setMyInstitutions(updated);
        localStorage.setItem('mep_institutions', JSON.stringify(updated));

        // Auto-select if it's the first one
        if (myInstitutions.length === 0) {
            setActiveInstitutionId(newInst.id);
            localStorage.setItem('mep_active_inst', newInst.id);
        }
        toast.success("Institución agregada exitosamente.");
    };

    /**
     * Removes an institution from the profile.
     * Prevents deleting the active one if it's the only one.
     */
    const deleteInstitution = (id) => {
        if (myInstitutions.length <= 1) {
            toast.error("Debe tener al menos una institución activa.");
            return;
        }
        const updated = myInstitutions.filter(i => i.id !== id);
        setMyInstitutions(updated);
        localStorage.setItem('mep_institutions', JSON.stringify(updated));

        if (activeInstitutionId === id) {
            setActiveInstitutionId(updated[0].id);
            localStorage.setItem('mep_active_inst', updated[0].id);
        }
        toast.success("Institución eliminada.");
    };

    // -------------------------------------------------------------------------
    // ACTIONS: GROUPS
    // -------------------------------------------------------------------------

    /**
     * Creates a new student group attached to the active institution.
     * @param {string} name - The display name of the group (e.g., "10-1")
     * @param {string} grade - The academic level (e.g., "Décimo")
     * @param {string} subjectId - Optional: Linked official MEP subject ID
     */
    const addGroup = (name, grade, subjectId = null, isGuideGroup = false) => {
        const newGroup = {
            id: Date.now().toString(),
            institutionId: activeInstitutionId,
            name,
            grade,
            subjectId, // Link to official curriculum
            students: [],
            isGuideGroup: isGuideGroup
        };
        const updated = [...groups, newGroup];
        setGroups(updated);
        saveGroupsToStorage(updated);
        toast.success('Grupo creado exitosamente');
    };

    const toggleGuideGroup = (groupId) => {
        const updated = groups.map(g => g.id === groupId ? { ...g, isGuideGroup: !g.isGuideGroup } : g);
        setGroups(updated);
        saveGroupsToStorage(updated);
        toast.success("Estado de Grupo Guía actualizado.");
    };

    /**
     * Updates group details (name, grade, subject).
     * @param {string} id 
     * @param {Object} updatedData 
     */
    const updateGroup = (id, updatedData) => {
        const updated = groups.map(g => g.id === id ? { ...g, ...updatedData } : g);
        setGroups(updated);
        saveGroupsToStorage(updated);
        toast.success("Grupo actualizado correctamente.");
    };

    /**
     * Removes a group and all its students from the state.
     * @param {string} id - The unique ID of the group to delete
     */
    const deleteGroup = (id) => {
        const updated = groups.filter(g => g.id !== id);
        setGroups(updated);
        saveGroupsToStorage(updated);
        toast.success('Grupo eliminado');
    };

    // Helper to sync groups to local storage
    const saveGroupsToStorage = (newGroups) => {
        localStorage.setItem('mep_groups', JSON.stringify(newGroups));
    };


    // -------------------------------------------------------------------------
    // ACTIONS: STUDENTS
    // -------------------------------------------------------------------------

    /**
     * Adds a new student to a specific group proper structure.
     * @param {string} groupId - ID of the target group
     * @param {Object} studentData - { name, email }
     */
    const addStudent = (groupId, studentData) => {
        setGroups(groups.map(g => {
            if (g.id === groupId) {
                return {
                    ...g,
                    students: [...g.students, {
                        id: Date.now().toString(),
                        // Auto-generate MEP email if missing: [cedula]@est.mep.go.cr
                        email: studentData.email || (studentData.cedula ? `${studentData.cedula}@est.mep.go.cr` : `student-${Date.now()}@mep.go.cr`),
                        ...studentData,
                        // Defaults for safety
                        cedula: studentData.cedula || "No indicada",
                        phone: studentData.phone || "",
                        address: studentData.address || "",
                        dob: studentData.dob || "",
                        // Academic Defaults
                        grades: { cotidiano: 0, tareas: 0, pruebas: 0, proyecto: 0 },
                        conduct: 100,
                        disciplinaryTickets: []
                    }]
                };
            }
            return g;
        }));
        toast.success(`${studentData.name} añadido al grupo.`);
    };

    /**
     * Updates an existing student's personal information.
     * @param {string} groupId 
     * @param {string} studentId 
     * @param {Object} newData 
     */
    const updateStudent = (groupId, studentId, newData) => {
        setGroups(groups.map(g => {
            if (g.id === groupId) {
                return {
                    ...g,
                    students: g.students.map(s => s.id === studentId ? { ...s, ...newData } : s)
                };
            }
            return g;
        }));
        toast.success("Datos del estudiante actualizados.");
    };

    /**
     * Removes a student from a group.
     * @param {string} groupId 
     * @param {string} studentId 
     */
    const deleteStudent = (groupId, studentId) => {
        setGroups(groups.map(g => {
            if (g.id === groupId) {
                return {
                    ...g,
                    students: g.students.filter(s => s.id !== studentId)
                };
            }
            return g;
        }));
        toast.success("Estudiante eliminado.");
    };

    // -------------------------------------------------------------------------
    // ACTIONS: GRADES (The Core Request)
    // -------------------------------------------------------------------------

    /**
     * Updates a specific grade component for a student.
     * Triggers automatic final grade calculation in UI.
     * @param {string} groupId 
     * @param {string} studentId 
     * @param {string} field - 'cotidiano', 'tareas', 'pruebas', 'proyecto'
     * @param {number|string} value - New score (0-100)
     */
    const updateGrade = (groupId, studentId, field, value) => {
        setGroups(groups.map(g => {
            if (g.id === groupId) {
                return {
                    ...g,
                    students: g.students.map(s => {
                        if (s.id === studentId) {
                            return {
                                ...s,
                                grades: { ...s.grades, [field]: Number(value) }
                            };
                        }
                        return s;
                    })
                };
            }
            return g;
        }));
    };

    // -------------------------------------------------------------------------
    // ACTIONS: CONDUCT (Boletas)
    // -------------------------------------------------------------------------

    /**
     * Adds a disciplinary ticket (boleta) and deducts conduct points.
     * @param {string} groupId 
     * @param {string} studentId 
     * @param {Object} ticket - { type, points, description, date }
     */
    const addTicket = (groupId, studentId, ticket) => {
        setGroups(groups.map(g => {
            if (g.id === groupId) {
                return {
                    ...g,
                    students: g.students.map(s => {
                        if (s.id === studentId) {
                            const newTickets = [...(s.disciplinaryTickets || []), { ...ticket, id: `t-${Date.now()}` }];
                            const totalPointsLost = newTickets.reduce((acc, t) => acc + Number(t.points), 0);
                            return {
                                ...s,
                                disciplinaryTickets: newTickets,
                                conduct: Math.max(0, 100 - totalPointsLost)
                            };
                        }
                        return s;
                    })
                };
            }
            return g;
        }));
        toast.error(`Boleta registrada. Puntos rebajados: ${ticket.points}`);
    };

    /**
     * Removes a ticket and restores lost conduct points.
     * @param {string} groupId 
     * @param {string} studentId 
     * @param {string} ticketId 
     */
    const removeTicket = (groupId, studentId, ticketId) => {
        setGroups(groups.map(g => {
            if (g.id === groupId) {
                return {
                    ...g,
                    students: g.students.map(s => {
                        if (s.id === studentId) {
                            const newTickets = (s.disciplinaryTickets || []).filter(t => t.id !== ticketId);
                            const totalPointsLost = newTickets.reduce((acc, t) => acc + Number(t.points), 0);
                            return {
                                ...s,
                                disciplinaryTickets: newTickets,
                                conduct: Math.max(0, 100 - totalPointsLost)
                            };
                        }
                        return s;
                    })
                };
            }
            return g;
        }));
        toast.success("Boleta eliminada. Nota recalculada.");
    };

    // -------------------------------------------------------------------------
    // ACTIONS: ATTENDANCE (Agile System)
    // -------------------------------------------------------------------------
    const markAttendance = (groupId, studentId, date, status) => {
        // Status: 'P' (Present), 'A' (Absent), 'T' (Tardy), 'J' (Justified)
        setGroups(groups.map(g => {
            if (g.id === groupId) {
                return {
                    ...g,
                    students: g.students.map(s => {
                        if (s.id === studentId) {
                            const record = s.attendance || {};
                            return {
                                ...s,
                                attendance: { ...record, [date]: status }
                            };
                        }
                        return s;
                    })
                };
            }
            return g;
        }));
    };

    // -------------------------------------------------------------------------
    // HELPERS: CALCULATIONS
    // -------------------------------------------------------------------------

    /**
     * Calculates the final weighted average grade based on current rules.
     * @param {Object} grades - { cotidiano, tareas, pruebas, proyecto }
     * @returns {string} Final grade formatted to 1 decimal place.
     */
    const calculatefinal = (grades) => {
        if (!grades) return "0";
        const g = grades;
        const final =
            (g.cotidiano * (rules.weights.cotidiano / 100)) +
            (g.tareas * (rules.weights.tareas / 100)) +
            (g.pruebas * (rules.weights.pruebas / 100)) +
            (g.proyecto * (rules.weights.proyecto / 100));
        return final.toFixed(1);
    };

    /**
     * Updates the evaluation weights and global rules.
     * @param {Object} newRules - New rules configuration object
     */
    const updateRules = (newRules) => {
        setRules(newRules);
        toast.success("Normativa de evaluación actualizada exitosamente.");
    };

    /**
     * Calculates attendance statistics for a given group.
     * @param {string} groupId 
     * @returns {Object} { present, absent, late }
     */
    const getAttendanceStats = (groupId) => {
        const group = groups.find(g => g.id === groupId);
        if (!group) return { present: 0, absent: 0, late: 0 };

        let totalP = 0, totalA = 0, totalL = 0;

        group.students.forEach(student => {
            const records = Object.values(student.attendance || {});
            totalP += records.filter(s => s === 'P').length;
            totalA += records.filter(s => s === 'A').length;
            totalL += records.filter(s => s === 'T').length;
        });

        return { present: totalP, absent: totalA, late: totalL };
    };

    // -------------------------------------------------------------------------
    // DERIVED STATE: Filter Groups by Active Institution
    // -------------------------------------------------------------------------
    const visibleGroups = groups.filter(g => g.institutionId === activeInstitutionId);
    const currentInstitution = myInstitutions.find(i => i.id === activeInstitutionId) || myInstitutions[0];

    return (
        <GroupsContext.Provider value={{
            groups: visibleGroups, // EXPOSE ONLY FILTERED GROUPS
            allGroups: groups, // RAW ACCESS IF NEEDED
            myInstitutions,
            activeInstitution: currentInstitution,
            addInstitution,
            switchInstitution,
            deleteInstitution, // NEW: Export delete action
            loading,
            addGroup,
            updateGroup,
            deleteGroup,
            addStudent,
            updateStudent,
            deleteStudent,
            updateGrade,
            addTicket,
            removeTicket,
            toggleGuideGroup,
            calculatefinal,
            markAttendance,
            getAttendanceStats,
            rules,
            updateRules
        }}>
            {children}
        </GroupsContext.Provider>
    );
}

export function useGroups() {
    return useContext(GroupsContext);
}
