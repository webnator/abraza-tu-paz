---
name: Abraza tu Paz
description: Un jardín íntimo y un refugio habitado, con una voz editorial cálida.
colors:
  hueso: "#f3efe5"
  musgo-profundo: "#34483a"
  tierra-humeda: "#765747"
  agua-mineral: "#75b7b0"
  sol-atp: "#f2c84b"
  bugambilia: "#c83d72"
  bugambilia-tinta: "#9b315d"
  musgo-hover: "#243a2b"
  tinta-cuerpo: "#514c41"
  papel-fotografia: "#faf8f2"
  soporte-cuaderno: "#e8e2d4"
  soporte-floral: "#ead7d8"
  soporte-agua: "#d9e4df"
  soporte-tierra: "#dfd3c3"
typography:
  display:
    fontFamily: "Cormorant Garamond, serif"
    fontSize: "clamp(3.3rem, 5.6vw, 5.8rem)"
    fontWeight: 400
    lineHeight: 1.01
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Cormorant Garamond, serif"
    fontSize: "clamp(2rem, 3vw, 3.1rem)"
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Cormorant Garamond, serif"
    fontSize: "1.65rem"
    fontWeight: 400
    lineHeight: 1.15
  body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.8
  label:
    fontFamily: "Manrope, sans-serif"
    fontSize: "0.875rem"
  action:
    fontFamily: "Manrope, sans-serif"
    fontSize: "0.9375rem"
    lineHeight: 1.5
  tab:
    fontFamily: "Manrope, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 500
rounded:
  square: "0"
  circle: "50%"
spacing:
  inline-gap: "0.5rem"
  action-gap: "0.65rem"
  text-gap: "1rem"
  content-gap: "2rem"
  mobile-page-gutter: "1.25rem"
  mobile-section-gap: "4rem"
components:
  button-primary:
    backgroundColor: "{colors.musgo-profundo}"
    textColor: "{colors.hueso}"
    typography: "{typography.action}"
    rounded: "{rounded.square}"
    padding: "0.85rem 1.45rem"
  button-primary-hover:
    backgroundColor: "{colors.musgo-hover}"
  button-inverse:
    backgroundColor: "{colors.hueso}"
    textColor: "{colors.musgo-profundo}"
    typography: "{typography.action}"
    rounded: "{rounded.square}"
    padding: "0.85rem 1.45rem"
  button-inverse-hover:
    backgroundColor: "{colors.sol-atp}"
  editorial-link:
    textColor: "{colors.bugambilia-tinta}"
  library-tab:
    textColor: "{colors.tierra-humeda}"
    typography: "{typography.tab}"
    rounded: "{rounded.square}"
    padding: "0.5rem 0"
    height: "44px"
  library-tab-active:
    textColor: "{colors.musgo-profundo}"
  conversation:
    backgroundColor: "{colors.musgo-profundo}"
    textColor: "{colors.hueso}"
    rounded: "{rounded.square}"
    padding: "clamp(2rem, 4vw, 4rem)"
  photo-control:
    textColor: "{colors.musgo-profundo}"
    rounded: "{rounded.circle}"
    size: "44px"
  video-play:
    backgroundColor: "{colors.hueso}"
    textColor: "{colors.musgo-profundo}"
    rounded: "{rounded.circle}"
    size: "4rem"
  resource-cover:
    backgroundColor: "{colors.soporte-cuaderno}"
    rounded: "{rounded.square}"
    padding: "1.25rem"
  polaroid:
    backgroundColor: "{colors.papel-fotografia}"
    rounded: "{rounded.square}"
    padding: "1rem 1rem 0.6rem"
---

# Design System: Abraza tu Paz

## Overview

**Creative North Star: "Jardín íntimo y refugio habitado"**

El universo conserva cuerpo, materia, sombra y suelo: piedra usada, madera, agua, plantas y objetos de una vida cotidiana. La imagen es naturalista, con vegetación abundante, sombra profunda y luz cálida localizada. La cercanía de la marca convive con una voz profesional, reflexiva y sin prisa.

