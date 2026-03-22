'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoadingState from './LoadingState';

export default function BrandInput() {
  const [brandName, setBrandName] = useState('');
  const [description, setDescription] = useState('');
  const [showUrl, setShowUrl] = useState(false);
  const [referenceUrl, setReferenceUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleGenerate() {
    if (!brandName.trim()) {
      setError('Give your brand a name.');
      return;
    }
    if (description.trim().length < 5) {
      setError('Tell us a bit more about your brand idea.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brandName: brandName.trim(),
          description: description.trim(),
          referenceUrl: referenceUrl.trim() || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Generation failed.');
      }

      const brand = await res.json();
      sessionStorage.setItem(`brand-${brand.id}`, JSON.stringify(brand));
      router.push(`/brand/${brand.id}`);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Try again.');
      setLoading(false);
    }
  }

  if (loading) {
    return <LoadingState />;
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Spotlight container */}
      <div className="relative rounded-[var(--radius-xl)] p-[1px] gradient-border">
        <div className="relative rounded-[var(--radius-xl)] bg-[var(--bg-spotlight)] overflow-hidden">
          <input
            type="text"
            value={brandName}
            onChange={(e) => {
              setBrandName(e.target.value);
              if (error) setError('');
            }}
            placeholder="Brand name"
            className="w-full bg-transparent text-[var(--text-primary)] px-6 pt-5 pb-3 text-[22px] sm:text-[24px] font-bold tracking-[-0.02em] placeholder:text-[var(--text-quaternary)] focus:outline-none border-b border-[var(--border-subtle)]"
          />
          <textarea
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              if (error) setError('');
            }}
            placeholder="AI personal finance assistant that helps you track spending and grow wealth..."
            className="w-full bg-transparent text-[var(--text-primary)] px-6 py-4 text-[16px] sm:text-[17px] leading-relaxed placeholder:text-[var(--text-quaternary)] resize-none focus:outline-none min-h-[120px]"
            rows={3}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.metaKey) {
                handleGenerate();
              }
            }}
          />

          {/* URL toggle — inline at bottom of textarea area */}
          <div className="px-6 pb-5">
            {!showUrl ? (
              <button
                onClick={() => setShowUrl(true)}
                className="text-[13px] text-[var(--text-quaternary)] hover:text-[var(--text-secondary)] transition-colors duration-[var(--duration)]"
              >
                + Add a reference URL
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <input
                  type="url"
                  value={referenceUrl}
                  onChange={(e) => setReferenceUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="flex-1 bg-transparent text-[var(--text-primary)] text-[14px] placeholder:text-[var(--text-muted)] focus:outline-none border-b border-[var(--border-subtle)] focus:border-[var(--border-hover)] pb-1 transition-colors duration-[var(--duration)]"
                />
                <button
                  onClick={() => {
                    setShowUrl(false);
                    setReferenceUrl('');
                  }}
                  className="text-[12px] text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <p className="mt-4 text-[14px] text-red-400/80 animate-in animate-in-1">{error}</p>
      )}

      {/* Generate button */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={handleGenerate}
          disabled={!brandName.trim() || description.trim().length < 5}
          className="shimmer-btn group relative px-8 py-3.5 rounded-[var(--radius-full)] text-[15px] font-semibold text-white disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:bg-[var(--accent)]"
        >
          <span className="relative z-10 flex items-center gap-3">
            Generate Brand
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/10 text-[11px] font-medium text-white/60">
              ⌘ Enter
            </span>
          </span>
        </button>
      </div>
    </div>
  );
}
