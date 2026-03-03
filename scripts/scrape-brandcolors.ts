import { chromium } from 'playwright';
import * as fs from 'fs';

async function scrapeBrandColors() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  console.log('Navigating to brandcolors.net...');
  await page.goto('https://brandcolors.net/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  
  const brands = await page.evaluate(() => {
    const results: { id: string; name: string; colors: string[] }[] = [];
    
    const brandArticles = document.querySelectorAll('article.brand');
    console.log('Found', brandArticles.length, 'brand articles');
    
    brandArticles.forEach((article) => {
      const slug = article.getAttribute('data-slug') || '';
      const titleEl = article.querySelector('.brand-title');
      const name = titleEl?.textContent?.replace(/\s*✓\s*$/, '').trim() || slug;
      
      // Get colors from the brand-colors list
      const colorList = article.querySelector('.brand-colors');
      const colorItems = colorList?.querySelectorAll('li') || [];
      const colors: string[] = [];
      
      colorItems.forEach((li) => {
        // Colors might be in style, data attributes, or text
        const style = li.getAttribute('style') || '';
        const bgMatch = style.match(/background(?:-color)?:\s*([#0-9a-fA-F]+)/i);
        if (bgMatch) {
          colors.push(bgMatch[1].toUpperCase());
        }
        
        // Also check inner text for hex
        const text = li.textContent?.trim() || '';
        if (text.match(/^#?[0-9a-fA-F]{6}$/)) {
          colors.push(text.startsWith('#') ? text.toUpperCase() : `#${text.toUpperCase()}`);
        }
      });
      
      // Fallback: look for hex codes in the article HTML
      if (colors.length === 0) {
        const articleHtml = article.innerHTML;
        const hexMatches = articleHtml.match(/#[0-9a-fA-F]{6}/gi) || [];
        colors.push(...[...new Set(hexMatches)].map(c => c.toUpperCase()));
      }
      
      if (name && colors.length > 0) {
        results.push({ 
          id: slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-'), 
          name, 
          colors: [...new Set(colors)] 
        });
      }
    });
    
    return results;
  });
  
  console.log(`Found ${brands.length} brands`);
  
  await browser.close();
  
  if (brands.length > 0) {
    // Format for our schema
    const formattedBrands = brands.map(brand => ({
      id: brand.id,
      name: brand.name,
      category: "Brand",
      public: true,
      colors: {
        primary: brand.colors.slice(0, 5).map((hex, i) => ({
          name: `${brand.name} ${i === 0 ? 'Primary' : `Color ${i + 1}`}`,
          hex
        })),
        ...(brand.colors.length > 5 ? {
          secondary: brand.colors.slice(5).map((hex, i) => ({
            name: `${brand.name} Secondary ${i + 1}`,
            hex
          }))
        } : {})
      },
      typography: { 
        headings: "Brand font", 
        body: "System font",
        fallback: "system-ui, sans-serif"
      },
      designPrinciples: [],
      iconStyle: "",
      mood: []
    }));
    
    fs.writeFileSync(
      'data/scraped-brands.json', 
      JSON.stringify({ brands: formattedBrands, scrapedAt: new Date().toISOString() }, null, 2)
    );
    console.log(`Saved ${formattedBrands.length} brands to data/scraped-brands.json`);
  }
}

scrapeBrandColors().catch(console.error);
