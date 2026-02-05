"use client";
import { MessageCircle } from "lucide-react";

export default function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/50660906359?text=Hola%20Lic.%20Max,%20necesito%20soporte%20con%20MisPlanesCR."
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-50 btn btn-circle btn-lg btn-success text-white shadow-xl shadow-green-500/40 hover:scale-110 transition-transform animate-in fade-in slide-in-from-bottom-4"
      title="Soporte VIP WhatsApp"
    >
      <MessageCircle size={32} />
    </a>
  );
}
