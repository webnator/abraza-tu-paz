'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
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
  type FirstVisitChoice,
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

  return { open, onOpenChange: setOpen, replay, returnFocus };
}

export function FirstVisitWelcome({
  open,
  onOpenChange,
  onChoose,
  returnFocus,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onChoose: (choice: FirstVisitChoice) => void;
  returnFocus: RefObject<HTMLElement | null>;
}) {
  const [choice, setChoice] = useState<FirstVisitChoice | null>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const question = useRef<HTMLHeadingElement>(null);
  const selected = firstVisitWelcome.choices.find((item) => item.id === choice);
  useEffect(() => {
    if (open) setChoice(null);
  }, [open]);
  useEffect(() => {
    if (choice) question.current?.focus();
  }, [choice]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="first-visit"
        backdropClassName="first-visit-backdrop"
        showCloseButton={false}
        initialFocus={title}
        finalFocus={() => {
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
            width={98}
            height={124}
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
        {!selected ? (
          <div className="first-visit__conversation">
            <DialogDescription className="first-visit__message">
              {firstVisitWelcome.introduction}
            </DialogDescription>
            <h3 className="first-visit__question" ref={question} tabIndex={-1}>
              {firstVisitWelcome.question}
            </h3>
            <div className="first-visit__choices">
              {firstVisitWelcome.choices.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setChoice(item.id)}
                >
                  <span>{item.label}</span>
                  <ArrowRight size={16} strokeWidth={1.4} aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="first-visit__conversation">
            <h3 className="first-visit__question" ref={question} tabIndex={-1}>
              {selected.title}
            </h3>
            <DialogDescription className="first-visit__message">
              {selected.reply}
            </DialogDescription>
            <button
              type="button"
              className="first-visit__action"
              onClick={() => onChoose(selected.id)}
            >
              {selected.action}
              <ArrowRight size={17} strokeWidth={1.4} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="first-visit__back"
              onClick={() => {
                setChoice(null);
                requestAnimationFrame(() => question.current?.focus());
              }}
            >
              <ArrowLeft size={14} aria-hidden="true" />
              Volver a la pregunta
            </button>
          </div>
        )}
        {selected?.id !== 'explore' ? (
          <DialogClose className="first-visit__close">Cerrar</DialogClose>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
