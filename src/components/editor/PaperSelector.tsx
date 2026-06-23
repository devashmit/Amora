import React from 'react';
import { PaperStyle } from '@/types';
import { FileText } from 'lucide-react';

interface PaperSelectorProps {
  currentStyle: PaperStyle;
  onChange: (style: PaperStyle) => void;
}

export const PaperSelector: React.FC<PaperSelectorProps> = ({
  currentStyle,
  onChange,
}) => {
  const styles: { id: PaperStyle; name: string; class: string }[] = [
    { id: 'parchment', name: 'Parchment', class: 'paper-parchment' },
    { id: 'blush', name: 'Blush Wash', class: 'paper-blush' },
    { id: 'cream', name: 'Linen Cream', class: 'paper-cream' },
    { id: 'navy', name: 'Midnight Navy', class: 'paper-navy' },
    { id: 'ivory', name: 'Soft Ivory', class: 'paper-ivory' },
    { id: 'dark', name: 'Dark Ink', class: 'paper-dark' },
  ];

  return (
    <div className="space-y-3 font-ui">
      <h3 className="text-sm font-semibold tracking-wider text-amora-ink/80 uppercase flex items-center gap-1.5">
        <FileText className="w-4 h-4 text-amora-gold" />
        <span>1. Paper Texture</span>
      </h3>
      <div className="grid grid-cols-3 gap-2.5">
        {styles.map((style) => (
          <button
            key={style.id}
            onClick={() => onChange(style.id)}
            className={`h-11 rounded-lg border-2 flex items-center justify-center text-xs font-semibold transition-all duration-300 transform active:scale-95 shadow-sm ${style.class} ${
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
