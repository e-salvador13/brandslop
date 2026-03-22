import { NextRequest, NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

const HF_TOKEN = (() => {
  try {
    return readFileSync(join(process.env.HOME || '', '.huggingface', 'token'), 'utf-8').trim();
  } catch {
    return process.env.HF_TOKEN || '';
  }
})();

const HF_MODEL = 'https://router.huggingface.co/hf-inference/models/black-forest-labs/FLUX.1-schnell';

async function generateSingleLogo(prompt: string): Promise<string> {
  const response = await fetch(HF_MODEL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${HF_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ inputs: prompt }),
    signal: AbortSignal.timeout(120000),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`HuggingFace API error ${response.status}: ${errText}`);
  }

  const imageBuffer = await response.arrayBuffer();
  const base64 = Buffer.from(imageBuffer).toString('base64');
  return `data:image/jpeg;base64,${base64}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { brandName, industry, style, colorMood, description } = body;

    if (!brandName) {
      return NextResponse.json({ error: 'Brand name is required' }, { status: 400 });
    }

    if (!HF_TOKEN) {
      return NextResponse.json({ error: 'No HuggingFace token configured' }, { status: 500 });
    }

    const industryStr = industry || 'modern';
    const styleStr = style || 'minimalist';
    const colorStr = colorMood || 'professional';
    const descStr = description ? `, brand concept: ${description}` : '';

    const baseContext = `for "${brandName}" ${industryStr} brand${descStr}, ${styleStr} style, ${colorStr} color aesthetic`;

    const prompts = [
      // Variation 1: Minimalist/geometric icon
      `minimal flat geometric logo icon ${baseContext}, simple clean geometric shape, single icon mark, professional brand identity, vector flat design, centered on solid black background, no text no letters no words no typography`,

      // Variation 2: Abstract/creative mark  
      `abstract creative logo mark ${baseContext}, unique abstract shape, artistic flowing form, creative brand symbol, modern art style, centered on solid black background, no text no letters no words no typography`,

      // Variation 3: Lettermark/monogram
      `elegant lettermark monogram logo "${brandName.charAt(0).toUpperCase()}" ${baseContext}, single letter design, stylized typography mark, sophisticated initial, centered on solid black background, single letter only`,

      // Variation 4: Symbol/icon-based
      `bold symbolic logo icon ${baseContext}, meaningful symbol mark, iconic brand emblem, distinctive pictorial mark, vector style, centered on solid black background, no text no letters no words no typography`,
    ];

    // Fire all 4 in parallel
    const results = await Promise.allSettled(
      prompts.map((prompt) => generateSingleLogo(prompt))
    );

    const logos: (string | null)[] = results.map((r) =>
      r.status === 'fulfilled' ? r.value : null
    );

    // At least one must succeed
    const successCount = logos.filter(Boolean).length;
    if (successCount === 0) {
      return NextResponse.json(
        { error: 'Failed to generate any logos. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ logos });
  } catch (error) {
    console.error('Logo generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate logos. Please try again.' },
      { status: 500 }
    );
  }
}
