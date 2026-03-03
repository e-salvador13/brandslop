'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import brandsData from '../../data/brands.json';

const DEMO_PROMPTS = [
  { label: 'Hero section', prompt: 'Create a hero section with a headline, subheadline, CTA button, and a background pattern. Include proper spacing and typography hierarchy.' },
  { label: 'Pricing card', prompt: 'Create a pricing card with a plan name, price, list of features, and a signup button. Include hover states and proper visual hierarchy.' },
  { label: 'Login form', prompt: 'Create a login form with email and password inputs, a submit button, forgot password link, and social login options.' },
  { label: 'Dashboard sidebar', prompt: 'Create a dashboard sidebar with navigation links, icons, user avatar section, and a collapsible menu structure.' },
];

const OLLAMA_URL = 'http://localhost:11434/api/generate';

export default function PlaygroundPage() {
  const [isDark, setIsDark] = useState(false);
  const [selectedBrandId, setSelectedBrandId] = useState<string>('');
  const [prompt, setPrompt] = useState('');
  const [genericOutput, setGenericOutput] = useState('');
  const [brandedOutput, setBrandedOutput] = useState('');
  const [isLoadingGeneric, setIsLoadingGeneric] = useState(false);
  const [isLoadingBranded, setIsLoadingBranded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ollamaStatus, setOllamaStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking');
  
  const genericIframeRef = useRef<HTMLIFrameElement>(null);
  const brandedIframeRef = useRef<HTMLIFrameElement>(null);

  // Check if brand has full design system
  const hasFullSystem = (brand: any) => {
    return brand.designPrinciples?.length > 0 || brand.spacing || brand.motion || brand.components || brand.elevation;
  };

  // Get only full system brands for the dropdown
  const fullSystemBrands = useMemo(() => {
    return brandsData.brands.filter((brand: any) => hasFullSystem(brand));
  }, []);

  const selectedBrand = useMemo(() => {
    return fullSystemBrands.find((b: any) => b.id === selectedBrandId);
  }, [selectedBrandId, fullSystemBrands]);

  // Check Ollama connection on mount
  useEffect(() => {
    checkOllamaConnection();
    // Check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const checkOllamaConnection = async () => {
    setOllamaStatus('checking');
    try {
      const response = await fetch('http://localhost:11434/api/tags');
      if (response.ok) {
        setOllamaStatus('connected');
      } else {
        setOllamaStatus('disconnected');
      }
    } catch {
      setOllamaStatus('disconnected');
    }
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const generatePrompt = (brand: any): string => {
    let result = `# ${brand.name} Design System\n\n`;
    
    // Colors
    const colors = brand.colors.primary.map((c: any) => `${c.name}: ${c.hex}`).join(', ');
    const neutrals = brand.colors.neutral?.map((c: any) => `${c.name}: ${c.hex}`).join(', ') || '';
    result += `## Colors\n- Primary: ${colors}\n`;
    if (neutrals) result += `- Neutrals: ${neutrals}\n`;
    if (brand.colorUsage) result += `- Usage: ${brand.colorUsage}\n`;
    
    // Typography
    result += `\n## Typography\n`;
    result += `- Headings: ${brand.typography.headings}\n`;
    result += `- Body: ${brand.typography.body}\n`;
    if (brand.typographyScale) result += `- Scale: ${brand.typographyScale}\n`;
    
    // All other sections
    if (brand.spacing) result += `\n## Spacing\n${brand.spacing}\n`;
    if (brand.components) result += `\n## Component Patterns\n${brand.components}\n`;
    if (brand.motion) result += `\n## Motion & Animation\n${brand.motion}\n`;
    if (brand.layout) result += `\n## Layout & Grid\n${brand.layout}\n`;
    if (brand.iconStyle) result += `\n## Icons\n${brand.iconStyle}\n`;
    if (brand.interactiveStates) result += `\n## Interactive States\n${brand.interactiveStates}\n`;
    if (brand.copyVoice) result += `\n## Copy Voice\n${brand.copyVoice}\n`;
    if (brand.elevation) result += `\n## Elevation & Shadows\n${brand.elevation}\n`;
    if (brand.responsive) result += `\n## Responsive Breakpoints\n${brand.responsive}\n`;
    if (brand.mediaPatterns) result += `\n## Image & Media Treatment\n${brand.mediaPatterns}\n`;
    
    if (brand.colors?.dark) {
      const darkColors = brand.colors.dark.map((c: any) => `${c.name}: ${c.hex}`).join(', ');
      result += `\n## Dark Mode\n${darkColors}\n`;
    }
    
    if (brand.designPrinciples?.length > 0) {
      result += `\n## Design Principles\n${brand.designPrinciples.map((p: string) => `- ${p}`).join('\n')}\n`;
    }
    
    if (brand.mood?.length > 0) {
      result += `\n## Mood: ${brand.mood.join(', ')}\n`;
    }
    
    return result;
  };

  const extractHtml = (text: string): string => {
    // Try to extract HTML from markdown code blocks first
    const htmlBlockMatch = text.match(/```html\s*([\s\S]*?)```/i);
    if (htmlBlockMatch) {
      return htmlBlockMatch[1].trim();
    }
    
    // Try generic code block
    const codeBlockMatch = text.match(/```\s*([\s\S]*?)```/);
    if (codeBlockMatch) {
      return codeBlockMatch[1].trim();
    }
    
    // Check if the text starts with HTML-like content
    const trimmed = text.trim();
    if (trimmed.startsWith('<') || trimmed.startsWith('<!')) {
      return trimmed;
    }
    
    return text;
  };

  const updateIframe = (iframe: HTMLIFrameElement | null, html: string) => {
    if (!iframe) return;
    const doc = iframe.contentDocument;
    if (!doc) return;
    
    const fullHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { font-family: 'Inter', -apple-system, system-ui, sans-serif; padding: 16px; }
        </style>
      </head>
      <body>
        ${html}
      </body>
      </html>
    `;
    
    doc.open();
    doc.write(fullHtml);
    doc.close();
  };

  // Update iframes when outputs change
  useEffect(() => {
    if (genericOutput) {
      updateIframe(genericIframeRef.current, extractHtml(genericOutput));
    }
  }, [genericOutput]);

  useEffect(() => {
    if (brandedOutput) {
      updateIframe(brandedIframeRef.current, extractHtml(brandedOutput));
    }
  }, [brandedOutput]);

  const generateWithOllama = async (userPrompt: string, brandSystem: string | null): Promise<string> => {
    const systemPrompt = brandSystem 
      ? `You are an expert UI developer. Generate clean, semantic HTML with inline CSS styles. Follow this design system exactly:\n\n${brandSystem}\n\nGenerate ONLY HTML code with inline styles. No explanations. No markdown. Just the HTML.`
      : `You are an expert UI developer. Generate clean, semantic HTML with inline CSS styles. Use a modern, professional default style. Generate ONLY HTML code with inline styles. No explanations. No markdown. Just the HTML.`;

    const fullPrompt = `${systemPrompt}\n\nCreate the following UI component:\n${userPrompt}`;

    const response = await fetch(OLLAMA_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama3',
        prompt: fullPrompt,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.response || '';
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    if (!selectedBrand) {
      setError('Please select a brand to compare against');
      return;
    }

    setError(null);
    setGenericOutput('');
    setBrandedOutput('');
    setIsLoadingGeneric(true);
    setIsLoadingBranded(true);

    // Generate both in parallel
    const brandSystem = generatePrompt(selectedBrand);

    try {
      const [genericResult, brandedResult] = await Promise.allSettled([
        generateWithOllama(prompt, null),
        generateWithOllama(prompt, brandSystem),
      ]);

      if (genericResult.status === 'fulfilled') {
        setGenericOutput(genericResult.value);
      } else {
        setGenericOutput(`Error: ${genericResult.reason}`);
      }

      if (brandedResult.status === 'fulfilled') {
        setBrandedOutput(brandedResult.value);
      } else {
        setBrandedOutput(`Error: ${brandedResult.reason}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoadingGeneric(false);
      setIsLoadingBranded(false);
    }
  };

  const handleDemoPrompt = (demoPrompt: string) => {
    setPrompt(demoPrompt);
  };

  return (
    <div className={`min-h-screen ${isDark ? 'dark bg-black' : 'bg-white'}`}>
      {/* Navigation */}
      <nav className={`sticky top-0 z-50 backdrop-blur-xl ${isDark ? 'bg-black/70' : 'bg-white/70'} border-b ${isDark ? 'border-white/10' : 'border-black/5'}`}>
        <div className="max-w-[1400px] mx-auto px-6 h-12 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/"
              className={`text-sm font-medium px-3 py-1.5 rounded-full transition ${
                isDark 
                  ? 'hover:bg-white/10 text-white/70 hover:text-white' 
                  : 'hover:bg-black/5 text-black/70 hover:text-black'
              }`}
            >
              ← Back to Brands
            </Link>
            <h1 className="text-sm font-semibold">🧪 Brand Testing Playground</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${
                ollamaStatus === 'connected' ? 'bg-[#34C759]' : 
                ollamaStatus === 'disconnected' ? 'bg-[#FF3B30]' : 'bg-[#FF9500] animate-pulse'
              }`} />
              <span className="text-xs text-[--color-text-secondary]">
                {ollamaStatus === 'connected' ? 'Ollama Connected' : 
                 ollamaStatus === 'disconnected' ? 'Ollama Disconnected' : 'Checking...'}
              </span>
              {ollamaStatus === 'disconnected' && (
                <button 
                  onClick={checkOllamaConnection}
                  className="text-xs text-[#0071E3] hover:underline"
                >
                  Retry
                </button>
              )}
            </div>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Controls */}
        <div className={`rounded-2xl p-6 mb-6 ${isDark ? 'bg-[#1C1C1E]' : 'bg-[#F5F5F7]'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
            {/* Brand Selector */}
            <div>
              <label className="block text-sm font-medium mb-2 text-[--color-text-secondary]">
                Select Brand to Test
              </label>
              <select
                value={selectedBrandId}
                onChange={(e) => setSelectedBrandId(e.target.value)}
                className={`w-full h-12 px-4 rounded-xl text-[15px] ${
                  isDark 
                    ? 'bg-black border-white/10' 
                    : 'bg-white border-black/10'
                } border focus:outline-none focus:ring-2 focus:ring-[#0071E3]`}
              >
                <option value="">Choose a brand...</option>
                {fullSystemBrands.map((brand: any) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name} ({brand.category})
                  </option>
                ))}
              </select>
            </div>

            {/* Prompt Input */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium mb-2 text-[--color-text-secondary]">
                UI Component Prompt
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe the UI component you want to generate..."
                  className={`flex-1 h-12 px-4 rounded-xl text-[15px] ${
                    isDark 
                      ? 'bg-black border-white/10 placeholder:text-white/30' 
                      : 'bg-white border-black/10 placeholder:text-black/30'
                  } border focus:outline-none focus:ring-2 focus:ring-[#0071E3]`}
                  onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                />
                <button
                  onClick={handleGenerate}
                  disabled={isLoadingGeneric || isLoadingBranded || ollamaStatus !== 'connected'}
                  className={`px-6 h-12 rounded-xl font-semibold transition ${
                    ollamaStatus !== 'connected'
                      ? 'bg-gray-400 cursor-not-allowed text-white'
                      : isLoadingGeneric || isLoadingBranded
                      ? 'bg-[#0071E3]/50 cursor-wait text-white'
                      : 'bg-[#0071E3] hover:bg-[#0077ED] text-white'
                  }`}
                >
                  {isLoadingGeneric || isLoadingBranded ? 'Generating...' : 'Generate'}
                </button>
              </div>
            </div>
          </div>

          {/* Demo Prompts */}
          <div>
            <label className="block text-sm font-medium mb-2 text-[--color-text-secondary]">
              Quick Prompts
            </label>
            <div className="flex flex-wrap gap-2">
              {DEMO_PROMPTS.map((demo) => (
                <button
                  key={demo.label}
                  onClick={() => handleDemoPrompt(demo.prompt)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    isDark 
                      ? 'bg-white/10 hover:bg-white/20 text-white/80' 
                      : 'bg-black/5 hover:bg-black/10 text-black/80'
                  }`}
                >
                  {demo.label}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="mt-4 p-3 rounded-lg bg-[#FF3B30]/10 text-[#FF3B30] text-sm">
              {error}
            </div>
          )}
        </div>

        {/* Ollama Disconnected Warning */}
        {ollamaStatus === 'disconnected' && (
          <div className={`rounded-2xl p-6 mb-6 border-2 border-dashed ${
            isDark ? 'border-white/20 bg-white/5' : 'border-black/10 bg-black/[0.02]'
          }`}>
            <h3 className="font-semibold mb-2">🦙 Ollama Not Detected</h3>
            <p className="text-sm text-[--color-text-secondary] mb-3">
              This playground requires Ollama running locally on port 11434.
            </p>
            <ol className="text-sm text-[--color-text-secondary] space-y-1 mb-4">
              <li>1. Install Ollama: <code className="bg-black/10 dark:bg-white/10 px-1 rounded">brew install ollama</code></li>
              <li>2. Start Ollama: <code className="bg-black/10 dark:bg-white/10 px-1 rounded">ollama serve</code></li>
              <li>3. Pull a model: <code className="bg-black/10 dark:bg-white/10 px-1 rounded">ollama pull llama3</code></li>
              <li>4. Click retry above</li>
            </ol>
          </div>
        )}

        {/* Side-by-Side Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Generic Output (No Brand) */}
          <div className={`rounded-2xl overflow-hidden ${isDark ? 'bg-[#1C1C1E]' : 'bg-white'} shadow-[var(--shadow-2)]`}>
            <div className={`px-4 py-3 border-b ${isDark ? 'border-white/10' : 'border-black/5'}`}>
              <h3 className="font-semibold text-sm">Generic (No Brand System)</h3>
              <p className="text-xs text-[--color-text-secondary]">Default AI output without design constraints</p>
            </div>
            <div className="relative">
              {isLoadingGeneric && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-10">
                  <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#0071E3] border-t-transparent" />
                </div>
              )}
              <iframe
                ref={genericIframeRef}
                className="w-full h-[500px] bg-white"
                sandbox="allow-scripts"
                title="Generic Output"
              />
            </div>
          </div>

          {/* Branded Output */}
          <div className={`rounded-2xl overflow-hidden ${isDark ? 'bg-[#1C1C1E]' : 'bg-white'} shadow-[var(--shadow-2)]`}>
            <div className={`px-4 py-3 border-b ${isDark ? 'border-white/10' : 'border-black/5'}`}>
              <h3 className="font-semibold text-sm flex items-center gap-2">
                {selectedBrand ? (
                  <>
                    <span 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: selectedBrand.colors.primary[0]?.hex || '#0071E3' }}
                    />
                    {selectedBrand.name} Design System
                  </>
                ) : (
                  'Select a Brand'
                )}
              </h3>
              <p className="text-xs text-[--color-text-secondary]">
                {selectedBrand ? 'AI output following brand guidelines' : 'Choose a brand to see the difference'}
              </p>
            </div>
            <div className="relative">
              {isLoadingBranded && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-10">
                  <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#0071E3] border-t-transparent" />
                </div>
              )}
              <iframe
                ref={brandedIframeRef}
                className="w-full h-[500px] bg-white"
                sandbox="allow-scripts"
                title="Branded Output"
              />
            </div>
          </div>
        </div>

        {/* Selected Brand Preview */}
        {selectedBrand && (
          <div className={`mt-6 rounded-2xl p-4 ${isDark ? 'bg-[#1C1C1E]' : 'bg-[#F5F5F7]'}`}>
            <h3 className="font-semibold text-sm mb-3">Selected Brand: {selectedBrand.name}</h3>
            <div className="flex items-center gap-6">
              <div className="flex">
                {selectedBrand.colors.primary.slice(0, 6).map((color: any, i: number) => (
                  <div 
                    key={i}
                    className="w-8 h-8 first:rounded-l-lg last:rounded-r-lg"
                    style={{ backgroundColor: color.hex }}
                    title={`${color.name}: ${color.hex}`}
                  />
                ))}
              </div>
              <div className="text-sm text-[--color-text-secondary]">
                <span className="font-medium">{selectedBrand.typography?.headings || 'System'}</span>
                {' / '}
                <span>{selectedBrand.typography?.body || 'System'}</span>
              </div>
              {selectedBrand.mood && (
                <div className="flex gap-1">
                  {selectedBrand.mood.slice(0, 3).map((m: string) => (
                    <span 
                      key={m}
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        isDark ? 'bg-white/10' : 'bg-black/5'
                      }`}
                    >
                      {m}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
