'use client';

import { BrandIdentity } from '@/lib/types';

export default function SocialPreview({ brand }: { brand: BrandIdentity }) {
  return (
    <div className="max-w-sm mx-auto">
      {/* Instagram-style post mockup */}
      <div className="rounded-2xl overflow-hidden border border-white/10">
        {/* Post header */}
        <div className="flex items-center gap-3 px-4 py-3 bg-[#111]">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
            style={{
              backgroundColor: brand.colors.primary,
              color: '#fff',
            }}
          >
            {brand.brandName.charAt(0)}
          </div>
          <div>
            <p className="text-[13px] font-semibold text-white">
              {brand.brandName.toLowerCase().replace(/\s/g, '')}
            </p>
          </div>
        </div>

        {/* Post image */}
        <div
          className="aspect-square flex flex-col items-center justify-center p-8 text-center"
          style={{ backgroundColor: brand.colors.primary }}
        >
          <span className="text-5xl mb-4">{brand.logoIcon}</span>
          <p
            className="text-[32px] font-bold leading-tight mb-3"
            style={{
              fontFamily: `"${brand.typography.heading.family}", sans-serif`,
              color: '#fff',
            }}
          >
            {brand.tagline}
          </p>
          <p
            className="text-[14px] opacity-80"
            style={{
              fontFamily: `"${brand.typography.body.family}", sans-serif`,
              color: '#fff',
            }}
          >
            {brand.brandName}
          </p>
        </div>

        {/* Post footer */}
        <div className="px-4 py-3 bg-[#111]">
          <div className="flex gap-4 mb-2">
            <span className="text-white text-lg">♡</span>
            <span className="text-white text-lg">💬</span>
            <span className="text-white text-lg">↗</span>
          </div>
          <p className="text-[13px] text-[#86868B]">
            <span className="font-semibold text-white">
              {brand.brandName.toLowerCase().replace(/\s/g, '')}
            </span>{' '}
            {brand.tagline} {brand.voice.adjectives.map(a => `#${a.toLowerCase()}`).join(' ')}
          </p>
        </div>
      </div>

      <p className="text-center text-[12px] text-[#555] mt-4">
        Instagram post preview
      </p>
    </div>
  );
}
