# -*- coding: utf-8 -*-
"""
ANTIGRAVITY SUBSCRIPTION MANAGER
Gestión de Suscripciones, Roles Delegados y Scope Validator O(1)
"""
import json
import hashlib
import hmac
import os
from datetime import datetime

class AntigravitySubscriptionManager:
    def __init__(self):
        self.super_admin = "Max Salazar Sánchez"
        self.master_key = os.environ.get("ANTIGRAVITY_MASTER_KEY", "MAX_SALAZAR_SECRET_DIAMOND_KEY_2026")
        
        # Base de Datos Simulada
        self.usuarios = {
            "DOCENTE_A": {
                "nombre": "Lic. Ana (Soporte TI)",
                "rol": "DOCENTE_SUSCRIPTOR",
                "suscripciones": ["SUB_SOPORTE_TI"],
                "estado_pago": "AL_DIA"
            },
            "DOCENTE_B": {
                "nombre": "Ing. Carlos (Full Stack)",
                "rol": "DOCENTE_SUSCRIPTOR",
                "suscripciones": ["SUB_SOPORTE_TI", "SUB_DESARROLLO_WEB"],
                "estado_pago": "AL_DIA"
            },
            "DELEGADO_1": {
                "nombre": "Asistente Admin",
                "rol": "ADMIN_DELEGADO",
                "permisos_delegados": ["VER_MATRICULA", "REVISAR_UPRE"],
                "suscripciones": [] # No aplica
            }
        }
        
        self.modulos = {
            "PLAN_SOPORTE_10": {"id_subarea": "SUB_SOPORTE_TI", "nombre": "Planes Soporte TI 10mo"},
            "PLAN_WEB_11": {"id_subarea": "SUB_DESARROLLO_WEB", "nombre": "Planes Web Dev 11mo"},
            "ADMIN_PANEL": {"id_subarea": "ADMIN_ACCESS", "nombre": "Panel Administrativo"}
        }

    def validar_acceso_scope(self, user_id, modulo_id):
        """
        [ALGORITMO O(1)] Valida si el usuario tiene derecho a entrar al módulo.
        """
        print(f"🔑 Validando Acceso: {user_id} -> {modulo_id}...")
        usuario = self.usuarios.get(user_id)
        modulo = self.modulos.get(modulo_id)
        
        if not usuario or not modulo:
            return {"allow": False, "reason": "Entidad no encontrada"}
            
        # 1. Super Admin Bypass
        if user_id == "SUPER_ADMIN":
            return {"allow": True, "reason": "God Mode"}
            
        # 2. Scope Check
        required_sub = modulo["id_subarea"]
        
        # Caso Admin Delegado
        if usuario["rol"] == "ADMIN_DELEGADO":
            # Lógica simple: si no es admin panel, denegar (o lógica específica)
            # Aquí simulamos que solo ve cosas de gestión, no contenidos académicos
            if "ADMIN_ACCESS" in required_sub: # No tiene acceso full admin
                 return {"allow": False, "reason": "Requiere Super Admin"}
            # Podría tener acceso a vistas read-only, pero para este test:
            return {"allow": False, "reason": "Rol no académico"}

        # Caso Docente
        if required_sub in usuario["suscripciones"]:
            return {"allow": True, "reason": "Suscripción Activa"}
        else:
            return {
                "allow": False, 
                "reason": "Suscripción No Encontrada", 
                "ui_action": "LOCK_ANIMATION", 
                "upsell_msg": f"Suscríbete a {modulo['nombre']} para desbloquear."
            }

    def asignar_admin_delegado(self, nuevo_delegado_id, permisos):
        """
        Asigna permisos específicos a un ayudante.
        """
        print(f"\n👮 Asignando Delegado: {nuevo_delegado_id} con permisos {permisos}...")
        
        registro = {
            "id": nuevo_delegado_id,
            "role": "ADMIN_DELEGADO",
            "capabilities": permisos,
            "assigned_by": self.super_admin,
            "timestamp": datetime.now().isoformat()
        }
        
        # Sellar Transacción
        payload = json.dumps(registro, sort_keys=True)
        registro['integrity_hash'] = hmac.new(
            self.master_key.encode(), payload.encode(), hashlib.sha256
        ).hexdigest()
        
        print(f"   ✅ Delegado Registrado. Hash: {registro['integrity_hash'][:16]}...")
        return registro

    def generar_reporte_suscripciones(self):
        """
        Vista del Super Admin (Mapa de Calor).
        """
        print(f"\n📊 Generando Reporte Maestro de Suscripciones (misplanescr.com)...")
        reporte = []
        for uid, data in self.usuarios.items():
            reporte.append({
                "usuario": data['nombre'],
                "rol": data['rol'],
                "subs_activas": len(data.get('suscripciones', [])),
                "estado": data.get('estado_pago', 'N/A')
            })
        return wx_report_csv(reporte) # Simulado

def wx_report_csv(data):
    # Helper simple para simular CSV
    print("   Usuario | Rol | Subs | Estado")
    for row in data:
        print(f"   {row['usuario']} | {row['rol']} | {row['subs_activas']} | {row['estado']}")
    return "REPORT_OK"

if __name__ == "__main__":
    manager = AntigravitySubscriptionManager()
    
    # 1. Docente A intenta entrar a Soporte TI (Tiene Sub)
    res_a1 = manager.validar_acceso_scope("DOCENTE_A", "PLAN_SOPORTE_10")
    print(f"   resultado: {res_a1['allow']} ({res_a1['reason']})")
    
    # 2. Docente A intenta entrar a Web Dev (NO Tiene Sub)
    res_a2 = manager.validar_acceso_scope("DOCENTE_A", "PLAN_WEB_11")
    print(f"   resultado: {res_a2['allow']} -> Acción UI: {res_a2.get('ui_action')} ({res_a2.get('upsell_msg')})")
    
    # 3. Docente B intenta entrar a Web Dev (Tiene Doble Sub)
    res_b = manager.validar_acceso_scope("DOCENTE_B", "PLAN_WEB_11")
    print(f"   resultado: {res_b['allow']} ({res_b['reason']})")
    
    # 4. Super Admin crea delegado
    manager.asignar_admin_delegado("USER_X", ["VER_ESTADISTICAS"])
    
    # 5. Vista General
    manager.generar_reporte_suscripciones()
