import { jest } from '@jest/globals';
import request from 'supertest';
import { createApp } from '../src/app.js';
import config from '../src/config/index.js';
import pool from '../src/db/pool.js';

const app = createApp();

// Email único por corrida para no chocar con datos de ejecuciones previas.
const uniqueEmail = `test-${Date.now()}@email.com`;

describe('GET /health', () => {
  it('responde 200 con el ambiente y nombre de app configurados', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.env).toBe(config.env);
    expect(res.body.app).toBe(config.appName);
  });
});

describe('POST /api/customers', () => {
  it('crea un cliente válido y responde 201', async () => {
    const res = await request(app)
      .post('/api/customers')
      .send({ name: 'Juan Perez', email: uniqueEmail });

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ name: 'Juan Perez', email: uniqueEmail });
    expect(res.body.id).toBeDefined();
  });

  it('rechaza la creación sin email (400)', async () => {
    const res = await request(app).post('/api/customers').send({ name: 'Sin Email' });
    expect(res.status).toBe(400);
  });

  it('rechaza un email duplicado (409)', async () => {
    const res = await request(app)
      .post('/api/customers')
      .send({ name: 'Duplicado', email: uniqueEmail });
    expect(res.status).toBe(409);
  });
});

describe('GET /api/customers', () => {
  it('retorna la lista de clientes incluyendo el recién creado', async () => {
    const res = await request(app).get('/api/customers');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.some((c) => c.email === uniqueEmail)).toBe(true);
  });
});

afterAll(async () => {
  await pool.end();
});
