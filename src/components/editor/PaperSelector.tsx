import React from 'react';
import { PaperStyle } from '@/types';

interface PaperSelectorProps {
  currentStyle: PaperStyle;
  onChange: (style: PaperStyle) => void;
}

export const PaperSelector: React.FC<PaperSelectorProps> = ({
  currentStyle,
  onChange,
}) => {
  const styles: { id: PaperStyle; name: string; class: string }[] = [
    { id: 'parchment', name: 'Parchment', class: 'bg-[#f5e6d3] border-amber-800/25' },
    { id: 'blush', name: 'Blush Wash', class: 'bg-[#f9e8e8] border-red-300' },
    { id: 'cream', name: 'Linen Cream', class: 'bg-[#fdfbf5] border-yellow-800/10' },
    { id: 'navy', name: 'Midnight Navy', class: 'bg-[#1a2744] border-blue-900' },
    { id: 'ivory', name: 'Soft Ivory', class: 'bg-[#fffff0] border-yellow-100' },
    { id: 'dark', name: 'Dark Ink', class: 'bg-[#1a0f0a] border-amber-950' },
  ];

  return (
    <div className="space-y-3 font-ui">
      <h3 className="text-sm font-semibold tracking-wider text-amora-ink/80 uppercase">1. Paper Texture</h3>
      <div className="grid grid-cols-3 gap-2.5">
        {styles.map((style) => (
          <button
            key={style.id}
            onClick={() => onChange(style.id)}
            className={`h-11 rounded-lg border-2 flex items-center justify-center text-xs font-medium transition-all duration-300 transform active:scale-95 ${style.class} ${
              currentStyle === style.id
                ? 'ring-2 ring-amora-rose border-transparent scale-102 shadow-md'
                : 'opacity-85 hover:opacity-100 hover:scale-101 border-amora-ink/10'
            }`}
          >
            <span className={style.id === 'navy' || style.id === 'dark' ? 'text-amora-cream' : 'text-amora-ink'}>
              {style.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
