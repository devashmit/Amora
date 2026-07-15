'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PaperStyle, FontFamily, Decoration, StickerPlacement } from '@/types';
import { LetterCanvas } from '../editor/LetterCanvas';
import { Mail } from 'lucide-react';
import { ENVELOPE_COLORS } from '../editor/EnvelopeSealPreview';
import { STICKERS } from '@/lib/stickers';

interface EnvelopeRevealProps {
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

export const EnvelopeReveal: React.FC<EnvelopeRevealProps> = ({
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
  const [isOpen, setIsOpen] = useState(false);
  const [showFullLetter, setShowFullLetter] = useState(false);
  const [sealBroken, setSealBroken] = useState(false);

  const selectedStyle = decorations.envelope_style || 'classic';
  const colors = ENVELOPE_COLORS[selectedStyle];

  const bouquetStickers = stickers.filter(s => {
    const asset = STICKERS.find(a => a.id === s.sticker_id);
    return asset?.category === 'bouquet';
  });

  const flapVariants = {
    closed: { rotateX: 0, zIndex: 30 },
    open: {
      rotateX: -180,
      zIndex: 10,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transition: { type: 'spring', stiffness: 45, damping: 14, delay: 0.3 } as any
    },
  };

  const letterRiseVariants = {
    hidden: { y: 190, scale: 0.9, rotate: 0 },
    visible: {
      y: -130, // 60-70% visible above envelope
      scale: 0.95,
      rotate: -0.5,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transition: { type: 'spring', stiffness: 50, damping: 13, delay: 1.0 } as any
    },
  };

  const handleOpenEnvelope = () => {
    if (isOpen) return;
    setSealBroken(true);
    
    // Start flap opening and letter rise sequence
    setTimeout(() => {
      setIsOpen(true);
    }, 400);

    // Switch to full layout view
    setTimeout(() => {
      setShowFullLetter(true);
    }, 3200);
  };

  return (
    <div className="relative w-full min-h-[75vh] flex items-center justify-center overflow-hidden py-12">
      {/* Soft Ambient Shadow Under Envelope */}
      <div className="absolute w-[360px] md:w-[440px] h-[30px] bg-black/10 rounded-full blur-2xl bottom-12 left-1/2 transform -translate-x-1/2 pointer-events-none" />

      <AnimatePresence mode="wait">
        {!showFullLetter ? (
          <div className="relative w-[340px] md:w-[420px] h-[240px] md:h-[290px] perspective-[1200px] flex items-center justify-center">
            
            {/* FLOATING DECORATIVE BOUQUETS ON THE SIDE */}
            <div className="absolute -left-28 md:-left-48 top-1/2 transform -translate-y-1/2 w-24 md:w-36 pointer-events-none select-none z-45 hidden sm:block">
              {bouquetStickers.length > 0 ? (
                bouquetStickers.map((sticker, idx) => {
                  const asset = STICKERS.find(a => a.id === sticker.sticker_id);
                  if (!asset) return null;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.6, rotate: -25, y: 40 }}
                      animate={isOpen ? { opacity: 1, scale: 1.15, rotate: 6, y: 0 } : { opacity: 0.4, scale: 0.8 }}
                      transition={{ duration: 1.4, ease: 'easeOut' }}
                      className="w-full filter drop-shadow-xl"
                      dangerouslySetInnerHTML={{ __html: asset.svgMarkup }}
                    />
                  );
                })
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.6, rotate: -25, y: 40 }}
                  animate={isOpen ? { opacity: 1, scale: 1.15, rotate: 6, y: 0 } : { opacity: 0.4, scale: 0.8 }}
                  transition={{ duration: 1.4, ease: 'easeOut' }}
                  className="w-full filter drop-shadow-xl"
                  dangerouslySetInnerHTML={{
                    __html: STICKERS.find(s => s.id === 'romantic-rose-bouquet')?.svgMarkup || ''
                  }}
                />
              )}
            </div>

            {/* ENVELOPE BACK COVER */}
            <div 
              style={{ 
                backgroundColor: colors.back,
                backgroundImage: "url('/textures/linen.png')",
                boxShadow: 'inset 0 10px 30px rgba(0,0,0,0.06), 0 20px 40px rgba(12,35,28,0.15)'
              }}
              className="absolute inset-0 border border-black/[0.02] rounded-xl overflow-hidden z-10"
            >
              <div className="absolute inset-x-0 bottom-0 top-1/3 bg-gradient-to-t from-black/15 to-transparent" />
            </div>

            {/* PHYSICAL REALISM: THE MASKED LETTER POCKET */}
            <div className="absolute inset-x-[3%] bottom-0 h-[600px] overflow-hidden z-15 pointer-events-none">
              <motion.div
                variants={letterRiseVariants}
                initial="hidden"
                animate={isOpen ? 'visible' : 'hidden'}
                style={{ 
                  boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
                }}
                className="absolute left-0 right-0 bottom-0 h-[380px] bg-white rounded-lg overflow-hidden origin-bottom"
              >
                {/* Scale letter contents inside the envelope pocket */}
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
              initial="closed"
              animate={isOpen ? 'open' : 'closed'}
              style={{ 
                transformOrigin: 'top center',
                backgroundColor: colors.flap,
                backgroundImage: `linear-gradient(to bottom, ${colors.flap}, ${colors.flapDark})`,
                clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
                filter: 'drop-shadow(0 4px 5px rgba(0,0,0,0.08))'
              }}
              className="absolute top-0 inset-x-0 h-[60%] flex items-end justify-center pb-3 z-30"
            >
              <div className="absolute inset-x-0 top-0 h-[2px] bg-white/20" />
            </motion.div>

