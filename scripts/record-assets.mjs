import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve, relative } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const dirs = [
  'public',
  'public/images',
  'public/photographs',
  'public/resources',
];
const entries = [];
for (const directory of dirs) {
  for (const name of readdirSync(resolve(root, directory))) {
    if (!/\.(png|jpe?g|webp)$/i.test(name)) continue;
    const image = resolve(root, directory, name);
    const provenancePath = `${image}.provenance.json`;
    const metadata = existsSync(provenancePath)
      ? JSON.parse(readFileSync(provenancePath, 'utf8'))
      : null;
    const prompt =
      metadata?.exact_prompt ||
      metadata?.corrective_prompt ||
      metadata?.initial_prompt ||
      (metadata
        ? `User-supplied source: ${relative(root, metadata.source || image)}. ${metadata.changes || 'Original cover image from supplied PDF.'}`
        : `Pre-existing Abraza tu Paz asset preserved from immersive-transition-v2. Asset: ${directory}/${name}. Original production references: docs/reference/diseno-experiencia-v1.md.`);
    // Sidecars preserve byte-for-byte original rasters. The skill's reader supports them for all formats.
    writeFileSync(
      `${image}.json`,
      JSON.stringify(
        {
          prompt,
          source: metadata
            ? metadata.asset || relative(root, metadata.source || image)
            : 'immersive-transition-v2',
          method:
            metadata?.method || metadata?.type || 'existing project asset',
        },
        null,
        2,
      ),
    );
    entries.push({
      asset: `${directory}/${name}`,
      kind: metadata?.method || metadata?.type || 'existing project asset',
      source: metadata?.asset || 'immersive-transition-v2',
    });
  }
}
writeFileSync(
  resolve(root, 'docs/review/media-manifest.json'),
  JSON.stringify(entries, null, 2),
);
console.log(
  `Recorded provenance for ${entries.length} rasters; originals untouched.`,
);
