import { NextRequest, NextResponse } from 'next/server';
import { generateBrand } from '@/lib/generateBrand';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { brandName, description, referenceUrl } = body;

    if (!brandName || typeof brandName !== 'string' || brandName.trim().length < 1) {
      return NextResponse.json(
        { error: 'Please provide a brand name.' },
        { status: 400 }
      );
    }

    if (!description || typeof description !== 'string' || description.trim().length < 5) {
      return NextResponse.json(
        { error: 'Please provide a brand description (at least 5 characters).' },
        { status: 400 }
      );
    }

    const brand = await generateBrand(brandName.trim(), description.trim(), referenceUrl?.trim());

    return NextResponse.json(brand);
  } catch (error) {
    console.error('Generation error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
