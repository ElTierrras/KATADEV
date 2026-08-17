# customers-app

API para registro de clientes (Node.js, Express, PostgreSQL), con configuracion independiente por ambiente: dev, qa, prod.

## Build

    npm install
    npm run build            # genera dist/app.cjs, artefacto ejecutable unico

## Ejecutar en dev

Puerto :8080.

    APP_ENV=dev npm run migrate
    npm run dev

Docker (stack completo, con su propio Postgres):

    docker compose -f docker/dev/docker-compose.yml up --build

## Ejecutar en prod

Puerto :9090.

    npm run build
    npm run start:prod

Docker (stack completo, con su propio Postgres):

    docker compose -f docker/prod/docker-compose.yml up --build

QA sigue el mismo patron en el puerto :8090 (`npm run qa`, `docker/qa/docker-compose.yml`).

## Verificar el ambiente activo

    curl http://localhost:8080/health
    curl http://localhost:9090/health

Cada respuesta incluye env, app, port y logMessage del ambiente activo.