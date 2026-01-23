# -*- coding: utf-8 -*-
"""
ANTIGRAVITY DOCENTE AUDIT: Sistema de Verificación de Identidad Docente
Sugiere correos pero OBLIGA a validación manual por riesgo de homónimos
"""
import re
from typing import Dict

class DocenteAuditSystem:
    """
    Sistema de auditoría para correos docentes
    
    REGLA DE ORO: Nunca asumir que el correo es definitivo solo por el nombre.
    Los homónimos son comunes en el MEP.
    """
    
    @staticmethod
    def normalizar_texto(texto: str) -> str:
        """Normaliza texto para formato de correo (sin tildes, ñ, espacios)"""
        texto = texto.lower().strip()
        reemplazos = {
            'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u',
            'ñ': 'n', ' ': '.', 'à': 'a', 'è': 'e', 'ì': 'i',
            'ò': 'o', 'ù': 'u'
        }
        for orig, repl in reemplazos.items():
            texto = texto.replace(orig, repl)
        return texto
    
    @staticmethod
    def sugerir_correo_docente(
        nombre: str, 
        apellido1: str, 
        apellido2: str = ""
    ) -> Dict:
        """
        Genera una SUGERENCIA de correo, pero marca como PENDIENTE DE VERIFICACIÓN
        
        Args:
            nombre: Primer nombre del docente
            apellido1: Primer apellido
            apellido2: Segundo apellido (opcional)
        
        Returns:
            {
                "sugerencia": str,
                "estado": "PENDIENTE_VERIFICACION",
                "nota": str (advertencia),
                "alternativas": list
            }
        """
        # Normalizar componentes
        nombre_norm = DocenteAuditSystem.normalizar_texto(nombre)
        apellido1_norm = DocenteAuditSystem.normalizar_texto(apellido1)
        apellido2_norm = DocenteAuditSystem.normalizar_texto(apellido2) if apellido2 else ""
        
        # Sugerencia principal
        if apellido2_norm:
            sugerencia_principal = f"{nombre_norm}.{apellido1_norm}.{apellido2_norm}@mep.go.cr"
        else:
            sugerencia_principal = f"{nombre_norm}.{apellido1_norm}@mep.go.cr"
        
        # Alternativas comunes por homónimos
        alternativas = [
            f"{nombre_norm[0]}{apellido1_norm}.{apellido2_norm}@mep.go.cr" if apellido2_norm else f"{nombre_norm[0]}{apellido1_norm}@mep.go.cr",
            f"{nombre_norm}.{apellido1_norm[0]}{apellido2_norm}@mep.go.cr" if apellido2_norm else None,
        ]
        alternativas = [a for a in alternativas if a]  # Remover None
        
        return {
            "sugerencia": sugerencia_principal,
            "alternativas": alternativas,
            "estado": "PENDIENTE_VERIFICACION",
            "nota": "⚠️ VALIDAR en planilla oficial MEP por posibles homónimos.",
            "instruccion": "Este correo DEBE ser confirmado manualmente antes de guardarlo en Neon."
        }
    
    @staticmethod
    def validar_formato_correo_mep(correo: str) -> bool:
        """
        Valida que el correo tenga formato oficial MEP
        
        Returns:
            bool: True si es formato válido @mep.go.cr
        """
        patron = r'^[a-z0-9.]+@mep\.go\.cr$'
        return bool(re.match(patron, correo))
    
    @staticmethod
    def marcar_correo_verificado(correo: str, verificado_por: str = "admin") -> Dict:
        """
        Marca un correo como verificado y listo para persistir en Neon
        
        Args:
            correo: Correo validado manualmente
            verificado_por: Usuario que verificó
        
        Returns:
            Payload listo para Neon
        """
        if not DocenteAuditSystem.validar_formato_correo_mep(correo):
            return {
                "error": "Formato de correo inválido. Debe ser @mep.go.cr",
                "estado": "RECHAZADO"
            }
        
        return {
            "correo_oficial": correo,
            "estado": "VERIFICADO",
            "verificado_por": verificado_por,
            "timestamp": "NOW",
            "es_estudiante": False  # Flag crítico: docente ≠ estudiante
        }
    
    @staticmethod
    def generar_alerta_ui() -> str:
        """
        Genera texto de alerta para la UI de Antigravity
        """
        return """
╔══════════════════════════════════════════════════════════╗
║  ⚠️ VERIFICACIÓN OBLIGATORIA - CORREO DOCENTE           ║
╚══════════════════════════════════════════════════════════╝

🔍 IMPORTANTE:

Los correos docentes NO se generan automáticamente debido al riesgo
de homónimos (personas con nombres idénticos) en el sistema MEP.

📋 PROCESO DE VALIDACIÓN:
   1. Revise la sugerencia generada
   2. Consulte la planilla oficial MEP o directorio institucional
   3. Confirme el correo exacto del docente
   4. Haga clic en "VERIFICAR Y GUARDAR"

✅ ESTUDIANTES: Generación automática via Cédula (seguro)
🔍 DOCENTES: Verificación manual requerida (seguridad)

═════════════════════════════════════════════════════════
Esta validación protege contra errores de envío y 
filtraciones de información sensible.
═════════════════════════════════════════════════════════
"""

if __name__ == "__main__":
    # Test del sistema de auditoría
    audit = DocenteAuditSystem()
    
    print("🧪 TEST 1: Sugerir correo docente")
    resultado1 = audit.sugerir_correo_docente("María", "Rodríguez", "López")
    print(f"   Sugerencia: {resultado1['sugerencia']}")
    print(f"   Alternativas: {resultado1['alternativas']}")
    print(f"   Estado: {resultado1['estado']}")
    print(f"   Nota: {resultado1['nota']}")
    
    print("\n🧪 TEST 2: Validar formato")
    test_correos = [
        "maria.rodriguez.lopez@mep.go.cr",
        "invalido@est.mep.go.cr",
        "juan.perez@mep.go.cr"
    ]
    for correo in test_correos:
        es_valido = audit.validar_formato_correo_mep(correo)
        print(f"   {correo}: {'✅ Válido' if es_valido else '❌ Inválido'}")
    
    print("\n🧪 TEST 3: Marcar como verificado")
    verificacion = audit.marcar_correo_verificado("maria.rodriguez.lopez@mep.go.cr", "admin_ultra")
    print(f"   Estado: {verificacion.get('estado')}")
    print(f"   Verificado por: {verificacion.get('verificado_por')}")
    
    print("\n📢 ALERTA UI:")
    print(audit.generar_alerta_ui())
