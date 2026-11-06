export const firstVisitStorageKey = 'abraza-tu-paz:welcome-seen:v1';
export const firstVisitDelay = 2200;

// Proposed welcome in Gabriela's voice, pending her approval.
export const firstVisitWelcome = {
  status: 'pending-client-approval',
  title: 'Hola, soy Gabriela.',
  greeting: 'Me alegra que estés aquí.',
  paragraphs: [
    'Algo te trajo hasta este jardín. Quizás una pregunta, un cambio, las ganas de encontrar un poco de calma… o simplemente curiosidad.',
    'No necesitas tenerlo todo claro para empezar. Podemos mirar qué estás buscando y encontrar, a tu ritmo, por dónde seguir.',
  ],
  action: 'Conversar conmigo',
} as const;
