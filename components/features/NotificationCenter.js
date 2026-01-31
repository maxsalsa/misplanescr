"use client";
import { Bell, CheckCircle, Info } from "lucide-react";
import { useState } from "react";

export default function NotificationCenter() {
  // Simulamos notificaciones (En producción vendrían de DB)
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Bienvenido al Sistema V15", type: "info", time: "Hace 1 min" },
    { id: 2, text: "Base de Datos Sincronizada", type: "success", time: "Hace 5 min" }
  ]);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle relative" onClick={() => setIsOpen(!isOpen)}>
        <Bell size={20} className="text-slate-600" />
        {notifications.length > 0 && (
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
        )}
      </div>
      
      {/* MENÚ DESPLEGABLE */}
      {isOpen && (
        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow-2xl menu menu-sm dropdown-content bg-white rounded-xl w-80 border border-slate-100">
          <li className="menu-title text-slate-400 uppercase text-xs font-bold px-4 py-2">Notificaciones Recientes</li>
          {notifications.map((note) => (
            <li key={note.id} className="border-b border-slate-50 last:border-none">
              <a className="py-3 px-4 hover:bg-slate-50 active:bg-blue-50">
                <div className="flex gap-3 items-start">
                  {note.type === "success" ? <CheckCircle size={16} className="text-emerald-500 mt-1"/> : <Info size={16} className="text-blue-500 mt-1"/>}
                  <div>
                    <div className="font-medium text-slate-700 text-xs">{note.text}</div>
                    <div className="text-[10px] text-slate-400">{note.time}</div>
                  </div>
                </div>
              </a>
            </li>
          ))}
          <li className="mt-2">
            <button className="btn btn-xs btn-ghost text-slate-400 w-full" onClick={() => setNotifications([])}>
              Limpiar Todo
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}