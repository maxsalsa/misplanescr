"use client";
import { useState, useEffect } from 'react';
import { MEP_DATA } from '@/lib/mep-data';
import { MODALIDADES_EDUCATIVAS, CATALOGO_ESTRATEGIAS } from '@/lib/normativa';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useAuth } from '@/context/auth-context';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';
import { useSaaS } from '@/context/saas-context';

import { useGroups } from '@/context/groups-context';
import { PEDAGOGY_RULES, getContextData } from '@/lib/pedagogy-rules';
import { savePlan } from '@/lib/plans-service';
import { toast } from 'sonner';
import GeneratorHeader from './components/GeneratorHeader';
import ModeSelector from './components/ModeSelector';
import GeneratorConfigForm from './components/GeneratorConfigForm';
import GeneratorAIConfig from './components/GeneratorAIConfig';
import GeneratorResourceConfig from './components/GeneratorResourceConfig';

/**
 * Página Principal del Generador de Planeamiento (Core Feature).
 * 
 * Responsabilidades:
 * 1. Gestión de modos de operación (Clásico vs IA vs Recursos).
 * 2. Orquestación del flujo de "Pasos" (Configuración -> Selección -> Generación).
 * 3. Integración con el `ai-service` para la generación de contenido normativo.
 * 4. Manejo de restricciones de negocio (Demo vs Pro) mediante `SaaSContext`.
 *
 * Modos Operativos:
 * - **Clásico**: Selección manual de plantillas (Legacy).
 * - **IA Normativa (MEP-PLANNER)**: Análisis RAG de PDFs oficiales.
 * - **Recursos**: Generación de material lúdico y evaluación.
 * 
 * @component
 */
