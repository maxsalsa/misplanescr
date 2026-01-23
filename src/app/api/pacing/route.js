import { NextResponse } from 'next/server';
import { generatePacingGuide } from '@/core/ia-engine/ai-service';

/**
 * 📅 API ROUTE: JORNALIZACIÓN ANUAL
 */
export async function POST(req) {
    try {
        const body = await req.json();
        // { texto_oficial, periodo, horas_semanales }

        const result = await generatePacingGuide(body);

        return NextResponse.json({ result });

    } catch (error) {
        console.error(`[PacingAPI Error]: ${error.message}`);
        return NextResponse.json(
            { error: "Error generando la jornalización." },
            { status: 500 }
        );
    }
}
