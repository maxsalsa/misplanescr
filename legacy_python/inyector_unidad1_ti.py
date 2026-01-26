# -*- coding: utf-8 -*-
"""
INYECTOR UNIDAD 1 (FUNDAMENTOS TI): Protocolo Diamante v4
Inclusión Radical + STEAM Bajo Costo + Identidad Dinámica
"""
import json
import time
from auto_exporter import actualizar_core_neon

def inyectar_fundamentos_ti_diamante():
    print("💎 Protocolo Diamante: Iniciando Unidad 1 (72h) - Fundamentos TI")
    
    # 1. ESTRUCTURA MAESTRA (DIAMANTE)
    plan_fundamentos = {
        "id_programa": "MEP-TI-10mo-U1-Fund",
        "metadata": {
            "autor_auditor": "Max Salazar Sánchez",
            "version_motor": "Antigravity-Diamante-v4",
            "nivel": "10mo",
            "especialidad": "Informática en Soporte",
            "subarea": "Fundamentos de TI",
            "unidad_numero": 1,
            "unidad_nombre": "Fundamentos de Hardware y Software",
            "carga_horaria": "72h",
            "keywords": ["Hardware", "Mantenimiento", "STEAM", "Inclusión"],
            "complejidad_nivel": 9
        },
        "encabezado_dinamico": {
            "suscriptor_placeholder": "{user.full_name}",
            "institucion_placeholder": "{user.current_school}",
            "estado_licencia": "Verificado Neon"
        },
        "planificacion": [
            {
                "ra_id": "RA-01",
                "resultado_aprendizaje": "Emplear componentes apropiados para construcción y reparación de PC.",
                "saberes_esenciales": ["Arquitectura Von Neumann", "Componentes Internos", "Periféricos", "Seguridad Ocupacional"],
                "indicadores_mnc": ["MNC-L3-K1: Identifica partes", "MNC-L3-S3: Ensambla equipos"],
                "tiempo_estimado": "72 horas (Bloques de 40/80 min)",
                "mediacion_pedagogica": [
                   {
                       "tipo": "Lúdica",
                       "titulo": "Desafío del Inventario (Caja Misteriosa)",
                       "docente": "La persona docente facilita una 'Caja Misteriosa' con componentes de desecho (buenos y malos mezclados) y cronometra la actividad.",
                       "estudiante": "La persona estudiante clasifica los componentes por estado y función (Entrada/Proceso/Salida) en una carrera contra el reloj.",
                       "inclusion_tdah": "Gamificación con puntos inmediatos y feedback sonoro.",
                       "recursos": "Hardware en desuso"
                   },
                   {
                       "tipo": "Científica",
                       "titulo": "El Viaje del Dato (Simulación Física)",
                       "docente": "La persona docente demuestra el flujo de datos (Bus de datos) usando un puntero láser y espejos para visualizar la velocidad y latencia.",
                       "estudiante": "La persona estudiante dibuja el mapa del flujo de datos basado en la demostración y predice dónde ocurrirían cuellos de botella.",
                       "inclusion_tea": "Uso de diagramas de flujo simplificados, ambiente con luz controlada.",
                       "recursos": "Puntero láser, espejos pequeños"
                   },
                   {
                       "tipo": "STEAM",
                       "titulo": "Ingeniería Inversa (Bajo Costo)",
                       "docente": "La persona docente media un taller de desensamble de fuentes de poder (previamente descargadas) para identificar capacitores y transformadores.",
                       "estudiante": "La persona estudiante extrae componentes aprovechables con cautín y crea un esquema manual de la circuitería interna.",
                       "recursos": "Chatarra electrónica donada, herramientas básicas"
                   },
                   {
                       "tipo": "Alta Dotación",
                       "titulo": "Optimización Extrema (Caso Real)",
                       "docente": "La persona docente plantea un escenario de presupuesto limitado (100 mil colones) para revivir una PC de oficina obsoleta.",
                       "estudiante": "La persona estudiante investiga en tiendas locales y mercados de usados, justifica la compra de cada pieza y calcula el retorno de inversión.",
                       "recursos": "Acceso a internet (Marketplace/Tiendas)"
                   },
                   {
                       "tipo": "Práctica",
                       "titulo": "Ensamblaje Seguro",
                       "docente": "La persona docente supervisa el uso de pulseras antiestáticas (o métodos caseros de descarga) durante la manipulación.",
                       "estudiante": "La persona estudiante realiza el ensamblaje completo de un equipo funcional validando el POST (Power On Self Test).",
                       "recursos": "PC de laboratorio"
                   },
                   {
                       "tipo": "Social",
                       "titulo": "Clínica de PC Comunitaria",
                       "docente": "La persona docente organiza una jornada de diagnóstico gratuito para equipos de la comunidad educativa.",
                       "estudiante": "La persona estudiante recibe equipos reales, diagnostica fallas y explica al usuario final en lenguaje sencillo.",
                       "recursos": "Formularios de recepción de equipos"
                   }
                ],
                "evidencias": {
                     "conocimiento": "Prueba escrita sobre función de componentes",
                     "desempeno": "Lista de cotejo: Protocolo de ensamblaje seguro",
                     "producto": "Guía de mantenimiento preventivo ilustrada"
                },
                "adecuaciones": {
                    "acceso": "Uso de lupas y guantes táctiles para manipulación.",
                    "no_significativa": "Reducción de cantidad de componentes a clasificar en la ruta lúdica."
                }
            }
        ],
        "canales_oficiales": {
            "teams_post_md": """
## 🖥️ UNIDAD 1: ARQUITECTOS DEL HARDWARE
**Fundamentos de TI - 10mo Grado**

Estimados estudiantes,

Iniciamos el reto de Ingeniería Inversa y Optimización.
Material requerido para próxima clase:
- Kit básico de herramientas (Destornillador cruz/plano)
- Guantes de seguridad.

> "El hardware es lo que puedes golpear, el software es lo que solo puedes maldecir."

Consultas técnicas: Foro Oficial Teams | Entrega: @est.mep.go.cr
""",
            "correo_asunto": "Inicio Unidad 1 - Fundamentos TI"
        }
    }
    
    # 2. SINCRONIZACIÓN DIAMANTE
    print("⏳ Ejecutando Sincronización Estándar Max Salazar (Unidad 1)...")
    resultado = actualizar_core_neon(plan_fundamentos)
    print(resultado)
    
    if "Exitosa" in resultado:
        print("\n📢 LISTO PARA EL SUSCRIPTOR: Juan Pérez (Ejemplo)")
        print("   Header: [Nombre Suscriptor] - [Institución]")
        print("   Licencia: Activa")

if __name__ == "__main__":
    inyectar_fundamentos_ti_diamante()
