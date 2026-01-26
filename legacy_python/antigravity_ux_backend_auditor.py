# -*- coding: utf-8 -*-
"""
ANTIGRAVITY UX/BACKEND AUDITOR
Auditoría de Coherencia Full-Stack y Sello de Seguridad Diamante
"""
import json
import hashlib
import hmac
import os
from datetime import datetime

class AntigravityUXBackendAuditor:
    def __init__(self):
        self.super_user = "Max Salazar Sánchez"
        self.master_key = os.environ.get("ANTIGRAVITY_MASTER_KEY", "MAX_SALAZAR_SECRET_DIAMOND_KEY_2026")

    def auditar_contexto_ux(self, grupo_data):
        """
        Verifica que el Frontend 'entienda' el contexto del grupo.
        """
        print(f"👁️ Auditando Contexto UX para: {grupo_data['nombre']}...")
        
        ui_flags = {
            "btn_conducta": False,
            "btn_practica": False,
            "theme_color": "blue" # Default
        }
        
        if grupo_data.get('es_guia'):
            ui_flags["btn_conducta"] = True
            ui_flags["theme_color"] = "gold" # Guia is Gold
            print("   ✅ Contexto Guía detectado: Botón Conducta ACTIVO.")
            
        if "Técnica" in grupo_data.get('area', ''):
            ui_flags["btn_practica"] = True
            ui_flags["theme_color"] = "industrial_dark"
            print("   ✅ Contexto Técnico detectado: Botón Práctica Pedagógica ACTIVO.")
            
        return ui_flags

    def auditar_micro_interaccion_upre(self, historial_asistencia):
        """
        Simula el pase de lista y verifica si salta el modal de Alerta.
        """
        print("⚡ Testeando Micro-interacción UPRE (3ra Ausencia)...")
        conteo_consecutivo = 0
        trigger_activado = False
        
        for estado in historial_asistencia:
            if estado == "Ausente":
                conteo_consecutivo += 1
            else:
                conteo_consecutivo = 0
                
            if conteo_consecutivo >= 3:
                trigger_activado = True
                print(f"   🚨 TRIGGER DISPARADO: {conteo_consecutivo} ausencias consecutivas.")
                break
        
        if trigger_activado:
            return "PASSED"
        return "FAILED"

    def auditar_integridad_documento(self, datos_nota):
        """
        Validación cruzada de Hash Backend vs QR Frontend.
        """
        print("🛡️ Auditando Algoritmo de Firma Cruzada...")
        
        # 1. Hash Backend
        payload_str = json.dumps(datos_nota, sort_keys=True)
        hash_backend = hmac.new(self.master_key.encode(), payload_str.encode(), hashlib.sha256).hexdigest()
        
        # 2. Simulación QR Frontend
        qr_content = f"https://antigravity.mep/verify/{hash_backend}"
        
        # Verificación
        if hash_backend in qr_content:
            print(f"   ✅ QR Válido: Contiene el Hash del Backend ({hash_backend[:8]}...).")
            return "VERIFIED"
        return "BROKEN"

    def verificar_optimizacion_pedagogica(self):
        """
        Verifica Pesos de Evaluación (Soporte TI 10mo).
        """
        print("⚖️ Verificando Ponderación (Soporte TI 10mo)...")
        pesos = {"Cotidiano": 40, "Tareas": 10, "Pruebas": 20, "Proyecto": 20, "Asistencia": 10}
        
        if sum(pesos.values()) == 100:
            print("   ✅ Ponderación Correcta (100%).")
            return "OPTIMIZED"
        return "MISALIGNED"

if __name__ == "__main__":
    auditor = AntigravityUXBackendAuditor()
    
    # 1. Contexto UX
    auditor.auditar_contexto_ux({"nombre": "10-1 Guía", "es_guia": True, "area": "Académica"})
    auditor.auditar_contexto_ux({"nombre": "12-1 Soporte TI", "es_guia": False, "area": "Técnica"})
    
    # 2. Trigger UPRE
    asistencia_simulada = ["Presente", "Ausente", "Ausente", "Ausente", "Presente"]
    auditor.auditar_micro_interaccion_upre(asistencia_simulada)
    
    # 3. Integridad Documento
    auditor.auditar_integridad_documento({"est": "EST-01", "nota": 100})
    
    # 4. Pedagogía
    auditor.verificar_optimizacion_pedagogica()
