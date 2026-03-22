'use client';

import { INDUSTRIES } from '@/lib/types';

interface Props {
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepIndustry({ value, onChange, onNext, onBack }: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6">
      <div className="w-full max-w-2xl mx-auto text-center">
        <h2 className="text-[32px] sm:text-[44px] font-bold tracking-[-0.03em] text-[var(--text-primary)] mb-3 animate-in animate-in-1">
          What industry are you in?
        </h2>
        <p className="text-[15px] text-[var(--text-tertiary)] mb-10 animate-in animate-in-2">
          This helps us tailor your brand identity
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 animate-in animate-in-3">
          {INDUSTRIES.map((industry) => {
            const isSelected = value === industry.id;
            return (
              <button
                key={industry.id}
                onClick={() => {
                  onChange(industry.id);
                  setTimeout(onNext, 300);
                }}
                className={`group relative flex flex-col items-center gap-2.5 px-4 py-5 rounded-2xl border transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] ${
                  isSelected
                    ? 'bg-[#00D4AA]/10 border-[#00D4AA]/40 shadow-[0_0_20px_rgba(0,212,170,0.1)]'
                    : 'bg-[var(--bg-elevated)] border-[var(--border-subtle)] hover:border-[var(--border-hover)] hover:bg-[var(--bg-elevated-hover)]'
                }`}
              >
                <span className="text-[28px]">{industry.icon}</span>
                <span
                  className={`text-[13px] font-medium transition-colors ${
                    isSelected ? 'text-[#00D4AA]' : 'text-[var(--text-secondary)]'
                  }`}
                >
                  {industry.label}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-10 flex items-center justify-center gap-4 animate-in animate-in-4">
          <button
            onClick={onBack}
            className="px-6 py-3 rounded-full text-[14px] text-[var(--text-quaternary)] hover:text-[var(--text-secondary)] transition-colors"
          >
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
}
