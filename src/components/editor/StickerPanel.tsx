import React, { useState } from 'react';
import { STICKERS } from '@/lib/stickers';
import { Flower } from 'lucide-react';

interface StickerPanelProps {
  onAddSticker: (stickerId: string) => void;
}

export const StickerPanel: React.FC<StickerPanelProps> = ({ onAddSticker }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'All Bouquets' },
    { id: 'bouquet', name: 'Bouquets' },
    { id: 'single', name: 'Singles' },
    { id: 'botanical', name: 'Botanicals' },
    { id: 'dried', name: 'Dried' },
    { id: 'branch', name: 'Branches' },
  ];

  const filteredStickers = activeCategory === 'all'
    ? STICKERS
    : STICKERS.filter((s) => s.category === activeCategory);

  return (
    <div className="space-y-4 font-ui h-full flex flex-col">
      <div className="space-y-1">
        <h3 className="text-sm font-semibold tracking-wider text-amora-ink/80 uppercase flex items-center gap-1.5">
          <Flower className="w-4 h-4 text-amora-gold" />
          <span>4. Add Miniature Bouquets</span>
        </h3>
        <p className="text-[11px] text-amora-ink/50">Click on a bouquet to add it, then drag, rotate, or resize it on the canvas.</p>
      </div>

      {/* Categories Scroller */}
      <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-none flex-shrink-0">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`py-1 px-3 text-[10px] uppercase font-semibold rounded-full border whitespace-nowrap transition-all duration-300 ${
              activeCategory === cat.id
                ? 'bg-amora-rose border-transparent text-white shadow-sm'
                : 'bg-white border-amora-ink/10 text-amora-ink/80 hover:border-amora-ink/20'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Stickers Grid */}
      <div className="grid grid-cols-4 gap-3 overflow-y-auto max-h-[300px] md:max-h-[380px] p-1 bg-amora-ink/5 rounded-xl flex-grow scrollbar-thin">
        {filteredStickers.map((sticker) => (
          <button
            key={sticker.id}
            onClick={() => onAddSticker(sticker.id)}
            className="aspect-square bg-white rounded-lg border border-amora-ink/5 flex flex-col items-center justify-center p-2 transition-all duration-300 hover:scale-105 hover:shadow-md active:scale-95 group"
          >
            <div 
              className="w-10 h-10 filter drop-shadow-sm group-hover:animate-wiggle duration-1000"
              dangerouslySetInnerHTML={{ __html: sticker.svgMarkup }}
            />
            <span className="text-[9px] text-amora-ink/65 truncate max-w-full mt-1.5 font-medium leading-none text-center">
              {sticker.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
