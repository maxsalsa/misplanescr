import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const families = await prisma.curriculumFamily.findMany({
            include: {
                levels: {
                    orderBy: { name: 'asc' }
                }
            },
            orderBy: { name: 'asc' },
        });
        return NextResponse.json(families);
    } catch (error) {
        console.error('API/Family Error:', error);
        return NextResponse.json({ error: 'Failed to fetch families' }, { status: 500 });
    }
}
