import jsPDF from "jspdf";
import "jspdf-autotable";

export const generateMEPDocument = (data) => {
  if (!data) return;

  const school = localStorage.getItem("me_school") || "MINISTERIO DE EDUCACIÓN PÚBLICA";
  const docente = localStorage.getItem("me_teacher") || "Docente";

  const doc = new jsPDF("p", "mm", "letter");
  const width = doc.internal.pageSize.getWidth();

  // ENCABEZADO ESTÁNDAR
  doc.setFontSize(10); doc.setFont("helvetica", "bold");
  doc.text(school, width / 2, 10, { align: "center" });
  doc.setFontSize(14); doc.setTextColor(0, 50, 150); 
  doc.text((data.titulo || "DOCUMENTO").toUpperCase(), width / 2, 20, { align: "center" });
  doc.setTextColor(0, 0, 0); 

  let finalY = 30;

  // 1. CASO PRUEBA ESCRITA
  if (data.parte_seleccion) {
      // Instrucciones
      doc.setFontSize(10); doc.setFont("helvetica", "normal");
      doc.text(data.instrucciones_generales || "", 14, finalY); finalY += 10;

      // I PARTE
      doc.setFont("helvetica", "bold"); doc.text("I PARTE. SELECCIÓN ÚNICA", 14, finalY); finalY += 6;
      doc.setFont("helvetica", "normal");
      data.parte_seleccion.items.forEach((it, i) => {
          doc.text(`${i+1}) ${it.enunciado}`, 14, finalY); finalY += 6;
          it.opciones.forEach(op => {
              doc.text(`   (   ) ${op}`, 14, finalY); finalY += 5;
          });
          finalY += 4;
      });

      // II PARTE PAREO
      if (data.parte_pareo) {
          doc.addPage(); finalY = 20;
          doc.setFont("helvetica", "bold"); doc.text("II PARTE. CORRESPONDENCIA", 14, finalY); finalY += 10;
          // Tabla simple para pareo
          const bodyPareo = [];
          const len = Math.max(data.parte_pareo.columnaA.length, data.parte_pareo.columnaB.length);
          for(let k=0; k<len; k++) {
              bodyPareo.push([
                  data.parte_pareo.columnaA[k] || "", 
                  "(   )", 
                  data.parte_pareo.columnaB[k] || ""
              ]);
          }
          doc.autoTable({ startY: finalY, body: bodyPareo, theme: "plain" });
      }
  }

  // 2. CASO TRIVIA / KAHOOT
  else if (data.preguntas) {
      doc.setFont("helvetica", "bold"); doc.text("BANCO DE PREGUNTAS (KAHOOT)", 14, finalY); finalY += 10;
      data.preguntas.forEach((p, i) => {
          doc.setFont("helvetica", "bold");
          doc.text(`${i+1}. ${p.q} (${p.tiempo})`, 14, finalY); finalY += 6;
          doc.setFont("helvetica", "normal");
          doc.text(`   ✅ ${p.a1}`, 14, finalY); finalY += 5;
          doc.text(`   ❌ ${p.a2} | ❌ ${p.a3}`, 14, finalY); finalY += 8;
      });
  }

  // 3. CASO PLANEAMIENTO (Resumido para este script, pero funcional)
  else {
      // (Aquí iría la lógica completa de tablas de planeamiento que ya tenemos)
      doc.text("Ver planeamiento en pantalla o usar módulo completo.", 14, finalY);
  }

  doc.save(`Recurso_${(data.encabezado?.asignatura || "MEP").replace(/ /g,"_")}.pdf`);
};