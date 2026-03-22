'use client';

import { useRouter } from 'next/navigation';
import { exampleBrands } from '@/lib/mockBrand';

export default function ExampleBrands() {
  const router = useRouter();

  function handleClick(id: string) {
    const brand = exampleBrands.find((b) => b.id === id);
    if (brand) {
      sessionStorage.setItem(`brand-${id}`, JSON.stringify(brand));
      router.push(`/brand/${id}`);
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {exampleBrands.map((brand) => (
        <button
          key={brand.id}
          onClick={() => handleClick(brand.id)}
          className="group text-left rounded-2xl overflow-hidden border border-[#1a1a1a] hover:border-[#333] transition-all duration-500 hover:scale-[1.02]"
        >
          {/* Color bar */}
          <div
            className="h-32 flex items-center justify-center"
            style={{ backgroundColor: brand.colors.primary }}
          >
            <span className="text-4xl">{brand.logoIcon}</span>
          </div>

          {/* Info */}
          <div className="p-6 bg-[#0a0a0a]">
            <p
              className="text-[20px] font-semibold tracking-tight mb-1"
              style={{
                fontFamily: `"${brand.typography.heading.family}", sans-serif`,
              }}
            >
              {brand.brandName}
            </p>
            <p className="text-[14px] text-[#86868B] mb-3">
              {brand.tagline}
            </p>
            <p className="text-[13px] text-[#555] leading-relaxed">
              {brand.description}
            </p>

            {/* Color dots */}
            <div className="flex gap-2 mt-4">
              {[
                brand.colors.primary,
                brand.colors.secondary,
                brand.colors.accent,
              ].map((c, i) => (
                <div
                  key={i}
                  className="w-4 h-4 rounded-full border border-white/10"
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>

            <p className="text-[12px] text-[#444] mt-4 group-hover:text-[#86868B] transition-colors">
              View full brand kit →
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}
