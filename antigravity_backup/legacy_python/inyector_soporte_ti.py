# -*- coding: utf-8 -*-
"""
INYECTOR SOPORTE TI (RESTANTE)
Genera las Unidades 4 (Redes) y 5 (Mantenimiento) bajo el Schema 'registro_oficial'
"""
from antigravity_engine import engine
from biblioteca_estrategias import BibliotecaUltra

def inyectar_soporte_restante():
    print("💻 Iniciando Inyección Soporte TI (Unidades Restantes)...")
    
    unidades = [
        {
            "numero": 4,
            "nombre": "Redes de Computadoras",
            "ra": "Configurar redes de área local (LAN) según estándares de cableado estructurado.",
            "saberes": ["Modelo OSI/TCP-IP", "Cableado Estructurado", "Direccionamiento IPv4", "Switching Básico"],
            "indicador": "Implementa una red LAN funcional verificando conectividad y estética del cableado."
        },
        {
            "numero": 5,
            "nombre": "Mantenimiento Preventivo",
            "ra": "Ejecutar planes de mantenimiento preventivo y correctivo en equipos de cómputo.",
            "saberes": ["Limpieza de Hardware", "Optimización de Software", "Gestión de Drivers", "Diagnóstico de Fallas"],
            "indicador": "Aplica protocolos de limpieza y optimización para prolongar la vida útil del equipo."
        }
    ]
    
    exitos = 0
    
    for u in unidades:
        # Generar las 6 rutas usando la biblioteca (adaptando keys al nuevo schema)
        rutas_raw = BibliotecaUltra.generar_6_rutas("Técnica", u['nombre'])
        rutas_schema_c = []
        
        for r in rutas_raw:
            rutas_schema_c.append({
                "tipo": f"🚀 {r['tipo'].upper()}",
                "persona_docente": r['docente'],
                "persona_estudiante": r['estudiante'],
                "inclusion": r.get('ajuste_inclusion') or r.get('inclusion'),
                "recurso": r.get('recurso_bajo_costo') or r.get('recurso')
            })

        # Construir JSON 'registro_oficial'
        json_ultra = {
            "registro_oficial": {
                "admin": "Max Salazar Sánchez",
                "suscriptor_actual": "{user.id}",
                "identidad_pedagogica": {
                    "especialidad": "Informática en Soporte",
                    "subarea": "Tecnologías de Información",
                    "unidad_numero": u['numero'],
                    "tiempo_asignado": "40 horas"
                },
                "plan_practica_pedagogica": [
                    {
                        "ra": u['ra'],
                        "indicador_logro": u['indicador'],
                        "saberes_esenciales": u['saberes'],
                        "mnc_vínculo": f"MNC-N4-TI-U{u['numero']}",
                        "mediacion_ultra_6_rutas": rutas_schema_c,
                        "evidencias": {
                            "conocimiento": "Prueba teórica digital.",
                            "desempeño": "Lista de cotejo de procedimiento en taller.",
                            "producto": "Informe técnico de servicio realizado."
                        }
                    }
                ]
            }
        }
        
        # Inyectar
        print(f"⚙️ Procesando Unidad {u['numero']}: {u['nombre']}...")
        if engine.sync_to_neon(json_ultra):
             exitos += 1
             
    print(f"\n✅ Completado: {exitos}/{len(unidades)} Unidades TI Sincronizadas.")

if __name__ == "__main__":
    inyectar_soporte_restante()
