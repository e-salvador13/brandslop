'use client';

import { useState, useEffect, useMemo } from 'react';
import brandsData from '../data/brands.json';

type ViewMode = 'curated' | 'all';
type ExportFormat = 'prompt' | 'css' | 'tailwind' | 'json';

export default function Home() {
  const [selectedBrand, setSelectedBrand] = useState<any>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [exportFormat, setExportFormat] = useState<ExportFormat>('prompt');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<ViewMode>('curated');
  const [isDark, setIsDark] = useState(false);

  // Load favorites and theme from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('brandslop-favorites');
    if (savedFavorites) {
      setFavorites(new Set(JSON.parse(savedFavorites)));
    }
    // Check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newFavorites = new Set(favorites);
    if (favorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
    localStorage.setItem('brandslop-favorites', JSON.stringify(Array.from(newFavorites)));
  };

  const copyToClipboard = async (text: string, field: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Check if brand has full design system
  const hasFullSystem = (brand: any) => {
    return brand.designPrinciples?.length > 0 || brand.spacing || brand.motion || brand.components || brand.elevation;
  };

  // Separate curated (full system) and color-only brands
  const { curatedBrands, colorOnlyBrands } = useMemo(() => {
    const curated: any[] = [];
    const colorOnly: any[] = [];
    
    brandsData.brands.forEach((brand: any) => {
      if (hasFullSystem(brand)) {
        curated.push(brand);
      } else {
        colorOnly.push(brand);
      }
    });
    
    return { curatedBrands: curated, colorOnlyBrands: colorOnly };
  }, []);

  const categories = useMemo(() => {
    const cats = new Set(curatedBrands.map((b: any) => b.category));
    return ['all', ...Array.from(cats)];
  }, [curatedBrands]);

  const filteredBrands = useMemo(() => {
    const source = viewMode === 'curated' ? curatedBrands : colorOnlyBrands;
    return source
      .filter((b: any) =>
        (categoryFilter === 'all' || b.category === categoryFilter) &&
        (b.name.toLowerCase().includes(search.toLowerCase()) ||
         b.mood?.some((m: string) => m.toLowerCase().includes(search.toLowerCase())))
      )
      .sort((a, b) => {
        // Favorites first
        const aFav = favorites.has(a.id);
        const bFav = favorites.has(b.id);
        if (aFav && !bFav) return -1;
        if (!aFav && bFav) return 1;
        return a.name.localeCompare(b.name);
      });
  }, [viewMode, curatedBrands, colorOnlyBrands, categoryFilter, search, favorites]);

  const generatePrompt = (brand: any): string => {
    let prompt = `# ${brand.name} Design System\n\n`;
    
    // Colors
    const colors = brand.colors.primary.map((c: any) => `${c.name}: ${c.hex}`).join(', ');
    const neutrals = brand.colors.neutral?.map((c: any) => `${c.name}: ${c.hex}`).join(', ') || '';
    prompt += `## Colors\n- Primary: ${colors}\n`;
    if (neutrals) prompt += `- Neutrals: ${neutrals}\n`;
    if (brand.colorUsage) prompt += `- Usage: ${brand.colorUsage}\n`;
    
    // Typography
    prompt += `\n## Typography\n`;
    prompt += `- Headings: ${brand.typography.headings}\n`;
    prompt += `- Body: ${brand.typography.body}\n`;
    if (brand.typographyScale) prompt += `- Scale: ${brand.typographyScale}\n`;
    
    // All other sections
    if (brand.spacing) prompt += `\n## Spacing\n${brand.spacing}\n`;
    if (brand.components) prompt += `\n## Component Patterns\n${brand.components}\n`;
    if (brand.motion) prompt += `\n## Motion & Animation\n${brand.motion}\n`;
    if (brand.layout) prompt += `\n## Layout & Grid\n${brand.layout}\n`;
    if (brand.iconStyle) prompt += `\n## Icons\n${brand.iconStyle}\n`;
    if (brand.interactiveStates) prompt += `\n## Interactive States\n${brand.interactiveStates}\n`;
    if (brand.copyVoice) prompt += `\n## Copy Voice\n${brand.copyVoice}\n`;
    if (brand.elevation) prompt += `\n## Elevation & Shadows\n${brand.elevation}\n`;
    if (brand.responsive) prompt += `\n## Responsive Breakpoints\n${brand.responsive}\n`;
    if (brand.mediaPatterns) prompt += `\n## Image & Media Treatment\n${brand.mediaPatterns}\n`;
    
    if (brand.colors?.dark) {
      const darkColors = brand.colors.dark.map((c: any) => `${c.name}: ${c.hex}`).join(', ');
      prompt += `\n## Dark Mode\n${darkColors}\n`;
    }
    
    if (brand.designPrinciples?.length > 0) {
      prompt += `\n## Design Principles\n${brand.designPrinciples.map((p: string) => `- ${p}`).join('\n')}\n`;
    }
    
    if (brand.mood?.length > 0) {
      prompt += `\n## Mood: ${brand.mood.join(', ')}\n`;
    }
    
    return prompt;
  };

  const generateCSS = (brand: any): string => {
    let css = `:root {\n  /* ${brand.name} */\n`;
    brand.colors.primary?.forEach((c: any, i: number) => {
      css += `  --color-primary-${i + 1}: ${c.hex};\n`;
    });
    brand.colors.neutral?.forEach((c: any, i: number) => {
      css += `  --color-neutral-${i + 1}: ${c.hex};\n`;
    });
    css += `}\n`;
    return css;
  };

  const generateTailwind = (brand: any): string => {
    const colors: Record<string, string> = {};
    brand.colors.primary?.forEach((c: any, i: number) => {
      colors[`primary-${i + 1}`] = c.hex;
    });
    brand.colors.neutral?.forEach((c: any, i: number) => {
      colors[`neutral-${i + 1}`] = c.hex;
    });
    return `// tailwind.config.js - ${brand.name}\nmodule.exports = {\n  theme: {\n    extend: {\n      colors: ${JSON.stringify(colors, null, 8).replace(/"/g, "'")}\n    }\n  }\n}`;
  };

  const getExportContent = (brand: any, format: ExportFormat): string => {
    switch (format) {
      case 'css': return generateCSS(brand);
      case 'tailwind': return generateTailwind(brand);
      case 'json': return JSON.stringify(brand, null, 2);
      default: return generatePrompt(brand);
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'dark bg-black' : 'bg-white'}`}>
      {/* Navigation */}
      <nav className={`sticky top-0 z-50 backdrop-blur-xl ${isDark ? 'bg-black/70' : 'bg-white/70'} border-b ${isDark ? 'border-white/10' : 'border-black/5'}`}>
        <div className="max-w-[980px] mx-auto px-6 h-12 flex items-center justify-between">
          <h1 className="text-sm font-semibold">BrandSlop</h1>
          <div className="flex items-center gap-4">
            <span className="text-caption text-[--color-text-secondary]">
              {curatedBrands.length} design systems
            </span>
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

      {/* Hero Section */}
      <section className={`section ${isDark ? 'bg-black' : 'bg-[#F5F5F7]'}`}>
        <div className="max-w-[980px] mx-auto px-6 text-center">
          <h2 className="text-h1 mb-4">
            AI-ready brand<br />design systems.
          </h2>
          <p className="text-xl text-[--color-text-secondary] max-w-[600px] mx-auto mb-8">
            {curatedBrands.length} curated brands with full specifications. Copy and paste into Claude, GPT, or Cursor for instant brand-accurate UI.
          </p>
          
          {/* Search */}
          <div className="max-w-[500px] mx-auto">
            <div className="relative">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[--color-text-secondary]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search brands..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`w-full h-12 pl-12 pr-4 rounded-xl text-[17px] ${
                  isDark 
                    ? 'bg-[#1C1C1E] border-white/10 placeholder:text-white/30' 
                    : 'bg-white border-black/10 placeholder:text-black/30'
                } border focus:outline-none focus:ring-2 focus:ring-[#0071E3]`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* View Toggle & Filters */}
      <section className={`py-6 border-b ${isDark ? 'border-white/10' : 'border-black/5'}`}>
        <div className="max-w-[980px] mx-auto px-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('curated')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  viewMode === 'curated'
                    ? 'bg-[#0071E3] text-white'
                    : `${isDark ? 'bg-white/10 text-white/70' : 'bg-black/5 text-black/70'} hover:opacity-80`
                }`}
              >
                Full Systems ({curatedBrands.length})
              </button>
              <button
                onClick={() => setViewMode('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  viewMode === 'all'
                    ? 'bg-[#0071E3] text-white'
                    : `${isDark ? 'bg-white/10 text-white/70' : 'bg-black/5 text-black/70'} hover:opacity-80`
                }`}
              >
                Colors Only ({colorOnlyBrands.length})
              </button>
            </div>
            
            {viewMode === 'curated' && (
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className={`h-10 px-4 rounded-lg text-sm ${
                  isDark 
                    ? 'bg-[#1C1C1E] border-white/10' 
                    : 'bg-white border-black/10'
                } border focus:outline-none`}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
      </section>

      {/* Brands Grid */}
      <section className="section">
        <div className="max-w-[980px] mx-auto px-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredBrands.map((brand: any, index: number) => (
              <div
                key={brand.id}
                onClick={() => setSelectedBrand(brand)}
                className={`group cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] ${
                  isDark ? 'bg-[#1C1C1E]' : 'bg-white'
                } shadow-[var(--shadow-1)] hover:shadow-[var(--shadow-2)]`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Color Bar */}
                <div className="flex h-16">
                  {brand.colors.primary.slice(0, 5).map((color: any, i: number) => (
                    <div 
                      key={i} 
                      className="flex-1" 
                      style={{ backgroundColor: color.hex }}
                    />
                  ))}
                </div>
                
                {/* Content */}
                <div className="p-4 relative">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-sm">{brand.name}</h3>
                      {hasFullSystem(brand) && (
                        <span className="text-[11px] text-[#0071E3]">Full System</span>
                      )}
                    </div>
                    <button
                      onClick={(e) => toggleFavorite(brand.id, e)}
                      className={`p-1 rounded transition ${
                        favorites.has(brand.id) 
                          ? 'text-[#FF9500]' 
                          : 'text-[--color-text-secondary] opacity-0 group-hover:opacity-100'
                      }`}
                    >
                      <svg className="w-4 h-4" fill={favorites.has(brand.id) ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredBrands.length === 0 && (
            <div className="text-center py-20">
              <p className="text-[--color-text-secondary]">No brands found.</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-8 border-t ${isDark ? 'border-white/10 bg-black' : 'border-black/5 bg-[#F5F5F7]'}`}>
        <div className="max-w-[980px] mx-auto px-6 text-center">
          <p className="text-caption text-[--color-text-secondary]">
            {curatedBrands.length} curated design systems • {colorOnlyBrands.length} color palettes
          </p>
        </div>
      </footer>

      {/* Detail Modal */}
      {selectedBrand && (
        <div 
          className="fixed inset-0 z-50 flex items-start justify-center overflow-auto bg-black/60 backdrop-blur-sm p-4 sm:p-8"
          onClick={() => setSelectedBrand(null)}
        >
          <div 
            className={`w-full max-w-2xl rounded-2xl overflow-hidden ${isDark ? 'bg-[#1C1C1E]' : 'bg-white'} shadow-[var(--shadow-3)]`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className={`sticky top-0 z-10 ${isDark ? 'bg-[#1C1C1E]' : 'bg-white'} border-b ${isDark ? 'border-white/10' : 'border-black/5'}`}>
              <div className="flex items-center justify-between p-4">
                <div>
                  <h2 className="text-lg font-semibold">{selectedBrand.name}</h2>
                  {selectedBrand.category && (
                    <span className="text-caption text-[--color-text-secondary]">{selectedBrand.category}</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={(e) => toggleFavorite(selectedBrand.id, e)}
                    className={`p-2 rounded-full transition ${
                      favorites.has(selectedBrand.id) 
                        ? 'text-[#FF9500] bg-[#FF9500]/10' 
                        : `${isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'} text-[--color-text-secondary]`
                    }`}
                  >
                    <svg className="w-5 h-5" fill={favorites.has(selectedBrand.id) ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </button>
                  <button 
                    onClick={() => setSelectedBrand(null)} 
                    className={`p-2 rounded-full ${isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'}`}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Color Bar */}
              <div className="flex h-12">
                {[...selectedBrand.colors.primary, ...(selectedBrand.colors.neutral || []), ...(selectedBrand.colors.secondary || [])]
                  .slice(0, 8)
                  .map((color: any, i: number) => (
                    <button
                      key={i}
                      onClick={() => copyToClipboard(color.hex, `c${i}`)}
                      className="flex-1 relative group/color"
                      style={{ backgroundColor: color.hex }}
                      title={`${color.name}: ${color.hex}`}
                    >
                      <div className={`absolute inset-0 flex items-center justify-center transition text-xs font-mono ${
                        copiedField === `c${i}` 
                          ? 'bg-black/60 text-white' 
                          : 'bg-transparent group-hover/color:bg-black/40 text-transparent group-hover/color:text-white'
                      }`}>
                        {copiedField === `c${i}` ? '✓' : color.hex}
                      </div>
                    </button>
                  ))}
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-4 space-y-6 max-h-[60vh] overflow-auto">
              {/* Typography */}
              <Section title="Typography" isDark={isDark}>
                <p><span className="text-[--color-text-secondary]">Headings:</span> {selectedBrand.typography?.headings}</p>
                <p><span className="text-[--color-text-secondary]">Body:</span> {selectedBrand.typography?.body}</p>
                {selectedBrand.typographyScale && (
                  <p className="text-sm text-[--color-text-secondary] mt-2">{selectedBrand.typographyScale}</p>
                )}
              </Section>

              {selectedBrand.colorUsage && (
                <Section title="Color Usage" isDark={isDark}>
                  <p className="text-sm">{selectedBrand.colorUsage}</p>
                </Section>
              )}

              {selectedBrand.spacing && (
                <Section title="Spacing" isDark={isDark}>
                  <p className="text-sm whitespace-pre-line">{selectedBrand.spacing}</p>
                </Section>
              )}

              {selectedBrand.components && (
                <Section title="Components" isDark={isDark}>
                  <p className="text-sm whitespace-pre-line">{selectedBrand.components}</p>
                </Section>
              )}

              {selectedBrand.elevation && (
                <Section title="Elevation" isDark={isDark}>
                  <p className="text-sm whitespace-pre-line">{selectedBrand.elevation}</p>
                </Section>
              )}

              {selectedBrand.motion && (
                <Section title="Motion" isDark={isDark}>
                  <p className="text-sm">{selectedBrand.motion}</p>
                </Section>
              )}

              {selectedBrand.layout && (
                <Section title="Layout" isDark={isDark}>
                  <p className="text-sm whitespace-pre-line">{selectedBrand.layout}</p>
                </Section>
              )}

              {selectedBrand.responsive && (
                <Section title="Responsive" isDark={isDark}>
                  <p className="text-sm whitespace-pre-line">{selectedBrand.responsive}</p>
                </Section>
              )}

              {selectedBrand.iconStyle && (
                <Section title="Icons" isDark={isDark}>
                  <p className="text-sm">{selectedBrand.iconStyle}</p>
                </Section>
              )}

              {selectedBrand.interactiveStates && (
                <Section title="Interactive States" isDark={isDark}>
                  <p className="text-sm whitespace-pre-line">{selectedBrand.interactiveStates}</p>
                </Section>
              )}

              {selectedBrand.mediaPatterns && (
                <Section title="Media" isDark={isDark}>
                  <p className="text-sm whitespace-pre-line">{selectedBrand.mediaPatterns}</p>
                </Section>
              )}

              {selectedBrand.copyVoice && (
                <Section title="Voice" isDark={isDark}>
                  <p className="text-sm">{selectedBrand.copyVoice}</p>
                </Section>
              )}

              {selectedBrand.colors?.dark && (
                <Section title="Dark Mode" isDark={isDark}>
                  <div className="flex flex-wrap gap-2">
                    {selectedBrand.colors.dark.map((c: any, i: number) => (
                      <button
                        key={i}
                        onClick={() => copyToClipboard(c.hex, `dark${i}`)}
                        className={`flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs ${
                          isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-black/5 hover:bg-black/10'
                        }`}
                      >
                        <div className="w-4 h-4 rounded" style={{ backgroundColor: c.hex }} />
                        <span className="font-mono">{c.hex}</span>
                      </button>
                    ))}
                  </div>
                </Section>
              )}

              {selectedBrand.designPrinciples?.length > 0 && (
                <Section title="Principles" isDark={isDark}>
                  <ul className="space-y-1">
                    {selectedBrand.designPrinciples.map((p: string, i: number) => (
                      <li key={i} className="text-sm flex gap-2">
                        <span className="text-[#0071E3]">•</span> {p}
                      </li>
                    ))}
                  </ul>
                </Section>
              )}

              {selectedBrand.mood?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedBrand.mood.map((m: string) => (
                    <span 
                      key={m} 
                      className={`text-xs px-3 py-1 rounded-full ${
                        isDark ? 'bg-white/10' : 'bg-black/5'
                      }`}
                    >
                      {m}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Export Section */}
            <div className={`p-4 border-t ${isDark ? 'border-white/10' : 'border-black/5'}`}>
              <div className="flex gap-1 mb-3">
                {(['prompt', 'css', 'tailwind', 'json'] as ExportFormat[]).map(format => (
                  <button
                    key={format}
                    onClick={() => setExportFormat(format)}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
                      exportFormat === format
                        ? 'bg-[#0071E3] text-white'
                        : `${isDark ? 'bg-white/10 text-white/70' : 'bg-black/5 text-black/70'} hover:opacity-80`
                    }`}
                  >
                    {format === 'prompt' ? 'Prompt' : format.toUpperCase()}
                  </button>
                ))}
              </div>
              <button
                onClick={() => copyToClipboard(getExportContent(selectedBrand, exportFormat), 'export')}
                className={`w-full py-3 rounded-full font-semibold transition ${
                  copiedField === 'export'
                    ? 'bg-[#34C759] text-white'
                    : 'bg-[#0071E3] hover:bg-[#0077ED] text-white'
                }`}
              >
                {copiedField === 'export' ? 'Copied!' : `Copy ${exportFormat === 'prompt' ? 'AI Prompt' : exportFormat.toUpperCase()}`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Section component for modal
function Section({ title, children, isDark }: { title: string; children: React.ReactNode; isDark: boolean }) {
  return (
    <div>
      <h3 className="text-xs uppercase tracking-wider text-[--color-text-secondary] mb-2">{title}</h3>
      <div className={`rounded-xl p-3 ${isDark ? 'bg-white/5' : 'bg-black/[0.02]'}`}>
        {children}
      </div>
    </div>
  );
}
