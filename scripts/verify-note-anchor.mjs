import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const exec = promisify(execFile);
const root = resolve(import.meta.dirname, '..');
const review = resolve(root, '.impeccable/review/note-anchor');
mkdirSync(review, { recursive: true });
const run = async (session, ...args) =>
  (await exec('agent-browser', ['--session', session, ...args])).stdout.trim();
const measurement = `JSON.stringify((() => {
  const gate = document.querySelector('.depth-layer--threshold > img');
  const note = document.querySelector('.threshold-invitation');
  const g = gate.getBoundingClientRect();
  const n = note.getBoundingClientRect();
  const text = note.querySelector('.threshold-invitation__text');
  return { sameParent: note.parentElement === gate.parentElement,
    x: (n.left + n.width / 2 - g.left) / g.width,
    y: (n.top + n.height / 2 - g.top) / g.height,
    widthRatio: n.width / g.width,
    textFits: text.scrollWidth <= text.clientWidth,
    transform: getComputedStyle(gate.parentElement).transform,
    noteVisible: n.left >= 0 && n.right <= innerWidth,
  };
})())`;
const measure = async (session) =>
  JSON.parse(JSON.parse(await run(session, 'eval', measurement)));
async function check(device, width, height) {
  const session = `atp-note-anchor-${device}`;
  await run(session, 'set', 'viewport', String(width), String(height));
  await run(session, 'open', 'http://localhost:3000/');
  await run(session, 'wait', '500');
  const initial = await measure(session);
  const samples = [initial];
  for (const [x, y] of [
    [width * 0.1, height * 0.2],
    [width * 0.9, height * 0.8],
  ]) {
    await run(
      session,
      'mouse',
      'move',
      String(Math.round(x)),
      String(Math.round(y)),
    );
    await run(session, 'wait', '120');
    samples.push(await measure(session));
    await run(session, 'wait', '850');
    samples.push(await measure(session));
  }
  await run(session, 'screenshot', resolve(review, `${device}.png`));
  await run(session, 'snapshot', '-i');
  await run(
    session,
    'find',
    'role',
    'button',
    'click',
    '--name',
    'Empieza a abrazar tu paz: entrar al jardín',
    '--exact',
  );
  await run(session, 'wait', '250');
  samples.push(await measure(session));
  await run(session, 'wait', '1350');
  const scene = await run(
    session,
    'eval',
    "document.querySelector('.scene').dataset.scene",
  );
  const errors = await run(session, 'errors');
  const drift = Math.max(
    ...samples.map((s) =>
      Math.max(
        Math.abs(s.x - initial.x),
        Math.abs(s.y - initial.y),
        Math.abs(s.widthRatio - initial.widthRatio),
      ),
    ),
  );
  const result = {
    device,
    initial,
    samples,
    maxNormalizedDrift: drift,
    scene,
    errors,
    pass:
      samples.every((s) => s.sameParent && s.textFits) &&
      initial.noteVisible &&
      drift < 0.00001 &&
      scene.includes('jardin') &&
      !errors,
  };
  await run(session, 'close');
  return result;
}
const results = await Promise.all([
  check('desktop', 1440, 900),
  check('mobile', 390, 844),
]);
const report = {
  checkedAt: new Date().toISOString(),
  results,
  pass: results.every((r) => r.pass),
};
writeFileSync(
  resolve(root, 'docs/review/note-anchor-verification.json'),
  JSON.stringify(report, null, 2) + '\n',
);
console.log(JSON.stringify(report, null, 2));
if (!report.pass) process.exitCode = 1;
