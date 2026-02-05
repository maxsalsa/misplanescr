import { NextResponse } from "next/server";

const KEY_NAMES = {
  OPENAI: "OPENAI_API_KEY",
  GROQ: "GROQ_API_KEY",
  GOOGLE: "GEMINI_API_KEY",
};

export async function POST(req) {
  try {
    const body = await req.json();
    const { texto, filename, provider = "OPENAI" } = body;

    const keyName = KEY_NAMES[provider];
    const apiKey = process.env[keyName];

    if (!apiKey)
      return NextResponse.json(
        { success: false, error: `FALTA LLAVE: ${keyName}` },
        { status: 500 },
      );

    const systemPrompt = `Eres el Director de Currículo del MEP Costa Rica.
    ANALIZA: "${filename}".
    
    RETORNA UN JSON VÁLIDO CON ESTA ESTRUCTURA EXACTA:
    {
      "fundamentacion": "Resumen ejecutivo (máx 100 palabras).",
      "perfil_salida": "Lista de competencias clave.",
      "unidades": [
        { 
          "nombre": "Título de la unidad",
          "resultados_aprendizaje": ["Resultado 1", "Resultado 2"] 
        }
      ]
    }
    
    SI EL TEXTO ESTÁ VACÍO O ES ILEGIBLE: Infiere la estructura lógica basada en el título "${filename}".`;

    const userContent = texto
      ? texto.substring(0, 28000)
      : `Analiza el archivo: ${filename}`;
    let finalJson = {};

    // --- LÓGICA POR PROVEEDOR ---

    if (provider === "OPENAI") {
      // MOTOR PRINCIPAL: GPT-4o-mini (Barato, Rápido, Preciso)
      const resp = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userContent },
          ],
          temperature: 0.1,
          response_format: { type: "json_object" }, // GARANTÍA DE INTEGRIDAD
        }),
      });

      if (!resp.ok) {
        const err = await resp.text();
        throw new Error(`OpenAI (${resp.status}): ${err}`);
      }
      const data = await resp.json();
      finalJson = JSON.parse(data.choices[0].message.content); // OpenAI siempre devuelve JSON limpio aquí
    } else if (provider === "GROQ") {
      // RESPALDO 1: Llama 3.3
      const resp = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: userContent },
            ],
            temperature: 0.1,
            response_format: { type: "json_object" },
          }),
        },
      );
      if (!resp.ok) throw new Error(`Groq (${resp.status})`);
      const data = await resp.json();
      finalJson = JSON.parse(data.choices[0].message.content);
    } else if (provider === "GOOGLE") {
      // RESPALDO 2: Gemini Flash
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
      const resp = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            { parts: [{ text: systemPrompt + "\n\n" + userContent }] },
          ],
        }),
      });
      if (!resp.ok) throw new Error(`Google (${resp.status})`);
      const data = await resp.json();
      const raw = data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
      finalJson = limpiarJson(raw);
    }

    return NextResponse.json({ success: true, data: finalJson, provider });
  } catch (error) {
    console.error(`>>> ERROR [${body.provider}]:`, error.message);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

function limpiarJson(text) {
  try {
    let clean = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    const first = clean.indexOf("{");
    const last = clean.lastIndexOf("}");
    if (first !== -1 && last !== -1) clean = clean.substring(first, last + 1);
    return JSON.parse(clean);
  } catch (e) {
    return { error: "JSON_MALFORMADO" };
  }
}
