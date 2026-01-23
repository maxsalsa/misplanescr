# -*- coding: utf-8 -*-
"""
INYECTOR CONTABILIDAD v5.5
Implementación de Estructura Maestra con AntigravityIntegrator
"""
import time
from antigravity_engine import integrator
from biblioteca_estrategias import BibliotecaUltra

def inyectar_contabilidad_master():
    print("💰 Iniciando Inyección Contabilidad v5.5 (Master Structure)...")
    
    # 1. Obtenemos rutas base (se sobrescribirán o completarán según Integrator)
    # Nota: El integrator tiene lógica de auto-fix, aquí pasamos las explícitas del prompt
    # pero usamos la librería para rellenar las que faltan (3 rutas base + 3 generadas)
    
    rutas_base_prompt = [
        {
          "tipo": "🎮 LÚDICA (Mercado Real)",
          "persona_docente": "La persona docente facilita un mercado de 'Trueque y Comercio' con dinero ficticio en el aula.",
          "persona_estudiante": "La persona estudiante actúa como contador de una empresa del mercado, registrando cada transacción en tiempo real.",
          "ajuste_inclusion": "TDAH: Dinámica de alta rotación con objetivos de registro rápidos."
        },
        {
          "tipo": "🤖 STEAM / MAKER",
          "persona_docente": "La persona docente media el diseño de una 'Máquina Contable de Cartón' que visualice el equilibrio de la balanza.",
          "persona_estudiante": "La persona estudiante construye la balanza física y coloca 'pesos' (activos vs pasivos) para entender la ecuación patrimonial.",
          "recurso_bajo_costo": "Cartón, vasos reciclados y semillas (Cero costo)."
        },
        {
          "tipo": "🔬 CIENTÍFICA (Análisis Forense)",
          "persona_docente": "La persona docente presenta un libro contable con un error oculto (fraude o descuadre).",
          "persona_estudiante": "La persona estudiante investiga el rastro del dinero usando técnicas de auditoría básica para encontrar el fallo.",
          "ajuste_inclusion": "Alta Dotación: Reto de conciliación bancaria con múltiples variables de error."
        }
    ]
    
    # Generamos las complementarias (Analítica, Práctica, Social)
    rutas_auto = BibliotecaUltra.generar_6_rutas("Técnica", "Finanzas")
    # Filtramos para no duplicar tipos si fuera necesario, o simplemente tomamos las ultimas 3
    rutas_complementarias = rutas_auto[3:]
    
    rutas_finales = rutas_base_prompt + rutas_complementarias

    # Construcción JSON Maestro v5.5
    json_maestro_contabilidad = {
      "id_memoria": "CONT_10_U1_CICLO",
      "metadata": {
        "super_usuario": "Max Salazar Sánchez",
        "suscriptor": "{user.full_name}", # Dinámico
        "version": "5.5-Kaizen"
      },
      "identidad": {
        "especialidad": "Contabilidad",
        "subarea": "Procesos Contables",
        "unidad": "El Ciclo Contable y Estados Financieros"
      },
      "cuerpo": [
        {
          "ra": "Registrar transacciones comerciales según la normativa contable vigente.",
          "saberes": ["Partida doble", "Asientos de diario", "Mayorización", "Balance de comprobación"],
          "indicadores": ["Registra transacciones en los libros legales.", "Elabora estados financieros básicos."],
          "mnc_vínculo": "MNC-N3-CON-01",
          "mediacion_6_rutas": rutas_finales,
          "evidencias": {
            "conocimiento": "Mapa mental del ciclo contable.",
            "desempeño": "Registro de un mes de operaciones simuladas.",
            "producto": "Estados Financieros completos y foliados."
          }
        }
      ]
    }
    
    # Inyección Validada
    integrator.inyectar_plan_validado(json_maestro_contabilidad)

if __name__ == "__main__":
    inyectar_contabilidad_master()
