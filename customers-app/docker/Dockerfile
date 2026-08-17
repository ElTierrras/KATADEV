# =============================================================
# Dockerfile - customers-app
# Un único artefacto de imagen; el ambiente (dev/qa/prod) se
# selecciona en tiempo de ejecución con la variable APP_ENV
# =============================================================

FROM node:20-slim AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:20-slim AS runtime

WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist
COPY .env.dev .env.qa .env.prod ./

EXPOSE 8080 8090 9090

ENV APP_ENV=dev

CMD ["node", "dist/app.cjs"]
