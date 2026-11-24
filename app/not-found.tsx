import Link from '@/components/site-link';

export default function NotFound() {
  return (
    <article className="editorial-page">
      <header className="editorial-heading">
        <h1>Este camino no está aquí.</h1>
        <p>
          Puedes volver al jardín o encontrar lo que necesitas en la biblioteca.
        </p>
      </header>
      <Link href="/" className="solid-button">
        Volver al jardín
      </Link>
      <p style={{ marginTop: '2rem' }}>
        <Link href="/biblioteca">Visitar la biblioteca</Link>
      </p>
    </article>
  );
}
