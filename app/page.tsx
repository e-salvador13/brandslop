'use client';

import { useState, useEffect } from 'react';
import brandsData from '../data/brands.json';

type Tab = 'companies' | 'palettes' | 'submit';
type SortBy = 'popular' | 'recent' | 'name';
type ExportFormat = 'prompt' | 'css' | 'tailwind' | 'json';

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('companies');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [selectedType, setSelectedType] = useState<'brand' | 'palette'>('brand');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<SortBy>('name');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [exportFormat, setExportFormat] = useState<ExportFormat>('prompt');
  const [showSubmitSuccess, setShowSubmitSuccess] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('brandslop-favorites');
    if (savedFavorites) {
      setFavorites(new Set(JSON.parse(savedFavorites)));
    }
  }, []);

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

  const generatePrompt = (item: any, type: 'brand' | 'palette'): string => {
    if (type === 'brand') {
      let prompt = `# ${item.name} Design System\n\n`;
      
      // Colors
      const colors = item.colors.primary.map((c: any) => `${c.name}: ${c.hex}`).join(', ');
      const neutrals = item.colors.neutral?.map((c: any) => `${c.name}: ${c.hex}`).join(', ') || '';
      prompt += `## Colors\n- Primary: ${colors}\n`;
      if (neutrals) prompt += `- Neutrals: ${neutrals}\n`;
      if (item.colorUsage) prompt += `- Usage: ${item.colorUsage}\n`;
      
      // Typography
      prompt += `\n## Typography\n`;
      prompt += `- Headings: ${item.typography.headings}\n`;
      prompt += `- Body: ${item.typography.body}\n`;
      if (item.typographyScale) {
        prompt += `- Scale: ${item.typographyScale}\n`;
      }
      if (item.typography.googleFonts) {
        prompt += `- Google Fonts: ${item.typography.googleFonts}\n`;
      }
      
      // Spacing
      if (item.spacing) {
        prompt += `\n## Spacing\n${item.spacing}\n`;
      }
      
      // Components
      if (item.components) {
        prompt += `\n## Component Patterns\n${item.components}\n`;
      }
      
      // Motion
      if (item.motion) {
        prompt += `\n## Motion & Animation\n${item.motion}\n`;
      }
      
      // Layout
      if (item.layout) {
        prompt += `\n## Layout & Grid\n${item.layout}\n`;
      }
      
      // Icons
      if (item.iconStyle) {
        prompt += `\n## Icons\n${item.iconStyle}\n`;
      }
      
      // Interactive States
      if (item.interactiveStates) {
        prompt += `\n## Interactive States\n${item.interactiveStates}\n`;
      }
      
      // Voice
      if (item.copyVoice) {
        prompt += `\n## Copy Voice\n${item.copyVoice}\n`;
      }
      
      // Elevation
      if (item.elevation) {
        prompt += `\n## Elevation & Shadows\n${item.elevation}\n`;
      }
      
      // Responsive
      if (item.responsive) {
        prompt += `\n## Responsive Breakpoints\n${item.responsive}\n`;
      }
      
      // Media Patterns
      if (item.mediaPatterns) {
        prompt += `\n## Image & Media Treatment\n${item.mediaPatterns}\n`;
      }
      
      // Dark Mode
      if (item.colors?.dark) {
        const darkColors = item.colors.dark.map((c: any) => `${c.name}: ${c.hex}`).join(', ');
        prompt += `\n## Dark Mode\n${darkColors}\n`;
      }
      
      // Principles
      if (item.designPrinciples?.length > 0) {
        prompt += `\n## Design Principles\n${item.designPrinciples.map((p: string) => `- ${p}`).join('\n')}\n`;
      }
      
      // Mood
      if (item.mood?.length > 0) {
        prompt += `\n## Mood: ${item.mood.join(', ')}\n`;
      }
      
      return prompt;
    } else {
      const colors = item.colors.map((c: any) => `${c.name}: ${c.hex}`).join('\n');
      return `# ${item.name} Aesthetic\n\n## Colors\n${colors}\n\n## Style\n${item.typography.style}\nFonts: ${item.typography.suggestions.join(', ')}\n\n## Elements\n${item.elements.map((e: string) => `- ${e}`).join('\n')}\n\n## Mood: ${item.mood.join(', ')}`;
    }
  };

  const generateCSS = (item: any, type: 'brand' | 'palette'): string => {
    let css = `:root {\n  /* ${item.name} */\n`;
    
    if (type === 'brand') {
      item.colors.primary?.forEach((c: any, i: number) => {
        css += `  --color-primary-${i + 1}: ${c.hex};\n`;
      });
      item.colors.neutral?.forEach((c: any, i: number) => {
        css += `  --color-neutral-${i + 1}: ${c.hex};\n`;
      });
      item.colors.secondary?.forEach((c: any, i: number) => {
        css += `  --color-secondary-${i + 1}: ${c.hex};\n`;
      });
    } else {
      item.colors.forEach((c: any, i: number) => {
        css += `  --color-${i + 1}: ${c.hex};\n`;
      });
    }
    
    css += `}\n`;
    return css;
  };

  const generateTailwind = (item: any, type: 'brand' | 'palette'): string => {
    const colors: Record<string, string> = {};
    
    if (type === 'brand') {
      item.colors.primary?.forEach((c: any, i: number) => {
        colors[`primary-${i + 1}`] = c.hex;
      });
      item.colors.neutral?.forEach((c: any, i: number) => {
        colors[`neutral-${i + 1}`] = c.hex;
      });
    } else {
      item.colors.forEach((c: any, i: number) => {
        colors[`color-${i + 1}`] = c.hex;
      });
    }

    return `// tailwind.config.js - ${item.name}\nmodule.exports = {\n  theme: {\n    extend: {\n      colors: ${JSON.stringify(colors, null, 8).replace(/"/g, "'")}\n    }\n  }\n}`;
  };

  const getExportContent = (item: any, type: 'brand' | 'palette', format: ExportFormat): string => {
    switch (format) {
      case 'css': return generateCSS(item, type);
      case 'tailwind': return generateTailwind(item, type);
      case 'json': return JSON.stringify(item, null, 2);
      default: return generatePrompt(item, type);
    }
  };

  const getLogo = (brand: any) => {
    if (brand.logo) return brand.logo;
    const domain = brand.id.replace(/-/g, '') + '.com';
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
  };

  const sortItems = (items: any[]) => {
    return [...items].sort((a, b) => {
      // Favorites always first when not filtering by favorites only
      if (!showFavoritesOnly) {
        const aFav = favorites.has(a.id);
        const bFav = favorites.has(b.id);
        if (aFav && !bFav) return -1;
        if (!aFav && bFav) return 1;
      }
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });
  };

  const categories = ['all', ...Array.from(new Set(brandsData.brands.map((b: any) => b.category)))];

  const filteredBrands = sortItems(brandsData.brands.filter((b: any) =>
    (showFavoritesOnly ? favorites.has(b.id) : true) &&
    (categoryFilter === 'all' || b.category === categoryFilter) &&
    (b.name.toLowerCase().includes(search.toLowerCase()) ||
     b.mood?.some((m: string) => m.toLowerCase().includes(search.toLowerCase())))
  ));

  const filteredPalettes = sortItems(brandsData.aesthetics.filter((a: any) =>
    (showFavoritesOnly ? favorites.has(a.id) : true) &&
    (a.name.toLowerCase().includes(search.toLowerCase()) ||
     a.mood.some((m: string) => m.toLowerCase().includes(search.toLowerCase())))
  ));

  const formatLikes = (n: number) => n >= 1000 ? `${(n/1000).toFixed(1)}k` : n.toString();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSubmitSuccess(true);
    setTimeout(() => setShowSubmitSuccess(false), 3000);
    (e.target as HTMLFormElement).reset();
  };

  // Check if brand has rich design system data
  const hasRichData = (brand: any) => {
    return brand.designPrinciples?.length > 0 || brand.spacing || brand.motion || brand.components;
  };

  return (
    <main className="min-h-screen bg-[#0f0f1a] text-white">
      {/* Header */}
      <header className="border-b border-white/5 sticky top-0 z-50 bg-[#0f0f1a]/95 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold tracking-tight">BrandSlop</h1>
              <p className="text-white/40 text-xs">{brandsData.brands.length} brands • {brandsData.aesthetics.length} palettes</p>
            </div>
            <div className="flex items-center gap-3">
              {/* Tabs */}
              <div className="flex bg-white/5 rounded-lg p-0.5">
                {(['companies', 'palettes'] as Tab[]).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md capitalize transition ${
                      activeTab === tab ? 'bg-[#6c5ce7] text-white' : 'text-white/50 hover:text-white/70'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Search & Filters */}
          <div className="flex gap-2 mt-3">
            <div className="relative flex-1">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-3 py-2 text-base placeholder:text-white/30 focus:outline-none focus:border-[#6c5ce7]/50"
                style={{ fontSize: '16px' }}
              />
            </div>
            {activeTab === 'companies' && (
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs focus:outline-none min-w-[100px]"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat === 'all' ? 'All' : cat}</option>
                ))}
              </select>
            )}
            <button
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition ${
                showFavoritesOnly 
                  ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' 
                  : 'bg-white/5 text-white/50 border border-white/10 hover:bg-white/10'
              }`}
            >
              <svg className="w-3.5 h-3.5" fill={showFavoritesOnly ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              {showFavoritesOnly ? `★ ${favorites.size}` : '☆'}
            </button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortBy)}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs focus:outline-none"
            >
              <option value="name">A-Z</option>
            </select>
          </div>
        </div>
      </header>

      {/* Companies Grid - 3x3 */}
      {activeTab === 'companies' && (
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {filteredBrands.map((brand: any) => (
              <div
                key={brand.id}
                onClick={() => { setSelectedItem(brand); setSelectedType('brand'); }}
                className="group bg-[#16213e] rounded-xl overflow-hidden cursor-pointer hover:ring-2 hover:ring-[#6c5ce7]/50 transition-all hover:scale-[1.02]"
              >
                {/* Logo & Name */}
                <div className="p-4 flex flex-col items-center text-center relative">
                  {/* Favorite Star */}
                  <button
                    onClick={(e) => toggleFavorite(brand.id, e)}
                    className={`absolute top-2 right-2 p-1 rounded transition ${
                      favorites.has(brand.id) 
                        ? 'text-yellow-400' 
                        : 'text-white/20 hover:text-white/40'
                    }`}
                  >
                    <svg className="w-4 h-4" fill={favorites.has(brand.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </button>
                  <div className="w-12 h-12 mb-2 rounded-lg bg-white/10 flex items-center justify-center overflow-hidden">
                    <img
                      src={getLogo(brand)}
                      alt=""
                      className="w-10 h-10 object-contain"
                      onError={(e) => { 
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                  <h3 className="font-semibold text-sm truncate w-full">{brand.name}</h3>
                  {hasRichData(brand) && (
                    <span className="text-[10px] text-[#6c5ce7] mt-0.5">✦ Full System</span>
                  )}
                </div>
                
                {/* Color Bar */}
                <div className="flex h-6">
                  {brand.colors.primary.slice(0, 5).map((color: any, i: number) => (
                    <div 
                      key={i} 
                      className="flex-1" 
                      style={{ backgroundColor: color.hex }}
                      title={color.hex}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Palettes */}
      {activeTab === 'palettes' && (
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPalettes.map((palette: any) => (
              <div
                key={palette.id}
                onClick={() => { setSelectedItem(palette); setSelectedType('palette'); }}
                className="group bg-[#16213e] rounded-xl overflow-hidden cursor-pointer hover:ring-2 hover:ring-[#6c5ce7]/50 transition-all"
              >
                <div className="flex h-20">
                  {palette.colors.map((color: any, i: number) => (
                    <div key={i} className="flex-1 relative group/color" style={{ backgroundColor: color.hex }}>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/color:opacity-100 bg-black/40 transition">
                        <span className="text-xs font-mono">{color.hex}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-sm">{palette.name}</h3>
                    <p className="text-white/40 text-xs truncate">{palette.mood.slice(0, 3).join(' • ')}</p>
                  </div>
                  <button
                    onClick={(e) => toggleFavorite(palette.id, e)}
                    className={`p-1 rounded transition ${
                      favorites.has(palette.id) 
                        ? 'text-yellow-400' 
                        : 'text-white/20 hover:text-white/40'
                    }`}
                  >
                    <svg className="w-4 h-4" fill={favorites.has(palette.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Detail Modal - Mobile Optimized */}
      {selectedItem && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 overflow-auto"
          onClick={() => setSelectedItem(null)}
        >
          <div 
            className="min-h-full w-full max-w-lg mx-auto bg-[#16213e] sm:my-8 sm:rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-[#16213e] border-b border-white/10">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  {selectedType === 'brand' && (
                    <img
                      src={getLogo(selectedItem)}
                      alt=""
                      className="w-10 h-10 rounded-lg bg-white object-contain p-1"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                  )}
                  <div>
                    <h2 className="text-lg font-bold">{selectedItem.name}</h2>
                    {selectedType === 'brand' && selectedItem.category && (
                      <span className="text-xs text-white/40">{selectedItem.category}</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button 
                    onClick={(e) => toggleFavorite(selectedItem.id, e)}
                    className={`p-2 rounded-lg transition ${
                      favorites.has(selectedItem.id) 
                        ? 'text-yellow-400 bg-yellow-500/10' 
                        : 'text-white/30 hover:bg-white/10 hover:text-white/50'
                    }`}
                  >
                    <svg className="w-5 h-5" fill={favorites.has(selectedItem.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </button>
                  <button 
                    onClick={() => setSelectedItem(null)} 
                    className="p-2 hover:bg-white/10 rounded-lg"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Color Bar */}
              <div className="flex h-12">
                {(selectedType === 'brand' 
                  ? [...selectedItem.colors.primary, ...(selectedItem.colors.neutral || []), ...(selectedItem.colors.secondary || [])]
                  : selectedItem.colors
                ).slice(0, 8).map((color: any, i: number) => (
                  <button
                    key={i}
                    onClick={() => copyToClipboard(color.hex, `c${i}`)}
                    className="flex-1 relative group"
                    style={{ backgroundColor: color.hex }}
                  >
                    <div className={`absolute inset-0 flex flex-col items-center justify-center transition text-[10px] ${
                      copiedField === `c${i}` ? 'bg-black/60' : 'bg-black/0 group-hover:bg-black/50'
                    }`}>
                      <span className="font-mono">{copiedField === `c${i}` ? '✓' : color.hex}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 space-y-4 text-sm">
              {/* Typography */}
              <section>
                <h3 className="text-xs uppercase tracking-wider text-white/40 mb-2">Typography</h3>
                <div className="bg-white/5 rounded-lg p-3 space-y-1">
                  <p><span className="text-white/50">Headings:</span> {selectedItem.typography?.headings || 'System'}</p>
                  <p><span className="text-white/50">Body:</span> {selectedItem.typography?.body || 'System'}</p>
                  {selectedItem.typographyScale && (
                    <p className="text-white/70 text-xs mt-2">{selectedItem.typographyScale}</p>
                  )}
                </div>
              </section>

              {/* Color Usage */}
              {selectedItem.colorUsage && (
                <section>
                  <h3 className="text-xs uppercase tracking-wider text-white/40 mb-2">Color Usage</h3>
                  <p className="text-white/70 bg-white/5 rounded-lg p-3">{selectedItem.colorUsage}</p>
                </section>
              )}

              {/* Spacing */}
              {selectedItem.spacing && (
                <section>
                  <h3 className="text-xs uppercase tracking-wider text-white/40 mb-2">Spacing System</h3>
                  <p className="text-white/70 bg-white/5 rounded-lg p-3 whitespace-pre-line">{selectedItem.spacing}</p>
                </section>
              )}

              {/* Components */}
              {selectedItem.components && (
                <section>
                  <h3 className="text-xs uppercase tracking-wider text-white/40 mb-2">Component Patterns</h3>
                  <p className="text-white/70 bg-white/5 rounded-lg p-3 whitespace-pre-line">{selectedItem.components}</p>
                </section>
              )}

              {/* Motion */}
              {selectedItem.motion && (
                <section>
                  <h3 className="text-xs uppercase tracking-wider text-white/40 mb-2">Motion & Animation</h3>
                  <p className="text-white/70 bg-white/5 rounded-lg p-3">{selectedItem.motion}</p>
                </section>
              )}

              {/* Layout */}
              {selectedItem.layout && (
                <section>
                  <h3 className="text-xs uppercase tracking-wider text-white/40 mb-2">Layout & Grid</h3>
                  <p className="text-white/70 bg-white/5 rounded-lg p-3 whitespace-pre-line">{selectedItem.layout}</p>
                </section>
              )}

              {/* Icons */}
              {selectedItem.iconStyle && (
                <section>
                  <h3 className="text-xs uppercase tracking-wider text-white/40 mb-2">Icon Style</h3>
                  <p className="text-white/70 bg-white/5 rounded-lg p-3">{selectedItem.iconStyle}</p>
                </section>
              )}

              {/* Interactive States */}
              {selectedItem.interactiveStates && (
                <section>
                  <h3 className="text-xs uppercase tracking-wider text-white/40 mb-2">Interactive States</h3>
                  <p className="text-white/70 bg-white/5 rounded-lg p-3 whitespace-pre-line">{selectedItem.interactiveStates}</p>
                </section>
              )}

              {/* Elevation / Shadows */}
              {selectedItem.elevation && (
                <section>
                  <h3 className="text-xs uppercase tracking-wider text-white/40 mb-2">Elevation & Shadows</h3>
                  <p className="text-white/70 bg-white/5 rounded-lg p-3 whitespace-pre-line">{selectedItem.elevation}</p>
                </section>
              )}

              {/* Responsive */}
              {selectedItem.responsive && (
                <section>
                  <h3 className="text-xs uppercase tracking-wider text-white/40 mb-2">Responsive Breakpoints</h3>
                  <p className="text-white/70 bg-white/5 rounded-lg p-3 whitespace-pre-line">{selectedItem.responsive}</p>
                </section>
              )}

              {/* Media Patterns */}
              {selectedItem.mediaPatterns && (
                <section>
                  <h3 className="text-xs uppercase tracking-wider text-white/40 mb-2">Image & Media Treatment</h3>
                  <p className="text-white/70 bg-white/5 rounded-lg p-3 whitespace-pre-line">{selectedItem.mediaPatterns}</p>
                </section>
              )}

              {/* Dark Mode Colors */}
              {selectedItem.colors?.dark && (
                <section>
                  <h3 className="text-xs uppercase tracking-wider text-white/40 mb-2">Dark Mode</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.colors.dark.map((c: any, i: number) => (
                      <button
                        key={i}
                        onClick={() => copyToClipboard(c.hex, `dark${i}`)}
                        className="flex items-center gap-2 bg-white/5 rounded-lg px-2 py-1.5 hover:bg-white/10"
                      >
                        <div className="w-5 h-5 rounded" style={{ backgroundColor: c.hex }} />
                        <span className="text-xs font-mono">{c.hex}</span>
                      </button>
                    ))}
                  </div>
                </section>
              )}

              {/* Copy Voice */}
              {selectedItem.copyVoice && (
                <section>
                  <h3 className="text-xs uppercase tracking-wider text-white/40 mb-2">Copy Voice</h3>
                  <p className="text-white/70 bg-white/5 rounded-lg p-3">{selectedItem.copyVoice}</p>
                </section>
              )}

              {/* Design Principles */}
              {(selectedType === 'brand' ? selectedItem.designPrinciples?.length > 0 : selectedItem.elements?.length > 0) && (
                <section>
                  <h3 className="text-xs uppercase tracking-wider text-white/40 mb-2">
                    {selectedType === 'brand' ? 'Design Principles' : 'Elements'}
                  </h3>
                  <ul className="bg-white/5 rounded-lg p-3 space-y-1">
                    {(selectedType === 'brand' ? selectedItem.designPrinciples : selectedItem.elements)?.map((p: string, i: number) => (
                      <li key={i} className="flex gap-2 text-white/70">
                        <span className="text-[#6c5ce7]">•</span> {p}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Mood Tags */}
              {selectedItem.mood?.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {selectedItem.mood.map((m: string) => (
                    <span key={m} className="text-xs bg-white/10 px-2 py-0.5 rounded-full">{m}</span>
                  ))}
                </div>
              )}

              {/* Export Buttons */}
              <div className="pt-2 space-y-2">
                <div className="flex gap-1">
                  {(['prompt', 'css', 'tailwind', 'json'] as ExportFormat[]).map(format => (
                    <button
                      key={format}
                      onClick={() => setExportFormat(format)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition ${
                        exportFormat === format
                          ? 'bg-white/20 text-white'
                          : 'bg-white/5 text-white/50 hover:bg-white/10'
                      }`}
                    >
                      {format === 'prompt' ? 'Prompt' : format.toUpperCase()}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => copyToClipboard(getExportContent(selectedItem, selectedType, exportFormat), 'export')}
                  className={`w-full py-3 rounded-xl font-semibold transition ${
                    copiedField === 'export'
                      ? 'bg-green-500 text-white'
                      : 'bg-[#6c5ce7] hover:bg-[#5f4dd0] text-white'
                  }`}
                >
                  {copiedField === 'export' ? 'Copied!' : `Copy ${exportFormat === 'prompt' ? 'AI Prompt' : exportFormat.toUpperCase()}`}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
