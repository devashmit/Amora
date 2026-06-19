'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PaperStyle, FontFamily, Decoration, StickerPlacement } from '@/types';
import { LetterCanvas } from '../editor/LetterCanvas';

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

  const flapVariants = {
    closed: { rotateX: 0, zIndex: 30 },
    open: {
      rotateX: -180,
      zIndex: 10,
      transition: { type: 'spring' as const, stiffness: 50, damping: 12, delay: 0.1 }
    },
  };

  const letterRiseVariants = {
    hidden: { y: 0, scale: 0.95, zIndex: 15 },
    visible: {
      y: -240,
      scale: 1,
      zIndex: 40,
      transition: { type: 'spring' as const, stiffness: 60, damping: 15, delay: 0.7 }
    },
  };

  const handleOpenEnvelope = () => {
    if (isOpen) return;
    setIsOpen(true);
    // Switch to full scrollable layout after the rise animation ends
    setTimeout(() => {
      setShowFullLetter(true);
    }, 1800);
  };

  return (
    <div className="relative w-full min-h-[75vh] flex items-center justify-center overflow-hidden py-12">
      <AnimatePresence mode="wait">
        {!showFullLetter ? (
          <div className="relative w-[340px] md:w-[480px] h-[280px] md:h-[360px] perspective-[1000px] flex items-center justify-center">
            {/* Envelope Back & Sides */}
            <div className="absolute inset-0 bg-[#E8DCC8] border border-amber-900/10 rounded-lg shadow-xl overflow-hidden z-10">
              <div className="absolute inset-0 bg-cover opacity-10 bg-center" style={{ backgroundImage: "url('/textures/linen.png')" }} />
              {/* Inner paper shadow effect */}
              <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-amber-950/15" />
            </div>

            {/* Letter Inside */}
            <motion.div
              variants={letterRiseVariants}
              initial="hidden"
              animate={isOpen ? 'visible' : 'hidden'}
              className="absolute w-[90%] aspect-[4/5] bg-white rounded shadow-md overflow-hidden p-6 text-xs pointer-events-none"
              style={{
                top: '5%',
                transformOrigin: 'bottom center',
              }}
            >
              {/* Micro-preview of the card structure */}
              <div className="h-full flex flex-col justify-between opacity-40 font-serif">
                <span className="text-[8px]">Dearest {toName},</span>
                <div className="flex-grow flex flex-col items-center justify-center text-center gap-1.5 py-4">
                  <div className="w-16 h-1.5 bg-current rounded-full" />
                  <div className="w-24 h-1.5 bg-current rounded-full" />
                  <div className="w-20 h-1.5 bg-current rounded-full" />
                </div>
                <span className="text-[8px] text-right">With love, {fromName}</span>
              </div>
            </motion.div>

            {/* Envelope Flap (Top triangle) */}
            <motion.div
              variants={flapVariants}
              initial="closed"
              animate={isOpen ? 'open' : 'closed'}
              style={{ transformOrigin: 'top center' }}
              className="absolute top-0 inset-x-0 h-1/2 bg-[#dfd2be] border-b border-amber-900/5 shadow-sm rounded-t-lg flex items-center justify-center"
            >
              {/* Seal button inside top flap */}
              {!isOpen && (
                <button
                  onClick={handleOpenEnvelope}
                  className="w-14 h-14 bg-amora-seal rounded-full border-4 border-amber-600/20 flex items-center justify-center text-white text-2xl shadow-lg cursor-pointer transform hover:scale-105 active:scale-95 transition-transform duration-300 z-50 animate-pulse"
                  title="Click to Open Wax Seal"
                >
                  {decorations.seal_type === 'heart' && '❤️'}
                  {decorations.seal_type === 'star' && '⭐'}
                  {decorations.seal_type === 'moon' && '🌙'}
                  {decorations.seal_type === 'floral' && '🌸'}
                  {!decorations.seal_type && '✉️'}
                </button>
              )}
            </motion.div>

            {/* Front Diagonals Overlay (Visual overlap folds) */}
            <div className="absolute inset-0 pointer-events-none z-30">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Left diagonal fold */}
                <polygon points="0,100 0,0 50,55" fill="#f0e4d0" stroke="#dfd2be" strokeWidth="0.3" />
                {/* Right diagonal fold */}
                <polygon points="100,100 100,0 50,55" fill="#f0e4d0" stroke="#dfd2be" strokeWidth="0.3" />
                {/* Bottom envelope fold */}
                <polygon points="0,100 100,100 50,55" fill="#e8dcc8" stroke="#dfd2be" strokeWidth="0.3" />
              </svg>
            </div>

            {/* Text on Envelope Cover */}
            {!isOpen && (
              <div className="absolute z-40 text-center font-heading text-amora-ink/75 max-w-[80%] pointer-events-none mt-16">
                <p className="text-xs tracking-wider uppercase opacity-60">A letter for</p>
                <p className="text-xl md:text-2xl font-bold italic mt-1">{toName}</p>
              </div>
            )}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
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
