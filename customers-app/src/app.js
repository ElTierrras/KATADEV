import express from 'express';
import cors from 'cors';
import config from './config/index.js';
import customersRoutes from './routes/customers.routes.js';
import { errorHandler } from './middlewares/errorHandler.js';

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get('/health', (req, res) => {
    res.json({
      status: 'ok',
      env: config.env,
      app: config.appName,
    });
  });

  app.use(customersRoutes);

  app.use((req, res) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
  });

  app.use(errorHandler);

  return app;
}