La misma identidad tiene dos expresiones construidas. El paisaje deja espacio a la imagen y a pequeños hallazgos; el contenido abre una superficie de papel hueso con una jerarquía editorial clara. Cormorant Garamond da humanidad a títulos y frases, mientras Manrope sostiene la orientación, la lectura y las acciones. La densidad baja procede del aire entre bloques, de la longitud acotada del texto y del uso contenido de controles.

**Key Characteristics:**

- Materiales vividos y fotografía con profundidad vegetal.
- Hueso y musgo como base; agua, sol y bugambilia como acentos.
- Serif expresiva, sans discreta y grandes superficies de lectura.
- Rectángulos de papel, divisores finos y controles circulares puntuales.
- Movimiento suave con una alternativa de movimiento reducido.

## Colors

La paleta expresa la espiritualidad encarnada de la marca: tiene luz y pulso, pero permanece anclada en tierra, agua y vegetación.

### Primary

- **Musgo profundo** (`{colors.musgo-profundo}`): títulos, marca, controles, botón principal y bloques de conversación. Sobre musgo, el texto y la acción inversa usan hueso.

### Secondary

- **Tierra húmeda** (`{colors.tierra-humeda}`): metadatos, pies de foto, navegación secundaria y texto auxiliar. En las imágenes aparece como suelo, madera y cerámica.
- **Agua mineral** (`{colors.agua-mineral}`): subrayados de navegación y pestaña activa, barra de desplazamiento y respuesta al pasar sobre controles de fotografía. Mantiene la continuidad con la identidad histórica.

### Tertiary

- **Sol ATP** (`{colors.sol-atp}`): descubrimiento y respuesta de los objetos del refugio, foco sobre el paisaje, selección de texto y hover de la acción inversa.
- **Bugambilia** (`{colors.bugambilia}`): acento de marca y presencia floral en el mundo. **Bugambilia tinta** (`{colors.bugambilia-tinta}`) es la variante oscura usada en enlaces, contacto y estados de navegación sobre papel.

### Neutral

- **Hueso** (`{colors.hueso}`): fondo editorial y base de las superficies de lectura. El menú conserva esta tonalidad al 98% de opacidad.
- **Tinta de cuerpo** (`{colors.tinta-cuerpo}`): párrafos y listas sobre hueso; musgo queda reservado para su jerarquía y orientación.
- **Papel de fotografía** (`{colors.papel-fotografia}`): marco de las polaroids.
- **Soportes de cuaderno, floral, agua y tierra** (`{colors.soporte-cuaderno}`, `{colors.soporte-floral}`, `{colors.soporte-agua}`, `{colors.soporte-tierra}`): fondos apagados que acompañan las portadas originales sin recolorearlas.

**La base hueso y musgo.** Los seis colores de marca no tienen el mismo peso. Sol y bugambilia son acentos y hallazgos; sus porcentajes de referencia describen una jerarquía perceptiva, no una cuota por pantalla. El musgo permanece profundo y húmedo; el bugambilia conserva carácter floral, sin llevar la interfaz hacia salvia, spa o neón.

## Typography

**Display Font:** Cormorant Garamond, con fallback `serif`.

**Body Font:** Manrope, con fallback `sans-serif`.

**Handwriting:** Nothing You Could Do, peso 400, variable `--font-handwriting`. Se reserva para la nota física de la entrada; no sustituye la tipografía de navegación ni constituye un logo.

Ambas familias se cargan con pesos 400, 500 y 600. Los títulos editoriales usan 400 y equilibran sus saltos con `text-wrap: balance`. La serif aporta una voz humana y literaria; la sans mantiene las acciones y los textos largos claros.

### Hierarchy

