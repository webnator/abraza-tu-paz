# Auditoría del goal — versión local completa

Objetivo: implementación completa para revisión final en local. No incluye publicación. La evidencia se refiere al estado de `atp-web-completa` del 7 de octubre de 2026.

| Requisito | Evidencia y resultado |
| --- | --- |
| Fuentes de marca, diseño y contenido | Cuatro documentos en `docs/reference`; briefing y exportación completa con imágenes/HEIC/PDF conservados en `../research/sources`. La exportación ZIP de Diseño no estaba disponible de nuevo; se conservan sus reglas y paleta previamente leídas. |
| Rama nueva y preservación de variantes | `atp-web-completa` parte de `immersive-transition-v2` (2226a26). `camera-turn-v3` continúa en 41bba09. Ninguna rama original se modificó. |
| Marca y voz | Contenido real de ansiedad, cambios, relaciones y mirada transpersonal; biografía basada en fuentes; no datos clínicos, económicos o autobiográficos inventados. |
| Entrada, jardín y refugio | Tres escenas y navegación de ida/vuelta, control por teclado, parallax, aproximación a objetos y oclusión vegetal completa. |
| Refugio visible desde el jardín | Imagen nueva con edificio distante, sendero hacia su puerta y zona interactiva sobre fachada/entrada; capturas jardín desktop y móvil. |
| Imágenes y capas | Fondos nuevos, madera transparente, foregrounds de escritorio reutilizados y composición/foreground vertical dedicados al refugio móvil. Originales y prompts exactos conservados. |
| Escena contenida y hallazgo único | Entrada sin instrucciones permanentes ni barra de progreso; una sola pregunta del jardín revelada tras permanencia. |
| Refugio explorable | Sillas → terapia/contacto; biblioteca → recursos; polaroids → Gabriela; fotografía → vídeo; matcha → hospitalidad. Fotos reales en el lugar y lector de historias. |
| Menú global y destinos compartidos | Seis destinos; objetos y enlaces usan las mismas rutas. Menú accesible desde la entrada. Navegación directa dentro de lectura. |
| URLs, recarga e historial | 14 rutas verificadas con HTML renderizado, título y descripción; recurso/navegación/recarga/Atrás comprobados en navegador. Cierre/Escape conserva escena y devuelve foco. |
| Paleta y diseño | Seis colores normativos; fuentes existentes y superficies editoriales coherentes con la guía. Detector Impeccable sin hallazgos. |
| Contenido completo | Terapia/FAQ, Gabriela/biografía/galería/vídeo, Biblioteca/catálogo/fichas, tres Reflexiones, Proyectos y Contacto. |
| Workbooks originales | Cuatro PDFs idénticos byte a byte respecto al paquete fuente. Descarga real en navegador comprobada en adulto responsable. |
| Vídeo y audio | YouTube real con reproducción explícita, aviso de conexión y enlace alternativo. Sin audio ambiental ni voz simulada. |
| Contacto con canales confirmados | Enlace real al perfil público @abrazatupaz. Calendly, teléfono y condiciones prácticas no se inventan; solicitados de forma agrupada. |
| Escritorio/móvil | 21 capturas finales válidas confirmadas por revisión independiente, más capturas de transición y ampliación. 1440×900 y 390×844. |
| Accesibilidad | Foco, teclado, Escape, navegación directa, alternativas táctiles y movimiento reducido verificados. A 200% texto en Biblioteca: ancho y scrollWidth 310px, sin desborde. |
| Estados y rendimiento | Escenas WebP, originales separados, lazy loading editorial, precarga y recuperación de imagen; estado/error de descarga y vídeo alternativo. |
| Build y errores | TypeScript y build pasan. Consolas de las sesiones desktop/mobile sin errores. 19 pruebas HTTP/activos/descargas/404 sin fallos. |
| Procedencia | Escaneo de 28 rasters: ninguno sin procedencia. `media-manifest.json`, sidecars y originales generados con prompts exactos. |
| Documentación y handoff | README, PRODUCT, sistema visual extraído, plan vivo actualizado, revisión editorial/publicación y esta matriz. Servidor local retenido. |

## Revisión visual independiente

La revisión completa validó las 21 capturas y encontró dos problemas P2: desborde de las pestañas de Biblioteca al ampliar el texto al 200% y recorte de la etiqueta de contacto en móvil.

- Biblioteca: resuelto mediante ancho máximo y reflujo de pestañas; prueba 390px/32px confirma 310px de ancho y 310px de scrollWidth.
- Contacto: resuelto colocando la etiqueta sobre el marcador de la silla, separada de Terapia y del matcha.

El último veredicto es **ship**, limitado a esos hallazgos y a la revisión local. No es una declaración de preparación legal, clínica o editorial para publicar.

## Validaciones externas pendientes

Se conservan en `contenido-y-publicacion.md`: condiciones y reserva, revisión de copy y reflexiones, aprobación de fotografías, vigencia del vídeo y proyectos, correcciones de workbooks y datos legales. El goal solicita explícitamente distinguir implementación de publicación y entregar esta lista.
