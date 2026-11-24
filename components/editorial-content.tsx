import Link from '@/components/site-link';
import { ExternalLink, MessageCircle } from 'lucide-react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import {
  ResourceCatalog,
  VideoPlayer,
  DownloadResource,
} from '@/components/editorial-interactions';
import {
  resources,
  reflections,
  instagramUrl,
  type Destination,
} from '@/lib/content';

function Conversation({
  title = 'Podemos mirar esto juntos.',
}: {
  title?: string;
}) {
  return (
    <aside className="conversation">
      <h2>{title}</h2>
      <p>No necesitas tenerlo todo ordenado para empezar a hablar.</p>
      <Link href="/contacto" className="solid-button">
        ¿Hablamos?
      </Link>
    </aside>
  );
}

const faqs = [
  [
    '¿Tengo que saber exactamente qué me pasa?',
    'No hace falta llegar con una explicación cerrada. Puedes empezar por contar lo que estás viviendo, qué te preocupa o qué te cuesta sostener. La conversación también sirve para poner palabras a eso.',
  ],
  [
    '¿El acompañamiento es online?',
    'Sí. Gabriela ofrece sesiones online. Antes de empezar se acuerdan los detalles prácticos y se resuelven tus preguntas sobre el proceso.',
  ],
  [
    '¿Qué significa una mirada transpersonal?',
    'Es una manera de acompañar que contempla la experiencia de la persona en su conjunto: lo que piensa, lo que siente, cómo se relaciona y el sentido que da a su vida. Se explica y trabaja desde un marco psicológico, sin exigir creencias ni prometer respuestas universales.',
  ],
  [
    '¿Podemos hablar sobre el precio y la frecuencia?',
    'Sí. Son parte del encuadre del acompañamiento. Puedes preguntar por las condiciones actuales y comentar tu disponibilidad antes de decidir si quieres empezar.',
  ],
  [
    '¿Los recursos de la biblioteca sustituyen la terapia?',
    'Los cuadernos y las reflexiones son invitaciones a observar y escribir. No sustituyen un acompañamiento individual ni tienen que encajar igual con todas las personas.',
  ],
];

