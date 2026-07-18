'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PaperStyle, FontFamily, Decoration, StickerPlacement } from '@/types';
import { LetterCanvas } from '../editor/LetterCanvas';
import { ENVELOPE_COLORS } from '../editor/EnvelopeSealPreview';
import { WaxSeal, PressedBotanical } from './WaxSeal';

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
  const [sealBroken, setSealBroken] = useState(false);
  const [isCracking, setIsCracking] = useState(false);
  const [showFlower, setShowFlower] = useState(false);
  const [isUnfolding, setIsUnfolding] = useState(false);
  const [showFullLetter, setShowFullLetter] = useState(false);

  const selectedStyle = decorations.envelope_style || 'ivory';
  const colors = ENVELOPE_COLORS[selectedStyle] || ENVELOPE_COLORS.ivory;



  const handleOpenEnvelope = () => {
    if (sealBroken || isOpen) return;
    
    // Step 1: Compress seal & crack
    setIsCracking(true);
    
    setTimeout(() => {
      // Step 2: Break seal, split halves
      setSealBroken(true);
    }, 600);

    setTimeout(() => {
      // Step 3: Lift flap & show falling flower
      setIsOpen(true);
      setShowFlower(true);
    }, 1200);

    setTimeout(() => {
      // Step 4: Slide up letter & start unfolding
      setIsUnfolding(true);
    }, 2400);

    setTimeout(() => {
      // Step 5: Reveal readable letter canvas
      setShowFullLetter(true);
    }, 4500);
  };

  const flapVariants = {
    closed: { rotateX: 0, zIndex: 30 },
    open: {
      rotateX: -180,
      zIndex: 10,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transition: { type: 'spring' as any, stiffness: 35, damping: 12, delay: 0.2 }
    },
  };

  // Letter rising out of envelope with rotation and bend
  const letterRiseVariants = {
    hidden: { y: 195, scale: 0.9, rotate: 0, skewX: 0 },
    visible: {
      y: -140,
      scale: 0.94,
      rotate: -2.5,
      skewX: -1,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transition: { type: 'spring' as any, stiffness: 40, damping: 11, delay: 0.6 }
    },
  };

  // 3D unfolding panels motion
  const unfoldTopVariants = {
    folded: { rotateX: -178, originY: 'bottom' },
    unfolded: { 
      rotateX: 0, 
      originY: 'bottom',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transition: { duration: 1.1, ease: [0.25, 1, 0.5, 1] as any } 
    }
  };

  const unfoldBottomVariants = {
    folded: { rotateX: 178, originY: 'top' },
    unfolded: { 
      rotateX: 0, 
      originY: 'top',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transition: { duration: 1.1, ease: [0.25, 1, 0.5, 1] as any, delay: 0.3 } 
    }
  };

  return (
    <div className="relative w-full min-h-[80vh] flex flex-col items-center justify-center overflow-hidden py-12">
      {/* Premium ambient light cast from top-left */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/10 via-transparent to-black/5 z-40" />

      {/* Floating flower petals simulation when seal breaks */}
      {showFlower && (
        <div className="absolute inset-0 pointer-events-none z-50">
          <div className="absolute left-[45%] top-[55%] w-8 h-8 text-amora-rose animate-petal-medium opacity-0">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M12,2 C12,2 14,8 19,10 C14,12 12,18 12,18 C12,18 10,12 5,10 C10,8 12,2 12,2 Z"/></svg>
          </div>
          <div className="absolute left-[52%] top-[50%] w-6 h-6 text-amora-rose/80 animate-petal-slow opacity-0">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M12,2 C12,2 14,8 19,10 C14,12 12,18 12,18 C12,18 10,12 5,10 C10,8 12,2 12,2 Z"/></svg>
          </div>
          <div className="absolute left-[48%] top-[58%] w-5 h-5 text-green-700/60 animate-petal-fast opacity-0">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M17,8 C14,8 12,10 12,10 C12,10 10,8 7,8 C7,8 8,11 12,12 C16,11 17,8 17,8 Z"/></svg>
          </div>
        </div>
      )}

      {/* Contact shadow for resting on desk */}
      <div className="absolute w-[360px] md:w-[440px] h-[24px] bg-black/12 rounded-full blur-2xl bottom-12 left-1/2 transform -translate-x-1/2 pointer-events-none" />

      <AnimatePresence mode="wait">
        {!showFullLetter ? (
          <div className="relative w-[340px] md:w-[420px] h-[240px] md:h-[290px] perspective-[1200px] flex items-center justify-center">
            
            {/* ENVELOPE BACK COVER */}
            <div 
              style={{ 
                backgroundColor: colors.back,
                boxShadow: 'inset 0 10px 30px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.1)'
              }}
              className={`absolute inset-0 rounded-xl overflow-hidden z-10 border border-white/5 ${colors.paperTexture}`}
            >
              <div className="absolute inset-x-0 bottom-0 top-1/3 bg-gradient-to-t from-black/12 to-transparent" />
              
              {/* EMBOSSED BOTANICAL DETAILS */}
              <div className="absolute inset-[15%] pointer-events-none select-none flex items-center justify-center opacity-40">
                <PressedBotanical 
                  type={colors.botanicalType} 
                  className="w-48 h-48"
                  style={{ color: colors.text }}
                />
              </div>
            </div>

            {/* PHYSICAL REALISM: THE MASKED LETTER POCKET */}
            <div className="absolute inset-x-[3%] bottom-0 h-[600px] overflow-hidden z-15 pointer-events-none">
              {!isUnfolding ? (
                // Phase 1: Letter rises inside envelope pocket
                <motion.div
                  variants={letterRiseVariants}
                  initial="hidden"
                  animate={isOpen ? 'visible' : 'hidden'}
                  style={{ 
                    boxShadow: '0 4px 15px rgba(0,0,0,0.06)'
                  }}
                  className="absolute left-0 right-0 bottom-0 h-[380px] bg-white rounded-lg overflow-hidden origin-bottom"
                >
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
              ) : (
                // Phase 2: Letter slides up, transitions to unfolding component
                <motion.div
                  initial={{ y: -140, scale: 0.94, rotate: -2.5, zIndex: 100 }}
                  animate={{ 
                    y: -250, 
                    scale: 1, 
                    rotate: 0,
                    transition: { duration: 1.2, ease: [0.25, 1, 0.5, 1] }
                  }}
                  className="absolute left-0 right-0 bottom-0 h-[380px] origin-bottom flex flex-col"
                >
                  {/* Realistic 3D folded panels */}
                  <div className="w-full h-full flex flex-col shadow-2xl rounded-sm overflow-hidden bg-white text-amora-ink relative border border-black/5">
                    
                    {/* Top Fold Panel */}
                    <motion.div 
                      variants={unfoldTopVariants}
                      initial="folded"
                      animate="unfolded"
                      className="w-full h-1/3 bg-[#FDFBF7] border-b border-black/5 flex items-center justify-center overflow-hidden"
                    >
                      <div className="text-center opacity-25 scale-75 font-heading italic">Dearest {toName}</div>
                    </motion.div>

                    {/* Middle Fold Panel */}
                    <div className="w-full h-1/3 bg-[#FAF8F3] border-b border-black/5 flex items-center justify-center overflow-hidden">
                      <div className="text-center opacity-25 scale-75 font-serif">Writing a beautiful message...</div>
                    </div>

                    {/* Bottom Fold Panel */}
                    <motion.div 
                      variants={unfoldBottomVariants}
                      initial="folded"
                      animate="unfolded"
                      className="w-full h-1/3 bg-[#F5F2EA] flex items-center justify-center overflow-hidden"
                    >
                      <div className="text-center opacity-25 scale-75 font-heading italic">With love, {fromName}</div>
                    </motion.div>

                    {/* Crease fold lines overlays */}
                    <div className="absolute top-1/3 left-0 right-0 h-[3px] bg-black/5 pointer-events-none shadow-[inset_0_-1px_1px_rgba(255,255,255,0.4)]" />
                    <div className="absolute top-2/3 left-0 right-0 h-[3px] bg-black/5 pointer-events-none shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]" />
                  </div>
                </motion.div>
              )}
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
                clipPath: 'polygon(0 0, 100% 0, 50% 60%)',
              }}
              className={`absolute top-0 inset-x-0 h-[60%] flex items-end justify-center pb-3 z-30 shadow-[0_4px_10px_rgba(0,0,0,0.08)] ${colors.paperTexture}`}
            >
              <div className="absolute inset-x-0 top-0 h-[1.5px] bg-white/20" />
            </motion.div>

            {/* WAX SEAL (With split & crack visual state) */}
            <div className="absolute top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-35">
              {!isOpen && (
                <WaxSeal 
                  type={decorations.seal_type || 'initial'}
                  style={{ color: colors.waxColor }}
                  broken={sealBroken}
                  onClick={handleOpenEnvelope}
                  className={`transition-all duration-300 ${
                    isCracking ? 'scale-[0.93] brightness-75' : 'hover:scale-105 active:scale-95'
                  }`}
                />
              )}
            </div>

            {/* ENVELOPE FRONT FLAPS OVERLAY (Layered SVG geometry with thickness edge) */}
            <div className="absolute inset-0 pointer-events-none z-20">
              <svg className="w-full h-full filter drop-shadow-[0_-3px_8px_rgba(0,0,0,0.06)]" viewBox="0 0 100 100" preserveAspectRatio="none">
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
                {/* Left flap */}
                <polygon points="0,100 0,0 50,55" fill="url(#revealLeftGrad)" />
                <line x1="0" y1="0" x2="50" y2="55" stroke="rgba(255,255,255,0.22)" strokeWidth="0.5" />
                
                {/* Right flap */}
                <polygon points="100,100 100,0 50,55" fill="url(#revealRightGrad)" />
                <line x1="100" y1="0" x2="50" y2="55" stroke="rgba(255,255,255,0.22)" strokeWidth="0.5" />

                {/* Bottom flap */}
                <polygon points="0,100 100,100 50,55" fill="url(#revealBottomGrad)" />
                <line x1="0" y1="100" x2="50" y2="55" stroke="rgba(255,255,255,0.15)" strokeWidth="0.4" />
                <line x1="100" y1="100" x2="50" y2="55" stroke="rgba(255,255,255,0.15)" strokeWidth="0.4" />
              </svg>
            </div>


            {/* CALLIGRAPHY COVER TEXT */}
            {!isOpen && (
              <div 
                style={{ color: colors.text }}
                className="absolute z-40 text-center font-heading max-w-[75%] pointer-events-none mt-8 space-y-1.5"
              >
                <p className="text-[8px] tracking-[0.25em] uppercase opacity-45 font-sans font-bold">Special Delivery For</p>
                <h2 className="text-xl md:text-2xl font-bold italic tracking-wide font-heading leading-tight filter drop-shadow-[0.5px_0.5px_0px_rgba(255,255,255,0.5)]">{toName}</h2>
                <div className="w-10 h-[1px] bg-current/25 mx-auto mt-2" />
              </div>
            )}
          </div>
        ) : (
          // Unfolded full letter fade-in
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
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
