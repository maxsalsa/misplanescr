import { NextResponse } from 'next/server';
import { generateFamilyMessage, analyzeEvidence, detectEarlyWarning } from '@/core/ia-engine/ai-service';

/**
 * 👪 API ROUTE: VINCULACIÓN HOGAR & EVIDENCIAS
 * Maneja las herramientas "Anti-Guardería": Traductor, Bitácora, Alerta.
 */
export async function POST(req) {
    try {
        const { action, ...params } = await req.json();

        // Router
        let result;
        switch (action) {
            case 'translate_report':
                // params: { datosTecnicos, nombreEstudiante }
                result = await generateFamilyMessage(params);
                break;

            case 'analyze_evidence':
                // params: { observacion }
                result = await analyzeEvidence(params);
                break;

            case 'detect_warning':
                // params: { incidencias, nombreEstudiante }
                result = await detectEarlyWarning(params);
                break;

            default:
                return NextResponse.json({ error: "Acción no válida" }, { status: 400 });
        }

        return NextResponse.json({ result });

    } catch (error) {
        console.error(`[FamilyAPI Error]: ${error.message}`);
        return NextResponse.json(
            { error: "Error procesando la solicitud inteligente." },
            { status: 500 }
        );
    }
}
