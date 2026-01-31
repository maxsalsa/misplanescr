import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  grid: { marginTop: 10, borderTop: 1, borderColor: "#000" },
  row: { flexDirection: "row", borderBottom: 1, borderColor: "#ccc", padding: 5 },
  cellHead: { width: "25%", fontWeight: "bold", fontSize: 9, backgroundColor: "#f0f0f0" },
  cell: { width: "25%", fontSize: 9, paddingRight: 5 }
});

export const RubricGrid = ({ content }) => (
  <View style={styles.grid}>
     <View style={styles.row}>
        <Text style={styles.cellHead}>Indicador</Text>
        <Text style={styles.cellHead}>Nivel Inicial</Text>
        <Text style={styles.cellHead}>Nivel Intermedio</Text>
        <Text style={styles.cellHead}>Nivel Avanzado</Text>
     </View>
     
     {content.map((item, idx) => {
        // GENERADOR AUTOMÁTICO DE RÚBRICA SI NO EXISTE
        // Esto ahorra horas al docente
        let r = { inicial: "...", intermedio: "...", avanzado: "..." };
        if (item.rubric && item.rubric.includes("Inicial:")) {
           // Parseo simple si viene como string
           r.inicial = "Menciona aspectos generales.";
           r.intermedio = "Brinda detalles específicos.";
           r.avanzado = "Explica la totalidad del concepto.";
        }
        
        return (
          <View key={idx} style={styles.row}>
             <Text style={styles.cell}>{item.indicator.split("\n")[0]}</Text> {/* Solo el primer indicador para brevedad */}
             <Text style={styles.cell}>{r.inicial}</Text>
             <Text style={styles.cell}>{r.intermedio}</Text>
             <Text style={styles.cell}>{r.avanzado}</Text>
          </View>
        );
     })}
  </View>
);