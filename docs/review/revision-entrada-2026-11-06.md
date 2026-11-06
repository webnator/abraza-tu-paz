# Revisión de la entrada — 6 de noviembre de 2026

## Criterio del cliente

La web es el jardín: el parallax no es una portada que conduce a una «web verdadera» convencional. Los contenidos deben integrarse en el lugar. Se revisará su distribución sección a sección; este pase se limita a la entrada y al menú global.

## Cambios realizados

- Nota vertical junto a la verja, dentro del mismo contenedor que la imagen de puerta y piedra (`.depth-layer--threshold`). La primera incorporación al plano intermedio aún producía deslizamiento relativo; se corrige uniéndola al plano exacto de la puerta, con idéntica transformación y transición heredadas.
- Papel colgado con cordel y contorno alfa real. Letra manuscrita `Nothing You Could Do`, no una serif ni una fuente de sistema. El texto sigue siendo HTML accesible.
- Ajuste final solicitado: nota un poco más cerca de la verja (ancla horizontal 63.1%) y sombra de contacto suave, `drop-shadow(2px 3px 3px rgb(12 19 12 / 34%))`, aplicada al contorno del papel, no a una caja rectangular. La puerta y la nota siguen compartiendo su transformación.
- Tras la corrección del cliente durante la revisión: tamaño aproximado de un tercio del área del primer papel propuesto; ancho local 4.83% que compensa la escala base de la puerta, tipografía proporcionada, exposición al 76% y saturación al 72% para integrarlo en los tonos apagados de la entrada. Se mantiene la tinta musgo oscura.
- Eliminado el nombre de escena de la cabecera. La orientación accesible permanece en los nombres de escenas y controles.
- Drawer derecho de 370px como máximo en escritorio, sin imagen, subtítulos, números ni mapa adicional; cuatro opciones: Terapia, Quién te acompaña, Biblioteca y ¿Hablamos? Fondo hueso, veladura mínima, cierre con Escape y retorno al recorrido.
- Los cuatro atajos llevan a los objetos correspondientes del refugio y los señalan. No abren un panel editorial desde el drawer. No se ha redistribuido ni eliminado contenido de las rutas anteriores: esa integración continúa pendiente de las próximas revisiones.

## Logo — pendiente explícito para el cliente

Pedir el logo/identidad vigente y sus archivos originales. Revisar la coherencia con las redes de Abraza tu Paz antes de diseñar o sustituir el identificador de cabecera. El texto actual es provisional; no se presenta como un logo definitivo. No se ha iniciado una nueva propuesta de marca ni investigación de redes en este pase, porque el usuario lo dejó pendiente.

## Activo y procedencia

- Generador: herramienta integrada `image_gen`, no CLI.
- Original conservado: `../research/generated-assets-v3/nota-entrada-v1.png`.
- Activo servido: `public/images/nota-entrada-v1.webp`, con alfa y versión de 768px de ancho.
- Prompt exacto y procedencia: `public/images/nota-entrada-v1.webp.provenance.json`, copia junto al original en research. El cartel de madera anterior no se ha borrado.
- No se ha alterado la fotografía del jardín o del umbral.

## Verificación

- TypeScript y build correctos.
- Escritorio 1440 × 900 y móvil 390 × 844 inspeccionados conjuntamente. La nota móvil permanece dentro del encuadre: x=270.6, ancho=90.9, derecha=361.5; texto sin desbordamiento y fuente manuscrita cargada.
- Prueba de regresión `scripts/verify-note-anchor.mjs`: la imagen de la puerta y el cartel tienen el mismo padre. Su anclaje relativo se mantiene durante el movimiento del puntero, el easing intermedio y el zoom al entrar. Variación normalizada máxima menor de `0.0000001`, tanto en escritorio como en móvil. Informe en `note-anchor-verification.json`.
- Atajo Terapia comprobado: URL `/`, escena `refugio`, sin `.editorial-overlay`, foco y señal sobre la silla de Terapia.
- Detector ejecutado una vez; conserva avisos de documentación auxiliar de tokens del sistema previo. No se cambia la estética aprobada para silenciarlos.
- Capturas en `.impeccable/review/entrada-nov06-small.png`, `entrada-nov06-mobile-final.png` y `drawer-nov06-desktop.png`.
- Vista real del navegador de la aplicación actualizada para cargar la fuente nueva y dejar la entrada visible. Sin despliegue.

