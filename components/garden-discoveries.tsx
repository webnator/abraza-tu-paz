'use client';

import { useEffect, useId, useRef, useState, type RefObject } from 'react';
import { ArrowLeft, ArrowRight, Headphones, Pause, Play } from 'lucide-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  benchReading,
  gardenLetters,
  gardenWelcome,
  refugeWelcome,
  type DiscoverySelection,
} from '@/lib/garden-discoveries';

type Select = (
  selection: DiscoverySelection,
  target: HTMLButtonElement,
) => void;

export function GardenObjects({
  active,
  onSelect,
  onFocus,
}: {
  active: boolean;
  onSelect?: Select;
  onFocus?: (x: number) => void;
}) {
  return (
    <div className="garden-artifacts" aria-hidden={!active ? true : undefined}>
      <button
        className="garden-object garden-object--bench"
        type="button"
        disabled={!active}
        tabIndex={active ? 0 : -1}
        aria-label="Sentarme en el banco: bienvenida y una lectura para escuchar"
        aria-haspopup="dialog"
        onFocus={() => active && onFocus?.(20)}
        onClick={(event) => onSelect?.({ kind: 'bench' }, event.currentTarget)}
      >
        <span className="garden-object__hint">Sentarte un momento</span>
      </button>
      <div className="garden-letters">
        {gardenLetters.map((letter, index) => (
          <button
            key={letter.title}
            type="button"
            className={`garden-letter garden-letter--${index}`}
            disabled={!active}
            tabIndex={active ? 0 : -1}
            aria-label={`Abrir carta: ${letter.title}`}
            aria-haspopup="dialog"
            onFocus={() => active && onFocus?.(84)}
            onClick={(event) =>
              onSelect?.(
                { kind: 'letters', letter: index },
                event.currentTarget,
              )
            }
          />
        ))}
      </div>
      <button
        className="garden-object garden-object--water"
        type="button"
        disabled={!active}
        tabIndex={active ? 0 : -1}
        aria-label="Quedarme junto al agua"
        aria-haspopup="dialog"
        onFocus={() => active && onFocus?.(57)}
        onClick={(event) => onSelect?.({ kind: 'water' }, event.currentTarget)}
      >
        <span className="pond-ripples" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="garden-object__hint">Quedarte junto al agua</span>
      </button>
    </div>
  );
}

