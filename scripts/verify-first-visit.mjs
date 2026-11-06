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
const waitForReply = (session) =>
  run(
    session,
    'wait',
    '--fn',
    "!document.querySelector('.conversation__typing')",
  );
const reply = async (session, name) => {
  await click(session, name);
  await waitForReply(session);
};
const check = (condition, message) => {
  if (!condition) throw new Error(message);
};
const read = async (session) =>
  JSON.parse(
    JSON.parse(
      await run(
        session,
        'eval',
        `JSON.stringify((() => {
  const intro = document.querySelector('.first-visit');
  const chat = document.querySelector('.conversation-widget');
  const box = intro?.getBoundingClientRect();
  const cb = chat?.getBoundingClientRect();
  const photo = intro?.querySelector('img');
  const link = chat?.querySelector('a[href^="https://wa.me/"]');
  return {
    intro: !!intro,
    centered: !intro || (Math.abs(box.left + box.width / 2 - innerWidth / 2) < 2 && Math.abs(box.top + box.height / 2 - innerHeight / 2) < 2),
    blurred: !!intro && getComputedStyle(document.querySelector('.first-visit-backdrop')).backdropFilter.includes('blur(6px)'),
    introFits: !intro || (box.top >= -1 && box.bottom <= innerHeight + 1 && box.left >= -1 && box.right <= innerWidth + 1 && intro.scrollWidth <= intro.clientWidth),
    photoLoaded: !!photo?.complete && photo.naturalWidth > 0,
    seen: localStorage.getItem('abraza-tu-paz:welcome-seen:v1'),
    chat: !!chat,
    typing: !!chat?.querySelector('.conversation__typing'),
    chatFits: !chat || (cb.top >= -1 && cb.bottom <= innerHeight + 1 && cb.left >= -1 && cb.right <= innerWidth + 1 && chat.scrollWidth <= chat.clientWidth),
    chatAppearance: !chat || (getComputedStyle(chat).backgroundColor === 'rgb(233, 223, 204)' && parseFloat(getComputedStyle(chat.querySelector('h2')).fontSize) <= 28 && getComputedStyle(chat.querySelector('[data-speaker="gabriela"]')).color === 'rgb(52, 72, 58)'),
    focusInsideChat: !!chat?.contains(document.activeElement),
    messages: [...document.querySelectorAll('.conversation__message')].map(x => ({speaker:x.dataset.speaker,text:x.textContent.trim()})),
    launcher: !!document.querySelector('.conversation-launcher'),
    whatsapp: link?.href,
    whatsappTarget: link?.target,
    scene: document.querySelector('.scene:not(.scene--arriving)')?.dataset.scene,
    path: location.pathname,
    reader: !!document.querySelector('.editorial-overlay'),
    focus: document.activeElement?.getAttribute('aria-label'),
  };
})())`,
      ),
    ),
  );

