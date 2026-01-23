# -*- coding: utf-8 -*-
"""
BIBLIOTECA INDUSTRIAL (KAIZEN v6.0)
Repositorio de Estrategias Temáticas Específicas
"""

class BibliotecaIndustrial:
    
    @staticmethod
    def get_rutas_ultra(asignatura, tema):
        rutas = []
        asig_low = asignatura.lower()
        tema_low = tema.lower()

        # --- CIENCIAS / FÍSICA ---
        if "fisica" in asig_low or "ciencias" in asig_low:
            rutas.append({
                "tipo": "🔬 Científica / Binomio Sagrado",
                "docente": "Facilita la construcción de una 'Montaña Rusa de Cartón' y media el análisis del punto más alto.",
                "estudiante": "Diseña el recorrido, mide alturas y velocidades, y calcula la pérdida de energía por fricción.",
                "ajuste_inclusion": "TDAH: Experimentos de corta duración con registro de datos en tiempo real.",
                "recurso_bajo_costo": "Cartón, canicas."
            })
            rutas.append({
                "tipo": "🎮 Lúdica / Simulador Humano",
                "docente": "Organiza una rampa real para deslizar objetos y media las apuestas sobre distancia vs masa.",
                "estudiante": "Realiza predicciones basadas en intuición física y luego valida midiendo distancias.",
                "ajuste_inclusion": "Discalculia: Uso de cintas métricas con código de color.",
                "recurso_bajo_costo": "Rampa de madera/pupitre, objetos varios."
            })
            rutas.append({
                "tipo": "🤖 STEAM / Maker",
                "docente": "Media la construcción de un 'Coche de Impulso por Liga'.",
                "estudiante": "Construye el vehículo usando botellas y CDs, optimizando la tensión de la liga.",
                "ajuste_inclusion": "Motora Fina: Uso de piezas grandes.",
                "recurso_bajo_costo": "Botellas plásticas, CDs viejos, ligas."
            })

        # --- TURISMO / SERVICIO AL CLIENTE ---
        elif "turismo" in asig_low or "cliente" in asig_low:
            rutas.append({
                "tipo": "🎭 Lúdica / Teatro de Sombras",
                "docente": "Organiza un 'Teatro de Sombras' o Role-playing donde actúa como un cliente extremadamente difícil.",
                "estudiante": "Aplica el protocolo de 'Escucha Activa' y propone una solución compensatoria en tiempo récord.",
                "ajuste_inclusion": "TEA: Entrega de 'Guion de Contingencia' con frases pre-aprobadas.",
                "recurso_bajo_costo": "Siluetas de cartón, linterna."
            })
            rutas.append({
                "tipo": "📊 Analítica / Crisis",
                "docente": "Presenta un caso de crisis de reputación en redes sociales (ficticio).",
                "estudiante": "Redacta la respuesta oficial de la empresa cuidando la imagen corporativa.",
                "ajuste_inclusion": "Alta Dotación: Gestionar la crisis en simultáneo con queja física.",
                "recurso_bajo_costo": "Pizarra, marcadores."
            })
            rutas.append({
                "tipo": "🤝 Social / In situ",
                "docente": "Coordina una micro-práctica de recepción usando el aula como lobby.",
                "estudiante": "Gestiona el check-in de 'huespedes' (compañeros) verificando reservas.",
                "ajuste_inclusion": "Ansiedad: Roles de back-office (registro) permitidos.",
                "recurso_bajo_costo": "Formularios impresos."
            })
            
        # --- SOFTWARE / PROGRAMACIÓN ---
        elif "software" in asig_low or "programacion" in asig_low:
            rutas.append({
                "tipo": "🎮 Lúdica / Logic Run",
                "docente": "Facilita una carrera de relevos donde cada paso depende de resolver una condición lógica (IF/ELSE).",
                "estudiante": "Ejecuta el algoritmo físico corriendo hacia la meta si la condición es verdadera.",
                "ajuste_inclusion": "TDAH: Actividad física intensa integrada al aprendizaje.",
                "recurso_bajo_costo": "Patio/Aula."
            })
            rutas.append({
                 "tipo": "🤖 STEAM / Debugging",
                 "docente": "Entrega un código impreso con errores intencionales (bugs) recortados.",
                 "estudiante": "Encuentra y reemplaza los recortes erróneos con la sintaxis correcta.",
                 "ajuste_inclusion": "Visual: Código con resaltado de sintaxis (colores).",
                 "recurso_bajo_costo": "Papel, tijeras, pegamento."
            })
            rutas.append({
                 "tipo": "🔬 Científica / Algoritmos",
                 "docente": "Demuestra la eficiencia de algoritmos de ordenamiento con barajas de cartas.",
                 "estudiante": "Ordena cartas físicamente siguiendo pasos de Bubble Sort vs Quick Sort.",
                 "ajuste_inclusion": "Dislexia: Cartas con símbolos claros además de números.",
                 "recurso_bajo_costo": "Barajas de naipes."
            })
            
        # --- MATEMÁTICAS / GEOMETRÍA ---
        elif "matemati" in asig_low or "geometria" in asig_low:
             rutas.append({
                "tipo": "🔭 Científica / GPS Humano",
                "docente": "Facilita el reto 'Localización Satelital' usando compases y planos cartesianos físicos.",
                "estudiante": "Construye el radio de cobertura de una antena y calcula si un 'usuario' recibe señal.",
                "ajuste_inclusion": "TEA: Guía paso a paso para el uso del compás.",
                "recurso_bajo_costo": "Tiza, cuerda (compás gigante)."
            })
             rutas.append({
                "tipo": "🎮 Lúdica / Dianas de Precisión",
                "docente": "Organiza lanzamientos a un plano en el piso con dianas circulares.",
                "estudiante": "Calcula la ecuación de la circunferencia objetivo y verifica sus aciertos.",
                "ajuste_inclusion": "Motora Gruesa: Lanzamiento adaptado.",
                "recurso_bajo_costo": "Tiza en el piso, objetos pequeños."
            })
             rutas.append({
                "tipo": "🤖 STEAM / Vectores Físicos",
                "docente": "Media traslación de circunferencias usando cuerpos como vectores.",
                "estudiante": "Se mueve en el plano cartesiano gigante representando el centro (h,k).",
                "ajuste_inclusion": "Alta Dotación: Reto de traslación con vectores.",
                "recurso_bajo_costo": "Patio."
            })

        # --- SECRETARIADO / OFIMÁTICA ---
        elif "secretariado" in asig_low or "ofimatica" in asig_low or "macros" in tema_low:
             rutas.append({
                "tipo": "💻 Analítica / Automatización",
                "docente": "Modela una tarea tediosa (copiar 100 nombres) y demuestra la solución con un clic.",
                "estudiante": "Diseña una macro que genere una factura automática al ingresar códigos.",
                "ajuste_inclusion": "TDAH: Retos de 'Velocidad de Script' (cronometrados).",
                "recurso_bajo_costo": "LibreOffice Calc (Open Source)."
            })
             rutas.append({
                "tipo": "🤝 Social / Consultoría",
                "docente": "Plantea un problema real de una PYME que pierde tiempo en facturación.",
                "estudiante": "Actúa como consultor y entrega la solución automatizada.",
                "ajuste_inclusion": "Ansiedad Social: Entrega digital sin exposición oral obligatoria.",
                "recurso_bajo_costo": "Laboratorio de cómputo."
            })
             rutas.append({
                "tipo": "🎮 Lúdica / El Algoritmo Humano",
                "docente": "Asigna roles de 'Grabadora de Macro' a un grupo que debe imitar acciones exactas.",
                "estudiante": "Escribe el 'script' en papel para que sus compañeros lo ejecuten en bucle.",
                "ajuste_inclusion": "Visual: Diagrama de flujo del proceso.",
                "recurso_bajo_costo": "Papel y lápiz."
            })

        # --- ESTUDIOS SOCIALES / GLOBALIZACIÓN ---
        elif "sociales" in asig_low or "globalizacion" in tema_low:
             rutas.append({
                "tipo": "🎮 Lúdica / Mercado Global",
                "docente": "Transforma el aula en continentes con recursos desiguales y negocia tratados comerciales.",
                "estudiante": "Negocia intercambios bajo reglas cambiantes (aranceles, pandemias) para sobrevivir.",
                "ajuste_inclusion": "TDAH: Estaciones de debate 'Flash' para cambiar de perspectiva.",
                "recurso_bajo_costo": "Pupitres organizados por zonas."
            })
             rutas.append({
                "tipo": "🔬 Científica / La Etiqueta",
                "docente": "Facilita el rastreo de origen de la ropa de los estudiantes (Hecho en...).",
                "estudiante": "Investiga la ruta de producción y debate sobre condiciones laborales.",
                "ajuste_inclusion": "Visual: Mapeo con hilos en un mapamundi.",
                "recurso_bajo_costo": "Ropa propia, mapamundi, hilos."
            })
             rutas.append({
                "tipo": "🤖 STEAM / Mapa de Conectividad",
                "docente": "Media la creación física de las rutas de internet y fibra óptica submarina.",
                "estudiante": "Construye un modelo de red global usando lana para visualizar la brecha digital.",
                "ajuste_inclusion": "TEA: Construcción estructurada de redes.",
                "recurso_bajo_costo": "Lana, cartón."
            })

        # --- CÍVICA / DEMOCRACIA ---
        elif "civica" in asig_low or "politica" in tema_low or "democracia" in tema_low:
             rutas.append({
                "tipo": "🤝 Social / Asamblea Legislativa",
                "docente": "Media una simulación donde se presentan proyectos de ley bajo diferentes regímenes.",
                "estudiante": "Redacta y defiende una 'Constitución de Aula' garantizando derechos.",
                "ajuste_inclusion": "Alta Dotación: Análisis comparativo de constituciones reales.",
                "recurso_bajo_costo": "Papelógrados, vestuario improvisado."
            })
             rutas.append({
                "tipo": "📊 Analítica / Regímenes",
                "docente": "Presenta casos de estudio de noticias actuales sobre democracias y dictaduras.",
                "estudiante": "Clasifica las noticias según el respeto a las libertades individuales.",
                "ajuste_inclusion": "Bajo Costo: Uso de noticias de periódicos locales.",
                "recurso_bajo_costo": "Periódicos reciclados."
            })
             rutas.append({
                "tipo": "🎮 Lúdica / El Poder",
                "docente": "Asigna roles de poder desigual (Rey vs Ciudadano) para vivenciar la injusticia.",
                "estudiante": "Propone mecanismos democráticos para equilibrar el poder en el juego.",
                "ajuste_inclusion": "Ansiedad Social: Roles de observador electoral (auditor).",
                "recurso_bajo_costo": "Tarjetas de roles."
            })

        # --- IDIOMAS / INGLÉS TÉCNICO ---
        elif "ingles" in asig_low or "english" in tema_low or "troubleshooting" in tema_low:
             rutas.append({
                "tipo": "🎭 Simulación / Broken Office",
                "docente": "Transforma el aula en una 'Oficina Rota' y actúa como un cliente desesperado.",
                "estudiante": "Diagnostica el fallo y guía al cliente por teléfono (simulado) en inglés.",
                "ajuste_inclusion": "TEA: Script Cards (Guiones) con frases de emergencia.",
                "recurso_bajo_costo": "Teléfonos viejos, utilería de oficina."
            })
             rutas.append({
                "tipo": "🎮 Lúdica / Tech-Taboo",
                "docente": "Facilita un juego donde deben describir componentes o inventos sin usar palabras prohibidas.",
                "estudiante": "Adivina el concepto técnico basándose en la descripción fluida de su compañero.",
                "ajuste_inclusion": "Visual: Imágenes del componente como apoyo (Visual Scaffolding).",
                "recurso_bajo_costo": "Tarjetas de papel."
            })
             rutas.append({
                "tipo": "🤖 STEAM / Future Gallery",
                "docente": "Facilita una galería de imágenes de 'Tecnología del Futuro' y media un debate Socrático.",
                "estudiante": "Propone una solución tecnológica a un problema comunal y defiende su idea en un foro.",
                "ajuste_inclusion": "Alta Dotación: Diseño de prototipo conceptual.",
                "recurso_bajo_costo": "Imágenes impresas o proyectadas."
            })
             rutas.append({
                "tipo": "🤖 STEAM / Quick Guide",
                "docente": "Provee manuales viejos y retos de traducción técnica inversa.",
                "estudiante": "Traduce el manual complejo a una 'Guía Rápida' visual para usuarios finales.",
                "ajuste_inclusion": "Alta Dotación: Traducir errores de código Python a lenguaje natural.",
                "recurso_bajo_costo": "Manuales viejos, Canva (Laboratorio) o cartulinas."
            })

        # --- IDIOMAS / FRANCÉS TÉCNICO ---
        elif "frances" in asig_low or "french" in tema_low or "entreprise" in tema_low:
             rutas.append({
                "tipo": "💼 Simulación / Entreprise Virtuelle",
                "docente": "Media la creación de una 'Empresa Virtual' en el aula asignando roles.",
                "estudiante": "Diseña el organigrama y defiende su puesto/funciones en francés.",
                "ajuste_inclusion": "TDAH: Roles activos de logística o mensajería interna.",
                "recurso_bajo_costo": "Material de oficina reciclado."
            })
             rutas.append({
                "tipo": "🎤 Social / Pitch Francophone",
                "docente": "Organiza una ronda de inversión donde deben presentar su empresa.",
                "estudiante": "Realiza un 'Elevator Pitch' de 1 minuto sobre los servicios de su empresa.",
                "ajuste_inclusion": "Ansiedad: Grabación de video previa (falso directo).",
                "recurso_bajo_costo": "Cronómetro."
            })
             rutas.append({
                "tipo": "🎮 Lúdica / Le Juste Prix",
                "docente": "Organiza un juego de precios sobre productos de oficina en euros.",
                "estudiante": "Practica números y negociación regateando precios en francés.",
                "ajuste_inclusion": "Discalculia: Uso de dinero ficticio visual.",
                "recurso_bajo_costo": "Catálogos viejos."
            })

        # --- AGROPECUARIA / PRODUCCIÓN ---
        elif "agro" in asig_low or "animal" in tema_low or "vegetal" in tema_low or "riego" in tema_low:
             rutas.append({
                "tipo": "🌱 Científica / Living Lab",
                "docente": "Transforma una zona verde en un 'Laboratorio Vivo' de variables controladas.",
                "estudiante": "Monitorea crecimiento midiendo PH y humedad del suelo con herramientas caseras.",
                "ajuste_inclusion": "Motora Gruesa: Actividades de siembra adaptadas.",
                "recurso_bajo_costo": "Botellas PET (huerta vertical)."
            })
             rutas.append({
                "tipo": "🤖 STEAM / Riego Automático",
                "docente": "Media el diseño de un sistema de riego por goteo usando gravedad.",
                "estudiante": "Calcula el caudal necesario y construye el sistema con mangueras recicladas.",
                "ajuste_inclusion": "Alta Dotación: Calcular eficiencia hídrica del sistema.",
                "recurso_bajo_costo": "Mangueras viejas, botellas."
            })
             rutas.append({
                "tipo": "🎮 Lúdica / La Granja",
                "docente": "Simula un ciclo productivo donde deben tomar decisiones ante plagas o sequías.",
                "estudiante": "Gestiona recursos limitados para salvar su cosecha virtual o física.",
                "ajuste_inclusion": "TDAH: Roles de 'Explorador de Plagas' (movimiento).",
                "recurso_bajo_costo": "Tarjetas de eventos."
            })

        # --- TALLERES EXPLORATORIOS / VOCACIONAL ---
        elif "taller" in asig_low or "explora" in asig_low or "vocacional" in tema_low:
             rutas.append({
                "tipo": "🛠️ Maker / Prototipado Rápido",
                "docente": "Lanza un reto de diseño: 'Soluciona un problema de tu comunidad en 30 min'.",
                "estudiante": "Construye un prototipo sucio (low-fi) usando cartón y cinta.",
                "ajuste_inclusion": "TEA: Trabajo individual con guías visuales claras.",
                "recurso_bajo_costo": "Cartón, cinta adhesiva."
            })
             rutas.append({
                "tipo": "🎮 Gamificación / Skill Tree",
                "docente": "Presenta el taller como un árbol de habilidades de videojuego a desbloquear.",
                "estudiante": "Completa misiones prácticas para ganar 'insignias' de destreza.",
                "ajuste_inclusion": "TDAH: Recompensas inmediatas por micro-logros.",
                "recurso_bajo_costo": "Insignias de papel."
            })
             rutas.append({
                "tipo": "🤝 Social / La Feria",
                "docente": "Organiza una mini-feria vocacional donde exponen lo aprendido.",
                "estudiante": "Vende su 'producto' o habilidad a visitantes (otros estudiantes).",
                "ajuste_inclusion": "Ansiedad: Rol de montajista o diseñador de stand.",
                "recurso_bajo_costo": "Stands con pupitres."
            })

        # --- FILOSOFÍA / PENSAMIENTO CRÍTICO ---
        elif "filosofia" in asig_low or "pensamiento" in tema_low:
             rutas.append({
                "tipo": "🤔 Analítica / El Juicio",
                "docente": "Transforma el aula en un tribunal para juzgar un dilema ético moderno (IA, Bioética).",
                "estudiante": "Argumenta a favor o en contra usando lógica formal y falacias.",
                "ajuste_inclusion": "Alta Dotación: Liderar el equipo de fiscalía.",
                "recurso_bajo_costo": "Mazo de juez (madera)."
            })
             rutas.append({
                "tipo": "🎮 Lúdica / Matrix",
                "docente": "Plantea la alegoría de la caverna usando sombras reales.",
                "estudiante": "Debate sobre qué es real y qué es apariencia en su vida digital.",
                "ajuste_inclusion": "Visual: Representación gráfica de la alegoría.",
                "recurso_bajo_costo": "Linterna, sábanas."
            })
             rutas.append({
                "tipo": "🤝 Social / Café Filosófico",
                "docente": "Organiza un espacio circular tipo café para dialogar sin jerarquías.",
                "estudiante": "Practica la escucha activa y la construcción colectiva de ideas.",
                "ajuste_inclusion": "TDAH: Permitir dibujar ideas mientras se escucha (Sketchnoting).",
                "recurso_bajo_costo": "Aula reordenada."
            })

        # --- INDUSTRIAL / ELECTROMECÁNICA / AUTOMOTRIZ ---
        elif "mecanica" in asig_low or "industrial" in asig_low or "electro" in asig_low or "mantenimiento" in asig_low:
             rutas.append({
                "tipo": "🔬 Científica / Protocolo LOTO",
                "docente": "Simula una falla en maquinaria energizada y evalúa el procedimiento de bloqueo y etiquetado (Lock Out/Tag Out).",
                "estudiante": "Ejecuta el protocolo de seguridad paso a paso para 'salvar' su vida y la del equipo.",
                "ajuste_inclusion": "TDAH: Uso de candados y etiquetas físicas de colores brillantes.",
                "recurso_bajo_costo": "Candados viejos, cartón."
            })
             rutas.append({
                "tipo": "🤖 STEAM / Ingeniería Inversa",
                "docente": "Entrega un componente dañado (motor, alternador) y guía el despiece técnico.",
                "estudiante": "Desarma el componente, mide el desgaste con instrumentos de precisión y diagnóstica la falla.",
                "ajuste_inclusion": "Motora Fina: Uso de herramientas con mangos adaptados.",
                "recurso_bajo_costo": "E-waste, motores viejos."
            })
             rutas.append({
                "tipo": "🎮 Lúdica / Pit Stop",
                "docente": "Organiza una competencia de velocidad y precisión en el cambio de una pieza o herramienta.",
                "estudiante": "Optimiza sus movimientos para reducir tiempos sin sacrificar seguridad (Lean Manufacturing).",
                "ajuste_inclusion": "Ansiedad: Rol de 'Jefe de Pits' (cronometrista) si prefiere no competir.",
                "recurso_bajo_costo": "Herramientas de taller."
            })

        # --- FILOSOFÍA / ÉTICA (Versión Final) ---
        elif "filosofia" in asig_low or "etica" in tema_low:
             rutas.append({
                "tipo": "🎮 Lúdica / El Tren del Dilema",
                "docente": "Facilita el juego 'Trolley Problem' con roles físicos en el aula.",
                "estudiante": "Toma decisiones críticas y argumenta su posición ética ante el grupo.",
                "ajuste_inclusion": "TDAH: Micro-debates rápidos de 2 minutos por ronda.",
                "recurso_bajo_costo": "Marcas en el piso."
            })
             rutas.append({
                "tipo": "🤖 STEAM / Ética de IA",
                "docente": "Media un análisis sobre los sesgos en algoritmos de redes sociales.",
                "estudiante": "Diseña un 'Código de Ética para IA' usando un diagrama de flujo.",
                "ajuste_inclusion": "Alta Dotación: Análisis de sesgos en modelos de lenguaje reales.",
                "recurso_bajo_costo": "Pizarra, papelógrafo."
            })
             rutas.append({
                "tipo": "🤔 Analítica / Juicio Histórico",
                "docente": "Presenta un caso histórico Controversial y asigna roles de defensa/fiscalía.",
                "estudiante": "Construye argumentos legales/éticos basados en evidencia histórica.",
                "ajuste_inclusion": "Dislexia: Uso de evidencia en video/audio.",
                "recurso_bajo_costo": "Disfraces improvisados."
            })

        # --- ARTES / EXPRESIÓN ---
        elif "artes" in asig_low or "musica" in asig_low or "plastica" in asig_low:
             rutas.append({
                "tipo": "🎨 Maker / Color Lab",
                "docente": "Facilita la creación de pigmentos naturales (cúrcuma, café).",
                "estudiante": "Experimenta con mezclas y crea una obra de 'Arte Sostenible'.",
                "ajuste_inclusion": "Sensorial: Uso de texturas táctiles y olores.",
                "recurso_bajo_costo": "Especias, pegamento, cartón."
            })
             rutas.append({
                "tipo": "🎵 Lúdica / Banda Sonora",
                "docente": "Proyecta una escena muda de una película y pide ambientarla.",
                "estudiante": "Crea efectos de sonido (Foley) con objetos del aula en tiempo real.",
                "ajuste_inclusion": "Motora Fina: Instrumentos de percusión simples.",
                "recurso_bajo_costo": "Objetos varios del aula."
            })

        # --- EDUCACIÓN FÍSICA / BIENESTAR ---
        elif "fisica" in asig_low and "educacion" in asig_low or "deporte" in tema_low:
             rutas.append({
                "tipo": "🏃‍♂️ Lúdica / Gymkana Inclusiva",
                "docente": "Diseña un circuito de habilidades motrices con niveles de dificultad.",
                "estudiante": "Completa el circuito adaptando su estrategia a sus capacidades.",
                "ajuste_inclusion": "Movilidad Reducida: Estaciones de precisión manual (lanzamiento).",
                "recurso_bajo_costo": "Conos, cuerdas, balones."
            })
             rutas.append({
                "tipo": "🔬 Científica / Fisiología en Vivo",
                "docente": "Dirige una sesión de actividad intensa seguida de medición de frecuencia cardíaca.",
                "estudiante": "Grafica la recuperación de su pulso vs tiempo.",
                "ajuste_inclusion": "Discalculia: Uso de pulsímetros digitales o apps.",
                "recurso_bajo_costo": "Cronómetro, apps celulares."
            })

        # Generar relleno genérico si faltan para llegar a 6
        while len(rutas) < 6:
             rutas.append({
                "tipo": "🔄 Genérica / Refuerzo",
                "docente": "Media una sesión de repaso activo.",
                "estudiante": "Elabora un resumen visual del tema.",
                "ajuste_inclusion": "General.",
                "recurso_bajo_costo": "Pizarra."
            })
            
        return rutas
