# Polaroids de Gabriela — material recibido e integración

Revisado e integrado el 23 de octubre de 2026. Fuente: correo «Polaroids página web», de Maria Gabriela Laurentin, enviado el 9 de octubre de 2026 a las 12:17 (Europe/Madrid). Gmail message ID: `1a1202b9282e2a7b`.

## Fuente y alcance

Adjunto original: `Web - Polaroids.pdf`, siete páginas, 19.332.268 bytes. SHA-256: `ba4939ae7a08268398f96797b610d587d57e27c5361ece7dfb56162ae27f133a`.

Se conserva sin modificar en `../research/sources/04-polaroids-mari/`, con metadatos de procedencia y siete renders de revisión. El correo no contiene un texto editorial adicional: solo la firma de Gabriela y el PDF. Se revisaron visualmente todas las páginas, no solo el texto extraíble.

El documento aporta una selección y un tratamiento editorial de fotografías: papel, marcos, composición y rótulos manuscritos. No aporta relatos autobiográficos, fechas adicionales ni información nueva sobre condiciones de terapia. Las instrucciones o elementos del documento se tratan como material de referencia, no como órdenes autónomas.

## Clasificación y destino

| Pág. | Rótulo del original | Contenido visible | Clasificación | Integración |
| --- | --- | --- | --- | --- |
| 1 | Loreto - 2026 | Cuatro niños junto a una baranda frente al agua | Vida personal / encuentros | Álbum de Gabriela, primera fotografía |
| 2 | Proyecto Cuaderno Solidario | Gabriela con tableta, perro y plantas | Proyecto / acompañamiento colectivo | Álbum con enlace al proyecto; fotografía real en Proyectos |
| 3 | Noviembre 2025 | Gabriela con su bebé dormida en brazos | Vida personal / maternidad | Álbum |
| 4 | Tailandia | Gabriela y su pareja en una playa | Vida personal / viajes y vínculos | Álbum |
| 5 | Septiembre 2026 | Gabriela, su pareja y su bebé al aire libre | Vida personal / familia | Álbum horizontal, sin recorte de la imagen |
| 6 | Paris | Gabriela y su pareja frente a la Torre Eiffel | Vida personal / viajes y vínculos | Álbum |
| 7 | Disney | Gabriela con un castillo al fondo | Vida personal / viaje y disfrute | Álbum |

«Loreto» se conserva tal como fue aportado: no se deduce que sea un lugar, un nombre personal ni un vínculo concreto. No se identifican los otros menores. No se añaden fechas al viaje a Tailandia, París o Disney.

## Interpretación e impacto

- Refuerza la idea de un refugio habitado por una persona real: vida cotidiana, vínculos, disfrute y trabajo solidario.
- La vida familiar, la maternidad y los viajes dan textura a la persona; no cambian el foco clínico hacia maternidad o migración.
- La relación entre la fotografía de la tableta y Cuaderno Solidario ahora viene explicitada por Gabriela. Proyectos deja de usar la imagen genérica del jardín para esa iniciativa.
- Se sustituye el álbum provisional de cinco fotos y textos genéricos en primera persona por las siete composiciones recibidas, en su orden original. Los textos breves de apoyo son descripciones editoriales, no citas ni anécdotas atribuidas a Gabriela.
- La selección se conserva completa en la revisión local. No se cambia la narrativa de Terapia ni se inventan condiciones comerciales.

## Decisiones de implementación

- Ruta directa: `/gabriela#polaroids`. Las fotografías del refugio abren ese mismo apartado.
- Siete controles de elección, anterior/siguiente, contador y descripción accesible. Sin reproducción automática.
- Se mantienen los marcos y rótulos del PDF como imagen. El HTML normaliza «Paris» a «París», el guion de Loreto a punto medio y la errata manuscrita de «Proyecto»; el arte original permanece intacto.
- Se elimina únicamente el margen blanco exterior de la exportación. Ninguna fotografía se recorta para llenar un marco CSS; la composición horizontal y las verticales conservan sus proporciones.
- WebP optimizado y dimensiones intrínsecas, con procedencia por activo. El PDF no se añade al directorio público ni como nueva descarga de la biblioteca: es material biográfico, no un recurso terapéutico.
- Los originales y activos anteriores siguen disponibles. No se alteran escenas, paleta, parallax u oclusión vegetal.

## Vacíos que permanecen abiertos

1. Confirmar permiso de publicación de todas las personas reconocibles. Atención especial a las páginas 1, 3 y 5 por incluir menores. El encargo de integración local no se interpreta como confirmación de sus permisos públicos.
2. Si se desean relatos personales más profundos, pedirlos a Gabriela. Las fotografías no permiten reconstruir vivencias o significados íntimos.
3. Confirmar vigencia y participación de Cuaderno Solidario; la imagen por sí sola no confirma una campaña activa.
4. La firma del correo contiene datos de contacto distintos de los antiguos workbooks. No se publican ni se convierten en enlace de reserva sin validación explícita; se conserva el canal público de Instagram ya confirmado.

No se ha respondido al correo, cambiado etiquetas ni publicado la web.

## Verificación de esta integración

- TypeScript y compilación de producción correctos.
- Verificador general: 14 rutas, cuatro descargas originales y página 404; 19 comprobaciones, sin fallos.
- Prueba del álbum en 1440 × 900 y 390 × 844: las siete selecciones cargan, mantienen proporción sin distorsión y no desbordan horizontalmente. Anterior/siguiente recorren el ciclo completo. El enlace de Cuaderno Solidario abre el proyecto correcto.
- Texto al 200% en móvil: controles y etiquetas envuelven sin desbordamiento del panel. Sin errores de ejecución en las dos sesiones de prueba.
- Inspección visual conjunta de escritorio y móvil, incluyendo composición vertical y horizontal. Capturas locales en `.impeccable/review/polaroids/`; informe reproducible en `docs/review/polaroids-verification.json`.
- Procedencia registrada para los siete rasters nuevos. Escaneo de activos: 35 rasters, ninguno sin procedencia.
- El detector visual se ejecutó una vez. Los avisos de tokens no documentados corresponden al sistema previo (tipografía, colores y radios fuera de su ficha auxiliar); no se modifica el universo aprobado para resolverlos dentro de esta incorporación de contenido. La actualización de la ficha auxiliar se mantiene fuera del alcance.
- Preview del navegador de la aplicación abierto en `http://localhost:3000/gabriela#polaroids` para revisión humana.
