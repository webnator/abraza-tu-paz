// Editorial prototypes for the local review. No text is a patient quotation;
// Gabriela will validate these drafts and provide the final recording.
export type DiscoveryKind = 'bench' | 'letters' | 'water' | 'refuge';
export type DiscoverySelection = { kind: DiscoveryKind; letter?: number };

export const gardenWelcome = {
  title: 'Este jardín, a tu ritmo.',
  paragraphs: [
    'Aquí puedes bajar el ritmo. Sentarte, escuchar, abrir una carta o mirar cómo se mueve el agua.',
    'Quizá encuentres algo que te acompañe hoy. Puedes recorrer este jardín a tu manera, sin tener que llegar a ningún sitio.',
  ],
};

export const refugeWelcome = {
  title: 'Hay una silla para ti.',
  paragraphs: [
    'Este refugio es un lugar para encontrarnos. Después de caminar, puedes sentarte y acercarte a esa conversación que quizá estás buscando.',
    'Las fotografías cuentan un poco de quién soy. Los libros guardan cuadernos para acompañarte. Y en las sillas hay un espacio para conocer cómo trabajo y qué significa empezar un proceso conmigo.',
    'Puedes mirar, preguntar y tomarte tu tiempo para decidir.',
  ],
};

export const gardenLetters = [
  {
    title: 'Cuando no sabes por dónde empezar',
    paragraphs: [
      'A veces llegamos a un lugar sin saber muy bien qué estamos buscando. Solo sabemos que algo se mueve por dentro y que seguir como hasta ahora empieza a pesar.',
      'Puedes comenzar por algo pequeño: una pregunta que llevas tiempo posponiendo, una necesidad que apenas has podido escuchar o unas palabras que todavía no encuentras.',
      'No hace falta ordenar toda tu historia para hacerle un poco de espacio.',
    ],
  },
  {
    title: 'Una cosa a la vez',
    paragraphs: [
      'Hay días en los que todo parece pedirnos una respuesta al mismo tiempo. Lo que pasó, lo que viene, lo que esperan de nosotros.',
      'Quizá hoy puedas mirar una sola cosa. Reconocer qué está más cerca, qué necesita atención y qué puede esperar un poco.',
      'También hay una manera de avanzar que empieza por dejar de exigirte llegar a todo.',
    ],
  },
  {
    title: 'También puedes quedarte aquí',
    paragraphs: [
      'A veces una pausa nos permite escuchar algo que, entre tantas cosas, había quedado al fondo.',
      'Puedes quedarte un rato en este jardín. Mirar la luz sobre las hojas, leer de nuevo una frase o simplemente sentarte.',
      'El camino seguirá aquí. No tienes que recorrerlo entero hoy.',
    ],
  },
] as const;

export const benchReading = {
  title: 'Un momento contigo',
  audio: '/audio/un-momento-contigo-demo.mp3',
  transcript:
    'Puedes escuchar estas palabras como quien se sienta un momento en un banco. Tal vez llegas con muchas cosas en la cabeza, o con una sensación a la que todavía no sabes ponerle nombre. Por un momento, puedes dejar que este lugar te acompañe. Mira algo que esté cerca: una hoja, una sombra, la luz que se refleja en el agua. No necesitas encontrar una respuesta mientras estás aquí. Puedes escuchar lo que hay a tu alrededor y reconocer cómo estás hoy. Cuando quieras, puedes seguir caminando. También puedes quedarte un poco más.',
  note: 'Lectura provisional con voz de muestra. Texto y grabación pendientes de Gabriela.',
};

export const discoveryPositions = {
  bench: { x: 20, y: 65 },
  letters: { x: 84, y: 76 },
  water: { x: 57, y: 65 },
  refuge: { x: 55, y: 70 },
} as const;
