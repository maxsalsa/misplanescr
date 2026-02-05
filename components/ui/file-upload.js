"use client";
import { useState, useRef } from "react";
import {
  Upload,
  FileText,
  X,
  CheckCircle,
  FileSpreadsheet,
} from "lucide-react";
import { toast } from "sonner";

export function FileUpload({ label, accept, onFileSelect }) {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSet(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      validateAndSet(e.target.files[0]);
    }
  };

  const validateAndSet = (uploadedFile) => {
    // Validación simulada de tipo
    setFile(uploadedFile);
    toast.success("Archivo cargado", {
      description: `${uploadedFile.name} listo para procesar.`,
    });
    if (onFileSelect) onFileSelect(uploadedFile);
  };

  const removeFile = () => {
    setFile(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="form-control w-full">
      <label className="label text-xs font-bold uppercase text-slate-500">
        {label}
      </label>

      {!file ? (
        <div
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${dragActive ? "border-blue-500 bg-blue-50" : "border-slate-300 hover:border-blue-400 hover:bg-slate-50"}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => inputRef.current.click()}
        >
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            accept={accept}
            onChange={handleChange}
          />
          <Upload className="mx-auto text-slate-400 mb-3" size={32} />
          <p className="text-sm font-bold text-slate-700">
            Click para subir o arrastre aquí
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Soporta: PDF, Excel, Word, Imágenes
          </p>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 p-4 rounded-xl flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
              {file.name.endsWith("csv") || file.name.endsWith("xls") ? (
                <FileSpreadsheet size={20} />
              ) : (
                <FileText size={20} />
              )}
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800 truncate max-w-[200px]">
                {file.name}
              </p>
              <p className="text-xs text-slate-500">
                {(file.size / 1024).toFixed(1)} KB • Listo
              </p>
            </div>
          </div>
          <button
            onClick={removeFile}
            className="btn btn-ghost btn-sm text-red-400 hover:bg-red-50 rounded-full"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
