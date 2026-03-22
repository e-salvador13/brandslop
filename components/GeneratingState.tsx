'use client';

import { useEffect, useState } from 'react';

const stages = [
  { text: 'Crafting your brand identity...', icon: '✦' },
  { text: 'Generating logo variations...', icon: '◆' },
  { text: 'Building color palette...', icon: '◯' },
  { text: 'Selecting typography...', icon: 'Aa' },
  { text: 'Defining brand voice...', icon: '✎' },
  { text: 'Assembling your brand kit...', icon: '★' },
];

export default function GeneratingState() {
  const [currentStage, setCurrentStage] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const stageInterval = setInterval(() => {
      setCurrentStage((prev) => {
        if (prev < stages.length - 1) return prev + 1;
        return prev;
      });
    }, 3000);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 92) return prev;
        return prev + Math.random() * 3;
      });
    }, 200);

    return () => {
      clearInterval(stageInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-[#08080A] flex flex-col items-center justify-center px-6">
      {/* Animated logo mark */}
      <div className="relative w-24 h-24 mb-12">
        <div className="absolute inset-0 rounded-full border border-[#00D4AA]/20 animate-[spin_4s_linear_infinite]" />
        <div className="absolute inset-3 rounded-full border border-[#00D4AA]/30 animate-[spin_3s_linear_infinite_reverse]" />
        <div className="absolute inset-6 rounded-full border border-[#00D4AA]/40 animate-[spin_2s_linear_infinite]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-[#00D4AA] shadow-[0_0_20px_rgba(0,212,170,0.6)] animate-pulse" />
        </div>
      </div>

      {/* Stage text with crossfade */}
      <div className="text-center min-h-[60px]">
        <div className="flex items-center justify-center gap-3 mb-2">
          <span className="text-[18px] text-[#00D4AA] opacity-60">{stages[currentStage].icon}</span>
          <p className="text-[20px] font-semibold text-[var(--text-primary)] tracking-[-0.02em]">
            {stages[currentStage].text}
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-xs mt-10">
        <div className="h-[2px] bg-[var(--border-subtle)] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300 ease-out"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #00D4AA, #00D4AA80)',
            }}
          />
        </div>
        <p className="text-[12px] text-[var(--text-muted)] text-center mt-3">
          This usually takes 15–30 seconds
        </p>
      </div>

      {/* Stage dots */}
      <div className="mt-8 flex gap-2">
        {stages.map((_, i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full transition-all duration-500"
            style={{
              backgroundColor: i <= currentStage ? '#00D4AA' : 'var(--text-muted)',
              transform: i === currentStage ? 'scale(1.5)' : 'scale(1)',
            }}
          />
        ))}
      </div>
    </div>
  );
}
