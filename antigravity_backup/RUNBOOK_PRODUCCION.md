# 🏁 RUNBOOK DE PRODUCCIÓN: MISPLANESCR 2026

## 1. PRE-REQUISITOS DEL ENTORNO
*   **Node.js:** v18.17+
*   **Python:** v3.10+
*   **Base de Datos:** Postgres (Local o Neon)
*   **Variables de Entorno (.env):**
    ```env
    DATABASE_URL="postgresql://user:pass@host:5432/neondb"
    OPENAI_API_KEY="sk-..."
    GOOGLE_API_KEY="AIza..."
    AUTH_SECRET="complex_secret_here"
    ```

## 2. INSTALACIÓN DESDE CERO
1.  **Clonar Repositorio:**
    ```bash
    git clone https://github.com/misplanescr/platform.git .
    ```
2.  **Instalar Dependencias Backend (Node):**
    ```bash
    npm install
    ```
3.  **Instalar Dependencias IA (Python):**
    ```bash
    pip install -r python_core/requirements.txt
    ```
4.  **Sincronizar Base de Datos:**
    ```bash
    npx prisma generate
    npx prisma migrate deploy
    ```

## 3. INGESTA DE DATOS (EL CEREBRO)
El sistema requiere "alimentarse" de los PDFs oficiales antes de poder generar contenido.
1.  Colocar PDFs en: `public/mep-docs/MEP_ORDENADO/`
2.  Ejecutar Ingesta:
    ```bash
    cd python_core
    python entrena.py
    ```
    *Verificar logs:* "MD5 calculado", "Embeddings generados".

## 4. EJECUCIÓN DEL SERVICIO (STARTUP)
*   **Modo Desarrollo:**
    ```bash
    npm run dev
    ```
*   **Modo Producción:**
    ```bash
    npm run build
    npm start
    ```

## 5. PROTOCOLO DE MANTENIMIENTO
*   **Limpieza de Caché:** Borrar contenido de `storage/memoria_mep` si se desea re-entrenar desde cero.
*   **Backup de DB:** Usar herramienta de Neon para snapshot diario.
*   **Logs:** Revisar consola para errores "429" (Rate Limit) que indican necesidad de aumentar cuota de API.

---
**Soporte SRE:** soporte@misplanescr.com
