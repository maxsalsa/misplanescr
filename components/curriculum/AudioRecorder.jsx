"use client";
import React, { useState } from "react";
import { Mic, Square, Play, UploadCloud } from "lucide-react";

export default function AudioRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const [recorded, setRecorded] = useState(false);

  const toggleRecord = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setRecorded(false);
      setDuration(0);
      // Simulate recording timer
      const interval = setInterval(() => {
        setDuration((prev) => prev + 1);
      }, 1000);
      setTimeout(() => {
        clearInterval(interval);
      }, 10000); // 10s max for demo
    } else {
      setRecorded(true);
    }
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-xl border border-slate-200">
      <button
        onClick={toggleRecord}
        className={`btn btn-circle btn-sm ${isRecording ? "btn-error animate-pulse" : "btn-ghost border-slate-300"}`}
      >
        {isRecording ? (
          <Square size={16} />
        ) : (
          <Mic size={18} className="text-red-500" />
        )}
      </button>

      <div className="flex-1">
        {isRecording ? (
          <span className="text-xs font-mono text-red-600 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            GRABANDO... {formatTime(duration)}
          </span>
        ) : recorded ? (
          <div className="flex items-center gap-2">
            <Play size={16} className="text-blue-500" />
            <div className="h-1 w-full bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 w-1/3"></div>
            </div>
            <span className="text-xs font-mono text-slate-500">0:12</span>
          </div>
        ) : (
          <span className="text-xs text-slate-400">
            Presiona el micrófono para grabar evidencia...
          </span>
        )}
      </div>

      {recorded && (
        <button className="btn btn-xs btn-primary gap-1">
          <UploadCloud size={12} /> Guardar
        </button>
      )}
    </div>
  );
}
