// Editorial proposal based on supplied content. Pending Gabriela's approval.
// This is a local, guided conversation; no visitor answers are persisted or sent.
export type ConversationNodeId =
  | 'start'
  | 'therapy'
  | 'approach'
  | 'uncertain'
  | 'resources'
  | 'explore'
  | 'garden'
  | 'contact'
  | 'continue';
export type ConversationAction = 'close' | 'therapy' | 'resources' | 'whatsapp';
export type ConversationOption = {
  id: string;
  label: string;
  next: ConversationNodeId;
  action?: ConversationAction;
};
type ConversationNode = { messages: string[]; options: ConversationOption[] };

const contact: ConversationOption = {
  id: 'contact',
  label: 'Me gustaría consultar una cita',
  next: 'contact',
};
const explore: ConversationOption = {
  id: 'explore',
  label: 'Prefiero seguir explorando',
  next: 'continue',
  action: 'close',
};
const therapy: ConversationOption = {
  id: 'therapy',
  label: 'Conocer cómo acompañas',
  next: 'continue',
  action: 'therapy',
};
const resources: ConversationOption = {
  id: 'library',
  label: 'Acercarme a la biblioteca',
  next: 'continue',
  action: 'resources',
};
const anotherQuestion: ConversationOption = {
  id: 'another',
  label: 'Quiero mirar otra cosa',
  next: 'start',
};
const whatsapp: ConversationOption = {
  id: 'whatsapp',
  label: 'Escribir por WhatsApp',
  next: 'continue',
  action: 'whatsapp',
};

export const conversationFlow: Record<ConversationNodeId, ConversationNode> = {
  start: {
    messages: [
      'Este puede ser un primer lugar para mirar qué necesitas hoy.',
      '¿Qué te trae por aquí?',
    ],
    options: [
      { id: 'accompaniment', label: 'Busco acompañamiento', next: 'therapy' },
      {
        id: 'resources',
        label: 'Me vendría bien un recurso',
        next: 'resources',
      },
      { id: 'discover', label: 'Quiero explorar con calma', next: 'explore' },
      whatsapp,
    ],
  },
  therapy: {
    messages: [
      'A veces, lo que estamos viviendo pide un espacio para parar y mirarlo con alguien.',
      '¿Qué te gustaría saber antes de dar ese paso?',
    ],
    options: [
      {
        id: 'approach',
        label: 'Cómo es tu manera de acompañar',
        next: 'approach',
      },
      { id: 'begin', label: 'Cómo puedo empezar', next: 'contact' },
      { id: 'unsure', label: 'Todavía no lo tengo claro', next: 'uncertain' },
    ],
  },
  approach: {
    messages: [
      'Acompaño desde la psicología transpersonal: una mirada que tiene en cuenta tu historia, tus vínculos y el sentido de lo que estás viviendo.',
      'Podemos empezar por conocernos y resolver tus preguntas, con calma.',
    ],
    options: [contact, therapy, explore],
  },
  uncertain: {
    messages: [
      'Está bien no tenerlo claro todavía. Puedes tomarte tu tiempo y conocer este lugar antes de decidir.',
      '¿Te apetece mirar cómo acompaño o empezar por un recurso?',
    ],
    options: [therapy, resources, explore],
  },
  resources: {
    messages: [
      'En la biblioteca hay cuadernos para leer, escribir y detenerte un rato.',
      'Puedes llevarte lo que te sirva y volver cuando quieras. ¿Por dónde te gustaría seguir?',
    ],
    options: [
      resources,
      {
        id: 'sessions',
        label: 'Quiero saber sobre las sesiones',
        next: 'therapy',
      },
      explore,
    ],
  },
  explore: {
    messages: [
      'Entonces vamos a tu ritmo. Puedes cruzar la verja, seguir el sendero y detenerte donde algo te resuene.',
      'Si después te apetece volver a esta conversación, la encontrarás aquí.',
    ],
    options: [
      explore,
      {
        id: 'garden',
        label: '¿Qué puedo encontrar en el jardín?',
        next: 'garden',
      },
      contact,
    ],
  },
  garden: {
    messages: [
      'El sendero lleva a un refugio. Allí encontrarás fotografías, recursos y un lugar para conocer cómo acompaño.',
      'No hace falta verlo todo hoy. Puedes acercarte a lo que te despierte curiosidad.',
    ],
    options: [resources, therapy, explore],
  },
  contact: {
    messages: [
      'Si te apetece conocer las sesiones o preguntar por una primera cita, puedes escribirme por WhatsApp.',
      'Podemos empezar por resolver tus dudas. No necesitas tener todas las respuestas antes de hablar.',
    ],
    options: [
      { ...whatsapp, label: 'Consultar una cita por WhatsApp' },
      anotherQuestion,
      explore,
    ],
  },
  continue: {
    messages: [
      'Puedes seguir mirando y retomar esta conversación cuando te apetezca.',
    ],
    options: [anotherQuestion, contact, explore],
  },
};

export type ConversationMessage = {
  speaker: 'gabriela' | 'visitor';
  text: string;
};
export type ConversationState = {
  node: ConversationNodeId;
  messages: ConversationMessage[];
};
export const initialConversation = (): ConversationState => ({
  node: 'start',
  messages: conversationFlow.start.messages.map((text) => ({
    speaker: 'gabriela',
    text,
  })),
});

export function advanceConversation(
  state: ConversationState,
  optionId: string,
): ConversationState {
  const option = conversationFlow[state.node].options.find(
    ({ id }) => id === optionId,
  );
  if (!option) return state;
  return {
    node: option.next,
    messages: [
      ...state.messages,
      { speaker: 'visitor', text: option.label },
      ...conversationFlow[option.next].messages.map(
        (text): ConversationMessage => ({ speaker: 'gabriela', text }),
      ),
    ],
  };
}
