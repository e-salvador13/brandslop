import * as fs from 'fs';

// Load existing curated brands
const curatedData = JSON.parse(fs.readFileSync('data/brands.json', 'utf-8'));
const scrapedData = JSON.parse(fs.readFileSync('data/scraped-brands.json', 'utf-8'));

// Get curated brand IDs
const curatedIds = new Set(curatedData.brands.map((b: any) => b.id));

// Filter scraped brands that aren't already curated
const newBrands = scrapedData.brands.filter((b: any) => !curatedIds.has(b.id));

console.log(`Curated brands: ${curatedData.brands.length}`);
console.log(`Scraped brands: ${scrapedData.brands.length}`);
console.log(`New brands to add: ${newBrands.length}`);

// Merge
const merged = {
  brands: [...curatedData.brands, ...newBrands],
  aesthetics: curatedData.aesthetics,
  categories: [...new Set([...curatedData.categories, 'Brand'])],
  moodTags: curatedData.moodTags
};

// Save merged file
fs.writeFileSync('data/brands-merged.json', JSON.stringify(merged, null, 2));
console.log(`Total brands: ${merged.brands.length}`);
console.log('Saved to data/brands-merged.json');