function ReadingPlayer({ active }: { active: boolean }) {
  const audio = useRef<HTMLAudioElement>(null);
  const id = useId();
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [time, setTime] = useState(0);
  const [error, setError] = useState(false);
  useEffect(() => {
    if (!active) audio.current?.pause();
  }, [active]);
  useEffect(() => {
    const element = audio.current;
    return () => element?.pause();
  }, []);
  const toggle = async () => {
    if (!audio.current) return;
    if (!audio.current.paused) {
      audio.current.pause();
      return;
    }
    setError(false);
    try {
      await audio.current.play();
    } catch {
      setError(true);
    }
  };
  const clock = (seconds: number) =>
    `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;
  return (
    <section
      className="garden-listening"
      aria-label="Una lectura para escuchar"
    >
      <h3>{benchReading.title}</h3>
      <audio
        ref={audio}
        id={id}
        src={benchReading.audio}
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onLoadedMetadata={(event) =>
          setDuration(
            Number.isFinite(event.currentTarget.duration)
              ? event.currentTarget.duration
              : 0,
          )
        }
        onTimeUpdate={(event) => setTime(event.currentTarget.currentTime)}
        onError={() => {
          setError(true);
          setPlaying(false);
        }}
      >
        <track
          kind="captions"
          src="/audio/un-momento-contigo-demo.vtt"
          srcLang="es"
          label="Texto de la lectura"
          default
        />
      </audio>
      <div className="garden-player">
        <button
          type="button"
          className="garden-player__play"
          aria-controls={id}
          aria-label={
            playing ? 'Pausar la lectura' : 'Escuchar la lectura de muestra'
          }
          aria-pressed={playing}
          onClick={() => void toggle()}
        >
          {playing ? (
            <Pause size={20} aria-hidden="true" />
          ) : (
            <Play size={20} aria-hidden="true" />
          )}
        </button>
        <div className="garden-player__track">
          <label htmlFor={`${id}-progress`}>
            {playing ? 'Escuchando' : 'Escuchar un momento'}
          </label>
          <input
            id={`${id}-progress`}
            type="range"
            min="0"
            max={duration || 1}
            step="0.1"
            value={Math.min(time, duration || 1)}
            disabled={!duration}
            aria-label="Avanzar en la lectura"
            onChange={(event) => {
              if (audio.current) {
                audio.current.currentTime = Number(event.target.value);
                setTime(Number(event.target.value));
              }
            }}
          />
          <span className="garden-player__time">
            {clock(time)} / {clock(duration)}
          </span>
        </div>
        <Headphones size={20} aria-hidden="true" />
      </div>
      <p className="discovery-editorial-note">{benchReading.note}</p>
      {error ? (
        <output className="garden-player__error" aria-live="polite">
          No se ha podido reproducir la lectura. Puedes leer el texto aquí
          debajo o volver a intentarlo.
        </output>
      ) : null}
      <details className="garden-transcript" open={error || undefined}>
        <summary>Leer el texto</summary>
        <p>{benchReading.transcript}</p>
      </details>
    </section>
  );
}

function LetterReading({ initial }: { initial: number }) {
  const [index, setIndex] = useState(initial);
  const letter = gardenLetters[index];
  return (
    <div
      className="discovery-letter"
      role="group"
      aria-label="Cartas al alma"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
        event.preventDefault();
        event.stopPropagation();
        setIndex(
          (value) =>
            (value +
              (event.key === 'ArrowRight' ? 1 : gardenLetters.length - 1)) %
            gardenLetters.length,
        );
      }}
    >
      <DialogTitle className="discovery-title">{letter.title}</DialogTitle>
      <DialogDescription className="discovery-paragraph">
        {letter.paragraphs[0]}
      </DialogDescription>
      {letter.paragraphs.slice(1).map((text) => (
        <p className="discovery-paragraph" key={text}>
          {text}
        </p>
      ))}
      <p className="discovery-signoff">Una carta para tu camino.</p>
      <div className="discovery-letter__navigation">
        <button
          type="button"
          aria-label="Carta anterior"
          onClick={() =>
            setIndex((index + gardenLetters.length - 1) % gardenLetters.length)
          }
        >
          <ArrowLeft size={18} aria-hidden="true" />
        </button>
        <span aria-live="polite">
          {index + 1} de {gardenLetters.length}
        </span>
        <button
          type="button"
          aria-label="Carta siguiente"
          onClick={() => setIndex((index + 1) % gardenLetters.length)}
        >
          <ArrowRight size={18} aria-hidden="true" />
        </button>
      </div>
      <p className="discovery-editorial-note">
        Cartas al alma · propuesta editorial para validar con Gabriela.
      </p>
    </div>
  );
}

export function GardenDiscovery({
  selection,
  open,
  onClose,
  returnFocus,
  onRefugeAction,
}: {
  selection: DiscoverySelection | null;
  open: boolean;
  onClose: () => void;
  returnFocus: RefObject<HTMLElement | null>;
  onRefugeAction: (id: 'terapia' | 'gabriela') => void;
}) {
  const water = selection?.kind === 'water';
  const refuge = selection?.kind === 'refuge';
  const letters = selection?.kind === 'letters';
  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) onClose();
      }}
    >
      <DialogContent
        className={
          water
            ? 'water-pause'
            : `garden-discovery${refuge ? ' garden-discovery--refuge' : ''}`
        }
        backdropClassName={
          water ? 'water-pause-backdrop' : 'discovery-backdrop'
        }
        showCloseButton={false}
        finalFocus={returnFocus}
        onPointerDown={(event) => {
          if (water && event.target === event.currentTarget) onClose();
        }}
      >
        {water ? (
          <div className="water-pause__reading">
            <DialogTitle>Por un momento, aquí.</DialogTitle>
            <DialogDescription>
              Puedes mirar el agua, escuchar lo que hay alrededor y quedarte el
              tiempo que quieras.
            </DialogDescription>
            <DialogClose className="water-pause__close">
              <ArrowLeft size={17} aria-hidden="true" />
              Volver al sendero
            </DialogClose>
          </div>
        ) : (
          <>
            <div className="discovery-sheet">
              {letters ? (
                <LetterReading
                  key={selection.letter}
                  initial={selection.letter ?? 0}
                />
              ) : (
                <>
                  <DialogTitle className="discovery-title">
                    {refuge ? refugeWelcome.title : gardenWelcome.title}
                  </DialogTitle>
                  <DialogDescription className="discovery-paragraph">
                    {(refuge ? refugeWelcome : gardenWelcome).paragraphs[0]}
                  </DialogDescription>
                  {(refuge ? refugeWelcome : gardenWelcome).paragraphs
                    .slice(1)
                    .map((text) => (
                      <p className="discovery-paragraph" key={text}>
                        {text}
                      </p>
                    ))}
                  {refuge ? (
                    <>
                      <div className="discovery-actions">
                        <button
                          type="button"
                          onClick={() => onRefugeAction('terapia')}
                        >
                          Conocer el acompañamiento{' '}
                          <ArrowRight size={16} aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onRefugeAction('gabriela')}
                        >
                          Mirar las fotografías{' '}
                          <ArrowRight size={16} aria-hidden="true" />
                        </button>
                      </div>
                      <p className="discovery-editorial-note">
                        Texto de bienvenida pendiente de validar con Gabriela.
                      </p>
                    </>
                  ) : (
                    <ReadingPlayer active={open} />
                  )}
                </>
              )}
            </div>
            <DialogClose className="discovery-close">
              {letters ? 'Dejar la carta' : 'Dejar el cuaderno'}
            </DialogClose>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
