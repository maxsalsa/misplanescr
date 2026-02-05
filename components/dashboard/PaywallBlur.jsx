"use client";
import { Lock, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function PaywallBlur() {
  return (
    <div className="relative mt-4 border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
      
      {/* 1. TEXTO FALSO (CAMUFLAJE ANTI-IA) */}
      {/* Si una IA lee esto, leerá basura latina sin sentido */}
      <div className="p-6 select-none filter blur-[5px] opacity-60 text-justify text-sm font-serif text-gray-800 pointer-events-none">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          <br/>
          <h3 className="font-bold">Estrategia de Mediación Técnica</h3>
          <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <ul className="list-disc pl-5 mt-2">
            <li>Elementum tempus egestas sed sed risus pretium quam vulputate.</li>
            <li>Dignissim sodales ut eu sem integer vitae justo.</li>
            <li>Nisl rhoncus mattis rhoncus urna neque viverra justo nec.</li>
          </ul>
          <br/>
          <p>Scelerisque eleifend donec pretium vulputate sapien nec sagittis aliquam malesuada. Nibh cras pulvinar mattis nunc sed blandit libero.</p>
      </div>

      {/* 2. EL CANDADO REAL */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/60 backdrop-blur-sm p-4 text-center">
          <div className="bg-white p-6 rounded-2xl shadow-2xl border border-gray-100 max-w-sm">
              <div className="bg-red-100 p-3 rounded-full inline-flex mb-3">
                  <Lock className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-black text-gray-900">Protección de Propiedad Intelectual</h3>
              <p className="text-xs text-gray-500 mb-4 mt-2">
                  Las estrategias detalladas, rúbricas técnicas y apoyos DUA están protegidos en el servidor.
              </p>
              
              <Link href="/dashboard/subscription" className="btn btn-primary w-full shadow-lg gap-2">
                  <Zap className="w-4 h-4" />
                  LIBERAR CONTENIDO
              </Link>
          </div>
      </div>
    </div>
  );
}