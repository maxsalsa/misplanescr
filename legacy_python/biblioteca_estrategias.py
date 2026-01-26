# -*- coding: utf-8 -*-
"""
BIBLIOTECA DE ESTRATEGIAS ULTRA (CATÁLOGO v5.0)
Generador de Mediación Pedagógica con 'Alma Antigravity'
"""
import random

class BibliotecaUltra:
    """
    Repositorio de Estrategias de Mediación Pedagógica de Grado Industrial.
    Garantiza: Binomio Sagrado, Inclusión Radical y Bajo Costo.
    """
    
    @staticmethod
    def generar_6_rutas(bloque, tema):
        """
        Retorna 6 estrategias adaptadas al bloque y tema.
        Incluye Overrides Contextuales para asignaturas específicas.
        """
        rutas = []
        tema_low = tema.lower()
        
        # --- OVERRIDE: PROGRAMACIÓN / LÓGICA ---
        if any(x in tema_low for x in ["programacion", "software", "algoritm", "logica"]):
            # 1. STEAM: Laberinto Lógico (Físico)
            rutas.append({
                "tipo": "STEAM / Lúdica",
                "titulo": "El Laberinto Lógico (Human Algorithm)",
                "docente": "La persona docente facilita un 'Laberinto Lógico' en el piso con cinta adhesiva y media la traducción de pasos físicos a pseudocódigo.",
                "estudiante": "La persona estudiante recorre el laberinto siguiendo instrucciones de pares (algoritmos) y documenta bugs de lógica.",
                "inclusion": "TEA: Uso de tarjetas de comandos visuales.",
                "recurso": "Cinta adhesiva, tarjetas."
            })
        else:
            # Estrategia 1 Genérica (Ingeniería Inversa)
            rutas.append({
                "tipo": "Ingeniería Inversa",
                "titulo": f"Deconstrucción de {tema}",
                "docente": "La persona docente facilita un objeto/proceso terminado y media su deconstrucción.",
                "estudiante": f"La persona estudiante desarma el componente para identificar saberes de {tema}.",
                "inclusion": "Alta Dotación: Reconstruir con -20% recursos.",
                "recurso": "E-waste / Material reciclado."
            })

        # --- ESTRATEGIA 2: SOCIAL / ROL (Crisis o Role-Play) ---
        if any(x in tema_low for x in ["sociales", "civica", "historia", "geografia"]):
            # Override 2.A: Estudios Sociales (Cumbre Climática)
            rutas.append({
                "tipo": "Social / Rol",
                "titulo": "Cumbre Climática (Role-Play)",
                "docente": "La persona docente organiza una 'Cumbre' donde cada mesa es un país con recursos limitados.",
                "estudiante": "La persona estudiante defiende una postura técnica sobre desarrollo sostenible ante la asamblea.",
                "ajuste_inclusion": "TDAH: Debates rápidos de 3 min con cambio de rol.",
                "recurso_bajo_costo": "Mapamundis reciclados."
            })
        elif any(x in tema_low for x in ["ingles", "english", "idioma", "french"]):
            # Override 2.B: Idiomas (Tech Support Center)
            rutas.append({
                "tipo": "Role-Play Técnico",
                "titulo": "Tech Support Center",
                "docente": "La persona docente asigna tickets de soporte de clientes internacionales (ficticios).",
                "estudiante": "La persona estudiante resuelve el problema vía 'teléfono' (simulado) usando vocabulario técnico.",
                "ajuste_inclusion": "Ansiedad Social: Guiones pre-escritos.",
                "recurso_bajo_costo": "Teléfonos viejos/reciclados."
            })
        else:
             # Estrategia 2 Genérica (Rol Profesional)
            rutas.append({
                "tipo": "Rol Profesional",
                "titulo": f"Crisis en {tema}",
                "docente": "La persona docente modela una situación crítica y asigna roles técnicos.",
                "estudiante": "La persona estudiante asume identidad profesional y resuelve bajo presión.",
                "ajuste_inclusion": "TEA: Tarjetas de guion.",
                "recurso_bajo_costo": "Escenarios impresos."
            })
        
        # 3. ESTRATEGIA: RALLY DE SABERES STEAM (Movimiento/TDAH) -> Ahora: 🎮 LÚDICA (Trivia Física)
        # Refinado V6: Acciones más específicas
        rutas.append({
            "tipo": "🎮 Lúdica / Trivia Física",
            "titulo": f"Trivia de Relevos de {tema}",
            "docente": "La persona docente organiza una trivia física con relevos donde cada respuesta correcta permite avanzar un paso.",
            "estudiante": f"La persona estudiante colabora con su equipo para resolver el acertijo de {tema} y ejecuta el movimiento físico.",
            "ajuste_inclusion": "TDAH: Movimiento con propósito y turnos rápidos.",
            "recurso_bajo_costo": "Espacio de aula/patio."
        })
        
        # 4. ESTRATEGIA: LABORATORIO -> Ahora: 🔬 ANÁLITICA (Diagnóstico)
        # Refinado V6: Causa Raíz
        rutas.append({
            "tipo": "📊 Analítica / Diagnóstico",
            "titulo": "Detective de Fallas Industriales",
            "docente": "La persona docente presenta un error real de la industria (un corto, un descuadre, un error de código) relacionado a {tema}.",
            "estudiante": "La persona estudiante diagnostica la causa raíz usando el método científico y propone la solución normativa.",
            "ajuste_inclusion": "Alta Dotación: Proponer protocolo preventivo a largo plazo.",
            "recurso_bajo_costo": "Casos impresos o simulados."
        })
        
        # 5. ESTRATEGIA: VISUAL -> 🤖 STEAM (Prototipo Eficiente)
        # Refinado V6: Eficiencia
        rutas.append({
            "tipo": "🤖 STEAM / Eficiencia",
            "titulo": f"Reto de Eficiencia en {tema}",
            "docente": "La persona docente facilita materiales reciclados y media la pregunta: '¿Cómo harías que {tema} sea más eficiente?'.",
            "estudiante": "La persona estudiante diseña un prototipo funcional, prueba su resistencia y documenta las mejoras en su bitácora.",
            "ajuste_inclusion": "TEA: Rúbrica visual de eficiencia.",
            "recurso_bajo_costo": "Materiales de reciclaje (Cartón, plástico)."
        })
        
        # 6. ESTRATEGIA: MAKER (Se mantiene o varía) -> Complemento Visual
        rutas.append({
            "tipo": "Visual / Jerarquía",
            "titulo": f"Mapa de Conexiones de {tema}",
            "docente": "La persona docente facilita la creación de una red semántica gigante en la pizarra.",
            "estudiante": "La persona estudiante conecta los conceptos clave de {tema} visualizando dependencias.",
            "ajuste_inclusion": "Discapacidad Auditiva: Apoyo 100% visual.",
            "recurso_bajo_costo": "Tiza, marcadores."
        })
        
        return rutas

    @staticmethod
    def generar_evidencias(tema):
        return {
            "conocimiento": f"Trivia Digital sobre conceptos de {tema}.",
            "desempeño": f"Ejecución de protocolo de {tema} en tiempo real.",
            "producto": f"Bitácora de evidencias con fotografías del proceso de {tema}."
        }