## Variantes reversibles y navegación — segundo pase

- Papel conservado sin cambios. Nueva tablilla vertical clavada a la piedra, generada con `image_gen` y optimizada con alfa en `public/images/cartel-madera-clavada-v1.webp`. Original y prompt exacto en `../research/generated-assets-v3/cartel-madera-clavada-v1.*`; procedencia junto al activo servido. El activo horizontal de madera anterior también sigue conservado.
- Botón de desarrollo `</>` en la esquina inferior izquierda, disponible en todas las escenas y rutas locales. Panel sencillo con papel/madera, estrellas talladas y tres alternativas tipográficas para el menú; recuerda la elección por navegador. Se cierra al abrir menú o álbum para respetar sus diálogos y foco. No se renderiza en producción.
- Cormorant Garamond elegida como propuesta de navegación: voz editorial más cálida que la sans anterior. Se puede comparar con Nothing You Could Do y Manrope desde el panel, sin cargar fuentes nuevas. El texto «Menú» es mayor, lleva subrayado fino, veladura oscura localizada y permanece visible en móvil. Se conserva el drawer minimalista y sus cuatro atajos al refugio.
- Pequeña marca de tres estrellas bajo el texto de la madera. Tras la revisión del cliente, se aclaran a madera natural cálida y se amplían del 30% al 40% del ancho del soporte, acercándolas un poco al texto. El texto y el tamaño de la tabla se mantienen. Es geometría SVG decorativa, sin emoji; se puede desactivar para comparar la tabla anterior. La nota de papel no lleva la marca.
- El verificador del anclaje cubre las dos variantes en escritorio y móvil. Las imágenes y el texto permanecen dentro del mismo plano de la puerta durante el parallax y el zoom.

## Tablilla como objeto de lectura

La petición más reciente sustituye la navegación desde el cartel por una bienvenida centrada sobre el paisaje oscurecido. La verja sigue siendo el acceso al jardín. El detalle conserva la madera y las estrellas; el título tiene más aire sobre él y un relieve hundido. El cierre «Cerrar» queda más arriba que el clavo inferior; se elimina la X y también se puede cerrar fuera o con Escape. El texto se basa en el briefing, pero su adaptación sigue pendiente de Gabriela: ver `docs/reference/bienvenida-jardin.md` y `lib/entrance-welcome.ts`.

El verificador comprueba la lectura en papel y madera, escritorio y móvil: cabe en pantalla, mantiene escena/URL, recibe el foco, bloquea las flechas y devuelve el foco al cartel al cerrar. La prueba del zoom y parallax continúa desde la verja.

## Ajustes solicitados durante la prueba

- Chat: elección inmediata y respuesta tras una pausa breve, con puntos y entrada suave de cada mensaje. Se elimina el subtítulo visible «Conversación guiada». El hilo sigue siendo local y de opciones redactadas.
- Bienvenida: «Conversar conmigo» o «Explorar el jardín»; la segunda opción cierra la bienvenida y deja el recorrido disponible.
- Cámara: experimentar **solo en la entrada** con un encuadre que permita mirar arriba/abajo y perspectiva 3D al mover el ratón, además de movimiento leve en reposo. Jardín y refugio conservan su cámara hasta validar este ensayo.
- Audio: preparar primero muestras independientes para entrada amortiguada, jardín con agua/aves/insectos y refugio de interior con campana suave. Entregar para escuchar **antes de integrar audio en el sitio**.

### Resultado de este pase

