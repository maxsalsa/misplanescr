import React from "react";
import { Text, View, StyleSheet, Image } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 15,
    borderBottom: 1,
    borderColor: "#000",
    paddingBottom: 10,
  },
  logoBox: { width: "15%" },
  infoBox: { width: "85%", flexDirection: "column" },

  // TEXTOS
  mep: { fontSize: 12, fontWeight: "bold", textTransform: "uppercase" },
  subMep: { fontSize: 10, marginBottom: 5 },
  tableInfo: { display: "table", width: "100%", marginTop: 5 },
  row: { flexDirection: "row", marginBottom: 2 },
  label: { fontSize: 9, fontWeight: "bold", width: "15%" },
  value: { fontSize: 9, width: "35%" },
});

export const OfficialHeader = ({ data, mode }) => {
  // Lógica de etiquetas según modalidad
  const lblNivel = mode === "ADULTOS" ? "Nivel/Periodo:" : "Nivel:";
  const lblMateria = mode === "TECNICA" ? "Especialidad:" : "Asignatura:";
  const lblUnidad = mode === "ADULTOS" ? "Módulo:" : "Unidad:";

  return (
    <View style={styles.container}>
      <View style={styles.infoBox}>
        <Text style={styles.mep}>MINISTERIO DE EDUCACIÓN PÚBLICA</Text>
        <Text style={styles.subMep}>
          Dirección Regional de Educación | Circuito 05
        </Text>

        {/* TABLA DE DATOS ADMINISTRATIVOS */}
        <View style={styles.row}>
          <Text style={styles.label}>Centro Educativo:</Text>
          <Text style={styles.value}>
            {data.school || "CENTRO EDUCATIVO MEP"}
          </Text>
          <Text style={styles.label}>Docente:</Text>
          <Text style={styles.value}>
            {data.teacher || "Lic. Max Salazar Sánchez"}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>{lblMateria}</Text>
          <Text style={styles.value}>{data.subject}</Text>
          <Text style={styles.label}>{lblNivel}</Text>
          <Text style={styles.value}>{data.level}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Periodo:</Text>
          <Text style={styles.value}>Curso Lectivo 2026</Text>
          <Text style={styles.label}>Mes:</Text>
          <Text style={styles.value}>Febrero</Text>
        </View>
      </View>
    </View>
  );
};
