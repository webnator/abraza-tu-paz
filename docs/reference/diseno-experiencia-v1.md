# Abraza tu Paz — diseño de experiencia v1

> Primera traducción visual de los fundamentos de marca. No es todavía una arquitectura de contenidos definitiva.

## La experiencia

La web no se comporta como una página vertical. Se entra y se recorre en tres estados:

1. **El umbral:** decidir entrar. Presenta la promesa y abre la verja.
2. **El jardín:** explorar, escuchar y reconocer. Los elementos del paisaje contienen pequeñas revelaciones.
3. **El refugio:** llegar, sentarse y conectar. La terapia, Gabriela y los recursos viven como objetos del lugar.

El mapa permite saltar entre estados sin obligar a realizar el recorrido completo. En escritorio, el cursor desplaza fondo, contenido y primer plano a velocidades diferentes; en móvil, la composición conserva las capas pero prioriza el tacto y la legibilidad.

## Lo aprendido de la referencia de Miu Miu

Se toma su gramática de interacción, no su estética ni sus recursos:

- Pantalla completa y sin scroll convencional.
- Entrada explícita a la experiencia.
- Espacio tratado como un lugar, no como un conjunto de secciones.
- Movimiento de cámara y profundidad al desplazar el cursor.
- Objetos contextuales que se revelan al acercarse.
- Zoom o pausa de la escena para leer un hallazgo.
- Microrecompensas que confirman que la persona ha descubierto algo.
- Navegación alternativa para quien quiere llegar de forma directa.

La adaptación de Abraza tu Paz reduce la teatralidad comercial y añade quietud, respiración, legibilidad y una salida clínica clara.

## Dirección visual

- Jardín real, imperfecto y cuidado; nunca spa, fantasía ni retiro espiritual.
- Fotografía editorial naturalista, con textura, grano suave, sombra profunda y luz cálida localizada.
- Paleta: verde oliva oscuro, piedra y papel crema, buganvilla profunda, arcilla y pequeños puntos ámbar.
- Tipografía serif humana para la voz emocional; sans discreta para orientación y acciones.
- Superficies de papel, cristal empañado y rótulos discretos como puentes entre paisaje y contenido.
- Los puntos interactivos deben parecer hallazgos dentro del lugar, no pines de un mapa turístico.

## Sistema cromático confirmado

La paleta se articula bajo la idea de **espiritualidad encarnada**: la dimensión interior de la marca siempre conserva cuerpo, materia, sombra y suelo. Los porcentajes son una jerarquía perceptiva orientativa, no una cuota mecánica que deba cumplirse en cada pantalla.

| Color | HEX | Función | Peso orientativo |
| --- | --- | --- | ---: |
| Hueso | `#F3EFE5` | Aire, papel, piedra clara y respiración | 40% |
| Musgo profundo | `#34483A` | Vegetación, jardín, sombra y sostén | 30% |
| Tierra húmeda | `#765747` | Suelo, madera, cerámica y cuerpo | 10% |
| Agua mineral | `#75B7B0` | Sentir, agua, vidrio, reflejo e interacción | 10% |
| Sol ATP | `#F2C84B` | Luz, consciencia y descubrimiento | 6% |
| Bugambilia | `#C83D72` | Pulso, intensidad, relaciones y vida | 4% |

Reglas de uso:

- Hueso y musgo forman la base; no se reparten los seis colores por igual.
- Amarillo y bugambilia aparecen como hallazgos y acentos, no como grandes superficies.
- El aqua conserva continuidad con la identidad histórica y se asocia al agua y a estados interactivos.
- El bugambilia debe sentirse floral y corporal, no digital o neón.
- El musgo es profundo y húmedo; se evita el verde salvia y el código visual de wellness genérico.
- Tierra húmeda mantiene el universo anclado en lo material.
- La simbología guía las decisiones del equipo, pero no se explica literalmente en la interfaz.

## Sistema de profundidad

Cada escena tiene, como mínimo:

1. **Fondo fotográfico:** arquitectura general y profundidad del lugar.
2. **Plano ambiental:** luz, sombra y partículas muy contenidas.
3. **Plano de contenido:** pregunta, orientación y objetos interactivos.
4. **Primer plano con transparencia:** hojas, flores o mobiliario muy cercano a cámara.

Las velocidades relativas actuales son aproximadamente 1×, 1,6× y 2,4×. Esto crea volumen sin convertir el movimiento en una demostración técnica.

## Imágenes originales generadas

Las seis imágenes de producción están en `site/public/images/` en AVIF optimizado. Los PNG originales se conservan en `research/generated-assets-v1/` para futuras iteraciones.

| Escena | Fondo | Primer plano transparente |
| --- | --- | --- |
| Umbral | `entrada-base.avif` | `entrada-primer-plano-v2.avif` |
| Jardín | `jardin-base.avif` | `jardin-primer-plano.avif` |
| Refugio | `refugio-base.avif` | `refugio-primer-plano.avif` |

## Prompt set empleado

Todas las piezas se generaron con la herramienta integrada de generación de imágenes. Las imágenes editoriales entregadas fueron referencias de atmósfera, materiales y paleta, no objetivos de copia.

### Fondo — umbral

Fotografía editorial naturalista, panorámica 16:9 con margen para parallax. Arco de piedra envejecida y verja de hierro abierta hacia un sendero, buganvilla magenta y hojas verde oscuro, luz mediterránea de última hora. Profundidad clara de primer, medio y último plano. Sin personas, texto, logos, simetría palaciega, fantasía ni estética de spa.

### Fondo — jardín

Jardín íntimo, vivo e imperfecto; sendero estrecho de tierra y piedra que rodea un pequeño estanque y desaparece entre vegetación en capas. Maceta de terracota, banco sencillo, hojas caídas y flores silvestres irregulares. Luz húmeda y moteada. Sin personas, rótulos, fantasía, resort ni partículas luminosas.

### Fondo — refugio

Estancia modesta abierta al jardín, preparada para una conversación sin prisa: dos sillones de fibras naturales ligeramente distintos, mesa baja, taza, cuaderno cerrado, estantes, lámpara, escritorio y objetos vividos. Luz cálida interior encontrándose con luz natural. Sin personas, texto legible, lujo, cliché de consulta ni fantasía.

### Primeros planos

Recortes fotográficos con transparencia real y composición periférica. Para el umbral: ramas de buganvilla y pétalos. Para el jardín: helechos, flores finas y hojas húmedas. Para el refugio: plantas desenfocadas, borde de madera gastada y una enredadera. Centro mayoritariamente transparente; sin fondos rectangulares, personas, texto ni elementos principales de la escena.

## Decisiones que deberán iterarse

- Comprobar con Gabriela si el jardín se siente suyo cuando está en movimiento, no solo en una imagen estática.
- Afinar cuánto protagonismo tiene la frase inicial frente a la propia verja.
- Definir la arquitectura final del mapa y los accesos rápidos.
- Sustituir el contenido provisional de terapia, biografía y biblioteca por la oferta validada.
- Decidir si la experiencia incorpora sonido y, en ese caso, hacerlo siempre opcional.
- Diseñar la continuidad entre descubrimiento poético e información clínica concreta.
