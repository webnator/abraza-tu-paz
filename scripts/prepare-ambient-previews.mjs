import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { mkdir, readFile, writeFile, stat } from 'node:fs/promises';
import { resolve, join } from 'node:path';

const exec = promisify(execFile);
const output = resolve(
  import.meta.dirname,
  '../../research/audio-proposals-v1',
);
const sources = join(output, 'sources');
await mkdir(sources, { recursive: true });
const recordings = [
  {
    id: 'garden',
    author: 'GirlWithSoundRecorder',
    title: 'I Want Spring Again – Spring Garden Soundscape',
    page: 'https://freesound.org/people/GirlWithSoundRecorder/sounds/843137/',
  },
  {
    id: 'brook',
    author: 'Funky_Audio',
    title: 'WATRFlow_small stream babbling CU_Funky Audio_FASS',
    page: 'https://freesound.org/people/Funky_Audio/sounds/703167/',
  },
  {
    id: 'room',
    author: 'artemditkovsky',
    title: 'Room Tone Small Apartment',
    page: 'https://freesound.org/people/artemditkovsky/sounds/860933/',
  },
  {
    id: 'bowl',
    author: 's-light',
    title: 'singing bowl - single strike 4',
    page: 'https://freesound.org/people/s-light/sounds/415137/',
  },
];

for (const recording of recordings) {
  const file = join(sources, `${recording.id}.mp3`);
  if (await stat(file).catch(() => null)) continue;
  const response = await fetch(recording.page);
  if (!response.ok) throw new Error(`Cannot read source: ${recording.page}`);
  const html = await response.text();
  const url = html.match(
    /https:\/\/cdn\.freesound\.org\/previews\/[^"'\s<>]+-hq\.mp3/,
  )?.[0];
  if (!url || !html.includes('creativecommons.org/publicdomain/zero/1.0'))
    throw new Error(`Missing public preview or CC0 license: ${recording.page}`);
  const audio = await fetch(url);
  if (!audio.ok) throw new Error(`Cannot download preview: ${url}`);
  await writeFile(file, new Uint8Array(await audio.arrayBuffer()));
  await writeFile(
    join(sources, `${recording.id}.source.json`),
    JSON.stringify(
      {
        ...recording,
        url,
        license: 'CC0-1.0',
        licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
        downloadedAt: new Date().toISOString(),
      },
      null,
      2,
    ),
  );
}

const ffmpeg = async (args) =>
  exec('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', ...args]);
const wave = ['-ar', '48000', '-ac', '2', '-c:a', 'pcm_s24le'];
const mp3 = ['-ar', '48000', '-ac', '2', '-c:a', 'libmp3lame', '-b:a', '192k'];
const gardenMaster = join(output, 'garden-master.wav');
const entranceMaster = join(output, 'entrance-master.wav');
const refugeMaster = join(output, 'refuge-master.wav');
const gardenGraph = [
  '[0:a]atrim=start=65:duration=30,asetpts=PTS-STARTPTS,highpass=f=150,lowpass=f=10000,acompressor=threshold=0.063:ratio=2.4:attack=15:release=250,volume=0.75[birds]',
  '[1:a]atrim=start=18:duration=30,asetpts=PTS-STARTPTS,highpass=f=80,lowpass=f=7000,acompressor=threshold=0.05:ratio=2.7:attack=10:release=240,volume=0.6[water]',
  '[birds][water]amix=inputs=2:normalize=0,loudnorm=I=-25:TP=-6:LRA=8[out]',
].join(';');
await ffmpeg([
  '-i',
  join(sources, 'garden.mp3'),
  '-i',
  join(sources, 'brook.mp3'),
  '-filter_complex',
  gardenGraph,
  '-map',
  '[out]',
  '-t',
  '30',
  ...wave,
  gardenMaster,
]);
await ffmpeg([
  '-i',
  gardenMaster,
  '-af',
  'highpass=f=100,lowpass=f=1800,lowpass=f=1800,extrastereo=m=0.5,volume=0.7',
  ...wave,
  entranceMaster,
]);
const refugeGraph = [
  '[0:a]lowpass=f=2200,extrastereo=m=0.65,volume=0.16[outside]',
  '[1:a]atrim=start=20:duration=30,asetpts=PTS-STARTPTS,highpass=f=100,lowpass=f=3500,loudnorm=I=-36:TP=-9:LRA=5[room]',
  '[2:a]highpass=f=130,lowpass=f=7000,afade=t=in:d=0.025,volume=0.16,adelay=5000|5000[bell]',
  '[outside][room][bell]amix=inputs=3:normalize=0:duration=longest,alimiter=limit=0.5:level=false[out]',
].join(';');
await ffmpeg([
  '-i',
  gardenMaster,
  '-i',
  join(sources, 'room.mp3'),
  '-i',
  join(sources, 'bowl.mp3'),
  '-filter_complex',
  refugeGraph,
  '-map',
  '[out]',
  '-t',
  '30',
  ...wave,
  refugeMaster,
]);

