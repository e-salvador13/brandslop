'use client';

import { BrandIdentity } from '@/lib/types';

export default function LogoPreview({ brand }: { brand: BrandIdentity }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {/* Dark background */}
      <div
        className="rounded-2xl p-10 flex flex-col items-center justify-center gap-4 min-h-[200px] border border-white/5"
        style={{ backgroundColor: brand.colors.background }}
      >
        <span className="text-3xl">{brand.logoIcon}</span>
        <p
          className="text-[28px] tracking-tight"
          style={{
            fontFamily: `"${brand.typography.heading.family}", sans-serif`,
            fontWeight: brand.typography.heading.weight,
            color: brand.colors.text,
          }}
        >
          {brand.logoText}
        </p>
        <span className="text-[11px] text-[#86868B] mt-2">Dark variant</span>
      </div>

      {/* Light background */}
      <div className="rounded-2xl p-10 flex flex-col items-center justify-center gap-4 min-h-[200px] bg-white">
        <span className="text-3xl">{brand.logoIcon}</span>
        <p
          className="text-[28px] tracking-tight"
          style={{
            fontFamily: `"${brand.typography.heading.family}", sans-serif`,
            fontWeight: brand.typography.heading.weight,
            color: brand.colors.background,
          }}
        >
          {brand.logoText}
        </p>
        <span className="text-[11px] text-[#999] mt-2">Light variant</span>
      </div>

      {/* Icon only */}
      <div
        className="rounded-2xl p-10 flex flex-col items-center justify-center gap-4 min-h-[200px]"
        style={{ backgroundColor: brand.colors.primary }}
      >
        <span className="text-5xl">{brand.logoIcon}</span>
        <p
          className="text-[36px] font-bold"
          style={{
            fontFamily: `"${brand.typography.heading.family}", sans-serif`,
            color: '#fff',
          }}
        >
          {brand.brandName.charAt(0).toUpperCase()}
        </p>
        <span className="text-[11px] text-white/60 mt-2">Icon mark</span>
      </div>
    </div>
  );
}
