'use client';

import { useEffect, useRef } from 'react';
import { Code2, X } from 'lucide-react';

export type EntranceSignMaterial = 'paper' | 'wood';
export type MenuTypeface = 'serif' | 'handwriting' | 'sans';
export const developmentEnabled = process.env.NODE_ENV !== 'production';
export const entranceSignStorageKey = 'abraza-tu-paz:dev:entrance-sign';
export const menuTypefaceStorageKey = 'abraza-tu-paz:dev:menu-typeface';
export const woodStarsStorageKey = 'abraza-tu-paz:dev:wood-stars';

const signOptions: { value: EntranceSignMaterial; label: string }[] = [
  { value: 'paper', label: 'Papel' },
  { value: 'wood', label: 'Madera clavada' },
];

export function DevelopmentControls({
  material,
  onMaterialChange,
  menuTypeface,
  onMenuTypefaceChange,
  woodStars,
  onWoodStarsChange,
  open,
  onOpenChange,
  onReplayFirstVisit,
  blocked,
}: {
  material: EntranceSignMaterial;
  onMaterialChange: (material: EntranceSignMaterial) => void;
  menuTypeface: MenuTypeface;
  onMenuTypefaceChange: (typeface: MenuTypeface) => void;
  woodStars: boolean;
  onWoodStarsChange: (visible: boolean) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onReplayFirstVisit: () => void;
  blocked: boolean;
}) {
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (blocked) onOpenChange(false);
  }, [blocked, onOpenChange]);

  useEffect(() => {
    if (!open) return;
    const closeOutside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) onOpenChange(false);
    };
    document.addEventListener('pointerdown', closeOutside);
    return () => document.removeEventListener('pointerdown', closeOutside);
  }, [open, onOpenChange]);

  if (!developmentEnabled) return null;
  return (
    <div
      ref={root}
      className={`development-tools${blocked ? ' development-tools--covered' : ''}`}
      onKeyDown={(event) => {
        event.stopPropagation();
        if (event.key === 'Escape' && open) {
          event.preventDefault();
          onOpenChange(false);
          trigger.current?.focus();
        }
      }}
    >
      {open ? (
        <section
          className="development-tools__panel"
          id="development-variants"
          aria-label="Variantes de desarrollo"
        >
          <div className="development-tools__header">
            <span>Variantes</span>
            <button
              type="button"
              aria-label="Cerrar controles de desarrollo"
              onClick={() => {
                onOpenChange(false);
                trigger.current?.focus();
              }}
            >
              <X size={15} aria-hidden="true" />
            </button>
          </div>
          <fieldset>
            <legend>Cartel de la entrada</legend>
            {signOptions.map((option) => (
              <label key={option.value}>
                <input
                  type="radio"
                  name="development-entrance-sign"
                  value={option.value}
                  checked={material === option.value}
                  onChange={() => onMaterialChange(option.value)}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </fieldset>
          <label>
            <input
              type="checkbox"
              checked={woodStars}
              onChange={(event) => onWoodStarsChange(event.target.checked)}
            />
            <span>Estrellas talladas en madera</span>
          </label>
          <fieldset>
            <legend>Tipografía del menú</legend>
            {(
              [
                ['serif', 'Cormorant · editorial'],
                ['handwriting', 'Manuscrita · cercana'],
                ['sans', 'Sans · original'],
              ] as const
            ).map(([value, label]) => (
              <label key={value}>
                <input
                  type="radio"
                  name="development-menu-typeface"
                  value={value}
                  checked={menuTypeface === value}
                  onChange={() => onMenuTypefaceChange(value)}
                />
                <span
                  className="development-tools__type-sample"
                  data-typeface={value}
                >
                  {label}
                </span>
              </label>
            ))}
          </fieldset>
          <button
            type="button"
            className="development-tools__replay"
            onClick={onReplayFirstVisit}
          >
            Probar primera visita
          </button>
          <p>
            Bienvenidas: propuestas de texto pendientes de aprobación de
            Gabriela.
          </p>
          <p>Solo desarrollo · Se recuerda en este navegador.</p>
        </section>
      ) : null}
      <button
        type="button"
        className="development-tools__trigger"
        ref={trigger}
        disabled={blocked}
        aria-label="Controles de desarrollo"
        aria-expanded={open}
        aria-controls="development-variants"
        title="Variantes de desarrollo"
        onClick={() => onOpenChange(!open)}
      >
        <Code2 size={17} aria-hidden="true" />
      </button>
    </div>
  );
}