- **Display:** el `h1` editorial usa el token `display`, un máximo de `15ch` y margen inferior de `1.5rem`. A 720px o menos pasa a `clamp(2.9rem, 12vw, 4rem)`; los detalles de recurso tienen su propia escala, `clamp(2.9rem, 4vw, 4.8rem)` y `3.2rem` en móvil.
- **Headline:** el `h2` usa el token `headline`. En móvil pasa a `2.2rem`. El bloque de conversación tiene una escala propia de `clamp(2.25rem, 4vw, 4rem)` y `2.5rem` en móvil.
- **Title:** el `h3` general usa `title`. Las portadas de biblioteca usan `1.75rem`, línea `1.1`, y `1.5rem` en móvil; los títulos de filas de reflexión crecen hasta `clamp(2rem, 3.6vw, 3.8rem)`.
- **Body:** `1rem`, línea `1.8`, máximo de `70ch`. La introducción editorial usa `1.18rem`, línea `1.65` y `48ch`; baja a `1.0625rem` en móvil. El cuerpo de reflexión usa `1.1rem`, línea `1.9`, dentro de `68ch`, y baja a `1rem` en móvil.
- **Label:** `0.875rem` para navegación y orientación; `0.8125rem` para metadatos y pies de foto. La capitalización normal domina. El marcador de escena es la excepción: `0.75rem`, peso 500, tracking `0.1em` y mayúsculas.
- **Action / Tab:** las acciones sólidas usan `0.9375rem`, línea `1.5`; las pestañas de biblioteca usan `1.0625rem`, peso 500.

Los bloques editoriales móviles permiten `overflow-wrap: anywhere` e `hyphens: auto`. El espaciado entre letras negativo pertenece a títulos y marca, no al cuerpo de lectura.

## Layout

El contenido usa un contenedor centrado de `min(1080px, calc(100% - 7rem))`, con padding superior `clamp(3rem, 5vw, 5.5rem)`. A 1100px o menos el ancho pasa a `calc(100% - 5rem)`; a 720px o menos, a `calc(100% - 2.5rem)` y padding superior `2.7rem`. Las reflexiones acotan su página a `850px`. Entre secciones se usa `clamp(4rem, 7vw, 7rem)`, con `4rem` en móvil.

Las aperturas combinan imagen y texto con columnas `1.08fr 1fr`; los bloques de lectura usan `1fr 1.3fr`. Los huecos fluidos oscilan entre `2rem` y `5rem` o `6rem`, según el bloque. A 720px todas esas composiciones, la historia de fotografías, el bloque de escucha, los proyectos y el detalle de recurso pasan a una columna con hueco de `2rem`.

La biblioteca tiene cuatro columnas de portadas, dos a 1100px y una rejilla móvil `repeat(auto-fit, minmax(min(100%, 9rem), 1fr))`. Las pestañas pueden envolver a otra línea, con altura automática en la lista y controles de `44px`; esta disposición conserva las tres opciones con texto aumentado. La portada del detalle es sticky a `1rem` en escritorio; en móvil pasa a flujo normal, centrada y con máximo de `15rem`.

El menú es un drawer derecho a altura completa, de `min(370px, calc(100vw - 1.25rem))`; el jardín sigue visible fuera de él. Cuatro opciones, sin imagen ni subtítulos, y un cierre discreto. En móvil deja al menos una franja del paisaje a la vista. Sus opciones son atajos a los objetos del refugio, no a páginas convencionales. Las superficies lectoras anteriores conservan por ahora su margen de `1.2rem` en escritorio y ocupación completa en móvil; redistribuir ese contenido dentro del jardín es trabajo pendiente de las siguientes revisiones, no un nuevo modelo de web aprobado.

Los únicos puntos de cambio de la composición del sitio son los media queries de **1100px** y **720px**, ambos inclusivos con `max-width`. El comportamiento del paisaje se describe en su componente específico, debajo.

## Elevation & Depth

