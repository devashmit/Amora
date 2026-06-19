import React from 'react';
import { FontFamily } from '@/types';

interface TextControlsProps {
  fontFamily: FontFamily;
  setFontFamily: (val: FontFamily) => void;
  fontSize: number;
  setFontSize: (val: number) => void;
  inkColor: string;
  setInkColor: (val: string) => void;
}

export const TextControls: React.FC<TextControlsProps> = ({
  fontFamily,
  setFontFamily,
  fontSize,
  setFontSize,
  inkColor,
  setInkColor,
}) => {
  const fonts: FontFamily[] = ['Dancing Script', 'Cormorant Garamond', 'Playfair Display'];

  const colors = [
    { name: 'Charcoal Ink', hex: '#2C1810' },
    { name: 'Crimson Rose', hex: '#8B3A3A' },
    { name: 'Sage Green', hex: '#2E4F4F' },
    { name: 'Imperial Gold', hex: '#B8976A' },
    { name: 'Deep Indigo', hex: '#1D2A44' },
  ];

  return (
    <div className="space-y-4 font-ui">
      <h3 className="text-sm font-semibold tracking-wider text-amora-ink/80 uppercase">2. Typography & Ink</h3>
      
      {/* Font Selection */}
      <div className="space-y-2">
        <label className="text-xs text-amora-ink/60">Font Style</label>
        <div className="grid grid-cols-3 gap-2">
          {fonts.map((f) => (
            <button
              key={f}
              onClick={() => setFontFamily(f)}
              className={`py-2 px-1 text-xs rounded border transition-all duration-300 ${
                fontFamily === f
                  ? 'border-amora-rose bg-amora-rose/5 text-amora-rose font-medium shadow-sm'
                  : 'border-amora-ink/10 hover:border-amora-ink/20 text-amora-ink'
              }`}
            >
              <span className={f === 'Dancing Script' ? 'font-handwriting text-sm' : f === 'Cormorant Garamond' ? 'font-heading text-sm' : 'font-serif text-xs'}>
                {f}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Font Size Slider */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-amora-ink/60">
          <span>Ink Size</span>
          <span className="font-semibold">{fontSize}px</span>
        </div>
        <input
          type="range"
          min="12"
          max="32"
          value={fontSize}
          onChange={(e) => setFontSize(parseInt(e.target.value))}
          className="w-full accent-amora-rose bg-amora-ink/10 h-1 rounded-lg cursor-pointer"
        />
      </div>

      {/* Ink Colors */}
      <div className="space-y-2">
        <label className="text-xs text-amora-ink/60 block">Ink Color</label>
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            {colors.map((c) => (
              <button
                key={c.hex}
                onClick={() => setInkColor(c.hex)}
                style={{ backgroundColor: c.hex }}
                className={`w-7 h-7 rounded-full border transition-all duration-300 transform hover:scale-110 active:scale-95 ${
                  inkColor === c.hex
                    ? 'ring-2 ring-amora-rose ring-offset-2 scale-105'
                    : 'border-white shadow-sm'
                }`}
                title={c.name}
              />
            ))}
          </div>
          {/* Custom color picker */}
          <div className="flex items-center border border-amora-ink/10 rounded-full p-1 pl-2.5 gap-1.5 bg-white shadow-sm">
            <span className="text-[10px] text-amora-ink/50 uppercase font-semibold">Custom</span>
            <input
              type="color"
              value={inkColor}
              onChange={(e) => setInkColor(e.target.value)}
              className="w-6 h-6 border-0 rounded-full cursor-pointer overflow-hidden p-0 bg-transparent flex items-center justify-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
