# -*- coding: utf-8 -*-
"""
ANTIGRAVITY MEP ID ENGINE: Sistema de Identidad Digital Oficial
Procesa matrículas y genera infraestructura de comunicación institucional
"""
import pandas as pd
import json
import random
from typing import List, Dict

class MEPIdentityEngine:
    """Motor de identidad digital para estudiantes MEP"""
    
    @staticmethod
    def procesar_matricula_oficial(archivo_excel: str) -> List[Dict]:
        """
        Lee Excel de matrícula y genera correos oficiales @est.mep.go.cr
        
        Formato esperado del Excel:
        - cedula: Cédula del estudiante
        - nombre: Nombre completo
        - apellido1: Primer apellido
        - apellido2: Segundo apellido
        - grupo: Código del grupo (ej: "10-1")
        
        Returns:
            Lista de estudiantes con correos oficiales generados
        """
        try:
            print(f"📋 Procesando matrícula desde: {archivo_excel}")
            df = pd.read_excel(archivo_excel)
            
            # Limpieza de cédulas (elimina espacios, guiones)
            df['cedula_limpia'] = df['cedula'].astype(str).str.replace(r'[- ]', '', regex=True)
            
            # Generación automática de correo oficial MEP
            df['correo_mep'] = df['cedula_limpia'] + "@est.mep.go.cr"
            
            # Nombre completo
            df['nombre_completo'] = df['nombre'] + ' ' + df['apellido1'] + ' ' + df['apellido2']
            
            # Estructura para Antigravity/Neon
            estudiantes = []
            for _, row in df.iterrows():
                estudiante = {
                    "cedula": row['cedula_limpia'],
                    "nombre": row['nombre_completo'],
                    "correo_oficial": row['correo_mep'],
                    "grupo": row.get('grupo', 'N/A')
                }
                estudiantes.append(estudiante)
            
            print(f"✅ [ULTRA] {len(estudiantes)} estudiantes procesados")
            print(f"   Grupos detectados: {df['grupo'].unique().tolist() if 'grupo' in df.columns else 'N/A'}")
            
            return estudiantes
            
        except Exception as e:
            print(f"❌ Error procesando Excel: {e}")
            return []
    
    @staticmethod
    def generar_subgrupos_colaborativos(
        estudiantes: List[Dict], 
        tamano_equipo: int = 3
    ) -> List[List[Dict]]:
        """
        Genera subgrupos aleatorios para trabajo colaborativo
        
        Args:
            estudiantes: Lista de estudiantes del grupo
            tamano_equipo: Tamaño del equipo (default 3)
        
        Returns:
            Lista de equipos con estudiantes asignados
        """
        estudiantes_shuffle = estudiantes.copy()
        random.shuffle(estudiantes_shuffle)
        
        equipos = []
        for i in range(0, len(estudiantes_shuffle), tamano_equipo):
            equipo = estudiantes_shuffle[i:i + tamano_equipo]
            equipos.append(equipo)
        
        print(f"👥 {len(equipos)} equipos generados (Tamaño: {tamano_equipo})")
        return equipos
    
    @staticmethod
    def generar_comunicado_masivo(
        tema: str,
        reto_detalle: str,
        estudiantes: List[Dict],
        canal_teams: str = "General"
    ) -> Dict:
        """
        Genera comunicado oficial con BCC para proteger privacidad
        
        Returns:
            {
                "asunto": str,
                "cuerpo": str,
                "bcc_correos": list,
                "archivo_txt": str (path)
            }
        """
        correos_bcc = [e['correo_oficial'] for e in estudiantes]
        
        asunto = f"🎯 NUEVO RETO DE APRENDIZAJE: {tema}"
        
        cuerpo = f"""
Estimada comunidad estudiantil,

Se ha activado un nuevo Reto de Aprendizaje en la plataforma institucional MEP.

═════════════════════════════════════════════════════════
TEMA: {tema}
═════════════════════════════════════════════════════════

{reto_detalle}

📤 CANAL DE ENTREGA:
   • Microsoft Teams → Canal: {canal_teams}
   • OneDrive institucional (carpeta compartida)

⚠️ IMPORTANTE:
   • Use ÚNICAMENTE su correo institucional @est.mep.go.cr
   • NO envíe trabajos por redes sociales personales
   • Todas las entregas quedan registradas en el sistema MEP

🤝 TRABAJO COLABORATIVO:
   Coordínese con su equipo a través de Teams.

═════════════════════════════════════════════════════════
Ministerio de Educación Pública | Costa Rica 2026
Generado automáticamente por Antigravity Ultra
═════════════════════════════════════════════════════════
"""
        
        # Generar archivo .txt
        archivo_path = "comunicado_estudiantes.txt"
        with open(archivo_path, 'w', encoding='utf-8') as f:
            f.write(f"ASUNTO: {asunto}\n\n")
            f.write(f"BCC (CCO): {'; '.join(correos_bcc)}\n\n")
            f.write("═" * 60 + "\n")
            f.write("CUERPO DEL MENSAJE:\n")
            f.write("═" * 60 + "\n\n")
            f.write(cuerpo)
        
        print(f"✅ Comunicado generado: {archivo_path}")
        print(f"   Destinatarios (BCC): {len(correos_bcc)}")
        
        return {
            "asunto": asunto,
            "cuerpo": cuerpo,
            "bcc_correos": correos_bcc,
            "archivo_txt": archivo_path
        }
    
    @staticmethod
    def exportar_para_neon(estudiantes: List[Dict], grupo_id: str) -> Dict:
        """
        Prepara estructura para sincronizar con Neon DB
        
        Returns:
            Payload listo para auto_exporter.py
        """
        payload = {
            "grupo_id": grupo_id,
            "total_estudiantes": len(estudiantes),
            "estudiantes_json": estudiantes,
            "correos_oficiales": [e['correo_oficial'] for e in estudiantes],
            "timestamp": "NOW"
        }
        
        print(f"💾 Payload Neon preparado para grupo: {grupo_id}")
        return payload

