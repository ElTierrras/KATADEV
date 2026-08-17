import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pkg from 'pg';

const { Client } = pkg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { default: config } = await import('../src/config/index.js');

const migrationsDir = path.resolve(__dirname, '../src/db/migrations');

async function run() {
  const client = new Client({
    host: config.db.host,
    port: config.db.port,
    database: config.db.name,
    user: config.db.user,
    password: config.db.password,
    ssl: config.db.ssl ? { rejectUnauthorized: false } : false,
  });

  console.log(`Aplicando migraciones en [${config.env}] -> ${config.db.name}@${config.db.host}:${config.db.port}`);

  await client.connect();

  const files = fs
    .readdirSync(migrationsDir)
    .filter((f) => f.endsWith('.sql'))
    .sort();

  for (const file of files) {
    const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf-8');
    console.log(`  → ${file}`);
    await client.query(sql);
  }

  await client.end();
  console.log('Migraciones aplicadas correctamente.');
}

run().catch((err) => {
  console.error('Error aplicando migraciones:', err.message);
  process.exit(1);
});
