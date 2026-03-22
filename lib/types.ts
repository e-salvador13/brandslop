export interface BrandColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  muted: string;
}

export interface BrandTypography {
  heading: {
    family: string;
    weight: number;
    style: string;
  };
  body: {
    family: string;
    weight: number;
    style: string;
  };
}

export interface BrandVoice {
  adjectives: string[];
  doSay: string[];
  dontSay: string[];
}

export interface BrandIdentity {
  id: string;
  brandName: string;
  tagline: string;
  colors: BrandColors;
  typography: BrandTypography;
  voice: BrandVoice;
  logoText: string;
  logoIcon: string;
  logoUrl?: string;
  logoUrls?: string[];
  description: string;
}

export interface WizardData {
  brandName: string;
  industry: string;
  style: string;
  colorMood: string;
  description: string;
}

export const INDUSTRIES = [
  { id: 'technology', label: 'Technology', icon: '💻' },
  { id: 'finance', label: 'Finance', icon: '💰' },
  { id: 'food-drink', label: 'Food & Drink', icon: '🍽️' },
  { id: 'health-fitness', label: 'Health & Fitness', icon: '💪' },
  { id: 'fashion', label: 'Fashion', icon: '👗' },
  { id: 'education', label: 'Education', icon: '📚' },
  { id: 'real-estate', label: 'Real Estate', icon: '🏠' },
  { id: 'creative-design', label: 'Creative / Design', icon: '🎨' },
  { id: 'ecommerce', label: 'E-commerce', icon: '🛒' },
  { id: 'other', label: 'Other', icon: '✨' },
] as const;

export const STYLES = [
  { id: 'minimalist', label: 'Minimalist', icon: '◯', desc: 'Clean lines, simple shapes' },
  { id: 'bold-modern', label: 'Bold / Modern', icon: '◆', desc: 'Strong, contemporary feel' },
  { id: 'playful', label: 'Playful', icon: '★', desc: 'Fun, friendly, approachable' },
  { id: 'elegant-luxury', label: 'Elegant / Luxury', icon: '♕', desc: 'Refined, premium aesthetic' },
  { id: 'abstract', label: 'Abstract', icon: '◈', desc: 'Creative, unique forms' },
  { id: 'vintage', label: 'Vintage', icon: '❋', desc: 'Classic, timeless charm' },
] as const;

export const COLOR_MOODS = [
  {
    id: 'cool-professional',
    label: 'Cool & Professional',
    colors: ['#1E40AF', '#3B82F6', '#64748B', '#E2E8F0'],
  },
  {
    id: 'warm-energetic',
    label: 'Warm & Energetic',
    colors: ['#DC2626', '#F97316', '#FBBF24', '#FEF3C7'],
  },
  {
    id: 'natural-organic',
    label: 'Natural & Organic',
    colors: ['#166534', '#22C55E', '#A3E635', '#F0FDF4'],
  },
  {
    id: 'bold-vibrant',
    label: 'Bold & Vibrant',
    colors: ['#7C3AED', '#EC4899', '#06B6D4', '#F0ABFC'],
  },
  {
    id: 'dark-premium',
    label: 'Dark & Premium',
    colors: ['#1C1917', '#D4AF37', '#44403C', '#292524'],
  },
  {
    id: 'clean-minimal',
    label: 'Clean & Minimal',
    colors: ['#F8FAFC', '#CBD5E1', '#0F172A', '#6366F1'],
  },
] as const;
