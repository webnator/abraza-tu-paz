'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { ArrowRight, Compass, Menu, Plus, X } from 'lucide-react';

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

type PassageTransition = {
  toIndex: number;
  x: string;
  y: string;
};

const passageOrigins = {
  entrada: { x: '54%', y: '51%' },
  jardin: { x: '49%', y: '36%' },
  refugio: { x: '55%', y: '38%' },
};

const gardenReturnOrigin = { x: '54%', y: '51%' };

const scenes: Scene[] = [
  {
    id: 'entrada',
    number: '01',
    name: 'El umbral',
    image: '/images/entrada-base.jpg',
    foreground: '/images/entrada-primer-plano-v2.png',
    alt: 'Una verja abierta bajo un arco de piedra cubierto de buganvilla.',
    prompt: 'No tienes que ver el camino entero para poder dar el primer paso.',
    action: 'Abrir la verja',
    discoveries: [],
  },
  {
    id: 'jardin',
    number: '02',
    name: 'El jardín',
    image: '/images/jardin-base.jpg',
    foreground: '/images/jardin-primer-plano.png',
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
    image: '/images/refugio-base.jpg',
    foreground: '/images/refugio-primer-plano.png',
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

function SceneLayers({ scene }: { scene: Scene }) {
  return (
    <>
      {scene.id === 'entrada' ? (
        <>
          <div className="portal-world" aria-hidden="true">
            <img src={scenes[1].image} alt="" fetchPriority="high" />
          </div>
          <div className="depth-layer depth-layer--threshold" aria-hidden="true">
            <img src="/images/entrada-umbral-v2.webp" alt="" fetchPriority="high" />
          </div>
        </>
      ) : (
        <div className="depth-layer depth-layer--back" aria-hidden="true">
          <img src={scene.image} alt="" />
        </div>
      )}
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
    </>
  );
}

export default function Home() {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [discovery, setDiscovery] = useState<Discovery | null>(null);
  const [mapOpen, setMapOpen] = useState(false);
  const [transition, setTransition] = useState<PassageTransition | null>(null);
  const stageRef = useRef<HTMLElement>(null);
  const scene = scenes[sceneIndex];
  const transitionTarget = transition ? scenes[transition.toIndex] : null;
  const isGardenRefugePassage = Boolean(
    transitionTarget
    && ((scene.id === 'jardin' && transitionTarget.id === 'refugio')
      || (scene.id === 'refugio' && transitionTarget.id === 'jardin')),
  );

  const goTo = (nextIndex: number, origin = { x: '50%', y: '50%' }) => {
    setDiscovery(null);
    setMapOpen(false);
    if (nextIndex === sceneIndex || transition) return;

    resetParallax();

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setSceneIndex(nextIndex);
      return;
    }

    setTransition({ toIndex: nextIndex, ...origin });
  };

  const goForward = () => {
    const nextIndex = sceneIndex === scenes.length - 1 ? 1 : sceneIndex + 1;
    goTo(nextIndex, passageOrigins[scene.id as keyof typeof passageOrigins]);
  };

  const finishTransition = () => {
    if (!transition) return;
    setSceneIndex(transition.toIndex);
    setTransition(null);
  };

  useEffect(() => {
    if (!transition) return;
    const fallback = window.setTimeout(finishTransition, isGardenRefugePassage ? 1800 : 1500);
    return () => window.clearTimeout(fallback);
  }, [transition, isGardenRefugePassage]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setDiscovery(null);
        setMapOpen(false);
      }
      if (event.key === 'ArrowRight' && !discovery && !mapOpen && !transition) {
        goTo(
          Math.min(sceneIndex + 1, scenes.length - 1),
          passageOrigins[scene.id as keyof typeof passageOrigins],
        );
      }
      if (event.key === 'ArrowLeft' && !discovery && !mapOpen && !transition) {
        goTo(Math.max(sceneIndex - 1, 0), sceneIndex === 1 ? gardenReturnOrigin : undefined);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [discovery, mapOpen, scene, sceneIndex, transition]);

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
    style.setProperty('--portal-x', `${x * -10}px`);
    style.setProperty('--portal-y', `${y * -7}px`);
  };

  const resetParallax = () => {
    const style = stageRef.current?.style;
    style?.setProperty('--back-x', '0px');
    style?.setProperty('--back-y', '0px');
    style?.setProperty('--mid-x', '0px');
    style?.setProperty('--mid-y', '0px');
    style?.setProperty('--front-x', '0px');
    style?.setProperty('--front-y', '0px');
    style?.setProperty('--portal-x', '0px');
    style?.setProperty('--portal-y', '0px');
  };

  return (
    <main
      ref={stageRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetParallax}
      className={`experience${transition ? ' is-transitioning' : ''}`}
      aria-busy={transition ? 'true' : undefined}
      style={{ '--scene-accent': sceneIndex === 0 ? '#c83d72' : '#f2c84b' } as CSSProperties}
    >
      {transition ? (
        <section
          className="scene scene--arriving"
          data-scene={scenes[transition.toIndex].id}
          data-origin={scene.id}
          style={{ '--passage-x': transition.x, '--passage-y': transition.y } as CSSProperties}
          aria-hidden="true"
        >
          <SceneLayers scene={scenes[transition.toIndex]} />
        </section>
      ) : null}

      <section
        key={scene.id}
        className={`scene${transition ? ' scene--departing' : ''}`}
        data-scene={scene.id}
        data-destination={transition ? scenes[transition.toIndex].id : undefined}
        style={transition ? { '--passage-x': transition.x, '--passage-y': transition.y } as CSSProperties : undefined}
        aria-labelledby="scene-title"
        onAnimationEnd={(event) => {
          if (
            event.currentTarget === event.target
            && (event.animationName === 'passage-through'
              || event.animationName === 'garden-recede'
              || event.animationName === 'garden-passage-out')
          ) {
            finishTransition();
          }
        }}
      >
        <SceneLayers scene={scene} />

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
          <h1>{scene.prompt}</h1>
        </div>

        <button
          className={`passage-zone passage-zone--${scene.id}`}
          onClick={goForward}
          aria-label={`${scene.action} desde el paisaje`}
        />
        {scene.id === 'jardin' ? (
          <button
            className="passage-zone passage-zone--jardin-back"
            onClick={() => goTo(0, gardenReturnOrigin)}
            aria-label="Volver a la verja siguiendo el sendero"
          />
        ) : null}

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

      </section>

      {isGardenRefugePassage ? (
        <div className="foliage-occlusion" aria-hidden="true">
          <span className="foliage-occlusion__shadow" />
          {(['northwest', 'northeast', 'southwest', 'southeast'] as const).map((corner) => (
            <span className={`foliage-occlusion__piece foliage-occlusion__piece--${corner}`} key={corner}>
              <img src="/images/transicion-hojas-v4.webp" alt="" />
            </span>
          ))}
        </div>
      ) : null}

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
