'use client';

import { BrandIdentity } from '@/lib/types';

export default function BusinessCardMockup({ brand }: { brand: BrandIdentity }) {
  const handle = brand.brandName.toLowerCase().replace(/\s/g, '');
  const initial = brand.brandName.charAt(0).toUpperCase();

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
      {/* Front */}
      <div
        className="w-full sm:w-[340px] aspect-[1.75/1] rounded-xl relative overflow-hidden shadow-2xl"
        style={{ backgroundColor: brand.colors.primary }}
      >
        {/* Subtle gradient overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 80% 20%, ${brand.colors.secondary}, transparent 50%)`,
          }}
        />
        <div className="relative z-10 h-full p-7 flex flex-col justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center text-[14px] font-bold"
              style={{
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(10px)',
                color: '#fff',
              }}
            >
              {initial}
            </div>
            <span
              className="text-[16px] font-bold text-white"
              style={{ fontFamily: `"${brand.typography.heading.family}", sans-serif` }}
            >
              {brand.logoText}
            </span>
          </div>
          <div>
            <p className="text-[12px] text-white/60" style={{ fontFamily: `"${brand.typography.body.family}", sans-serif` }}>
              {brand.tagline}
            </p>
          </div>
        </div>
      </div>

      {/* Back */}
      <div className="w-full sm:w-[340px] aspect-[1.75/1] rounded-xl bg-white shadow-2xl p-7 flex flex-col justify-between">
        <div>
          <p
            className="text-[14px] font-bold"
            style={{
              fontFamily: `"${brand.typography.heading.family}", sans-serif`,
              color: brand.colors.background || '#111',
            }}
          >
            Jane Smith
          </p>
          <p
            className="text-[11px] mt-0.5"
            style={{
              fontFamily: `"${brand.typography.body.family}", sans-serif`,
              color: brand.colors.muted || '#999',
            }}
          >
            Head of Design
          </p>
        </div>
        <div className="space-y-0.5">
          <p className="text-[10px]" style={{ fontFamily: `"${brand.typography.body.family}", sans-serif`, color: brand.colors.muted || '#999' }}>
            jane@{handle}.com
          </p>
          <p className="text-[10px]" style={{ fontFamily: `"${brand.typography.body.family}", sans-serif`, color: brand.colors.muted || '#999' }}>
            {handle}.com
          </p>
        </div>
      </div>
    </div>
  );
}
