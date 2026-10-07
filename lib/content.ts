export const destinations = [
  { id: 'terapia', title: 'Terapia', subtitle: 'Un espacio para ti' },
  {
    id: 'gabriela',
    title: 'Quién te acompaña',
    subtitle: 'Gabriela Laurentin',
  },
  {
    id: 'biblioteca',
    title: 'Biblioteca',
    subtitle: 'Para leer, escuchar y hacer',
  },
  { id: 'reflexiones', title: 'Reflexiones', subtitle: 'Una manera de mirar' },
  {
    id: 'proyectos',
    title: 'Proyectos',
    subtitle: 'Lo que también cultivamos',
  },
  { id: 'contacto', title: '¿Hablamos?', subtitle: 'Empezar una conversación' },
] as const;

export type Destination = (typeof destinations)[number]['id'];
export const instagramUrl = 'https://www.instagram.com/abrazatupaz/';
export const videoUrl = 'https://www.youtube.com/watch?v=SGefq5c0lpc';

export const resources = [
  {
    slug: 'adulto-responsable',
    title: 'Ser mi propio adulto responsable',
    originalTitle: 'La nueva dimensión de lo conocido',
    theme: 'Cuidado y responsabilidad',
    description:
      'Una pausa para mirar tus compromisos contigo, distinguir esfuerzo de sacrificio y reconocer cuándo estás intentando sostener procesos que pertenecen a otras personas.',
    pages: 7,
    date: 'Mayo de 2024',
    file: 'adulto-responsable.pdf',
    cover: 'adulto-responsable.webp',
    color: 'sun',
    sections: [
      {
        title: 'Hacerte lugar en tus propias decisiones',
        text: 'Las situaciones conocidas también pueden pedirnos respuestas nuevas. Este cuaderno propone revisar cómo te haces cargo de tu vida sin convertir la responsabilidad en una exigencia de perfección.',
      },
      {
        title: 'Lo que encontrarás',
        text: 'Preguntas sobre familia, trabajo y dinero; una exploración del esfuerzo y el sacrificio; y un manifiesto para reconocer compromisos, hábitos y límites personales.',
      },
      {
        title: 'Cómo acercarte al cuaderno',
        text: 'Elige una situación concreta. Lee las preguntas sin prisa y escribe solo lo que tenga sentido para ti hoy. Puedes volver a ellas después: no necesitas completar todo en una sola vez.',
      },
    ],
  },
  {
    slug: 'vinculos-que-se-transforman',
    title: 'Vínculos que se transforman',
    originalTitle: 'Relaciones que se transforman',
    theme: 'Relaciones y expectativas',
    description:
      'Preguntas para reconocer expectativas, abrirte a lo que está ocurriendo y mirar qué necesita cambiar en tus relaciones.',
    pages: 9,
    date: 'Febrero de 2024',
    file: 'vinculos-que-se-transforman.pdf',
    cover: 'vinculos-que-se-transforman.webp',
    color: 'flower',
    sections: [
      {
        title: 'Cuando el vínculo cambia',
        text: 'Las personas cambian, y las relaciones también. A veces lo difícil es reconocer que una expectativa que nos orientó durante un tiempo ya no describe lo que está pasando.',
      },
      {
        title: 'Lo que encontrarás',
        text: 'Una revisión de tus expectativas en los vínculos, los logros y la relación contigo; una práctica de reconocimiento, apertura y acción; y preguntas para identificar conversaciones, límites o cambios pendientes.',
      },
      {
        title: 'Un punto de partida',
        text: 'Piensa en una relación que quieras comprender mejor. El cuaderno puede ayudarte a ordenar lo que esperabas, lo que está ocurriendo y lo que quieres conversar. No tiene que conducir a una decisión inmediata.',
      },
    ],
  },
  {
    slug: 'descifrando-la-frustracion',
    title: 'Descifrando la frustración',
    originalTitle: 'Descifrando la frustración en 6 actos',
    theme: 'Cambio e incertidumbre',
    description:
      'Seis preguntas para explorar qué te frustra, qué temes perder y qué pequeños hábitos te dan suelo mientras algo cambia.',
    pages: 5,
    date: 'Noviembre de 2023',
    file: 'descifrando-la-frustracion.pdf',
    cover: 'descifrando-la-frustracion.webp',
    color: 'earth',
    sections: [
      {
        title: 'Escuchar la incomodidad',
        text: 'El cuaderno invita a detenerte en una frustración reciente y observar qué parte de tus expectativas, tus límites o tus dinámicas está siendo puesta en cuestión.',
      },
      {
        title: 'Lo que encontrarás',
        text: 'Una exploración por áreas de vida, preguntas sobre cambio y resistencia, y una invitación a reconocer los hábitos cotidianos que te sostienen en momentos inciertos.',
      },
      {
        title: 'A tu ritmo',
        text: 'Puedes responder una pregunta y dejar las demás para otro día. Si alguna metáfora no encaja contigo, tradúcela a tus propias palabras. Lo importante es que el ejercicio te permita mirar lo que estás viviendo.',
      },
    ],
  },
  {
    slug: 'transitar-las-fiestas',
    title: 'Transitar las fiestas fiel a ti',
    originalTitle: 'Transitar las fiestas fiel a ti',
    theme: 'Emociones y necesidades',
    description:
      'Un cuaderno para hacer espacio a las emociones que conviven en las fiestas y elegir qué puedes ofrecer sin dejarte fuera.',
    pages: 5,
    date: 'Diciembre de 2023',
    file: 'transitar-las-fiestas.pdf',
    cover: 'transitar-las-fiestas.webp',
    color: 'water',
    sections: [
      {
        title: 'No hay una sola manera de vivir las fiestas',
        text: 'La alegría puede convivir con la tristeza, el orgullo con la frustración y las ganas de compartir con la necesidad de descansar. Este cuaderno parte de esa ambivalencia.',
      },
      {
        title: 'Lo que encontrarás',
        text: 'Una comparación entre expectativas, pasado y realidad; palabras para reconocer cómo te sientes; y preguntas sobre decisiones, necesidades, exigencia y energía disponible.',
      },
      {
        title: 'Volver a lo que necesitas',
        text: 'Úsalo para mirar cómo estás viviendo este período, sin obligarte a sentir algo distinto. Aunque fue creado para diciembre, varias preguntas pueden acompañarte en otros encuentros y celebraciones.',
      },
    ],
  },
] as const;

