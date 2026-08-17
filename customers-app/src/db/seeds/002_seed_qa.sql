-- Datos ficticios de ejemplo para el ambiente QA (10 clientes).
-- Idempotente: se puede ejecutar más de una vez sin duplicar filas.
-- NO se aplica en prod (ver docker/prod/docker-compose.yml y scripts/seed.mjs).

INSERT INTO customers (name, email) VALUES
  ('Karen Ospina',      'karen.ospina@qa.local'),
  ('Luis Fernandez',    'luis.fernandez@qa.local'),
  ('Mariana Peña',      'mariana.pena@qa.local'),
  ('Nicolas Herrera',   'nicolas.herrera@qa.local'),
  ('Olga Restrepo',     'olga.restrepo@qa.local'),
  ('Pablo Duarte',      'pablo.duarte@qa.local'),
  ('Queralt Ibarra',    'queralt.ibarra@qa.local'),
  ('Ricardo Suarez',    'ricardo.suarez@qa.local'),
  ('Sofia Mendoza',     'sofia.mendoza@qa.local'),
  ('Tomas Cardenas',    'tomas.cardenas@qa.local')
ON CONFLICT (email) DO NOTHING;
