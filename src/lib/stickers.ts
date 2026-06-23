export interface StickerAsset {
  id: string;
  name: string;
  category: 'bouquet' | 'single' | 'botanical' | 'dried' | 'branch';
  tags: string[];
  svgMarkup: string; // Inline SVG markup representing the premade flower
}

export const STICKERS: StickerAsset[] = [
  {
    id: 'romantic-rose-bouquet',
    name: 'Romantic Rose Bouquet',
    category: 'bouquet',
    tags: ['rose', 'love', 'pink', 'bouquet', 'romantic'],
    svgMarkup: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
      <image href="/stickers/romantic-rose-bouquet.png" x="0" y="0" width="100" height="100" />
    </svg>`
  },
  {
    id: 'wildflower-meadow-bouquet',
    name: 'Wildflower Meadow',
    category: 'bouquet',
    tags: ['wildflower', 'daisy', 'meadow', 'mixed'],
    svgMarkup: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
      <image href="/stickers/wildflower-meadow-bouquet.png" x="0" y="0" width="100" height="100" />
    </svg>`
  },
  {
    id: 'sunflower-fields-bouquet',
    name: 'Sunflower Fields',
    category: 'bouquet',
    tags: ['sunflower', 'yellow', 'summer', 'bright'],
    svgMarkup: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
      <image href="/stickers/sunflower-fields-bouquet.png" x="0" y="0" width="100" height="100" />
    </svg>`
  },
  {
    id: 'lavender-breeze-bouquet',
    name: 'Lavender Breeze',
    category: 'bouquet',
    tags: ['lavender', 'purple', 'calm', 'aroma'],
    svgMarkup: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
      <image href="/stickers/lavender-breeze-bouquet.png" x="0" y="0" width="100" height="100" />
    </svg>`
  },
  {
    id: 'cherry-blossom-cascade',
    name: 'Cherry Cascade',
    category: 'bouquet',
    tags: ['cherry', 'blossom', 'spring', 'pink', 'delicate'],
    svgMarkup: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
      <image href="/stickers/cherry-blossom-cascade.png" x="0" y="0" width="100" height="100" />
    </svg>`
  },
  {
    id: 'eucalyptus-fern-foliage',
    name: 'Eucalyptus & Fern',
    category: 'bouquet',
    tags: ['eucalyptus', 'fern', 'greenery', 'foliage', 'fresh'],
    svgMarkup: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
      <image href="/stickers/eucalyptus-fern-foliage.png" x="0" y="0" width="100" height="100" />
    </svg>`
  },
  {
    id: 'crimson-tulip-delight',
    name: 'Crimson Tulip Delight',
    category: 'bouquet',
    tags: ['tulip', 'red', 'spring', 'vibrant'],
    svgMarkup: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
      <image href="/stickers/crimson-tulip-delight.png" x="0" y="0" width="100" height="100" />
    </svg>`
  },
  {
    id: 'antique-pastel-bouquet',
    name: 'Antique Pastel',
    category: 'bouquet',
    tags: ['peony', 'pastel', 'vintage', 'hydrangea'],
    svgMarkup: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
      <image href="/stickers/antique-pastel-bouquet.png" x="0" y="0" width="100" height="100" />
    </svg>`
  }
];
