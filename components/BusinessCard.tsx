'use client';

import { BrandIdentity } from '@/lib/types';

export default function BusinessCard({ brand }: { brand: BrandIdentity }) {
  const handle = brand.brandName.toLowerCase().replace(/\s/g, '');

  return (
    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
      {/* Front */}
      <div
        className="w-full sm:w-[360px] aspect-[1.75/1] rounded-[var(--radius-md)] p-8 flex flex-col justify-between relative overflow-hidden"
        style={{ backgroundColor: brand.colors.primary }}
      >
        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 80% 20%, ${brand.colors.secondary}, transparent 50%)`
        }} />
        <div className="relative z-10 flex items-center gap-3">
          <span
            className="text-[20px] font-bold"
            style={{
              fontFamily: `"${brand.typography.heading.family}", sans-serif`,
              color: '#fff',
            }}
          >
            {brand.logoText}
          </span>
        </div>
        <div className="relative z-10">
          <p
            className="text-[13px] text-white/80"
            style={{
              fontFamily: `"${brand.typography.body.family}", sans-serif`,
            }}
          >
            {brand.tagline}
          </p>
        </div>
      </div>

      {/* Back */}
      <div className="w-full sm:w-[360px] aspect-[1.75/1] rounded-[var(--radius-md)] p-8 flex flex-col justify-between bg-white border border-[rgba(0,0,0,0.06)]">
        <div>
          <p
            className="text-[15px] font-bold"
            style={{
              fontFamily: `"${brand.typography.heading.family}", sans-serif`,
              color: brand.colors.background,
            }}
          >
            Jane Smith
          </p>
          <p
            className="text-[12px] mt-0.5"
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
            className="text-[11px]"
            style={{
              fontFamily: `"${brand.typography.body.family}", sans-serif`,
              color: brand.colors.muted,
            }}
          >
            jane@{handle}.com
          </p>
          <p
            className="text-[11px]"
            style={{
              fontFamily: `"${brand.typography.body.family}", sans-serif`,
              color: brand.colors.muted,
            }}
          >
            {handle}.com
          </p>
        </div>
      </div>
    </div>
  );
}