async function visit(device, width, height) {
  const session = `atp-first-visit-${device}`;
  try {
    await run(session, 'set', 'viewport', String(width), String(height));
    await run(session, 'open', 'http://localhost:3000/');
    check(
      !(await read(session)).intro,
      `${device}: intro appeared without waiting`,
    );
    await run(session, 'wait', '2800');
    const initial = await read(session);
    check(
      initial.intro &&
        initial.centered &&
        initial.blurred &&
        initial.introFits &&
        initial.photoLoaded &&
        initial.seen === '1',
      `${device}: centered introduction failed`,
    );
    await run(session, 'screenshot', resolve(review, `${device}-welcome.png`));
    await run(session, 'snapshot', '-i');
    await click(session, 'Conversar conmigo');
    await run(session, 'wait', '400');
    const started = await read(session);
    check(
      !started.intro &&
        started.chat &&
        started.chatFits &&
        started.chatAppearance &&
        started.focusInsideChat &&
        started.messages.length === 2,
      `${device}: intro did not hand focus to chat`,
    );
    await run(session, 'press', 'ArrowRight');
    check(
      (await read(session)).scene === 'entrada',
      `${device}: arrow navigated behind the focused chat`,
    );
    await run(session, 'snapshot', '-i');
    await click(session, 'Busco acompañamiento');
    const pending = await read(session);
    check(
      pending.typing &&
        pending.messages.length === 3 &&
        pending.messages.at(-1).speaker === 'visitor',
      `${device}: reply was not delayed`,
    );
    await run(session, 'screenshot', resolve(review, `${device}-typing.png`));
    await click(session, 'Minimizar conversación');
    await run(session, 'wait', '1800');
    await click(session, 'Retomar conversación con Gabriela');
    await waitForReply(session);
    check(
      (await read(session)).messages.length === 5,
      `${device}: pending reply did not survive minimizing`,
    );
    await reply(session, 'Cómo es tu manera de acompañar');
    const conversation = await read(session);
    check(
      conversation.messages.length === 8 &&
        conversation.messages.filter((m) => m.speaker === 'visitor').length ===
          2 &&
        conversation.messages[0].text.includes('primer lugar'),
      `${device}: messages were replaced instead of appended`,
    );
    await run(
      session,
      'screenshot',
      resolve(review, `${device}-conversation.png`),
    );
    await click(session, 'Minimizar conversación');
    const minimized = await read(session);
    check(
      !minimized.chat && minimized.launcher,
      `${device}: launcher missing after minimize`,
    );
    await click(session, 'Retomar conversación con Gabriela');
    await run(session, 'wait', '300');
    check(
      (await read(session)).messages.length === conversation.messages.length,
      `${device}: conversation lost on reopen`,
    );
    await reply(session, 'Me gustaría consultar una cita');
    const contact = await read(session);
    const url = new URL(contact.whatsapp);
    check(
      url.hostname === 'wa.me' &&
        url.pathname === '/34654325653' &&
        url.searchParams.get('text') ===
          'Hola, me gustaría recibir información sobre las sesiones de Abraza tu Paz.' &&
        contact.whatsappTarget === '_blank',
      `${device}: wrong WhatsApp destination or message`,
    );
    await run(session, 'screenshot', resolve(review, `${device}-contact.png`));
    // Inspect WhatsApp href only. Never open it or send a message during QA.
    await reply(session, 'Quiero mirar otra cosa');
    await reply(session, 'Me vendría bien un recurso');
    await click(session, 'Acercarme a la biblioteca');
    await run(session, 'wait', '600');
    const destination = await read(session);
    check(
      !destination.chat &&
        destination.launcher &&
        destination.scene === 'refugio' &&
        destination.path === '/' &&
        !destination.reader &&
        destination.focus === 'Biblioteca',
      `${device}: library left the existing garden`,
    );
    await click(session, 'Retomar conversación con Gabriela');
    check(
      (await read(session)).messages.length > contact.messages.length,
      `${device}: history was lost during scene change`,
    );
    await run(session, 'press', 'Escape');
    await run(session, 'reload');
    await run(session, 'wait', '2800');
    const returned = await read(session);
    check(
      !returned.intro && returned.launcher && returned.seen === '1',
      `${device}: welcome repeated or launcher missing on return`,
    );
    return {
      device,
      initial,
      started,
      messageCountBeforeMinimize: conversation.messages.length,
      historyResumed: true,
      contactUrl: contact.whatsapp,
      destination,
      returned,
      errors: await run(session, 'errors'),
      pass: true,
    };
  } finally {
    await run(session, 'close');
  }
}

async function deferred() {
  const session = 'atp-first-visit-deferred';
  try {
    await run(session, 'set', 'viewport', '1440', '900');
    await run(session, 'open', 'http://localhost:3000/');
    await run(session, 'snapshot', '-i');
    await click(session, 'Retomar conversación con Gabriela');
    await run(session, 'wait', '2700');
    const manual = await read(session);
    check(
      !manual.intro && manual.chat && manual.seen === '1',
      'manual chat did not suppress automatic intro',
    );
    await click(session, 'Minimizar conversación');
    await click(session, 'Controles de desarrollo');
    await click(session, 'Probar primera visita');
    await click(session, 'Abrir menú');
    await run(session, 'wait', '2800');
    const waiting = await read(session);
    check(
      !waiting.intro && waiting.seen === null && !waiting.chat,
      'intro overlapped the menu',
    );
    await run(session, 'press', 'Escape');
    await run(session, 'wait', '2600');
    check(
      (await read(session)).intro,
      'intro did not resume after menu closed',
    );
    await run(session, 'mouse', 'move', '5', '5');
    await run(session, 'mouse', 'down');
    await run(session, 'mouse', 'up');
    await run(session, 'wait', '300');
    const dismissed = await read(session);
    check(
      !dismissed.intro && dismissed.launcher && dismissed.seen === '1',
      'outside dismissal or persistent launcher failed',
    );
    return {
      manualChatSuppressesIntro: true,
      replay: true,
      deferred: true,
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
  deferred(),
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
