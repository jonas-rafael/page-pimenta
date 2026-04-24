# --- ESTÁGIO 1: Build do Frontend (Vue 3) ---
FROM node:20-slim AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# --- ESTÁGIO 2: Servidor Web (Nginx) ---
FROM nginx:stable-alpine AS production-stage

# Copiar os arquivos gerados no build para a pasta que o Nginx serve
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Configuração customizada para o Nginx funcionar com a porta do Render e rotas do Vue
RUN echo 'server { \
    listen ${PORT}; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf.template

# O Render injeta a variável PORT. O comando abaixo substitui ${PORT} no template e inicia o Nginx.
CMD ["/bin/sh", "-c", "envsubst < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
