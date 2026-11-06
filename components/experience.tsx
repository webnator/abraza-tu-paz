'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, Plus, Play } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { destinations, titleForPath, destinationForPath } from '@/lib/content';
import { Polaroids } from '@/components/editorial-interactions';

type SceneId = 'entrada' | 'jardin' | 'refugio';
type Scene = {
  id: SceneId;
  name: string;
  image: string;
  foreground: string;
  mobileImage?: string;
  mobileForeground?: string;
  alt: string;
};
type Passage = { toIndex: number; x: string; y: string };
const scenes: Scene[] = [
  {
    id: 'entrada',
    name: 'Entrada',
    image: '/images/entrada-base.jpg',
    foreground: '/images/entrada-primer-plano-v2.webp',
    alt: 'Un arco de piedra y una verja abierta, rodeados de buganvillas, invitan a entrar.',
  },
  {
    id: 'jardin',
    name: 'Jardín',
    image: '/images/jardin-refugio-v1.webp',
    foreground: '/images/jardin-primer-plano.webp',
    alt: 'El sendero rodea un estanque y conduce a un pequeño refugio de piedra, visible entre las plantas.',
  },
  {
    id: 'refugio',
    name: 'Refugio',
    image: '/images/refugio-objetos-v1.webp',
    foreground: '/images/refugio-primer-plano.webp',
    mobileImage: '/images/refugio-mobile-v1.webp',
    mobileForeground: '/images/refugio-mobile-foreground-v1.webp',
    alt: 'Dos sillas, una taza de matcha, libros y fotografías en un refugio abierto al jardín.',
  },
];
const locations = [
  {
    id: 'biblioteca',
    label: 'Biblioteca',
    href: '/biblioteca',
    x: 16,
    y: 38,
    mx: 7.53,
    my: 39,
  },
  {
    id: 'terapia',
    label: 'Terapia',
    href: '/terapia',
    x: 38,
    y: 55,
    mx: 29.55,
    my: 53.76,
  },
  {
    id: 'gabriela',
    label: 'Mi historia',
    href: '/#polaroids',
    x: 24.8,
    y: 87,
    mx: 30.01,
    my: 75.64,
  },
  {
    id: 'video',
    label: 'Conóceme',
    href: '/gabriela#conoceme',
    x: 86.1,
    y: 40.5,
    mx: 87.6,
    my: 42.07,
  },
  {
    id: 'contacto',
    label: '¿Hablamos?',
    href: '/contacto',
    x: 68,
    y: 55,
    mx: 73.7,
    my: 53.37,
  },
] as const;

function SceneLayers({
  scene,
  reload,
  onEnter,
}: {
  scene: Scene;
  reload: number;
  onEnter?: () => void;
}) {
  return (
    <>
      {scene.id === 'entrada' ? (
        <>
          <div className="portal-world" aria-hidden="true">
            <img
              key={reload}
              src={scenes[1].image}
              alt=""
              fetchPriority="high"
            />
          </div>
          <div
            className="depth-layer depth-layer--threshold"
            aria-hidden={onEnter ? undefined : true}
          >
            <img
              key={reload}
              src="/images/entrada-umbral-v2.webp"
              alt=""
              fetchPriority="high"
            />
            <button
              className="threshold-invitation"
              onClick={onEnter}
              tabIndex={onEnter ? 0 : -1}
              aria-label="Empieza a abrazar tu paz: entrar al jardín"
            >
              <img src="/images/nota-entrada-v1.webp" alt="" />
              <span className="threshold-invitation__text">
                <small>Empieza a</small>abrazar
                <br />
                tu paz
              </span>
            </button>
          </div>
        </>
      ) : (
        <div className="depth-layer depth-layer--back" aria-hidden="true">
          <picture>
            {scene.mobileImage ? (
              <source media="(max-width: 720px)" srcSet={scene.mobileImage} />
            ) : null}
            <img
              key={reload}
              src={scene.image}
              alt=""
              fetchPriority={scene.id === 'jardin' ? 'high' : 'auto'}
            />
          </picture>
          {scene.id === 'refugio' ? (
            <>
              <img
                className="inhabited-photo"
                src="/photographs/gabriela-cotidiana.webp"
                alt=""
              />
              <img
                className="table-photo table-photo--one"
                src="/photographs/polaroid-paris.webp"
                alt=""
              />
              <img
                className="table-photo table-photo--two"
                src="/photographs/polaroid-septiembre-2026.webp"
                alt=""
              />
            </>
          ) : null}
        </div>
      )}
      <div className="scene-shade" aria-hidden="true" />
      <div className="depth-layer depth-layer--mid" aria-hidden="true">
        <span className="light-orb light-orb--one" aria-hidden="true" />
      </div>
      <div className="depth-layer depth-layer--front" aria-hidden="true">
        <picture>
          {scene.mobileForeground ? (
            <source
              media="(max-width: 720px)"
              srcSet={scene.mobileForeground}
            />
          ) : null}
          <img key={reload} src={scene.foreground} alt="" />
        </picture>
      </div>
    </>
  );
}