export default function GeneratorPage() {
    const { user } = useAuth();
    const { activeInstitution } = useGroups();
    const router = useRouter();

    // Auto-Detect Context based on Active Institution
    const contextRules = getContextData(activeInstitution);

    // Security Check: Only Teachers/Admins can access this page
    // Accept both mock roles (teacher, admin) and real DB roles (SUPER_ADMIN, DOCENTE, DOCENTE_TECNICO)
    const allowedRoles = ['teacher', 'admin', 'teacher-active', 'SUPER_ADMIN', 'DOCENTE', 'DOCENTE_TECNICO'];
    if (user && !allowedRoles.includes(user.role)) {
        router.push('/dashboard/student'); // Redirect students to their zone
        return null;
    }

    const [step, setStep] = useState(1);
    /**
     * Configuration State for the Generator.
     * Follows the hierarchical structure of MEP education.
     * @typedef {Object} GeneratorConfig
     * @property {string} modality - The educational modality (e.g., "Secundaria Técnica Profesional").
     * @property {string} grade - The Grade or Level (e.g., "Décimo (10°)").
     * @property {string} period - The academic period (e.g., "I Periodo").
     * @property {string} subject - The Subject or Specialty (e.g., "Informática en Desarrollo Web").
     * @property {string} subArea - (Optional) The specific sub-modules for Technical specialties.
     */
    /**
     * @typedef {Object} ConfiguracionCurricular
     * @property {string} modalidad - (Nivel 0) La modalidad educativa oficial (ej. "Secundaria Técnica Profesional").
     * @property {string} nivel - (Nivel 2) El grado o nivel académico (ej. "Décimo (10°)").
     * @property {string} periodo - El ciclo lectivo vigente (ej. "I Periodo").
     * @property {string} asignatura - (Nivel 1/3) La materia o especialidad.
     * @property {string} sub_area - (Nivel 3) Sub-módulo técnico específico.
     */
    const [configuracion_curricular, setConfiguracionCurricular] = useState({
        modalidad: activeInstitution?.type || 'Educación Técnica (ETP)', // Auto-fill from Context
        nivel: '',
        periodo: 'I Semestre',
        asignatura: '',
        sub_area: ''
    });

    // ESTADO DE MODO IA (MEP-PLANNER INTELLIGENCE)
    const [modo_operativo, setModoOperativo] = useState('ia_normativa'); // 'clasico' | 'ia_normativa' | 'recursos'
    const [archivos_oficiales, setArchivosOficiales] = useState([]); // Array of Files

    // ESTADO PARA RECURSOS DIDÁCTICOS
    const [config_recurso, setConfigRecurso] = useState({
        contexto: '', // El texto del plan o unidad
        tipo: 'Quiz Interactivo',
        nivel: '10'
    });

    /**
     * @typedef {Object} ConfiguracionIA
     * @property {string} sub_area - MEP Nivel 3: Subárea Técnica.
     * @property {string} nivel - MEP Nivel 2: Nivel Académico.
     * @property {string} unidad - MEP Nivel 4: Unidad Didáctica Oficial.
     * @property {string} horas_lectivas - Recurso temporal para cronograma.
     * @property {string} periodo - "I Semestre" | "II Semestre"
     * @property {string} grupo - Identificador (ej. 10-1)
     * @property {string} modalidad - Contexto (ej. Diurno)
     */
    const [configuracion_ia, setConfiguracionIA] = useState({
        sub_area: '',
        nivel: '',
        unidad: '',
        horas_lectivas: '10',
        periodo: 'I Semestre',
        grupo: '',
        modalidad: '',
        variability: 'estandar' // estandar | creativo | innovador | disruptivo
    });

    // UX STATES: Smart Stepper & Feedback
    const [cargando_ia, setCargandoIA] = useState(false);
    const [estado_progreso, setEstadoProgreso] = useState(''); // 'validando', 'leyendo', 'generando', 'finalizando'
    const [resultado_plan, setResultadoPlan] = useState(null);
    const [error_validacion, setErrorValidacion] = useState(null);

    const handleGenerarRecurso = async () => {
        if (!config_recurso.contexto || config_recurso.contexto.length < 50) {
            setErrorValidacion("El contexto es muy corto. Pegue el plan de unidad completo.");
            return;
        }
        setCargandoIA(true);
        setErrorValidacion(null);
        try {
            const res = await fetch('/api/resource', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(config_recurso)
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            setResultadoPlan(data.result);
        } catch (e) {
            setErrorValidacion(e.message);
        } finally {
            setCargandoIA(false);
        }
    };

    /**
     * Guarda el plan actual en la "Base de Datos" (LocalStorage)
     */
    const handleSaveDB = async () => {
        if (!resultado_plan) return;

        try {
            toast.loading("Guardando planeamiento...");

            // Extract JSON or use Text if JSON fails
            let jsonPayload = {};
            if (resultado_plan.includes('---JSON_DATA_START---')) {
                const raw = resultado_plan.split('---JSON_DATA_START---')[1].replace('---JSON_DATA_END---', '');
                try { jsonPayload = JSON.parse(raw); } catch (e) { console.error("JSON Parse Error", e); }
            }

            await savePlan({
                title: `${configuracion_curricular.asignatura} - ${configuracion_curricular.unidad || configuracion_ia.unidad || 'Unidad'}`,
                userId: user?.id || 'demo-user',
                institutionId: activeInstitution?.id || 'demo-inst',
                description: `Modalidad: ${configuracion_curricular.modalidad} | Nivel: ${configuracion_curricular.nivel}`,
                data: jsonPayload,
                rawContent: resultado_plan
            });

            toast.dismiss();
            toast.success("¡Plan guardado en tu portafolio digital!");

            // Redirect logic (Opcional)
            // router.push('/dashboard/planning');
        } catch (error) {
            toast.dismiss();
            toast.error("Error al guardar el plan.");
        }
    };

    /**
     * Validates input before sending to API.
     * Defensive Programming: Client-side sanitization.
     */
    const validarEntradaIA = () => {
        // Validación bypass si estamos en modo recursos
        if (modo_operativo === 'recursos') return;

        // if (archivos_oficiales.length === 0) throw new Error("⚠️ Requisito Faltante: Debe cargar al menos un PDF oficial.");
        if (archivos_oficiales.length === 0) {
            // RAG MODE ENABLED: We allow proceeding without files
            // console.log("RAG Mode: No files uploaded, relying on backend knowledge base.");
        }

        // Validate MIME type locally
        for (const file of archivos_oficiales) {
            if (file.type !== "application/pdf") {
                throw new Error(`⛔ Formato Incorrecto: El archivo ${file.name} no es un PDF válido.`);
            }
            if (file.size > 15 * 1024 * 1024) { // Increased to 15MB
                throw new Error(`Heavy File: El documento ${file.name} excede el límite de 15MB.`);
            }
        }

        if (!configuracion_ia.sub_area.trim() || !configuracion_ia.nivel.trim() || !configuracion_ia.unidad.trim() || !configuracion_ia.periodo.trim() || !configuracion_ia.grupo.trim() || !configuracion_ia.modalidad.trim()) {
            throw new Error("⚠️ Campos Vacíos: Por favor complete la información curricular.");
        }
    };

    const handleAIGenerate = async () => {
        setCargandoIA(true);
        setErrorValidacion(null);
        setResultadoPlan(null);
        setEstadoProgreso('validando');

        try {
            // 1. Validation Phase
            validarEntradaIA();

            // 2. Reading Phase
            setEstadoProgreso('leyendo');
            // Artificial delay for UX perception (User feels "work" is being done)
            await new Promise(r => setTimeout(r, 800));

            const formData = new FormData();
            // Append Multiple Files
            archivos_oficiales.forEach(file => {
                formData.append('file', file);
            });

            formData.append('subArea', configuracion_ia.sub_area.trim());
            formData.append('level', configuracion_ia.nivel.trim());
            formData.append('unit', configuracion_ia.unidad.trim());
            formData.append('hours', configuracion_ia.horas_lectivas);
            formData.append('period', configuracion_ia.periodo);
            formData.append('group', configuracion_ia.grupo.trim());
            formData.append('modality', configuracion_ia.modalidad.trim());

            // 3. Generation Phase
            setEstadoProgreso('generando');

            // VARIABILITY OVERRIDE (Anti-Repetition Engine)
            let focusOverride = contextRules.focus;
            let toneOverride = contextRules.tone;

            // V49 SENTINEL: Enforce MEP Syntax always
            const MEP_SYNTAX_REMINDER = " REGLA DE ORO: Las estrategias de mediación deben redactarse en tercera persona infinitivo/impersonal o explícitamente como 'La persona docente...' y 'La persona estudiante...'. NUNCA usar 'El docente' o 'El alumno'.";

            if (configuracion_ia.variability === 'creativo') {
                focusOverride = "Enfoque Lúdico: Gamificación, Pausas Activas y Dinámicas de Juego." + MEP_SYNTAX_REMINDER;
            } else if (configuracion_ia.variability === 'innovador') {
                focusOverride = "Aprendizaje Basado en Proyectos (ABP) y Resolución de Problemas Reales." + MEP_SYNTAX_REMINDER;
            } else if (configuracion_ia.variability === 'disruptivo') {
                focusOverride = "Metodología Socrática, Debates, Simulaciones de Alto Nivel y Retos." + MEP_SYNTAX_REMINDER;
                toneOverride = "Desafiante, Provocador y Profesional";
            } else {
                focusOverride += MEP_SYNTAX_REMINDER;
            }

            // INJECT PEDAGOGICAL CONTEXT INTO API
            formData.append('pedagogy_focus', focusOverride);
            formData.append('pedagogy_tone', toneOverride);
            formData.append('pedagogy_forbidden', contextRules.forbidden);
            formData.append('pedagogy_dua', contextRules.dua_prompt); // Pass DUA instructions
            formData.append('columns_structure', JSON.stringify(contextRules.columns));

            const res = await fetch('/api/generate', {
                method: 'POST',
                body: formData
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Fallo crítico en la generación normativa.');

            // 4. Finalizing Phase
            setEstadoProgreso('finalizando');
            await new Promise(r => setTimeout(r, 500)); // Smooth transition

            setResultadoPlan(data.plan);

        } catch (err) {
            console.error("Error UI:", err);
            setErrorValidacion(err.message);
        } finally {
            setCargandoIA(false);
            setEstadoProgreso('');
        }
    };

    // --- DYNAMIC CATALOG INTEGRATION & FILTERS ---
    const [catalog, setCatalog] = useState([]); // Flat Array from API
    const [loadingCatalog, setLoadingCatalog] = useState(true);
    const { hasAccessToSubject } = useAuth(); // Auth Context for Premium Logic

    // Load Catalog on Mount
    useEffect(() => {
        const fetchCatalog = async () => {
            try {
                const res = await fetch('/api/catalog');
                if (res.ok) {
                    const data = await res.json();
                    setCatalog(data); // Expecting [{ id, modalidad, nivel, nombre, ... }, ...]
                }
            } catch (error) {
                console.error("Failed to load catalog:", error);
                toast.error("Error cargando el catálogo oficial.");
            } finally {
                setLoadingCatalog(false);
            }
        };
        fetchCatalog();
    }, []);

    // --- LOGIC MOVED TO GeneratorConfigForm ---


    // Placeholder for SelectedData logic
    const selectedData = [];

    const handleGenerate = () => {
        if (selectedItems.length === 0) return;
        setStep(2);

        // Simulate AI Strategy Generation
        const newStrategies = {};
        selectedItems.forEach(itemId => {
            // Find the item in our selected data
            const item = selectedData.find(i => i.id === itemId);
            if (item) {
                // Generate strategies...
                const subjectKey = configuracion_curricular.asignatura.toLowerCase();
                // Simple keyword matching for demo purposes
                let strategyType = 'exploracion';
                if (subjectKey.includes('matem')) strategyType = 'aplicacion';
                if (subjectKey.includes('español')) strategyType = 'contrastacion';

                newStrategies[itemId] = {
                    focalizacion: CATALOGO_ESTRATEGIAS['focalizacion'][Math.floor(Math.random() * 3)],
                    exploracion: item.sugerencias?.[0] || CATALOGO_ESTRATEGIAS['exploracion'][0],
                    contrastacion: CATALOGO_ESTRATEGIAS['contrastacion'][0],
                    aplicacion: item.sugerencias?.[1] || CATALOGO_ESTRATEGIAS['aplicacion'][0]
                };
            }
        });
        setGeneratedStrategies(newStrategies);
    };
    const toggleItem = (item) => {
        if (selectedItems.find(i => i.id === item.id)) {
            setSelectedItems(selectedItems.filter(i => i.id !== item.id));
            const newStrat = { ...generatedStrategies };
            delete newStrat[item.id];
            setGeneratedStrategies(newStrat);
        } else {
            setSelectedItems([...selectedItems, item]);

            // AI SIMULATION: Adapt strategy based on Modality
            // Safe lookup with fallback
            const modalityInfo = MODALIDADES_EDUCATIVAS[configuracion_curricular.modalidad] || MODALIDADES_EDUCATIVAS["Secundaria Técnica Profesional"];
            const promptContext = modalityInfo?.tips_ia || "Enfoque general.";

            // Select Random Interactive Strategy
            const categorias = ['individuales', 'parejas', 'grupales', 'ludicas'];
            const randomCat = categorias[Math.floor(Math.random() * categorias.length)];
            const estrategias = CATALOGO_ESTRATEGIAS?.[randomCat] || [];
            const randomStrat = estrategias.length > 0 ? estrategias[Math.floor(Math.random() * estrategias.length)] : { nombre: 'Lluvia de Ideas', descripcion: 'Generar ideas en grupo.' };

            let strategyText = `**ENFOQUE: ${modalityInfo.enfoque}**\n\n`;

            if (configuracion_curricular.modalidad === "Preescolar") {
                strategyText += `1. MOMENTO VIVENCIAL:\n   - ${promptContext.split('.')[0]}.\n   - La docente invita a los niños a... (Actividad lúdica inicial).\n\n2. JUEGO-TRABAJO:\n   - En rincones de aprendizaje, los niños exploran "${item.aprendizaje}".\n   - Materiales concretos y manipulación.\n\n3. CIERRE:\n   - Círculo de conversación para compartir lo vivido.`;
            } else if (configuracion_curricular.modalidad === "Educación de Adultos (IPEC / CINDEA)") {
                strategyText += `1. RECUPERACIÓN DE EXPERIENCIA:\n   - Discusión grupal sobre experiencias previas laborales o vitales relacionadas a "${item.aprendizaje}".\n\n2. CONSTRUCCIÓN:\n   - Análisis de casos prácticos aplicables al trabajo.\n   - Trabajo colaborativo flexible.\n\n3. APLICACIÓN:\n   - Resolución de un problema real del entorno del estudiante.`;
            } else {
                // Secondary / Technical Standard (4 Phases) - MEP Compliant Style
                strategyText += `1. FOCALIZACIÓN:\n   - La persona docente plantea una pregunta generadora sobre "${item.aprendizaje}".\n   - La persona estudiante participa en una lluvia de ideas inicial.\n\n2. EXPLORACIÓN:\n   - La persona estudiante investiga los conceptos claves mediante fuentes bibliográficas.\n\n3. CONTRASTACIÓN:\n   - La persona docente realiza una síntesis técnica de los hallazgos.\n   - La persona estudiante contrasta su investigación previa con la explicación magistral.\n\n4. APLICACIÓN:\n   - La persona estudiante ejecuta ${configuracion_curricular.modalidad === 'Educación Técnica (ETP)' ? 'una práctica de taller / simulación industrial' : 'la resolución de ejercicios / proyecto'}.\n   - Evidencia: ${item.evidencias ? item.evidencias[2] : 'Informe técnico final'}`;
            }

            // Append the interactive strategy
            strategyText += `\n\n⭐ DINÁMICA INTERACTIVA (${randomStrat.nombre}):\n   - ${randomStrat.descripcion}`;

            setGeneratedStrategies(prev => ({
                ...prev,
                [item.id]: strategyText
            }));
        }
    };

    const { isFree, userProfile, upgradePlan, checkLimit, incrementUsage, isAdmin } = useSaaS();

    const generatePDF = (mode = 'download') => {
        // Business Logic Check
        if (mode === 'download') {
            if (isFree && !isAdmin) {
                // Should not happen via UI, but safety check
                alert("Upgrade required for full download.");
                return;
            }
            if (!checkLimit('plansCreated')) {
                alert("Has alcanzado el límite mensual de planes. Mejora a Anual para ilimitado.");
                return;
            }
        }

        // LANDSCAPE MODE
        const doc = new jsPDF({ orientation: 'landscape' });
        const pageWidth = doc.internal.pageSize.width; // ~297mm
        const pageHeight = doc.internal.pageSize.height; // ~210mm

        // --- WATERMARK (Mode Dependant) ---
        if (isFree && !isAdmin) {
            doc.setTextColor(200, 200, 200);
            doc.setFontSize(80);
            doc.setFont("helvetica", "bold");
            doc.text("VISTA PREVIA", pageWidth / 2, pageHeight / 2, { align: 'center', angle: 45 });
            doc.setFontSize(30);
            doc.text("SOLO LECTURA - SIN VALIDEZ OFICIAL", pageWidth / 2, (pageHeight / 2) + 30, { align: 'center', angle: 45 });
        }

        // 2. Footer License Trace
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        const timestamp = new Date().toLocaleString();
        doc.text(`Licenciado a: ${userProfile.name} [${userProfile.institution}] | Generado: ${timestamp} | ID: ${Math.random().toString(36).substr(2, 9)}`, 10, pageHeight - 5);
        doc.text("Prohibida su distribución no autorizada. Documento rastreable.", pageWidth - 10, pageHeight - 5, { align: 'right' });


        // --- OFFICIAL LAYOUT (LANDSCAPE ADAPTATION) ---
        doc.setFillColor(30, 58, 138);
        doc.setFontSize(10);
        doc.setTextColor(50);

        // Logos / Left Header
        doc.setFont("helvetica", "bold");
        doc.text(userProfile.institution.toUpperCase(), 15, 15); // Custom Institution
        doc.setFont("helvetica", "normal");
        doc.text(`Departamento de ${configuracion_curricular.modalidad === 'Educación Técnica (ETP)' ? 'Especialidades Técnicas' : 'Desarrollo Curricular'}`, 15, 20);

        // Title Center
        doc.setFontSize(18);
        doc.setTextColor(30, 58, 138);
        doc.setFont("helvetica", "bold");
        doc.text(`PLANEAMIENTO - ${configuracion_curricular.asignatura.toUpperCase()}`, pageWidth / 2, 25, { align: 'center' });
        doc.setFontSize(12);
        doc.setTextColor(80);
        doc.text(`${configuracion_curricular.modalidad}  |  Nivel: ${configuracion_curricular.nivel}  |  Curso: 2025`, pageWidth / 2, 32, { align: 'center' });

        // Footer Shapes
        doc.setFillColor(30, 58, 138);
        doc.triangle(0, pageHeight, 100, pageHeight, 0, pageHeight - 40, 'F');
        doc.setFillColor(251, 191, 36);
        doc.triangle(0, pageHeight, 60, pageHeight, 0, pageHeight - 20, 'F');

        // --- CONTENT TABLE ---
        const modalityInfo = MODALIDADES_EDUCATIVAS[configuracion_curricular.modalidad] || {};
        // --- CONTENT TABLE ---
        // DYNAMIC HEADERS FROM PEDAGOGY RULES
        // If contextRules is active (AI Mode), use it. Else fallback to classic logic.
        const activeColumns = (modo_operativo === 'ia_normativa' && contextRules.columns)
            ? contextRules.columns
            : (configuracion_curricular.modalidad === 'Preescolar'
                ? ['Aprendizaje / Conducta', 'Estrategias de Mediación (Vivencias)', 'Indicadores (Cualitativo)']
                : ['Aprendizaje Esperado', 'Estrategias de Mediación', 'Indicadores / Criterios', 'Adecuación DUA']);

        const headers = [activeColumns];

        const rows = selectedItems.map(item => {
            // Map JSON properties to columns dynamic order
            // This is a simplification assuming the AI returns "col1, col2, col3, col4" structure
            // Or mapping standard fields if in classic mode
            if (modo_operativo === 'ia_normativa') {
                return [
                    item.col1 || item.aprendizaje || "N/A",
                    item.col2 || item.estrategias || item.mediacion || "N/A",
                    item.col3 || item.evaluacion || item.indicadores || "N/A",
                    item.col4 || item.dua || "Ver anexo DUA."
                ];
            }

            // Classic Fallback
            return [
                item.aprendizaje,
                generatedStrategies[item.id] || "Pendiente...",
                item.indicadores.join("\n• "),
                "Aplicar Principio I (Audio/Video)" // DUA Placeholder for Classic
            ];
        });

        doc.autoTable({
            startY: 45, // Adjusted for Landscape
            head: headers,
            body: rows,
            theme: 'grid',
            headStyles: { fillColor: [30, 58, 138], textColor: 255, fontStyle: 'bold' },
            styles: { fontSize: 10, cellPadding: 4, lineColor: [200, 200, 200], overflow: 'linebreak' },
            columnStyles: {
                0: { cellWidth: 50 },
                1: { cellWidth: 100 },
                2: { cellWidth: 60 },
                3: { cellWidth: 50 } // DUA Column
            }
        });

        // Set properties to discourage modification (Software dependent)
        doc.setProperties({
            title: `Plan ${configuracion_curricular.asignatura}`,
            subject: 'Planeamiento Didáctico MEP',
            author: userProfile.name,
            keywords: 'MEP, Planeamiento, Confidencial',
            creator: 'AulaPlan Platform'
        });

        if (mode === 'preview') {
            const pdfBlob = doc.output('blob');
            const url = URL.createObjectURL(pdfBlob);
            window.open(url, '_blank');
        } else {
            doc.save(`plan_${configuracion_curricular.modalidad.slice(0, 3)}_${configuracion_curricular.asignatura}_Oficial.pdf`);
            incrementUsage('plansCreated');
        }
    };

    return (
        <div className="space-y-6 md:space-y-8 max-w-5xl mx-auto px-4 md:px-8">
            <div className="text-center md:text-left flex flex-col md:flex-row justify-between items-start">
                <GeneratorHeader activeInstitution={activeInstitution} modoOperativo={modo_operativo} />
                <ModeSelector
                    modoOperativo={modo_operativo}
                    setModoOperativo={setModoOperativo}
                    setStep={setStep}
                />
            </div>

            {/* Responsive Steps: Horizontal icons on mobile, full text on desktop */}
            <ul className="steps w-full text-xs md:text-sm font-medium">
                <li className={`step ${step >= 1 ? 'step-primary' : ''}`} data-content={step >= 1 ? "✓" : "1"}>Config</li>
                <li className={`step ${step >= 2 ? 'step-primary' : ''}`} data-content={step >= 2 ? "✓" : "2"}>Selección</li>
                <li className={`step ${step >= 3 ? 'step-primary' : ''}`} data-content={step >= 3 ? "✓" : "3"}>Mediación</li>
                <li className={`step ${step >= 4 ? 'step-primary' : ''}`} data-content={step >= 4 ? "★" : "4"}>Listo</li>
            </ul>

            {step === 1 && modo_operativo === 'clasico' && (
                <div className="card glass-card p-4 md:p-8 animate-fade-in border-0 md:border border-slate-200 shadow-xl md:shadow-sm">
                    <h3 className="card-title mb-6">Configuración</h3>

                    {/* DEMO MODE BANNER */}
                    {isFree && (
                        <div className="alert alert-warning shadow-sm mb-6 border-l-4 border-l-amber-500">
                            <Lock className="stroke-current shrink-0 h-6 w-6" />
                            <div>
                                <h3 className="font-bold">Modo Demostración</h3>
                                <div className="text-xs">
                                    Estás utilizando la versión de prueba. <br />
                                    <span className="font-semibold block mt-1">
                                        Solo los usuarios PRO pueden configurar sus propias asignaturas y grupos.
                                    </span>
                                </div>
                            </div>
                            <Link href="/pricing" className="btn btn-sm btn-outline">Actualizar</Link>
                        </div>
                    )}

                    <GeneratorConfigForm
                        catalog={catalog}
                        configuracion_curricular={configuracion_curricular}
                        setConfiguracionCurricular={setConfiguracionCurricular}
                        activeInstitution={activeInstitution}
                    />

                    <div className="form-control flex items-end mt-6">
                        <button
                            className="btn btn-primary w-full btn-lg md:btn-md gap-2 shadow-lg shadow-indigo-500/30"
                            onClick={handleGenerate}
                            disabled={!configuracion_curricular.asignatura || isSubjectLocked(configuracion_curricular.asignatura)}
                        >
                            {isSubjectLocked(configuracion_curricular.asignatura) ? (
                                <>
                                    <Lock size={20} /> Bloqueado
                                </>
                            ) : (
                                <>
                                    <BookOpen size={20} />
                                    {loadingCatalog ? 'Cargando...' : 'Consultar Programa'}
                                </>
                            )}
                        </button>
                    </div>
                </div>
            )}

            {step === 1 && modo_operativo === 'ia_normativa' && (
                <GeneratorAIConfig
                    configuracion_ia={configuracion_ia}
                    setConfiguracionIA={setConfiguracionIA}
                    archivos_oficiales={archivos_oficiales}
                    setArchivosOficiales={setArchivosOficiales}
                    handleAIGenerate={handleAIGenerate}
                    cargando_ia={cargando_ia}
                    error_validacion={error_validacion}
                    estado_progreso={estado_progreso}
                />
            )}

            {step === 1 && modo_operativo === 'recursos' && (
                <GeneratorResourceConfig
                    config_recurso={config_recurso}
                    setConfigRecurso={setConfigRecurso}
                    handleGenerarRecurso={handleGenerarRecurso}
                    cargando_ia={cargando_ia}
                    resultado_plan={resultado_plan}
                    error_validacion={error_validacion}
                />
            )}

            {step === 2 && (
                <div className="space-y-6 animate-fade-in">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-2 p-4 bg-indigo-50/50 rounded-xl border border-indigo-100">
                        <div>
                            <h3 className="font-bold text-xl text-slate-700 flex items-center gap-2">
                                {MODALIDADES_EDUCATIVAS[configuracion_curricular.modalidad]?.icon} Selección de Aprendizajes
                            </h3>
                            <p className="text-sm text-slate-500">Selecciona los elementos para construir tu mediación pedagógica.</p>
                        </div>
                        <div className="flex gap-2">
                            <div className="badge badge-lg badge-primary badge-outline gap-2">
                                {configuracion_curricular.modalidad}
                            </div>
                            <div className="badge badge-lg badge-secondary badge-outline gap-1" title="Diseño Universal para el Aprendizaje">
                                ♿ DUA Activo
                            </div>
                        </div>
                    </div>

                    {selectedData.length === 0 && (
                        <div className="alert alert-warning shadow-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                            <div>
                                <h3 className="font-bold">No se encontraron datos curriculares</h3>
                                <div className="text-xs">
                                    Parece que no hay programas cargados para <b>{configuracion_curricular.asignatura}</b> en este nivel.
                                    <br />Intenta con: <b>Desarrollo Web</b> (Técnica) o <b>Estudios Sociales</b> (Primaria 4°).
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Default grouping since data is flat array */
                        selectedData.length > 0 && (
                            <div className="collapse collapse-arrow bg-white border border-slate-200 shadow-sm rounded-xl">
                                <input type="checkbox" defaultChecked />
                                <div className="collapse-title text-base md:text-lg font-bold flex items-center gap-3 text-slate-800">
                                    <span className="badge badge-neutral shrink-0">Resultados de Aprendizaje</span>
                                    <span className="truncate">{selectedData.length} items disponibles</span>
                                </div>
                                <div className="collapse-content bg-slate-50/50 p-2 md:p-4">
                                    <div className="space-y-3 mt-2">
                                        {selectedData.map(item => (
                                            <label key={item.id} className={`flex items-start gap-3 p-3 md:p-4 rounded-xl border cursor-pointer active:scale-[0.98] transition-transform touch-manipulation ${selectedItems.find(i => i.id === item.id) ? 'border-indigo-500 bg-indigo-50/50 ring-1 ring-indigo-500 shadow-sm' : 'border-slate-200 bg-white hover:border-indigo-300'}`}>
                                                <input type="checkbox" className="checkbox checkbox-primary checkbox-lg mt-1"
                                                    checked={!!selectedItems.find(i => i.id === item.id)}
                                                    onChange={() => toggleItem(item)}
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <div className="font-bold text-slate-800 text-base md:text-lg break-words leading-tight">{item.aprendizaje}</div>
                                                    <div className="mt-3 space-y-2">
                                                        {(item.indicadores || []).map((ind, k) => (
                                                            <div key={k} className="text-xs md:text-sm text-slate-600 flex items-start gap-2 bg-white/50 p-1.5 rounded-lg border border-slate-100">
                                                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0"></span>
                                                                <span>{ind}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    <div className="flex flex-col-reverse md:flex-row justify-between gap-4 pt-4 pb-20 md:pb-0">
                        <button className="btn btn-ghost btn-block md:btn-wide btn-lg md:btn-md hover:bg-slate-100" onClick={() => setStep(1)}>
                            ← Volver a Configuración
                        </button>
                        <button className="btn btn-primary btn-action btn-block md:btn-wide btn-lg md:btn-md shadow-lg shadow-indigo-500/30 border-indigo-500" onClick={() => setStep(3)} disabled={selectedItems.length === 0}>
                            Continuar al Diseño ({selectedItems.length}) →
                        </button>
                    </div>
                </div>
            )}

            {step === 3 && (
                <div className="space-y-6 animate-fade-in pb-20 md:pb-0">
                    <div className="alert bg-gradient-to-r from-indigo-50 to-white text-indigo-900 border-indigo-100 flex flex-col md:flex-row gap-3 shadow-md rounded-xl">
                        <div className="flex gap-2 items-center">
                            <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">Asistente Pedagógico (Enfoque {MODALIDADES_EDUCATIVAS[configuracion_curricular.modalidad]?.enfoque || "General"})</h3>
                                <div className="text-sm opacity-80 mt-1">{MODALIDADES_EDUCATIVAS[configuracion_curricular.modalidad]?.tips_ia}</div>
                            </div>
                        </div>
                    </div>

                    {selectedItems.map(item => (
                        <div key={item.id} className="card bg-white shadow-md border border-slate-100">
                            <div className="card-body p-4 md:p-8">
                                <div className="flex items-start gap-3 mb-2">
                                    <div className="badge badge-primary mt-1 shrink-0">META</div>
                                    <h3 className="font-bold text-base md:text-lg text-slate-800">{item.aprendizaje}</h3>
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold text-slate-600">Estrategia de Mediación</span>
                                    </label>
                                    <textarea className="textarea textarea-bordered h-48 text-base leading-relaxed focus:border-indigo-500 font-mono text-slate-700"
                                        value={generatedStrategies[item.id]}
                                        onChange={(e) => setGeneratedStrategies({ ...generatedStrategies, [item.id]: e.target.value })}
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="flex flex-col-reverse md:flex-row justify-between gap-4 pt-4">
                        <button className="btn btn-block md:btn-wide btn-lg md:btn-md" onClick={() => setStep(2)}>Atrás</button>
                        <button className="btn btn-primary btn-action btn-block md:btn-wide btn-lg md:btn-md" onClick={() => setStep(4)}>Finalizar y Revisar</button>
                    </div>
                </div>
            )}

            {step === 4 && (
                <div className="card bg-white shadow-xl text-center py-12 md:py-16 border border-slate-100 animate-fade-in">
                    <div className="card-body items-center p-4 md:p-8">
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-emerald-100 flex items-center justify-center mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 md:h-12 md:w-12 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
                            {modo_operativo === 'ia_normativa' ? 'Plan Generado con IA' : '¡Planeamiento Listo!'}
                        </h2>
                        <p className="max-w-lg text-slate-500 mt-4 text-base md:text-lg">
                            {modo_operativo === 'ia_normativa' ? 'Revisa el contenido normativo generado abajo.' : `Documento compilado para ${configuracion_curricular.modalidad}.`}
                        </p>

                        {/* AI RESULT PREVIEW - HYBRID ARCHITECTURE */}
                        {modo_operativo === 'ia_normativa' && resultado_plan && (
                            <div className="w-full text-left mt-8">
                                <div role="tablist" className="tabs tabs-lifted">
                                    <input type="radio" name="result_tabs" role="tab" className="tab font-bold" aria-label="Vista Docente" defaultChecked />
                                    <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6 shadow-sm">
                                        <div className="prose max-w-none">
                                            {/* Render Markdown Part Only (Hide JSON) */}
                                            {/* Render Markdown Part Only (Hide JSON) */}
                                            <div dangerouslySetInnerHTML={{ __html: resultado_plan.split('---JSON_DATA_START---')[0].replace(/\n/g, '<br/>') }} className={`whitespace-pre-wrap font-sans text-sm ${isFree && !isAdmin ? 'mask-gradient' : ''}`} />

                                            {isFree && !isAdmin && (
                                                <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-white to-transparent flex items-end justify-center pb-8">
                                                    <div className="alert alert-warning shadow-lg max-w-md border-l-4 border-amber-500">
                                                        <Lock className="w-6 h-6" />
                                                        <div>
                                                            <h3 className="font-bold">Vista Previa Limitada</h3>
                                                            <div className="text-xs">Suscríbete para ver el plan completo y descargar los entregables.</div>
                                                        </div>
                                                        <Link href="/pricing" className="btn btn-sm btn-neutral">Desbloquear</Link>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <input type="radio" name="result_tabs" role="tab" className="tab font-bold" aria-label="Estructura de Datos (JSON)" />
                                    <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6 shadow-sm">
                                        <div className="alert alert-info mb-4 text-xs">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                            <span>Vista Técnica: Esta es la estructura que se guardará en la base de datos para edición futura.</span>
                                        </div>
                                        <pre className="mockup-code bg-slate-800 text-green-400 p-4 overflow-auto max-h-[400px] text-xs">
                                            <code>
                                                {/* Extract JSON Part */}
                                                {resultado_plan.includes('---JSON_DATA_START---')
                                                    ? resultado_plan.split('---JSON_DATA_START---')[1].replace('---JSON_DATA_END---', '')
                                                    : '// No valid JSON found within the response.'}
                                            </code>
                                        </pre>
                                        <button
                                            className="btn btn-sm btn-outline mt-2 w-full gap-2 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 transition-all"
                                            onClick={handleSaveDB}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>
                                            Guardar en Mis Planeamientos
                                        </button>
                                    </div>
                                </div>

                                {/* STUDENT TRACKER ACTION */}
                                <div className="mt-8 border-t pt-6 bg-yellow-50 p-6 rounded-xl border border-yellow-200">
                                    <h3 className="font-bold text-yellow-800 flex items-center gap-2">
                                        <span>🚀</span> Nivel 2: Autonomía Estudiantil
                                    </h3>
                                    <p className="text-sm text-yellow-700 mt-1 mb-4">
                                        Genera una "Misión Gamificada" para que el estudiante marque su propio progreso.
                                    </p>
                                    <button
                                        className="btn btn-warning btn-outline gap-2 w-full md:w-auto"
                                        onClick={() => {
                                            setConfigRecurso({
                                                ...config_recurso,
                                                tipo: 'Student Tracker',
                                                contexto: resultado_plan,
                                                nivel: configuracion_ia.nivel
                                            });
                                            setModoOperativo('recursos');
                                            setStep(1);
                                        }}
                                    >
                                        🎮 Generar "Misión del Estudiante"
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="stats stats-vertical md:stats-horizontal my-8 shadow-sm border border-slate-100 w-full md:w-auto">
                            <div className="stat place-items-center md:px-10">
                                <div className="stat-title">Resultados</div>
                                <div className="stat-value text-indigo-600">{selectedItems.length}</div>
                            </div>
                            <div className="stat place-items-center md:px-10">
                                <div className="stat-title">Páginas Aprox</div>
                                <div className="stat-value text-slate-600">{Math.ceil(selectedItems.length * 0.8)}</div>
                            </div>
                        </div>



                        <div className="flex flex-col md:flex-row gap-4 mt-4 w-full md:w-auto items-center justify-center">
                            <button className="btn btn-outline btn-lg md:btn-md px-8 w-full md:w-auto" onClick={() => setStep(modo_operativo === 'ia_normativa' ? 1 : 3)}>
                                {modo_operativo === 'ia_normativa' ? 'Nuevo Plan' : 'Editar'}
                            </button>

                            {!isFree ? (
                                <button className="btn btn-primary btn-action btn-lg md:btn-md gap-2 px-10 shadow-xl w-full md:w-auto"
                                    onClick={() => generatePDF('download')}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                    Descargar PDF Oficial
                                </button>
                            ) : (
                                <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                                    <button
                                        className="btn btn-ghost btn-lg md:btn-md gap-2 w-full md:w-auto border border-slate-300"
                                        onClick={() => generatePDF('preview')}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                        Vista Previa (Con Marca de Agua)
                                    </button>
                                    <button
                                        className="btn btn-neutral btn-lg md:btn-md gap-2 px-6 shadow-xl w-full md:w-auto relative overflow-hidden group"
                                        onClick={() => upgradePlan('monthly')}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                                        <Lock className="w-5 h-5" />
                                        <span>Desbloquear Descarga</span>
                                    </button>
                                </div>
                            )}
                        </div>
                        {isFree && (
                            <p className="mt-4 text-sm text-slate-400">
                                Modo Demo: Solo visualización. <button onClick={() => upgradePlan('monthly')} className="text-indigo-600 font-bold hover:underline">Suscríbete desde $5/mes</button> para descargas ilimitadas.
                            </p>
                        )}
                        {!isFree && !isAdmin && (
                            <p className="mt-4 text-sm text-slate-400">
                                {checkLimit('plansCreated')
                                    ? <span>Tienes descargas disponibles en tu plan.</span>
                                    : <span className="text-red-500 font-bold">Has alcanzado tu límite mensual. <button onClick={() => upgradePlan('annual')} className="underline">Pásate a Anual</button></span>
                                }
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
