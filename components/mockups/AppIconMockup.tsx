'use client';

import { BrandIdentity } from '@/lib/types';

export default function AppIconMockup({ brand }: { brand: BrandIdentity }) {
  const initial = brand.brandName.charAt(0).toUpperCase();

  return (
    <div className="flex flex-col items-center gap-6">
      {/* App icon grid — shows the icon at different sizes/contexts */}
      <div className="flex items-end gap-6 sm:gap-8">
        {/* Large icon */}
        <div className="flex flex-col items-center gap-2">
          <div
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-[22px] sm:rounded-[26px] flex items-center justify-center shadow-2xl relative overflow-hidden"
            style={{
              background: `linear-gradient(145deg, ${brand.colors.primary}, ${brand.colors.secondary})`,
            }}
          >
            {/* Glossy overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" style={{ height: '50%' }} />
            <span
              className="text-[44px] sm:text-[52px] font-bold text-white relative z-10"
              style={{ fontFamily: `"${brand.typography.heading.family}", sans-serif` }}
            >
              {initial}
            </span>
          </div>
          <p className="text-[11px] text-[var(--text-quaternary)]">App Store</p>
        </div>

        {/* Medium icon */}
        <div className="flex flex-col items-center gap-2">
          <div
            className="w-16 h-16 rounded-[14px] flex items-center justify-center shadow-lg relative overflow-hidden"
            style={{
              background: `linear-gradient(145deg, ${brand.colors.primary}, ${brand.colors.secondary})`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" style={{ height: '50%' }} />
            <span
              className="text-[28px] font-bold text-white relative z-10"
              style={{ fontFamily: `"${brand.typography.heading.family}", sans-serif` }}
            >
              {initial}
            </span>
          </div>
          <p className="text-[11px] text-[var(--text-quaternary)]">Home Screen</p>
        </div>

        {/* Small icon */}
        <div className="flex flex-col items-center gap-2">
          <div
            className="w-10 h-10 rounded-[8px] flex items-center justify-center shadow relative overflow-hidden"
            style={{
              background: `linear-gradient(145deg, ${brand.colors.primary}, ${brand.colors.secondary})`,
            }}
          >
            <span
              className="text-[18px] font-bold text-white"
              style={{ fontFamily: `"${brand.typography.heading.family}", sans-serif` }}
            >
              {initial}
            </span>
          </div>
          <p className="text-[11px] text-[var(--text-quaternary)]">Notification</p>
        </div>

        {/* Favicon */}
        <div className="flex flex-col items-center gap-2">
          <div
            className="w-8 h-8 rounded-md flex items-center justify-center relative overflow-hidden"
            style={{
              background: `linear-gradient(145deg, ${brand.colors.primary}, ${brand.colors.secondary})`,
            }}
          >
            <span
              className="text-[14px] font-bold text-white"
              style={{ fontFamily: `"${brand.typography.heading.family}", sans-serif` }}
            >
              {initial}
            </span>
          </div>
          <p className="text-[11px] text-[var(--text-quaternary)]">Favicon</p>
        </div>
      </div>
    </div>
  );
}
