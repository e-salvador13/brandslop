'use client';

const STEPS = ['Name', 'Industry', 'Style', 'Colors', 'Details'];

export default function WizardProgress({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center justify-center gap-2 py-6">
      {STEPS.map((label, i) => {
        const isActive = i === currentStep;
        const isCompleted = i < currentStep;

        return (
          <div key={label} className="flex items-center gap-2">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`w-2 h-2 rounded-full transition-all duration-500 ${
                  isActive
                    ? 'bg-[#00D4AA] scale-125 shadow-[0_0_8px_rgba(0,212,170,0.5)]'
                    : isCompleted
                    ? 'bg-[#00D4AA]/60'
                    : 'bg-[var(--text-muted)]'
                }`}
              />
              <span
                className={`text-[10px] tracking-wide uppercase transition-colors duration-300 ${
                  isActive
                    ? 'text-[#00D4AA]'
                    : isCompleted
                    ? 'text-[var(--text-quaternary)]'
                    : 'text-[var(--text-muted)]'
                }`}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`w-8 sm:w-12 h-px mb-5 transition-colors duration-500 ${
                  isCompleted ? 'bg-[#00D4AA]/40' : 'bg-[var(--border-subtle)]'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
