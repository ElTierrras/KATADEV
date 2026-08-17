import config from './config/index.js';
import { createApp } from './app.js';

const app = createApp();

console.log('==========================================');
console.log(`Ambiente activo (APP_ENV): ${config.env}`);
console.log(`Nombre app: ${config.appName}`);
console.log(`Puerto: ${config.port}`);
console.log(`${config.logMessage}`);
console.log('==========================================');

const server = app.listen(config.port, '0.0.0.0', () => {
  console.log(
    `[${config.appName}] escuchando en http://0.0.0.0:${config.port}`
  );
});

server.on('error', (error) => {
  console.error('Error al iniciar el servidor:', error.message);
  process.exit(1);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM recibido, cerrando servidor...');
  server.close(() => process.exit(0));
});