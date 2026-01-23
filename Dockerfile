# -----------------------------------------------------------------------------
# HYBRID BUILD: Node.js (Next.js) + Python (RAG Engine)
# Project: AutoPlanea MEP (misplanescr.com)
# -----------------------------------------------------------------------------

FROM node:20-slim AS base

# 1. Install Python & System Dependencies
#    We need Python 3.9+ for the RAG scripts + build tools for native modules.
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 \
    python3-pip \
    python3-venv \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Alias python3 -> python
RUN ln -s /usr/bin/python3 /usr/bin/python

# 2. Set Working Directory
WORKDIR /app

# 3. Install Python Dependencies (RAG Layer)
#    We install them globally in the container or a venv.
#    Global is fine for this single-purpose container.
COPY requirements.txt ./
RUN pip3 install --no-cache-dir -r requirements.txt --break-system-packages

# 4. Install Node Dependencies (Frontend/Backend)
COPY package.json package-lock.json* ./
RUN npm ci

# 5. Copy Application Source
COPY . .

# 6. Build Next.js App
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ENV NODE_ENV=production
RUN npm run build

# 7. Runtime Configuration
EXPOSE 3000
CMD ["npm", "start"]
