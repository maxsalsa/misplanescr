
import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function POST(request) {
    try {
        const data = await request.formData();
        const file = data.get('file');

        if (!file) {
            return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Save to 'documentos_mep' folder
        // Ensure the folder exists (it should, but good practice to check logic implies it does)
        const uploadDir = join(process.cwd(), 'documentos_mep');
        const filePath = join(uploadDir, file.name);

        await writeFile(filePath, buffer);
        console.log(`[UPLOAD] File saved to: ${filePath}`);

        // Trigger Python Ingestion (Headless)
        // We assume 'python' is in PATH and environment variables are set
        console.log("[INGEST] Triggering Vector Store Update...");
        const command = `python antifinal.py --ingest`;

        const { stdout, stderr } = await execAsync(command, {
            cwd: process.cwd(),
            env: { ...process.env } // Pass env vars like OPENAI_API_KEY
        });

        console.log("[INGEST] STDOUT:", stdout);
        if (stderr) console.warn("[INGEST] STDERR:", stderr);

        return NextResponse.json({
            success: true,
            message: "File uploaded and ingested successfully",
            logs: stdout
        });

    } catch (error) {
        console.error("[UPLOAD CRITICAL ERROR]", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
