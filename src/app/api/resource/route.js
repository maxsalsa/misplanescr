import { NextResponse } from 'next/server';
import { generateResource } from '@/core/ia-engine/ai-service';

export async function POST(req) {
    try {
        const { contexto, tipo, nivel } = await req.json();

        if (!contexto || !tipo) {
            return NextResponse.json(
                { error: 'Faltan datos requeridos (Contexto o Tipo).' },
                { status: 400 }
            );
        }

        console.log(`[API RESOURCE] Request: ${tipo} (${nivel})`);

        const result = await generateResource({ contexto, tipo, nivel });

        return NextResponse.json({ result });

    } catch (error) {
        console.error('[API RESOURCE] Error:', error);
        return NextResponse.json(
            { error: error.message || 'Error interno del servidor.' },
            { status: 500 }
        );
    }
}
