'use client';

import { useState, useEffect } from 'react';
import { BrandIdentity } from '@/lib/types';

function LogoShimmer() {
  return (
    <div className="relative w-full aspect-square max-w-[280px] rounded-[var(--radius-lg)] overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(110deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.06) 40%, rgba(255,255,255,0.02) 60%)',
          backgroundSize: '200% 100%',
          animation: 'logoShimmer 1.8s ease-in-out infinite',
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div
            className="w-8 h-8 mx-auto mb-3 rounded-full border-2 border-t-transparent"
            style={{
              borderColor: 'var(--text-muted)',
              borderTopColor: 'transparent',
              animation: 'spin 1s linear infinite',
            }}
          />
          <p className="text-[11px] text-[var(--text-muted)] tracking-wide uppercase">
            Generating logo
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LogoPreview({ brand }: { brand: BrandIdentity }) {
  const initial = brand.brandName.charAt(0).toUpperCase();
  const [logoUrl, setLogoUrl] = useState<string | null>(brand.logoUrl || null);
  const [loading, setLoading] = useState(!brand.logoUrl);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (brand.logoUrl) {
      setLogoUrl(brand.logoUrl);
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function fetchLogo() {
      try {
        setLoading(true);
        setError(false);

        const res = await fetch('/api/generate-logo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            brandName: brand.brandName,
            description: brand.description,
            colors: brand.colors,
            style: brand.voice?.adjectives?.slice(0, 3).join(', ') || 'modern',
          }),
        });

        if (!res.ok) throw new Error('Failed to generate logo');

        const data = await res.json();
        if (!cancelled && data.logoUrl) {
          setLogoUrl(data.logoUrl);
          // Persist to sessionStorage so it survives page navigations
          const id = brand.id;
          const stored = sessionStorage.getItem(`brand-${id}`);
          if (stored) {
            const parsed = JSON.parse(stored);
            parsed.logoUrl = data.logoUrl;
            sessionStorage.setItem(`brand-${id}`, JSON.stringify(parsed));
          }
        }
      } catch (err) {
        console.error('Logo fetch error:', err);
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchLogo();
    return () => { cancelled = true; };
  }, [brand.id, brand.brandName, brand.description, brand.colors, brand.voice, brand.logoUrl]);

  return (
    <div className="space-y-8">
      {/* AI Generated Logo — Hero */}
      <div
        className="glass-card p-10 flex flex-col items-center justify-center gap-5 min-h-[320px] relative overflow-hidden"
        style={{ background: brand.colors.background }}
      >
        {/* Ambient glow */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            background: `radial-gradient(circle at center, ${brand.colors.primary} 0%, transparent 70%)`,
          }}
        />

        <div className="relative z-10 flex flex-col items-center gap-5">
          {loading ? (
            <LogoShimmer />
          ) : logoUrl ? (
            <div className="relative w-full max-w-[280px] aspect-square">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logoUrl}
                alt={`${brand.brandName} logo`}
                className="w-full h-full object-contain rounded-[var(--radius-lg)]"
              />
            </div>
          ) : (
            /* Fallback: gradient lettermark */
            <span
              className="text-[80px] font-bold leading-none"
              style={{
                fontFamily: `"${brand.typography.heading.family}", sans-serif`,
                background: `linear-gradient(135deg, ${brand.colors.primary}, ${brand.colors.secondary})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {initial}
            </span>
          )}

          {error && (
            <button
              onClick={() => {
                setError(false);
                setLoading(true);
                setLogoUrl(null);
                // Re-trigger by toggling state — the useEffect depends on logoUrl
                fetch('/api/generate-logo', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    brandName: brand.brandName,
                    description: brand.description,
                    colors: brand.colors,
                    style: brand.voice?.adjectives?.slice(0, 3).join(', ') || 'modern',
                  }),
                })
                  .then((r) => r.json())
                  .then((data) => {
                    if (data.logoUrl) setLogoUrl(data.logoUrl);
                    setLoading(false);
                  })
                  .catch(() => {
                    setError(true);
                    setLoading(false);
                  });
              }}
              className="text-[12px] text-[var(--accent)] hover:underline underline-offset-4 transition-all"
            >
              Retry logo generation
            </button>
          )}

          <span className="text-[11px] text-[var(--text-muted)] tracking-wide uppercase">
            {loading ? '' : logoUrl ? 'AI Generated Logo' : 'Logo Mark'}
          </span>
        </div>
      </div>

      {/* Wordmark variants */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Dark variant — wordmark */}
        <div
          className="glass-card p-10 flex flex-col items-center justify-center gap-5 min-h-[220px]"
          style={{ background: `${brand.colors.background}` }}
        >
          <p
            className="text-[32px] tracking-[-0.02em]"
            style={{
              fontFamily: `"${brand.typography.heading.family}", sans-serif`,
              fontWeight: brand.typography.heading.weight,
              color: brand.colors.text,
            }}
          >
            {brand.logoText}
          </p>
          <span className="text-[11px] text-[var(--text-muted)] tracking-wide uppercase">
            Dark
          </span>
        </div>

        {/* Light variant — wordmark */}
        <div className="rounded-[var(--radius-lg)] p-10 flex flex-col items-center justify-center gap-5 min-h-[220px] bg-white border border-[rgba(0,0,0,0.06)]">
          <p
            className="text-[32px] tracking-[-0.02em]"
            style={{
              fontFamily: `"${brand.typography.heading.family}", sans-serif`,
              fontWeight: brand.typography.heading.weight,
              color: brand.colors.background,
            }}
          >
            {brand.logoText}
          </p>
          <span className="text-[11px] text-[#999] tracking-wide uppercase">
            Light
          </span>
        </div>

        {/* Icon mark — lettermark with gradient */}
        <div className="glass-card p-10 flex flex-col items-center justify-center gap-5 min-h-[220px] overflow-hidden relative">
          {/* Ambient brand color glow */}
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              background: `radial-gradient(circle at center, ${brand.colors.primary} 0%, transparent 70%)`,
            }}
          />
          <div className="relative z-10 flex flex-col items-center gap-5">
            <span
              className="text-[56px] font-bold leading-none"
              style={{
                fontFamily: `"${brand.typography.heading.family}", sans-serif`,
                background: `linear-gradient(135deg, ${brand.colors.primary}, ${brand.colors.secondary})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {initial}
            </span>
            <span className="text-[11px] text-[var(--text-muted)] tracking-wide uppercase">
              Mark
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
