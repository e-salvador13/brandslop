'use client';

import { BrandTypography } from '@/lib/types';

export default function TypographyPreview({
  typography,
}: {
  typography: BrandTypography;
}) {
  return (
    <div className="grid md:grid-cols-2 gap-12 md:gap-16">
      {/* Heading font */}
      <div>
        <p className="text-[12px] uppercase tracking-[0.1em] text-[#86868B] mb-4">
          Heading
        </p>
        <p
          className="text-[42px] sm:text-[56px] leading-[1.05] tracking-tight mb-4"
          style={{
            fontFamily: `"${typography.heading.family}", sans-serif`,
            fontWeight: typography.heading.weight,
          }}
        >
          The quick
          <br />
          brown fox
        </p>
        <div className="space-y-1 mt-6">
          <p className="text-[15px] text-[#f5f5f7] font-medium">
            {typography.heading.family}
          </p>
          <p className="text-[13px] text-[#86868B]">
            Weight: {typography.heading.weight}
          </p>
          <p className="text-[13px] text-[#86868B]">
            {typography.heading.style}
          </p>
        </div>
      </div>

      {/* Body font */}
      <div>
        <p className="text-[12px] uppercase tracking-[0.1em] text-[#86868B] mb-4">
          Body
        </p>
        <p
          className="text-[17px] leading-[1.47] text-[#ccc] mb-4"
          style={{
            fontFamily: `"${typography.body.family}", sans-serif`,
            fontWeight: typography.body.weight,
          }}
        >
          The quick brown fox jumps over the lazy dog. Pack my box with five
          dozen liquor jugs. How vexingly quick daft zebras jump.
        </p>
        <div className="space-y-1 mt-6">
          <p className="text-[15px] text-[#f5f5f7] font-medium">
            {typography.body.family}
          </p>
          <p className="text-[13px] text-[#86868B]">
            Weight: {typography.body.weight}
          </p>
          <p className="text-[13px] text-[#86868B]">
            {typography.body.style}
          </p>
        </div>
      </div>
    </div>
  );
}
