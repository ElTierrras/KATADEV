-- Datos ficticios de ejemplo para el ambiente DEV (10 clientes).
-- Idempotente: se puede ejecutar más de una vez sin duplicar filas.
-- NO se aplica en prod (ver docker/prod/docker-compose.yml y scripts/seed.mjs).

INSERT INTO customers (name, email) VALUES
  ('Ana Torres',        'ana.torres@dev.local'),
  ('Carlos Ramirez',    'carlos.ramirez@dev.local'),
  ('Beatriz Gomez',     'beatriz.gomez@dev.local'),
  ('Daniel Rojas',      'daniel.rojas@dev.local'),
  ('Elena Martinez',    'elena.martinez@dev.local'),
  ('Felipe Castro',     'felipe.castro@dev.local'),
  ('Gabriela Ruiz',     'gabriela.ruiz@dev.local'),
  ('Hector Molina',     'hector.molina@dev.local'),
  ('Isabel Vargas',     'isabel.vargas@dev.local'),
  ('Jorge Salazar',     'jorge.salazar@dev.local')
ON CONFLICT (email) DO NOTHING;
