# Bienvenida de la tablilla — 6 de noviembre de 2026

## Estado del texto

**Adaptación editorial provisional; pendiente de aprobación de Gabriela.** No se presenta como un texto final escrito por ella. El texto implementado está centralizado en `lib/entrance-welcome.ts`, con estado `pending-client-approval`. El panel de desarrollo también muestra ese pendiente.

## Material aportado utilizado

- `../research/sources/01-briefing/Private & Shared/Briefing 3cd3f763cd9880f5b7c1d10da905a8d1.md`, apartados «Concepto rector: El jardín secreto» y «El significado psicológico». Aporta «Abraza tu Paz es un jardín que se descubre», el jardín como vida, la convivencia de luz y sombra, flores y hojas secas, y aprender a habitarlo en lugar de controlarlo.
- `../research/sources/03-contenido/Private & Shared/Capas - Páginas/Capa 1 - La entrada 3ce3f763cd9880ed86d1df19aeab5099.html`. Aporta literalmente la alternativa «Pasa. Hay sitio para ti.» y la disponibilidad del menú para que explorar sea una invitación.
- La petición actual del usuario define la lectura opcional de la tablilla, la exploración a tu ritmo y la posibilidad de encontrar algo que resuene o dejarlo pasar. Sustituye el antiguo comportamiento de navegar al pulsar el cartel.

## Pendiente para el cliente

Pedir a Gabriela que valide o aporte una bienvenida breve para este objeto: significado psicológico del jardín, permiso para recorrerlo a su ritmo, qué puede encontrarse y disponibilidad del menú. La versión local sirve para revisar esa experiencia; no añade promesas clínicas, relatos personales ni credenciales.

## Interacción

La tablilla abre una lectura centrada con el mismo material físico y el paisaje detrás de una veladura oscura transparente. No cambia la URL ni la escena. El título tiene margen superior y un relieve hundido en la variante de madera; cuerpo y estrellas conservan su tratamiento aprobado. «Cerrar» queda por encima del clavo inferior. Se cierra con ese control, al pulsar fuera o con Escape, y el foco vuelve al cartel. No hay una X adicional. Durante la lectura no funciona la navegación por flechas ni el parallax; al cerrar se reanuda la exploración. Para entrar al jardín se pulsa la verja.

## Bienvenida automática de primera visita

Petición posterior del usuario: abrir, después de un par de segundos, una bienvenida sobria con fotografía y una pequeña conversación con Gabriela. Se añade al recorrido existente; no sustituye la lectura de la tablilla ni crea otra página.

- Texto propuesto en `lib/first-visit.ts`, con estado `pending-client-approval`. «Hola, soy Gabriela», la pregunta «¿Qué te trae por aquí hoy?» y tres caminos: explorar, acompañamiento y recursos. Las respuestas son una propuesta editorial nueva basada en la voz documentada y contenidos existentes; pedir aprobación de Gabriela.
- Fotografía real ya aportada: `public/photographs/gabriela-cotidiana.webp`. Se reutiliza, sin generar un retrato ni alterar la fotografía.
- Panel hueso abajo a la derecha, con el paisaje visible bajo una veladura suave. Las opciones abren respuestas breves; explorar devuelve a la misma escena, y acompañamiento/recursos señalan la silla o la biblioteca del refugio dentro de `/`.
- Se programa tras `2200ms` visibles sin lectura, menú, álbum, tablilla, herramientas de desarrollo, transición, carga activa o error de paisaje. Si se abre otro diálogo o la pestaña pasa a segundo plano, se cancela el temporizador y se vuelve a programar cuando corresponde.
- Se guarda únicamente `abraza-tu-paz:welcome-seen:v1 = 1` en `localStorage`, al mostrarse. Las respuestas no se guardan ni se envían. Las visitas posteriores en ese navegador no la abren de nuevo; si el almacenamiento no está disponible, se mantiene el recuerdo durante la visita actual.
- Un solo cierre, además de exterior y Escape: «Cerrar» o, en la respuesta de exploración, «Seguir mirando». No se muestran ambos a la vez. Foco protegido y restituido al contexto anterior. El título recibe el foco inicial y las respuestas se anuncian enfocando su encabezado. Movimiento reducido respetado.
- En desarrollo, `</>` → «Probar primera visita» borra solo esa marca y repite la espera de 2,2 segundos. Este control no se renderiza en producción; la bienvenida automática sí forma parte del sitio.
- Verificación reproducible: `node scripts/verify-first-visit.mjs`; informe `docs/review/first-visit-verification.json`. Cubre espera, primera visita, regreso, repetición manual, respuestas, objetos del refugio, bloqueo de navegación detrás, diálogo previo y cierre exterior, en escritorio y móvil.
