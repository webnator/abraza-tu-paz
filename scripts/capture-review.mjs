import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { resolve } from 'node:path';
import { mkdirSync } from 'node:fs';

const exec = promisify(execFile);
const root = resolve(import.meta.dirname, '..');
const review = resolve(root, '.impeccable/review');
mkdirSync(review, { recursive: true });
async function run(session, ...args) {
  const result = await exec('agent-browser', ['--session', session, ...args]);
  return result.stdout;
}
async function shot(session, name) { await run(session, 'screenshot', resolve(review, name)); }
async function page(session, path, name) {
  await run(session, 'open', `http://localhost:3000${path}`);
  await run(session, 'wait', '900');
  await shot(session, name);
}
async function desktop() {
  const session = 'atp-desktop';
  await run(session, 'set', 'viewport', '1440', '900');
  await page(session, '/', 'entrada-desktop.png');
  await run(session, 'find', 'role', 'button', 'click', '--name', 'Entrar al jardín por la verja');
  await run(session, 'wait', '1600'); await shot(session, 'jardin-desktop.png');
  await run(session, 'find', 'role', 'button', 'click', '--name', 'Entrar al refugio al final del sendero');
  await run(session, 'wait', '1900'); await shot(session, 'refugio-desktop.png');
  await run(session, 'find', 'role', 'button', 'click', '--name', 'Abrir menú');
  await run(session, 'wait', '600'); await shot(session, 'menu-desktop.png');
  for (const [path, name] of [
    ['/terapia', 'desktop.png'], ['/gabriela', 'gabriela-desktop.png'], ['/biblioteca', 'biblioteca-desktop.png'],
    ['/biblioteca/adulto-responsable', 'resource-desktop.png'], ['/reflexiones', 'reflexiones-desktop.png'],
    ['/reflexiones/cambiar-tambien-es-perder', 'article-desktop.png'], ['/proyectos', 'proyectos-desktop.png'], ['/contacto', 'contacto-desktop.png'],
  ]) await page(session, path, name);
  return { desktop: 'captured', errors: await run(session, 'errors') };
}
async function mobile() {
  const session = 'atp-mobile';
  await run(session, 'set', 'viewport', '390', '844');
  await run(session, 'set', 'media', 'light');
  await page(session, '/', 'entrada-mobile.png');
  await run(session, 'find', 'role', 'button', 'click', '--name', 'Entrar al jardín por la verja');
  await run(session, 'wait', '1600'); await shot(session, 'jardin-mobile.png');
  await run(session, 'find', 'role', 'button', 'click', '--name', 'Entrar al refugio al final del sendero');
  await run(session, 'wait', '1900'); await shot(session, 'refugio-mobile.png');
  await run(session, 'find', 'role', 'button', 'click', '--name', 'Abrir menú');
  await run(session, 'wait', '600'); await shot(session, 'menu-mobile.png');
  for (const [path, name] of [
    ['/gabriela', 'mobile.png'], ['/terapia', 'terapia-mobile.png'], ['/biblioteca', 'biblioteca-mobile.png'],
    ['/biblioteca/adulto-responsable', 'resource-mobile.png'], ['/reflexiones/cambiar-tambien-es-perder', 'article-mobile.png'],
    ['/contacto', 'contacto-mobile.png'],
  ]) await page(session, path, name);
  return { mobile: 'captured', errors: await run(session, 'errors') };
}
console.log(JSON.stringify(await Promise.all([desktop(), mobile()]), null, 2));
