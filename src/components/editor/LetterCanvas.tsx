import React from 'react';
import { PaperStyle, FontFamily, Decoration, StickerPlacement } from '@/types';
import { StickerLayer } from './StickerLayer';
import { Mail } from 'lucide-react';

interface LetterCanvasProps {
  toName: string;
  setToName?: (val: string) => void;
  fromName: string;
  setFromName?: (val: string) => void;
  message: string;
  setMessage?: (val: string) => void;
  paperStyle: PaperStyle;
  fontFamily: FontFamily;
  fontSize: number;
  inkColor: string;
  stickers: StickerPlacement[];
  updateSticker: (index: number, updates: Partial<StickerPlacement>) => void;
  deleteSticker: (index: number) => void;
  selectedId: number | null;
  setSelectedId: (id: number | null) => void;
  decorations: Decoration;
  readOnly?: boolean;
  bringToFront?: (index: number) => void;
}

export const LetterCanvas: React.FC<LetterCanvasProps> = ({
  toName,
  setToName,
  fromName,
  setFromName,
  message,
  setMessage,
  paperStyle,
  fontFamily,
  fontSize,
  inkColor,
  stickers,
  updateSticker,
  deleteSticker,
  selectedId,
  setSelectedId,
  decorations,
  readOnly = false,
  bringToFront,
}) => {
  
  // Set correct CSS font family class
  const getFontClass = () => {
    switch (fontFamily) {
      case 'Dancing Script':
        return 'font-handwriting';
      case 'Cormorant Garamond':
        return 'font-heading';
      case 'Playfair Display':
        return 'font-serif';
      default:
        return 'font-ui';
    }
  };

  // Border decorations
  const getBorderClass = () => {
    switch (decorations.border_style) {
      case 'simple':
        return 'border-2 border-current';
      case 'ornate':
        return 'border-4 border-double border-current';
      case 'floral':
        return 'border-2 border-dashed border-current';
      default:
        return '';
    }
  };

  return (
    <div
      style={{ color: inkColor }}
      onClick={() => setSelectedId?.(null)}
      className={`relative w-full max-w-[650px] aspect-[4/5] md:aspect-[3/4] shadow-2xl rounded-sm pt-12 pb-8 px-8 md:pt-16 md:pb-12 md:px-12 transition-all duration-500 overflow-hidden select-none paper-${paperStyle} deckled-edges paper-fibers botanical-watermark ${fontFamily === 'Dancing Script' ? 'paper-lined' : ''}`}
    >
      {/* Texture overlays */}
      <div className="absolute inset-0 opacity-15 pointer-events-none mix-blend-multiply bg-cover bg-center" />

      {/* Border Decoration */}
      {decorations.border_style && decorations.border_style !== 'none' && (
        <div className={`absolute inset-4 pointer-events-none rounded-lg ${getBorderClass()}`} />
      )}

      {/* Postage Stamp Decoration */}
      {decorations.postage_stamp && (
        <div className="absolute top-6 right-6 w-16 h-20 border-2 border-dashed border-current flex flex-col items-center justify-center rotate-3 opacity-80 select-none">
          <div className="text-center font-heading text-[8px] uppercase tracking-widest flex flex-col items-center">
            <span>Amora</span>
            <Mail className="w-5 h-5 my-0.5 text-current" />
            <span>Love</span>
          </div>
        </div>
      )}

      {/* Content wrapper */}
      <div className={`h-full flex flex-col justify-between relative z-10 ${getFontClass()}`}>
        {/* Recipient Field */}
        <div className="mb-4 pt-1">
          <span className="text-sm md:text-base opacity-75 mr-2">Dearest,</span>
          {readOnly ? (
            <span className="text-xl md:text-2xl font-semibold border-b border-transparent">{toName || 'Someone Special'}</span>
          ) : (
            <input
              type="text"
              placeholder="Recipient name"
              value={toName}
              onChange={(e) => setToName?.(e.target.value)}
              className="bg-transparent border-b border-current/25 hover:border-current/55 focus:border-current focus:outline-none text-xl md:text-2xl font-semibold w-[200px] py-1 transition-colors"
            />
          )}
        </div>

        {/* Message Editor Area */}
        <div className="flex-grow flex items-center justify-center my-4 overflow-hidden">
          {readOnly ? (
            <p
              style={{ fontSize: `${fontSize}px`, lineHeight: 1.6 }}
              className="w-full text-center whitespace-pre-wrap select-text break-words overflow-y-auto max-h-full py-4"
            >
              {message || 'Write a letter full of beautiful thoughts...'}
            </p>
          ) : (
            <textarea
              placeholder="Write it with flowers. Send it with love. (Max 1000 characters)"
              maxLength={1000}
              value={message}
              onChange={(e) => setMessage?.(e.target.value)}
              style={{ fontSize: `${fontSize}px`, lineHeight: 1.6 }}
              className="w-full h-full bg-transparent text-center focus:outline-none resize-none placeholder-current/40 py-4"
            />
          )}
        </div>

        {/* Sender / Seal Field */}
        <div className="flex flex-col items-center justify-end relative mt-2">
          {/* Wax Seal rendering */}
          {decorations.seal_type && (
            <div className="absolute -top-12 animate-bounce duration-1000 flex flex-col items-center select-none cursor-pointer">
              <div className="w-12 h-12 bg-amora-seal rounded-full border-4 border-amber-600/30 flex items-center justify-center text-white text-xl shadow-lg relative transform hover:scale-105 active:scale-95 transition-transform">
                {decorations.seal_type === 'heart' && '❤️'}
                {decorations.seal_type === 'star' && '⭐'}
                {decorations.seal_type === 'moon' && '🌙'}
                {decorations.seal_type === 'floral' && '🌸'}
              </div>
            </div>
          )}

          <div className="w-full flex justify-end items-center">
            <span className="text-sm md:text-base opacity-75 mr-2">With love,</span>
            {readOnly ? (
              <span className="text-lg md:text-xl font-semibold border-b border-transparent">{fromName || 'Forever Yours'}</span>
            ) : (
              <input
                type="text"
                placeholder="Your name"
                value={fromName}
                onChange={(e) => setFromName?.(e.target.value)}
                className="bg-transparent border-b border-current/25 hover:border-current/55 focus:border-current focus:outline-none text-lg md:text-xl font-semibold w-[160px] py-0 transition-colors"
              />
            )}
          </div>
        </div>
      </div>

      {/* Stickers Overlay */}
      <StickerLayer
        stickers={stickers}
        updateSticker={updateSticker}
        deleteSticker={deleteSticker}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        readOnly={readOnly}
        bringToFront={bringToFront}
      />
    </div>
  );
};
