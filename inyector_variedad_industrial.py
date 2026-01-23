# -*- coding: utf-8 -*-
"""
INYECTOR VARIEDAD INDUSTRIAL
Procesa Lógica de Programación, Contabilidad, Inglés Técnico y Matemática Financiera
"""
from antigravity_engine import engine
from biblioteca_estrategias import BibliotecaUltra

def inyectar_variedad():
    print("💎 Iniciando Inyección de Variedad Industrial...")
    
    unidades_variadas = [
        {
            "id": "SOFT_DEV_10_U1",
            "tema": "Lógica de Programación",
            "ra": "Construir algoritmos lógicos para la resolución de problemas informáticos.",
            "saberes": ["Estructuras de control", "Variables", "Pseudocódigo"],
            "indicadores": ["Diseña secuencia lógica", "Codifica algoritmos"],
            "vinculo": "MNC-N3-DEV-01"
        },
        {
            "id": "CONT_10_U2",
            "tema": "Contabilidad y Finanzas",
            "ra": "Registrar transacciones comerciales según normativa NIIF.",
            "saberes": ["Asientos de Diario", "Mayorización", "Balance de Comprobación"],
            "indicadores": ["Clasifica cuentas correctamente", "Balancea la ecuación contable"],
            "vinculo": "MNC-N3-CON-02"
        },
        {
            "id": "ENG_TECH_11",
            "tema": "Technical English",
            "ra": "Provide technical support in English via remote channels.",
            "saberes": ["Troubleshooting vocabulary", "Polite requests", "Imperatives"],
            "indicadores": ["Resuelve tickets de soporte en L2", "Redacta reportes técnicos"],
            "vinculo": "MNC-N4-ENG-05"
        },
        {
            "id": "MATH_FIN_11",
            "tema": "Matemática Financiera",
            "ra": "Aplicar fórmulas de interés simple y compuesto en contextos reales.",
            "saberes": ["Interés Simple", "Interés Compuesto", "Amortización"],
            "indicadores": ["Calcula cuotas de préstamos", "Proyecta ahorros a futuro"],
            "vinculo": "MNC-N4-MAT-03"
        }
    ]
    
    exitos = 0
    
    for u in unidades_variadas:
        print(f"⚙️ Procesando: {u['tema']}...")
        
        # Generación de Rutas Contextualizadas
        rutas = BibliotecaUltra.generar_6_rutas("Industrial", u['tema'])
        
        # Construcción JSON Schema D (Industrial Logic)
        plan_industrial = {
            "id_memoria": u['id'],
            "metadata": {
                "super_usuario": "Max Salazar Sánchez",
                "autor_plan": "{user.full_name}", # Dinámico
                "version": "5.0-Industrial-Variety"
            },
            "cuerpo_tecnico": [
                {
                    "ra": u['ra'],
                    "saberes": u['saberes'],
                    "indicadores": u['indicadores'],
                    "mnc_vínculo": u['vinculo'],
                    "mediacion_ultra_6_rutas": rutas, # Las 6 rutas generadas
                    "evidencias": BibliotecaUltra.generar_evidencias(u['tema'])
                }
            ]
        }
        
        if engine.sync_to_neon(plan_industrial):
            exitos += 1
            
    print(f"\n✅ REPORTE VARIEDAD: {exitos}/{len(unidades_variadas)} Sincronizados.")

if __name__ == "__main__":
    inyectar_variedad()
