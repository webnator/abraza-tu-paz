'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { ArrowUpRight, MessageCircle, Minus } from 'lucide-react';
import {
  advanceConversation,
  conversationFlow,
  initialConversation,
  type ConversationOption,
  type ConversationMessage,
  type ConversationNodeId,
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
  const [pending, setPending] = useState<{
    id: number;
    node: ConversationNodeId;
    messages: ConversationMessage[];
    index: number;
    startIndex: number;
  } | null>(null);
  const [animatedIndex, setAnimatedIndex] = useState<number | null>(null);
  const replying = useRef(false);
  const replySequence = useRef(0);
  const visible = useRef(false);
  const panelId = useId();
  const title = useRef<HTMLHeadingElement>(null);
  const history = useRef<HTMLDivElement>(null);
  const launcher = useRef<HTMLButtonElement>(null);
  const previouslyOpen = useRef(false);

  useEffect(() => {
    replySequence.current += 1;
    replying.current = false;
    setPending(null);
    setAnimatedIndex(null);
    setConversation(initialConversation());
  }, [resetKey]);
  useEffect(() => {
    visible.current = open && !blocked;
    if (!visible.current) setAnimatedIndex(null);
  }, [open, blocked]);
  useEffect(() => {
    if (!pending) return;
    const timer = setTimeout(
      () => {
        if (pending.id !== replySequence.current) return;
        const last = pending.index === pending.messages.length - 1;
        setAnimatedIndex(
          visible.current ? pending.startIndex + pending.index : null,
        );
        setConversation((current) => ({
          node: last ? pending.node : current.node,
          messages: [...current.messages, pending.messages[pending.index]],
        }));
        if (last) {
          replying.current = false;
          setPending(null);
        } else setPending({ ...pending, index: pending.index + 1 });
      },
      pending.index === 0 ? 850 : 550,
    );
    return () => clearTimeout(timer);
  }, [pending]);
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
    if (replying.current) return;
    const next = advanceConversation(conversation, option.id);
    if (next === conversation) return;
    const visitorIndex = conversation.messages.length;
    replying.current = true;
    setAnimatedIndex(visitorIndex);
    setConversation({
      node: conversation.node,
      messages: next.messages.slice(0, visitorIndex + 1),
    });
    setPending({
      id: ++replySequence.current,
      node: next.node,
      messages: next.messages.slice(visitorIndex + 1),
      index: 0,
      startIndex: visitorIndex + 1,
    });
    title.current?.focus({ preventScroll: true });
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
            className={`conversation__message conversation__message--${message.speaker}${index === animatedIndex ? ' conversation__message--arriving' : ''}`}
            data-speaker={message.speaker}
            key={index}
          >
            <span className="sr-only">
              {message.speaker === 'visitor' ? 'Tú: ' : 'Gabriela: '}
            </span>
            {message.text}
          </p>
        ))}
        {pending ? (
          <div className="conversation__typing" role="status">
            <span className="sr-only">Preparando respuesta…</span>
            <i aria-hidden="true" />
            <i aria-hidden="true" />
            <i aria-hidden="true" />
          </div>
        ) : null}
      </div>
      <div
        className="conversation__options"
        aria-label="Elige cómo seguir"
        aria-busy={!!pending}
      >
        {conversationFlow[conversation.node].options.map((option) =>
          option.action === 'whatsapp' ? (
            <a
              key={option.id}
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={pending ? true : undefined}
              tabIndex={pending ? -1 : undefined}
              onClick={(event) => {
                if (replying.current) {
                  event.preventDefault();
                  return;
                }
                choose(option);
              }}
            >
              <span>{option.label}</span>
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          ) : (
            <button
              type="button"
              key={option.id}
              disabled={!!pending}
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
