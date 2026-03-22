import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'BrandSlop — Your brand. 60 seconds.',
  description:
    'Describe your vision. Get a complete brand identity. AI-powered brand generation in under a minute.',
  openGraph: {
    title: 'BrandSlop — Your brand. 60 seconds.',
    description: 'Describe your vision. Get a complete identity.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans min-h-screen">
        {children}
      </body>
    </html>
  );
}
