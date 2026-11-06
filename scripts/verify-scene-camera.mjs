import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
const exec = promisify(execFile);
const root = resolve(import.meta.dirname, '..');
const folder = resolve(root, '.impeccable/review/scene-camera');
mkdirSync(folder, { recursive: true });
const run = async (session, ...args) =>
  (await exec('agent-browser', ['--session', session, ...args])).stdout.trim();
const evaluate = async (session, source) =>
  JSON.parse(
    JSON.parse(await run(session, 'eval', `JSON.stringify(${source})`)),
  );
const check = (condition, message) => {
  if (!condition) throw new Error(message);
};
const read = `( () => {
  const stage=document.querySelector('.experience'), scene=document.querySelector('.scene:not(.scene--arriving)'), world=scene.querySelector('.scene-world');
  const image=scene.querySelector('.garden-backdrop__overscan, .depth-layer--back > picture > img'), rect=image.getBoundingClientRect();
  return {scene:scene.dataset.scene, matrix:getComputedStyle(world).transform,
    x:stage.style.getPropertyValue('--camera-x'), y:stage.style.getPropertyValue('--camera-y'), ry:stage.style.getPropertyValue('--camera-ry'),
    back:{left:rect.left,top:rect.top,right:rect.right,bottom:rect.bottom},
    audio:document.querySelectorAll('audio').length, allLoaded:[...scene.querySelectorAll('img')].every(i=>i.complete && i.naturalWidth>0),
    sharedObjects:[...scene.querySelectorAll('.hotspot')].every(h=>h.closest('.scene-world')===world),
  };
})()`;
async function clickPhysical(session, selector) {
  const point = await evaluate(
    session,
    `(() => {const r=document.querySelector('${selector}').getBoundingClientRect(); return [(Math.max(0,r.left)+Math.min(innerWidth,r.right))/2,(Math.max(0,r.top)+Math.min(innerHeight,r.bottom))/2];})()`,
  );
  await run(
    session,
    'mouse',
    'move',
    ...point.map((v) => String(Math.round(v))),
  );
  await run(session, 'mouse', 'down');
  await run(session, 'mouse', 'up');
}
async function navigate(session, key, destination) {
  await run(session, 'press', key);
  await run(
    session,
    'wait',
    '--fn',
    `document.querySelector('.scene:not(.scene--arriving)').dataset.scene==='${destination}' && !document.querySelector('.is-transitioning')`,
  );
}
async function inspect(device, width, height, reduced = false) {
  const session = `atp-scene-camera-${device}`,
    scenes = [];
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
    for (const name of ['entrada', 'jardin', 'refugio']) {
      await run(
        session,
        'mouse',
        'move',
        String(width / 2),
        String(height / 2),
      );
      await run(session, 'wait', '500');
      const idle = [];
      for (let i = 0; i < 5; i++) {
        idle.push(await evaluate(session, read));
        await run(session, 'wait', '350');
      }
      check(
        idle.every(
          (s) =>
            s.scene === name && s.allLoaded && s.sharedObjects && s.audio === 0,
        ),
        `${device}/${name}: scene assets, objects or audio changed`,
      );
      if (reduced) {
        check(
          idle.every(
            (s) =>
              !s.matrix.startsWith('matrix3d') &&
              s.matrix === idle[0].matrix &&
              !s.x,
          ),
          `${device}/${name}: reduced motion is moving`,
        );
        scenes.push({ name, reduced: true, pass: true });
      } else {
        check(
          idle.every((s) => s.matrix.startsWith('matrix3d')),
          `${device}/${name}: camera missing`,
        );
        const travel = Math.max(
          ...['x', 'y'].map(
            (k) =>
              Math.max(...idle.map((s) => parseFloat(s[k]))) -
              Math.min(...idle.map((s) => parseFloat(s[k]))),
          ),
        );
        check(
          travel > 0.5,
          `${device}/${name}: no visible idle movement (${travel})`,
        );
        const corners = [];
        for (const [position, x, y] of [
          ['left-top', 0.1, 0.15],
          ['right-top', 0.9, 0.15],
          ['right-bottom', 0.9, 0.85],
          ['left-bottom', 0.1, 0.85],
        ]) {
          await run(
            session,
            'mouse',
            'move',
            String(Math.round(width * x)),
            String(Math.round(height * y)),
          );
          await run(session, 'wait', '700');
          const pose = await evaluate(session, read);
          check(
            x < 0.5 ? parseFloat(pose.ry) > 1 : parseFloat(pose.ry) < -1,
            `${device}/${name}: perspective does not follow pointer`,
          );
          check(
            pose.back.left <= 1 &&
              pose.back.top <= 1 &&
              pose.back.right >= width - 1 &&
              pose.back.bottom >= height - 1,
            `${device}/${name}/${position}: image edge visible ${JSON.stringify(pose.back)}`,
          );
          await run(
            session,
            'screenshot',
            resolve(folder, `${device}-${name}-${position}.png`),
          );
          corners.push({ position, ...pose });
        }
        await clickPhysical(session, '.menu-trigger');
        const pausedA = await evaluate(session, read);
        await run(session, 'wait', '450');
        const pausedB = await evaluate(session, read);
        check(
          pausedA.matrix === pausedB.matrix,
          `${device}/${name}: camera moves behind menu`,
        );
        await run(session, 'press', 'Escape');
        await run(
          session,
          'wait',
          '--fn',
          "!document.querySelector('.global-menu')",
        );
        scenes.push({
          name,
          idleTravel: travel,
          corners,
          pausesForMenu: true,
          pass: true,
        });
      }
      if (name !== 'refugio')
        await navigate(
          session,
          'ArrowRight',
          name === 'entrada' ? 'jardin' : 'refugio',
        );
    }
    if (!reduced) {
      await clickPhysical(session, '.hotspot--gabriela');
      await run(session, 'wait', '250');
      const a = await evaluate(session, read);
      await run(session, 'wait', '450');
      const b = await evaluate(session, read);
      check(
        a.matrix === b.matrix,
        `${device}: camera moves during album reading`,
      );
      await run(session, 'press', 'Escape');
    }
    await navigate(session, 'ArrowLeft', 'jardin');
    const returnedGarden = await evaluate(session, read);
    await navigate(session, 'ArrowLeft', 'entrada');
    const returnedEntrance = await evaluate(session, read);
    check(
      [returnedGarden, returnedEntrance].every(
        (s) => s.matrix.startsWith('matrix3d') !== reduced,
      ),
      `${device}: return lost camera preference`,
    );
    return {
      device,
      scenes,
      albumPauses: !reduced,
      returnedGarden,
      returnedEntrance,
      errors: await run(session, 'errors'),
      pass: true,
    };
  } catch (error) {
    console.log(device, await run(session, 'snapshot', '-i'));
    await run(session, 'screenshot', resolve(folder, `${device}-failure.png`));
    throw error;
  } finally {
    await run(session, 'close');
  }
}
const results = await Promise.allSettled([
  inspect('desktop', 1440, 900),
  inspect('mobile', 390, 844),
  inspect('reduced', 390, 844, true),
]);
const report = {
  checkedAt: new Date().toISOString(),
  results: results.map((r) =>
    r.status === 'fulfilled'
      ? r.value
      : { pass: false, error: r.reason.message },
  ),
  pass: results.every(
    (r) => r.status === 'fulfilled' && r.value.pass && !r.value.errors,
  ),
};
writeFileSync(
  resolve(root, 'docs/review/scene-camera-verification.json'),
  JSON.stringify(report, null, 2) + '\n',
);
for (const r of report.results)
  console.log(
    r.device ? `${r.device}: ${r.pass ? 'passed' : 'failed'}` : r.error,
  );
if (!report.pass) process.exitCode = 1;