            {/* RUSTIC TWINE WRAP */}
            {!isOpen && (
              <motion.div
                initial={{ opacity: 1 }}
                /* Twine unravelling animation coordinates with the wax seal break sequence */
                animate={sealBroken ? { opacity: 0, scale: 1.15 } : { opacity: 1 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                className="absolute inset-0 pointer-events-none z-25"
              >
                {/* Horizontal twine */}
                <div className="absolute top-1/2 left-0 right-0 h-[4px] bg-[#8A6644] opacity-85 shadow-[0_2px_4px_rgba(0,0,0,0.15)]" style={{ transform: 'translateY(-50%)', backgroundImage: "repeating-linear-gradient(45deg, #745133, #745133 4px, #8A6644 4px, #8A6644 8px)" }} />
                {/* Vertical twine */}
                <div className="absolute left-1/2 top-0 bottom-0 w-[4px] bg-[#8A6644] opacity-85 shadow-[0_2px_4px_rgba(0,0,0,0.15)]" style={{ transform: 'translateX(-50%)', backgroundImage: "repeating-linear-gradient(45deg, #745133, #745133 4px, #8A6644 4px, #8A6644 8px)" }} />
              </motion.div>
            )}

            {/* WAX SEAL (Tap to open seal animation) */}
            <div className="absolute top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-35">
              {!isOpen && (
                <motion.button
                  onClick={handleOpenEnvelope}
                  animate={sealBroken ? { scale: [1, 1.15, 0], opacity: 0, rotate: 15 } : { scale: 1 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl shadow-2xl cursor-pointer transform hover:scale-105 active:scale-95 transition-transform duration-300 animate-sway relative"
                  style={{
                    background: 'radial-gradient(circle at 30% 30%, #d6707c 10%, #b23a48 70%, #6b0010 100%)',
                    boxShadow: 'inset 0 3px 5px rgba(255,255,255,0.4), inset 0 -3px 8px rgba(0,0,0,0.5), 0 10px 24px rgba(12,35,28,0.3)',
                    borderRadius: '48% 52% 47% 53% / 51% 49% 51% 49%'
                  }}
                  title="Break Seal & Open Letter"
                >
                  {/* Outer melting wax ring texture */}
                  <div className="absolute -inset-1 border-2 border-[#b23a48]/40 rounded-full opacity-60" style={{ borderRadius: '52% 48% 51% 49% / 49% 51% 48% 52%' }} />
                  
                  <div 
                    className="absolute inset-2 border border-white/10 rounded-full flex items-center justify-center bg-black/15 shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]"
                    style={{ borderRadius: '50% 50% 49% 51% / 50% 51% 49% 50%' }}
                  >
                    {decorations.seal_type === 'heart' && '❤️'}
                    {decorations.seal_type === 'star' && '⭐'}
                    {decorations.seal_type === 'moon' && '🌙'}
                    {decorations.seal_type === 'floral' && '🌸'}
                    {!decorations.seal_type && (
                      <span className="font-heading text-lg font-bold tracking-widest text-[#FFFDF9]/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">A</span>
                    )}
                  </div>
                </motion.button>
              )}
            </div>

            {/* ENVELOPE FRONT FLAPS OVERLAY */}
            <div className="absolute inset-0 pointer-events-none z-20">
              <svg className="w-full h-full filter drop-shadow-[0_-5px_15px_rgba(0,0,0,0.04)]" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="revealLeftGrad" x1="0%" y1="50%" x2="100%" y2="50%">
                    <stop offset="0%" stopColor={colors.diagonals} />
                    <stop offset="100%" stopColor={colors.diagonalsDark} />
                  </linearGradient>
                  <linearGradient id="revealRightGrad" x1="100%" y1="50%" x2="0%" y2="50%">
                    <stop offset="0%" stopColor={colors.diagonals} />
                    <stop offset="100%" stopColor={colors.diagonalsDark} />
                  </linearGradient>
                  <linearGradient id="revealBottomGrad" x1="50%" y1="100%" x2="50%" y2="0%">
                    <stop offset="0%" stopColor={colors.bottom} />
                    <stop offset="100%" stopColor={colors.bottomDark} />
                  </linearGradient>
                </defs>
                {/* Left diagonal flap */}
                <polygon points="0,100 0,0 50,55" fill="url(#revealLeftGrad)" stroke="rgba(0,0,0,0.03)" strokeWidth="0.2" />
                {/* Right diagonal flap */}
                <polygon points="100,100 100,0 50,55" fill="url(#revealRightGrad)" stroke="rgba(0,0,0,0.03)" strokeWidth="0.2" />
                {/* Bottom envelope fold */}
                <polygon points="0,100 100,100 50,55" fill="url(#revealBottomGrad)" stroke="rgba(0,0,0,0.04)" strokeWidth="0.2" />
              </svg>
            </div>

            {/* CALLIGRAPHY COVER TEXT */}
            {!isOpen && (
              <div 
                style={{ color: colors.text }}
                className="absolute z-40 text-center font-heading max-w-[75%] pointer-events-none mt-8 space-y-1"
              >
                <p className="text-[9px] tracking-[0.2em] uppercase opacity-50 font-sans font-semibold">Special Delivery For</p>
                <h2 className="text-xl md:text-2xl font-bold italic tracking-wide font-heading leading-tight">{toName}</h2>
                <div className="w-12 h-[1px] bg-current/25 mx-auto mt-2" />
              </div>
            )}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="w-full flex justify-center p-4"
          >
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
