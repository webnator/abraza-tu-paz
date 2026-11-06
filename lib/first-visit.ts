export const firstVisitStorageKey = 'abraza-tu-paz:welcome-seen:v1';
export const firstVisitDelay = 2200;

// Proposed welcome in Gabriela's voice, pending her approval.
// Uses the supplied brand voice and real site content, not a live chat.
export const firstVisitWelcome = {
  status: 'pending-client-approval',
  title: 'Hola, soy Gabriela.',
  greeting: 'Qué bueno que estés aquí.',
  introduction:
    'Este jardín es una invitación a mirar con calma y encontrar lo que tenga sentido para ti. No hace falta recorrerlo entero hoy.',
  question: '¿Qué te trae por aquí hoy?',
  choices: [
    {
      id: 'explore',
      label: 'Quiero explorar con calma',
      title: 'Pues vamos a tu ritmo.',
      reply:
        'Puedes cruzar la verja, seguir el sendero y detenerte donde algo te resuene. Mira, prueba, quédate un rato. El menú está ahí si lo necesitas.',
      action: 'Seguir mirando',
    },
    {
      id: 'therapy',
      label: 'Busco acompañamiento',
      title: 'Podemos empezar por ahí.',
      reply:
        'En el refugio te cuento cómo acompaño y qué podemos trabajar. Puedes acercarte, conocer mi manera de mirar y decidir con calma.',
      action: 'Conocer cómo acompaño',
    },
    {
      id: 'resources',
      label: 'Me vendría bien un recurso',
      title: 'Quizás encuentres algo para hoy.',
      reply:
        'En la biblioteca hay cuadernos para leer, escribir y detenerte un rato. Puedes llevarte lo que te sirva y volver cuando quieras.',
      action: 'Acercarme a la biblioteca',
    },
  ],
} as const;

export type FirstVisitChoice = (typeof firstVisitWelcome.choices)[number]['id'];