export const reflections = [
  {
    slug: 'cambiar-tambien-es-perder',
    title: 'Cambiar también puede sentirse como perder',
    topic: 'Transformaciones',
    readTime: '3 min',
    excerpt:
      'Puedes querer una vida nueva y echar de menos la anterior. Las dos cosas pueden ser verdad.',
    paragraphs: [
      'A veces un cambio llega acompañado de una expectativa: deberías estar feliz. Elegiste irte, empezar, terminar o hacer algo distinto. ¿Por qué aparece entonces esa sensación de pérdida?',
      'Cambiar no solo abre posibilidades. También modifica los lugares, las rutinas y las versiones de ti que conocías. Puedes querer lo que viene y sentir tristeza por lo que dejas. Una emoción no cancela la otra.',
      'Quizás lo que echas de menos no es exactamente la situación anterior. Puede ser la familiaridad, la idea que tenías de cómo sería tu vida o la sensación de saber quién eras dentro de ella. Nombrarlo puede ayudarte a entender mejor esa nostalgia.',
      'No necesitas convertir cada pérdida en una lección ni encontrar de inmediato la parte positiva. Hay procesos que primero necesitan tiempo, palabras y compañía.',
      'Puedes preguntarte qué quieres conservar, qué ya no te representa y qué todavía no sabes. Las respuestas pueden cambiar mientras tú también cambias.',
      'Atravesar una transformación no requiere tener claro el final. A veces empieza por permitirte decir: esto lo elegí, esto me importa y esto también me duele.',
    ],
    question:
      '¿Qué parte de tu vida anterior necesitas reconocer antes de seguir?',
  },
  {
    slug: 'poner-un-limite-y-sentir-culpa',
    title: 'Poner un límite y sentir culpa',
    topic: 'Vínculos',
    readTime: '3 min',
    excerpt:
      'Que una decisión te incomode no significa, por sí solo, que hayas hecho algo malo.',
    paragraphs: [
      'Dices que no. Explicas lo que puedes ofrecer. Pides un tiempo o una forma distinta de relacionarte. Y, después, llega la culpa.',
      'Puede aparecer incluso cuando el límite era necesario. Si estás acostumbrado a acomodarte para no decepcionar, elegir algo propio puede resultar extraño. Esa incomodidad merece ser escuchada, pero no tiene que decidir automáticamente por ti.',
      'Vale la pena mirar qué te está diciendo. ¿Hay algo que quieras reparar en la manera de expresarte? ¿Estás imaginando la reacción de la otra persona? ¿Sientes que cuidar de ti pone en riesgo el vínculo?',
      'Un límite puede revisarse y conversarse. También puede sostenerse con cuidado. No exige endurecerte ni demostrar que no necesitas a nadie; necesita claridad sobre lo que sí puedes, lo que no puedes y lo que es importante para ti.',
      'A veces ayuda distinguir entre ser responsable de cómo comunicas una decisión y tratar de controlar cómo la recibe otra persona. No siempre podrás evitar su incomodidad.',
      'Puedes dar espacio a la culpa mientras comprendes lo que necesitas. Elegirte y cuidar una relación no tienen por qué ser decisiones opuestas.',
    ],
    question:
      '¿Qué intentas proteger con ese límite, y qué temes que ocurra al sostenerlo?',
  },
  {
    slug: 'cuando-tu-cabeza-no-para',
    title: 'Cuando tu cabeza no para',
    topic: 'Ansiedad',
    readTime: '3 min',
    excerpt:
      'Pensar más no siempre te acerca a una respuesta. A veces necesitas reconocer qué estás intentando asegurar.',
    paragraphs: [
      'Repasas una conversación. Anticipas una respuesta. Ensayas lo que harías si algo sale mal. Parece que, si piensas un poco más, llegará la certeza que necesitas.',
      'Pero el pensamiento puede volver al mismo lugar una y otra vez. La pregunta ya no encuentra información nueva; encuentra otro escenario que hay que resolver.',
      'En esos momentos, quizá puedas mirar qué intentas conseguir: evitar un error, no decepcionar, protegerte de una pérdida o sentir que estás preparado. Entender esa intención puede ser más útil que pelearte con cada pensamiento.',
      'Pregúntate si hay una acción concreta que puedes tomar ahora. A veces la hay: pedir una aclaración, organizar algo pendiente o tener una conversación. Otras veces estás intentando resolver hoy una situación que todavía no ha ocurrido.',
      'No necesitas creer todo lo que piensas ni encontrar una respuesta para cada posibilidad. Puedes reconocer que hay incertidumbre y volver a lo que está ocurriendo en este momento.',
      'Si este ruido ocupa cada vez más espacio en tu vida, también puedes buscar un lugar donde hablar de ello y comprenderlo acompañado. No hace falta esperar a poder con todo por tu cuenta.',
    ],
    question:
      '¿Hay algo que puedas hacer ahora, o estás buscando una certeza que hoy no está disponible?',
  },
] as const;

