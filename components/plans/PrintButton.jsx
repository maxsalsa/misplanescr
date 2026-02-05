"use client";

import { Printer } from "lucide-react";

export default function PrintButton() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <style jsx global>{`
        @media print {
          /* Ocultar interfaz de navegación y botones */
          nav,
          aside,
          header,
          footer,
          .no-print {
            display: none !important;
          }

          /* Asegurar que el contenido principal sea visible y ocupe todo */
          main,
          body,
          html {
            background: white !important;
            color: black !important;
            width: 100%;
            margin: 0;
            padding: 0;
            overflow: visible !important;
          }

          /* Formato de documento oficial MEP */
          .official-document {
            padding: 2cm;
            font-family: "Times New Roman", serif;
            font-size: 12pt;
          }
        }
      `}</style>

      <button
        onClick={handlePrint}
        className="btn btn-primary btn-sm gap-2 no-print"
        title="Generar PDF Oficial (Control + P)"
      >
        <Printer className="w-4 h-4" />
        Imprimir Plan PDF
      </button>
    </>
  );
}
