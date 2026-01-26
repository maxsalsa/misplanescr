# -*- coding: utf-8 -*-
"""
ANTIGRAVITY FRONTEND ARCHITECT
Generador de Definición de Arquitectura Técnica y Dependencias (Next.js 15+)
"""
import json
import os
from datetime import datetime

class AntigravityFrontendArchitect:
    def __init__(self):
        self.app_name = "antigravity-core-platform"
        self.version = "15.0.0"
        self.author = "Max Salazar Sánchez"

    def generar_package_json(self):
        """
        Define el stack tecnológico 'State of the Art' 2026.
        """
        print(f"🏗️ Esculpiendo Arquitectura Frontend para: {self.app_name}...")
        
        package_json = {
            "name": self.app_name,
            "version": self.version,
            "private": True,
            "scripts": {
                "dev": "next dev --turbo",
                "build": "next build",
                "start": "next start",
                "lint": "next lint",
                "security-check": "node scripts/validate-integrity.js"
            },
            "dependencies": {
                # Core Framework
                "next": "^15.1.0",
                "react": "^19.0.0",
                "react-dom": "^19.0.0",
                
                # UI & Styling (Shadcn/Tailwind)
                "tailwindcss": "^3.4.0",
                "postcss": "^8.4.0",
                "autoprefixer": "^10.4.0",
                "lucide-react": "^0.300.0",
                "clsx": "^2.1.0",
                "tailwind-merge": "^2.2.0",
                "class-variance-authority": "^0.7.0",
                
                # State & Data (Async O(1))
                "@tanstack/react-query": "^5.17.0",
                
                # Security & Crypto (Core Blindado)
                "jose": "^5.2.0",
                "crypto-js": "^4.2.0",
                
                # Documents & Signatures
                "@react-pdf/renderer": "^3.1.0",
                "react-signature-canvas": "^1.0.6",
                
                # Forms & Validation
                "zod": "^3.22.0",
                "react-hook-form": "^7.49.0"
            },
            "devDependencies": {
                "typescript": "^5.3.0",
                "@types/node": "^20.10.0",
                "@types/react": "^18.2.0",
                "@types/crypto-js": "^4.2.0",
                "eslint": "^8.0.0",
                "eslint-config-next": "14.0.0"
            },
            "antigravity_meta": {
                "architecture_type": "Hybrid (SSR + Client)",
                "security_level": "Military Grade (HMAC)",
                "performance_target": "Lighthouse 100/100"
            }
        }
        
        return package_json

    def generar_documento_arquitectura(self):
        """
        Genera el Blueprint Técnico detallado.
        """
        markdown = f"""# 🏛️ ANTIGRAVITY TECHNICAL ARCHITECTURE (V15.0)

**Autor:** {self.author}
**Fecha:** {datetime.now().strftime('%Y-%m-%d')}
**Stack:** Next.js 15+ / Neon DB / Python Core

---

## 🚀 1. STACK TECNOLÓGICO SELECCIONADO

| Capa | Tecnología | Justificación Técnica |
| :--- | :--- | :--- |
| **Frontend** | **Next.js 15+ (App Router)** | SSR para velocidad inicial y SEO. Server Actions para mutaciones seguras. |
| **Estilos** | **Tailwind + Shadcn/UI** | Sistema de diseño atómico, accesible y dark-mode ready. |
| **Estado** | **TanStack Query** | Manejo de caché, revalidación automática y optimismo UI. |
| **Seguridad** | **Jose / Crypto-js** | Implementación de HMAC-SHA256 en el cliente y servidor. |
| **Documentos** | **React-PDF** | Generación de Actas Oficiales vectoriales en el navegador. |

---

## ⚡ 2. ESTRUCTURA DE RUTAS (O(1) ACCESS)

La arquitectura de rutas está diseñada para acceso semántico y protegido:

### 🔒 Zona Privada (Auth Required)
*   `/dashboard`: Vista principal (KPIs UPRE, Resumen).
*   `/grupos/[id]/asistencia`: Grid de asistencia rápida (Mobile First).
*   `/grupos/[id]/notas`: Matriz de evaluación (Desktop First).
*   `/protocolos/ejecutar/[tipo]`: Wizard paso a paso para emergencias (Armas/Bullying).

### 🌐 Zona Pública (Verificación)
*   `/verify/[hash]`: Endpoint para validación de QRs impresos.

---

## 📱 3. ESTRATEGIA HÍBRIDA (UX/UI)

### **Desktop Power (PC)**
*   **Grid Denso**: Tablas de datos complejas (Indicadores 1-3) visibles en una sola pantalla.
*   **Multitasking**: Paneles laterales colapsables para consultar planes mientras se califica.

### **Mobile Control (Celular)**
*   **Touch Targets**: Botones de 44px+ para pasar lista con el dedo.
*   **Panic Button**: Acceso directo al FAB (Floating Action Button) para Protocolos de Riesgo.
*   **Scanner**: Integración con cámara para leer QRs de estudiantes/documentos.

---

## 🛡️ 4. ESTRATEGIA DE CIBERSEGURIDAD

1.  **SSL/TLS 1.3**: Comunicación encriptada obligatoria con Neon DB.
2.  **HMAC Signing**:
    *   *Request*: El cliente firma el payload con una llave efímera.
    *   *Response*: El servidor verifica la firma antes de procesar (Zero Trust).
3.  **Audit Logs**: Cada acción crítica (Cambio de Nota, Protocolo) genera un log inmutable.

---

**CONCLUSIÓN:**
Esta arquitectura garantiza que Antigravity sea **Rápida** (Next.js), **Bonita** (Tailwind) y **Segura** (Crypto). Es una fortaleza digital moderna.
"""
        return markdown

    def exportar_artefactos(self, pkg_json, md_content):
        # 1. package.json
        with open("package.json", "w", encoding='utf-8') as f:
            json.dump(pkg_json, f, indent=2)
            
        # 2. ANTIGRAVITY_ARCHITECTURE.md
        with open("ANTIGRAVITY_ARCHITECTURE.md", "w", encoding='utf-8') as f:
            f.write(md_content)
            
        print(f"✅ Artefactos de Arquitectura Generados: package.json, ANTIGRAVITY_ARCHITECTURE.md")

if __name__ == "__main__":
    architect = AntigravityFrontendArchitect()
    pkg = architect.generar_package_json()
    doc = architect.generar_documento_arquitectura()
    architect.exportar_artefactos(pkg, doc)
