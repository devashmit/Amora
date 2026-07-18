'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PaperStyle, FontFamily, Decoration, StickerPlacement } from '@/types';
import { LetterCanvas } from './LetterCanvas';
import { RefreshCw } from 'lucide-react';
import { WaxSeal, PressedBotanical } from '../letter/WaxSeal';

interface EnvelopeSealPreviewProps {
  toName: string;
  fromName: string;
  message: string;
  paperStyle: PaperStyle;
  fontFamily: FontFamily;
  fontSize: number;
  inkColor: string;
  stickers: StickerPlacement[];
  decorations: Decoration;
}

export const ENVELOPE_COLORS = {
  ivory: {
    back: '#FDFBF7',
    flap: '#FAF8F3',
    flapDark: '#ECE8DF',
    diagonals: '#FCFAF5',
    diagonalsDark: '#EDEAE2',
    bottom: '#F9F6F0',
    bottomDark: '#E5E0D5',
    text: '#524335',
    accent: '#D4AF37',
    waxColor: '#8A151B',
    botanicalType: 'wildflower' as const,
    paperTexture: 'paper-cotton-fibers',
    name: 'Classic Ivory',
    desc: 'Warm ivory cotton paper with embossed botanicals'
  },
  forest: {
    back: '#1E3326',
    flap: '#1A2E21',
    flapDark: '#132219',
    diagonals: '#223A2C',
    diagonalsDark: '#15261B',
    bottom: '#203629',
    bottomDark: '#122318',
    text: '#E3DCB8',
    accent: '#8EB59E',
    waxColor: '#C49746',
    botanicalType: 'fern' as const,
    paperTexture: 'paper-linen-weave',
    name: 'Forest Green Linen',
    desc: 'Rich forest green stock with pressed fern details'
  },
  midnight: {
    back: '#152033',
    flap: '#121C2E',
    flapDark: '#0B1220',
    diagonals: '#19273D',
    diagonalsDark: '#0D1626',
    bottom: '#172338',
    bottomDark: '#0C1424',
    text: '#E3C18F',
    accent: '#D1B07C',
    waxColor: '#2B4C7E',
    botanicalType: 'wildflower' as const,
    paperTexture: 'paper-cotton-fibers',
    name: 'Midnight Blue Cotton',
    desc: 'Deep navy cotton paper with gold-pressed wildflowers'
  },
  rose: {
    back: '#F5E3E1',
    flap: '#F0DADB',
    flapDark: '#DEBDC0',
    diagonals: '#F9EBE9',
    diagonalsDark: '#E6C4C7',
    bottom: '#F4E0E2',
    bottomDark: '#DEB5B9',
    text: '#6B403D',
    accent: '#DBA8A4',
    waxColor: '#C66864',
    botanicalType: 'sakura' as const,
    paperTexture: 'paper-rose-fibers',
    name: 'Dusty Rose',
    desc: 'Soft warm pink paper with pressed sakura petals'
  },
  charcoal: {
    back: '#2D2E30',
    flap: '#262729',
    flapDark: '#1B1C1E',
    diagonals: '#343538',
    diagonalsDark: '#1E1F21',
    bottom: '#303134',
    bottomDark: '#1B1C1D',
    text: '#ECECEC',
    accent: '#A6A9AD',
    waxColor: '#3E3447',
    botanicalType: 'lavender' as const,
    paperTexture: 'paper-charcoal-fibers',
    name: 'Charcoal Black',
    desc: 'Dark cotton paper with embossed lavender illustrations'
  },
  parchment: {
    back: '#EBDCAE',
    flap: '#E3D3A2',
    flapDark: '#CDBC8A',
    diagonals: '#EDDFB8',
    diagonalsDark: '#C7B685',
    bottom: '#E8D9A8',
    bottomDark: '#C0B080',
    text: '#543D23',
    accent: '#9E774F',
    waxColor: '#8A5229',
    botanicalType: 'olive' as const,
    paperTexture: 'paper-pressed-grain',
    name: 'Parchment',
    desc: 'Pressed grain antique paper with slightly deckled edges'
  },
  // Fallbacks
  classic: {
    back: '#FDFBF7',
    flap: '#FAF8F3',
    flapDark: '#ECE8DF',
    diagonals: '#FCFAF5',
    diagonalsDark: '#EDEAE2',
    bottom: '#F9F6F0',
    bottomDark: '#E5E0D5',
    text: '#524335',
    accent: '#D4AF37',
    waxColor: '#8A151B',
    botanicalType: 'wildflower' as const,
    paperTexture: 'paper-cotton-fibers',
    name: 'Classic Cream',
    desc: 'Warm ivory cotton paper with embossed botanicals'
  },
  vintage: {
    back: '#EBDCAE',
    flap: '#E3D3A2',
    flapDark: '#CDBC8A',
    diagonals: '#EDDFB8',
    diagonalsDark: '#C7B685',
    bottom: '#E8D9A8',
    bottomDark: '#C0B080',
    text: '#543D23',
    accent: '#9E774F',
    waxColor: '#8A5229',
    botanicalType: 'olive' as const,
    paperTexture: 'paper-pressed-grain',
    name: 'Vintage Kraft',
    desc: 'Pressed grain antique paper with slightly deckled edges'
  },
  royal: {
    back: '#152033',
    flap: '#121C2E',
    flapDark: '#0B1220',
    diagonals: '#19273D',
    diagonalsDark: '#0D1626',
    bottom: '#172338',
    bottomDark: '#0C1424',
    text: '#E3C18F',
    accent: '#D1B07C',
    waxColor: '#2B4C7E',
    botanicalType: 'wildflower' as const,
    paperTexture: 'paper-cotton-fibers',
    name: 'Royal Navy',
    desc: 'Deep navy cotton paper with gold-pressed wildflowers'
  },
  blossom: {
    back: '#F5E3E1',
    flap: '#F0DADB',
    flapDark: '#DEBDC0',
    diagonals: '#F9EBE9',
    diagonalsDark: '#E6C4C7',
    bottom: '#F4E0E2',
    bottomDark: '#DEB5B9',
    text: '#6B403D',
    accent: '#DBA8A4',
    waxColor: '#C66864',
    botanicalType: 'sakura' as const,
    paperTexture: 'paper-rose-fibers',
    name: 'Blossom Pink',
    desc: 'Soft warm pink paper with pressed sakura petals'
  }
};

