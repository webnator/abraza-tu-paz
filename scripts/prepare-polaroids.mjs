import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const source = resolve(
  root,
  '../research/sources/04-polaroids-mari/Web - Polaroids.pdf',
);
const scratch = mkdtempSync(join(tmpdir(), 'atp-polaroids-'));
const assetRequire = createRequire(
  join(process.argv[2] || root, 'package.json'),
);
const sharp = assetRequire('sharp');
const output = resolve(root, 'public/photographs');
mkdirSync(output, { recursive: true });

// Bounds measured on the fully reviewed 1061 × 1500 page renders.
// Remove only the export's outer blank page, not the authored paper or photograph.
const pages = [
  ['loreto-2026', [5, 101, 1056, 1228]],
  ['cuaderno-solidario', [37, 53, 990, 1389]],
  ['noviembre-2025', [37, 100, 978, 1105]],
  ['tailandia', [53, 20, 953, 1416]],
  ['septiembre-2026', [20, 278, 1019, 809]],
  ['paris', [53, 17, 974, 1467]],
  ['disney', [55, 40, 954, 1407]],
];
const result = [];
for (const [index, [name, bounds]] of pages.entries()) {
  const page = index + 1;
  const prefix = join(scratch, name);
  execFileSync('pdftoppm', [
    '-f',
    String(page),
    '-singlefile',
    '-scale-to',
    '2200',
    '-png',
    source,
    prefix,
  ]);
  const input = `${prefix}.png`;
  const { width, height } = await sharp(input).metadata();
  const [x, y, w, h] = bounds;
  const left = Math.round((x * width) / 1061);
  const top = Math.round((y * height) / 1500);
  const file = `polaroid-${name}.webp`;
  const info = await sharp(input)
    .extract({
      left,
      top,
      width: Math.min(width - left, Math.round((w * width) / 1061)),
      height: Math.min(height - top, Math.round((h * height) / 1500)),
    })
    .resize({
      width: 1600,
      height: 1800,
      fit: 'inside',
      withoutEnlargement: true,
    })
    .webp({ quality: 88 })
    .toFile(join(output, file));
  writeFileSync(
    join(output, `${file}.provenance.json`),
    JSON.stringify(
      {
        type: 'supplied PDF polaroid artwork',
        asset: `Web - Polaroids.pdf, page ${page}`,
        source,
        sourceMessageId: '1a1202b9282e2a7b',
        page,
        changes:
          'PDF rasterization, removal of outer blank page and WebP compression only. Original photograph, paper frame and handwritten caption preserved. No semantic edits.',
      },
      null,
      2,
    ) + '\n',
  );
  result.push({
    file,
    page,
    width: info.width,
    height: info.height,
    bytes: info.size,
  });
}
console.log(JSON.stringify(result, null, 2));
