import { NextResponse } from 'next/server';
import { getAllPrograms } from '@/lib/catalog-service';

export async function GET() {
    try {
        const programs = await getAllPrograms();
        return NextResponse.json(programs);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to load catalog' }, { status: 500 });
    }
}