export const EnvelopeSealPreview: React.FC<EnvelopeSealPreviewProps> = ({
  toName,
  fromName,
  message,
  paperStyle,
  fontFamily,
  fontSize,
  inkColor,
  stickers,
  decorations,
}) => {
  const [animationStage, setAnimationStage] = useState<'idle' | 'sliding' | 'closing' | 'sealed'>('idle');

  const selectedStyle = decorations.envelope_style || 'ivory';
  const colors = ENVELOPE_COLORS[selectedStyle] || ENVELOPE_COLORS.ivory;

  useEffect(() => {
    setAnimationStage('idle');
    const slideTimer = setTimeout(() => setAnimationStage('sliding'), 1200);
    const closeTimer = setTimeout(() => setAnimationStage('closing'), 2800);
    const sealedTimer = setTimeout(() => setAnimationStage('sealed'), 3800);

    return () => {
      clearTimeout(slideTimer);
      clearTimeout(closeTimer);
      clearTimeout(sealedTimer);
    };
  }, [selectedStyle, decorations.seal_type]);

  const letterVariants = {
    idle: { y: -200, scale: 0.95, opacity: 1, rotate: -0.5 },
    sliding: {
      y: 190,
      scale: 0.9,
      opacity: 1,
      rotate: 0,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transition: { duration: 1.4, ease: [0.25, 1, 0.5, 1] as any }
    },
    closing: { y: 190, scale: 0.9 },
    sealed: { y: 190, scale: 0.9 }
  };

  const flapVariants = {
    idle: { rotateX: 0, zIndex: 30 },
    sliding: { rotateX: 0, zIndex: 30 },
    closing: {
      rotateX: 180,
      zIndex: 35,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transition: { duration: 0.9, ease: [0.65, 0, 0.35, 1] as any }
    },
    sealed: { rotateX: 180, zIndex: 35 }
  };

  const sealVariants = {
    idle: { scale: 0, opacity: 0, y: 10 },
    sliding: { scale: 0, opacity: 0, y: 10 },
    closing: { scale: 0, opacity: 0, y: 10 },
    sealed: {
      scale: 1,
      opacity: 1,
      y: 0,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transition: { type: 'spring' as any, stiffness: 220, damping: 12, delay: 0.15 }
    }
  };

  return (
    <div className="relative w-full max-w-[500px] h-[480px] flex flex-col items-center justify-end overflow-hidden pb-8 font-ui">
      {/* Soft natural lighting overlay running across the scene */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-black/5 via-transparent to-white/10 z-45" />

      {/* Animation Status Tag */}
      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-md border border-amora-gold/20 px-4 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-widest text-amora-ink/80 shadow-md z-50 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-amora-rose animate-ping" />
        {animationStage === 'idle' && 'Polishing Letter...'}
        {animationStage === 'sliding' && 'Inserting into Envelope...'}
        {animationStage === 'closing' && 'Folding Luxury Stationery...'}
        {animationStage === 'sealed' && 'Sealed & Ready'}
      </div>

      {/* Realistic Table Desk Placement Shadow */}
      <div className="absolute w-[380px] md:w-[460px] h-[24px] bg-black/15 rounded-full blur-xl bottom-8 left-1/2 transform -translate-x-1/2 pointer-events-none z-0" />

      {/* Main Envelope Perspective Container */}
      <div className="relative w-[340px] md:w-[420px] h-[240px] md:h-[290px] perspective-[1200px] flex items-center justify-center z-10">
        
        {/* ENVELOPE BACK LAYER */}
        <div 
          style={{ 
            backgroundColor: colors.back,
            boxShadow: 'inset 0 10px 30px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.1)'
          }}
          className={`absolute inset-0 rounded-xl overflow-hidden z-10 border border-white/5 ${colors.paperTexture}`}
        >
          {/* Internal shadow mimicking realistic paper pocket depth */}
          <div className="absolute inset-x-0 bottom-0 top-1/3 bg-gradient-to-t from-black/12 to-transparent" />
          
          {/* Embossed logo on back of pocket */}
          <div 
            style={{ color: colors.text }} 
            className="absolute top-8 left-1/2 -translate-x-1/2 text-[9px] tracking-[0.25em] uppercase font-bold opacity-10 select-none pointer-events-none filter drop-shadow-[0.5px_0.5px_0px_rgba(255,255,255,0.7)]"
          >
            Amora
          </div>

          {/* EMBOSSED BOTANICAL ILLUSTRATION */}
          <div className="absolute inset-[15%] pointer-events-none select-none flex items-center justify-center opacity-40">
            <PressedBotanical 
              type={colors.botanicalType} 
              className="w-48 h-48"
              style={{ color: colors.text }}
            />
          </div>
        </div>

        {/* PHYSICAL REALISM: THE MASKED POCKET CONTAINER */}
        <div className="absolute inset-x-[3%] bottom-0 h-[600px] overflow-hidden z-15 pointer-events-none">
          <motion.div
            variants={letterVariants}
            animate={animationStage}
            style={{ 
              boxShadow: animationStage === 'idle' 
                ? '0 20px 40px rgba(0,0,0,0.15), 0 0 1px rgba(0,0,0,0.1)' 
                : '0 4px 12px rgba(0,0,0,0.08)'
            }}
            className="absolute left-0 right-0 bottom-0 h-[380px] bg-white rounded-lg overflow-hidden origin-bottom"
          >
            {/* Letter Scale Container */}
            <div className="scale-[0.55] origin-top-left w-[181%] h-[181%]">
              <LetterCanvas
                toName={toName}
                fromName={fromName}
                message={message}
                paperStyle={paperStyle}
                fontFamily={fontFamily}
                fontSize={fontSize}
                inkColor={inkColor}
                stickers={stickers}
                updateSticker={() => {}}
                deleteSticker={() => {}}
                selectedId={null}
                setSelectedId={() => {}}
                decorations={decorations}
                readOnly={true}
              />
            </div>
          </motion.div>
        </div>

        {/* ENVELOPE TOP FLAP */}
        <motion.div
          variants={flapVariants}
          animate={animationStage}
          style={{ 
            transformOrigin: 'top center',
            backgroundColor: colors.flap,
            backgroundImage: `linear-gradient(to bottom, ${colors.flap}, ${colors.flapDark})`,
            clipPath: 'polygon(0 0, 100% 0, 50% 60%)',
          }}
          className={`absolute top-0 inset-x-0 h-[60%] flex items-end justify-center pb-3 z-30 shadow-[0_4px_10px_rgba(0,0,0,0.08)] ${colors.paperTexture}`}
        >
          {/* Subtle light edge catch at the crease fold */}
          <div className="absolute inset-x-0 top-0 h-[1.5px] bg-white/20" />
          {/* Subtle paper bevel/edge shadow on flap fold */}
          <div className="absolute inset-x-0 bottom-0 h-[2px] bg-black/10 blur-[0.5px]" />
        </motion.div>

        {/* WAX SEAL (Centered at the tip of the closed flap) */}
        <div className="absolute top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-35">
          <motion.div
            variants={sealVariants}
            animate={animationStage}
            className="flex items-center justify-center"
          >
            {decorations.seal_type && (
              <WaxSeal 
                type={decorations.seal_type}
                style={{ color: colors.waxColor }}
              />
            )}
          </motion.div>
        </div>

        {/* ENVELOPE FRONT DIAGONALS (Layered SVG geometry with bevel edge highlights) */}
        <div className="absolute inset-0 pointer-events-none z-20">
          <svg className="w-full h-full filter drop-shadow-[0_-3px_8px_rgba(0,0,0,0.06)]" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="leftGrad" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stopColor={colors.diagonals} />
                <stop offset="100%" stopColor={colors.diagonalsDark} />
              </linearGradient>
              <linearGradient id="rightGrad" x1="100%" y1="50%" x2="0%" y2="50%">
                <stop offset="0%" stopColor={colors.diagonals} />
                <stop offset="100%" stopColor={colors.diagonalsDark} />
              </linearGradient>
              <linearGradient id="bottomGrad" x1="50%" y1="100%" x2="50%" y2="0%">
                <stop offset="0%" stopColor={colors.bottom} />
                <stop offset="100%" stopColor={colors.bottomDark} />
              </linearGradient>
            </defs>
            {/* Left flap */}
            <polygon points="0,100 0,0 50,55" fill="url(#leftGrad)" />
            {/* Left flap edge highlight (1-2mm visual thickness bevel) */}
            <line x1="0" y1="0" x2="50" y2="55" stroke="rgba(255,255,255,0.22)" strokeWidth="0.5" />
            <line x1="0" y1="0" x2="50" y2="55" stroke="rgba(0,0,0,0.08)" strokeWidth="0.5" transform="translate(0, 0.5)" />

            {/* Right flap */}
            <polygon points="100,100 100,0 50,55" fill="url(#rightGrad)" />
            {/* Right flap edge highlight */}
            <line x1="100" y1="0" x2="50" y2="55" stroke="rgba(255,255,255,0.22)" strokeWidth="0.5" />
            <line x1="100" y1="0" x2="50" y2="55" stroke="rgba(0,0,0,0.08)" strokeWidth="0.5" transform="translate(0, 0.5)" />

            {/* Bottom flap */}
            <polygon points="0,100 100,100 50,55" fill="url(#bottomGrad)" />
            {/* Bottom flap top edge highlight */}
            <line x1="0" y1="100" x2="50" y2="55" stroke="rgba(255,255,255,0.15)" strokeWidth="0.4" />
            <line x1="100" y1="100" x2="50" y2="55" stroke="rgba(255,255,255,0.15)" strokeWidth="0.4" />
          </svg>
        </div>


        {/* ADDRESSED RECIPIENT LAYOUT */}
        {animationStage === 'sealed' && (
          <motion.div 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            style={{ color: colors.text }}
            className="absolute z-40 text-center font-heading max-w-[70%] pointer-events-none mt-8 space-y-1.5"
          >
            <p className="text-[8px] tracking-[0.25em] uppercase opacity-45 font-sans font-bold">Hand Delivery For</p>
            <h2 className="text-xl md:text-2xl font-bold italic tracking-wide font-heading leading-tight filter drop-shadow-[0.5px_0.5px_0px_rgba(255,255,255,0.5)]">{toName || 'Someone Special'}</h2>
            <div className="w-10 h-[1px] bg-current/25 mx-auto mt-2" />
          </motion.div>
        )}
      </div>

      {/* Replay action button */}
      {animationStage === 'sealed' && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setAnimationStage('idle')}
          className="mt-6 text-xs font-bold text-amora-rose hover:text-amora-rose/85 transition-colors flex items-center gap-1.5 bg-white/90 backdrop-blur border border-amora-rose/10 px-4 py-2 rounded-full shadow-sm z-40"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Replay Sealing Animation</span>
        </motion.button>
      )}
    </div>
  );
};
