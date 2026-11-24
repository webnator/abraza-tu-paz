import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../out/', import.meta.url));
const basePath = '/abraza-tu-paz';
const files = (directory) => readdirSync(directory).flatMap((name) => {
  const path = join(directory, name);
  return statSync(path).isDirectory() ? files(path) : [path];
});
const pages = files(root).filter((path) => path.endsWith('.html'));
const errors = [];
let references = 0;
for (const page of pages) {
  const html = readFileSync(page, 'utf8');
  for (const [, value] of html.matchAll(/(?:src|href|poster)="([^"<>]+)"/g)) {
    if (!value.startsWith('/') || value.startsWith('//')) continue;
    references++;
    if (value !== basePath && !value.startsWith(`${basePath}/`)) {
      errors.push(`${page}: unprefixed local URL ${value}`);
      continue;
    }
    const pathname = decodeURIComponent(new URL(value, 'https://webnator.github.io').pathname);
    const target = join(root, pathname.slice(basePath.length));
    if (!existsSync(target) && !existsSync(join(target, 'index.html')))
      errors.push(`${page}: missing exported target ${value}`);
  }
}
if (pages.length !== 15) errors.push(`Expected 15 HTML pages, found ${pages.length}`);
if (!readFileSync(join(root, 'index.html'), 'utf8').includes('jardin-analogico-v6.jpg'))
  errors.push('The home page does not include the latest garden.');
if (errors.length) throw new Error(errors.join('\n'));
console.log(`Verified ${pages.length} static pages and ${references} local references.`);
