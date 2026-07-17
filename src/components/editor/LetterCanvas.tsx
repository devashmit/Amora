import React from 'react';
import { PaperStyle, FontFamily, Decoration, StickerPlacement } from '@/types';
import { StickerLayer } from './StickerLayer';
import { Mail } from 'lucide-react';
import { PressedBotanical } from '../letter/WaxSeal';

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
  
  // Font Family styling class mapping
  const getFontClass = () => {
    switch (fontFamily) {
      case 'Dancing Script':
        return 'font-handwriting font-medium';
      case 'Cormorant Garamond':
        return 'font-heading font-light tracking-wide text-justify';
      case 'Playfair Display':
        return 'font-serif text-justify leading-relaxed';
      default:
        return 'font-ui';
    }
  };

  // Border layouts
  const getBorderClass = () => {
    switch (decorations.border_style) {
      case 'simple':
        return 'border border-current/30 m-4';
      case 'ornate':
        return 'border-4 border-double border-current/25 m-4';
      case 'floral':
        return 'border border-dashed border-current/35 m-4';
      default:
        return '';
    }
  };

  // Maps letter styles to actual luxury backgrounds
  const getPaperBgClass = () => {
    switch (paperStyle) {
      case 'parchment':
        return 'paper-pressed-grain bg-[#F5EFE4] text-[#3D2C1E]';
      case 'blush':
        return 'paper-rose-fibers bg-[#FAF0F0] text-[#5A3835]';
      case 'cream':
        return 'paper-cotton-fibers bg-[#FCFAF5] text-[#2C2117]';
      case 'navy':
        return 'paper-charcoal-fibers bg-[#1E2E2A] text-[#F3ECE0]';
      case 'ivory':
        return 'paper-cotton-fibers bg-[#FDFBF7] text-[#332A20]';
      case 'dark':
        return 'paper-charcoal-fibers bg-[#252629] text-[#E8E8E8]';
      default:
        return 'paper-cotton-fibers bg-[#FCFAF5] text-[#2C2117]';
    }
  };

  return (
    <div
      style={{ color: inkColor }}
      onClick={() => setSelectedId?.(null)}
      className={`relative w-full max-w-[650px] aspect-[3/4.2] shadow-2xl rounded-sm pt-14 pb-10 px-10 md:pt-20 md:pb-14 md:px-16 transition-all duration-500 overflow-hidden select-none deckled-edges-premium ${getPaperBgClass()} ${fontFamily === 'Dancing Script' ? 'paper-lined' : ''}`}
    >
      {/* Delicate organic overlay lighting */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-black/5 via-transparent to-white/10" />

      {/* Realistic Fold Creases */}
      <div className="letter-fold-crease letter-fold-crease-top opacity-70" />
      <div className="letter-fold-crease letter-fold-crease-bottom opacity-70" />

      {/* Decorative Borders */}
      {decorations.border_style && decorations.border_style !== 'none' && (
        <div className={`absolute inset-0 pointer-events-none rounded-sm ${getBorderClass()}`} />
      )}

      {/* Elegant Floral Watermark/Engraving */}
      {decorations.floral_print && decorations.floral_print !== 'none' && (
        <div className="absolute inset-[10%] pointer-events-none z-0 select-none flex items-center justify-center opacity-10 mix-blend-multiply">
          <PressedBotanical
            type={decorations.floral_print}
            className="w-[280px] h-[280px] md:w-[360px] md:h-[360px]"
            style={{ color: 'currentColor' }}
          />
        </div>
      )}

      {/* Postage Stamp */}
      {decorations.postage_stamp && (
        <div className="absolute top-8 right-8 w-14 h-16 border border-dashed border-current/40 flex flex-col items-center justify-center rotate-3 opacity-60 select-none">
          <div className="text-center font-heading text-[7px] uppercase tracking-widest flex flex-col items-center">
            <span>Amora</span>
            <Mail className="w-4 h-4 my-0.5 text-current/80" />
            <span>Post</span>
          </div>
        </div>
      )}

      {/* Content wrapper with generous margins */}
      <div className={`h-full flex flex-col justify-between relative z-10 ${getFontClass()}`}>
        
        {/* Recipient Field */}
        <div className="mb-6 pt-2">
          <span className="text-xs uppercase tracking-widest opacity-40 font-sans mr-2 block mb-1">Dearest,</span>
          {readOnly ? (
            <span className="text-xl md:text-2xl font-semibold border-b border-transparent leading-relaxed">{toName || 'Someone Special'}</span>
          ) : (
            <input
              type="text"
              placeholder="Recipient name"
              value={toName}
              onChange={(e) => setToName?.(e.target.value)}
              className="bg-transparent border-b border-current/20 hover:border-current/40 focus:border-current focus:outline-none text-xl md:text-2xl font-semibold w-[220px] py-0.5 transition-colors"
            />
          )}
        </div>

        {/* Message Editor Area */}
        <div className="flex-grow flex items-start my-2 overflow-hidden">
          {readOnly ? (
            <p
              style={{ fontSize: `${fontSize}px`, lineHeight: fontFamily === 'Dancing Script' ? '2rem' : '1.75' }}
              className="w-full whitespace-pre-wrap select-text break-words overflow-y-auto max-h-full py-2 pr-2 scrollbar-thin text-left font-serif"
            >
              {message || 'Write a letter full of beautiful thoughts...'}
            </p>
          ) : (
            <textarea
              placeholder="Write it with flowers. Send it with love. (Max 1000 characters)"
              maxLength={1000}
              value={message}
              onChange={(e) => setMessage?.(e.target.value)}
              style={{ fontSize: `${fontSize}px`, lineHeight: fontFamily === 'Dancing Script' ? '2rem' : '1.75' }}
              className="w-full h-full bg-transparent text-left focus:outline-none resize-none placeholder-current/30 py-2 scrollbar-thin"
            />
          )}
        </div>

        {/* Sender / Signature Block */}
        <div className="flex flex-col items-end mt-6 pr-2">
          <span className="text-xs uppercase tracking-widest opacity-45 font-sans mb-1">Signed,</span>
          <div className="flex justify-end items-center">
            {readOnly ? (
              <span 
                className="text-2xl font-handwriting italic rotate-[-1.5deg] block font-bold brightness-[0.75]"
                style={{ textShadow: '0.5px 0.5px 0.5px rgba(255,255,255,0.4)' }}
              >
                {fromName || 'Forever Yours'}
              </span>
            ) : (
              <input
                type="text"
                placeholder="Your name"
                value={fromName}
                onChange={(e) => setFromName?.(e.target.value)}
                className="bg-transparent border-b border-current/20 hover:border-current/40 focus:border-current focus:outline-none text-lg md:text-xl font-handwriting italic w-[180px] py-0.5 transition-colors"
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
