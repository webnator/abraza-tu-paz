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
