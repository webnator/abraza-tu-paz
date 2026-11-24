import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
const exec = promisify(execFile);
const root = resolve(import.meta.dirname, '..');
const folder = resolve(root, '.impeccable/review/garden-discoveries');
mkdirSync(folder, { recursive: true });
const run = async (session, ...args) =>
  (await exec('agent-browser', ['--session', session, ...args])).stdout.trim();
const read = async (session, source) =>
  JSON.parse(
    JSON.parse(await run(session, 'eval', `JSON.stringify(${source})`)),
  );
const check = (condition, message) => {
  if (!condition) throw new Error(message);
};
async function click(session, selector, focus = true) {
  if (focus) {
    await run(session, 'focus', selector);
    await run(session, 'wait', '400');
  }
  const point = await read(
    session,
    `(()=>{const r=document.querySelector('${selector}').getBoundingClientRect();return[(Math.max(1,r.left)+Math.min(innerWidth-1,r.right))/2,(Math.max(1,r.top)+Math.min(innerHeight-1,r.bottom))/2]})()`,
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
async function close(session) {
  await run(session, 'press', 'Escape');
  await run(
    session,
    'wait',
    '--fn',
    "!document.querySelector('.garden-discovery,.water-pause')",
  );
}
const scene = () =>
  "document.querySelector('.scene:not(.scene--arriving)').dataset.scene";
async function inspect(device, width, height, reduced = false) {
  const session = `atp-discoveries-${device}`;
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
      '[...document.images].every(i=>i.complete&&i.naturalWidth>0)',
    );
    await click(session, '.threshold-invitation');
    check(
      await read(
        session,
        "document.querySelector('.entrance-welcome').textContent.includes('Tú decides hasta dónde llegar hoy')",
      ),
      `${device}: threshold metaphor missing`,
    );
    await run(session, 'press', 'Escape');
    await run(
      session,
      'wait',
      '--fn',
      "!document.querySelector('.entrance-welcome')",
    );
    await click(session, '.passage-zone--entrada');
    await run(
      session,
      'wait',
      '--fn',
      `${scene()}==='jardin' && !document.querySelector('.is-transitioning')`,
    );
    const resting = await read(
      session,
      `({scene:${scene()},audio:document.querySelectorAll('audio').length,oldMessage:!!document.querySelector('.garden-note'),letters:document.querySelectorAll('.scene:not(.scene--arriving) .garden-letter:not(:disabled)').length,anchored:document.querySelector('.garden-letters').closest('.garden-backdrop')!==null})`,
    );
    check(
      resting.audio === 0 &&
        !resting.oldMessage &&
        resting.letters === 3 &&
        resting.anchored,
      `${device}: resting garden has unwanted content or missing letters`,
    );
    await run(session, 'screenshot', resolve(folder, `${device}-garden.png`));
    const titles = [];
    for (let index = 0; index < 3; index++) {
      await click(session, `.garden-letter--${index}`);
      await run(session, 'wait', '.discovery-letter');
      const state = await read(
        session,
        `(()=>{const p=document.querySelector('.garden-discovery'),r=p.getBoundingClientRect();return {title:p.querySelector('.discovery-title').textContent,path:location.pathname,scene:${scene()},fits:r.x>=0&&r.right<=innerWidth+1&&r.y>=0&&r.bottom<=innerHeight+1,draft:p.textContent.includes('propuesta editorial')}})()`,
      );
      check(
        state.path === '/' &&
          state.scene === 'jardin' &&
          state.fits &&
          state.draft,
        `${device}: letter leaves garden, overflows or is falsely attributed`,
      );
      titles.push(state.title);
      if (index === 0)
        await run(
          session,
          'screenshot',
          resolve(folder, `${device}-letter.png`),
        );
      await close(session);
      check(
        await read(
          session,
          `document.activeElement===document.querySelector('.garden-letter--${index}')`,
        ),
        `${device}: letter focus not restored`,
      );
    }
    check(
      new Set(titles).size === 3,
      `${device}: envelopes open the same letter`,
    );
    await click(session, '.garden-object--bench');
    await run(
      session,
      'wait',
      '--fn',
      "document.querySelector('audio')?.duration>1",
    );
    const autoplay = await read(
      session,
      "({paused:document.querySelector('audio').paused,time:document.querySelector('audio').currentTime,duration:document.querySelector('audio').duration,caption:!!document.querySelector('audio track')})",
    );
    check(
      autoplay.paused && autoplay.time === 0 && autoplay.caption,
      `${device}: narration autoplays or has no transcript track`,
    );
    const cameraA = await read(
      session,
      "getComputedStyle(document.querySelector('.scene:not(.scene--arriving) .scene-world')).transform",
    );
    await run(session, 'wait', '300');
    check(
      cameraA ===
        (await read(
          session,
          "getComputedStyle(document.querySelector('.scene:not(.scene--arriving) .scene-world')).transform",
        )),
      `${device}: camera moves during reading`,
    );
    await run(
      session,
      'find',
      'role',
      'button',
      'click',
      '--name',
      'Escuchar la lectura de muestra',
      '--exact',
    );
    await run(
      session,
      'wait',
      '--fn',
      "document.querySelector('audio').currentTime>.2",
    );
    await run(
      session,
      'eval',
      'window.demoNarration=document.querySelector("audio")',
    );
    await run(session, 'screenshot', resolve(folder, `${device}-bench.png`));
    await close(session);
    check(
      await read(session, 'window.demoNarration.paused'),
      `${device}: narration continues after closing`,
    );
    await click(session, '.garden-object--water');
    await run(session, 'wait', '.water-pause');
    const water = await read(
      session,
      "({active:document.querySelector('.experience').dataset.discovery,audio:document.querySelectorAll('audio').length,ripple:getComputedStyle(document.querySelector('.pond-ripples i')).animationName})",
    );
    check(
      water.active === 'water' && water.audio === 0,
      `${device}: water pause starts unapproved audio`,
    );
    check(
      reduced ? water.ripple === 'none' : water.ripple === 'pond-circle',
      `${device}: reduced motion preference ignored`,
    );
    await run(session, 'screenshot', resolve(folder, `${device}-water.png`));
    await close(session);
    await run(session, 'press', 'ArrowRight');
    await run(
      session,
      'wait',
      '--fn',
      `${scene()}==='refugio' && !document.querySelector('.is-transitioning')`,
    );
    await click(session, '.refuge-welcome-object');
    await run(session, 'wait', '.garden-discovery--refuge');
    check(
      await read(
        session,
        "document.querySelector('.garden-discovery').textContent.includes('Hay una silla para ti.')",
      ),
      `${device}: refuge welcome missing`,
    );
    await run(
      session,
      'screenshot',
      resolve(folder, `${device}-refuge-welcome.png`),
    );
    await close(session);
    await click(session, '.menu-trigger', false);
    await run(session, 'wait', '.garden-shortcuts');
    const menu = await read(
      session,
      "(()=>{const p=document.querySelector('.global-menu'),r=p.getBoundingClientRect();return {fits:r.left>=0&&r.right<=innerWidth+1,links:p.querySelectorAll('.garden-shortcuts button').length}})()",
    );
    check(
      menu.fits && menu.links === 3,
      `${device}: garden shortcuts unavailable`,
    );
    await run(
      session,
      'find',
      'role',
      'button',
      'click',
      '--name',
      'Cartas al alma',
      '--exact',
    );
    await run(session, 'wait', '.discovery-letter');
    check(
      await read(
        session,
        `${scene()}==='jardin' && location.pathname==='/' && !document.querySelector('.editorial-overlay')`,
      ),
      `${device}: shortcut opens a separate page`,
    );
    await close(session);
    return {
      device,
      resting,
      titles,
      audioDuration: autoplay.duration,
      audioStopsOnClose: true,
      water,
      menu,
      errors: await run(session, 'errors'),
      pass: true,
    };
  } catch (error) {
    await run(session, 'screenshot', resolve(folder, `${device}-failure.png`));
    console.log(device, await run(session, 'snapshot', '-i'));
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
  resolve(root, 'docs/review/garden-discoveries-verification.json'),
  JSON.stringify(report, null, 2) + '\n',
);
for (const r of report.results)
  console.log(r.device ? `${r.device}: passed` : r.error);
if (!report.pass) process.exitCode = 1;
