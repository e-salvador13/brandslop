'use client';

import { useState, useRef, useEffect } from 'react';

interface Props {
  value: string;
  onChange: (value: string) => void;
  onGenerate: () => void;
  onBack: () => void;
  isGenerating: boolean;
}

export default function StepDescription({ value, onChange, onGenerate, onBack, isGenerating }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      textareaRef.current?.focus();
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6">
      <div className="w-full max-w-xl mx-auto text-center">
        <h2 className="text-[32px] sm:text-[44px] font-bold tracking-[-0.03em] text-[var(--text-primary)] mb-3 animate-in animate-in-1">
          Anything else?
        </h2>
        <p className="text-[15px] text-[var(--text-tertiary)] mb-10 animate-in animate-in-2">
          Optional — describe your brand vision, target audience, or vibe
        </p>

        <div className="animate-in animate-in-3">
          <div
            className={`relative rounded-2xl transition-all duration-500 ${
              isFocused ? 'shadow-[0_0_40px_rgba(0,212,170,0.08)]' : ''
            }`}
          >
            <textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="e.g. A modern fintech for Gen Z that feels like Cash App meets Notion..."
              rows={4}
              className="w-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] focus:border-[#00D4AA]/40 rounded-2xl px-6 py-5 text-[16px] leading-relaxed text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none transition-all duration-300 resize-none"
            />
          </div>
        </div>

        <div className="mt-10 flex items-center justify-center gap-4 animate-in animate-in-4">
          <button
            onClick={onBack}
            className="px-6 py-3 rounded-full text-[14px] text-[var(--text-quaternary)] hover:text-[var(--text-secondary)] transition-colors"
          >
            ← Back
          </button>
          <button
            onClick={onGenerate}
            disabled={isGenerating}
            className="px-10 py-4 rounded-full bg-[#00D4AA] text-[#08080A] text-[16px] font-semibold hover:bg-[#00E4BA] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,212,170,0.3)] active:scale-[0.97]"
          >
            {isGenerating ? 'Generating...' : 'Generate Brand →'}
          </button>
        </div>
      </div>
    </div>
  );
}
