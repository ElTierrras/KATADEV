import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pkg from 'pg';

const { Client } = pkg;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const { default: config } = await import('../src/config/index.js');

const seedsDir = path.resolve(__dirname, '../src/db/seeds');
const seedFile = path.join(seedsDir, `002_seed_${config.env}.sql`);

async function run() {
  if (config.env === 'prod') {
    console.error('No se permite sembrar datos ficticios en el ambiente PROD.');
    process.exit(1);
  }

  if (!fs.existsSync(seedFile)) {
    console.error(`No existe archivo de seed para el ambiente "${config.env}" (${seedFile})`);
    process.exit(1);
  }

  const client = new Client({
    host: config.db.host,
    port: config.db.port,
    database: config.db.name,
    user: config.db.user,
    password: config.db.password,
    ssl: config.db.ssl ? { rejectUnauthorized: false } : false,
  });

  console.log(`Sembrando datos ficticios en [${config.env}] -> ${config.db.name}@${config.db.host}:${config.db.port}`);

  await client.connect();
  const sql = fs.readFileSync(seedFile, 'utf-8');
  await client.query(sql);
  const { rows } = await client.query('SELECT COUNT(*)::int AS total FROM customers');
  await client.end();

  console.log(`Seed aplicado. Total de clientes en la tabla: ${rows[0].total}`);
}

run().catch((err) => {
  console.error('Error aplicando el seed:', err.message);
  process.exit(1);
});