- Chat y texto de bienvenida actualizados. Las respuestas se incorporan secuencialmente y continúan si se minimiza el chat.
- Ensayo de cámara **implementado solo en la entrada**, con desplazamiento de encuadre, perspectiva de 1400px y giro dependiente del puntero. La ligera deriva de reposo comparte la cámara del mundo y conserva el cartel unido al umbral. El movimiento se congela durante lecturas/diálogos, se pausa al ocultar la pestaña y se elimina con reducción de movimiento.
- Las transiciones de la verja nivelan la cámara durante el cruce; el jardín y el refugio mantienen sus cámaras anteriores. `</>` ofrece «Movimiento y cámara 3D · entrada» para comparar.
- Verificación en escritorio, móvil y reducción de movimiento: `entrance-camera-verification.json`. El anclaje de la nota ahora se mide en coordenadas locales del plano compartido, porque la proyección 3D cambia las proporciones aparentes en pantalla; `note-anchor-verification.json` sigue cubriendo papel y madera.
- Tres muestras de audio y un recorrido de 86s preparados fuera de `public/`. Estado y créditos en `docs/reference/audio-atmosfera-v1.md`. **Pendientes de escucha y de integración posterior.**

### Feedback posterior

El usuario aprueba el gesto 3D del puntero y el chat. Pide que se perciba mejor la cámara en reposo: se amplía solo la deriva automática de la entrada (hasta 8.5px horizontal y 4.6px vertical, menor en móvil), con balanceo lento y pequeños giros. Se conservan los coeficientes y la respuesta del ratón. La verificación exige un desplazamiento visible con el puntero quieto, además de mantener la pausa ante diálogos y la reducción de movimiento. El audio v1 no encaja; la búsqueda se retoma más adelante y no se integra.

### Transición de la verja — continuidad en ambos sentidos

Se corrige el borde inferior de la foto reducida y la aparición brusca de las plantas. Entrada y jardín comparten ahora un único fondo persistente, con una extensión periférica de la fotografía para cubrir el campo de visión durante el paso. Las plantas entran suavemente desde los lados y se retiran al regresar. El encuadre móvil, la nivelación de la cámara y los planos parten de su posición real y se resuelven en un solo recorrido de 2100ms, sin pausa ni sustitución de imagen al terminar.

Se mantienen el cartel anclado a la verja, las variantes papel/madera, la cámara 3D y la deriva aprobadas. No se modifica el recorrido al refugio, el chat o el audio. Detalles, pruebas y prompt del activo nuevo: `../reference/transicion-entrada-jardin.md`.

### Cámara extendida al jardín y al refugio

Por petición del usuario, la cámara aprobada deja de ser exclusiva de la entrada. `use-scene-camera.ts` aplica los mismos coeficientes de perspectiva, desplazamiento, giro e inercia a las tres escenas, conservando sus capas de parallax. Se mantiene un único bucle de cámara y su pose/fase continúa entre escenas; durante lecturas, menús, inspecciones y transiciones se congela. Todos los objetos y áreas de clic comparten el mundo transformado. El encuadre móvil de la entrada continúa integrado en el recorrido del umbral.

El control `</>` pasa a «Movimiento y cámara 3D · todas las escenas» y conserva la elección almacenada del ensayo anterior. Reducción de movimiento respeta las tres escenas. Se mantienen la oclusión al refugio, chat, audio y contenido.

Verificación: `scripts/verify-scene-camera.mjs` recorre entrada → jardín → refugio → jardín → entrada en escritorio y móvil, comprueba deriva en reposo, cuatro posiciones de puntero, cobertura de la imagen, pausa ante menú y álbum y ausencia de errores. Caso adicional con reducción de movimiento en móvil. Informe `scene-camera-verification.json`; el comando anterior `verify-entrance-camera.mjs` delega en este verificador. `verify-threshold-passage.mjs` continúa pasando en ambos sentidos y mide el salto en el mismo cambio de estado, antes de que se reanude la deriva normal. Build y TypeScript correctos.
