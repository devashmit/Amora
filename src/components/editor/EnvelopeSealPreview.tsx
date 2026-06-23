'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PaperStyle, FontFamily, Decoration, StickerPlacement } from '@/types';
import { LetterCanvas } from './LetterCanvas';
import { Mail, RefreshCw } from 'lucide-react';

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
  classic: {
    back: '#FAF6EE',
    flap: '#F3EDE0',
    flapDark: '#E3DAC9',
    diagonals: '#FDFBF7',
    diagonalsDark: '#EFE9DC',
    bottom: '#F5EFEB',
    bottomDark: '#EAE2D2',
    text: '#4A3525',
    accent: '#C3A277',
    name: 'Classic Cream',
    desc: 'Premium warm white cotton paper with elegant gold accents'
  },
  vintage: {
    back: '#C6A473',
    flap: '#BA9766',
    flapDark: '#9C7A4A',
    diagonals: '#D4B483',
    diagonalsDark: '#B29160',
    bottom: '#CBA979',
    bottomDark: '#A88756',
    text: '#3E2715',
    accent: '#7A5835',
    name: 'Vintage Kraft',
    desc: 'Rustic fiber-flecked kraft envelope for a warm handcrafted feel'
  },
  royal: {
    back: '#1A2844',
    flap: '#152037',
    flapDark: '#0C1424',
    diagonals: '#223354',
    diagonalsDark: '#142037',
    bottom: '#1E2E4E',
    bottomDark: '#101C33',
    text: '#D1B07C',
    accent: '#D1B07C',
    name: 'Royal Navy',
    desc: 'Deep midnight navy cotton stock with hot-embossed gold foil'
  },
  blossom: {
    back: '#FDF0F0',
    flap: '#FADCD9',
    flapDark: '#E8B8B5',
    diagonals: '#FFF5F5',
    diagonalsDark: '#F4C7C4',
    bottom: '#FCDFD9',
    bottomDark: '#E2ABA6',
    text: '#7A3636',
    accent: '#EAA0A0',
    name: 'Blossom Pink',
    desc: 'Soft pressed rose-petal paper with rose gold details'
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

  const selectedStyle = decorations.envelope_style || 'classic';
  const colors = ENVELOPE_COLORS[selectedStyle];

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
      transition: { duration: 1.4, ease: [0.25, 1, 0.5, 1] }
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
      transition: { duration: 0.9, ease: [0.65, 0, 0.35, 1] }
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
      transition: { type: 'spring', stiffness: 220, damping: 12, delay: 0.1 }
    }
  };

  return (
    <div className="relative w-full max-w-[500px] h-[480px] flex flex-col items-center justify-end overflow-hidden pb-8 font-ui">
      {/* Premium Ambient Lighting Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/20 via-transparent to-black/5 z-45" />

      {/* Animation Status Tag */}
      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-md border border-amora-gold/20 px-4 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-widest text-amora-ink/80 shadow-md z-50 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-amora-rose animate-ping" />
        {animationStage === 'idle' && 'Polishing Letter...'}
        {animationStage === 'sliding' && 'Inserting into Envelope...'}
        {animationStage === 'closing' && 'Folding Luxury Stationery...'}
        {animationStage === 'sealed' && 'Sealed & Ready'}
      </div>

      {/* Main Envelope Perspective Container */}
      <div className="relative w-[340px] md:w-[420px] h-[240px] md:h-[290px] perspective-[1200px] flex items-center justify-center">
        
        {/* ENVELOPE BACK LAYER */}
        <div 
          style={{ 
            backgroundColor: colors.back,
            backgroundImage: "url('/textures/linen.png')",
            boxShadow: 'inset 0 10px 30px rgba(0,0,0,0.06), 0 15px 35px rgba(12,35,28,0.12)'
          }}
          className="absolute inset-0 rounded-xl border border-black/[0.03] overflow-hidden z-10"
        >
          {/* Internal shadow mimicking realistic paper pocket depth */}
          <div className="absolute inset-x-0 bottom-0 top-1/3 bg-gradient-to-t from-black/15 to-transparent" />
        </div>

        {/* PHYSICAL REALISM: THE MASKED POCKET CONTAINER */}
        {/* This wrapper starts at the top opening of the envelope and goes down. */}
        {/* overflow-hidden clips the letter so it NEVER leaks out of the bottom of the envelope. */}
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

        {/* ENVELOPE TOP FLAP (Realistic triangle pointed flap rotating in 3D) */}
        <motion.div
          variants={flapVariants}
          animate={animationStage}
          style={{ 
            transformOrigin: 'top center',
            backgroundColor: colors.flap,
            backgroundImage: `linear-gradient(to bottom, ${colors.flap}, ${colors.flapDark})`,
            clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
            filter: 'drop-shadow(0 4px 5px rgba(0,0,0,0.08))'
          }}
          className="absolute top-0 inset-x-0 h-[60%] flex items-end justify-center pb-3 z-30"
        >
          {/* Shadow line underneath flap fold */}
          <div className="absolute inset-x-0 top-0 h-[2px] bg-white/20" />
        </motion.div>

        {/* WAX SEAL (Centered at the tip of the closed flap) */}
        <div className="absolute top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-35 pointer-events-none">
          <motion.div
            variants={sealVariants}
            animate={animationStage}
            className="w-14 h-14 bg-amora-seal rounded-full border-[3px] border-amber-600/35 flex items-center justify-center text-white text-2xl shadow-xl relative"
            style={{
              background: 'radial-gradient(circle at 35% 35%, #e15b64 0%, #b23a48 70%, #800e13 100%)',
              boxShadow: '0 6px 15px rgba(128,14,19,0.35), inset 0 2px 4px rgba(255,255,255,0.2)'
            }}
          >
            {/* Realistic wax seal emblem texture */}
            <div className="absolute inset-1.5 border border-white/10 rounded-full flex items-center justify-center bg-black/5">
              {decorations.seal_type === 'heart' && '❤️'}
              {decorations.seal_type === 'star' && '⭐'}
              {decorations.seal_type === 'moon' && '🌙'}
              {decorations.seal_type === 'floral' && '🌸'}
              {!decorations.seal_type && <Mail className="w-5 h-5 text-white/90" />}
            </div>
          </motion.div>
        </div>

        {/* ENVELOPE FRONT DIAGONALS (Side and Bottom flaps with depth shading) */}
        <div className="absolute inset-0 pointer-events-none z-20">
          <svg className="w-full h-full filter drop-shadow-[0_-5px_15px_rgba(0,0,0,0.04)]" viewBox="0 0 100 100" preserveAspectRatio="none">
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
            <polygon points="0,100 0,0 50,55" fill="url(#leftGrad)" stroke="rgba(0,0,0,0.03)" strokeWidth="0.2" />
            {/* Right flap */}
            <polygon points="100,100 100,0 50,55" fill="url(#rightGrad)" stroke="rgba(0,0,0,0.03)" strokeWidth="0.2" />
            {/* Bottom flap */}
            <polygon points="0,100 100,100 50,55" fill="url(#bottomGrad)" stroke="rgba(0,0,0,0.04)" strokeWidth="0.2" />
          </svg>
        </div>

        {/* ADDRESSED RECIPIENT LAYOUT (Premium calligraphy overlay on envelope cover) */}
        {animationStage === 'sealed' && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            style={{ color: colors.text }}
            className="absolute z-40 text-center font-heading max-w-[75%] pointer-events-none mt-8 space-y-1"
          >
            <p className="text-[9px] tracking-[0.2em] uppercase opacity-50 font-sans font-semibold">Hand Delivery For</p>
            <h2 className="text-xl md:text-2xl font-bold italic tracking-wide font-heading leading-tight">{toName || 'Someone Special'}</h2>
            <div className="w-12 h-[1px] bg-current/20 mx-auto mt-2" />
          </motion.div>
        )}
      </div>

      {/* Replay action button */}
      {animationStage === 'sealed' && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setAnimationStage('idle')}
          className="mt-6 text-xs font-bold text-amora-rose hover:text-amora-rose/85 transition-colors flex items-center gap-1.5 bg-white/80 border border-amora-rose/10 px-3.5 py-2 rounded-full shadow-sm"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Replay Sealing Animation</span>
        </motion.button>
      )}
    </div>
  );
};
