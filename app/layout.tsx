import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'BrandSlop — Your brand. 60 seconds.',
  description:
    'Describe your idea. Get a complete brand identity. AI-powered brand generation in under a minute.',
  openGraph: {
    title: 'BrandSlop — Your brand. 60 seconds.',
    description: 'Describe your idea. Get a complete brand identity.',
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
      <body className="font-sans bg-black text-[#f5f5f7] min-h-screen">
        {children}
      </body>
    </html>
  );
}
