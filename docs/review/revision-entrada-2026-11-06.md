# Revisión de la entrada — 6 de noviembre de 2026

## Criterio del cliente

La web es el jardín: el parallax no es una portada que conduce a una «web verdadera» convencional. Los contenidos deben integrarse en el lugar. Se revisará su distribución sección a sección; este pase se limita a la entrada y al menú global.

## Cambios realizados

- Nota vertical junto a la verja, unida al plano intermedio del parallax y al mismo mundo espacial que la puerta. Ya no es un botón fijo sobre el viewport. Participa en el acercamiento al cruzar el umbral.
- Papel colgado con cordel y contorno alfa real. Letra manuscrita `Nothing You Could Do`, no una serif ni una fuente de sistema. El texto sigue siendo HTML accesible.
- Tras la corrección del cliente durante la revisión: ancho del 5% del plano, aproximadamente un tercio del área del primer papel propuesto; tipografía proporcionada, exposición al 76% y saturación al 72% para integrarlo en los tonos apagados de la entrada. Se mantiene la tinta musgo oscura.
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
- El movimiento de puntero cambia la posición de la nota de x=940.4 a x=913.7, con transformaciones del plano intermedio de +13.78 a −12.89px. No permanece fija.
- Atajo Terapia comprobado: URL `/`, escena `refugio`, sin `.editorial-overlay`, foco y señal sobre la silla de Terapia.
- Detector ejecutado una vez; conserva avisos de documentación auxiliar de tokens del sistema previo. No se cambia la estética aprobada para silenciarlos.
- Capturas en `.impeccable/review/entrada-nov06-small.png`, `entrada-nov06-mobile-final.png` y `drawer-nov06-desktop.png`.
- Vista real del navegador de la aplicación actualizada para cargar la fuente nueva y dejar la entrada visible. Sin despliegue.
