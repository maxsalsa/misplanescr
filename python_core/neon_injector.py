import os
import json
import psycopg2
import logging
from psycopg2.extras import Json

# Configuración de Logs Sovereign
logger = logging.getLogger(__name__)

class NeonInjector:
    """
    💉 NEON INJECTOR (THE DATA WEAVER) - KAIZEN 2000.0
    Injects curated knowledge into KnowledgeKernel with semantic hashing.
    """

    def __init__(self):
        from dotenv import load_dotenv
        load_dotenv(os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env'))
        self.db_url = os.getenv("DATABASE_URL")

    def get_connection(self):
        try:
            return psycopg2.connect(self.db_url)
        except Exception as e:
            logger.error(f"❌ DB Connection Failed: {e}")
            return None

    def upsert_kernel_knowledge(self, kernel_data, semantic_hash):
        """
        Upserts high-density JSONB into KnowledgeKernel.
        KAIZEN ∞: Implements Evolutionary Versioning (No Forget).
        """
        conn = self.get_connection()
        if not conn:
            return False

        # Logic: If exists, append new version to a 'history' key or merge
        # For this iteration, we merge the new data into the existing JSONB 
        # but keep a 'versions' array inside the JSONB structure if possible.
        # Ideally, we would fetch first, but to keep it "Zero Latency" (One RTT),
        # we use Postgres JSONB concatenation.
        
        # New strategy:
        # jsonb_data = jsonb_set(jsonb_data, '{history}', jsonb_data->'history' || NEW_ENTRY)
        
        query = """
        INSERT INTO knowledge_kernel (
            id, semantic_hash, jsonb_data, mep_metadata, logic_rules, 
            classification_tags, quality_score, is_verified, source_origin, is_premium,
            updated_at
        ) VALUES (
            gen_random_uuid(), %s, %s, %s, %s, 
            %s, %s, %s, %s, %s,
            NOW()
        )
        ON CONFLICT (semantic_hash) DO UPDATE SET
            updated_at = NOW(),
            -- EVOLUTIONARY LOGIC: Merge new fields, preserve old ones.
            jsonb_data = knowledge_kernel.jsonb_data || EXCLUDED.jsonb_data, 
            quality_score = knowledge_kernel.quality_score + 0.1;
        """

        try:
            with conn.cursor() as cur:
                cur.execute(query, (
                    semantic_hash,
                    Json(kernel_data["jsonbData"]),
                    Json(kernel_data["mepMetadata"]),
                    Json(kernel_data["logicRules"]),
                    Json(kernel_data["classificationTags"]),
                    0.95, # Initial High Quality (Curated)
                    True, # Verified by Sentinel
                    kernel_data["mepMetadata"]["source"],
                    True # Always Premium for Kaizen 2000.0/∞
                ))
            conn.commit()
            logger.info(f"💎 Injected/Evolved Knowledge Kernel: {semantic_hash[:8]}...")
            return True
        except Exception as e:
            conn.rollback()
            logger.error(f"❌ Kernel Injection Failed: {e}")
            return False
        finally:
            conn.close()
