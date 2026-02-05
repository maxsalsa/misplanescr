import { NextResponse } from "next/server";

// ----------------------------------------------------------------------------
// GENERADOR DE ITEMS DE PRUEBA (REA)
// ----------------------------------------------------------------------------
function generarSeleccionUnica(tema) {
    return [
        { enunciado: `¿Cuál es el propósito principal de ${tema}?`, opciones: ["Opción A (Distractor)", "Opción B (Correcta)", "Opción C (Distractor)"], correcta: "B" },
        { enunciado: `Identifique un componente crítico de ${tema}:`, opciones: ["Elemento X", "Elemento Y (Correcto)", "Elemento Z"], correcta: "B" },
        { enunciado: `Según la normativa, ${tema} se aplica cuando:`, opciones: ["Caso 1", "Caso 2", "Caso 3 (Correcto)"], correcta: "C" }
    ];
}

function generarPareo(tema) {
    return {
        columnaA: ["Concepto 1", "Concepto 2", "Concepto 3", "Concepto 4"],
        columnaB: ["Definición de 1", "Definición de 3", "Distractor", "Definición de 2", "Definición de 4"]
    };
}

// ----------------------------------------------------------------------------
// LÓGICA PRINCIPAL
// ----------------------------------------------------------------------------
export async function POST(req) {
  try {
    const body = await req.json();
    const { nivel, materia, tipo, contexto } = body; 
    let subarea = materia.includes("-") ? materia.split("-")[1].trim() : materia;
    
    let estructura = {};

    // 1. CASO: PRUEBA ESCRITA (ITEMS OFICIALES)
    if (tipo === "Prueba Escrita") {
        estructura = {
            titulo: "PRUEBA ESCRITA ORDINARIA",
            encabezado: { asignatura: subarea, nivel: nivel, valor: "20%", puntos: "35 Ptos", tiempo: "80 min" },
            instrucciones_generales: "Lea cuidadosamente cada ítem. Utilice lapicero azul o negro. Se prohíbe el uso de corrector.",
            
            // I PARTE: SELECCIÓN ÚNICA
            parte_seleccion: {
                instrucciones: "Marque con una X la opción correcta.",
                items: generarSeleccionUnica(subarea)
            },

            // II PARTE: PAREO / CORRESPONDENCIA
            parte_pareo: {
                instrucciones: "Relacione los conceptos de la Columna A con las definiciones de la Columna B. Sobra una opción.",
                contenido: generarPareo(subarea)
            },

            // III PARTE: RESPUESTA CORTA / DESARROLLO
            parte_desarrollo: [
                { pregunta: `Explique con dos razones la importancia de ${subarea} en el contexto actual.`, puntos: 4 },
                { pregunta: `Resuelva el siguiente caso práctico aplicando la normativa de ${subarea}.`, puntos: 6 }
            ],
            
            tabla_especificaciones: [
                { aprendizaje: "Analizar conceptos básicos", items: "Selección Única", puntos: 3 },
                { aprendizaje: "Relacionar definiciones", items: "Pareo", puntos: 4 },
                { aprendizaje: "Aplicar conocimientos", items: "Desarrollo", puntos: 10 }
            ]
        };
    }

    // 2. CASO: GAMIFICACIÓN / TRIVIA (KAHOOT)
    else if (tipo === "Gamificación (Trivia)") {
        estructura = {
            titulo: `TRIVIA DE REPASO: ${subarea.toUpperCase()}`,
            plataforma_sugerida: "Kahoot / Quizizz",
            preguntas: [
                { q: `¿Qué es lo más importante en ${subarea}?`, a1: "Respuesta Correcta", a2: "Incorrecta", a3: "Incorrecta", a4: "Incorrecta", tiempo: "20s" },
                { q: `Verdadero o Falso: ${subarea} se usa solo en empresas.`, a1: "Falso", a2: "Verdadero", tiempo: "10s" },
                { q: `Seleccione la herramienta usada en ${subarea}:`, a1: "Herramienta X", a2: "Herramienta Y", a3: "Todas las anteriores", a4: "Ninguna", tiempo: "20s" },
                { q: `Bonus: ¿Quién regula ${subarea} en Costa Rica?`, a1: "MEP/Entidad", a2: "Nadie", a3: "El gobierno", a4: "La ONU", tiempo: "30s" },
                { q: `Caso: Si falla el sistema de ${subarea}, ¿qué haces?`, a1: "Llorar", a2: "Aplicar Protocolo B", a3: "Reiniciar", a4: "Irse", tiempo: "60s" }
            ],
            instrucciones_docente: "Copie estas preguntas en su creador de Kahoot. Use esto como actividad de Cierre o Repaso."
        };
    }

    // 3. CASO: RESUMEN / INFOGRAFÍA
    else if (tipo === "Resumen / Infografía") {
        estructura = {
            titulo: `GUÍA DE ESTUDIO / ESTRUCTURA INFOGRÁFICA`,
            tema_central: subarea,
            puntos_clave: [
                { titulo: "Definición Clave", texto: `Concepto fundamental de ${subarea} y su impacto.` },
                { titulo: "Procesos Principales", texto: "1. Planificación\n2. Ejecución\n3. Control" },
                { titulo: "Normativa", texto: "Leyes y reglamentos aplicables en Costa Rica." },
                { titulo: "Ejemplo Real", texto: `Caso de éxito de ${subarea} en la industria.` }
            ],
            actividad_sugerida: "Solicitar a los estudiantes crear un poster digital en Canva con estos 4 puntos."
        };
    }

    // 4. CASO DEFAULT (PLANEAMIENTO COMPLETO)
    else {
        // ... (Aquí va la lógica completa del Oráculo que ya teníamos: Plan, DUA, Pausas, etc.)
        // La mantengo resumida aquí para no hacer el script kilométrico, pero en su archivo real
        // asegúrese de que el bloque 'else' contenga toda la lógica de 'planeamiento' anterior.
        estructura = { 
            encabezado: { titulo: "PLANEAMIENTO DIDÁCTICO", asignatura: subarea },
            mediacion: { 
                focalizacion: { fase: "CONEXIÓN", actividad: "Trivia Rápida", desc: "Preguntas generadoras." },
                exploracion:  { fase: "COLABORACIÓN", actividad: "Trabajo Grupal", desc: "Investigación." },
                pausa_activa: { fase: "PAUSA", actividad: "Estiramiento", desc: "Anti-embote." },
                aplicacion:   { fase: "CONSTRUCCIÓN", actividad: "Proyecto", desc: "Evidencia final." }
            },
            evaluacion: { instrumento: "Rúbrica" }
        };
    }

    return NextResponse.json({ success: true, data: estructura });

  } catch (error) {
    return NextResponse.json({ success: false, error: "Error generando recurso." }, { status: 500 });
  }
}