export function Experience({ children }: { children: ReactNode }) {
  const path = usePathname();
  const router = useRouter();
  const reading = path !== '/';
  const [sceneIndex, setSceneIndex] = useState(reading ? 2 : 0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [albumOpen, setAlbumOpen] = useState(false);
  const [pointedObject, setPointedObject] = useState<string | null>(null);
  const [transition, setTransition] = useState<Passage | null>(null);
  const [inspected, setInspected] = useState<{ x: number; y: number } | null>(
    null,
  );
  const [pauseRevealed, setPauseRevealed] = useState(false);
  const [matcha, setMatcha] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [reload, setReload] = useState(0);
  const [busy, setBusy] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const cameFromLandscape = useRef(false);
  const touch = useRef<{ start: number; pan: number; moved: boolean } | null>(
    null,
  );
  const panRef = useRef(0);
  const inspectTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const scene = scenes[sceneIndex];
  const isGardenPassage =
    transition &&
    ((sceneIndex === 1 && transition.toIndex === 2) ||
      (sceneIndex === 2 && transition.toIndex === 1));

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(media.matches);
    const onChange = () => setReducedMotion(media.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);
  useEffect(() => {
    if (!reading) setInspected(null);
    panelRef.current?.scrollTo({ top: 0 });
    const timer = window.setTimeout(() => {
      if (reading) {
        const heading = panelRef.current?.querySelector('h1');
        if (heading) {
          heading.tabIndex = -1;
          heading.focus({ preventScroll: true });
        }
        if (window.location.hash)
          document
            .getElementById(window.location.hash.slice(1))
            ?.scrollIntoView({ block: 'start' });
      }
    }, 180);
    return () => window.clearTimeout(timer);
  }, [path, reading]);
  useEffect(() => {
    // Old album links also enter the existing refuge, never a second photo page.
    if (window.location.hash !== '#polaroids') {
      setAlbumOpen(false);
      return;
    }
    if (path !== '/') {
      router.replace('/#polaroids', { scroll: false });
      return;
    }
    setSceneIndex(2);
    setMenuOpen(false);
    setAlbumOpen(true);
    setInspected(
      window.innerWidth <= 720 ? { x: 30.01, y: 75.64 } : { x: 24.8, y: 87 },
    );
  }, [path, router]);
  useEffect(() => {
    const assets = [
      window.innerWidth <= 720 && scene.mobileImage
        ? scene.mobileImage
        : scene.image,
      window.innerWidth <= 720 && scene.mobileForeground
        ? scene.mobileForeground
        : scene.foreground,
      ...(scene.id === 'entrada'
        ? [scenes[1].image, '/images/entrada-umbral-v2.webp']
        : []),
    ];
    setLoadError(false);
    const images = assets.map((source) => {
      const image = new Image();
      image.onerror = () => setLoadError(true);
      image.src = source;
      return image;
    });
    return () =>
      images.forEach((image) => {
        image.onerror = null;
      });
  }, [scene, reload]);
  useEffect(() => {
    const images = [
      scenes[1].image,
      scenes[2].image,
      '/images/transicion-hojas-v4.webp',
    ].map((source) => {
      const image = new Image();
      image.src = source;
      return image;
    });
    return () =>
      images.forEach((image) => {
        image.onload = null;
      });
  }, []);
  const resetParallax = useCallback(() => {
    ['back', 'mid', 'front', 'portal'].forEach((layer) =>
      ['x', 'y'].forEach((axis) =>
        stageRef.current?.style.setProperty(`--${layer}-${axis}`, '0px'),
      ),
    );
  }, []);
  const finishTransition = useCallback(() => {
    if (!transition) return;
    setSceneIndex(transition.toIndex);
    setTransition(null);
    setPauseRevealed(false);
    setMatcha(false);
    panRef.current = 0;
    stageRef.current?.style.setProperty('--pan-x', '0px');
  }, [transition]);
  useEffect(() => {
    if (!transition) return;
    const timer = window.setTimeout(
      finishTransition,
      isGardenPassage ? 1800 : 1500,
    );
    return () => window.clearTimeout(timer);
  }, [transition, isGardenPassage, finishTransition]);
  const goTo = useCallback(
    async (index: number) => {
      setMenuOpen(false);
      if (index === sceneIndex || transition || busy) return;
      if (reading) router.push('/');
      resetParallax();
      setInspected(null);
      const anchors = [
        { x: 54, y: 51 },
        { x: 60.3, y: 32.5 },
        { x: 54, y: 35 },
      ];
      const origin =
        sceneIndex === 2 && window.innerWidth <= 720
          ? { x: 52.03, y: 35 }
          : anchors[sceneIndex];
      const bounds = worldRef.current?.getBoundingClientRect();
      const x = bounds
        ? ((bounds.left + (bounds.width * origin.x) / 100) /
            window.innerWidth) *
          100
        : origin.x;
      const y = bounds
        ? ((bounds.top + (bounds.height * origin.y) / 100) /
            window.innerHeight) *
          100
        : origin.y;
      setBusy(true);
      const image = new Image();
      image.src =
        window.innerWidth <= 720 && scenes[index].mobileImage
          ? scenes[index].mobileImage!
          : scenes[index].image;
      try {
        await image.decode();
      } catch {
        setLoadError(true);
        setBusy(false);
        return;
      }
      setBusy(false);
      if (reducedMotion) {
        setSceneIndex(index);
        setPauseRevealed(false);
        return;
      }
      setTransition({ toIndex: index, x: `${x}%`, y: `${y}%` });
    },
    [
      sceneIndex,
      transition,
      busy,
      reading,
      router,
      resetParallax,
      reducedMotion,
    ],
  );
  const openObject = (href: string, x: number, y: number) => {
    if (touch.current?.moved || busy || transition) return;
    cameFromLandscape.current = true;
    lastFocus.current = document.activeElement as HTMLElement;
    setInspected({ x, y });
    resetParallax();
    if (href === '/#polaroids') {
      setAlbumOpen(true);
      return;
    }
    if (inspectTimer.current) clearTimeout(inspectTimer.current);
    inspectTimer.current = setTimeout(
      () => router.push(href),
      reducedMotion ? 0 : 350,
    );
  };
  const closeAlbum = () => {
    setAlbumOpen(false);
    setInspected(null);
    if (window.location.hash === '#polaroids')
      window.history.replaceState(window.history.state, '', '/');
    window.setTimeout(() => {
      const target = lastFocus.current?.isConnected
        ? lastFocus.current
        : document.querySelector<HTMLElement>('.hotspot--gabriela');
      target?.focus({ preventScroll: true });
    }, 150);
  };
  const closeReading = () => {
    cameFromLandscape.current = false;
    router.push('/');
    window.setTimeout(() => {
      const target = lastFocus.current?.isConnected
        ? lastFocus.current
        : document.querySelector<HTMLElement>('.menu-trigger');
      target?.focus();
    }, 250);
  };
  const visitRefugeObject = (id: string) => {
    setMenuOpen(false);
    if (reading) router.push('/');
    setSceneIndex(2);
    setInspected(null);
    setPointedObject(id);
    panRef.current = 0;
    stageRef.current?.style.setProperty('--pan-x', '0px');
    if (inspectTimer.current) clearTimeout(inspectTimer.current);
    inspectTimer.current = setTimeout(
      () => {
        document
          .querySelector<HTMLButtonElement>(`.hotspot--${id}`)
          ?.focus({ preventScroll: true });
      },
      reducedMotion ? 100 : 380,
    );
  };
  useEffect(() => {
    if (!pointedObject) return;
    const timer = setTimeout(() => setPointedObject(null), 6000);
    return () => clearTimeout(timer);
  }, [pointedObject]);
  useEffect(
    () => () => {
      if (inspectTimer.current) clearTimeout(inspectTimer.current);
    },
    [],
  );
  useEffect(() => {
    if (sceneIndex !== 1 || reading || menuOpen || transition) return;
    const timer = setTimeout(() => setPauseRevealed(true), 6000);
    return () => clearTimeout(timer);
  }, [sceneIndex, reading, menuOpen, transition]);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (reading && event.key === 'Escape') {
        event.preventDefault();
        closeReading();
        return;
      }
      if (reading || menuOpen || albumOpen || transition) return;
      if (event.key === 'ArrowRight') void goTo(Math.min(sceneIndex + 1, 2));
      if (event.key === 'ArrowLeft') void goTo(Math.max(sceneIndex - 1, 0));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [reading, menuOpen, albumOpen, transition, sceneIndex, goTo]);
  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (
      !stageRef.current ||
      reading ||
      menuOpen ||
      transition ||
      inspected ||
      reducedMotion
    )
      return;
    if (event.pointerType === 'touch') {
      if (!touch.current || !worldRef.current) return;
      const delta = event.clientX - touch.current.start;
      if (Math.abs(delta) < 12) return;
      touch.current.moved = true;
      const max = (worldRef.current.offsetWidth - window.innerWidth) / 2;
      panRef.current = Math.max(-max, Math.min(max, touch.current.pan + delta));
      stageRef.current.style.setProperty('--pan-x', `${panRef.current}px`);
      return;
    }
    const x = event.clientX / window.innerWidth - 0.5,
      y = event.clientY / window.innerHeight - 0.5;
    [
      ['back', 20, 14],
      ['mid', 32, 22],
      ['front', 50, 34],
      ['portal', 8, 5],
    ].forEach(([layer, sx, sy]) => {
      stageRef.current?.style.setProperty(
        `--${layer}-x`,
        `${x * -Number(sx)}px`,
      );
      stageRef.current?.style.setProperty(
        `--${layer}-y`,
        `${y * -Number(sy)}px`,
      );
    });
  };
  const focusObject = (x: number) => {
    if (window.innerWidth > 720 || !worldRef.current || !stageRef.current)
      return;
    const max = (worldRef.current.offsetWidth - window.innerWidth) / 2;
    panRef.current = Math.max(
      -max,
      Math.min(max, worldRef.current.offsetWidth * (0.5 - x / 100)),
    );
    stageRef.current.style.setProperty('--pan-x', `${panRef.current}px`);
  };
  return (
    <>
      <div
        ref={stageRef}
        role={reading || menuOpen || albumOpen ? undefined : 'main'}
        aria-label="La experiencia de Abraza tu Paz"
        className={`experience${transition ? ' is-transitioning' : ''}${inspected ? ' is-inspecting' : ''}${albumOpen ? ' is-viewing-album' : ''}${reading || menuOpen ? ' is-reading' : ''}`}
        style={
          inspected
            ? ({
                '--inspect-x': `${inspected.x}%`,
                '--inspect-y': `${inspected.y}%`,
              } as CSSProperties)
            : undefined
        }
        onPointerMove={handlePointerMove}
        onPointerLeave={resetParallax}
        onPointerDown={(event) => {
          if (event.pointerType === 'touch')
            touch.current = {
              start: event.clientX,
              pan: panRef.current,
              moved: false,
            };
        }}
        onPointerUp={() => {
          window.setTimeout(() => {
            touch.current = null;
          }, 50);
        }}
        aria-busy={busy || transition ? true : undefined}
      >
        {transition ? (
          <section
            className="scene scene--arriving"
            data-scene={scenes[transition.toIndex].id}
            data-origin={scene.id}
            style={
              {
                '--passage-x': transition.x,
                '--passage-y': transition.y,
              } as CSSProperties
            }
            aria-hidden="true"
          >
            <div className="scene-world">
              <SceneLayers scene={scenes[transition.toIndex]} reload={reload} />
            </div>
          </section>
        ) : null}
        <section
          className={`scene${transition ? ' scene--departing' : ''}`}
          data-scene={scene.id}
          data-destination={
            transition ? scenes[transition.toIndex].id : undefined
          }
          style={
            transition
              ? ({
                  '--passage-x': transition.x,
                  '--passage-y': transition.y,
                } as CSSProperties)
              : undefined
          }
          aria-label={`El ${scene.name.toLowerCase()}`}
          aria-hidden={reading || menuOpen || albumOpen ? true : undefined}
          inert={
            reading || menuOpen || albumOpen || !!transition ? true : undefined
          }
        >
          <div ref={worldRef} className="scene-world">
            <SceneLayers
              scene={scene}
              reload={reload}
              onEnter={scene.id === 'entrada' ? () => void goTo(1) : undefined}
            />
            <p className="sr-only">{scene.alt}</p>
            <h1 className="sr-only">
              {scene.id === 'entrada'
                ? 'Empieza a abrazar tu paz'
                : scene.id === 'jardin'
                  ? 'Un jardín para descubrir'
                  : 'Hay sitio para ti en el refugio'}
            </h1>
            {scene.id === 'entrada' ? (
              <button
                className="passage-zone passage-zone--entrada"
                onClick={() => void goTo(1)}
                onFocus={() => focusObject(54)}
                aria-label="Entrar al jardín por la verja"
              />
            ) : null}
            {scene.id === 'jardin' ? (
              <>
                <button
                  className="passage-zone passage-zone--jardin"
                  onClick={() => !touch.current?.moved && void goTo(2)}
                  onFocus={() => focusObject(60.3)}
                  aria-label="Entrar al refugio al final del sendero"
                >
                  <span className="destination-hint">El refugio</span>
                </button>
                <button
                  className="passage-zone passage-zone--jardin-back"
                  onClick={() => !touch.current?.moved && void goTo(0)}
                  aria-label="Volver a la entrada por el sendero"
                />
                {pauseRevealed ? (
                  <button
                    className="garden-note"
                    onClick={() => setPauseRevealed(false)}
                    aria-label="Guardar la pregunta junto al agua"
                  >
                    ¿Y si no necesitas
                    <br />
                    resolverlo hoy?
                  </button>
                ) : null}
              </>
            ) : null}
            {scene.id === 'refugio' ? (
              <>
                <button
                  className="passage-zone passage-zone--refugio"
                  onClick={() => !touch.current?.moved && void goTo(1)}
                  onFocus={() => focusObject(54)}
                  aria-label="Volver al jardín desde el refugio"
                >
                  <span className="destination-hint">Volver al jardín</span>
                </button>
                {locations.map((item) => (
                  <button
                    key={item.id}
                    className={`hotspot hotspot--${item.id}`}
                    data-pointed={pointedObject === item.id ? true : undefined}
                    style={
                      {
                        '--desktop-x': `${item.x}%`,
                        '--desktop-y': `${item.y}%`,
                        '--mobile-x': `${item.mx}%`,
                        '--mobile-y': `${item.my}%`,
                      } as CSSProperties
                    }
                    onClick={() =>
                      openObject(
                        item.href,
                        window.innerWidth <= 720 ? item.mx : item.x,
                        window.innerWidth <= 720 ? item.my : item.y,
                      )
                    }
                    onFocus={() =>
                      focusObject(window.innerWidth <= 720 ? item.mx : item.x)
                    }
                    aria-label={item.label}
                  >
                    <span className="hotspot__dot">
                      {item.id === 'video' ? (
                        <Play size={14} aria-hidden="true" />
                      ) : (
                        <Plus size={16} aria-hidden="true" />
                      )}
                    </span>
                    <span className="hotspot__label">{item.label}</span>
                  </button>
                ))}
                <button
                  className={`matcha-zone${matcha ? ' is-warm' : ''}`}
                  onMouseEnter={() => setMatcha(true)}
                  onMouseLeave={() => setMatcha(false)}
                  onFocus={() => {
                    setMatcha(true);
                    focusObject(49.6);
                  }}
                  onBlur={() => setMatcha(false)}
                  onClick={() => setMatcha(!matcha)}
                  aria-label="Quedarte un rato junto al matcha"
                >
                  <span>Quédate un rato.</span>
                </button>
              </>
            ) : null}
          </div>
          {scene.id === 'refugio' ? (
            <p className="refuge-whisper">
              Aquí podemos hablar
              <br />
              de lo que de verdad importa.
            </p>
          ) : null}
        </section>
        <header
          className="masthead"
          inert={reading || menuOpen || albumOpen ? true : undefined}
          aria-hidden={reading || menuOpen || albumOpen ? true : undefined}
        >
          <button
            className="wordmark"
            onClick={() => void goTo(0)}
            aria-label="Abraza tu Paz: volver a la entrada"
          >
            abraza tu paz
          </button>
          <button
            className="menu-trigger"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menú"
          >
            <span>Menú</span>
            <Menu size={20} aria-hidden="true" />
          </button>
        </header>
        {isGardenPassage ? (
          <div className="foliage-occlusion" aria-hidden="true">
            <span className="foliage-occlusion__shadow" />
            {['northwest', 'northeast', 'southwest', 'southeast'].map(
              (corner) => (
                <span
                  className={`foliage-occlusion__piece foliage-occlusion__piece--${corner}`}
                  key={corner}
                >
                  <img src="/images/transicion-hojas-v4.webp" alt="" />
                </span>
              ),
            )}
          </div>
        ) : null}
        {busy ? (
          <p className="scene-feedback" role="status">
            Preparando el siguiente espacio…
          </p>
        ) : null}
        {loadError ? (
          <div className="scene-feedback" role="alert">
            <p>No hemos podido cargar una imagen del paisaje.</p>
            <button onClick={() => setReload((n) => n + 1)}>Reintentar</button>
          </div>
        ) : null}
      </div>
      <Dialog
        open={albumOpen}
        onOpenChange={(open) => {
          if (!open) closeAlbum();
        }}
      >
        <DialogContent
          className="refuge-album"
          backdropClassName="refuge-album-backdrop"
          showCloseButton={false}
        >
          <DialogTitle className="sr-only">
            Las fotografías del refugio
          </DialogTitle>
          <DialogDescription className="sr-only">
            Siete polaroids de Gabriela. Puedes recorrerlas con las flechas y
            dejarlas sobre la mesa para seguir explorando el refugio.
          </DialogDescription>
          <DialogClose className="refuge-album__close">
            Dejar las fotos <X size={19} aria-hidden="true" />
          </DialogClose>
          <Polaroids
            onNavigate={() => {
              setAlbumOpen(false);
              setInspected(null);
            }}
          />
        </DialogContent>
      </Dialog>
      <Dialog open={menuOpen} onOpenChange={setMenuOpen}>
        <DialogContent
          className="global-menu"
          backdropClassName="global-menu-backdrop"
          showCloseButton={false}
        >
          <div className="overlay-bar">
            <DialogClose className="close-control">
              Cerrar <X size={19} aria-hidden="true" />
            </DialogClose>
          </div>
          <DialogTitle className="sr-only">Menú de Abraza tu Paz</DialogTitle>
          <DialogDescription className="sr-only">
            Atajos a las sillas, las fotografías y la biblioteca del refugio. La
            navegación permanece dentro del jardín.
          </DialogDescription>
          <div className="global-menu__body">
            <nav
              className="menu-destinations"
              aria-label="Contenido de Abraza tu Paz"
            >
              {destinations
                .filter((item) =>
                  ['terapia', 'gabriela', 'biblioteca', 'contacto'].includes(
                    item.id,
                  ),
                )
                .map((item) => (
                  <button
                    key={item.id}
                    onClick={() => visitRefugeObject(item.id)}
                  >
                    <span>{item.title}</span>
                  </button>
                ))}
            </nav>
          </div>
          <DialogClose className="drawer-return">Seguir explorando</DialogClose>
        </DialogContent>
      </Dialog>
      {reading ? (
        <main className="editorial-overlay" aria-label={titleForPath(path)}>
          <div className="overlay-bar">
            <Link
              href="/"
              className="overlay-wordmark"
              onClick={() => {
                cameFromLandscape.current = false;
              }}
            >
              abraza tu paz
            </Link>
            <button className="close-control" onClick={closeReading}>
              Volver al {scene.name.toLowerCase()}{' '}
              <X size={19} aria-hidden="true" />
            </button>
          </div>
          <nav className="editorial-navigation" aria-label="Contenido">
            {destinations.map((item) => (
              <Link
                href={`/${item.id}`}
                key={item.id}
                aria-current={
                  destinationForPath(path) === item.id ? 'page' : undefined
                }
              >
                {item.title}
              </Link>
            ))}
          </nav>
          <div
            className="editorial-scroll"
            ref={panelRef}
            key={path}
            tabIndex={-1}
          >
            {children}
          </div>
        </main>
      ) : null}
    </>
  );
}
