import json
import logging
import re

# Configuración de Logs Sovereign
logger = logging.getLogger(__name__)

class KaizenParser:
    """
    🧠 KAIZEN PARSER (THE TRANSLATOR) - KAIZEN 2000.0
    Extracts logic, applies MEP Adaptation, and filters for DUA/Inclusion.
    """

    def __init__(self):
        pass

    def extract_instructional_flow(self, text):
        """
        Extracts the 'How-To' logic: Introduction -> Development -> Close.
        """
        # Heuristic extraction based on common pedagogical markers
        flow = {
            "inicio": "",
            "desarrollo": "",
            "cierre": ""
        }
        
        # Simple regex segmentation
        if "inicio" in text.lower():
            # Logic to extract text block... simplified for now
            flow["inicio"] = "Actividad de focalización detectada."
        else:
            flow["inicio"] = "Introducción sugerida por el sistema."
            
        return flow

    def classify_visual_structure(self, html_content):
        """
        Determines if the resource is a 'Card', 'Worksheet', or 'Interactive Game'
        to replicate in Tailwind/daisyUI.
        """
        if "worksheet" in html_content or "ficha" in html_content:
            return "printable_pdf"
        if "juego" in html_content or "interactivo" in html_content:
            return "interactive_frame"
        return "standard_article"

    def adapt_to_mep(self, content_data):
        """
        Maps generic content to MEP Specifics.
        """
        mep_data = {
            "modality": "General", # Default
            "skill": "Transversal"
        }
        
        # Logic to map "Grado 3" -> "I Ciclo" etc (reusing PedagogicalAdapter logic conceptually)
        
        return mep_data

    def filter_dua(self, text):
        """
        Auto-tags for DUA/Inclusion.
        """
        tags = []
        if any(x in text.lower() for x in ["visual", "imagen", "color"]):
            tags.append("Estilo Visual")
        if any(x in text.lower() for x in ["audio", "escucha", "video"]):
            tags.append("Estilo Auditivo")
        if any(x in text.lower() for x in ["tocar", "recortar", "mover"]):
            tags.append("Kinestésico (TDAH Friendly)")
            
        return tags

    def normalize_knowledge_kernel(self, raw_item, raw_text):
        """
        Prepares the High Density JSONB for KnowledgeKernel.
        """
        flow = self.extract_instructional_flow(raw_text)
        dua_tags = self.filter_dua(raw_text)
        
        kernel_entry = {
            "jsonbData": {
                "objectives": [raw_item.get("text", "Objetivo General")],
                "flow": flow,
                "content": raw_text[:2000] # Truncated for demo
            },
            "mepMetadata": {
                "source": raw_item["source"],
                "adapted": True,
                "law": "REA-2024"
            },
            "classificationTags": {
                "bloom": "Aplicar", # Default, needs NLP for real classification
                "dua": dua_tags,
                "keywords": ["Recurso Externo", "Curaduría", "Premium"]
            },
            "logicRules": {
                "time_est": 40, # Minutes
                "points": 10
            }
        }
        return kernel_entry
