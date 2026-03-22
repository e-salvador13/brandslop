'use client';

import { useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import WizardProgress from '@/components/wizard/WizardProgress';
import StepBrandName from '@/components/wizard/StepBrandName';
import StepIndustry from '@/components/wizard/StepIndustry';
import StepStyle from '@/components/wizard/StepStyle';
import StepColorMood from '@/components/wizard/StepColorMood';
import StepDescription from '@/components/wizard/StepDescription';
import GeneratingState from '@/components/GeneratingState';
import { WizardData, INDUSTRIES } from '@/lib/types';

function CreateWizardInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [step, setStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [data, setData] = useState<WizardData>({
    brandName: '',
    industry: searchParams.get('industry') || '',
    style: '',
    colorMood: '',
    description: '',
  });

  const updateField = useCallback((field: keyof WizardData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const nextStep = useCallback(() => setStep((s) => Math.min(s + 1, 4)), []);
  const prevStep = useCallback(() => {
    if (step === 0) {
      router.push('/');
    } else {
      setStep((s) => Math.max(s - 1, 0));
    }
  }, [step, router]);

  async function handleGenerate() {
    setIsGenerating(true);

    try {
      const industryLabel = INDUSTRIES.find((i) => i.id === data.industry)?.label || data.industry;

      // Build description for brand identity generation
      const fullDescription = [
        `Industry: ${industryLabel}`,
        `Style: ${data.style}`,
        `Color mood: ${data.colorMood}`,
        data.description ? `Additional: ${data.description}` : '',
      ]
        .filter(Boolean)
        .join('. ');

      // Fire brand identity + logos in parallel
      const [brandRes, logosRes] = await Promise.all([
        fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            brandName: data.brandName.trim(),
            description: fullDescription,
          }),
        }),
        fetch('/api/generate-logos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            brandName: data.brandName.trim(),
            industry: industryLabel,
            style: data.style,
            colorMood: data.colorMood,
            description: data.description,
          }),
        }),
      ]);

      if (!brandRes.ok) {
        throw new Error('Brand generation failed');
      }

      const brand = await brandRes.json();
      const logosData = logosRes.ok ? await logosRes.json() : { logos: [] };

      // Merge logos into brand
      brand.logoUrls = (logosData.logos || []).filter(Boolean);
      if (brand.logoUrls.length > 0) {
        brand.logoUrl = brand.logoUrls[0];
      }

      // Store in session
      sessionStorage.setItem(`brand-${brand.id}`, JSON.stringify(brand));

      // Navigate to results
      router.push(`/brand/${brand.id}`);
    } catch (error) {
      console.error('Generation failed:', error);
      setIsGenerating(false);
      alert('Something went wrong. Please try again.');
    }
  }

  if (isGenerating) {
    return <GeneratingState />;
  }

  return (
    <main className="min-h-screen bg-[#08080A]">
      {/* Top nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#08080A]/80 backdrop-blur-xl border-b border-[var(--border-subtle)]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center justify-between py-3">
            <button
              onClick={() => router.push('/')}
              className="text-[13px] text-[var(--text-quaternary)] hover:text-[var(--text-secondary)] transition-colors font-medium"
            >
              ← BrandSlop
            </button>
            <span className="text-[12px] text-[var(--text-muted)]">
              {data.brandName || 'New Brand'}
            </span>
          </div>
          <WizardProgress currentStep={step} />
        </div>
      </nav>

      {/* Step content */}
      <div className="pt-32">
        <div
          className="transition-all duration-500 ease-out"
          style={{
            opacity: 1,
            transform: 'translateY(0)',
          }}
        >
          {step === 0 && (
            <StepBrandName
              value={data.brandName}
              onChange={(v) => updateField('brandName', v)}
              onNext={nextStep}
            />
          )}
          {step === 1 && (
            <StepIndustry
              value={data.industry}
              onChange={(v) => updateField('industry', v)}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}
          {step === 2 && (
            <StepStyle
              value={data.style}
              onChange={(v) => updateField('style', v)}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}
          {step === 3 && (
            <StepColorMood
              value={data.colorMood}
              onChange={(v) => updateField('colorMood', v)}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}
          {step === 4 && (
            <StepDescription
              value={data.description}
              onChange={(v) => updateField('description', v)}
              onGenerate={handleGenerate}
              onBack={prevStep}
              isGenerating={isGenerating}
            />
          )}
        </div>
      </div>
    </main>
  );
}

export default function CreatePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#08080A]" />}>
      <CreateWizardInner />
    </Suspense>
  );
}
