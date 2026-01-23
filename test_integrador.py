# -*- coding: utf-8 -*-
from integrador_ultra import QAGuardian

def test_qa_guardian():
    print("🧪 Iniciando Tests de QAGuardian...")
    
    # Caso 1: Texto Perfecto
    texto_perfecto = """
    En la etapa de Focalización, la persona docente facilita el material visual.
    Luego en la Exploración, la persona estudiante construye su propio conocimiento
    a través de los retos. En la Contrastación analizamos resultados y
    finalmente en la Aplicación resolvemos problemas reales.
    """
    assert QAGuardian.validar_binomio(texto_perfecto) == True
    assert QAGuardian.auditoria_tiempo(texto_perfecto) == True
    assert QAGuardian.validar_canales_oficiales(texto_perfecto) == True
    print("✅ Caso 1 (Perfecto): APROBADO")

    # Caso 2: Texto Deficiente (Sin Binomio)
    texto_malo = """
    El profesor explica la materia y luego hacen un quiz.
    Despues revisamos el quiz.
    """
    assert QAGuardian.validar_binomio(texto_malo) == False
    print("✅ Caso 2 (Sin Binomio): APROBADO DETECCION")

    # Caso 3: Compliance Breach
    texto_ilegal = """
    Unanse al grupo de WhatsApp para dudas.
    """
    assert QAGuardian.validar_canales_oficiales(texto_ilegal) == False
    print("✅ Caso 3 (Compliance Breach): APROBADO DETECCION")

if __name__ == "__main__":
    try:
        test_qa_guardian()
        print("\n🚀 Todos los sistemas de Integridad QA funcionales.")
    except AssertionError as e:
        print(f"\n❌ FALLO EN TEST: {e}")
