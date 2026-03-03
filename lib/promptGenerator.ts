// Generates AI-ready prompts from brand/aesthetic data

export interface Color {
  name: string;
  hex: string;
  usage?: string;
  opacity?: number;
}

export interface Brand {
  id: string;
  name: string;
  category: string;
  
  // Trust signals
  lastVerified?: string;  // ISO date string, e.g. "2024-03-02"
  methodology?: string;   // e.g. "Official design docs", "Live site inspection", "Brand guidelines PDF"
  
  // Quality indicator
  depth?: 'full' | 'colors-only';  // 'full' = 13 sections, 'colors-only' = scraped palette only
  
  colors: {
    primary: Color[];
    neutral?: Color[];
    secondary?: Color[];
    darkMode?: Color[];  // Full dark mode palette
  };
  typography: {
    headings: string;
    body: string;
    mono?: string;
    accent?: string;
    googleFonts?: string;
    fallback?: string;
    scale?: {
      hero?: string;
      h1?: string;
      h2?: string;
      h3?: string;
      body?: string;
      small?: string;
      caption?: string;
    };
  };
  designPrinciples: string[];
  mood: string[];
  
  // Extended fields for full design systems
  colorUsage?: Record<string, string>;      // When/where each color appears
  spacing?: Record<string, string>;          // Base unit, padding values, max-widths
  components?: Record<string, string>;       // UI patterns with dimensions
  elevation?: Record<string, string>;        // Shadow scale levels
  motion?: Record<string, string>;           // Duration, easing, animations
  layout?: Record<string, string>;           // Grid system, max-widths
  responsive?: Record<string, string>;       // Breakpoints and changes
  iconStyle?: Record<string, string>;        // Size, weight, style
  interactiveStates?: Record<string, string>; // Hover, focus, active, disabled
  mediaPatterns?: Record<string, string>;    // Aspect ratios, grids, avatars
  copyVoice?: Record<string, string>;        // Tone, examples, what to avoid
}

export interface Aesthetic {
  id: string;
  name: string;
  colors: Color[];
  typography: {
    style: string;
    suggestions: string[];
  };
  elements: string[];
  mood: string[];
}

export function generateBrandPrompt(brand: Brand): string {
  const primaryColors = brand.colors.primary
    .map(c => `${c.name} (${c.hex})`)
    .join(', ');
  
  const neutralColors = brand.colors.neutral
    ?.map(c => `${c.hex}`)
    .join(', ') || '';

  const principles = brand.designPrinciples.slice(0, 3).join('. ');
  const moodWords = brand.mood.join(', ');

  return `Use ${brand.name} brand aesthetic:

**Colors:**
- Primary: ${primaryColors}
- Neutrals: ${neutralColors}
- Max 3 colors per component

**Typography:**
- Headings: ${brand.typography.headings}
- Body: ${brand.typography.body}
${brand.typography.googleFonts ? `- Google Fonts: ${brand.typography.googleFonts}` : ''}

**Design Principles:**
${principles}

**Mood:** ${moodWords}`;
}

export function generateAestheticPrompt(aesthetic: Aesthetic): string {
  const colors = aesthetic.colors
    .map(c => `${c.name} (${c.hex})`)
    .join(', ');
  
  const elements = aesthetic.elements.join(', ');
  const moodWords = aesthetic.mood.join(', ');
  const fonts = aesthetic.typography.suggestions.join(' or ');

  return `Use ${aesthetic.name} aesthetic:

**Color Palette:**
${colors}

**Typography:** ${aesthetic.typography.style}
Suggested fonts: ${fonts}

**Design Elements:**
${elements}

**Mood:** ${moodWords}`;
}

// Compact version for quick copy
export function generateCompactPrompt(brand: Brand): string {
  const colors = brand.colors.primary.slice(0, 3).map(c => c.hex).join(', ');
  return `${brand.name} style: colors ${colors}, ${brand.typography.headings} font, ${brand.mood.slice(0, 3).join('/')} vibe`;
}

// CSS variables output
export function generateCSSVariables(brand: Brand): string {
  let css = `:root {\n`;
  
  brand.colors.primary.forEach((c, i) => {
    const varName = c.name.toLowerCase().replace(/\s+/g, '-');
    css += `  --color-primary-${i + 1}: ${c.hex}; /* ${c.name} */\n`;
  });
  
  brand.colors.neutral?.forEach((c, i) => {
    css += `  --color-neutral-${i + 1}: ${c.hex}; /* ${c.name} */\n`;
  });
  
  css += `}\n`;
  return css;
}

// Tailwind config output
export function generateTailwindConfig(brand: Brand): string {
  const colors: Record<string, string> = {};
  
  brand.colors.primary.forEach((c, i) => {
    colors[`primary-${i + 1}`] = c.hex;
  });
  
  brand.colors.neutral?.forEach((c, i) => {
    colors[`neutral-${i + 1}`] = c.hex;
  });

  return `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: ${JSON.stringify(colors, null, 8)}
    }
  }
}`;
}
