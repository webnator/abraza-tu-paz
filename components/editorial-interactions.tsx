'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Play,
  ExternalLink,
  Download,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { resources, reflections, stories, videoUrl } from '@/lib/content';

export function VideoPlayer() {
  const [active, setActive] = useState(false);
  const [failed, setFailed] = useState(false);
  return (
    <div className="video-piece">
      {active && !failed ? (
        <iframe
          title="Gabriela cuenta el origen de Abraza tu Paz"
          src="https://www.youtube-nocookie.com/embed/SGefq5c0lpc?autoplay=1&rel=0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onError={() => setFailed(true)}
        />
      ) : (
        <button
          className="video-cover"
          onClick={() => {
            setFailed(false);
            setActive(true);
          }}
          aria-label="Reproducir: la historia de Abraza tu Paz"
        >
          <img
            src="/photographs/gabriela-cotidiana.webp"
            alt="Gabriela en un momento cotidiano, con su tableta y su perro"
            loading="lazy"
          />
          <span className="video-play">
            <Play aria-hidden="true" fill="currentColor" />
          </span>
          <span className="video-cover-label">
            La historia de Abraza tu Paz{' '}
            <small>2:30 min · Gabriela Laurentin</small>
          </span>
        </button>
      )}
      <div className="video-footnote">
        <p>
          {active
            ? 'También puedes verlo directamente en YouTube.'
            : 'Al reproducir, se conecta con YouTube para mostrar el vídeo.'}
        </p>
        <a href={videoUrl} target="_blank" rel="noopener noreferrer">
          Ver en YouTube <ExternalLink size={14} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}

export function Polaroids() {
  const [index, setIndex] = useState(0);
  const story = stories[index];
  return (
    <section className="photo-stories" aria-label="Álbum de Gabriela">
      <div className="photo-stories__photograph">
        <figure className="polaroid polaroid--authored" key={story.id}>
          <img
            src={story.image}
            alt={story.alt}
            width={story.width}
            height={story.height}
            loading="lazy"
          />
          <figcaption className="sr-only">{story.caption}</figcaption>
        </figure>
        <div className="photo-controls">
          <button
            aria-label="Fotografía anterior"
            onClick={() =>
              setIndex((index + stories.length - 1) % stories.length)
            }
          >
            <ChevronLeft aria-hidden="true" />
          </button>
          <span aria-live="polite" aria-atomic="true">
            <span className="sr-only">Fotografía </span>
            {index + 1} / {stories.length}
          </span>
          <button
            aria-label="Fotografía siguiente"
            onClick={() => setIndex((index + 1) % stories.length)}
          >
            <ChevronRight aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="photo-stories__text" aria-live="polite">
        <h3>{story.caption}</h3>
        <p>{story.text}</p>
        {story.related ? (
          <Link className="editorial-link" href={story.related.href}>
            {story.related.label}
          </Link>
        ) : null}
        <div
          className="photo-stories__choices"
          role="group"
          aria-label="Elegir una fotografía"
        >
          {stories.map((item, i) => (
            <button
              key={item.id}
              aria-pressed={index === i}
              onClick={() => setIndex(i)}
            >
              {item.caption}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ResourceCatalog() {
  const covers = (
    <div className="resource-shelf">
      {resources.map((resource) => (
        <Link
          className={`resource-book resource-book--${resource.color}`}
          href={`/biblioteca/${resource.slug}`}
          key={resource.slug}
        >
          <div className="resource-book__cover">
            <img
              src={`/resources/${resource.cover}`}
              alt={`Portada de ${resource.originalTitle}`}
              loading="lazy"
            />
          </div>
          <h3>{resource.title}</h3>
          <p>{resource.theme}</p>
          <span>Cuaderno · {resource.pages} páginas</span>
        </Link>
      ))}
    </div>
  );
  const reading = (
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
          <h3>{item.title}</h3>
          <p>{item.excerpt}</p>
        </Link>
      ))}
    </div>
  );
  return (
    <Tabs defaultValue="hacer" className="library-tabs">
      <TabsList variant="line" aria-label="Encuentra un recurso">
        <TabsTrigger value="hacer">Hacer</TabsTrigger>
        <TabsTrigger value="leer">Leer</TabsTrigger>
        <TabsTrigger value="escuchar">Escuchar</TabsTrigger>
      </TabsList>
      <TabsContent value="hacer">
        <p className="catalog-intro">
          Cuadernos para mirar lo que estás viviendo y escribir a tu ritmo.
        </p>
        {covers}
      </TabsContent>
      <TabsContent value="leer">
        <p className="catalog-intro">
          Preguntas y perspectivas que puedes llevar a tu vida cotidiana.
        </p>
        {reading}
      </TabsContent>
      <TabsContent value="escuchar">
        <div className="listening-piece">
          <div>
            <h3>La voz detrás de este lugar</h3>
            <p>
              Gabriela cuenta cómo una experiencia de ansiedad, el apoyo
              recibido y una pregunta dieron origen a Abraza tu Paz.
            </p>
            <p>Una historia de cambio, vulnerabilidad y compañía.</p>
          </div>
          <VideoPlayer />
        </div>
      </TabsContent>
    </Tabs>
  );
}

export function DownloadResource({
  file,
  title,
}: {
  file: string;
  title: string;
}) {
  const [state, setState] = useState<'idle' | 'loading' | 'error'>('idle');
  const download = async () => {
    setState('loading');
    try {
      const response = await fetch(`/resources/${file}`);
      if (!response.ok) throw new Error('download');
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = file;
      link.click();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      setState('idle');
    } catch {
      setState('error');
    }
  };
  return (
    <div className="download-actions">
      <button
        className="solid-button"
        onClick={download}
        disabled={state === 'loading'}
      >
        <Download size={17} aria-hidden="true" />
        {state === 'loading'
          ? 'Preparando tu cuaderno…'
          : 'Descargar el cuaderno'}
      </button>
      <a
        href={`/resources/${file}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Leer ${title} en PDF`}
      >
        Leer el PDF <ExternalLink size={15} aria-hidden="true" />
      </a>
      {state === 'error' ? (
        <p role="alert">
          No pudimos preparar la descarga. Puedes abrir el PDF o intentarlo de
          nuevo.
        </p>
      ) : null}
    </div>
  );
}
