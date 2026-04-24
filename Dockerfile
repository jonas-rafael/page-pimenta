# --- ESTÁGIO 1: Build do Frontend (Vue 3) ---
FROM node:20-slim AS build-frontend
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# --- ESTÁGIO 2: Backend (FastAPI) e Imagem Final ---
FROM python:3.11-slim
WORKDIR /app

# Instalar dependências de sistema necessárias
RUN apt-get update && apt-get install -y \
    default-libmysqlclient-dev \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Instalar dependências do Python
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar o código do backend
COPY backend/app ./app

# Copiar os arquivos estáticos do frontend (gerados no estágio 1)
COPY --from=build-frontend /app/dist ./static

# Porta padrão do Render (ele injeta a variável PORT automaticamente)
ENV PORT=80
ENV MYSQL_HOST=localhost

# Comando para rodar a aplicação (Host 0.0.0.0 é obrigatório no Docker)
CMD uvicorn app.main:app --host 0.0.0.0 --port $PORT
