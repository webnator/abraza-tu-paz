import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const exec = promisify(execFile);
const root = resolve(import.meta.dirname, '..');
const review = resolve(root, '.impeccable/review/polaroids-immersive');
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
  const panel = document.querySelector('.refuge-album');
  const panelBox = panel.getBoundingClientRect();
  return {
    caption: document.querySelector('.refuge-photos__caption h3').textContent,
    selected: document.querySelector('.refuge-photos__choices [aria-pressed="true"]').getAttribute('aria-label'),
    loaded: photo.complete && photo.naturalWidth > 0,
    naturalRatio: photo.naturalWidth / photo.naturalHeight,
    // BoundingClientRect includes the authored -3deg paper rotation.
    // The untransformed image box is the relevant distortion check.
    renderedRatio: photo.clientWidth / photo.clientHeight,
    withinViewport: box.left >= 0 && box.right <= innerWidth,
    popupOnScreen: panelBox.left >= -1 && panelBox.right <= innerWidth + 1 && panelBox.top >= -1 && panelBox.bottom <= innerHeight + 1,
    overflow: panel.scrollWidth > panel.clientWidth,
    count: document.querySelector('.photo-controls span').textContent.trim(),
    scene: document.querySelector('.scene:not(.scene--arriving)')?.dataset.scene,
    reader: !!document.querySelector('.editorial-overlay'),
    path: location.pathname,
    transparent: getComputedStyle(panel).backgroundColor === 'rgba(0, 0, 0, 0)',
  };
})())`;
const decode = `Promise.all([...document.querySelectorAll('.polaroid img')].map(img => img.decode())).then(() => true)`;
const stage = `JSON.stringify({ scene: document.querySelector('.scene:not(.scene--arriving)')?.dataset.scene, transition: !!document.querySelector('.scene--departing'), reader: !!document.querySelector('.editorial-overlay'), album: !!document.querySelector('.refuge-album'), focus: document.activeElement?.getAttribute('aria-label'), parallax: document.querySelector('.experience')?.style.getPropertyValue('--back-x') })`;
const readStage = async (session) =>
  JSON.parse(JSON.parse(await run(session, 'eval', stage)));
const click = (session, name) =>
  run(session, 'find', 'role', 'button', 'click', '--name', name, '--exact');

async function check(device, width, height) {
  const session = `atp-album-${device}`;
  const states = [];
  await run(session, 'set', 'viewport', String(width), String(height));
  await run(session, 'set', 'media', 'light');
  await run(session, 'open', 'http://localhost:3000/');
  await run(session, 'snapshot', '-i');
  await click(session, 'Entrar al jardín por la verja');
  const thresholdAnimated = (await readStage(session)).transition;
  await run(session, 'wait', '1650');
  const garden = await readStage(session);
  await run(session, 'screenshot', resolve(review, `${device}-jardin.png`));
  await run(session, 'snapshot', '-i');
  await click(session, 'Entrar al refugio al final del sendero');
  const gardenAnimated = (await readStage(session)).transition;
  await run(session, 'wait', '1900');
  const refuge = await readStage(session);
  await run(session, 'screenshot', resolve(review, `${device}-refugio.png`));
  await run(session, 'snapshot', '-i');
  await click(session, 'Mi historia');
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
    const state = JSON.parse(JSON.parse(await run(session, 'eval', readState)));
    state.pass =
      state.caption === caption &&
      state.selected === caption &&
      state.loaded &&
      state.withinViewport &&
      state.popupOnScreen &&
      state.transparent &&
      state.path === '/' &&
      state.scene === 'refugio' &&
      !state.reader &&
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
  await run(session, 'press', 'Escape');
  await run(session, 'wait', '300');
  const closed = await readStage(session);
  await run(
    session,
    'mouse',
    'move',
    String(Math.round(width * 0.85)),
    String(Math.round(height * 0.55)),
  );
  const moving = await readStage(session);
  await run(session, 'screenshot', resolve(review, `${device}-de-vuelta.png`));
  await run(session, 'snapshot', '-i');
  await click(session, 'Volver al jardín desde el refugio');
  await run(session, 'wait', '1900');
  const backToGarden = await readStage(session);
  await run(session, 'open', 'http://localhost:3000/gabriela#polaroids');
  await run(session, 'wait', '800');
  const legacyLink = JSON.parse(
    JSON.parse(await run(session, 'eval', readState)),
  );
  if (device === 'mobile') {
    await run(
      session,
      'eval',
      "document.documentElement.style.fontSize = '200%'",
    );
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
    thresholdAnimated,
    gardenAnimated,
    garden,
    refuge,
    closed,
    moving,
    backToGarden,
    legacyLink,
    textZoomOverflow: finalState.overflow,
    errors,
    pass:
      states.every((s) => s.pass) &&
      nextWrap &&
      previousWrap &&
      thresholdAnimated &&
      gardenAnimated &&
      garden.scene === 'jardin' &&
      refuge.scene === 'refugio' &&
      !closed.album &&
      !closed.reader &&
      closed.scene === 'refugio' &&
      closed.focus === 'Mi historia' &&
      moving.parallax !== '0px' &&
      backToGarden.scene === 'jardin' &&
      legacyLink.path === '/' &&
      legacyLink.transparent &&
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
