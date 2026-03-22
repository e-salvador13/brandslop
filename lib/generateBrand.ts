import { BrandIdentity } from './types';
import { getMockBrand } from './mockBrand';

const SYSTEM_PROMPT = `You are an elite brand identity designer. The user will provide their brand name and description. Generate a complete, coherent brand identity for THEIR brand. Return ONLY valid JSON with no additional text.

The JSON must follow this exact structure:
{
  "brandName": "USE THE EXACT BRAND NAME THE USER PROVIDED — do NOT invent a new one",
  "tagline": "A punchy tagline (under 8 words) that fits their brand",
  "industry": "The brand's industry/category in 1-2 words (e.g. Fintech, Coffee, Fitness, SaaS)",
  "colors": {
    "primary": "#hex (the main brand color — must match the brand's industry and vibe)",
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

CRITICAL RULES:
- USE THE BRAND NAME THE USER GIVES YOU. Do NOT rename it or invent a new name.
- Colors must work together harmoniously and be appropriate for the industry
- Background should be very dark (#0A-#15 range)
- Text should be very light (#E0-#FF range)
- Typography fonts must be REAL Google Fonts
- Everything should feel cohesive and industry-appropriate`;

export async function generateBrand(
  brandName: string,
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

  let userPrompt = `Brand name: ${brandName}\nBrand description: ${description}`;
  if (referenceUrl) {
    userPrompt += `\n\nReference URL for inspiration: ${referenceUrl}`;
  }

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
