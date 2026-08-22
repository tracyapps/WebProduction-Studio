import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://webproduction.studio'),
  title: 'WPs — WebProduction Studio',
  description:
    'An open, purpose-driven production system for WordPress agencies, developers, and the clients they serve.',
  icons: { icon: '/favicon.png' },
  openGraph: {
    title: 'WPs — WebProduction Studio',
    description: 'WordPress sites your clients aren’t afraid to touch.',
    type: 'website',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'WPs — WebProduction Studio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WPs — WebProduction Studio',
    description: 'WordPress sites your clients aren’t afraid to touch.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
