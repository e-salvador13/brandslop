import { BrandIdentity } from './types';
import { getMockBrand } from './mockBrand';

const SYSTEM_PROMPT = `You are an elite brand identity designer. Given a brand description, generate a complete, coherent brand identity. Return ONLY valid JSON with no additional text.

The JSON must follow this exact structure:
{
  "brandName": "A short, memorable brand name (1-2 words)",
  "tagline": "A punchy tagline (under 8 words)",
  "colors": {
    "primary": "#hex (the main brand color)",
    "secondary": "#hex (supporting color)",
    "accent": "#hex (highlight/CTA color)",
    "background": "#hex (dark, near-black)",
    "text": "#hex (light, near-white)",
    "muted": "#hex (subdued gray)"
  },
  "typography": {
    "heading": {
      "family": "A Google Font name (must be real and available on Google Fonts)",
      "weight": 700,
      "style": "Brief description of why this font works"
    },
    "body": {
      "family": "A Google Font name (must be real and available on Google Fonts)",
      "weight": 400,
      "style": "Brief description of why this font works"
    }
  },
  "voice": {
    "adjectives": ["5 brand personality adjectives"],
    "doSay": ["3 example phrases the brand WOULD say"],
    "dontSay": ["3 example phrases the brand would NEVER say"]
  },
  "logoText": "The brand name styled for a text logo (lowercase, uppercase, or mixed)",
  "logoIcon": "A single emoji or unicode symbol that represents the brand"
}

Rules:
- Colors must work together harmoniously
- Background should be very dark (#0A-#15 range)
- Text should be very light (#E0-#FF range)
- Typography fonts must be REAL Google Fonts
- Brand name should be unique and memorable
- Everything should feel cohesive`;

export async function generateBrand(
  description: string,
  referenceUrl?: string
): Promise<BrandIdentity> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    console.log('No OPENAI_API_KEY found, using mock data');
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return getMockBrand(description);
  }

  const userPrompt = referenceUrl
    ? `Brand description: ${description}\n\nReference URL for inspiration: ${referenceUrl}`
    : `Brand description: ${description}`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.8,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;

    // Parse JSON from response (handle potential markdown code blocks)
    const jsonStr = content.replace(/```json?\n?/g, '').replace(/```/g, '').trim();
    const brand = JSON.parse(jsonStr);

    const id = Math.random().toString(36).substring(2, 10);

    return {
      id,
      ...brand,
      description,
    } as BrandIdentity;
  } catch (error) {
    console.error('Error generating brand:', error);
    // Fallback to mock
    return getMockBrand(description);
  }
}
