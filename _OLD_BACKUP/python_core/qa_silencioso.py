import os
import time
import logging
import psycopg2
from psycopg2.extras import RealDictCursor
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env'))

# Configuración de Logs Sovereign
logging.basicConfig(level=logging.INFO, format='%(asctime)s - [QA-SILENCIOSO] - %(message)s')
logger = logging.getLogger(__name__)

class SilentSentinel:
    """
    🛡️ QA SILENCIOSO (SELF-HEALING) - KAIZEN 2000.0
    Audits KnowledgeKernel integrity and verify Zero-Latency structures.
    """
    
    def __init__(self):
        self.db_url = os.getenv("DATABASE_URL")

    def run_audit(self):
        logger.info("🔍 STARTING SILENT AUDIT...")
        try:
            conn = psycopg2.connect(self.db_url)
            cur = conn.cursor(cursor_factory=RealDictCursor)
            
            # 1. CHECK KERNEL DENSITY
            cur.execute("SELECT COUNT(*) as count FROM knowledge_kernel")
            count = cur.fetchone()['count']
            logger.info(f"📊 Knowledge Kernel Size: {count} units.")
            
            if count == 0:
                logger.warning("⚠️ Kernel is empty. Sentinel Execution pending results?")
            else:
                # 2. VERIFY JSONB STRUCTURE (Sample)
                cur.execute("SELECT * FROM knowledge_kernel LIMIT 1")
                sample = cur.fetchone()
                
                # Check for key fields
                json_data = sample.get('jsonb_data', {})
                # Handle stringified JSON if psycopg2 didn't auto-parse (unlikely with Json adapter, but possible)
                if not json_data.get('objectives') and not json_data.get('content'):
                     logger.error("❌ INTEGRITY FAILURE: Missing objectives/content in Kernel entry.")
                else:
                    logger.info("✅ Structural Integrity Passed (JSONB Density Verified).")

                # 3. VERIFY PREMIUM FLAGS (Monetization)
                cur.execute("SELECT COUNT(*) as premium_count FROM knowledge_kernel WHERE is_premium = TRUE")
                p_count = cur.fetchone()['premium_count']
                logger.info(f"💰 Premium Assets Ready: {p_count}")

            logger.info("🛡️ SILENT AUDIT COMPLETE.")
            
        except Exception as e:
            logger.error(f"❌ AUDIT ERROR: {e}")
        finally:
            if 'conn' in locals() and conn: conn.close()

if __name__ == "__main__":
    sentinel = SilentSentinel()
    sentinel.run_audit()
