'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { ArrowUpRight, MessageCircle, Minus } from 'lucide-react';
import {
  advanceConversation,
  conversationFlow,
  initialConversation,
  type ConversationOption,
} from '@/lib/guided-conversation';
import { whatsappUrl } from '@/lib/contact';

export function GuidedConversation({
  open,
  blocked,
  resetKey,
  onOpenChange,
  onNavigate,
}: {
  open: boolean;
  blocked: boolean;
  resetKey: number;
  onOpenChange: (open: boolean) => void;
  onNavigate: (destination: 'therapy' | 'resources') => void;
}) {
  const [conversation, setConversation] = useState(initialConversation);
  const panelId = useId();
  const title = useRef<HTMLHeadingElement>(null);
  const history = useRef<HTMLDivElement>(null);
  const launcher = useRef<HTMLButtonElement>(null);
  const previouslyOpen = useRef(false);

  useEffect(() => {
    setConversation(initialConversation());
  }, [resetKey]);
  useEffect(() => {
    if (blocked) {
      previouslyOpen.current = false;
      return;
    }
    if (open) title.current?.focus({ preventScroll: true });
    else if (previouslyOpen.current)
      launcher.current?.focus({ preventScroll: true });
    previouslyOpen.current = open;
  }, [open, blocked]);
  useEffect(() => {
    if (!open || blocked) return;
    history.current?.scrollTo({
      top: history.current.scrollHeight,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth',
    });
  }, [conversation.messages.length, open, blocked]);

  const choose = (option: ConversationOption) => {
    setConversation((current) => advanceConversation(current, option.id));
    if (option.action === 'close') onOpenChange(false);
    if (option.action === 'therapy' || option.action === 'resources') {
      onOpenChange(false);
      onNavigate(option.action);
    }
  };

  if (blocked) return null;
  if (!open)
    return (
      <button
        className="conversation-launcher"
        type="button"
        ref={launcher}
        aria-label="Retomar conversación con Gabriela"
        aria-expanded={false}
        aria-controls={panelId}
        aria-haspopup="dialog"
        onClick={() => onOpenChange(true)}
        onKeyDown={(event) => event.stopPropagation()}
      >
        <MessageCircle size={24} strokeWidth={1.5} aria-hidden="true" />
        <span>¿Hablamos?</span>
      </button>
    );
  return (
    <section
      className="conversation-widget"
      id={panelId}
      role="dialog"
      aria-modal="false"
      aria-labelledby={`${panelId}-title`}
      aria-describedby={`${panelId}-description`}
      onKeyDown={(event) => {
        event.stopPropagation();
        if (event.key === 'Escape') {
          event.preventDefault();
          onOpenChange(false);
        }
      }}
    >
      <header className="conversation__header">
        <img
          src="/photographs/gabriela-cotidiana.webp"
          alt=""
          width={40}
          height={40}
        />
        <div>
          <h2 id={`${panelId}-title`} ref={title} tabIndex={-1}>
            Gabriela
          </h2>
          <p id={`${panelId}-description`}>Conversación guiada</p>
        </div>
        <button
          type="button"
          aria-label="Minimizar conversación"
          onClick={() => onOpenChange(false)}
        >
          <Minus size={20} strokeWidth={1.4} aria-hidden="true" />
        </button>
      </header>
      <div
        ref={history}
        className="conversation__history"
        role="log"
        aria-live="polite"
        aria-relevant="additions"
        aria-label="Mensajes de la conversación"
      >
        {conversation.messages.map((message, index) => (
          <p
            className={`conversation__message conversation__message--${message.speaker}`}
            data-speaker={message.speaker}
            key={index}
          >
            <span className="sr-only">
              {message.speaker === 'visitor' ? 'Tú: ' : 'Gabriela: '}
            </span>
            {message.text}
          </p>
        ))}
      </div>
      <div className="conversation__options" aria-label="Elige cómo seguir">
        {conversationFlow[conversation.node].options.map((option) =>
          option.action === 'whatsapp' ? (
            <a
              key={option.id}
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => choose(option)}
            >
              <span>{option.label}</span>
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          ) : (
            <button
              type="button"
              key={option.id}
              onClick={() => choose(option)}
            >
              {option.label}
            </button>
          ),
        )}
      </div>
    </section>
  );
}