const previews = [
  {
    name: '01-entrada.mp3',
    master: entranceMaster,
    purpose:
      'Jardín amortiguado tras el umbral; menor apertura estéreo y agudos filtrados.',
  },
  {
    name: '02-jardin.mp3',
    master: gardenMaster,
    purpose: 'Agua cercana, aves e insectos de jardín, sin música añadida.',
  },
  {
    name: '03-refugio.mp3',
    master: refugeMaster,
    purpose:
      'Ambiente interior sereno, jardín distante y un único toque de cuenco a los 5 segundos.',
  },
];
for (const preview of previews)
  await ffmpeg([
    '-i',
    preview.master,
    '-af',
    'volume=5dB,afade=t=in:d=0.8,afade=t=out:st=28:d=2',
    ...mp3,
    join(output, preview.name),
  ]);
const journey = join(output, '00-recorrido-preview.mp3');
await ffmpeg([
  '-i',
  entranceMaster,
  '-i',
  gardenMaster,
  '-i',
  refugeMaster,
  '-filter_complex',
  '[0:a][1:a]acrossfade=d=2:c1=tri:c2=tri[a];[a][2:a]acrossfade=d=2:c1=tri:c2=tri,volume=5dB,afade=t=in:d=0.8,afade=t=out:st=84:d=2[out]',
  '-map',
  '[out]',
  ...mp3,
  journey,
]);

const outputs = [];
for (const name of [
  '00-recorrido-preview.mp3',
  ...previews.map((x) => x.name),
]) {
  const file = join(output, name);
  const probe = JSON.parse(
    (
      await exec('ffprobe', [
        '-v',
        'error',
        '-show_entries',
        'format=duration:stream=sample_rate,channels',
        '-of',
        'json',
        file,
      ])
    ).stdout,
  );
  const analysis = await exec('ffmpeg', [
    '-hide_banner',
    '-i',
    file,
    '-af',
    'volumedetect',
    '-f',
    'null',
    '-',
  ]);
  outputs.push({
    name,
    path: file,
    ...probe,
    levels: analysis.stderr.match(/(?:mean|max)_volume: [^\n]+/g),
  });
}
const manifest = {
  createdAt: new Date().toISOString(),
  status: 'audio-proposals-for-review-not-integrated',
  durationPerScene: 30,
  previewGainDb: 5,
  journey: {
    duration: 86,
    entrance: '0–30 s',
    garden: '28–58 s',
    refuge: '56–86 s',
    crossfades: 2,
  },
  recordings: await Promise.all(
    recordings.map(async (recording) => ({
      ...recording,
      ...JSON.parse(
        await readFile(join(sources, `${recording.id}.source.json`), 'utf8'),
      ),
    })),
  ),
  recipes: {
    gardenGraph,
    entrance: 'highpass=100; lowpass=1800 twice; stereo width=0.5; volume=0.7',
    refugeGraph,
  },
  previews,
  outputs,
};
await writeFile(
  join(output, 'manifest.json'),
  JSON.stringify(manifest, null, 2) + '\n',
);
console.log(
  JSON.stringify({ output, status: manifest.status, outputs }, null, 2),
);
