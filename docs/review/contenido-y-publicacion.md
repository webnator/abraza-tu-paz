# Revisión de contenido y preparación para publicar

Implementación local en `atp-web-completa`, basada en `immersive-transition-v2`. La variante `camera-turn-v3` sigue intacta. No se ha publicado.

## Contenido integrado

- Bienvenidas: lectura opcional de la tablilla y bienvenida centrada de primera visita con fotografía real de Gabriela, que abre un chat guiado con varias rondas e historial. Textos centralizados en `lib/entrance-welcome.ts`, `lib/first-visit.ts` y `lib/guided-conversation.ts`, con procedencia en `docs/reference/bienvenida-jardin.md`. Pedir aprobación o versiones definitivas a Gabriela.
- Terapia: reconocimiento, mirada profesional, enfoque transpersonal, acompañamiento online y FAQs. No se ha inventado precio, duración o frecuencia.
- Gabriela: relato basado en el briefing, investigación y vídeo de 2023; álbum de siete polaroids seleccionadas y compuestas por Gabriela, recibido por email el 9 de octubre e integrado el 23 de octubre de 2026. Los rótulos, marcos y orden originales se conservan; los textos de apoyo son descripciones editoriales, no anécdotas atribuidas.
- Biblioteca: cuatro fichas, portadas y PDFs originales sin modificaciones; categorías Hacer, Leer y Escuchar.
- Escuchar: vídeo real aportado. No hay audios de Gabriela generados o simulados.
- Reflexiones: tres propuestas editoriales nuevas derivadas de temas de marca. Necesitan revisión de Gabriela antes de publicar: «Cambiar también puede sentirse como perder», «Poner un límite y sentir culpa», «Cuando tu cabeza no para».
- Proyectos: Cuaderno Solidario y Respira Venezuela, descritos como iniciativas documentadas. La fotografía de Cuaderno Solidario está identificada por Gabriela en el nuevo material. No se promete inscripción ni vigencia actual.
- Contacto: acceso al perfil público @abrazatupaz y WhatsApp desde el chat, con el número provisional de Williams expresamente autorizado para revisión el 6 de noviembre de 2026. Está identificado como temporal en `lib/contact.ts`; no se presenta como número validado de Gabriela en la documentación. Los teléfonos antiguos y Calendly siguen sin convertirse en canales activos.

## Datos solicitados

Se ha pedido de forma agrupada confirmar: canal de contacto/enlace de reserva, teléfono actual, precio, duración y frecuencia. La interfaz queda funcional con Instagram como canal conocido.

## Validación antes de publicación

Validar también la bienvenida de la tablilla y la conversación de primera visita con Gabriela o pedirle sus textos definitivos antes de publicarlas. Las propuestas locales se identifican como pendientes en el panel de desarrollo y en su referencia de contenido.

1. Confirmar los datos prácticos y el canal de reserva; sustituir el WhatsApp provisional de Williams por el número definitivo de Gabriela antes de publicar. El CTA consulta una cita, no confirma una reserva.
2. Validar el texto de Terapia y la explicación transpersonal con Gabriela.
3. Aprobar las tres reflexiones y las descripciones editoriales del álbum. Los antiguos cinco fragmentos genéricos en primera persona se han sustituido por las siete polaroids aportadas y textos breves sin anécdotas inventadas.
4. Confirmar el uso público de las fotos de pareja, maternidad y menores. La selección nueva de Gabriela incluye «Loreto - 2026», con cuatro menores: se incorpora a la revisión local junto al resto del álbum, sin afirmar permisos públicos ni identidades no facilitadas.
5. Decidir si el vídeo de 2023 se conserva o se sustituye. No se pudo descargar para inspección audiovisual; se revisó la transcripción automática y los metadatos. La integración ofrece reproducción bajo demanda y enlace alternativo.
6. Revisar los workbooks: erratas, `@`, formulaciones clínicas, teléfono personal y cita atribuida a Brené Brown. Los originales se mantienen íntegros; la descarga local muestra los documentos aportados.
7. Confirmar estado, destinatarios y forma de participación de cada proyecto solidario.
8. Aportar datos del responsable y condiciones de los servicios para redactar los textos legales correspondientes. No hay formularios que guarden datos ni analítica incorporada.

## Fuentes y activos

Las fuentes originales se conservan en `../research/sources/`: briefing inicial recuperado de otra exportación idéntica y paquete completo de contenido. El ZIP original de Diseño ya no está en la ruta recibida; su paleta, jerarquía y reglas están conservadas en `docs/reference` y en la investigación original. No se ha recreado una exportación como si fuese el original.

Las imágenes nuevas y prompts exactos están en `../research/generated-assets-v2/`. Versiones web, fotografías y PDFs se sirven desde `public/`. Los rasters previos y originales permanecen disponibles; las procedencias se registran en `media-manifest.json` y sidecars.

La pieza 04 se conserva en `../research/sources/04-polaroids-mari/`. Su análisis y clasificación están en `docs/reference/polaroids-mari-2026-10.md`. El PDF biográfico no se sirve públicamente. La firma del email no se interpreta como confirmación de un canal de reserva y sus datos no se publican.

## Decisiones de implementación

- Corrección tras revisión del usuario: las polaroids viven como objeto de la mesa del refugio en `/`, sobre el paisaje y sin panel biográfico. Al cerrarlas se permanece en la misma escena, con parallax activo. El acceso antiguo `/gabriela#polaroids` conduce al objeto inmersivo `/#polaroids`; se retira la duplicación del álbum en la biografía. Verificación completa en `polaroids-verification.json`.

- El refugio se reconoce a distancia desde el jardín. El área interactiva cubre su puerta y fachada.
- Se conserva la oclusión vegetal, con cierre completo antes del cambio.
- En móvil el refugio tiene una composición vertical propia y primer plano transparente, con todos sus objetos dentro del encuadre. El jardín/entrada permiten desplazamiento horizontal; el foco centra objetos cuando resulta necesario.
- Las escenas y sus áreas interactivas comparten coordenadas. Las fotos del refugio se mueven con su fondo.
- El menú es global; los objetos y enlaces abren las mismas URLs.
- Los lectores son páginas renderizadas en servidor sobre el lugar. Su cierre vuelve al paisaje conservando la escena; Atrás sigue el historial real.
- Solo hay un hallazgo del jardín, revelado tras permanecer unos segundos. No se añade sonido ambiental.
- La lectura utiliza hueso opaco para asegurar legibilidad, con el paisaje visible en el margen. El menú conserva translucidez.

## Cierre de verificación local

Revisión independiente final: los dos hallazgos responsivos están resueltos. La Biblioteca refluye al 200% de texto, y la etiqueta de contacto del refugio móvil permanece legible y separada de Terapia. El sitio compila y las rutas/recursos pasan la verificación documentada en `goal-audit.md`.
