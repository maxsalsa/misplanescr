# 🚀 RUNBOOK DE OPERACIONES - MISPLANESCR 2026

## 1. Requisitos Previos (Environment)
Asegurar que `.env` contenga las llaves maestras:
```env
DATABASE_URL="postgresql://user:pass@neon.tech/main?sslmode=require"
OPENAI_API_KEY="sk-..."
MEP_MASTER_KEY="clavesecreta_para_tokens"
JWT_SECRET="seguridad_bancaria_mep"
```

## 2. Despliegue Inicial
### Paso 1: Base de Datos
```bash
npx prisma generate
npx prisma migrate deploy
node prisma/seed.js  # IMPORTANTE: Carga la data inicial (CTPs, Admin)
```

### Paso 2: Core RAG
```bash
cd python_core
pip install -r requirements.txt
# Verificar integridad de índices
python validador_mep.py
```

### Paso 3: Frontend (Next.js)
```bash
npm install
npm run build
npm start
```

## 3. Mantenimiento Diario
- **Monitoreo de Seguridad:** Revisar `logs/security_audit.log` buscando "GEO_BLOCK_ATTEMPT" o "SCREENSHOT_ALERT".
- **Backups:** Neon realiza backups automáticos a las 00:00 UTC.
- **Renovación de Tokens:** Si una institución reporta "Token Comprometido", rotar el `masterToken` en la tabla `Institution` inmediatamente.

## 4. Protocolo de Respuesta a Incidentes (P1)
**Evento:** Filtración de Documento en Redes Sociales.
1. Obtener el PDF filtrado.
2. Escanear el QR de la esquina inferior derecha o revisar Metadatos.
3. Identificar `UserID` y `InstitutionID`.
4. Ejecutar comando de bloqueo:
   ```sql
   UPDATE users SET is_active = false, ban_reason = 'LEGAL_DMCA' WHERE id = 'UserID_Detectado';
   ```
5. Notificar al área legal para cobro de multa contractual.
