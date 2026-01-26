# -*- coding: utf-8 -*-
"""
ANTIGRAVITY INTELLIGENCE: Metadata Semántica & Auditoría de Carga
Extrae keywords, calcula complejidad y predice carga administrativa
"""
import re
from typing import Dict, List, Tuple

class SemanticAnalyzer:
    """Analizador semántico para metadata de planes"""
    
    # Keywords técnicas por modalidad
    KEYWORDS_TECNICAS = {
        "Técnica": ["configurar", "instalar", "prototipar", "simular", "programar", "diseñar", "redes", "hardware", "software"],
        "Académica": ["analizar", "investigar", "argumentar", "comparar", "sintetizar", "evaluar", "hipótesis", "método"],
        "Idiomas": ["comunicar", "expresar", "conversar", "escuchar", "leer", "escribir", "vocabulario", "gramática"],
        "Taller": ["explorar", "construir", "manipular", "experimentar", "descubrir", "crear", "herramientas", "materiales"]
    }
    
    @staticmethod
    def extraer_keywords(contenido: str, tipo_asignatura: str = "Técnica") -> List[str]:
        """
        Extrae keywords técnicas del contenido generado
        """
        keywords_base = SemanticAnalyzer.KEYWORDS_TECNICAS.get(tipo_asignatura, [])
        keywords_encontradas = []
        
        contenido_lower = contenido.lower()
        for keyword in keywords_base:
            if keyword in contenido_lower:
                keywords_encontradas.append(keyword)
        
        # Agregar palabras clave del título
        titulo_match = re.search(r'PLANEAMIENTO.*?:(.*?)(?:\n|$)', contenido)
        if titulo_match:
            palabras_titulo = titulo_match.group(1).strip().split()
            keywords_encontradas.extend([p.lower() for p in palabras_titulo if len(p) > 4][:3])
        
        return list(set(keywords_encontradas))[:10]  # Max 10 keywords
    
    @staticmethod
    def calcular_complejidad(contenido: str, duracion: int) -> int:
        """
        Calcula nivel de complejidad (1-10) basado en:
        - Cantidad de retos
        - Duración
        - Densidad de conceptos técnicos
        """
        score = 1
        
        # Factor 1: Cantidad de retos
        if "Reto Oro" in contenido:
            score += 3
        if "Reto Plata" in contenido:
            score += 2
        if "Reto Bronce" in contenido:
            score += 1
        
        # Factor 2: Duración
        if duracion >= 120:
            score += 2
        elif duracion >= 80:
            score += 1
        
        # Factor 3: Conceptos técnicos
        conceptos_avanzados = ["prototipo", "innovación", "investigación", "proyecto", "simulación"]
        score += sum(1 for concepto in conceptos_avanzados if concepto in contenido.lower())
        
        return min(score, 10)  # Cap at 10
    
    @staticmethod
    def calcular_tiempo_estimado(contenido: str) -> int:
        """
        Calcula tiempo total estimado (incluye clase + GTA)
        """
        # Tiempo de clase
        duracion_match = re.search(r'Duración.*?(\d+)\s*min', contenido)
        tiempo_clase = int(duracion_match.group(1)) if duracion_match else 80
        
        # Tiempo GTA (estimado)
        if "Reto Oro" in contenido:
            tiempo_gta = 120  # 2 horas para proyecto extendido
        else:
            tiempo_gta = 40
        
        return tiempo_clase + tiempo_gta


class AdministrativeLoadAuditor:
    """Auditor de carga administrativa para el docente"""
    
    @staticmethod
    def auditar_carga(contenido: str, num_grupos: int = 1) -> Dict:
        """
        Audita la carga administrativa del planeamiento
        
        Returns:
            {
                "carga_total_min": int,
                "nivel_alerta": str,
                "actividades_criticas": list,
                "sugerencias": list
            }
        """
        carga_total = 0
        actividades_criticas = []
        sugerencias = []
        
        # Detectar actividades que requieren revisión manual
        if "quiz" in contenido.lower() or "prueba" in contenido.lower():
            preguntas_estimadas = 15
            tiempo_por_pregunta = 2  # 2 min por pregunta por estudiante
            estudiantes_por_grupo = 30
            carga_total += preguntas_estimadas * tiempo_por_pregunta * estudiantes_por_grupo * num_grupos
            actividades_criticas.append(f"Quiz/Prueba: {carga_total} min de revisión estimada")
            sugerencias.append("💡 Considera usar autoevaluación o rúbrica de pares para el quiz")
        
        # Rúbrica manual vs automatizada
        if "rúbrica" in contenido.lower():
            if "pares" in contenido.lower() or "autoevaluación" in contenido.lower():
                carga_total += 5 * num_grupos  # Solo supervisión
            else:
                carga_total += 15 * 30 * num_grupos  # 15 min por estudiante
                actividades_criticas.append(f"Rúbrica Manual: {15 * 30 * num_grupos} min")
                sugerencias.append("💡 Implementa evaluación por pares para reducir 70% de carga")
        
        # Proyectos/retos extensos
        if "Reto Oro" in contenido:
            carga_total += 20 * 30 * num_grupos  # 20 min por proyecto
            sugerencias.append("✅ Reto Oro: Usa presentaciones grupales para reducir revisiones individuales")
        
        # Determinar nivel de alerta
        if carga_total > 600:  # Más de 10 horas
            nivel_alerta = "Crítica"
        elif carga_total > 300:
            nivel_alerta = "Alta"
        elif carga_total > 120:
            nivel_alerta = "Media"
        else:
            nivel_alerta = "Baja"
        
        return {
            "carga_total_min": carga_total,
            "nivel_alerta": nivel_alerta,
            "actividades_criticas": actividades_criticas,
            "sugerencias": sugerencias
        }


class MultiSectionRanking:
    """Sistema de ranking y motivación multi-sección"""
    
    @staticmethod
    def generar_mensaje_motivacion(grupo_actual: str, posicion: int, total_grupos: int) -> str:
        """
        Genera mensaje de motivación según posición en ranking
        """
        if posicion == 1:
            return f"🏆 ¡Felicidades {grupo_actual}! Están liderando el ranking. ¡Sigan así!"
        elif posicion == total_grupos:
            return f"💪 ¡{grupo_actual}, es momento de acelerar! Otros grupos ya completaron el Reto Bronce."
        else:
            return f"📊 {grupo_actual} está en posición #{posicion}. ¡Un esfuerzo más y superan al siguiente grupo!"

if __name__ == "__main__":
    # Test
    contenido_test = """
    PLANEAMIENTO ULTRA: Redes de Computadoras
    ## Reto Bronce: Configurar IP
    ## Reto Plata: Simular LAN
    ## Reto Oro: Prototipo de red empresarial
    Duración: 80 min
    """
    
    analyzer = SemanticAnalyzer()
    print("Keywords:", analyzer.extraer_keywords(contenido_test, "Técnica"))
    print("Complejidad:", analyzer.calcular_complejidad(contenido_test, 80))
    print("Tiempo:", analyzer.calcular_tiempo_estimado(contenido_test))
    
    auditor = AdministrativeLoadAuditor()
    auditoria = auditor.auditar_carga(contenido_test, num_grupos=3)
    print("Auditoría:", auditoria)