Las superficies editoriales permanecen planas: papel, fotografía, cambio de tono y reglas de un píxel separan los bloques. Las sombras expresan la materialidad de fotografías y cuadernos o la superposición de un panel; no se aplican de forma uniforme a cada sección. El paisaje construye profundidad con fondo, sombra, luz ambiental, objetos y primer plano transparente.

### Shadow Vocabulary

- **Panel editorial / menú:** `0 25px 80px rgb(7 16 8 / 30%)`; se elimina cuando el panel ocupa toda la pantalla en móvil.
- **Polaroid:** `0 10px 25px rgb(52 72 58 / 12%)`; acompaña su giro de `-3deg`.
- **Portada en biblioteca:** `6px 10px 17px rgb(52 72 58 / 17%)`; permanece sobre el soporte tonal.
- **Portada de detalle:** `8px 14px 26px rgb(52 72 58 / 15%)`.
- **Respuesta de carga del paisaje:** `0 10px 25px rgb(0 0 0 / 18%)`.

Las etiquetas del paisaje usan fondos oscuros translúcidos y las imágenes llevan veladuras para mantener la lectura. El menú conserva un fondo de papel casi opaco; la página editorial usa hueso opaco.

## Shapes

La forma principal es rectangular: páginas, imágenes, soportes de cuadernos, bloques de conversación, enlaces de pestañas y botones sólidos tienen esquinas rectas. Los divisores usan un píxel de musgo translúcido, generalmente entre 16% y 25% de opacidad. El carácter material aparece en encuadres y pequeños giros, como la polaroid y el cartel de madera.

Los círculos se reservan para un control reconocible: puntos de objeto, reproducción y controles de fotografía. Las áreas invisibles de paso siguen la geometría del lugar. La librería UI dispone de radios genéricos, pero la composición construida del sitio utiliza sus variantes rectas y no toma el redondeo genérico como lenguaje principal.

## Components

### Buttons and Links

Las acciones son tranquilas y claras. El botón sólido es rectangular, musgo sobre hueso, con padding `0.85rem 1.45rem`, hueco `0.65rem` y altura mínima `48px`. Su hover usa musgo oscuro durante `200ms ease`. En un bloque de conversación se invierte a hueso sobre musgo y responde con sol.

Los enlaces editoriales son bugambilia tinta, de `1rem`, subrayados con offset `0.4em`; navegación, vuelta y descarga usan tamaños menores según su función. Menú y cierre combinan texto con iconos de línea y altura mínima `44px`. Los controles de fotografía son círculos de `44px`, borde musgo al 35% y fondo agua en hover.

El foco visible de botones y enlaces usa una línea de `2px` separada `5px`. En botones del paisaje el color es sol; en el botón sólido es bugambilia tinta. El foco programático al abrir una lectura llega al título; al volver recupera el objeto anterior o el control de menú. Un botón de descarga en preparación muestra texto de estado, opacidad `0.65` y cursor de espera; el error se comunica mediante texto junto a las acciones.

### Navigation

El identificador provisional es serif: `1.8rem` sobre el paisaje y `1.7rem` en los paneles, con tracking `-0.025em`; en móvil pasa a `1.5rem` y `1.4rem`. La cabecera tiene dos extremos: nombre a la izquierda y menú a la derecha, sin etiqueta de escena. El logo definitivo queda pendiente de material y confirmación del cliente, incluida su coherencia con redes.

El drawer muestra cuatro nombres serif de `2rem`: Terapia, Quién te acompaña, Biblioteca y ¿Hablamos? Sin subtítulos, mapa, números o imagen adicional. El contacto conserva el acento bugambilia tinta. Las acciones llevan a los objetos del refugio y dejan visible su etiqueta, sin abrir una superficie editorial. El pie solo ofrece «Seguir explorando». Apertura lateral de `320ms`, sin zoom y sin blur sobre el jardín; Escape y el exterior cierran con foco protegido. La navegación lectora anterior permanece hasta su revisión de contenido.

### Library Tabs and Resource Covers

