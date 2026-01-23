import { NextResponse } from 'next/server';
import { generateResource } from '@/core/ia-engine/ai-service';

/**
 * 🎲 API ROUTE: FÁBRICA DE RECURSOS (GAMIFICACIÓN)
 * Genera Quizzes, Juegos (Millonario), Rubricas y GTAs.
 */
export async function POST(req) {
    try {
        const body = await req.json();
        // { tipo, tema, nivel, indicaciones }

        const result = await generateResource(body);

        return NextResponse.json({ result });

    } catch (error) {
        console.error(`[ResourceAPI Error]: ${error.message}`);
        return NextResponse.json(
            { error: "Error generando el recurso didáctico." },
            { status: 500 }
        );
    }
}
