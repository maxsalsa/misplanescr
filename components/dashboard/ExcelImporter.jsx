"use client";
import { useState } from "react";
import * as XLSX from "xlsx";
import { FileSpreadsheet, AlertTriangle, Lock } from "lucide-react";

export default function ExcelImporter({ onImport, isPremium }) {
  const [dragActive, setDragActive] = useState(false);
  
  if (!isPremium) return (
      <div className="border-2 border-dashed p-8 text-center bg-gray-50 opacity-50"><Lock className="mx-auto"/><h3>Función Ultra Bloqueada</h3></div>
  );

  const handleFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const workbook = XLSX.read(new Uint8Array(e.target.result), { type: "array" });
      const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
      const mapped = jsonData.map((r, i) => {
          const name = r["Nombre"] || r["Estudiante"] || r["Completo"];
          const id = r["Cédula"] || r["ID"] || `T-${i}`;
          if (!name) return null;
          return { id: String(id), name: String(name).toUpperCase(), cotidiano:0, tareas:0, pruebas:0, proyecto:0, asistencia:0, details:{} };
      }).filter(Boolean);
      if(mapped.length) onImport(mapped);
      else alert("No encontramos columnas 'Nombre' o 'Cédula'.");
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className={`border-2 border-dashed rounded-xl p-8 text-center ${dragActive ? "border-primary" : "border-base-300"}`}
        onDragOver={(e)=>{e.preventDefault();setDragActive(true)}} onDrop={(e)=>{e.preventDefault();setDragActive(false);if(e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0])}}>
        <input type="file" id="xls" className="hidden" onChange={(e)=>e.target.files[0] && handleFile(e.target.files[0])}/>
        <label htmlFor="xls" className="cursor-pointer"><FileSpreadsheet className="w-10 h-10 mx-auto text-primary mb-2"/><h3 className="font-bold">Subir Excel MEP</h3></label>
    </div>
  );
}