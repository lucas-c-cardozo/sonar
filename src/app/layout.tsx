import { Providers } from '@/components/Providers';
import type { Metadata, Viewport } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-roboto',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Sonar — Seu catálogo musical',
  description: 'Descubra, registre e compartilhe sua música favorita com o Sonar.',
  keywords: ['música', 'catálogo musical', 'recomendações', 'álbuns', 'playlist'],
};

export const viewport: Viewport = {
  colorScheme: 'light',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${roboto.variable} scheme-light`} data-theme="light">
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
