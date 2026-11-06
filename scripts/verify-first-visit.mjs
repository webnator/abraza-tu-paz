import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const exec = promisify(execFile);
const root = resolve(import.meta.dirname, '..');
const review = resolve(root, '.impeccable/review/first-visit');
mkdirSync(review, { recursive: true });
const run = async (session, ...args) =>
  (await exec('agent-browser', ['--session', session, ...args])).stdout.trim();
const click = (session, name) =>
  run(session, 'find', 'role', 'button', 'click', '--name', name, '--exact');
const read = async (session) =>
  JSON.parse(
    JSON.parse(
      await run(
        session,
        'eval',
        `JSON.stringify((() => {
  const dialog = document.querySelector('.first-visit');
  const box = dialog?.getBoundingClientRect();
  const photo = dialog?.querySelector('img');
  return {
    open: !!dialog,
    seen: localStorage.getItem('abraza-tu-paz:welcome-seen:v1'),
    scene: document.querySelector('.scene:not(.scene--arriving)')?.dataset.scene,
    path: location.pathname,
    reader: !!document.querySelector('.editorial-overlay'),
    focus: document.activeElement?.getAttribute('aria-label'),
    focusInside: dialog?.contains(document.activeElement) ?? false,
    fits: !dialog || (box.left >= -1 && box.right <= innerWidth + 1 && box.top >= -1 && box.bottom <= innerHeight + 1 && dialog.scrollWidth <= dialog.clientWidth),
    photoLoaded: !!photo?.complete && photo.naturalWidth > 0,
    response: dialog?.querySelector('.first-visit__question')?.textContent,
  };
})())`,
      ),
    ),
  );
const check = (condition, message) => {
  if (!condition) throw new Error(message);
};

async function visit(device, width, height) {
  const session = `atp-first-visit-${device}`;
  try {
    await run(session, 'set', 'viewport', String(width), String(height));
    await run(session, 'open', 'http://localhost:3000/');
    const early = await read(session);
    check(!early.open, `${device}: welcome appeared before the delay`);
    await run(session, 'wait', '2800');
    const initial = await read(session);
    check(
      initial.open &&
        initial.seen === '1' &&
        initial.fits &&
        initial.photoLoaded &&
        initial.focusInside,
      `${device}: initial welcome failed`,
    );
    await run(session, 'screenshot', resolve(review, `${device}-welcome.png`));
    await run(session, 'press', 'ArrowRight');
    check(
      (await read(session)).scene === 'entrada',
      `${device}: arrow navigated behind welcome`,
    );
    await run(session, 'snapshot', '-i');
    await click(session, 'Quiero explorar con calma');
    check(
      (await read(session)).response === 'Pues vamos a tu ritmo.',
      `${device}: explore reply missing`,
    );
    await click(session, 'Volver a la pregunta');
    await click(session, 'Me vendría bien un recurso');
    check(
      (await read(session)).response === 'Quizás encuentres algo para hoy.',
      `${device}: resource reply missing`,
    );
    await run(session, 'screenshot', resolve(review, `${device}-reply.png`));

    if (device === 'mobile') {
      await click(session, 'Acercarme a la biblioteca');
      await run(session, 'wait', '600');
      const destination = await read(session);
      check(
        !destination.open &&
          destination.scene === 'refugio' &&
          destination.path === '/' &&
          !destination.reader &&
          destination.focus === 'Biblioteca',
        'mobile: resource did not lead to the existing refuge object',
      );
      return {
        device,
        early,
        initial,
        destination,
        errors: await run(session, 'errors'),
        pass: true,
      };
    }

    await click(session, 'Volver a la pregunta');
    await click(session, 'Quiero explorar con calma');
    await click(session, 'Seguir mirando');
    await run(session, 'wait', '250');
    const explored = await read(session);
    check(
      !explored.open && explored.scene === 'entrada',
      'desktop: explore changed the scene',
    );
    await run(session, 'reload');
    await run(session, 'wait', '2800');
    const returned = await read(session);
    check(
      !returned.open && returned.seen === '1',
      'desktop: welcome repeated on return',
    );
    await run(session, 'snapshot', '-i');
    await click(session, 'Controles de desarrollo');
    await click(session, 'Probar primera visita');
    await run(session, 'wait', '700');
    check(!(await read(session)).open, 'desktop: replay skipped the delay');
    await run(session, 'wait', '1800');
    check((await read(session)).open, 'desktop: replay did not reopen');
    await run(session, 'snapshot', '-i');
    await click(session, 'Busco acompañamiento');
    check(
      (await read(session)).response === 'Podemos empezar por ahí.',
      'desktop: therapy reply missing',
    );
    await click(session, 'Conocer cómo acompaño');
    await run(session, 'wait', '600');
    const destination = await read(session);
    check(
      !destination.open &&
        destination.scene === 'refugio' &&
        destination.path === '/' &&
        !destination.reader &&
        destination.focus === 'Terapia',
      'desktop: therapy did not lead to the existing refuge object',
    );
    return {
      device,
      early,
      initial,
      explored,
      returned,
      replay: true,
      destination,
      errors: await run(session, 'errors'),
      pass: true,
    };
  } finally {
    await run(session, 'close');
  }
}

async function defer() {
  const session = 'atp-first-visit-deferred';
  try {
    await run(session, 'set', 'viewport', '1440', '900');
    await run(session, 'open', 'http://localhost:3000/');
    await run(session, 'snapshot', '-i');
    await click(session, 'Abrir menú');
    await run(session, 'wait', '2800');
    const deferred = await read(session);
    check(
      !deferred.open && deferred.seen === null,
      'welcome overlapped menu or was marked seen without showing',
    );
    await run(session, 'press', 'Escape');
    await run(session, 'wait', '2600');
    check(
      (await read(session)).open,
      'welcome did not resume after menu closed',
    );
    await run(session, 'mouse', 'move', '5', '5');
    await run(session, 'mouse', 'down');
    await run(session, 'mouse', 'up');
    await run(session, 'wait', '300');
    const dismissed = await read(session);
    check(
      !dismissed.open &&
        dismissed.scene === 'entrada' &&
        dismissed.seen === '1',
      'outside dismissal failed',
    );
    await run(session, 'reload');
    await run(session, 'wait', '2800');
    check(!(await read(session)).open, 'outside dismissal was not remembered');
    return {
      deferred,
      dismissed,
      errors: await run(session, 'errors'),
      pass: true,
    };
  } finally {
    await run(session, 'close');
  }
}

const results = await Promise.allSettled([
  visit('desktop', 1440, 900),
  visit('mobile', 390, 844),
  defer(),
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
  resolve(root, 'docs/review/first-visit-verification.json'),
  JSON.stringify(report, null, 2) + '\n',
);
console.log(JSON.stringify(report, null, 2));
if (!report.pass) process.exitCode = 1;
