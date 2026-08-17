import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

const rootDir = process.cwd();

const VALID_ENVS = ['dev', 'qa', 'prod'];

const appEnv = (process.env.APP_ENV || 'dev').toLowerCase();

if (!VALID_ENVS.includes(appEnv)) {
  throw new Error(
    `APP_ENV="${appEnv}" invalido. Valores permitidos: ${VALID_ENVS.join(', ')}`
  );
}

const envFile = path.resolve(rootDir, `.env.${appEnv}`);
if (fs.existsSync(envFile)) {
  dotenv.config({ path: envFile });
} else {
  console.warn(`No se encontró ${envFile}, se usarán solo variables de entorno del sistema.`);
}

function required(name, fallback) {
  const value = process.env[name] ?? fallback;
  if (value === undefined) {
    throw new Error(`Falta la variable de entorno requerida: ${name}`);
  }
  return value;
}

const config = {
  env: appEnv,
  appName: required('APP_NAME', `customers-${appEnv}`),
  port: parseInt(required('PORT', '8080'), 10),
  logMessage: required('LOG_MESSAGE', `Ejecutando en ${appEnv.toUpperCase()}`),
  db: {
    host: required('DB_HOST', 'localhost'),
    port: parseInt(required('DB_PORT', '5432'), 10),
    name: required('DB_NAME', `customers_${appEnv}`),
    user: required('DB_USER', 'customers_app'),
    password: required('DB_PASSWORD', ''),
    ssl: (process.env.DB_SSL || 'false').toLowerCase() === 'true',
  },
};

export default config;
