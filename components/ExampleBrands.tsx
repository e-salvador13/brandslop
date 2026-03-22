'use client';

import { useRouter } from 'next/navigation';
import { exampleBrands } from '@/lib/mockBrand';

const logoImages: Record<string, string> = {
  'example-fintech': '/logos/velta.png',
  'example-coffee': '/logos/kindling.png',
  'example-fitness': '/logos/arc.png',
};

const brandCategories: Record<string, string> = {
  'example-fintech': 'Fintech',
  'example-coffee': 'Coffee',
  'example-fitness': 'Fitness',
};

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
          className="glass-card group text-left overflow-hidden hover:border-[#00D4AA]/20 transition-all duration-300"
        >
          {/* Logo area */}
          <div className="relative h-44 flex items-center justify-center bg-black/30 border-b border-[var(--border-subtle)] overflow-hidden">
            <div
              className="absolute inset-0 opacity-[0.06] transition-opacity duration-500 group-hover:opacity-[0.12]"
              style={{
                background: `radial-gradient(circle at center, ${brand.colors.primary} 0%, transparent 70%)`,
              }}
            />
            <div className="relative z-10 transition-transform duration-500 group-hover:scale-105">
              {logoImages[brand.id] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={logoImages[brand.id]}
                  alt={`${brand.brandName} logo`}
                  className="w-24 h-24 object-contain rounded-lg"
                />
              ) : (
                <span
                  className="text-[48px] font-bold"
                  style={{
                    background: `linear-gradient(135deg, ${brand.colors.primary}, ${brand.colors.secondary})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {brand.brandName.charAt(0)}
                </span>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="p-6">
            <div className="flex items-center gap-2 mb-1.5">
              <p className="text-[18px] font-bold tracking-[-0.02em] text-[var(--text-primary)]">
                {brand.brandName}
              </p>
              <span className="text-[11px] font-medium text-[var(--text-muted)] tracking-[0.05em] uppercase px-2 py-0.5 rounded-full border border-[var(--border-subtle)]">
                {brandCategories[brand.id]}
              </span>
            </div>

            {/* Color dots */}
            <div className="flex gap-2 mt-4">
              {[brand.colors.primary, brand.colors.secondary, brand.colors.accent, brand.colors.background].map(
                (c, i) => (
                  <div
                    key={i}
                    className="w-5 h-5 rounded-full border border-[var(--border-subtle)]"
                    style={{ backgroundColor: c }}
                  />
                )
              )}
            </div>

            <p className="text-[13px] text-[var(--text-muted)] mt-5 group-hover:text-[#00D4AA] transition-colors duration-300 flex items-center gap-1.5">
              View Example
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}
