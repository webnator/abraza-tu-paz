import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  EditorialContent,
  ResourceDetail,
  ReflectionDetail,
} from '@/components/editorial-content';
import {
  destinations,
  resources,
  reflections,
  titleForPath,
  type Destination,
} from '@/lib/content';

type Props = { params: Promise<{ path: string[] }> };
export function generateStaticParams() {
  return [
    ...destinations.map((item) => ({ path: [item.id] })),
    ...resources.map((item) => ({ path: ['biblioteca', item.slug] })),
    ...reflections.map((item) => ({ path: ['reflexiones', item.slug] })),
  ];
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { path } = await params;
  const title = titleForPath(`/${path.join('/')}`);
  const descriptions: Record<string, string> = {
    terapia:
      'Acompañamiento psicológico online para ansiedad, relaciones y cambios de vida. Conoce cómo trabaja Gabriela Laurentin.',
    gabriela:
      'Conoce a Gabriela Laurentin, psicóloga y creadora de Abraza tu Paz: experiencia humana y la historia de su proyecto.',
    biblioteca:
      'Cuadernos, lecturas y recursos de Abraza tu Paz para explorar lo que sientes y escribir a tu ritmo.',
    reflexiones:
      'Reflexiones sobre ansiedad, vínculos y transformaciones vitales, con más calma y menos juicio.',
    proyectos:
      'La dimensión comunitaria de Abraza tu Paz y sus iniciativas de acompañamiento.',
    contacto:
      'Escribe a Gabriela Laurentin y pregunta cómo empezar el acompañamiento psicológico online.',
  };
  const description =
    path[0] === 'biblioteca' && path[1]
      ? resources.find((item) => item.slug === path[1])?.description
      : path[0] === 'reflexiones' && path[1]
        ? reflections.find((item) => item.slug === path[1])?.excerpt
        : descriptions[path[0]];
  return {
    title: `${title} · Abraza tu Paz`,
    description,
    openGraph: { title: `${title} · Abraza tu Paz`, description },
    twitter: { title: `${title} · Abraza tu Paz`, description },
  };
}
export default async function ContentPage({ params }: Props) {
  const { path } = await params;
  if (path.length === 1 && destinations.some((item) => item.id === path[0]))
    return <EditorialContent destination={path[0] as Destination} />;
  if (
    path.length === 2 &&
    path[0] === 'biblioteca' &&
    resources.some((item) => item.slug === path[1])
  )
    return <ResourceDetail slug={path[1]} />;
  if (
    path.length === 2 &&
    path[0] === 'reflexiones' &&
    reflections.some((item) => item.slug === path[1])
  )
    return <ReflectionDetail slug={path[1]} />;
  notFound();
}
