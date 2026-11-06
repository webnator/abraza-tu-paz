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

La revisión más reciente separa dos momentos: una bienvenida centrada con fotografía y el jardín difuminado detrás; «Conversar conmigo» abre después un chat guiado abajo a la derecha. Se añade al recorrido existente; no sustituye la lectura de la tablilla ni crea otra página.

- Bienvenida propuesta en `lib/first-visit.ts`, con estado `pending-client-approval`: «Algo te trajo hasta este jardín», permiso para no tenerlo todo claro y propuesta de conversar. El árbol del chat está en `lib/guided-conversation.ts`: preguntas y respuestas sobre acompañamiento, recursos, exploración y contacto. Todo el texto nuevo está pendiente de aprobación de Gabriela.
- Fotografía real ya aportada: `public/photographs/gabriela-cotidiana.webp`. Se reutiliza, sin generar un retrato ni alterar la fotografía.
- Bienvenida en panel hueso centrado, con veladura oscura y blur de 6px. «Conversar conmigo» abre el chat; «Cerrar», exterior y Escape devuelven al paisaje. Un cierre no inicia la conversación automáticamente.
- Se programa tras `2200ms` visibles sin lectura, menú, álbum, tablilla, chat, herramientas de desarrollo, transición, carga activa o error de paisaje. Si se abre otro diálogo o la pestaña pasa a segundo plano, se cancela el temporizador y se vuelve a programar cuando corresponde. Abrir el chat voluntariamente también marca la bienvenida como atendida.
- Se guarda únicamente `abraza-tu-paz:welcome-seen:v1 = 1` en `localStorage`, al mostrarse. Las respuestas no se guardan ni se envían. Las visitas posteriores en ese navegador no la abren de nuevo; si el almacenamiento no está disponible, se mantiene el recuerdo durante la visita actual.
- En desarrollo, `</>` → «Probar primera visita» borra esa marca, reinicia el hilo de prueba y repite la espera de 2,2 segundos. Este control no se renderiza en producción; la bienvenida y el chat sí forman parte del sitio.

## Conversación que se puede retomar

- Historial acumulado con mensajes de Gabriela a la izquierda y elecciones de la persona a la derecha. Cada opción añade su turno y nuevas respuestas; las anteriores permanecen en el hilo. Hay varias rondas antes de la propuesta de consultar una cita.
- El encabezado indica «Conversación guiada». No hay estado en línea, indicadores ficticios de escritura, campo de texto libre ni envío al servidor. Es una conversación local con opciones redactadas, no atención clínica en vivo.
- Un único control de minimizar. Al cerrarlo queda una bolita de 56px abajo a la derecha. Reabrirla conserva el hilo, también después de visitar objetos del refugio. Se mantiene en la memoria de la visita, sin persistir las elecciones en `localStorage`, cookies o historial de URLs.
- El chat no bloquea el jardín. La navegación por objetos permanece en `/`, y las opciones de recursos/acompañamiento señalan los objetos correspondientes del refugio. Otro diálogo tiene prioridad y minimiza el chat conservando sus mensajes.
- WhatsApp: el usuario autorizó explícitamente su número **+34 654 325 653** como destino provisional el 6 de noviembre de 2026. Configuración en `lib/contact.ts`, marcada `temporary-review-contact`. No es el número confirmado de Gabriela; sustituir antes de publicar. El enlace abre `wa.me` con un saludo genérico sobre las sesiones, sin incluir respuestas del chat ni enviar un mensaje automáticamente. No hay integración de calendario ni cita confirmada por pulsar el enlace.
- Verificación reproducible: `node scripts/verify-first-visit.mjs`; informe `docs/review/first-visit-verification.json`. Cubre espera, centrado, blur, regreso, repetición manual, varias rondas, persistencia al minimizar, navegación del refugio, contacto correcto y cierre exterior en escritorio y móvil. WhatsApp se verifica inspeccionando el enlace; no se abre ni se envían mensajes durante QA.
