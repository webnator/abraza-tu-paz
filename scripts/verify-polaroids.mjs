import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const exec = promisify(execFile);
const root = resolve(import.meta.dirname, '..');
const review = resolve(root, '.impeccable/review/polaroids');
mkdirSync(review, { recursive: true });
const captions = [
  'Loreto · 2026',
  'Proyecto Cuaderno Solidario',
  'Noviembre 2025',
  'Tailandia',
  'Septiembre 2026',
  'París',
  'Disney',
];
const run = async (session, ...args) =>
  (await exec('agent-browser', ['--session', session, ...args])).stdout.trim();
const readState = `JSON.stringify((() => {
  const photo = document.querySelector('.polaroid img');
  const box = photo.getBoundingClientRect();
  const panel = document.querySelector('.editorial-scroll');
  return {
    caption: document.querySelector('.photo-stories__text h3').textContent,
    selected: document.querySelector('.photo-stories__choices [aria-pressed="true"]').textContent,
    loaded: photo.complete && photo.naturalWidth > 0,
    naturalRatio: photo.naturalWidth / photo.naturalHeight,
    // BoundingClientRect includes the authored -3deg paper rotation.
    // The untransformed image box is the relevant distortion check.
    renderedRatio: photo.clientWidth / photo.clientHeight,
    withinViewport: box.left >= 0 && box.right <= innerWidth,
    overflow: panel.scrollWidth > panel.clientWidth,
    count: document.querySelector('.photo-controls span').textContent.trim(),
  };
})())`;
const decode = `Promise.all([...document.querySelectorAll('.polaroid img')].map(img => img.decode())).then(() => true)`;
const show = (selector) =>
  `document.querySelector(${JSON.stringify(selector)}).scrollIntoView({behavior:'instant', block:'start'})`;

async function check(device, width, height) {
  const session = `atp-polaroids-${device}`;
  const states = [];
  await run(session, 'set', 'viewport', String(width), String(height));
  await run(session, 'open', 'http://localhost:3000/gabriela#polaroids');
  await run(session, 'wait', '500');
  await run(session, 'snapshot', '-i');
  for (const [i, caption] of captions.entries()) {
    await run(
      session,
      'find',
      'role',
      'button',
      'click',
      '--name',
      caption,
      '--exact',
    );
    await run(session, 'eval', decode);
    await run(session, 'eval', show('.photo-stories'));
    const state = JSON.parse(JSON.parse(await run(session, 'eval', readState)));
    state.pass =
      state.caption === caption &&
      state.selected === caption &&
      state.loaded &&
      state.withinViewport &&
      !state.overflow &&
      Math.abs(state.naturalRatio - state.renderedRatio) < 0.005;
    states.push(state);
    await run(session, 'screenshot', resolve(review, `${device}-${i + 1}.png`));
    await run(session, 'snapshot', '-i');
  }
  await run(
    session,
    'find',
    'role',
    'button',
    'click',
    '--name',
    'Fotografía siguiente',
    '--exact',
  );
  const nextWrap =
    JSON.parse(JSON.parse(await run(session, 'eval', readState))).caption ===
    captions[0];
  await run(
    session,
    'find',
    'role',
    'button',
    'click',
    '--name',
    'Fotografía anterior',
    '--exact',
  );
  const previousWrap =
    JSON.parse(JSON.parse(await run(session, 'eval', readState))).caption ===
    captions.at(-1);
  await run(
    session,
    'find',
    'role',
    'button',
    'click',
    '--name',
    captions[1],
    '--exact',
  );
  await run(session, 'snapshot', '-i');
  await run(
    session,
    'find',
    'role',
    'link',
    'click',
    '--name',
    'Conocer Cuaderno Solidario',
    '--exact',
  );
  await run(session, 'wait', '500');
  const projectUrl = await run(session, 'get', 'url');
  await run(session, 'screenshot', resolve(review, `${device}-proyecto.png`));
  await run(session, 'open', 'http://localhost:3000/gabriela#polaroids');
  await run(session, 'wait', '500');
  if (device === 'mobile') {
    await run(
      session,
      'eval',
      "document.documentElement.style.fontSize = '200%'",
    );
    await run(session, 'eval', show('.photo-stories__choices'));
    await run(session, 'screenshot', resolve(review, 'mobile-200.png'));
  }
  const finalState = JSON.parse(
    JSON.parse(await run(session, 'eval', readState)),
  );
  const errors = await run(session, 'errors');
  return {
    device,
    states,
    nextWrap,
    previousWrap,
    projectUrl,
    textZoomOverflow: finalState.overflow,
    errors,
    pass:
      states.every((s) => s.pass) &&
      nextWrap &&
      previousWrap &&
      projectUrl.endsWith('/proyectos#cuaderno-solidario') &&
      !finalState.overflow &&
      !errors,
  };
}
const results = await Promise.all([
  check('desktop', 1440, 900),
  check('mobile', 390, 844),
]);
const report = {
  checkedAt: new Date().toISOString(),
  results,
  pass: results.every((result) => result.pass),
};
writeFileSync(
  resolve(root, 'docs/review/polaroids-verification.json'),
  JSON.stringify(report, null, 2) + '\n',
);
console.log(JSON.stringify(report, null, 2));
if (!report.pass) process.exitCode = 1;
