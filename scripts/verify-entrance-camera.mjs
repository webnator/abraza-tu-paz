import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
const exec = promisify(execFile);
const root = resolve(import.meta.dirname, '..');
const folder = resolve(root, '.impeccable/review/entrance-camera');
mkdirSync(folder, { recursive: true });
const run = async (session, ...args) =>
  (await exec('agent-browser', ['--session', session, ...args])).stdout.trim();
const read = async (session) =>
  JSON.parse(
    JSON.parse(
      await run(
        session,
        'eval',
        `JSON.stringify((() => {
  const stage = document.querySelector('.experience'); const world = document.querySelector('.scene:not(.scene--arriving) .scene-world');
  return { scene: document.querySelector('.scene:not(.scene--arriving)').dataset.scene,
    matrix: getComputedStyle(world).transform,
    x: stage.style.getPropertyValue('--camera-x'), y: stage.style.getPropertyValue('--camera-y'), ry: stage.style.getPropertyValue('--camera-ry'),
    audioElements: document.querySelectorAll('audio').length,
  };
})())`,
      ),
    ),
  );
const clickMoving = async (session, selector) => {
  const point = JSON.parse(
    JSON.parse(
      await run(
        session,
        'eval',
        `JSON.stringify((() => { const r=document.querySelector(${JSON.stringify(selector)}).getBoundingClientRect();return [r.x+r.width/2,r.y+r.height/2]; })())`,
      ),
    ),
  );
  await run(
    session,
    'mouse',
    'move',
    ...point.map((x) => String(Math.round(x))),
  );
  await run(session, 'mouse', 'down');
  await run(session, 'mouse', 'up');
};
const check = (condition, text) => {
  if (!condition) throw new Error(text);
};
async function inspect(device, width, height, reduced = false) {
  const session = `atp-camera-${device}`;
  try {
    await run(session, 'set', 'viewport', String(width), String(height));
    if (reduced) await run(session, 'set', 'media', 'light', 'reduced-motion');
    await run(session, 'open', 'http://localhost:3000/');
    await run(
      session,
      'eval',
      "localStorage.setItem('abraza-tu-paz:welcome-seen:v1','1')",
    );
    await run(session, 'wait', '500');
    await run(session, 'mouse', 'move', String(width / 2), String(height / 2));
    await run(session, 'wait', '700');
    const idleA = await read(session);
    const idleSamples = [idleA];
    for (let i = 0; i < 6; i++) {
      await run(session, 'wait', '500');
      idleSamples.push(await read(session));
    }
    const idleB = idleSamples.at(-1);
    if (reduced) {
      check(
        idleSamples.every((sample) => sample.matrix === idleA.matrix) &&
          !idleA.matrix.startsWith('matrix3d'),
        'reduced motion still moves the camera',
      );
      return {
        device,
        idleA,
        idleB,
        errors: await run(session, 'errors'),
        pass: true,
      };
    }
    const range = (axis) => {
      const values = idleSamples.map((sample) => parseFloat(sample[axis]));
      return Math.max(...values) - Math.min(...values);
    };
    const idleTravel = Math.max(range('x'), range('y'));
    check(
      idleA.matrix.startsWith('matrix3d') && idleTravel > 2.5,
      `${device}: stationary camera drift is too small to see (${idleTravel}px)`,
    );
    await run(
      session,
      'mouse',
      'move',
      String(Math.round(width * 0.1)),
      String(Math.round(height * 0.15)),
    );
    await run(session, 'wait', '900');
    const left = await read(session);
    await run(session, 'screenshot', resolve(folder, `${device}-left.png`));
    await run(
      session,
      'mouse',
      'move',
      String(Math.round(width * 0.9)),
      String(Math.round(height * 0.85)),
    );
    await run(session, 'wait', '900');
    const right = await read(session);
    await run(session, 'screenshot', resolve(folder, `${device}-right.png`));
    check(
      parseFloat(left.ry) > 1 &&
        parseFloat(right.ry) < -1 &&
        parseFloat(left.x) > parseFloat(right.x),
      `${device}: camera does not pan and turn`,
    );
    await clickMoving(session, '.threshold-invitation');
    await run(session, 'wait', '400');
    const pausedA = await read(session);
    await run(session, 'wait', '600');
    const pausedB = await read(session);
    check(
      pausedA.matrix === pausedB.matrix,
      `${device}: camera moves behind the reading`,
    );
    await run(session, 'press', 'Escape');
    await run(session, 'wait', '200');
    await clickMoving(session, '.passage-zone--entrada');
    await run(session, 'wait', '300');
    await run(session, 'screenshot', resolve(folder, `${device}-crossing.png`));
    await run(session, 'wait', '1400');
    const garden = await read(session);
    check(
      garden.scene === 'jardin' &&
        !garden.matrix.startsWith('matrix3d') &&
        !garden.x &&
        garden.audioElements === 0,
      `${device}: entrance camera or audio leaked into the garden`,
    );
    await run(session, 'snapshot', '-i');
    await run(
      session,
      'find',
      'role',
      'button',
      'click',
      '--name',
      'Volver a la entrada por el sendero',
      '--exact',
    );
    await run(session, 'wait', '1600');
    const returned = await read(session);
    check(
      returned.scene === 'entrada' && returned.matrix.startsWith('matrix3d'),
      `${device}: entrance return failed`,
    );
    return {
      device,
      idleA,
      idleB,
      idleTravel,
      left,
      right,
      paused: true,
      garden,
      returned,
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
  resolve(root, 'docs/review/entrance-camera-verification.json'),
  JSON.stringify(report, null, 2) + '\n',
);
console.log(JSON.stringify(report, null, 2));
if (!report.pass) process.exitCode = 1;
