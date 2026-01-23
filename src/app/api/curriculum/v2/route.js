
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { unstable_cache } from 'next/cache';

const prisma = new PrismaClient();

// 🏰 THE FORTRESS CACHE (Kaizen 35.0)
// Cache the entire curriculum tree for 1 hour.
// Tag: 'curriculum-tree' for manual revalidation.
const getCurriculumTree = unstable_cache(
    async () => {
        console.log('⚡ REHYDRATING CURRICULUM CACHE (DB HIT)...');
        // Fetch strictly what is needed for the Comboboxes
        const tree = await prisma.modalidad.findMany({
            include: {
                levels: {
                    orderBy: { order: 'asc' },
                    include: {
                        asignaturas: {
                            include: {
                                unidades: {
                                    select: {
                                        id: true,
                                        title: true,
                                        premiumTags: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
        return tree;
    },
    ['curriculum-tree'],
    { revalidate: 3600, tags: ['curriculum'] }
);

export async function GET() {
    try {
        const start = performance.now();
        const data = await getCurriculumTree();
        const end = performance.now();

        console.log(`🚀 [API] Curriculum Tree served in ${(end - start).toFixed(2)}ms`);

        return NextResponse.json(data, {
            status: 200,
            headers: {
                'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=59',
                'X-Sovereign-Latency': `${(end - start).toFixed(2)}ms`
            }
        });
    } catch (error) {
        console.error("❌ CURRICULUM API ERROR:", error);
        return NextResponse.json({ error: "Sovereign Core Unreachable" }, { status: 500 });
    }
}
