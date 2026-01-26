# -*- coding: utf-8 -*-
"""
ANTIGRAVITY SAAS MANAGER
Gestión de Suscriptores, Licencias y Roles (Super Admin vs Usuario Final)
"""
import json
import hashlib
import hmac
import os
from datetime import datetime, timedelta

class AntigravitySaaSManager:
    def __init__(self):
        # YO: Super Admin (Dueño de la Plataforma)
        self.super_admin = "Max Salazar Sánchez" 
        self.master_key = os.environ.get("ANTIGRAVITY_MASTER_KEY", "MAX_SALAZAR_GOD_MODE_KEY_2026")
        
        # Base de Datos Simulada de Usuarios (Neon DB Users Table)
        self.usuarios_db = {}

    def crear_usuario(self, nombre, email, tipo_plan):
        """
        [SUPER ADMIN] Registra un nuevo docente suscriptor.
        """
        print(f"👤 [ADMIN] Creando usuario: {nombre} ({tipo_plan})...")
        
        user_id = hashlib.sha256(email.encode()).hexdigest()[:12].upper()
        
        # Lógica de Expiración
        fecha_inicio = datetime.now()
        if tipo_plan == "ANUAL":
            fecha_fin = fecha_inicio + timedelta(days=365)
        elif tipo_plan == "SEMESTRAL":
            fecha_fin = fecha_inicio + timedelta(days=180)
        else:
            fecha_fin = fecha_inicio + timedelta(days=30) # Demo
            
        nuevo_usuario = {
            "id": user_id,
            "nombre": nombre,
            "email": email,
            "rol": "DOCENTE_SUSCRIPTOR",
            "plan": tipo_plan,
            "estado": "ACTIVO",
            "permisos_firma": True, # El que paga, firma
            "validez_hasta": fecha_fin.isoformat(),
            "created_by": self.super_admin
        }
        
        self.usuarios_db[user_id] = nuevo_usuario
        print(f"   ✅ Usuario creado: {user_id} | Vence: {fecha_fin.date()}")
        return nuevo_usuario

    def desactivar_usuario(self, user_id):
        """
        [SUPER ADMIN] Bloquea el acceso por falta de pago o sanción.
        """
        if user_id in self.usuarios_db:
            self.usuarios_db[user_id]["estado"] = "INACTIVO"
            self.usuarios_db[user_id]["permisos_firma"] = False
            print(f"   ⛔ [ADMIN] Usuario {user_id} DESACTIVADO (Acceso revocado).")
            return True
        return False

    def reactivar_usuario(self, user_id):
        """
        [SUPER ADMIN] Restaura el servicio tras el pago.
        """
        if user_id in self.usuarios_db:
            self.usuarios_db[user_id]["estado"] = "ACTIVO"
            self.usuarios_db[user_id]["permisos_firma"] = True
            print(f"   🟢 [ADMIN] Usuario {user_id} REACTIVADO.")
            return True
        return False

    def eliminar_usuario(self, user_id):
        """
        [SUPER ADMIN] Borrado definitivo (GDPR/Solicitud).
        """
        if user_id in self.usuarios_db:
            del self.usuarios_db[user_id]
            print(f"   🗑️ [ADMIN] Usuario {user_id} ELIMINADO permanentemente.")
            return True
        return False

    def validar_permiso_firma(self, user_id):
        """
        Verifica si el usuario tiene derecho a firmar documentos.
        """
        user = self.usuarios_db.get(user_id)
        if not user:
            return {"autorizado": False, "motivo": "Usuario no existe"}
            
        if user["estado"] != "ACTIVO":
            return {"autorizado": False, "motivo": "Suscripción Inactiva / Falta de Pago"}
            
        # Verificar fecha
        fecha_limite = datetime.fromisoformat(user["validez_hasta"])
        if datetime.now() > fecha_limite:
            return {"autorizado": False, "motivo": "Licencia Expirada"}
            
        return {
            "autorizado": True, 
            "identidad_firma": user["nombre"], # "Quien paga manda"
            "sello_integridad_user": self._generar_hash_usuario(user_id)
        }

    def _generar_hash_usuario(self, user_id):
        return hmac.new(self.master_key.encode(), user_id.encode(), hashlib.sha256).hexdigest()

# Test Drive (SaaS Logic)
if __name__ == "__main__":
    manager = AntigravitySaaSManager()
    
    print("\n--- GESTIÓN DE SUSCRIPTORES (PANEL SUPER ADMIN) ---")
    
    # 1. Crear un Cliente (Docente que paga Anualidad)
    profe_cliente = manager.crear_usuario("Lic. Ana Gómez", "ana.gomez@ctp.ed.cr", "ANUAL")
    cliente_id = profe_cliente["id"]
    
    # 2. El Cliente intenta firmar un acta
    permiso = manager.validar_permiso_firma(cliente_id)
    print(f"\n📝 Intento de Firma por {profe_cliente['nombre']}:")
    print(f"   Estado: {'✅ AUTORIZADO' if permiso['autorizado'] else '❌ DENEGADO'}")
    
    # 3. El Cliente deja de pagar (Admin lo desactiva)
    print("\n⚠️ Reporte de Impago. Ejecutando corte de servicio...")
    manager.desactivar_usuario(cliente_id)
    
    # 4. Cliente intenta firmar de nuevo
    permiso_bloqueado = manager.validar_permiso_firma(cliente_id)
    print(f"📝 Intento de Firma (Suspendido):")
    print(f"   Estado: {'✅ AUTORIZADO' if permiso_bloqueado['autorizado'] else '❌ DENEGADO'}")
    print(f"   Motivo: {permiso_bloqueado.get('motivo')}")
    
    # 5. Cliente paga (Reactivación)
    manager.reactivar_usuario(cliente_id)
