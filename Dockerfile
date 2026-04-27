# --- ESTÁGIO 1: Build do Frontend (Vue 3) ---
FROM node:20-slim AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# --- ESTÁGIO 2: Servidor Web (Nginx) ---
FROM nginx:stable-alpine AS production-stage

# Copiar os arquivos compilados para o diretório do Nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Criar um template de configuração que suporta a variável $PORT do Render
# O Nginx oficial processa arquivos em /etc/nginx/templates/*.template automaticamente
RUN mkdir -p /etc/nginx/templates
RUN echo 'server { \
    listen ${PORT}; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/templates/default.conf.template

# Variável necessária para o script de entrada do Nginx processar o template
ENV PORT=80

# O entrypoint padrão do Nginx já cuida de substituir as variáveis e iniciar o serviço
