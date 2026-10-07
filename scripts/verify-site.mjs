import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const origin = process.argv[2] || 'http://localhost:3000';
const routes = [
  '/',
  '/terapia',
  '/gabriela',
  '/biblioteca',
  '/reflexiones',
  '/proyectos',
  '/contacto',
  '/biblioteca/adulto-responsable',
  '/biblioteca/vinculos-que-se-transforman',
  '/biblioteca/descifrando-la-frustracion',
  '/biblioteca/transitar-las-fiestas',
  '/reflexiones/cambiar-tambien-es-perder',
  '/reflexiones/poner-un-limite-y-sentir-culpa',
  '/reflexiones/cuando-tu-cabeza-no-para',
];
const checks = [];
for (const path of routes) {
  const response = await fetch(origin + path);
  const html = (await response.text()).replace(
    /<script\b[^>]*>[\s\S]*?<\/script>/gi,
    '',
  );
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1];
  const description = /<meta[^>]+name="description"[^>]+content="[^\"]+"/i.test(
    html,
  );
  const heading = /<h1\b/.test(html);
  const content = path === '/' || /<article\b/.test(html);
  const images = [...html.matchAll(/<img[^>]+src="([^"]+)"/g)].map(
    (match) => match[1],
  );
  let imageErrors = 0;
  for (const image of new Set(images.filter((s) => s.startsWith('/')))) {
    const asset = await fetch(origin + image);
    if (!asset.ok) imageErrors++;
  }
  const pass =
    response.ok &&
    !!title &&
    description &&
    heading &&
    content &&
    imageErrors === 0;
  checks.push({
    path,
    status: response.status,
    title,
    description,
    heading,
    serverRenderedContent: content,
    imageErrors,
    pass,
  });
}
const resourceMap = [
  ['Workbooks.pdf', 'adulto-responsable.pdf'],
  ['Workbooks_(1).pdf', 'vinculos-que-se-transforman.pdf'],
  ['Workbooks_(2).pdf', 'descifrando-la-frustracion.pdf'],
  ['Workbooks_(3).pdf', 'transitar-las-fiestas.pdf'],
];
const hash = (data) => createHash('sha256').update(data).digest('hex');
for (const [source, file] of resourceMap) {
  const original = readFileSync(
    resolve(
      root,
      '../research/sources/03-contenido/Private & Shared/Capas - Páginas/Capa 1 - La entrada/Workbooks',
      source,
    ),
  );
  const response = await fetch(`${origin}/resources/${file}`);
  const downloaded = Buffer.from(await response.arrayBuffer());
  const unchanged = hash(original) === hash(downloaded);
  checks.push({
    resource: file,
    status: response.status,
    unchanged,
    bytes: downloaded.length,
    pass: response.ok && unchanged,
  });
}
const missing = await fetch(`${origin}/no-existe-este-camino`);
checks.push({
  path: '/no-existe-este-camino',
  status: missing.status,
  pass: missing.status === 404,
});
const failed = checks.filter((check) => !check.pass);
writeFileSync(
  resolve(root, 'docs/review/http-verification.json'),
  JSON.stringify(
    {
      origin,
      checkedAt: new Date().toISOString(),
      checks,
      failed: failed.length,
    },
    null,
    2,
  ),
);
console.log(
  JSON.stringify(
    {
      routes: routes.length,
      originalDownloads: 4,
      checks: checks.length,
      failed,
    },
    null,
    2,
  ),
);
if (failed.length) process.exitCode = 1;
