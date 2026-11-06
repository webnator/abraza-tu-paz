# Entrada ↔ jardín: recorrido continuo

## Intención

Atravesar la verja manteniendo la relación de profundidad: la piedra y las flores cercanas pasan junto a la cámara; el jardín lejano se acerca con calma. La vegetación del primer plano del jardín entra por los lados durante el recorrido y se retira al volver. No se intercambian dos fotografías al acabar.

Se conserva el movimiento 3D del puntero, la deriva de reposo y la posición del cartel en el plano de la puerta. La transición jardín ↔ refugio conserva su oclusión vegetal. Audio, chat y contenido no se modifican.

## Implementación

- El mismo fondo del jardín permanece montado en entrada, durante el cruce y al llegar al jardín. Su escala pasa de 0.62 a 1.035, con un único origen de transformación, 54% / 51%.
- `use-threshold-passage.ts` captura las matrices reales al hacer clic, incluyendo el parallax a medio movimiento y el desplazamiento móvil. Web Animations API interpola desde esa posición; no se resetea visualmente la cámara antes de comenzar.
- Cámara, fondo, marco y vegetación comparten un recorrido de 2100ms. La llegada termina con la animación de cámara, sin un temporizador adicional. El encuadre móvil se ajusta dentro de ese mismo movimiento.
- El marco permanece opaco mientras pasa junto a la cámara. Sus últimos restos se atenúan cuando ya están fuera de campo; el jardín nunca se sustituye mediante un fundido entre dos encuadres.
- La capa vegetal original se presenta en dos mitades con una unión suavizada dentro de su zona central. Ambas se desplazan desde los lados y hacia abajo, con opacidad progresiva. El regreso invierte el recorrido.
- Una ampliación fotográfica periférica aporta el campo de visión que faltaba bajo la foto reducida. La fotografía central aprobada continúa por encima, sin sustituirse. Esa extensión evita descubrir su borde rectangular durante el paso.
- Las imágenes del siguiente espacio, incluido el primer plano transparente, se decodifican antes de iniciar el recorrido.
- Con reducción de movimiento se cambia de estado directamente, conservando los controles. La cámara de reposo empieza suavemente desde cero al volver a la entrada.

## Verificación

`scripts/verify-threshold-passage.mjs` detiene y recorre las animaciones en 0, 350, 700, 1050, 1400, 1750 y 2099ms, en ambos sentidos. Comprueba identidad del nodo de imagen, ausencia de jardines duplicados, imágenes cargadas, cobertura periférica en pleno recorrido, movimiento monotónico de las plantas y continuidad del encuadre al terminar. Casos: escritorio 1440×900, móvil 390×844 y reducción de movimiento.

Informe: `docs/review/threshold-passage-verification.json`. Capturas: `.impeccable/review/threshold-passage/`. También se comprueban la cámara de entrada y el anclaje/lectura del cartel en sus variantes papel y madera.

Build y TypeScript correctos. El lint de los hooks de cámara y transición pasa. El componente `experience.tsx` mantiene avisos previos del proyecto sobre sincronización de estado en efectos, imágenes HTML, una dependencia de `closeReading` y un elemento con `role=status`; no se amplía esta revisión a refactorizar esas áreas.

## Activo generado y procedencia

- Herramienta: `image_gen` integrada, modo de edición/extensión, sin CLI de generación.
- Referencia: `public/images/jardin-refugio-v1.webp`, conservada.
- Original generado: `/Users/unalaptop/.codex/generated_images/01a06188-9ade-7953-a757-430df6b137ba/exec-bbdd5cb7-2b03-4310-bb35-cce23d468fba.png`.
- Archivo servido: `public/images/jardin-overscan-v1.jpg`, copia convertida con `sips`, calidad 90. No se sobrescriben activos anteriores.
- Se usa como extensión bajo la imagen original, a 161.2903% de tamaño, con una unión periférica suavizada. No reemplaza la composición central aprobada.

Prompt exacto:

```text
Use case: precise-object-edit, OUTPAINT ONLY. Asset type: continuous camera overscan for an immersive garden website. Edit target: the supplied existing garden photograph. Produce a landscape 16:9 image at high resolution. Keep the ENTIRE original photograph, unchanged in composition and perspective, occupying the central 62 percent of output width and 62 percent of output height. Place its center at output x=51.52%, y=50.38% so original is slightly right of center. Expand the canvas in all four directions around that smaller original photograph, with photorealistic seamless continuation of the same garden. This must be a wider field of view, not a restyled or redesigned garden. Extend the stone footpath toward the camera at the bottom left/center, continue pond and natural pond bank into bottom right, plants, moss, olive green leaves and warm dappled late afternoon light. Keep the same small stone refuge in the original center-right far distance, wooden bench bottom left, terracotta pot on the left and pond to the right. Preserve all original scene objects in their exact positions inside the inner photograph. New outer areas continue its geometry and light without any visible rectangular boundary, border, blur band or frame. No new buildings, no people, no text. The outer extra areas will be seen briefly while crossing a garden gate. Natural, calm and mature, with the same rich organic detail and gentle photographic softness.
```
