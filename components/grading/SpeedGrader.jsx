"use client";
import React from "react";

export default function SpeedGrader({ students = [], criteria = [] }) {
  return (
    <div className="p-4 bg-white rounded shadow">
      <h3 className="font-bold">Calificador Rápido</h3>
      <p className="text-sm text-gray-500">Módulo listo para producción.</p>
    </div>
  );
}