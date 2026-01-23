# -*- coding: utf-8 -*-
"""
ANTIGRAVITY CACHE SERVICE: Neon como Memoria Semántica
Acelera generación mediante cache estructural y reutilización inteligente
"""
import psycopg2
import json
from typing import Optional, Dict, Any
from datetime import datetime

# Conexión Neon
NEON_URL = "postgresql://neondb_owner:npg_xK9vyfs2VpoQ@ep-wild-block-ahxdtdv6-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require"

class CacheService:
    """Servicio de caché semántico usando Neon como fuente de verdad"""
    
    def __init__(self):
        self.conn_string = NEON_URL
    
    def buscar_estructura_similar(
        self, 
        modalidad: str, 
        nivel: str, 
        asignatura: str = None,
        tema: str = None
    ) -> Optional[Dict[str, Any]]:
        """
        Busca en Neon una estructura pedagógica similar para reutilizar
        
        Returns:
            Dict con estructura base si existe, None si debe generarse desde RAG
        """
        try:
            conn = psycopg2.connect(self.conn_string)
            cur = conn.cursor()
            
            # Query por similaridad (busca tema exacto primero, luego nivel+modalidad)
            if tema:
                query = """
                SELECT contenido_json, programa_nombre, updated_at 
                FROM m_mep_respaldo 
                WHERE programa_nombre ILIKE %s 
                   OR contenido_json::text ILIKE %s
                ORDER BY updated_at DESC 
                LIMIT 1;
                """
                cur.execute(query, (f"%{tema}%", f"%{tema}%"))
            else:
                # Búsqueda por nivel y modalidad
                query = """
                SELECT contenido_json, programa_nombre, updated_at 
                FROM m_mep_respaldo 
                WHERE contenido_json::text ILIKE %s 
                   AND contenido_json::text ILIKE %s
                ORDER BY updated_at DESC 
                LIMIT 1;
                """
                cur.execute(query, (f"%{nivel}%", f"%{modalidad}%"))
            
            result = cur.fetchone()
            cur.close()
            conn.close()
            
            if result:
                contenido_json, nombre, updated_at = result
                return {
                    "encontrado": True,
                    "contenido": contenido_json if isinstance(contenido_json, dict) else json.loads(contenido_json),
                    "fuente": nombre,
                    "fecha": updated_at,
                    "tipo": "cache_hit"
                }
            
            return {"encontrado": False, "tipo": "cache_miss"}
            
        except Exception as e:
            print(f"⚠️ Cache lookup error: {e}")
            return {"encontrado": False, "tipo": "cache_error", "error": str(e)}
    
    def guardar_estructura_base(
        self, 
        tema: str, 
        contenido: str, 
        metadata: Dict[str, Any] = None
    ) -> bool:
        """
        Guarda estructura generada en Neon como activo reutilizable
        
        Args:
            tema: Identificador del plan
            contenido: Plan pedagógico generado
            metadata: Datos adicionales (nivel, modalidad, duración, etc.)
        
        Returns:
            bool: True si se guardó exitosamente
        """
        try:
            conn = psycopg2.connect(self.conn_string)
            cur = conn.cursor()
            
            # Preparar payload con metadata enriquecida
            payload = {
                "tema": tema,
                "contenido": contenido,
                "metadata": metadata or {},
                "generado_en": datetime.now().isoformat(),
                "fuente": "Antigravity_RAG_Ultra",
                "version": "2026_Kaizen"
            }
            
            id_prog = tema.lower().replace(" ", "_")[:50]
            
            query = """
            INSERT INTO m_mep_respaldo (
                id_programa, 
                programa_nombre, 
                contenido_json, 
                version_kaizen
            )
            VALUES (%s, %s, %s, %s)
            ON CONFLICT (id_programa) 
            DO UPDATE SET 
                contenido_json = EXCLUDED.contenido_json,
                updated_at = CURRENT_TIMESTAMP;
            """
            
            cur.execute(query, (
                id_prog,
                tema,
                json.dumps(payload, ensure_ascii=False),
                "Ultra-v2026"
            ))
            
            conn.commit()
            cur.close()
            conn.close()
            
            print(f"✅ Cache guardado: {tema}")
            return True
            
        except Exception as e:
            print(f"❌ Error guardando en cache: {e}")
            return False
    
    def listar_estructuras_disponibles(
        self, 
        modalidad: str = None, 
        nivel: str = None
    ) -> list:
        """
        Lista todas las estructuras disponibles en Neon
        Útil para poblar dropdowns en la UI
        """
        try:
            conn = psycopg2.connect(self.conn_string)
            cur = conn.cursor()
            
            if modalidad and nivel:
                query = """
                SELECT programa_nombre, updated_at 
                FROM m_mep_respaldo 
                WHERE contenido_json::text ILIKE %s 
                   AND contenido_json::text ILIKE %s
                ORDER BY updated_at DESC;
                """
                cur.execute(query, (f"%{modalidad}%", f"%{nivel}%"))
            else:
                query = """
                SELECT programa_nombre, updated_at 
                FROM m_mep_respaldo 
                ORDER BY updated_at DESC 
                LIMIT 100;
                """
                cur.execute(query)
            
            results = cur.fetchall()
            cur.close()
            conn.close()
            
            return [{"nombre": r[0], "fecha": r[1]} for r in results]
            
        except Exception as e:
            print(f"⚠️ Error listando estructuras: {e}")
            return []

# Instancia global
cache = CacheService()

if __name__ == "__main__":
    # Test del cache
    print("🧪 Testing Cache Service...")
    
    # Test 1: Buscar estructura similar
    result = cache.buscar_estructura_similar(
        modalidad="Técnica",
        nivel="10mo",
        tema="Ciberseguridad"
    )
    print(f"Test 1 - Búsqueda: {result.get('tipo')}")
    
    # Test 2: Guardar estructura
    exito = cache.guardar_estructura_base(
        tema="Test Ciberseguridad 10mo",
        contenido="Plan de prueba...",
        metadata={"nivel": "10mo", "modalidad": "Técnica"}
    )
    print(f"Test 2 - Guardado: {'✅' if exito else '❌'}")
    
    # Test 3: Listar
    lista = cache.listar_estructuras_disponibles()
    print(f"Test 3 - Disponibles: {len(lista)} estructuras")
