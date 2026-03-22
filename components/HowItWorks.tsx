'use client';

const steps = [
  {
    number: '01',
    title: 'Describe',
    description: 'Tell us your vision in plain English',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Generate',
    description: 'AI creates a complete, coherent brand system',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Own it',
    description: 'Download production-ready assets for $19',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <div>
      <div className="text-center mb-16">
        <p className="text-[12px] uppercase tracking-[0.2em] text-[var(--text-quaternary)] mb-4">
          How it works
        </p>
        <h2 className="text-[28px] sm:text-[40px] font-bold tracking-[-0.03em] text-[var(--text-primary)]">
          Three steps to your brand
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {steps.map((step) => (
          <div
            key={step.number}
            className="glass-card p-8 sm:p-10 group cursor-default"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[var(--accent)] opacity-70">
                {step.icon}
              </span>
              <span className="text-[12px] font-medium text-[var(--text-muted)] tracking-[0.1em]">
                {step.number}
              </span>
            </div>
            <h3 className="text-[22px] sm:text-[24px] font-bold tracking-[-0.02em] text-[var(--text-primary)] mb-3">
              {step.title}
            </h3>
            <p className="text-[15px] leading-relaxed text-[var(--text-secondary)]">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
