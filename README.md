# Abraza tu Paz

Una experiencia inmersiva de tres espacios —entrada, jardín y refugio— con acceso directo al contenido mediante un menú editorial.

## Desarrollo local

```sh
npm run dev -- --port 3000
```

Se utiliza el proyecto React/Vinext existente y su configuración de Sites. Esta iteración no se ha desplegado.

El botón `</>` de la esquina inferior izquierda abre las variantes de desarrollo: cartel de papel o madera clavada, estrellas talladas y tipografía del menú. Las elecciones se recuerdan en este navegador. El panel y sus preferencias locales no se aplican al build de producción; allí se conserva el papel y se utiliza Cormorant para el menú.

La primera visita muestra una bienvenida centrada de Gabriela tras 2,2 segundos y recuerda que fue vista mediante `localStorage`. «Conversar conmigo» abre un chat guiado que acumula las respuestas; al minimizar queda una bolita para retomarlo durante la visita. El hilo no se guarda en almacenamiento persistente. «Probar primera visita» en el panel de desarrollo permite repetir la bienvenida y reiniciar el hilo. Texto y comportamiento se documentan en `docs/reference/bienvenida-jardin.md`; `node scripts/verify-first-visit.mjs` comprueba el flujo y el enlace provisional de WhatsApp.

La entrada prueba cámara con encuadre móvil, perspectiva 3D y movimiento leve de reposo, comparables desde `</>`. `node scripts/verify-entrance-camera.mjs` comprueba alcance, pausa y reducción de movimiento. Las muestras de sonido están fuera del sitio, pendientes de escucha: ver `docs/reference/audio-atmosfera-v1.md`. Se preparan con `node scripts/prepare-ambient-previews.mjs`; todavía no hay audio integrado en la web.

## Contenido y rutas

`/terapia`, `/gabriela`, `/biblioteca`, `/reflexiones`, `/proyectos`, `/contacto`.

Cada recurso tiene una ruta bajo `/biblioteca/`. Las reflexiones tienen sus propias rutas bajo `/reflexiones/`. Los objetos del refugio y el menú abren los mismos destinos. El contenido está renderizado en servidor; cerrar la lectura regresa al paisaje conservando la escena.

Los textos se definen en `lib/content.ts` y `components/editorial-content.tsx`. Las interacciones editoriales están en `components/editorial-interactions.tsx`; las escenas y el menú, en `components/experience.tsx`.

## Verificación

```sh
npx tsc --noEmit
npm run build
node scripts/verify-site.mjs
```

El verificador necesita el servidor local. Comprueba todas las rutas, títulos, descripciones, contenido renderizado, imágenes, los cuatro PDFs originales y una ruta inexistente. El resultado se guarda en `docs/review/http-verification.json`.

`scripts/capture-review.mjs` captura el conjunto de escenas y páginas de referencia en escritorio y móvil mediante agent-browser. Los resultados están en `.impeccable/review/`, fuera de Git.

## Activos y fuentes

Las fuentes se conservan en `../research/sources/`; las nuevas imágenes originales y prompts, en `../research/generated-assets-v2/`. Las fotografías optimizadas, portadas y recursos se sirven desde `public/`. Los cuatro PDFs mantienen exactamente los bytes originales.

Para reproducir la preparación de activos se necesita `sips`, Poppler y Sharp. El script acepta la carpeta Node que contiene Sharp como primer argumento; por defecto busca las dependencias del proyecto:

```sh
node scripts/prepare-assets.mjs /ruta/a/runtime/node
node scripts/record-assets.mjs
```

El álbum de siete polaroids recibido de Gabriela se documenta en `docs/reference/polaroids-mari-2026-10.md`. Se puede reproducir su preparación con `node scripts/prepare-polaroids.mjs /ruta/a/runtime/node`. El original permanece fuera de `public/`; las composiciones WebP conservan las fotografías, marcos y rótulos originales. Las fotos son un objeto interactivo de la mesa del refugio, dentro de `/`, con el paisaje visible y sin abrir una página biográfica. `/#polaroids` permite el acceso directo a ese objeto; el antiguo enlace `/gabriela#polaroids` conduce ahora al mismo refugio. `node scripts/verify-polaroids.mjs` comprueba el recorrido y la integración.

No son pasos necesarios para ejecutar o compilar la web; los activos optimizados están incluidos.

## Revisión antes de publicar

Ver `docs/review/contenido-y-publicacion.md` para las condiciones de sesiones, reserva, revisión clínica y editorial, fotografías, vídeo y workbooks. El perfil público `@abrazatupaz` continúa disponible. El chat añade WhatsApp con el número provisional de Williams, autorizado para revisión y centralizado en `lib/contact.ts`; sustituir por el de Gabriela antes de publicar. No hay precios, calendario de reserva ni credenciales inventadas.

La rama de implementación es `atp-web-completa`. `immersive-transition-v2` conserva la oclusión vegetal original y `camera-turn-v3` la variante de giro de cámara.
