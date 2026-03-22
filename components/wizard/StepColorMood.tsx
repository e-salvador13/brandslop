'use client';

import { COLOR_MOODS } from '@/lib/types';

interface Props {
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepColorMood({ value, onChange, onNext, onBack }: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6">
      <div className="w-full max-w-2xl mx-auto text-center">
        <h2 className="text-[32px] sm:text-[44px] font-bold tracking-[-0.03em] text-[var(--text-primary)] mb-3 animate-in animate-in-1">
          Pick a color direction
        </h2>
        <p className="text-[15px] text-[var(--text-tertiary)] mb-10 animate-in animate-in-2">
          We&apos;ll build your palette around this mood
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 animate-in animate-in-3">
          {COLOR_MOODS.map((mood) => {
            const isSelected = value === mood.id;
            return (
              <button
                key={mood.id}
                onClick={() => {
                  onChange(mood.id);
                  setTimeout(onNext, 300);
                }}
                className={`group relative flex flex-col items-center gap-4 px-5 py-6 rounded-2xl border transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] ${
                  isSelected
                    ? 'bg-[#00D4AA]/10 border-[#00D4AA]/40 shadow-[0_0_20px_rgba(0,212,170,0.1)]'
                    : 'bg-[var(--bg-elevated)] border-[var(--border-subtle)] hover:border-[var(--border-hover)] hover:bg-[var(--bg-elevated-hover)]'
                }`}
              >
                {/* Color swatches */}
                <div className="flex gap-1.5">
                  {mood.colors.map((color, j) => (
                    <div
                      key={j}
                      className="w-8 h-8 rounded-lg border border-white/5 transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <span
                  className={`text-[13px] font-medium transition-colors ${
                    isSelected ? 'text-[#00D4AA]' : 'text-[var(--text-secondary)]'
                  }`}
                >
                  {mood.label}
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
