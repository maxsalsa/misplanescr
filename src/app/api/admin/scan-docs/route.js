import { NextResponse } from 'next/server';
import { scanAndIndexDocs, getIndexedDocs } from '@/lib/knowledge-base-service';

export async function GET() {
    try {
        // Trigger the scan
        const files = await scanAndIndexDocs();
        return NextResponse.json({ files, message: "Optimization Complete" });
    } catch (error) {
        console.error("Error scanning docs:", error);
        return NextResponse.json({ error: "Failed to scan documents" }, { status: 500 });
    }
}
