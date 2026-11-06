'use client';

import type { RefObject } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import type { EntranceSignMaterial } from '@/components/development-controls';
import { entranceWelcome } from '@/lib/entrance-welcome';

export function CarvedStars({ className }: { className: string }) {
  return (
    <svg
      className={`carved-stars ${className}`}
      viewBox="0 0 56 34"
      aria-hidden="true"
    >
      <path d="M28 3Q28 16 17 17Q28 18 28 31Q29 18 40 17Q29 16 28 3ZM9 1Q9 7 3 8Q9 9 9 15Q10 9 16 8Q10 7 9 1ZM46 20Q46 25 41 26Q46 27 46 32Q47 27 52 26Q47 25 46 20Z" />
    </svg>
  );
}

export function EntranceWelcome({
  open,
  onOpenChange,
  material,
  woodStars,
  returnFocus,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  material: EntranceSignMaterial;
  woodStars: boolean;
  returnFocus: RefObject<HTMLButtonElement | null>;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="entrance-welcome"
        backdropClassName="entrance-welcome-backdrop"
        data-material={material}
        showCloseButton={false}
        finalFocus={returnFocus}
      >
        <img
          className="entrance-welcome__surface"
          src={
            material === 'wood'
              ? '/images/cartel-madera-clavada-v1.webp'
              : '/images/nota-entrada-v1.webp'
          }
          alt=""
        />
        <div
          className="entrance-welcome__reading"
          tabIndex={0}
          aria-label="Bienvenida al jardín"
        >
          <DialogTitle className="entrance-welcome__title">
            {entranceWelcome.title}
          </DialogTitle>
          <DialogDescription className="entrance-welcome__paragraph">
            {entranceWelcome.paragraphs[0]}
          </DialogDescription>
          {entranceWelcome.paragraphs.slice(1).map((paragraph) => (
            <p className="entrance-welcome__paragraph" key={paragraph}>
              {paragraph}
            </p>
          ))}
          {material === 'wood' && woodStars ? (
            <CarvedStars className="entrance-welcome__stars" />
          ) : null}
        </div>
        <DialogClose className="entrance-welcome__return">Cerrar</DialogClose>
      </DialogContent>
    </Dialog>
  );
}
