# 📘 MANUAL DE OPERACIONES: MISPLANESCR v1.0
**Infraestructura de Automatización Pedagógica (2026-2035)**  
**Responsable Técnico:** Lic. Max Salazar Sánchez

---

## 1. ARQUITECTURA DEL ECOSISTEMA
El sistema opera sobre una arquitectura **RAG (Retrieval-Augmented Generation)**. A diferencia de un chat común, MisPlanesCR tiene una "memoria de largo plazo" física alojada en el servidor.

**Componentes Clave:**
*   **El Cerebro (`storage/`):** Base de datos vectorial (ChromaDB) que contiene el ADN curricular del MEP.
*   **El Núcleo (Core):** Scripts en Python que gestionan la lógica de negocio y la comunicación con las IAs.
*   **La Red de Seguridad:** Middleware de redundancia que alterna entre OpenAI y Google Gemini según disponibilidad.

---

## 2. PROTOCOLO DE ENTRENAMIENTO (`entrena.py`)
Este proceso "alimenta" al sistema. Debe ejecutarse cada vez que el MEP publique nuevos programas de estudio.

1.  **Preparación de Datos:** Coloque los PDFs oficiales en `public/mep-docs/MEP_ORDENADO`.
2.  **Deduplicación Automática:** El sistema genera un Hash MD5 de cada archivo. Si intentas subir un programa que ya existe, el sistema lo ignorará para ahorrar espacio y evitar "alucinaciones" por datos repetidos.
3.  **Ejecución:**
    ```bash
    python entrena.py
    ```
4.  **Mantenimiento:** Si el entrenamiento se interrumpe, el sistema tiene Checkpoints. Al reiniciar, continuará desde el último PDF no procesado.

---

## 3. MOTOR DE CONSULTA Y GENERACIÓN (`experto.py` & `autoexperto.py`)
Es la interfaz donde ocurre la magia pedagógica.

### Gestión de Resiliencia (Protocolo 429)
El sistema está programado para ser **"Resiliente por Diseño"**. Si recibes un error de cuota (429):
1.  No cierres el programa.
2.  El código entrará en una **Espera Activa (30-40 segundos)**.
3.  Reintentará automáticamente hasta obtener la respuesta oficial.

### Calidad Pedagógica (RQ-201)
Todas las salidas cumplen con:
*   **Sintaxis Administrativa:** "La persona docente explica..." / "La persona estudiante realiza...".
*   **Momentos MEP:** Focalización, Exploración, Contrastación y Aplicación.
*   **DUA:** Inclusión de actividades visuales, auditivas y kinestésicas.

---

## 4. SOLUCIÓN DE PROBLEMAS (TROUBLESHOOTING)

| Error Común | Causa Probable | Solución |
| :--- | :--- | :--- |
| **401 Unauthorized** | Llave de OpenAI vencida o sin saldo. | El sistema saltará a Gemini solo. No requiere acción. |
| **429 Resource Exhausted** | Saturación de la API (Capa gratuita). | Esperar 60 segundos. El script reintentará solo. |
| **ModuleNotFoundError** | Versión de LangChain desactualizada. | Ejecutar: `pip install -U langchain-community langchain-core`. |
| **PDF Corrupto** | El archivo tiene errores de lectura. | Reemplazar el PDF en la carpeta y volver a correr `entrena.py`. |

---

## 5. ESCALABILIDAD Y FUTURO (ROADMAP)
Para llevar MisPlanesCR al siguiente nivel comercial:

1.  **Migración a Cloud:** Mover el storage a una base de datos en la nube (como Neon o Pinecone) para que miles de docentes lo usen a la vez.
2.  **Dashboard Web:** Implementar una interfaz en Next.js con Tailwind CSS para que el docente no use la consola negra (CMD), sino una web moderna.
3.  **Monetización:** Activar las API Keys de pago para eliminar los tiempos de espera y ofrecer "Velocidad Pro".

---

## 6. SEGURIDAD DE LA INFORMACIÓN
*   **Aislamiento de Datos:** El storage está protegido. Las consultas de un docente no se mezclan con las de otro.
*   **Integridad Curricular:** El sistema tiene prohibido usar datos externos a los PDFs cargados, garantizando fidelidad 100% al MEP.

---

> *Este documento certifica que MisPlanesCR cuenta con una infraestructura profesional bajo estándares de Ingeniería de Software.*
