# Propuesta de ambiente sonoro — 6 de noviembre de 2026

Estado: **primera propuesta escuchada; no encaja y se deja pendiente buscar otra dirección más adelante**. Las muestras se conservan como referencia, sin integrar en la web. No hay reproducción automática, reproductor ni archivos de sonido en `public/`.

## Muestras

Se conservan en `../research/audio-proposals-v1/`, junto a los másteres WAV de trabajo, fuentes descargadas, procedencias y `manifest.json`.

- `01-entrada.mp3`, 30s: el mismo jardín oído desde fuera, con agudos filtrados por encima de 1800Hz, menor amplitud estéreo y volumen amortiguado.
- `02-jardin.mp3`, 30s: aves e insectos de jardín mezclados con un arroyo pequeño. Ecualización y compresión suaves para contener transitorios.
- `03-refugio.mp3`, 30s: ambiente interior, jardín lejano y un solo toque suave de cuenco a los 5s.
- `00-recorrido-preview.mp3`, 86s: entrada → jardín → refugio, con fundidos cruzados de 2s. El jardín entra a los 28s y el refugio a los 56s. Las versiones de escucha llevan 5dB adicionales respecto al máster de trabajo para poder valorarlas cómodamente; el volumen de una futura integración se decidirá después de la escucha.

Todos los MP3 son estéreo, 48kHz y 192kbps. Picos medidos: entrada −14.1dBFS, jardín −6.2dBFS y refugio −11.1dBFS. Sin saturación de muestras. Se han verificado duración, canales, codificación, niveles y fundidos. La valoración subjetiva del ambiente queda para la escucha del usuario.

## Grabaciones y procedencia

Las cuatro páginas de sus autores indican **CC0**. Se utilizan sus preescuchas MP3 públicas de alta calidad, no se presentan como descargas WAV originales. Los enlaces exactos y licencias quedan registrados junto a cada archivo fuente.

| Función | Grabación | Autor |
| --- | --- | --- |
| Aves e insectos | [I Want Spring Again – Spring Garden Soundscape](https://freesound.org/people/GirlWithSoundRecorder/sounds/843137/) | GirlWithSoundRecorder |
| Agua | [Small stream babbling](https://freesound.org/people/Funky_Audio/sounds/703167/) | Funky_Audio |
| Interior | [Room Tone Small Apartment](https://freesound.org/people/artemditkovsky/sounds/860933/) | artemditkovsky |
| Cuenco | [Singing bowl — single strike 4](https://freesound.org/people/s-light/sounds/415137/) | s-light |

## Reproducir y continuar

`node scripts/prepare-ambient-previews.mjs` descarga las fuentes públicas que falten, produce las tres propuestas, el recorrido y el manifiesto con filtros y mediciones. Requiere FFmpeg/FFprobe; no necesita claves ni un servicio de generación de audio.

Pendiente: retomar la búsqueda y la dirección sonora cuando lo indique el usuario. No integrar estas muestras por defecto. Después de validar otra propuesta, integrar mediante activación voluntaria, control de silencio y transiciones continuas por escena.
