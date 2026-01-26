import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const levelId = searchParams.get('levelId');

    if (!levelId) {
        return NextResponse.json({ error: 'Level ID is required' }, { status: 400 });
    }

    try {
        const units = await prisma.curriculumUnit.findMany({
            where: {
                levelId: levelId
            },
            include: {
                outcomes: {
                    include: {
                        indicators: {
                            include: {
                                suggestedActivities: true
                            }
                        }
                    }
                }
            },
            orderBy: { title: 'asc' }
        });
        return NextResponse.json(units);
    } catch (error) {
        console.error('API/Unit Error:', error);
        return NextResponse.json({ error: 'Failed to fetch units' }, { status: 500 });
    }
}
