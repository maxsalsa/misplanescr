import time
import logging
import os
from dotenv import load_dotenv

# Load Environment Variables from Root
load_dotenv(os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env'))

from sentinel_crawler import SentinelCrawler
from kaizen_parser import KaizenParser # Fallback
from sovereign_intelligence import SovereignIntelligence # Hyper-Core
from neon_injector import NeonInjector

# Configuración de Logs Sovereign
logging.basicConfig(
    filename='SYSTEM_HEALTH.log',
    level=logging.INFO,
    format='%(asctime)s - [SOVEREIGN-ORCHESTRATOR] - %(message)s'
)
console = logging.StreamHandler()
console.setLevel(logging.INFO)
logging.getLogger('').addHandler(console)
logger = logging.getLogger(__name__)

def run_autonomous_mining():
    """
    ⚔️ AUTONOMOUS MINING & RECONSTRUCTION LOOP (KAIZEN ∞) ⚔️
    Flow: Sentinel (Crawl) -> Gemini 3 Flash (Reconstruct DNA) -> Knowledge Kernel (Neon)
    """
    logger.info("⚔️ ACTIVATING HYPER-CORE PROTOCOL (KAIZEN ∞)...")
    
    # Initialize The Trinity
    sentinel = SentinelCrawler()
    brain = SovereignIntelligence()
    injector = NeonInjector()

    if not brain.client:
        logger.warning("⚠️ PROCEEDING WITH LEGACY PARSER (Gemini Key Missing)")
        legacy_mode = True
        legacy_parser = KaizenParser()
    else:
        legacy_mode = False

    # 1. STEADY CRAWL (The Miner)
    logger.info("⛏️  Sentinel: Extracting raw ore from global sector...")
    findings = sentinel.run_cycle()
    logger.info(f"==> Extracted {len(findings)} raw nodes.")

    success_count = 0
    
    for item in findings:
        try:
            # Fetch Content
            content_body = sentinel.polite_request(item['url'])
            if not content_body:
                continue
            text_content = content_body.decode('utf-8', errors='ignore')
            
            # 2. RECONSTRUCTION (The Alchemist)
            reconstructed_data = None
            semantic_hash = sentinel.calculate_hash(content_body)

            if not legacy_mode:
                logger.info(f"⚡ Gemini Flash: Reconstructing DNA for '{item['text']}'...")
                reconstructed_data = brain.reconstruct_pedagogical_dna(text_content, item['source'])
            
            if not reconstructed_data:
                # Fallback to Legacy Parser if Gemini fails or is offline
                if legacy_mode:
                    reconstructed_data = legacy_parser.normalize_knowledge_kernel(item, text_content)["jsonbData"]
                    # Add pseudo-structure to match new schema roughly
                    reconstructed_data["sello_calidad"] = "Legacy Parser"
                else:
                    continue

            # Prepare Kernel Payload (Fusion of Metadata + Reconstructed Logic)
            kernel_payload = {
                "jsonbData": reconstructed_data,
                "mepMetadata": {
                    "source": item["source"],
                    "url": item["url"],
                    "reconstructed": True
                },
                "logicRules": {
                    "derived_bloom": reconstructed_data.get("taxonomia_bloom", "N/A"),
                    "scoring_model": "standard_rubric" 
                },
                "classificationTags": {
                    "keywords": list(reconstructed_data.get("variantes_inclusion", {}).keys()),
                    "premium": True
                }
            }

            # 3. PERSISTENCE (The Vault)
            injected = injector.upsert_kernel_knowledge(kernel_payload, semantic_hash)
            
            if injected:
                success_count += 1
                
        except Exception as e:
            logger.error(f"❌ Processing Error ({item.get('url')}): {e}")

    # 4. SOVEREIGN REPORT
    logger.info(f"🏁 MINING COMPLETE. {success_count} new Sovereign Assets reconstructed.")
    if success_count > 0:
        logger.info("📱 [WhatsApp] Lic. Max: New Assets Reconstructed & Monetized.")

if __name__ == "__main__":
    run_autonomous_mining()
