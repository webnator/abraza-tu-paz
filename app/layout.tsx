import type { Metadata } from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import './globals.css';

const serif = Cormorant_Garamond({ variable: '--font-serif', subsets: ['latin'], weight: ['400', '500', '600'] });
const sans = Manrope({ variable: '--font-sans', subsets: ['latin'], weight: ['400', '500', '600'] });

export const metadata: Metadata = {
  title: 'Abraza tu Paz — un lugar para atravesarlo',
  description: 'Acompañamiento psicológico transpersonal para ansiedad y transformaciones vitales.',
  openGraph: {
    title: 'Abraza tu Paz — un lugar para atravesarlo',
    description: 'Acompañamiento psicológico transpersonal para ansiedad y transformaciones vitales.',
    images: [{ url: '/og.png', width: 1672, height: 941, alt: 'Abraza tu Paz — un lugar para atravesarlo' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abraza tu Paz — un lugar para atravesarlo',
    description: 'Acompañamiento psicológico transpersonal para ansiedad y transformaciones vitales.',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body className={`${serif.variable} ${sans.variable}`}>{children}</body></html>;
}
