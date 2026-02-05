import { NextResponse } from "next/server";
import { spawn } from "child_process";
import path from "path";
import { auth } from "@/auth";

export const maxDuration = 60; // Set timeout to 60 seconds for AI generation

export async function POST(req) {
  const session = await auth();

  // 1. Security Check
  if (!session?.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const body = await req.json();
    const { topic, profile } = body;

    if (!topic) {
      return new NextResponse("Topic is required", { status: 400 });
    }

    // 2. Construct Command
    // We pass the topic as a query to the CLI script
    const scriptPath = path.join(
      process.cwd(),
      "core",
      "engine",
      "rag_engine.py",
    );
    const pythonCommand = process.platform === "win32" ? "python" : "python3";

    // Construct the query: include profile context if needed
    const query = profile ? `[Perfil: ${profile}] ${topic}` : topic;

    // 3. Spawn Python Process
    const pythonProcess = spawn(pythonCommand, [scriptPath, query]);

    let dataString = "";
    let errorString = "";

    return new Promise((resolve) => {
      // Collect data from stdout
      pythonProcess.stdout.on("data", (data) => {
        dataString += data.toString();
      });

      // Collect errors from stderr
      pythonProcess.stderr.on("data", (data) => {
        errorString += data.toString();
      });

      // Handle process close
      pythonProcess.on("close", (code) => {
        if (code !== 0) {
          console.error(`Python script exited with code ${code}`);
          console.error(`Stderr: ${errorString}`);
          // Fallback / Error handling
          resolve(
            NextResponse.json(
              {
                error: "Internal AI Error",
                details: errorString,
                safety_check: "System Failure",
              },
              { status: 500 },
            ),
          );
        } else {
          try {
            // Try to parse the JSON output from the script
            const jsonResponse = JSON.parse(dataString.trim());
            resolve(NextResponse.json(jsonResponse));
          } catch (e) {
            console.error("Failed to parse Python output as JSON:", dataString);
            resolve(
              NextResponse.json(
                {
                  error: "Invalid Response Format",
                  raw: dataString,
                },
                { status: 500 },
              ),
            );
          }
        }
      });
    });
  } catch (error) {
    console.error("API Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
