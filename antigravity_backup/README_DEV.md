# 🛠️ MISPLANESCR 2026 - MANUAL DE DESARROLLADOR (DEV)

> **Versión:** 2.0 Enterprise | **Arquitectura:** "Swiss Clock" | **Stack:** Next.js + Python RAG + Neon

## 1. Visión Técnica
Plataforma SaaS para la generación automática de planeamientos educativos del Ministerio de Educación Pública (MEP) de Costa Rica.
El sistema opera bajo un modelo de **Seguridad de Grado Bancario ("Bóveda Digital")** para proteger la Propiedad Intelectual.

## 2. Estructura del Proyecto
```
/autoplanea-mep
├── /prisma
│   └── schema.prisma       # Fuente de Verdad (Multi-Tenancy, B2B, Billing)
├── /python_core
│   ├── cerebro_mep/        # Vector Store (ChromaDB)
│   ├── exportador_.py      # Motor de PDFs Seguro (ReportLab + Encryption)
│   ├── experto.py          # Lógica RAG (LangChain)
│   └── generar_cotizacion.py # Motor financiero
├── /src
│   ├── /app                # Next.js App Router (Rutas Protegidas)
│   ├── /components         # UI Kit (Tailwind + DaisyUI)
│   │   ├── /admin          # Dashboard Directores (B2B)
│   │   ├── /auth           # Login & Muro Legal
│   │   └── /features       # SecurePreview, Importer, Family
│   └── /core               # Lógica de Negocio
│       ├── /billing        # Pricing Engine
│       ├── /licensing      # Activación de Tokens
│       └── /security       # IDS (Intrusion Detection) & Audit
```

## 3. Protocolos de Seguridad (Mandatorios)

### A. Escudo Activo (Frontend)
- **Anti-Screenshot:** `SecureDocumentPreview.jsx` detecta pérdida de foco (blur) y teclas prohibidas (PrtSc, F12).
- **Capa Fantasma:** `div` transparente sobre el texto para bloquear selección.

### B. Bóveda Digital (Backend)
- **Watermarking:** Todo PDF `PRO` lleva marca de agua visible e invisible (huella binaria).
- **Metadata Forense:** Inyección de `UserID` y `InstitutionID` en los metadatos del archivo.
- **Encryption:** `ReportLab` aplica `StandardEncryption` (AllowPrint=True, AllowCopy=False).

## 4. Flujo de Datos (RAG)
1. **Input:** Docente solicita "Plan de Matemáticas 10mo".
2. **Retrieval:** `experto.py` busca en `cerebro_mep` (Vectores).
3. **Synthesis:** LLM genera estructura JSON.
4. **Rendering:**
   - **Demo:** Renderiza en Canvas (Frontend) con marca de agua agresiva.
   - **Pro:** `exportador_profesional.py` genera PDF firmado y rastreable.

## 5. Licenciamiento B2B
- **Master Tokens:** Las instituciones tienen un token único `CTP-2026-X`.
- **Validation:** `LicenseManager.js` valida cupos y geolocalización (IP CR).
- **Billing:** `PricingEngine.js` calcula descuentos por volumen.

---
**IMPORTANTE:** No realizar cambios en la tabla `User` sin migrar `prisma`. El campo `identityLocked` es vital para el modelo de negocio.
