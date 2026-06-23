import React from 'react';
import { Decoration } from '@/types';
import { Grid, Award, Mail, Feather, X } from 'lucide-react';

interface DecorationPanelProps {
  decorations: Decoration;
  setDecorations: (val: Decoration | ((prev: Decoration) => Decoration)) => void;
}

export const DecorationPanel: React.FC<DecorationPanelProps> = ({
  decorations,
  setDecorations,
}) => {
  const borderStyles: { id: 'none' | 'simple' | 'ornate' | 'floral'; name: string }[] = [
    { id: 'none', name: 'No Border' },
    { id: 'simple', name: 'Simple Line' },
    { id: 'ornate', name: 'Ornate Frame' },
    { id: 'floral', name: 'Floral Dash' },
  ];

  const seals: { id: 'heart' | 'star' | 'moon' | 'floral' | null; name: string; icon: string }[] = [
    { id: null, name: 'No Seal', icon: '' },
    { id: 'heart', name: 'Heart Seal', icon: '❤️' },
    { id: 'star', name: 'Star Seal', icon: '⭐' },
    { id: 'moon', name: 'Moon Seal', icon: '🌙' },
    { id: 'floral', name: 'Floral Seal', icon: '🌸' },
  ];

  const updateDecorations = (updates: Partial<Decoration>) => {
    setDecorations((prev) => ({ ...prev, ...updates }));
  };

  return (
    <div className="space-y-4 font-ui">
      <h3 className="text-sm font-semibold tracking-wider text-amora-ink/80 uppercase flex items-center gap-1.5">
        <Feather className="w-4 h-4 text-amora-gold" />
        <span>3. Framing & Seals</span>
      </h3>

      {/* Border Styles */}
      <div className="space-y-2">
        <label className="text-xs text-amora-ink/60 flex items-center gap-1">
          <Grid className="w-3 h-3 text-amora-rose" />
          <span>Border Layout</span>
        </label>
        <div className="grid grid-cols-2 gap-2">
          {borderStyles.map((b) => (
            <button
              key={b.id}
              onClick={() => updateDecorations({ border_style: b.id })}
              className={`py-2 px-3 text-xs rounded border text-left transition-all duration-300 ${
                decorations.border_style === b.id
                  ? 'border-amora-rose bg-amora-rose/5 text-amora-rose font-medium shadow-sm'
                  : 'border-amora-ink/10 hover:border-amora-ink/20 text-amora-ink'
              }`}
            >
              {b.name}
            </button>
          ))}
        </div>
      </div>

      {/* Wax Seals */}
      <div className="space-y-2">
        <label className="text-xs text-amora-ink/60 flex items-center gap-1">
          <Award className="w-3 h-3 text-amora-rose" />
          <span>Wax Seal (Seals the note)</span>
        </label>
        <div className="grid grid-cols-5 gap-1.5">
          {seals.map((s) => (
            <button
              key={s.id || 'none'}
              onClick={() => updateDecorations({ seal_type: s.id })}
              className={`py-2 rounded border flex flex-col items-center justify-center gap-1 transition-all duration-300 ${
                decorations.seal_type === s.id
                  ? 'border-amora-rose bg-amora-rose/5 text-amora-rose font-semibold'
                  : 'border-amora-ink/10 hover:border-amora-ink/20 text-amora-ink'
              }`}
              title={s.name}
            >
              <span className="text-base flex items-center justify-center">
                {s.id === null ? <X className="w-4 h-4 text-amora-ink/50" /> : s.icon}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Postage Stamp Checkbox */}
      <div className="flex items-center gap-3 pt-1">
        <label className="relative flex items-center cursor-pointer select-none">
          <input
            type="checkbox"
            checked={decorations.postage_stamp || false}
            onChange={(e) => updateDecorations({ postage_stamp: e.target.checked })}
            className="sr-only peer"
          />
          <div className="w-9 h-5 bg-amora-ink/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amora-rose" />
          <span className="ml-3 text-xs font-medium text-amora-ink/80 flex items-center gap-1">
            <Mail className="w-3.5 h-3.5 text-amora-rose" />
            <span>Attach Vintage Postage Stamp</span>
          </span>
        </label>
      </div>
    </div>
  );
};
