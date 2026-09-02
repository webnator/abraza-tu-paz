'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { ArrowLeft, ArrowRight, Compass, Menu, Plus, X } from 'lucide-react';

import { Button } from '@/components/ui/button';

type Discovery = {
  id: string;
  label: string;
  eyebrow: string;
  title: string;
  text: string;
  x: string;
  y: string;
};

type Scene = {
  id: string;
  number: string;
  name: string;
  image: string;
  foreground?: string;
  alt: string;
  prompt: string;
  action: string;
  discoveries: Discovery[];
};

const scenes: Scene[] = [
  {
    id: 'entrada',
    number: '01',
    name: 'El umbral',
    image: '/images/entrada-base.avif',
    foreground: '/images/entrada-primer-plano-v2.avif',
    alt: 'Una verja abierta bajo un arco de piedra cubierto de buganvilla.',
    prompt: 'No tienes que ver el camino entero para poder dar el primer paso.',
    action: 'Abrir la verja',
    discoveries: [],
  },
  {
    id: 'jardin',
    number: '02',
    name: 'El jardín',
    image: '/images/jardin-base.avif',
    foreground: '/images/jardin-primer-plano.avif',
    alt: 'Un sendero íntimo rodea un pequeño estanque entre plantas silvestres.',
    prompt: '¿Qué necesita encontrar un poco de espacio hoy?',
    action: 'Seguir el sendero',
    discoveries: [
      {
        id: 'agua',
        label: 'Escuchar',
        eyebrow: 'Junto al agua',
        title: 'Lo que sientes no estorba',
        text: 'A veces una emoción no necesita una solución inmediata. Necesita espacio, escucha y tiempo para mostrar qué trae consigo.',
        x: '70%',
        y: '61%',
      },
      {
        id: 'sendero',
        label: 'Atravesar',
        eyebrow: 'En el sendero',
        title: 'También puedes avanzar sin certezas',
        text: 'Atravesar un cambio no consiste en tenerlo todo resuelto. Puede empezar por reconocer dónde estás y qué necesitas ahora.',
        x: '36%',
        y: '43%',
      },
    ],
  },
  {
    id: 'refugio',
    number: '03',
    name: 'El refugio',
    image: '/images/refugio-base.avif',
    foreground: '/images/refugio-primer-plano.avif',
    alt: 'Dos sillones de mimbre y una mesa esperan en una estancia abierta al jardín.',
    prompt: 'Hay lugares en los que también está bien no saber.',
    action: 'Volver al jardín',
    discoveries: [
      {
        id: 'terapia',
        label: 'Terapia',
        eyebrow: 'La mesa',
        title: 'Un lugar para atravesarlo contigo',
        text: 'Acompañamiento psicológico transpersonal para procesos de ansiedad y transformaciones vitales que remueven, desorientan o duelen.',
        x: '53%',
        y: '66%',
      },
      {
        id: 'gabriela',
        label: 'Gabriela',
        eyebrow: 'Quien te acompaña',
        title: 'Conocimiento clínico. Experiencia humana.',
        text: 'Una mirada profesional que no observa la vida desde fuera: se sienta contigo, escucha y ayuda a encontrar tu propia manera de atravesarla.',
        x: '77%',
        y: '35%',
      },
      {
        id: 'biblioteca',
        label: 'Biblioteca',
        eyebrow: 'La estantería',
        title: 'Recursos para volver cuando lo necesites',
        text: 'Lecturas, audios y pequeñas prácticas para reconocer lo que ocurre, hacer espacio y relacionarte contigo con menos juicio.',
        x: '18%',
        y: '33%',
      },
    ],
  },
];

