import { execFileSync } from 'node:child_process';
import { cpSync, mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { tmpdir } from 'node:os';
import { createRequire } from 'node:module';

const root = resolve(import.meta.dirname, '..');
const sources = resolve(
  root,
  '../research/sources/03-contenido/Private & Shared/Capas - Páginas/Capa 1 - La entrada',
);
const generated = resolve(root, '../research/generated-assets-v2');
const scratch = mkdtempSync(join(tmpdir(), 'atp-assets-'));
const assetRequire = createRequire(
  join(process.argv[2] || root, 'package.json'),
);
const sharp = assetRequire('sharp');
const convert = async (input, output, width) => {
  const image = sharp(input).rotate();
  if (width) image.resize({ width, withoutEnlargement: true });
  await image.webp({ quality: 85, alphaQuality: 100 }).toFile(output);
};

const photos = [
  ['IMG_1674.heic', 'gabriela-cotidiana'],
  ['IMG_5547.heic', 'gabriela-viaje'],
  ['IMG_5715.heic', 'pareja-paris'],
  ['e1a94fc3-0bb3-49ee-81d4-37212ed43f1e.jpg', 'maternidad'],
  ['IMG_1812.heic', 'familia'],
];
mkdirSync(join(root, 'public/photographs'), { recursive: true });
for (const [file, name] of photos) {
  const original = join(sources, 'Polaroids', file);
  const jpg = join(scratch, `${name}.jpg`);
  execFileSync(
    'sips',
    ['-s', 'format', 'jpeg', '-Z', '1600', original, '--out', jpg],
    { stdio: 'ignore' },
  );
  const out = join(root, 'public/photographs', `${name}.webp`);
  await convert(jpg, out);
  writeFileSync(
    `${out}.provenance.json`,
    JSON.stringify(
      {
        type: 'supplied photograph',
        source: original,
        changes: 'format conversion and resize only; no semantic edits',
      },
      null,
      2,
    ),
  );
}

const workbooks = [
  ['Workbooks.pdf', 'adulto-responsable'],
  ['Workbooks_(1).pdf', 'vinculos-que-se-transforman'],
  ['Workbooks_(2).pdf', 'descifrando-la-frustracion'],
  ['Workbooks_(3).pdf', 'transitar-las-fiestas'],
];
mkdirSync(join(root, 'public/resources'), { recursive: true });
for (const [file, name] of workbooks) {
  const source = join(sources, 'Workbooks', file);
  cpSync(source, join(root, 'public/resources', `${name}.pdf`));
  const prefix = join(scratch, name);
  execFileSync('pdftoppm', [
    '-f',
    '1',
    '-singlefile',
    '-scale-to',
    '720',
    '-png',
    source,
    prefix,
  ]);
  await convert(
    `${prefix}.png`,
    join(root, 'public/resources', `${name}.webp`),
  );
  writeFileSync(
    join(root, 'public/resources', `${name}.webp.provenance.json`),
    JSON.stringify({ type: 'supplied PDF cover', source, page: 1 }, null, 2),
  );
}

for (const [source, name] of [
  ['jardin-refugio-v1.png', 'jardin-refugio-v1'],
  ['refuge-objects-v2.png', 'refugio-objetos-v1'],
  ['cartel-madera-v1.png', 'cartel-madera-v1'],
  ['refuge-mobile-v1.png', 'refugio-mobile-v1'],
  ['refuge-mobile-foreground-v1.png', 'refugio-mobile-foreground-v1'],
]) {
  const out = join(root, 'public/images', `${name}.webp`);
  await convert(join(generated, source), out);
  cpSync(
    join(generated, source.replace('.png', '.provenance.json')),
    `${out}.provenance.json`,
  );
}
for (const name of [
  'entrada-primer-plano-v2',
  'jardin-primer-plano',
  'refugio-primer-plano',
]) {
  await convert(
    join(root, 'public/images', `${name}.png`),
    join(root, 'public/images', `${name}.webp`),
  );
}
console.log(
  'Prepared 5 photographs, 4 original PDFs and covers, 5 generated assets and 3 reused transparent foregrounds.',
);
