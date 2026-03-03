import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BrandSlop — AI-Ready Brand Design Systems',
  description: 'Copy-paste brand design systems for AI tools. Full specifications including colors, typography, spacing, components, motion, and more.',
  openGraph: {
    title: 'BrandSlop — AI-Ready Brand Design Systems',
    description: 'Copy-paste brand design systems for AI tools.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  );
}
