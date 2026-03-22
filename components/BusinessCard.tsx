'use client';

import { BrandIdentity } from '@/lib/types';

export default function BusinessCard({ brand }: { brand: BrandIdentity }) {
  return (
    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
      {/* Front */}
      <div
        className="w-full sm:w-[360px] aspect-[1.75/1] rounded-xl p-8 flex flex-col justify-between shadow-2xl"
        style={{ backgroundColor: brand.colors.primary }}
      >
        <div className="flex items-center gap-2">
          <span className="text-xl">{brand.logoIcon}</span>
          <p
            className="text-[18px] font-bold text-white"
            style={{
              fontFamily: `"${brand.typography.heading.family}", sans-serif`,
            }}
          >
            {brand.logoText}
          </p>
        </div>
        <div>
          <p
            className="text-[14px] text-white/90"
            style={{
              fontFamily: `"${brand.typography.body.family}", sans-serif`,
            }}
          >
            {brand.tagline}
          </p>
        </div>
      </div>

      {/* Back */}
      <div className="w-full sm:w-[360px] aspect-[1.75/1] rounded-xl p-8 flex flex-col justify-between bg-white shadow-2xl">
        <div>
          <p
            className="text-[16px] font-bold"
            style={{
              fontFamily: `"${brand.typography.heading.family}", sans-serif`,
              color: brand.colors.background,
            }}
          >
            Jane Smith
          </p>
          <p
            className="text-[13px] mt-0.5"
            style={{
              fontFamily: `"${brand.typography.body.family}", sans-serif`,
              color: brand.colors.muted,
            }}
          >
            Head of Design
          </p>
        </div>
        <div className="space-y-1">
          <p
            className="text-[12px]"
            style={{
              fontFamily: `"${brand.typography.body.family}", sans-serif`,
              color: brand.colors.muted,
            }}
          >
            jane@{brand.brandName.toLowerCase().replace(/\s/g, '')}.com
          </p>
          <p
            className="text-[12px]"
            style={{
              fontFamily: `"${brand.typography.body.family}", sans-serif`,
              color: brand.colors.muted,
            }}
          >
            {brand.brandName.toLowerCase().replace(/\s/g, '')}.com
          </p>
        </div>
      </div>
    </div>
  );
}
