'use client';

import { useEffect, useState } from 'react';

const stages = [
  'Understanding your vision',
  'Crafting color palette',
  'Selecting typography',
  'Defining brand voice',
  'Assembling your brand',
];

export default function LoadingState() {
  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStage((prev) => {
        if (prev < stages.length - 1) return prev + 1;
        return prev;
      });
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center py-20 animate-in animate-in-1">
      {/* Minimal orbital animation */}
      <div className="relative w-16 h-16 mb-12">
        <div
          className="absolute inset-0 rounded-full border border-[var(--border-hover)]"
          style={{ animation: 'spin 3s linear infinite' }}
        />
        <div
          className="absolute inset-2 rounded-full border border-[var(--border-active)]"
          style={{ animation: 'spin 2s linear infinite reverse' }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-[var(--accent)]" />
        </div>
      </div>

      {/* Stage text */}
      <div className="text-center">
        <p className="text-[18px] font-semibold text-[var(--text-primary)] tracking-[-0.02em] mb-3">
          {stages[currentStage]}
        </p>
        <div className="flex gap-1 justify-center">
          <span className="loading-dot text-[var(--text-secondary)] text-2xl">.</span>
          <span className="loading-dot text-[var(--text-secondary)] text-2xl">.</span>
          <span className="loading-dot text-[var(--text-secondary)] text-2xl">.</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full mt-12 h-[2px] bg-[var(--border-subtle)] rounded-full overflow-hidden">
        <div className="progress-bar h-full rounded-full" style={{ background: `linear-gradient(90deg, var(--accent), rgba(139, 92, 246, 0.4))` }} />
      </div>

      {/* Stage indicators */}
      <div className="mt-8 flex gap-2">
        {stages.map((_, i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full transition-colors duration-500"
            style={{
              backgroundColor: i <= currentStage ? 'var(--accent)' : 'var(--text-muted)',
            }}
          />
        ))}
      </div>
    </div>
  );
}