if __name__ == "__main__":
    # Test del motor
    engine = MEPIdentityEngine()
    
    # Simulación de datos (en producción vendría del Excel)
    estudiantes_test = [
        {"cedula": "118230456", "nombre": "Juan Pérez Gómez", "correo_oficial": "118230456@est.mep.go.cr", "grupo": "10-1"},
        {"cedula": "209340567", "nombre": "María Rodríguez López", "correo_oficial": "209340567@est.mep.go.cr", "grupo": "10-1"},
        {"cedula": "304560789", "nombre": "Carlos Mora Sánchez", "correo_oficial": "304560789@est.mep.go.cr", "grupo": "10-1"},
        {"cedula": "407890123", "nombre": "Ana Castro Díaz", "correo_oficial": "407890123@est.mep.go.cr", "grupo": "10-1"},
        {"cedula": "501230456", "nombre": "Luis Vargas Jiménez", "correo_oficial": "501230456@est.mep.go.cr", "grupo": "10-1"},
        {"cedula": "602340567", "nombre": "Patricia Solís Mora", "correo_oficial": "602340567@est.mep.go.cr", "grupo": "10-1"}
    ]
    
    print("\n🧪 TEST 1: Generar subgrupos colaborativos")
    equipos = engine.generar_subgrupos_colaborativos(estudiantes_test, tamano_equipo=3)
    for i, equipo in enumerate(equipos, 1):
        print(f"   Equipo {i}: {[e['nombre'] for e in equipo]}")
    
    print("\n🧪 TEST 2: Generar comunicado masivo")
    comunicado = engine.generar_comunicado_masivo(
        tema="Redes de Computadoras - Configuración LAN",
        reto_detalle="En equipos de 3, diseñen y simulen una red LAN empresarial usando Packet Tracer.",
        estudiantes=estudiantes_test,
        canal_teams="Redes-10-1"
    )
    
    print("\n🧪 TEST 3: Exportar para Neon")
    payload_neon = engine.exportar_para_neon(estudiantes_test, "10-1")
    print(f"   Total: {payload_neon['total_estudiantes']} estudiantes")
