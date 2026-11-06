import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const exec = promisify(execFile);
const root = resolve(import.meta.dirname, '..');
const folder = resolve(root, '.impeccable/review/threshold-passage');
mkdirSync(folder, { recursive: true });
const run = async (session, ...args) =>
  (await exec('agent-browser', ['--session', session, ...args])).stdout.trim();
const evaluate = async (session, source) =>
  JSON.parse(
    JSON.parse(await run(session, 'eval', `JSON.stringify(${source})`)),
  );
const check = (value, message) => {
  if (!value) throw new Error(message);
};
const read = `( () => {
  const scene = document.querySelector('.scene:not(.scene--arriving)');
  const rect = (selector) => {
    const r = scene.querySelector(selector).getBoundingClientRect();
    return { x:r.x, y:r.y, width:r.width, height:r.height, right:r.right, bottom:r.bottom };
  };
  return {
    scene: scene.dataset.scene, traveling: scene.hasAttribute('data-threshold-travel'),
    garden: rect('.garden-backdrop__original'),
    overscan: rect('.garden-backdrop__overscan'),
    plants: ['left','right'].map(side => {
      const el = scene.querySelector('.garden-frond--'+side), s = getComputedStyle(el);
      return {opacity:Number(s.opacity), transform:s.transform};
    }),
    sameGarden: window.originalGarden === scene.querySelector('.garden-backdrop__original'),
    gardens: document.querySelectorAll('.garden-backdrop__original').length,
    imagesReady: [...scene.querySelectorAll('img')].every(i => i.complete && i.naturalWidth > 0),
  };
})()`;

async function inspect(device, width, height, reduced = false) {
  const session = `atp-threshold-${device}`;
  const journeys = [];
  try {
    await run(session, 'set', 'viewport', String(width), String(height));
    if (reduced) await run(session, 'set', 'media', 'light', 'reduced-motion');
    await run(session, 'open', 'http://localhost:3000/');
    await run(
      session,
      'eval',
      "localStorage.setItem('abraza-tu-paz:welcome-seen:v1','1')",
    );
    await run(
      session,
      'wait',
      '--fn',
      '[...document.images].every(i=>i.complete && i.naturalWidth>0)',
    );
    await run(session, 'mouse', 'move', String(width / 2), String(height / 2));
    await run(session, 'wait', '300');
    await run(
      session,
      'eval',
      `window.originalGarden = document.querySelector('.garden-backdrop__original')`,
    );
    for (const direction of ['enter', 'return']) {
      const initial = await evaluate(session, read);
      if (!reduced)
        await run(
          session,
          'eval',
          `
        window.travelAnimations = null;
        window.travelObserver = new MutationObserver(() => {
          const scene = document.querySelector('[data-threshold-travel]');
          if (!scene) return;
          window.travelAnimations = scene.getAnimations({subtree:true}).filter(a => a.effect.getTiming().duration === 2100);
          window.travelAnimations.forEach(a => { a.pause(); a.currentTime = 0; });
          window.travelObserver.disconnect();
        });
        window.travelObserver.observe(document.querySelector('.experience'), {attributes:true, subtree:true});
      `,
        );
      const selector =
        direction === 'enter'
          ? '.passage-zone--entrada'
          : '.passage-zone--jardin-back';
      const point = await evaluate(
        session,
        `(() => { const r = document.querySelector('${selector}').getBoundingClientRect();return [(Math.max(0,r.left)+Math.min(innerWidth,r.right))/2,(Math.max(0,r.top)+Math.min(innerHeight,r.bottom))/2]; })()`,
      );
      await run(
        session,
        'mouse',
        'move',
        ...point.map((v) => String(Math.round(v))),
      );
      await run(session, 'mouse', 'down');
      await run(session, 'mouse', 'up');
      const frames = [];
      if (!reduced) {
        await run(
          session,
          'wait',
          '--fn',
          'window.travelAnimations?.length >= 5',
        );
        for (const time of [0, 350, 700, 1050, 1400, 1750, 2099]) {
          await run(
            session,
            'eval',
            `window.travelAnimations.forEach(a => a.currentTime = ${time})`,
          );
          const frame = await evaluate(session, read);
          frames.push({ time, ...frame });
          check(
            frame.sameGarden && frame.gardens === 1,
            `${device}/${direction}: garden was replaced or duplicated`,
          );
          check(frame.imagesReady, `${device}/${direction}: unloaded image`);
          await run(
            session,
            'screenshot',
            resolve(folder, `${device}-${direction}-${time}.png`),
          );
          if (time >= 700 && time <= 1750)
            check(
              frame.overscan.y <= 1 &&
                frame.overscan.bottom >= height - 1 &&
                frame.overscan.x <= 1 &&
                frame.overscan.right >= width - 1,
              `${device}/${direction}/${time}: garden exposes a rectangular edge: ${JSON.stringify(frame.overscan)}`,
            );
        }
        const opacities = frames.map((f) => f.plants[0].opacity);
        check(
          opacities.every(
            (v, i) =>
              !i ||
              (direction === 'enter'
                ? v >= opacities[i - 1]
                : v <= opacities[i - 1]),
          ),
          `${device}/${direction}: plants reverse abruptly`,
        );
        await run(
          session,
          'eval',
          'window.travelAnimations.forEach(a => a.finish())',
        );
      }
      await run(
        session,
        'wait',
        '--fn',
        "!document.querySelector('[data-threshold-travel]')",
      );
      const settled = await evaluate(session, read);
      const expected = direction === 'enter' ? 'jardin' : 'entrada';
      check(
        settled.scene === expected && settled.sameGarden,
        `${device}/${direction}: wrong endpoint`,
      );
      const last = frames.at(-1);
      if (last) {
        const jump = Math.max(
          ...['x', 'y', 'width', 'height'].map((k) =>
            Math.abs(last.garden[k] - settled.garden[k]),
          ),
        );
        check(
          jump < 2,
          `${device}/${direction}: endpoint reframed by ${jump}px`,
        );
        journeys.push({
          direction,
          initial,
          frames,
          settled,
          endpointJump: jump,
        });
      } else journeys.push({ direction, settled });
      await run(
        session,
        'screenshot',
        resolve(folder, `${device}-${direction}-settled.png`),
      );
    }
    return {
      device,
      journeys,
      errors: await run(session, 'errors'),
      pass: true,
    };
  } finally {
    await run(session, 'close');
  }
}

const results = await Promise.allSettled([
  inspect('desktop', 1440, 900),
  inspect('mobile', 390, 844),
  inspect('reduced', 1440, 900, true),
]);
writeFileSync(
  resolve(root, 'docs/review/threshold-passage-verification.json'),
  JSON.stringify(results, null, 2),
);
for (const r of results)
  console.log(
    r.status === 'fulfilled' ? `${r.value.device}: passed` : String(r.reason),
  );
if (results.some((r) => r.status === 'rejected')) process.exitCode = 1;