function Therapy() {
  return (
    <>
      <header className="editorial-heading">
        <h1>Un espacio para atravesarlo contigo.</h1>
        <p>
          No tienes que tener todas las respuestas. Podemos empezar por mirar
          qué te está pasando.
        </p>
      </header>
      <div className="therapy-opening">
        <figure>
          <img
            src="/images/refugio-objetos-v1.webp"
            alt="Dos sillas junto a una mesa, en el refugio abierto al jardín"
          />
          <figcaption>Hay sitio para ti.</figcaption>
        </figure>
        <div>
          <h2>Quizás llegaste hasta aquí porque…</h2>
          <ul className="recognition-list">
            <li>Tu cabeza no para y te cuesta descansar.</li>
            <li>Algo está cambiando y todavía no sabes cómo estar con ello.</li>
            <li>Te exiges poder con todo, incluso cuando estás agotado.</li>
            <li>Poner un límite te llena de culpa.</li>
            <li>
              Una relación, una decisión o una etapa de vida te está removiendo.
            </li>
          </ul>
        </div>
      </div>
      <section className="editorial-section two-column">
        <h2>Entender. Hacer espacio. Encontrar tu manera.</h2>
        <div>
          <p>
            La ansiedad es uno de los motivos por los que muchas personas buscan
            acompañamiento. A veces aparece en las relaciones, el trabajo o los
            cambios de vida. No necesitamos reducir toda tu experiencia a una
            etiqueta para empezar a comprenderla.
          </p>
          <p>
            Mi trabajo es acompañarte a reconocer lo que ocurre, escuchar lo que
            necesitas y explorar cómo te relacionas con tus pensamientos, tus
            emociones y tus vínculos.
          </p>
          <p>
            Hay espacio para herramientas concretas y también para preguntas más
            profundas. El proceso se construye contigo, atendiendo a tu momento
            y a tu ritmo.
          </p>
        </div>
      </section>
      <section className="editorial-section two-column">
        <h2>Cómo acompaño</h2>
        <div>
          <p>
            Soy Gabriela Laurentin, psicóloga. Acompaño procesos de ansiedad y
            transformaciones vitales desde una mirada transpersonal, con
            conocimiento profesional y experiencia humana.
          </p>
          <p>
            La primera conversación permite conocer qué te trae, qué esperas y
            qué necesitas. También es un espacio para preguntar y entender cómo
            sería trabajar juntos.
          </p>
          <p>
            Podemos mirar la exigencia, el control, la culpa, los límites y los
            cambios en tus relaciones o tu identidad. Lo que trabajemos
            dependerá de tu experiencia, no de un recorrido prefijado.
          </p>
          <p>
            Ofrezco acompañamiento online. Las condiciones prácticas se acuerdan
            antes de empezar, para que puedas decidir con claridad.
          </p>
          <Link href="/gabriela" className="editorial-link">
            Conocer a Gabriela
          </Link>
        </div>
      </section>
      <section className="editorial-section">
        <h2>Antes de sentarte</h2>
        <Accordion className="faq-list">
          {faqs.map(([question, answer], i) => (
            <AccordionItem key={question} value={`faq-${i}`}>
              <AccordionTrigger>{question}</AccordionTrigger>
              <AccordionContent>
                <p>{answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
      <Conversation title="No tienes que poder con todo a solas." />
    </>
  );
}

function Gabriela() {
  return (
    <>
      <header className="editorial-heading">
        <h1>Hola, soy Gabriela.</h1>
        <p>
          Psicóloga. Persona. Alguien que también sigue aprendiendo a habitar
          los cambios.
        </p>
      </header>
      <div className="bio-opening">
        <figure>
          <img
            src="/photographs/gabriela-cotidiana.webp"
            alt="Gabriela trabajando con su tableta, rodeada de plantas y junto a su perro"
          />
          <figcaption>Gabriela Laurentin · Psicóloga</figcaption>
        </figure>
        <div>
          <h2>Conocimiento clínico atravesado por experiencia humana.</h2>
          <p>
            Nací y crecí en Venezuela, donde estudié psicología. Al emigrar a
            España mi vida profesional tomó otros caminos: trabajé en una
            multinacional y llegué al marketing.
          </p>
          <p>
            La incertidumbre, la exigencia y una crisis de ansiedad me llevaron
            a reconocer algo que hoy sigue siendo importante para mí: también
            necesitaba compañía. Ser psicóloga no me hacía ajena a lo que
            sentía.
          </p>
          <p>
            De aquella experiencia nació una pregunta: ¿qué pasa con las
            personas que están atravesando algo así y no saben qué les ocurre o
            cómo transitarlo?
          </p>
          <p>
            Abraza tu Paz creció desde esa pregunta. Hoy acompaño procesos de
            ansiedad, relaciones y cambios de vida con más calma y menos juicio.
          </p>
        </div>
      </div>
      <section className="editorial-section" id="conoceme">
        <h2>Por qué existe Abraza tu Paz</h2>
        <p className="section-intro">
          En este vídeo comparto mi historia y el momento en el que empezó a
          tomar forma el proyecto.
        </p>
        <VideoPlayer />
      </section>
      <section className="editorial-section" id="polaroids">
        <h2>Fragmentos de una vida</h2>
        <p className="section-intro">
          Hay una vida alrededor de lo que hago: vínculos, lugares, proyectos y
          momentos cotidianos. Estas son algunas imágenes de esa historia.
        </p>
        <Link href="/#polaroids" className="editorial-link">
          Mirar las fotografías del refugio
        </Link>
      </section>
      <section className="editorial-section two-column">
        <h2>Sentarnos a mirar, sin una respuesta de antemano.</h2>
        <div>
          <p>
            Mi experiencia personal no sustituye mi formación ni significa que
            haya vivido exactamente lo mismo que tú. Me recuerda que detrás de
            cada proceso hay una persona con su historia, su contexto y su
            propia manera de sentir.
          </p>
          <p>
            Trabajo desde la psicología transpersonal y una mirada integral. La
            cercanía, la escucha y el criterio profesional conviven en el
            acompañamiento.
          </p>
          <Link href="/terapia" className="editorial-link">
            Mi manera de acompañar
          </Link>
        </div>
      </section>
      <Conversation />
    </>
  );
}

function Library() {
  return (
    <>
      <header className="editorial-heading">
        <h1>La biblioteca</h1>
        <p>
          Algo que leer. Algo que escuchar. Una pregunta con la que quedarte.
        </p>
      </header>
      <ResourceCatalog />
      <section className="library-note">
        <h2>A tu ritmo.</h2>
        <p>
          No hace falta hacerlo todo. Puedes elegir lo que te acompañe hoy,
          dejar una pregunta abierta y volver cuando lo necesites.
        </p>
      </section>
    </>
  );
}

function Reflections() {
  return (
    <>
      <header className="editorial-heading">
        <h1>Una manera de mirar.</h1>
        <p>
          Pequeñas pausas para reconocer lo que ocurre, hacer espacio y volver a
          preguntarte.
        </p>
      </header>
      <div className="reflection-list">
        {reflections.map((item) => (
          <Link
            href={`/reflexiones/${item.slug}`}
            key={item.slug}
            className="reflection-row"
          >
            <span>
              {item.topic} · {item.readTime}
            </span>
            <h2>{item.title}</h2>
            <p>{item.excerpt}</p>
            <span className="reflection-read">Leer la reflexión</span>
          </Link>
        ))}
      </div>
      <Conversation title="Hay cosas que necesitan conversación." />
    </>
  );
}

function Projects() {
  return (
    <>
      <header className="editorial-heading">
        <h1>Lo que también cultivamos.</h1>
        <p>El acompañamiento también puede tomar una forma compartida.</p>
      </header>
      <section className="project-story" id="cuaderno-solidario">
        <div className="project-image">
          <img
            src="/photographs/gabriela-cotidiana.webp"
            alt="Gabriela trabajando con su tableta, junto a su perro y entre plantas; fotografía seleccionada para Cuaderno Solidario"
            loading="lazy"
          />
        </div>
        <div>
          <h2>Cuaderno Solidario</h2>
          <p>
            Una iniciativa de Abraza tu Paz para acompañar a personas afectadas
            por los terremotos en Venezuela, poniendo recursos de cuidado y
            reflexión al servicio de una experiencia colectiva.
          </p>
          <p>
            Forma parte de una mirada que reconoce el valor de los gestos
            pequeños y de la compañía en momentos difíciles.
          </p>
          <a
            className="editorial-link"
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Conocer las iniciativas en Instagram{' '}
            <ExternalLink size={14} aria-hidden="true" />
          </a>
        </div>
      </section>
      <section className="editorial-section two-column">
        <h2>Respira Venezuela</h2>
        <div>
          <p>
            Gabriela ha participado en espacios de acompañamiento gratuito
            vinculados a Venezuela. La escucha y el cuidado también pertenecen a
            la vida comunitaria.
          </p>
          <p>
            Puedes seguir las publicaciones de Abraza tu Paz para conocer las
            iniciativas que se comparten y sus formas de participación.
          </p>
        </div>
      </section>
      <aside className="project-close">
        <p>
          Un gesto no cambia todo.
          <br />
          Puede cambiar algo.
        </p>
        <Link href="/biblioteca">Visitar la biblioteca</Link>
      </aside>
    </>
  );
}

function Contact() {
  return (
    <>
      <header className="editorial-heading">
        <h1>Hay una silla para ti.</h1>
        <p>
          Puedes empezar con una pregunta. No hace falta saber todavía cómo
          contar toda tu historia.
        </p>
      </header>
      <div className="contact-opening">
        <figure>
          <img
            src="/images/refugio-objetos-v1.webp"
            alt="Una silla disponible en un refugio cálido abierto al jardín"
          />
        </figure>
        <div>
          <h2>¿Hablamos?</h2>
          <p>
            Si quieres conocer el acompañamiento, preguntar por las sesiones
            online o saber cómo empezar, puedes escribir a Gabriela.
          </p>
          <a
            className="solid-button"
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={18} aria-hidden="true" />
            Escribir a Gabriela en Instagram
          </a>
          <p className="contact-caption">@abrazatupaz</p>
          <h3>Una primera conversación</h3>
          <p>
            Puedes contar brevemente qué estás buscando y preguntar por las
            condiciones actuales de las sesiones. No necesitas enviar detalles
            íntimos para iniciar el contacto.
          </p>
          <Link href="/terapia" className="editorial-link">
            Antes de empezar, conocer la terapia
          </Link>
        </div>
      </div>
      <section className="editorial-section two-column">
        <h2>Decidir con calma.</h2>
        <div>
          <p>
            Empezar terapia también implica encontrar una forma de
            acompañamiento que tenga sentido para ti. Puedes preguntar, conocer
            cómo trabaja Gabriela y tomarte un tiempo para decidir.
          </p>
          <p>
            Este canal está pensado para información y contacto. Si necesitas
            atención inmediata, acude a los servicios de urgencias de tu lugar
            de residencia.
          </p>
        </div>
      </section>
    </>
  );
}

export function EditorialContent({
  destination,
}: {
  destination: Destination;
}) {
  return (
    <article className={`editorial-page editorial-page--${destination}`}>
      {destination === 'terapia' ? (
        <Therapy />
      ) : destination === 'gabriela' ? (
        <Gabriela />
      ) : destination === 'biblioteca' ? (
        <Library />
      ) : destination === 'reflexiones' ? (
        <Reflections />
      ) : destination === 'proyectos' ? (
        <Projects />
      ) : (
        <Contact />
      )}
      <footer className="editorial-footer">
        <span>abraza tu paz</span>
        <p>Con más calma y menos juicio.</p>
        <Link href="/contacto">¿Hablamos?</Link>
      </footer>
    </article>
  );
}

export function ResourceDetail({ slug }: { slug: string }) {
  const resource = resources.find((r) => r.slug === slug)!;
  return (
    <article className="editorial-page">
      <Link href="/biblioteca" className="back-link">
        Volver a la biblioteca
      </Link>
      <div className="resource-detail">
        <div className="resource-detail__cover">
          <img
            src={`/resources/${resource.cover}`}
            alt={`Portada de ${resource.originalTitle}`}
          />
          <span>
            {resource.date} · {resource.pages} páginas
          </span>
        </div>
        <div>
          <header className="editorial-heading">
            <h1>{resource.title}</h1>
            <p>{resource.description}</p>
          </header>
          <DownloadResource title={resource.title} file={resource.file} />
          <p className="resource-credit">
            Un cuaderno de Gabriela Laurentin · Abraza tu Paz
          </p>
          {resource.sections.map((section) => (
            <section key={section.title} className="resource-section">
              <h2>{section.title}</h2>
              <p>{section.text}</p>
            </section>
          ))}
        </div>
      </div>
      <aside className="resource-note">
        <p>
          Este es el cuaderno original. Tómalo como una invitación a observar y
          escribir, sin exigirte respuestas perfectas. Si algo te resulta
          difícil de sostener a solas, puedes hablarlo en un espacio de
          acompañamiento.
        </p>
        <Link href="/terapia">Conocer el acompañamiento</Link>
      </aside>
    </article>
  );
}

export function ReflectionDetail({ slug }: { slug: string }) {
  const item = reflections.find((r) => r.slug === slug)!;
  return (
    <article className="editorial-page reflection-article">
      <Link href="/reflexiones" className="back-link">
        Volver a las reflexiones
      </Link>
      <header className="editorial-heading">
        <h1>{item.title}</h1>
        <p>{item.excerpt}</p>
        <span className="article-meta">
          {item.topic} · Lectura de {item.readTime}
        </span>
      </header>
      <div className="article-body">
        {item.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <blockquote>{item.question}</blockquote>
      </div>
      <Conversation />
    </article>
  );
}
