import * as fs from 'fs';

// Load current brands
const currentData = JSON.parse(fs.readFileSync('data/brands.json', 'utf-8'));

// Load all rich brand files
const richFiles = [
  'data/rich-brands.json',
  'data/rich-brands-batch2.json',
  'data/rich-brands-final.json',
  'data/rich-brands-consumer.json',
  'data/rich-brands-enterprise.json',
  'data/rich-brands-batch3.json',
  'data/rich-brands-batch4.json',
  'data/rich-brands-batch5.json',
  'data/rich-brands-batch6.json',
  'data/rich-brands-batch7.json',
  'data/rich-brands-requested.json',
  'data/rich-brands-social.json'
];

const richBrandsMap = new Map();

for (const file of richFiles) {
  try {
    const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
    data.brands.forEach((b: any) => richBrandsMap.set(b.id, b));
  } catch (e) {
    console.log(`Skipping ${file}`);
  }
}

console.log(`Loaded ${richBrandsMap.size} rich brands`);

// Replace brands with rich versions where available
let enrichedCount = 0;
const existingIds = new Set(currentData.brands.map((b: any) => b.id));
const updatedBrands = currentData.brands.map((brand: any) => {
  const richVersion = richBrandsMap.get(brand.id);
  if (richVersion) {
    enrichedCount++;
    console.log(`✓ ${brand.name}`);
    return richVersion;
  }
  return brand;
});

// Add new brands that don't exist yet
let addedCount = 0;
for (const [id, brand] of richBrandsMap) {
  if (!existingIds.has(id)) {
    updatedBrands.push(brand);
    addedCount++;
    console.log(`+ ${(brand as any).name} (new)`);
  }
}

// Save
const output = {
  ...currentData,
  brands: updatedBrands
};

fs.writeFileSync('data/brands.json', JSON.stringify(output, null, 2));
console.log(`\nTotal brands: ${updatedBrands.length}`);
console.log(`Enriched: ${enrichedCount}`);
console.log(`Added new: ${addedCount}`);