Las pestañas Hacer, Leer y Escuchar son texto sobre papel, sin fondos de cápsula. La activa pasa de tierra a musgo y se subraya en agua. Conservan controles de `44px` y envuelven cuando el ancho disponible no permite una sola fila.

Cada recurso mantiene su portada original dentro de un soporte tonal rectangular con padding `1.25rem`, reducido a `0.65rem` en móvil. Las imágenes conservan proporción `419.25 / 595.5`, usan `object-fit: contain` y tienen una sombra de papel. En hover la portada sube `7px` y gira `-2deg` durante `350ms` con easing suave. El título, tema y número de páginas aparecen debajo, sin contenedor adicional.

### Editorial Blocks, Questions and Photographs

Los bloques de conversación son superficies musgo con texto hueso y una acción inversa. Las listas de reconocimiento, las filas de reflexión y las preguntas frecuentes se organizan con divisores finos. Las preguntas frecuentes usan controles rectos, peso 500 y tamaño `1.1rem`; al abrir muestran el texto en el mismo flujo y cambian la dirección del chevron.

Las siete polaroids compuestas por Gabriela son un **objeto del refugio**, no una segunda página ni un bloque de lectura biográfica. Al recogerlas de la mesa, el refugio se aproxima y permanece visible detrás de un visor transparente; los demás indicadores del paisaje se ocultan temporalmente. Se conservan el marco y el rótulo manuscrito originales, sombra y giro `-3deg`, sin segundo marco CSS. La imagen se contiene sin recortar: soporte de `min(62dvh, 38rem)` en escritorio y `45dvh` en móvil. El texto de cada fotografía ocupa una superficie musgo translúcida; anterior/siguiente son círculos y las siete elecciones son miniaturas con controles mínimos de `44px`. El visor permite desplazamiento vertical si el texto aumentado lo necesita. «Dejar las fotos», Escape o el exterior cierran el objeto, devuelven el foco a la mesa y restauran el parallax sin cambiar de escena. `/#polaroids` es su acceso directo; la biografía enlaza al mismo objeto y no duplica el álbum.

El vídeo empieza con una fotografía oscurecida, un círculo de reproducción y un título serif. Al activar se convierte en un reproductor `16 / 9`; su pie conserva la explicación de conexión y la vía directa al vídeo.

### Signature Component: the Landscape

El umbral, el jardín y el refugio son una composición propia de esta superficie. La escena fija ocupa el viewport; un mundo interior de proporción panorámica usa `width: max(100vw, 177.69dvh)` y `height: max(100dvh, 56.28vw)`. Fondo, objetos y áreas de interacción comparten ese sistema de coordenadas. El umbral es transparente y permite ver el jardín real detrás; el paso al refugio acerca la imagen y la vegetación atraviesa el primer plano. Estas decisiones de cámara no imponen el formato de futuras superficies editoriales.

La entrada tiene una nota de papel vertical, colgada junto a la verja **dentro del mismo `.depth-layer--threshold` que contiene la imagen de piedra y puerta**. No tiene un movimiento de parallax independiente: hereda la misma traslación, escala, easing y animación del umbral. Su ancho local del 4.83% compensa la escala base de ese plano para conservar el tamaño pequeño anterior; la fuente manuscrita y el papel rebajado en exposición/saturación se mantienen. En móvil el encuadre de entrada se desplaza `-14dvh` para mantener visibles la puerta y la nota.

La variante experimental de madera es una tablilla vertical envejecida, con dos clavos y texto hueso manuscrito. `cartel-madera-clavada-v1.webp` tiene alfa y comparte exactamente el anclaje del papel. Debajo del texto puede mostrarse una pequeña marca de tres estrellas: geometría SVG oscura con luz de borde desplazada para sugerir un grabado mate, sin emoji ni brillo animado. La variante de papel original permanece intacta.

