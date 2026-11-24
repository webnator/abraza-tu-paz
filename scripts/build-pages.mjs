import { spawnSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const preload = new URL('./pages-prerender.mjs', import.meta.url).href;
const result = spawnSync(process.execPath, [resolve(root, 'node_modules/.bin/vinext'), 'build'], {
  cwd: root,
  stdio: 'inherit',
  env: {
    ...process.env,
    GITHUB_PAGES: 'true',
    NODE_OPTIONS: [process.env.NODE_OPTIONS, `--import=${preload}`].filter(Boolean).join(' '),
  },
});
if (result.status !== 0) process.exit(result.status ?? 1);

const output = resolve(root, 'out');
rmSync(output, { recursive: true, force: true });
mkdirSync(output, { recursive: true });
cpSync(resolve(root, 'dist/client'), output, { recursive: true });

// The build nests assets under basePath for its Node server. GitHub Pages
// already mounts the artifact under that path, so publish _next at its root.
const nestedAssets = resolve(output, 'abraza-tu-paz/_next');
if (existsSync(nestedAssets)) {
  cpSync(nestedAssets, resolve(output, '_next'), { recursive: true });
  rmSync(resolve(output, 'abraza-tu-paz'), { recursive: true });
}
writeFileSync(resolve(output, '.nojekyll'), '');
if (!existsSync(resolve(output, 'index.html')))
  throw new Error('Static export did not produce the home page.');
await import('./verify-pages.mjs');
console.log('GitHub Pages artifact ready in out/');
