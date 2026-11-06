'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from 'react';
import { ArrowRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import {
  firstVisitDelay,
  firstVisitStorageKey,
  firstVisitWelcome,
} from '@/lib/first-visit';

export function useFirstVisitWelcome(blocked: boolean) {
  const [open, setOpen] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const seenThisVisit = useRef(false);
  const returnFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (blocked || seenThisVisit.current || open) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const alreadySeen = () => {
      try {
        return window.localStorage.getItem(firstVisitStorageKey) === '1';
      } catch {
        return false;
      }
    };
    const clear = () => {
      if (timer) clearTimeout(timer);
    };
    const schedule = () => {
      clear();
      if (alreadySeen()) {
        seenThisVisit.current = true;
        return;
      }
      if (document.visibilityState !== 'visible' || seenThisVisit.current)
        return;
      timer = setTimeout(() => {
        if (alreadySeen() || seenThisVisit.current) return;
        seenThisVisit.current = true;
        returnFocus.current =
          document.activeElement instanceof HTMLElement
            ? document.activeElement
            : null;
        try {
          window.localStorage.setItem(firstVisitStorageKey, '1');
        } catch {
          /* Keep the welcome dismissed for the current visit. */
        }
        setOpen(true);
      }, firstVisitDelay);
    };
    const onStorage = (event: StorageEvent) => {
      if (event.key === firstVisitStorageKey && event.newValue === '1') {
        seenThisVisit.current = true;
        clear();
      }
    };
    schedule();
    document.addEventListener('visibilitychange', schedule);
    window.addEventListener('storage', onStorage);
    return () => {
      clear();
      document.removeEventListener('visibilitychange', schedule);
      window.removeEventListener('storage', onStorage);
    };
  }, [blocked, attempt, open]);

  const replay = useCallback(() => {
    try {
      window.localStorage.removeItem(firstVisitStorageKey);
    } catch {
      /* Memory fallback still allows replay. */
    }
    seenThisVisit.current = false;
    setOpen(false);
    setAttempt((value) => value + 1);
  }, []);

  const acknowledge = useCallback(() => {
    seenThisVisit.current = true;
    try {
      window.localStorage.setItem(firstVisitStorageKey, '1');
    } catch {
      /* In-memory recall remains active. */
    }
    setOpen(false);
  }, []);

  return { open, onOpenChange: setOpen, replay, returnFocus, acknowledge };
}

export function FirstVisitWelcome({
  open,
  onOpenChange,
  onStartConversation,
  returnFocus,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStartConversation: () => void;
  returnFocus: RefObject<HTMLElement | null>;
}) {
  const title = useRef<HTMLHeadingElement>(null);
  const startingConversation = useRef(false);
  useEffect(() => {
    if (open) startingConversation.current = false;
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="first-visit"
        backdropClassName="first-visit-backdrop"
        showCloseButton={false}
        initialFocus={title}
        finalFocus={() => {
          if (startingConversation.current) return false;
          const target = returnFocus.current;
          return target?.isConnected &&
            target !== document.body &&
            !target.closest('[inert]') &&
            !target.matches(':disabled')
            ? target
            : document.querySelector<HTMLButtonElement>('.menu-trigger');
        }}
      >
        <header className="first-visit__greeting">
          <img
            src="/photographs/gabriela-cotidiana.webp"
            width={128}
            height={160}
            alt="Gabriela, rodeada de plantas"
          />
          <div>
            <DialogTitle
              className="first-visit__title"
              ref={title}
              tabIndex={-1}
            >
              {firstVisitWelcome.title}
            </DialogTitle>
            <p>{firstVisitWelcome.greeting}</p>
          </div>
        </header>
        <div className="first-visit__copy">
          <DialogDescription className="first-visit__message">
            {firstVisitWelcome.paragraphs[0]}
          </DialogDescription>
          <p className="first-visit__message">
            {firstVisitWelcome.paragraphs[1]}
          </p>
        </div>
        <div className="first-visit__actions">
          <button
            type="button"
            className="first-visit__action"
            onClick={() => {
              startingConversation.current = true;
              onStartConversation();
            }}
          >
            {firstVisitWelcome.action}
            <ArrowRight size={18} strokeWidth={1.4} aria-hidden="true" />
          </button>
          <DialogClose className="first-visit__close">Cerrar</DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
