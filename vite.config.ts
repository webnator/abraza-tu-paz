import { sites } from '@openai/sites-vite-plugin';
import tailwindcss from '@tailwindcss/postcss';
import vinext from 'vinext';
import { defineConfig, type Plugin } from 'vite';
import hostingConfig from './.openai/hosting.json';

const SITE_CREATOR_PLACEHOLDER_DATABASE_ID =
  '00000000-0000-4000-8000-000000000000';

const { d1, r2 } = hostingConfig;

// macOS Seatbelt blocks FSEvents, so Codex previews need polling for HMR.
const isCodexSeatbeltSandbox = process.env.CODEX_SANDBOX === 'seatbelt';
const githubPages = process.env.GITHUB_PAGES === 'true';
const pagesBasePath = '/abraza-tu-paz';

// next/link handles basePath, but raw public URLs in JSX/data need the same
// prefix. Apply it only to our application modules in the static Pages build.
function pagesPublicAssets(): Plugin {
  return {
    name: 'github-pages-public-assets',
    enforce: 'pre',
    transform(code, id) {
      if (id.includes('/node_modules/') || !/\/(app|components|lib)\//.test(id))
        return;
      const updated = code.replace(
        /(['"`])\/(?=(?:images|photographs|audio|resources)\/|(?:favicon\.svg|og\.png)(?:['"`]))/g,
        `$1${pagesBasePath}/`,
      );
      if (updated !== code) return { code: updated, map: null };
    },
  };
}

const localBindingConfig = {
  main: 'vinext/server/fetch-handler',
  compatibility_flags: ['nodejs_compat'],
  d1_databases: d1
    ? [
        {
          binding: d1,
          database_name: 'site-creator-d1',
          database_id: SITE_CREATOR_PLACEHOLDER_DATABASE_ID,
        },
      ]
    : [],
  r2_buckets: r2
    ? [
        {
          binding: r2,
          bucket_name: 'site-creator-r2',
        },
      ]
    : [],
};

export default defineConfig(async () => {
  // Keep Wrangler and Miniflare state project-local. These are non-secret tool
  // settings; application environment belongs in ignored `.env*` files.
  process.env.WRANGLER_WRITE_LOGS ??= 'false';
  process.env.WRANGLER_LOG_PATH ??= '.wrangler/logs';
  process.env.MINIFLARE_REGISTRY_PATH ??= '.wrangler/registry';

  // Wrangler snapshots its log path while the Cloudflare plugin is imported.
  const cloudflarePlugin = githubPages
    ? []
    : [
        (await import('@cloudflare/vite-plugin')).cloudflare({
          viteEnvironment: { name: 'rsc', childEnvironments: ['ssr'] },
          config: localBindingConfig,
        }),
      ];

  return {
    base: githubPages ? `${pagesBasePath}/` : '/',
    css: { postcss: { plugins: [tailwindcss()] } },
    server: isCodexSeatbeltSandbox
      ? { watch: { useFsEvents: false, usePolling: true } }
      : undefined,
    plugins: [
      vinext(),
      ...(githubPages ? [pagesPublicAssets()] : [sites(), cloudflarePlugin]),
    ],
  };
});
