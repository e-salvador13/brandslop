'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoadingState from './LoadingState';

export default function BrandInput() {
  const [description, setDescription] = useState('');
  const [showUrl, setShowUrl] = useState(false);
  const [referenceUrl, setReferenceUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleGenerate() {
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
          description: description.trim(),
          referenceUrl: referenceUrl.trim() || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Generation failed.');
      }

      const brand = await res.json();

      // Store brand data in sessionStorage for the result page
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
    <div className="w-full max-w-2xl mx-auto animate-fade-in-delay-2">
      {/* Main text area */}
      <div className="glow-border rounded-2xl">
        <textarea
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            if (error) setError('');
          }}
          placeholder="A modern fintech for Gen Z that feels like Cash App meets Notion..."
          className="w-full bg-[#111113] text-[#f5f5f7] rounded-2xl px-6 py-5 text-[17px] leading-relaxed placeholder:text-[#555] resize-none focus:outline-none min-h-[140px] transition-colors"
          rows={4}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.metaKey) {
              handleGenerate();
            }
          }}
        />
      </div>

      {/* URL input toggle */}
      <div className="mt-4">
        {!showUrl ? (
          <button
            onClick={() => setShowUrl(true)}
            className="text-[14px] text-[#86868B] hover:text-[#f5f5f7] transition-colors duration-300"
          >
            Or drop a URL for inspiration →
          </button>
        ) : (
          <div className="animate-fade-in">
            <input
              type="url"
              value={referenceUrl}
              onChange={(e) => setReferenceUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full bg-[#111113] text-[#f5f5f7] rounded-xl px-5 py-3 text-[15px] placeholder:text-[#444] focus:outline-none border border-[#222] focus:border-[#444] transition-colors"
            />
          </div>
        )}
      </div>

      {/* Error */}
      {error && (
        <p className="mt-4 text-[14px] text-red-400 animate-fade-in">{error}</p>
      )}

      {/* Generate button */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={handleGenerate}
          disabled={description.trim().length < 5}
          className="group relative px-8 py-3.5 rounded-full text-[17px] font-medium text-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
          style={{
            background:
              'linear-gradient(135deg, #4F46E5 0%, #6366F1 50%, #818CF8 100%)',
          }}
        >
          <span className="relative z-10">Generate Brand</span>
          <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: 'linear-gradient(135deg, #5B52F0 0%, #7175F5 50%, #8D96FA 100%)',
            }}
          />
        </button>
      </div>

      <p className="mt-4 text-center text-[12px] text-[#555]">
        ⌘ + Enter to generate
      </p>
    </div>
  );
}
