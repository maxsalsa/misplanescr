import { NextResponse } from "next/server";
import { analyzeSubject } from "@/lib/core/pedagogy";
import { STRATEGY_BANK } from "@/lib/core/strategy_pool";

// 🧠 CEREBRO EN TIEMPO REAL
export async function POST(req) {
  try {
    const body = await req.json();
    const { subject, moment, studentNeeds } = body;

    // 1. ANÁLISIS DE CONTEXTO
    const pedagogyType = analyzeSubject(subject || "General").type; // HARD_TECH, SERVICE, ETC.

    // 2. SELECCIÓN DE ESTRATEGIA (ALGORITMO GENÉTICO SIMPLE)
    // Busca en el Pool de Estrategias algo que coincida con el momento y el tipo
    const pool = STRATEGY_BANK[pedagogyType] || STRATEGY_BANK.ACADEMIC;
    let suggestions = [];

    if (moment.includes("CONEXIÓN") || moment.includes("1"))
      suggestions = pool.connection;
    else if (moment.includes("CONSTRUCCIÓN") || moment.includes("3"))
      suggestions = pool.construction;
    else
      suggestions = [
        "Debate guiado",
        "Lluvia de ideas",
        "Mapa mental colaborativo",
      ];

    // 3. PERSONALIZACIÓN DUA
    const selected =
      suggestions[Math.floor(Math.random() * suggestions.length)];
    let responseText =
      typeof selected === "string" ? selected : selected.activity;

    // Si hay necesidad específica, adaptamos
    if (studentNeeds === "Visual")
      responseText += " (Usar apoyo gráfico/video)";
    if (studentNeeds === "Kinestésico")
      responseText += " (Realizar con material concreto)";

    return NextResponse.json({
      suggestion: responseText,
      evidence:
        typeof selected === "object" ? selected.evidence : "Producto de aula",
      type: pedagogyType,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Fallo en el núcleo de inteligencia" },
      { status: 500 },
    );
  }
}
