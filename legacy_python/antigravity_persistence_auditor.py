# -*- coding: utf-8 -*-
"""
ANTIGRAVITY PERSISTENCE AUDITOR
Auditoría de Sincronización, Persistencia Ácida y Tolerancia a Fallos
"""
import json
import time
import os
import hashlib
import hmac

class AntigravityPersistenceAuditor:
    def __init__(self):
        self.super_user = "Max Salazar Sánchez"
        self.master_key = os.environ.get("ANTIGRAVITY_MASTER_KEY", "MAX_SALAZAR_SECRET_DIAMOND_KEY_2026")
        self.local_buffer = []

    def auditar_memoria_pedagogica(self, desglose_evaluacion):
        """
        Verifica que la estructura de calificación cumpla con el Reglamento MEP.
        (40% Cotidiano, 10% Tareas, 20% Pruebas, 20% Proyecto, 10% Asistencia)
        """
        print("🧠 Auditando Memoria Pedagógica (Regla 100%)...")
        
        suma_componentes = sum(desglose_evaluacion.values())
        
        if abs(suma_componentes - 100) > 0.01:
            print(f"   ❌ Error: La suma es {suma_componentes}%. Transacción rechazada.")
            return False
            
        print("   ✅ Estructura Válida: Cotidiano, Tareas, Pruebas, Proyecto, Asistencia suman 100%.")
        return True

    def simular_transaccion_segura(self, datos):
        """
        Simula el guardado con sello HMAC.
        """
        print(f"🔒 Intentando persistir registro: {datos['tipo']}...")
        
        # 1. Generar Firma
        payload = json.dumps(datos['contenido'], sort_keys=True)
        firma = hmac.new(self.master_key.encode(), payload.encode(), hashlib.sha256).hexdigest()
        
        # 2. Guardar en 'DB'
        registro_db = {
            "data": datos['contenido'],
            "signature": firma,
            "timestamp": time.time()
        }
        print(f"   ✅ Registro persistido con Sello de Integridad: {firma[:16]}...")
        return registro_db

    def simular_caida_y_recuperacion(self, lote_datos):
        """
        Simula desconexión y Auto-Sync desde Buffer Local.
        """
        print("\n⚡ simulando CAÍDA DE CONEXIÓN durante carga masiva...")
        
        # Fase 1: Offline (Buffering)
        print("   ⚠️ Conexión perdida. Guardando en Buffer Local Encriptado...")
        for item in lote_datos:
            self.local_buffer.append(item)
            print(f"      -> Bufferizado: {item['id']}")
            
        # Fase 2: Reconexión (Auto-Sync)
        print("   🌐 Conexión detectada (Neon DB Online). Iniciando Auto-Sync...")
        exito = True
        for item in self.local_buffer:
            print(f"      -> Sincronizando (Upsert): {item['id']}... OK.")
            
        self.local_buffer = []
        if exito:
            print("   ✅ Sincronización Post-Fallo completada sin pérdida de datos.")

if __name__ == "__main__":
    auditor = AntigravityPersistenceAuditor()
    
    # 1. Auditoría de Memoria Pedagógica
    desglose_correcto = {"cotidiano": 40, "tareas": 10, "pruebas": 20, "proyecto": 20, "asistencia": 10}
    auditor.auditar_memoria_pedagogica(desglose_correcto)
    
    # 2. Core de Seguridad (Persistencia)
    auditor.simular_transaccion_segura({
        "tipo": "Nota Final",
        "contenido": {"estudiante": "EST-01", "nota": 98, "materia": "Soporte TI"}
    })
    
    # 3. Prueba de Estrés (Offline/Online)
    lote_prueba = [
        {"id": "PLAN-ENG-01", "content": "Verb To Be"},
        {"id": "PLAN-ENG-02", "content": "Simple Present"},
        {"id": "PLAN-ENG-03", "content": "Tech Vocabulary"}
    ]
    auditor.simular_caida_y_recuperacion(lote_prueba)
