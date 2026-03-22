'use client';

import { useState, useEffect, useRef } from 'react';

interface Props {
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
}

export default function StepBrandName({ value, onChange, onNext }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6">
      <div className="w-full max-w-xl mx-auto text-center">
        <h2 className="text-[32px] sm:text-[44px] font-bold tracking-[-0.03em] text-[var(--text-primary)] mb-3 animate-in animate-in-1">
          What&apos;s your brand called?
        </h2>
        <p className="text-[15px] text-[var(--text-tertiary)] mb-12 animate-in animate-in-2">
          Enter the name you want for your brand
        </p>

        <div className="animate-in animate-in-3">
          <div
            className={`relative rounded-2xl transition-all duration-500 ${
              isFocused ? 'shadow-[0_0_40px_rgba(0,212,170,0.08)]' : ''
            }`}
          >
            <input
              ref={inputRef}
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && value.trim()) onNext();
              }}
              placeholder="e.g. Velta, Kindling, ARC..."
              className="w-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] focus:border-[#00D4AA]/40 rounded-2xl px-8 py-6 text-[24px] sm:text-[32px] font-bold tracking-[-0.02em] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none transition-all duration-300 text-center"
            />
          </div>
        </div>

        <div className="mt-10 animate-in animate-in-4">
          <button
            onClick={onNext}
            disabled={!value.trim()}
            className="px-10 py-4 rounded-full bg-[#00D4AA] text-[#08080A] text-[16px] font-semibold hover:bg-[#00E4BA] disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,212,170,0.3)] active:scale-[0.97]"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