El control «Menú» y los destinos del drawer usan Cormorant Garamond. El control tiene 24px, peso 500, subrayado fino y una sombra localizada bajo el texto para seguir siendo visible sobre hojas y flores. La palabra permanece en móvil. El drawer conserva sus cuatro destinos, superficie hueso y el paisaje a la vista. La manuscrita de la nota y Manrope se pueden comparar como alternativas de navegación desde las herramientas de desarrollo, con escalas ajustadas a cada fuente y sin cargar otras familias.

### Variantes de desarrollo

Un botón `</>` de 44px permanece abajo a la izquierda durante el recorrido y la lectura local. Su tratamiento translúcido y el pequeño panel de controles son una herramienta de trabajo, no un patrón del sitio público. Radios nativos permiten alternar papel/madera y las tres tipografías; un checkbox muestra u oculta las estrellas. Escape cierra el panel y devuelve el foco al botón. El panel se cierra y queda bloqueado mientras hay un diálogo de menú o fotografías. Las preferencias se guardan en `localStorage`, solo se leen en desarrollo y no alteran los valores públicos. En producción no se renderiza el panel.

En escritorio, el puntero desplaza fondo, plano medio, primer plano y mundo del portal con amplitudes diferentes; se suspende durante lectura, menú, inspección y transiciones. Abrir un objeto aproxima el fondo a `1.13` y el primer plano a `1.18` antes de mostrar la lectura. Los objetos usan un círculo claro de `1.75rem` dentro de un área mínima de `44px`; su etiqueta aparece en hover o foco. El hover ilumina el círculo con sol y lo amplía a `1.08`, sin giro. Las flechas izquierda y derecha permiten cambiar de escena.

A 720px el refugio usa **fondo y primer plano verticales propios**, con `width: max(100vw, 47.34dvh)` y `height: max(100dvh, 211.24vw)`. Sus objetos y fotografías tienen coordenadas móviles específicas. Las etiquetas se muestran siempre; ¿Hablamos? se coloca por encima y hacia la izquierda del punto de la silla. El texto lateral del refugio desaparece. Las otras escenas conservan el mundo panorámico: el arrastre táctil horizontal desplaza el mundo dentro de sus límites, y enfocar un objeto centra su coordenada horizontal dentro del rango disponible. El arrastre se distingue de un toque a partir de `12px` y evita abrir un objeto después de desplazar la escena.

Las transiciones del umbral duran `1.4s`; el paso entre jardín y refugio dura `1.65s`, con oclusión de hojas. El jardín revela una pregunta tras una pausa de seis segundos y la taza del refugio ofrece un pequeño texto en hover, foco o toque. Con `prefers-reduced-motion: reduce`, se desactivan las animaciones de escena, parallax e inspección, el cambio de lugar es directo y el desplazamiento suave se elimina. La navegación por foco y el menú siguen dando acceso a los destinos.

## Do's and Don'ts

### Do's

- **Do** mantener hueso y musgo como base y dar a sol y bugambilia el peso de un acento.
- **Do** conservar Cormorant Garamond para la voz editorial y Manrope para lectura y orientación.
- **Do** usar el ritmo, los divisores y los soportes tonales existentes para organizar el contenido.
- **Do** preservar los colores y las proporciones de las fotografías y portadas originales.
- **Do** conservar controles legibles, foco visible, texto que envuelve y una vía de navegación directa.
- **Do** tratar las coordenadas, el panorama y el refugio vertical como decisiones específicas del paisaje.

### Don'ts

- **Don't** repartir los seis colores por igual ni convertir sol y bugambilia en fondos dominantes de lectura.
- **Don't** desplazar el mundo hacia salvia, spa, fantasía o bugambilia neón.
- **Don't** redondear por defecto los bloques editoriales o añadir sombra a cada sección.
- **Don't** sustituir las portadas originales por aproximaciones ni convertir fotografías personales en decoración genérica.
- **Don't** exigir recorrer las escenas para encontrar información o contacto.
- **Don't** usar una transición, el parallax o una etiqueta dependiente de hover como único acceso al contenido.
