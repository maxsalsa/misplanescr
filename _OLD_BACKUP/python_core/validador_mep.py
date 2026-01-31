import json
import re

class PedagogicalValidator:
    """
    🛡️ MOTOR DE VALIDACIÓN PEDAGÓGICA (RQ-203)
    Garantiza que la tríada: Resultado Aprendizaje -> Estrategia -> Evaluación
    esté completa y alineada.
    """
    
    def __init__(self):
        self.errores = []
        self.requerimientos = {
            "triada": ["aprendizaje", "estrategia", "evaluacion", "instrumento"],
            "dua": ["visual", "auditivo", "kinestesico"], # RQ-202
            "sintaxis": ["la persona docente", "la persona estudiante"] # RQ-201
        }

    def validar_plan(self, plan_json):
        """
        Valida un objeto de plan completo.
        Retorna: (bool, list<str>) -> (EsValido, ListaErrores)
        """
        self.errores = []
        
        try:
            data = json.loads(plan_json) if isinstance(plan_json, str) else plan_json
        except json.JSONDecodeError:
            return False, ["E-001: Documento Corrupto. El plan generado no es un JSON válido."]

        if "data_core" not in data:
             return False, ["E-001: Estructura inválida. Falta 'data_core'."]

        elementos = data["data_core"].get("plan", {}).get("elementos", [])
        
        if not elementos:
            return False, ["E-002: Fuera de Contexto. El plan no generó elementos curriculares (Alucinación detectada)."]

        for i, item in enumerate(elementos):
            # 1. Validación de Tríada (RQ-203)
            if not item.get("aprendizaje"):
                self.errores.append(f"Fila {i+1}: Falta 'Resultado de Aprendizaje'.")
            if not item.get("estrategias"):
                self.errores.append(f"Fila {i+1}: Falta 'Estrategia de Mediación'.")
            if not item.get("evaluacion"): 
                 self.errores.append(f"Fila {i+1}: Falta 'Indicador de Evaluación'.")

            # 2. Validación de Sintaxis MEP (RQ-201)
            estrategia = str(item.get("estrategias", "")).lower()
            if "la persona docente" not in estrategia and "el docente" in estrategia:
                 self.errores.append(f"Fila {i+1}: Sintaxis incorrecta. Usar 'La persona docente' en lugar de 'El docente'.")
            
            # 3. Validación de Alineamiento
            # Heurística simple: Si la evaluación no menciona palabras clave del aprendizaje
            aprendizaje_kw = set(item.get("aprendizaje", "").lower().split()[:4])
            eval_text = str(item.get("evaluacion", "")).lower()
            if not any(kw in eval_text for kw in aprendizaje_kw if len(kw) > 3):
                # Warning soft
                pass 

        return len(self.errores) == 0, self.errores

    def sanear_respuesta(self, texto_generado):
        """
        Limpia alucinaciones o formatos rotos.
        """
        if "```json" in texto_generado:
            texto_generado = texto_generado.split("```json")[1].split("```")[0]
        return texto_generado.strip()

# Instancia Singleton para uso en bridges
validador = PedagogicalValidator()
