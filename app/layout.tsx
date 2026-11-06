import type { Metadata } from 'next';
import {
  Cormorant_Garamond,
  Manrope,
  Nothing_You_Could_Do,
} from 'next/font/google';
import './globals.css';
import { Experience } from '@/components/experience';

const serif = Cormorant_Garamond({
  variable: '--font-serif',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});
const sans = Manrope({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});
const handwriting = Nothing_You_Could_Do({
  variable: '--font-handwriting',
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Abraza tu Paz — un lugar para atravesarlo',
  description:
    'Acompañamiento psicológico transpersonal para ansiedad y transformaciones vitales.',
  icons: { icon: '/favicon.svg' },
  openGraph: {
    title: 'Abraza tu Paz — un lugar para atravesarlo',
    description:
      'Acompañamiento psicológico transpersonal para ansiedad y transformaciones vitales.',
    images: [
      {
        url: '/og.png',
        width: 1672,
        height: 941,
        alt: 'Abraza tu Paz — un lugar para atravesarlo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abraza tu Paz — un lugar para atravesarlo',
    description:
      'Acompañamiento psicológico transpersonal para ansiedad y transformaciones vitales.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body
        className={`${serif.variable} ${sans.variable} ${handwriting.variable}`}
      >
        <Experience>{children}</Experience>
      </body>
    </html>
  );
}
