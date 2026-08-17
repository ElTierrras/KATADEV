import { build } from 'esbuild';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const outfile = path.resolve(rootDir, 'dist/app.cjs');

fs.rmSync(path.resolve(rootDir, 'dist'), { recursive: true, force: true });

await build({
  entryPoints: [path.resolve(rootDir, 'src/index.js')],
  bundle: true,
  platform: 'node',
  target: 'node18',
  format: 'cjs',
  outfile,
  banner: { js: '#!/usr/bin/env node' },
  external: ['pg-native'],
  sourcemap: false,
  minify: false,
  logLevel: 'info',
});

fs.chmodSync(outfile, 0o755);

console.log(`Build completo -> ${path.relative(rootDir, outfile)}`);
