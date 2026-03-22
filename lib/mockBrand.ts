import { BrandIdentity } from './types';

export const exampleBrands: BrandIdentity[] = [
  {
    id: 'example-fintech',
    brandName: 'Velta',
    tagline: 'Money moves your way.',
    colors: {
      primary: '#6C5CE7',
      secondary: '#00CEC9',
      accent: '#FD79A8',
      background: '#0A0A0F',
      text: '#F5F5F7',
      muted: '#636E72',
    },
    typography: {
      heading: {
        family: 'Space Grotesk',
        weight: 700,
        style: 'Geometric, modern, tech-forward with clean lines',
      },
      body: {
        family: 'Inter',
        weight: 400,
        style: 'Neutral and highly readable at any size',
      },
    },
    voice: {
      adjectives: ['Bold', 'Direct', 'Playful', 'Trustworthy', 'Fresh'],
      doSay: [
        'Your money, no gatekeepers.',
        'Built for how you actually spend.',
        'Finance without the boring parts.',
      ],
      dontSay: [
        'We\'re disrupting the banking industry.',
        'Synergistic financial solutions.',
        'Best-in-class fintech platform.',
      ],
    },
    logoText: 'velta',
    logoIcon: '◆',
    description: 'A modern fintech for Gen Z that feels like Cash App meets Notion',
  },
  {
    id: 'example-coffee',
    brandName: 'Kindling',
    tagline: 'Slow mornings, done right.',
    colors: {
      primary: '#C8956C',
      secondary: '#2D1B0E',
      accent: '#E8D5C0',
      background: '#0D0907',
      text: '#F2EDE8',
      muted: '#8B7355',
    },
    typography: {
      heading: {
        family: 'DM Serif Display',
        weight: 400,
        style: 'Warm, editorial serif with character',
      },
      body: {
        family: 'DM Sans',
        weight: 400,
        style: 'Clean and approachable, pairs beautifully with the serif',
      },
    },
    voice: {
      adjectives: ['Warm', 'Intentional', 'Craft', 'Grounded', 'Inviting'],
      doSay: [
        'Take your time.',
        'Single-origin, small-batch, worth the wait.',
        'Good coffee is a ritual, not a habit.',
      ],
      dontSay: [
        'Fuel your hustle!',
        'Premium artisanal experience.',
        'Coffee for go-getters.',
      ],
    },
    logoText: 'KINDLING',
    logoIcon: '☕',
    description: 'A specialty coffee roaster with dark academia vibes and intentional branding',
  },
  {
    id: 'example-fitness',
    brandName: 'ARC',
    tagline: 'Train the curve.',
    colors: {
      primary: '#FF6B35',
      secondary: '#1A1A2E',
      accent: '#E8F54A',
      background: '#0A0A0A',
      text: '#FFFFFF',
      muted: '#555555',
    },
    typography: {
      heading: {
        family: 'Plus Jakarta Sans',
        weight: 800,
        style: 'Extra-bold, high-impact, athletic energy',
      },
      body: {
        family: 'Inter',
        weight: 400,
        style: 'Clean and functional, lets the content breathe',
      },
    },
    voice: {
      adjectives: ['Energetic', 'Minimal', 'Confident', 'Scientific', 'Raw'],
      doSay: [
        'Progress is a curve, not a line.',
        'Train smart. Recover smarter.',
        'Your data. Your edge.',
      ],
      dontSay: [
        'No pain, no gain!',
        'Transform your body in 30 days!',
        'Join the fitness revolution.',
      ],
    },
    logoText: 'ARC',
    logoIcon: '⚡',
    description: 'A data-driven fitness app with minimal design and high-energy branding',
  },
];

export function getMockBrand(description: string): BrandIdentity {
  const id = Math.random().toString(36).substring(2, 10);
  return {
    id,
    brandName: 'Lumina',
    tagline: 'Light the way forward.',
    colors: {
      primary: '#4F46E5',
      secondary: '#10B981',
      accent: '#F59E0B',
      background: '#09090B',
      text: '#FAFAFA',
      muted: '#71717A',
    },
    typography: {
      heading: {
        family: 'Space Grotesk',
        weight: 700,
        style: 'Modern geometric sans with distinctive character',
      },
      body: {
        family: 'Inter',
        weight: 400,
        style: 'Crystal-clear readability across all sizes',
      },
    },
    voice: {
      adjectives: ['Innovative', 'Clear', 'Confident', 'Approachable', 'Forward-thinking'],
      doSay: [
        'Simple tools for complex problems.',
        'Built for what\'s next.',
        'Less noise, more signal.',
      ],
      dontSay: [
        'We leverage cutting-edge AI solutions.',
        'Paradigm-shifting technology.',
        'Disruptive innovation at scale.',
      ],
    },
    logoText: 'lumina',
    logoIcon: '✦',
    description,
  };
}
