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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { brandName, description, colors, style } = body;

    if (!brandName) {
      return NextResponse.json(
        { error: 'Brand name is required' },
        { status: 400 }
      );
    }

    if (!HF_TOKEN) {
      return NextResponse.json(
        { error: 'No HuggingFace token configured' },
        { status: 500 }
      );
    }

    const styleHint = style || 'modern professional';
    const descContext = description
      ? `, brand concept: ${description}`
      : '';

    const prompt = `minimal flat vector logo symbol for ${brandName}${descContext}, ${styleHint}, geometric icon mark only, clean simple design on solid black background, professional brand identity, vector style, no text no letters no words no typography`;

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
    const dataUrl = `data:image/jpeg;base64,${base64}`;

    return NextResponse.json({ logoUrl: dataUrl });
  } catch (error) {
    console.error('Logo generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate logo. Please try again.' },
      { status: 500 }
    );
  }
}
