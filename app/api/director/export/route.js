import { auth } from "@/auth";
import { generateInstitutionalBackup } from "@/actions/director-actions";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    const session = await auth();

    // 1. Security Gate
    if (!session?.user || (session.user.role !== "DIRECTOR" && session.user.role !== "GOD_TIER")) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // 2. Data Fetching
    // We reuse the server action logic but formatted for a file download
    const backupData = await generateInstitutionalBackup();

    // 3. File Response
    const filename = `backup-institucional-${new Date().toISOString().slice(0, 10)}.json`;

    return new NextResponse(backupData, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });

  } catch (error) {
    console.error("Export API Error:", error);
    return new NextResponse(JSON.stringify({ error: "Failed to generate backup" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
