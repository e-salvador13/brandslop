'use client';

import { useRouter } from 'next/navigation';
import { exampleBrands } from '@/lib/mockBrand';

/* ═══ SVG Lettermarks ═══ */
function VeltaLettermark() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="velta-grad" x1="10" y1="8" x2="46" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6C5CE7" />
          <stop offset="100%" stopColor="#00CEC9" />
        </linearGradient>
      </defs>
      <path
        d="M10 12L28 44L46 12"
        stroke="url(#velta-grad)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Subtle inner line for depth */}
      <path
        d="M16 16L28 38L40 16"
        stroke="url(#velta-grad)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.3"
      />
    </svg>
  );
}

function KindlingLettermark() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="kindling-grad" x1="14" y1="8" x2="42" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#C8956C" />
          <stop offset="100%" stopColor="#E8D5C0" />
        </linearGradient>
      </defs>
      {/* K stem */}
      <path
        d="M16 10L16 46"
        stroke="url(#kindling-grad)"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      {/* K upper arm with flame-inspired curve */}
      <path
        d="M16 28C24 28 30 20 32 14C34 10 38 8 40 10"
        stroke="url(#kindling-grad)"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      {/* K lower arm */}
      <path
        d="M16 28C24 28 32 36 38 46"
        stroke="url(#kindling-grad)"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      {/* Flame flicker accent */}
      <circle cx="40" cy="10" r="2" fill="#C8956C" opacity="0.5" />
    </svg>
  );
}

function ArcLettermark() {
  return (
    <svg width="80" height="56" viewBox="0 0 80 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="arc-grad" x1="0" y1="28" x2="80" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E8F54A" />
          <stop offset="100%" stopColor="#B8E600" />
        </linearGradient>
      </defs>
      {/* Sweeping arc line above */}
      <path
        d="M8 14C8 14 28 2 72 14"
        stroke="url(#arc-grad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* A */}
      <path
        d="M8 46L18 20L28 46M12 38H24"
        stroke="url(#arc-grad)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* R */}
      <path
        d="M34 46V20H44C48 20 50 23 50 26C50 29 48 32 44 32H34L48 46"
        stroke="url(#arc-grad)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* C */}
      <path
        d="M72 24C70 21 66 20 62 20C56 20 52 24 52 33C52 42 56 46 62 46C66 46 70 45 72 42"
        stroke="url(#arc-grad)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

const lettermarks: Record<string, React.ReactNode> = {
  'example-fintech': <VeltaLettermark />,
  'example-coffee': <KindlingLettermark />,
  'example-fitness': <ArcLettermark />,
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
          className="glass-card group text-left overflow-hidden"
        >
          {/* Lettermark area */}
          <div className="relative h-44 flex items-center justify-center bg-[rgba(255,255,255,0.015)] border-b border-[var(--border-subtle)] overflow-hidden">
            {/* Subtle brand-colored ambient glow */}
            <div
              className="absolute inset-0 opacity-[0.06] transition-opacity duration-500 group-hover:opacity-[0.12]"
              style={{
                background: `radial-gradient(circle at center, ${brand.colors.primary} 0%, transparent 70%)`,
              }}
            />
            <div className="relative z-10 transition-transform duration-500 group-hover:scale-105">
              {lettermarks[brand.id]}
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
              {[
                brand.colors.primary,
                brand.colors.secondary,
                brand.colors.accent,
                brand.colors.background,
              ].map((c, i) => (
                <div
                  key={i}
                  className="w-5 h-5 rounded-full border border-[var(--border-subtle)]"
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>

            <p className="text-[13px] text-[var(--text-muted)] mt-5 group-hover:text-[var(--text-secondary)] transition-colors duration-[var(--duration)] flex items-center gap-1.5">
              View Kit
              <span className="inline-block transition-transform duration-[var(--duration)] group-hover:translate-x-1">→</span>
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}