export const stories = [
  {
    id: 'proyecto',
    image: '/photographs/gabriela-cotidiana.webp',
    title: 'Lo que hago, lo que vivo',
    caption: 'La persona detrás del proyecto',
    text: 'Mi manera de acompañar también tiene una vida alrededor: curiosidad, aprendizajes, vínculos y decisiones. Abraza tu Paz nace de ese encuentro entre lo que sé como psicóloga y lo que sigo descubriendo como persona.',
  },
  {
    id: 'maternidad',
    image: '/photographs/maternidad.webp',
    title: 'Una nueva manera de estar',
    caption: 'Maternidad',
    text: 'La maternidad forma parte de quien soy hoy. Una experiencia personal que da textura a mi mirada y convive con otras partes de mi vida. Mi historia abre preguntas; no presupone que sea igual a la tuya.',
  },
  {
    id: 'pareja',
    image: '/photographs/pareja-paris.webp',
    title: 'La vida compartida',
    caption: 'Vínculos',
    text: 'Los vínculos también forman parte de mi historia. Son lugares donde nos conocemos, cambiamos y aprendemos a conversar sobre lo que queremos y necesitamos. No siempre desde la certeza; muchas veces, desde el encuentro.',
  },
  {
    id: 'viajes',
    image: '/photographs/gabriela-viaje.webp',
    title: 'Hacer espacio al disfrute',
    caption: 'Viajes y momentos propios',
    text: 'También hay espacio para el disfrute, el viaje y los momentos que no necesitan convertirse en una enseñanza. La vida que acompaño incluye lo cotidiano, lo difícil y aquello que simplemente nos hace bien.',
  },
  {
    id: 'familia',
    image: '/photographs/familia.webp',
    title: 'Lo que me acompaña',
    caption: 'Mi vida fuera de la consulta',
    text: 'Tengo vínculos, lugares y personas que me acompañan. No miro la vida desde fuera. La vivo, y sigo aprendiendo a habitar sus cambios mientras acompaño a otras personas a atravesar los suyos.',
  },
] as const;

export function destinationForPath(path: string): Destination | null {
  const first = path.split('/').filter(Boolean)[0];
  return destinations.find((item) => item.id === first)?.id ?? null;
}

export function titleForPath(path: string): string {
  const parts = path.split('/').filter(Boolean);
  if (parts[0] === 'biblioteca' && parts[1])
    return resources.find((r) => r.slug === parts[1])?.title ?? 'Biblioteca';
  if (parts[0] === 'reflexiones' && parts[1])
    return reflections.find((r) => r.slug === parts[1])?.title ?? 'Reflexiones';
  return destinations.find((d) => d.id === parts[0])?.title ?? 'Abraza tu Paz';
}
