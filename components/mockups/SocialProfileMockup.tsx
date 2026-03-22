'use client';

import { BrandIdentity } from '@/lib/types';

export default function SocialProfileMockup({ brand }: { brand: BrandIdentity }) {
  const handle = brand.brandName.toLowerCase().replace(/\s/g, '');
  const initial = brand.brandName.charAt(0).toUpperCase();

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Twitter/X-style profile card */}
      <div className="mockup-frame">
        {/* Header/banner */}
        <div
          className="h-28 sm:h-32 relative"
          style={{
            background: `linear-gradient(135deg, ${brand.colors.primary}, ${brand.colors.secondary})`,
          }}
        >
          {/* Pattern overlay */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `radial-gradient(circle at 30% 70%, ${brand.colors.accent}, transparent 50%)`,
          }} />
          {/* Tagline on banner */}
          <div className="absolute inset-0 flex items-center justify-center">
            <p
              className="text-[20px] sm:text-[24px] font-bold text-white/90 text-center px-6"
              style={{ fontFamily: `"${brand.typography.heading.family}", sans-serif` }}
            >
              {brand.tagline}
            </p>
          </div>
        </div>

        {/* Profile area */}
        <div className="relative px-5 pb-5">
          {/* Avatar — overlapping banner */}
          <div className="flex items-end -mt-10 mb-4">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center text-[28px] font-bold text-white border-4"
              style={{
                background: `linear-gradient(135deg, ${brand.colors.primary}, ${brand.colors.secondary})`,
                borderColor: '#08080A',
              }}
            >
              {initial}
            </div>
          </div>

          {/* Name & handle */}
          <div className="mb-3">
            <p
              className="text-[18px] font-bold text-[var(--text-primary)]"
              style={{ fontFamily: `"${brand.typography.heading.family}", sans-serif` }}
            >
              {brand.brandName}
            </p>
            <p className="text-[14px] text-[var(--text-quaternary)]">
              @{handle}
            </p>
          </div>

          {/* Bio */}
          <p
            className="text-[14px] text-[var(--text-secondary)] mb-4 leading-relaxed"
            style={{ fontFamily: `"${brand.typography.body.family}", sans-serif` }}
          >
            {brand.tagline} •{' '}
            {brand.voice.adjectives.slice(0, 3).map(a => `#${a.toLowerCase()}`).join(' ')}
          </p>

          {/* Stats row */}
          <div className="flex gap-6 text-[13px]">
            <span><strong className="text-[var(--text-primary)]">1,247</strong> <span className="text-[var(--text-quaternary)]">Following</span></span>
            <span><strong className="text-[var(--text-primary)]">8.4K</strong> <span className="text-[var(--text-quaternary)]">Followers</span></span>
          </div>
        </div>
      </div>
    </div>
  );
}
