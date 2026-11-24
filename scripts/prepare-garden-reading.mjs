// Run on macOS with: node --experimental-strip-types scripts/prepare-garden-reading.mjs
// Temporary review narration. This is a system voice, never Gabriela's voice.
import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { benchReading } from '../lib/garden-discoveries.ts';

const root = resolve(import.meta.dirname, '..');
const work = resolve(root, '../research/audio-garden-demo-v1');
const output = resolve(root, 'public', benchReading.audio.slice(1));
mkdirSync(work, { recursive: true });
mkdirSync(resolve(root, 'public/audio'), { recursive: true });
const text = resolve(work, 'lectura.txt');
const master = resolve(work, 'lectura-monica.aiff');
writeFileSync(text, benchReading.transcript + '\n');
execFileSync('say', ['-v', 'Mónica', '-r', '142', '-f', text, '-o', master]);
execFileSync('ffmpeg', [
  '-y',
  '-hide_banner',
  '-loglevel',
  'error',
  '-i',
  master,
  '-af',
  'loudnorm=I=-20:TP=-3:LRA=6',
  '-c:a',
  'libmp3lame',
  '-b:a',
  '128k',
  output,
]);
const metadata = JSON.parse(
  execFileSync(
    'ffprobe',
    ['-v', 'quiet', '-show_format', '-show_streams', '-of', 'json', output],
    { encoding: 'utf8' },
  ),
);
const manifest = {
  status: 'temporary-review-narration',
  voice: 'macOS Mónica (es_ES), system speech synthesis; not Gabriela',
  wordsPerMinute: 142,
  transcript: benchReading.transcript,
  output: benchReading.audio,
  duration: Number(metadata.format.duration),
  processing: 'MP3 128kbps; loudnorm I=-20 LUFS, TP=-3dB, LRA=6',
  replacement: 'Gabriela to approve the copy and supply the final recording.',
};
const durationMs = Math.floor(manifest.duration * 1000);
const end = `00:${String(Math.floor(durationMs / 60000)).padStart(2, '0')}:${String(Math.floor(durationMs / 1000) % 60).padStart(2, '0')}.${String(durationMs % 1000).padStart(3, '0')}`;
writeFileSync(
  output.replace(/\.mp3$/, '.vtt'),
  `WEBVTT\n\n00:00.000 --> ${end}\n${benchReading.transcript}\n`,
);
writeFileSync(
  output + '.provenance.json',
  JSON.stringify(manifest, null, 2) + '\n',
);
writeFileSync(
  resolve(work, 'manifest.json'),
  JSON.stringify(manifest, null, 2) + '\n',
);
console.log(
  JSON.stringify({
    output,
    duration: manifest.duration,
    voice: manifest.voice,
  }),
);