export default function Home() {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [discovery, setDiscovery] = useState<Discovery | null>(null);
  const [mapOpen, setMapOpen] = useState(false);
  const stageRef = useRef<HTMLElement>(null);
  const scene = scenes[sceneIndex];

  const goTo = (nextIndex: number) => {
    setDiscovery(null);
    setMapOpen(false);
    setSceneIndex(nextIndex);
  };

  const goForward = () => {
    if (sceneIndex === scenes.length - 1) goTo(1);
    else goTo(sceneIndex + 1);
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setDiscovery(null);
        setMapOpen(false);
      }
      if (event.key === 'ArrowRight' && !discovery && !mapOpen) {
        goTo(Math.min(sceneIndex + 1, scenes.length - 1));
      }
      if (event.key === 'ArrowLeft' && !discovery && !mapOpen) {
        goTo(Math.max(sceneIndex - 1, 0));
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [discovery, mapOpen, sceneIndex]);

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType === 'touch' || !stageRef.current) return;
    const bounds = stageRef.current.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    const style = stageRef.current.style;
    style.setProperty('--back-x', `${x * -24}px`);
    style.setProperty('--back-y', `${y * -16}px`);
    style.setProperty('--mid-x', `${x * -38}px`);
    style.setProperty('--mid-y', `${y * -26}px`);
    style.setProperty('--front-x', `${x * -58}px`);
    style.setProperty('--front-y', `${y * -38}px`);
  };

  const resetParallax = () => {
    const style = stageRef.current?.style;
    style?.setProperty('--back-x', '0px');
    style?.setProperty('--back-y', '0px');
    style?.setProperty('--mid-x', '0px');
    style?.setProperty('--mid-y', '0px');
    style?.setProperty('--front-x', '0px');
    style?.setProperty('--front-y', '0px');
  };

  return (
    <main
      ref={stageRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetParallax}
      className="experience"
      style={{ '--scene-accent': sceneIndex === 0 ? '#c83d72' : '#f2c84b' } as CSSProperties}
    >
      <section key={scene.id} className="scene" aria-labelledby="scene-title">
        <div className="depth-layer depth-layer--back" aria-hidden="true">
          <img src={scene.image} alt="" />
        </div>
        <div className="scene-shade" aria-hidden="true" />
        <div className="depth-layer depth-layer--mid" aria-hidden="true">
          <span className="light-orb light-orb--one" />
          <span className="light-orb light-orb--two" />
        </div>
        {scene.foreground ? (
          <div className="depth-layer depth-layer--front" aria-hidden="true">
            <img src={scene.foreground} alt="" />
          </div>
        ) : null}

        <p className="sr-only">{scene.alt}</p>

        <header className="masthead">
          <button className="wordmark" onClick={() => goTo(0)} aria-label="Volver a la entrada">
            abraza tu paz
          </button>
          <div className="scene-marker" aria-live="polite">
            <span>{scene.number}</span>
            <span id="scene-title">{scene.name}</span>
          </div>
          <Button
            variant="ghost"
            className="map-trigger"
            onClick={() => setMapOpen(true)}
            aria-label="Abrir mapa de la experiencia"
          >
            <Compass aria-hidden="true" />
            <span>Mapa</span>
            <Menu aria-hidden="true" />
          </Button>
        </header>

        <div className={`scene-copy scene-copy--${scene.id}`}>
          <span className="scene-copy__kicker">
            {sceneIndex === 0 ? 'Un lugar para empezar' : `Capa ${scene.number}`}
          </span>
          <h1>{scene.prompt}</h1>
          {sceneIndex === 0 ? (
            <p>
              Un espacio para atravesar ansiedad y cambios vitales con más calma,
              menos juicio y acompañamiento psicológico transpersonal.
            </p>
          ) : null}
          <Button className="path-button" onClick={goForward}>
            {scene.action}
            <ArrowRight aria-hidden="true" />
          </Button>
        </div>

        {scene.discoveries.map((item) => (
          <button
            key={item.id}
            className="hotspot"
            style={{ left: item.x, top: item.y }}
            onClick={() => setDiscovery(item)}
            aria-label={`Descubrir: ${item.label}`}
          >
            <span className="hotspot__pulse" aria-hidden="true" />
            <span className="hotspot__dot"><Plus aria-hidden="true" /></span>
            <span className="hotspot__label">{item.label}</span>
          </button>
        ))}

        <div className="journey-controls" aria-label="Navegación por el jardín">
          <Button variant="ghost" size="icon" onClick={() => goTo(Math.max(sceneIndex - 1, 0))} disabled={sceneIndex === 0} aria-label="Ir a la capa anterior">
            <ArrowLeft />
          </Button>
          <div className="journey-progress" aria-hidden="true">
            {scenes.map((item, index) => <span key={item.id} className={index === sceneIndex ? 'is-active' : ''} />)}
          </div>
          <Button variant="ghost" size="icon" onClick={() => goTo(Math.min(sceneIndex + 1, scenes.length - 1))} disabled={sceneIndex === scenes.length - 1} aria-label="Ir a la siguiente capa">
            <ArrowRight />
          </Button>
        </div>

        <div className="move-hint" aria-hidden="true"><span /> Mueve el cursor para mirar alrededor</div>
      </section>

      {discovery ? (
        <div className="reveal" role="dialog" aria-modal="true" aria-labelledby="reveal-title">
          <button className="reveal__backdrop" onClick={() => setDiscovery(null)} aria-label="Cerrar descubrimiento" />
          <article className="reveal__card">
            <Button variant="ghost" size="icon" className="reveal__close" onClick={() => setDiscovery(null)} aria-label="Cerrar"><X /></Button>
            <span>{discovery.eyebrow}</span>
            <h2 id="reveal-title">{discovery.title}</h2>
            <p>{discovery.text}</p>
            {discovery.id === 'terapia' ? (
              <Button className="reveal__action">Conocer el acompañamiento</Button>
            ) : (
              <button className="text-link" onClick={() => setDiscovery(null)}>Seguir explorando <ArrowRight aria-hidden="true" /></button>
            )}
          </article>
        </div>
      ) : null}

      {mapOpen ? (
        <aside className="map-panel" aria-label="Mapa de la experiencia">
          <button className="map-panel__backdrop" onClick={() => setMapOpen(false)} aria-label="Cerrar mapa" />
          <div className="map-panel__sheet">
            <div className="map-panel__top">
              <span>abraza tu paz</span>
              <Button variant="ghost" size="icon" onClick={() => setMapOpen(false)} aria-label="Cerrar mapa"><X /></Button>
            </div>
            <p className="map-panel__eyebrow">Mapa de la experiencia</p>
            <nav>
              {scenes.map((item, index) => (
                <button key={item.id} onClick={() => goTo(index)} className={index === sceneIndex ? 'is-active' : ''}>
                  <span>{item.number}</span><strong>{item.name}</strong><ArrowRight aria-hidden="true" />
                </button>
              ))}
            </nav>
            <div className="map-panel__note">
              <p>También puedes llegar directamente a lo que necesitas.</p>
              <button>Hablar con Gabriela <ArrowRight aria-hidden="true" /></button>
            </div>
          </div>
        </aside>
      ) : null}
    </main>
  );
}
