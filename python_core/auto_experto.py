import os
import sys
import time
import json
from hashlib import sha256
from sovereign_intelligence import SovereignIntelligence
from neon_injector import NeonInjector
from dotenv import load_dotenv

# Configuración
import logging
load_dotenv(os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env'))
logging.basicConfig(level=logging.INFO, format='%(asctime)s - [AUTO-EXPERTO-KAIZEN] - %(message)s')
logger = logging.getLogger(__name__)

def generar_combo_soberano(tema):
    print("\n" + "="*50)
    print("🚀 AUTO-EXPERTO KAIZEN ∞ (HYPER-CORE INTEGRATION)")
    print("="*50)

    # 1. Instanciar Cerebro Soberano
    brain = SovereignIntelligence()
    if not brain.client:
        print("❌ Error: Sovereign Intelligence not active (Check API Key).")
        return

    # 2. Generar Plan con Gemini 3 Flash
    print(f"⚡ Solicitando al Hyper-Core plan oficial para: '{tema}'...")
    
    # Simulamos metadata de fuente "Oficial"
    source_meta = {
        "url": "https://mep.go.cr/programas-oficiales",
        "title": f"Programa Oficial MEP - {tema}",
        "description": "Legacy Expert System Request"
    }
    
    # Usamos el reconstructor para generar el JSON validado
    # El prompt espera un texto "raw", le damos el tema como contexto fuerte
    raw_context = f"""
    Tema Oficial MEP: {tema}.
    Generar SECUENCIA NEURODIDÁCTICA (Kaizen Total Ω):
    1. Focalización (Inicio)
    2. Exploración (Desarrollo)
    3. Contrastación (Desarrollo)
    4. Aplicación (Cierre)
    
    Vocabulario: Instrumentaliza, Sistematiza, Problematiza.
    Aplicar DUA y Rúbricas 1-3.
    """
    
    sovereign_asset = brain.reconstruct_pedagogical_dna(raw_context, source_meta)
    
    if not sovereign_asset:
        print("❌ Error: El Hyper-Core no pudo reconstruir el ADN pedagógico.")
        return

    # 3. Mostrar Resultado
    print("\n✅ Plan Generado (Sovereign Schema):")
    print(json.dumps(sovereign_asset, indent=2, ensure_ascii=False))

    # 4. Inyección en Neon (Knowledge Kernel)
    try:
         injector = NeonInjector()
         
         # Construir Payload para Neon
         # SovereignIntelligence ya devuelve la estructura 'Required JSON Structure', 
         # pero necesitamos envolverla en el formato que espera Upsert si es diferente.
         # En neon_injector.py: upsert_kernel_knowledge(kernel_data, semantic_hash)
         # kernel_data espera: { "jsonbData", "mepMetadata", "logicRules", "classificationTags" }
         
         kernel_payload = {
            "jsonbData": sovereign_asset, # El asset completo va en jsonb_data
            "mepMetadata": {
                "source": "MEP_OFFICIAL_LEGACY_BRIDGE",
                "tema": tema,
                "priority": "HIGHEST"
            },
            "logicRules": {
                "scoring": "official_rubric_v2"
            },
            "classificationTags": {
                "keywords": ["Oficial", "MEP", "Kaizen_Upgrade"],
                "is_official": True
            }
         }
         
         # Calcular Hash
         semantic_hash = sha256(json.dumps(sovereign_asset, sort_keys=True).encode('utf-8')).hexdigest()
         
         print(f"\n💉 Inyectando en Knowledge Kernel (Hash: {semantic_hash[:8]})...")
         success = injector.upsert_kernel_knowledge(kernel_payload, semantic_hash)
         
         if success:
             print("⭐ ÉXITO: Conocimiento Soberano Guardado (Legacy Bridge Upgrade).")
             
             # Guardar respaldo local
             nombre_file = f"Plan_Soberano_{int(time.time())}.json"
             with open(nombre_file, "w", encoding="utf-8") as f:
                 json.dump(sovereign_asset, f, indent=2, ensure_ascii=False)
             print(f"📂 Copia local guardada: {nombre_file}")
             
         else:
             print("⚠️ Advertencia: Fallo en inyección DB.")
             
    except Exception as e_inj:
        print(f"❌ Error Crítico de Inyección: {e_inj}")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        tema_input = " ".join(sys.argv[1:])
    else:
        tema_input = input("\n🔹 Tema a generar (Oficial MEP): ")
    
    generar_combo_soberano(tema_input)
