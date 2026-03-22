'use client';

import { useRouter } from 'next/navigation';
import { INDUSTRIES } from '@/lib/types';

export default function IndustryCategories() {
  const router = useRouter();

  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-[12px] uppercase tracking-[0.2em] text-[var(--text-quaternary)] mb-4">
            Industries
          </p>
          <h2 className="text-[28px] sm:text-[36px] font-bold tracking-[-0.03em] text-[var(--text-primary)]">
            Brands for every industry
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {INDUSTRIES.map((ind) => (
            <button
              key={ind.id}
              onClick={() => router.push(`/create?industry=${ind.id}`)}
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[14px] text-[var(--text-secondary)] hover:border-[#00D4AA]/30 hover:text-[#00D4AA] hover:bg-[#00D4AA]/5 transition-all duration-300"
            >
              <span>{ind.icon}</span>
              <span>{ind.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
