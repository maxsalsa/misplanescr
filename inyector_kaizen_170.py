# -*- coding: utf-8 -*-
"""
INYECTOR KAIZEN 170
Ejecuta la Factory v6.0 para Ciencias (Física) y Turismo (Gestión)
"""
from antigravity_factory import AntigravityFactory
from antigravity_super_admin import super_admin # Reusamos para inyección DB

def ejecutar_kaizen():
    print("🏭 Iniciando Fábrica Antigravity Kaizen (170 Programas)...")
    factory = AntigravityFactory()
    
    lote_kaizen = [
        {
            "area": "CIENCIAS",
            "nivel": "10mo",
            "unidad_id": "FIS_U2_ENERGIA",
            "materia": "Ciencias (Física)",
            "especialidad": "Académica",
            "ras": [
                {
                    "texto": "Analizar el principio de conservación de la energía en sistemas mecánicos.",
                    "tema": "Energía",
                    "saberes": ["Energía Cinética", "Energía Potencial", "Trabajo"],
                    "indicador": "Resuelve problemas del entorno aplicando la ley de conservación."
                }
            ]
        },
        {
            "area": "TURISMO",
            "nivel": "11mo",
            "unidad_id": "SERV_U3_QUEJAS",
            "materia": "Turismo / Gestión Hotelera",
            "especialidad": "Técnica",
            "ras": [
                {
                    "texto": "Resolver conflictos con clientes siguiendo protocolos de calidad.",
                    "tema": "Servicio al Cliente",
                    "saberes": ["Comunicación Asertiva", "Manejo de Crisis", "Protocolos"],
                    "indicador": "Atiende situaciones de crisis manteniendo la imagen corporativa."
                }
            ]
        }
    ]
    
    exitos = 0
    for prog_raw in lote_kaizen:
        print(f"⚙️ Fabricando Unidad: {prog_raw['materia']}...")
        
        # 1. Producir JSON Diamante
        json_diamante = factory.producir_unidad_ultra(prog_raw)
        
        # 2. Inyectar a Neon (Usando Super Admin que valida jerarquía)
        # Adaptamos el JSON Diamante al formato que espera SuperAdmin si es necesario
        # SuperAdmin espera: especialidad, nivel, unidad_id, etc en el root o extrae del json
        # El SuperAdmin usa: unidad_json.get('especialidad') etc.
        
        # Flatten simple para compatibilidad con SuperAdmin existente
        json_para_db = {
            "especialidad": json_diamante['encabezado']['especialidad'],
            "nivel": json_diamante['encabezado']['nivel'],
            "unidad_id": prog_raw['unidad_id'],
            "subarea": json_diamante['encabezado']['materia'],
            "identidad": {"subarea": json_diamante['encabezado']['materia']}, # Para validación de rutas si falla
            "mediacion_6_rutas": json_diamante['cuerpo'][0]['mediacion_6_rutas'], # Extraemos del primer RA para validación top-level
            **json_diamante # Merge del resto
        }
        
        if super_admin.inyectar_bloque_validado(json_para_db):
            exitos += 1
            
    print(f"\n🏆 LOTE KAIZEN FINALIZADO: {exitos}/{len(lote_kaizen)}")

if __name__ == "__main__":
    ejecutar_kaizen()
