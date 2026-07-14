// Step 10: feat(recipient): implement recipient opening interaction
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { Heart } from 'lucide-react';
import { STICKERS } from '@/lib/stickers';

const ENVELOPE_THEMES = {
  classic: {
    back: '#FAF6EE',
    flap: '#F3EDE0',
    flapDark: '#E3DAC9',
    diagonals: '#FDFBF7',
    diagonalsDark: '#EFE9DC',
    bottom: '#F5EFEB',
    bottomDark: '#EAE2D2',
    text: '#0C231C',
    accent: '#A88756',
  },
  vintage: {
    back: '#EFE6D5',
    flap: '#E2D6C0',
    flapDark: '#CBBFA9',
    diagonals: '#F5EFE0',
    diagonalsDark: '#DDD1B9',
    bottom: '#ECE2CE',
    bottomDark: '#D5C9B3',
    text: '#0C231C',
    accent: '#A88756',
  },
  royal: {
    back: '#1E2E2A',
    flap: '#172421',
    flapDark: '#0F1816',
    diagonals: '#283B36',
    diagonalsDark: '#1B2A26',
    bottom: '#22332F',
    bottomDark: '#15211E',
    text: '#FAF7F2',
    accent: '#A88756',
  }
};

const MOOD_PRESETS = [
  {
    id: 'blush-peony',
    name: 'Blush Peony',
    themeName: 'Blush',
    bgColor: '#FFFDF9',
    inkColor: '#8B3A3A',
    textColor: '#8B3A3A',
    fontClass: 'font-handwriting text-2xl',
    fontName: 'Dancing Script',
    stickerId: 'romantic-rose-bouquet',
    tagline: 'Warm, handwritten romance.',
    sealColor: '#9B3D3D',
    envelopeTheme: ENVELOPE_THEMES.classic,
    defaultMessage: 'Dearest,\n\nI was thinking of the afternoon we spent walking in the gardens. Some things are simply meant to be written down.',
  },
  {
    id: 'sage-fern',
    name: 'Sage & Fern',
    themeName: 'Parchment',
    bgColor: '#F3EFE6',
    inkColor: '#0C231C',
    textColor: '#0C231C',
    fontClass: 'font-heading text-lg tracking-wide leading-relaxed',
    fontName: 'Cormorant Garamond',
    stickerId: 'eucalyptus-fern-foliage',
    tagline: 'Quiet, literary contemplation.',
    sealColor: '#2C4A3E',
    envelopeTheme: ENVELOPE_THEMES.vintage,
    defaultMessage: 'My Dear Friend,\n\nThere is a quiet beauty in these passing seasons, much like the ferns that grow along the old stone walls here.',
  },
  {
    id: 'classic-royal',
    name: 'Royal Midnight',
    themeName: 'Navy',
    bgColor: '#0C231C',
    inkColor: '#FAF7F2',
    textColor: '#FAF7F2',
    fontClass: 'font-serif text-[11px] tracking-widest leading-loose uppercase',
    fontName: 'Playfair Display',
    stickerId: 'antique-pastel-bouquet',
    tagline: 'Bold, timeless invitation.',
    sealColor: '#A88756',
    envelopeTheme: ENVELOPE_THEMES.royal,
    defaultMessage: 'AN INVITATION\n\nTO CELEBRATE THE VINTAGE OF MID-SUMMER NIGHTS IN THE GRAND ORCHARD. DRESS IN LINENS.',
  }
];

export default function Home() {
  const [activeMood, setActiveMood] = useState(MOOD_PRESETS[0]);
  const [customText, setCustomText] = useState('');
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [waxSealBroken, setWaxSealBroken] = useState(false);

  useEffect(() => {
    setCustomText(activeMood.defaultMessage);
  }, [activeMood]);

  const activeSticker = STICKERS.find(s => s.id === activeMood.stickerId);
  const envTheme = activeMood.envelopeTheme;

  const handleEnvelopeClick = () => {
    if (!waxSealBroken) {
      setWaxSealBroken(true);
      setTimeout(() => {
        setEnvelopeOpen(true);
      }, 550);
    } else {
      setEnvelopeOpen(!envelopeOpen);
    }
  };

  return (
    <main className="min-h-screen text-[#0C231C] bg-[#FAF7F2] font-ui flex flex-col relative overflow-hidden paper-grain pb-20">
      {/* Organic Leaf Shadows */}
      <div className="absolute inset-0 leaf-shadow-overlay z-10 pointer-events-none" />

      {/* Performant, elegant petal rain */}
      

      {/* Publication Navigation */}
      <header className="max-w-7xl mx-auto w-full px-8 py-10 flex justify-between items-baseline z-20">
        <div className="flex items-baseline gap-2">
          <span className="font-heading font-medium text-2xl tracking-wide text-[#0C231C]">Amora</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-12 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#0C231C]/60">
          <Link href="/garden" className="hover:text-[#0C231C] transition-colors py-1">
            The Atelier
          </Link>
          <Link href="/editor" className="hover:text-[#0C231C] transition-colors py-1">
            Letters
          </Link>
          <Link href="/garden" className="hover:text-[#0C231C] transition-colors py-1">
            Garden
          </Link>
          <Link href="/garden" className="hover:text-[#0C231C] transition-colors py-1">
            Stories
          </Link>
          <Link href="/garden" className="hover:text-[#0C231C] transition-colors py-1">
            Collections
          </Link>
        </nav>

        <div>
          <Link href="/editor" className="text-[10px] font-bold uppercase tracking-[0.2em] border-b border-[#0C231C] pb-0.5 hover:text-[#D6707C] hover:border-[#D6707C] transition-colors">
            Write a Letter &rarr;
          </Link>
        </div>
      </header>

      {/* Cohesive Editorial Hero Section */}
      <section className="max-w-5xl mx-auto w-full px-8 pt-8 pb-12 z-10 text-center flex flex-col items-center">
        {/* Editorial Typography */}
        <div className="max-w-3xl mx-auto space-y-6 mb-16">
          <h1 className="font-heading text-4xl md:text-[3.5rem] font-light leading-[1.2] tracking-normal text-[#0C231C] max-w-2xl mx-auto text-balance">
            Some words deserve more than another notification.
          </h1>
          <p className="text-sm text-[#0C231C]/75 tracking-wider uppercase font-light">
            A beautifully crafted digital letter sealed with flowers, paper and memories.
          </p>
        </div>

        {/* Still-Life Art Directed Scene */}
        <div className="relative w-full max-w-[620px] aspect-[4/3] flex items-center justify-center select-none mt-4">

          {/* 3D Envelope Component */}
          <div 
            onClick={handleEnvelopeClick}
            className="relative w-[340px] sm:w-[420px] h-[230px] sm:h-[280px] cursor-pointer group perspective-[1200px] z-10 rotate-[5deg] hover:rotate-[3deg] transition-all duration-500"
          >
            {/* Left flower stem - tucked UNDER the envelope on the left side */}
            <div className="absolute left-[-15%] top-[12%] z-0 w-28 h-28 opacity-80 animate-sway pointer-events-none select-none rotate-[-25deg]">
              <img 
                src="/stickers/eucalyptus-fern-foliage.png" 
                alt="Botanical Accent Left" 
                className="w-full h-full object-contain filter drop-shadow-[4px_8px_12px_rgba(12,35,28,0.1)]"
              />
            </div>

            {/* Right flower bouquet - tucked UNDER the envelope on the top-right */}
            <div className="absolute right-[-10%] top-[-25%] z-0 w-36 h-36 opacity-95 animate-sway pointer-events-none select-none rotate-[15deg]" style={{ animationDelay: '1.5s' }}>
              <img 
                src="/stickers/cherry-blossom.png" 
                alt="Botanical Accent Right" 
                className="w-full h-full object-contain filter drop-shadow-[6px_10px_14px_rgba(12,35,28,0.12)]"
              />
            </div>

            {/* Front leaf stem 1 - printed/blended directly ON TOP of the envelope face */}
            <div className="absolute left-[12%] top-[30%] z-23 w-16 h-32 opacity-85 pointer-events-none rotate-[8deg] mix-blend-multiply">
              <img 
                src="/stickers/eucalyptus.png" 
                alt="Printed Leaf Accent Left" 
                className="w-full h-full object-contain"
              />
            </div>

            {/* Front leaf stem 2 - printed/blended directly ON TOP of the envelope face (smaller/offset) */}
            <div className="absolute left-[26%] top-[38%] z-23 w-12 h-24 opacity-80 pointer-events-none rotate-[15deg] mix-blend-multiply">
              <img 
                src="/stickers/eucalyptus.png" 
                alt="Printed Leaf Accent Right" 
                className="w-full h-full object-contain"
              />
            </div>

            {/* Depth shadow under envelope */}
            <div className="absolute w-[94%] left-[3%] bottom-[-15px] h-[25px] bg-black/8 rounded-full blur-xl transition-all duration-500 group-hover:blur-2xl" />

            {/* ENVELOPE BACK COVER */}
            <div 
              style={{ backgroundColor: envTheme.back }}
              className="absolute inset-0 rounded-2xl border border-black/[0.02] overflow-hidden z-10 shadow-editorial-lg paper-grain"
            >
              <div className="absolute inset-x-0 bottom-0 top-1/3 bg-gradient-to-t from-black/[0.04] to-transparent pointer-events-none" />
            </div>

            {/* ADDRESS CALLIGRAPHY */}
            <div 
              style={{ color: envTheme.text }} 
              className={`absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-12 transition-opacity duration-300 ${
                envelopeOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}
            >
              <span className="text-[8px] tracking-[0.25em] uppercase opacity-40 font-semibold">Hand Delivered For</span>
              <span className="font-heading text-2xl font-normal italic mt-2 tracking-wide">My Companion</span>
              <div className="w-10 h-[1px] bg-current/15 my-3" />
              <span className="text-[7px] tracking-[0.15em] uppercase opacity-45 font-medium">Written in Flowers</span>
            </div>

            {/* Vintage Scalloped Postage Stamp */}
            <div 
              className={`absolute top-6 right-6 w-14 h-16 bg-[#FFFDF9] z-12 shadow-sm border border-[#A88756]/15 flex flex-col p-1 transition-opacity duration-300 ${
                envelopeOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}
              style={{
                clipPath: 'polygon(0% 0%, 5% 5%, 10% 0%, 15% 5%, 20% 0%, 25% 5%, 30% 0%, 35% 5%, 40% 0%, 45% 5%, 50% 0%, 55% 5%, 60% 0%, 65% 5%, 70% 0%, 75% 5%, 80% 0%, 85% 5%, 90% 0%, 95% 5%, 100% 0%, 95% 10%, 100% 20%, 95% 30%, 100% 40%, 95% 50%, 100% 60%, 95% 70%, 100% 80%, 95% 90%, 100% 100%, 90% 95%, 80% 100%, 70% 95%, 60% 100%, 50% 95%, 40% 100%, 30% 95%, 20% 100%, 10% 95%, 0% 100%, 5% 90%, 0% 80%, 5% 70%, 0% 60%, 5% 50%, 0% 40%, 5% 30%, 0% 20%, 5% 10%)'
              }}
            >
              <div className="flex-grow bg-[#EFE6D5] relative overflow-hidden flex items-center justify-center p-1 rounded-sm">
                <img src="/stickers/wild-lavender.png" alt="Stamp detail" className="w-full h-full object-contain filter sepia opacity-80" />
                <div className="absolute inset-0 border border-black/5 rounded-full m-1 pointer-events-none flex items-center justify-center">
                  <span className="text-[5px] text-black/25 font-semibold tracking-widest uppercase rotate-12 scale-75">AMORA</span>
                </div>
              </div>
              <div className="text-[5px] text-[#A88756] text-right font-mono mt-0.5 tracking-wider">1874</div>
            </div>

            {/* INTERNAL SLIDING STATIONERY LETTER */}
            <motion.div
              initial={{ y: 0, scale: 0.95 }}
              animate={envelopeOpen ? { y: -110, scale: 0.97, zIndex: 15 } : { y: 0, scale: 0.95, zIndex: 5 }}
              transition={{ type: 'spring', stiffness: 50, damping: 14 }}
              style={{ backgroundColor: activeMood.bgColor }}
              className="absolute inset-x-[4%] top-4 bottom-4 rounded-xl border border-black/[0.03] shadow-editorial-md p-5 overflow-hidden flex flex-col justify-between paper-grain"
            >
              <div className="flex justify-between items-start border-b border-black/[0.03] pb-2">
                <span className="text-[8px] uppercase tracking-widest text-[#0C231C]/40 font-semibold">Amora Digital Stationery</span>
                <span className="text-[8px] uppercase tracking-widest text-[#D6707C] font-semibold">{activeMood.themeName} Paper</span>
              </div>

              {/* Typed Message */}
              <div className="flex-grow flex items-center justify-center py-2 overflow-hidden">
                <p 
                  style={{ color: activeMood.textColor }} 
                  className={`${activeMood.fontClass} text-center whitespace-pre-line leading-relaxed`}
                >
                  {customText || 'Compose your words...'}
                </p>
              </div>

              <div className="flex justify-between items-end border-t border-black/[0.03] pt-2">
                <div className="w-6 h-6 opacity-80" dangerouslySetInnerHTML={{ __html: activeSticker?.svgMarkup || '' }} />
                <Heart className="w-3 h-3 text-[#D6707C] fill-[#D6707C]/20" />
              </div>
            </motion.div>

            {/* ENVELOPE TOP FLAP */}
            <motion.div
              style={{ 
                backgroundColor: envTheme.flap,
                backgroundImage: `linear-gradient(to bottom, ${envTheme.flap}, ${envTheme.flapDark})`,
                transformOrigin: 'top center',
                clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                height: '60%',
                borderTopLeftRadius: '1rem',
                borderTopRightRadius: '1rem'
              }}
              className="paper-grain"
              animate={envelopeOpen ? { rotateX: -180, zIndex: 2 } : { rotateX: 0, zIndex: 24 }}
              transition={{ type: 'spring', stiffness: 45, damping: 13 }}
            />

            {/* FRONT FLAP DIAGONALS */}
            <div className="absolute inset-0 pointer-events-none z-22">
              <svg className="w-full h-full filter drop-shadow-[0_-3px_8px_rgba(0,0,0,0.01)]" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="leftFlap" x1="0%" y1="50%" x2="100%" y2="50%">
                    <stop offset="0%" stopColor={envTheme.diagonals} />
                    <stop offset="100%" stopColor={envTheme.diagonalsDark} />
                  </linearGradient>
                  <linearGradient id="rightFlap" x1="100%" y1="50%" x2="0%" y2="50%">
                    <stop offset="0%" stopColor={envTheme.diagonals} />
                    <stop offset="100%" stopColor={envTheme.diagonalsDark} />
                  </linearGradient>
                  <linearGradient id="bottomFlap" x1="50%" y1="100%" x2="50%" y2="0%">
                    <stop offset="0%" stopColor={envTheme.bottom} />
                    <stop offset="100%" stopColor={envTheme.bottomDark} />
                  </linearGradient>
                </defs>
                <polygon points="0,100 0,0 50,55" fill="url(#leftFlap)" stroke="rgba(0,0,0,0.01)" strokeWidth="0.1" />
                <polygon points="100,100 100,0 50,55" fill="url(#rightFlap)" stroke="rgba(0,0,0,0.01)" strokeWidth="0.1" />
                <polygon points="0,100 100,100 50,55" fill="url(#bottomFlap)" stroke="rgba(0,0,0,0.01)" strokeWidth="0.1" />
              </svg>
            </div>

            {/* PHYSICAL WAX SEAL */}
            <motion.div
              style={{ zIndex: envelopeOpen ? 3 : 25 }}
              animate={envelopeOpen ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none"
            >
              <div 
                style={{ 
                  background: `radial-gradient(circle at 35% 35%, ${activeMood.sealColor}e0 0%, ${activeMood.sealColor} 70%, #1a0204 100%)`,
                  boxShadow: '0 6px 14px rgba(12,35,28,0.25), inset 0 2px 4px rgba(255,255,255,0.2)' 
                }}
                className="w-12 h-12 rounded-full border-[3px] border-[#A88756]/20 flex items-center justify-center wax-reflection relative"
              >
                <div className="absolute inset-1 border border-white/5 rounded-full flex items-center justify-center bg-black/5">
                  <Heart className="w-4 h-4 text-white/95 fill-white/10" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Taped Handwritten Note (Bottom Right, overlapping the envelope corner) */}
          <div className="absolute right-[4%] bottom-[-5%] z-20 w-[170px] sm:w-[200px] p-5 bg-[#FCFAF7] shadow-editorial-md border border-[#A88756]/10 rotate-[-4deg] select-none hover:rotate-[-2deg] transition-transform duration-500 paper-grain">
            <div className="absolute -top-3.5 left-[35%] w-12 h-6 bg-white/40 backdrop-blur-[1px] border-l border-r border-white/20 shadow-sm rotate-2 opacity-80" />
            <p className="font-handwriting text-base text-[#0C231C]/80 text-center leading-snug">
              Some things are <br />
              simply meant to <br />
              be written down.
            </p>
            <div className="flex justify-center mt-3 text-[#D6707C]">
              <span className="text-[10px]">♡</span>
            </div>
          </div>

        </div>
      </section>

      {/* 3-Column Storytelling Row */}
      <section className="border-t border-b border-[#A88756]/15 py-14 bg-[#FAF7F2] z-10 relative mt-12">
        <div className="max-w-6xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-[#A88756]/15">
          
          <div className="flex flex-col items-center px-6 py-6 md:py-0 space-y-3">
            <div className="text-[#A88756] text-xl">🌿</div>
            <h3 className="font-heading text-lg font-normal text-[#0C231C]">Timeless Design</h3>
            <p className="text-xs text-[#0C231C]/65 leading-relaxed font-light max-w-xs">
              Beautiful typography, vintage elements, and delicate details.
            </p>
          </div>

          <div className="flex flex-col items-center px-6 py-6 md:py-0 space-y-3">
            <div className="text-[#A88756] text-xl">❀</div>
            <h3 className="font-heading text-lg font-normal text-[#0C231C]">Personal & Meaningful</h3>
            <p className="text-xs text-[#0C231C]/65 leading-relaxed font-light max-w-xs">
              Add your words, memories, and personal touches.
            </p>
          </div>

          <div className="flex flex-col items-center px-6 py-6 md:py-0 space-y-3">
            <div className="text-[#A88756] text-xl">☉</div>
            <h3 className="font-heading text-lg font-normal text-[#0C231C]">A Letter, Reimagined</h3>
            <p className="text-xs text-[#0C231C]/65 leading-relaxed font-light max-w-xs">
              A modern way to send something that feels lasting.
            </p>
          </div>

        </div>
      </section>

      {/* Magazine Style Editorial Storytelling Sections */}
      <section className="py-24 bg-[#FAF7F2] relative z-10">
        <div className="max-w-6xl mx-auto px-8 space-y-32">
          
          {/* Section 1: Timeless Design */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
            <div className="md:col-span-5 space-y-6">
              <span className="text-[9px] tracking-[0.2em] uppercase text-[#D6707C] font-bold block">01 / Concept</span>
              <h3 className="font-heading text-3xl font-light text-[#0C231C] leading-snug">Timeless Design</h3>
              <p className="text-sm text-[#0C231C]/70 leading-relaxed font-light">
                Inspired by classic layout typography. We carefully selected editorial serif styles and warm handwriting fonts to make sure each message reads like a printed artifact, bringing authentic analog aesthetics to modern web screens.
              </p>
            </div>
            <div className="md:col-span-7 bg-[#FFFDF9] border border-[#A88756]/15 rounded-2xl p-12 shadow-editorial-sm relative overflow-hidden flex flex-col justify-center min-h-[280px] paper-grain">
              <span className="font-heading text-sm text-[#A88756] tracking-widest uppercase mb-4 opacity-50 block">TYPOGRAPHY ARCHIVE</span>
              <p className="font-heading text-3xl font-light text-[#0C231C] italic leading-relaxed">
                "Some words deserve to be written down."
              </p>
              <div className="h-[1px] w-8 bg-[#A88756]/30 my-6" />
              <p className="font-handwriting text-2xl text-[#D6707C]">With sincere affection, Emily</p>
            </div>
          </div>

          {/* Section 2: Crafted With Care */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
            <div className="md:col-span-7 bg-[#FFFDF9] border border-[#A88756]/15 rounded-2xl p-12 shadow-editorial-sm relative min-h-[280px] flex items-center justify-center gap-8 paper-grain md:order-last">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 mb-4 select-none pointer-events-none">
                  <img src="/stickers/vintage-rose.png" alt="Vintage Rose sticker" className="w-full h-full object-contain filter drop-shadow-md" />
                </div>
                <span className="text-[9px] tracking-widest uppercase text-[#0C231C]/50 font-bold">Botanical Accents</span>
              </div>
              <div className="h-16 w-[1px] bg-[#A88756]/20" />
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-[#9B3D3D] rounded-full border border-white/10 flex items-center justify-center shadow-md mb-4 wax-reflection">
                  <span className="text-white text-xs">♡</span>
                </div>
                <span className="text-[9px] tracking-widest uppercase text-[#0C231C]/50 font-bold">Rich Burgundy Seal</span>
              </div>
            </div>
            <div className="md:col-span-5 space-y-6 md:pr-8">
              <span className="text-[9px] tracking-[0.2em] uppercase text-[#D6707C] font-bold block">02 / Details</span>
              <h3 className="font-heading text-3xl font-light text-[#0C231C] leading-snug">Crafted With Care</h3>
              <p className="text-sm text-[#0C231C]/70 leading-relaxed font-light">
                Pressed flowers, vintage stamps, and physical wax seals. Melt and seal personalized stationery, creating tactile digital correspondence that feels like a treasured keepsake.
              </p>
            </div>
          </div>

          {/* Section 3: Personal Expression */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
            <div className="md:col-span-5 space-y-6">
              <span className="text-[9px] tracking-[0.2em] uppercase text-[#D6707C] font-bold block">03 / Intent</span>
              <h3 className="font-heading text-3xl font-light text-[#0C231C] leading-snug">Personal Expression</h3>
              <p className="text-sm text-[#0C231C]/70 leading-relaxed font-light">
                Taking the time to formulate a message. Slow correspondence allows for deeper connections. Send beautiful letters meant to be kept forever.
              </p>
            </div>
            <div className="md:col-span-7 bg-[#0C231C] border border-[#A88756]/15 rounded-2xl p-12 shadow-editorial-md relative overflow-hidden flex flex-col justify-center min-h-[280px] text-white paper-grain">
              <div className="absolute right-0 bottom-0 w-32 h-32 opacity-15 pointer-events-none select-none">
                <img src="/stickers/eucalyptus.png" alt="Leaf overlay" className="w-full h-full object-contain filter brightness-0 invert" />
              </div>
              <span className="text-[8px] uppercase tracking-widest text-[#A88756] font-bold mb-3">DIGITAL CORRESPONDENCE</span>
              <p className="font-heading text-2xl font-light leading-relaxed max-w-lg text-[#FAF7F2]">
                "Let us write letters that we can look back on years from now, reading the spaces between our thoughts."
              </p>
              <div className="h-[1px] w-8 bg-[#A88756]/40 my-6" />
              <div className="flex items-center gap-2 text-[#A88756]">
                <span className="text-[9px] uppercase tracking-widest font-semibold">Slow Digital Correspondence</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Editorial Footer */}
      <footer className="border-t border-[#A88756]/15 bg-[#FAF7F2] py-20 z-20 relative">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-12 gap-12">
          
          <div className="md:col-span-5 space-y-5">
            <span className="font-heading font-medium text-xl tracking-wide text-[#0C231C] block">Amora</span>
            <p className="text-xs text-[#0C231C]/65 leading-relaxed max-w-sm font-light">
              An elegant space for digital stationery and botanical correspondence. Compose envelopes decorated with vintage stamps, wax seals, and real pressed flower illustrations.
            </p>
          </div>

          <div className="md:col-span-2 space-y-4">
            <h4 className="text-[9px] tracking-[0.2em] uppercase font-bold text-[#0C231C]/50">Create</h4>
            <ul className="space-y-2 text-xs font-semibold text-[#0C231C]/70">
              <li>
                <Link href="/editor" className="hover:text-[#D6707C] transition-colors">Compose Letter</Link>
              </li>
              <li>
                <Link href="/editor" className="hover:text-[#D6707C] transition-colors">Wax Seal Library</Link>
              </li>
              <li>
                <Link href="/editor" className="hover:text-[#D6707C] transition-colors">Botanical Presets</Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-4">
            <h4 className="text-[9px] tracking-[0.2em] uppercase font-bold text-[#0C231C]/50">Garden</h4>
            <ul className="space-y-2 text-xs font-semibold text-[#0C231C]/70">
              <li>
                <Link href="/garden" className="hover:text-[#D6707C] transition-colors">Browse Public Letters</Link>
              </li>
              <li>
                <Link href="/garden" className="hover:text-[#D6707C] transition-colors">Botanical Archive</Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-4">
            <h4 className="text-[9px] tracking-[0.2em] uppercase font-bold text-[#0C231C]/50">Philosophy</h4>
            <p className="text-xs text-[#0C231C]/65 leading-relaxed font-light">
              We believe in slow messaging. In taking the time to pick a typeface, color, stamp, and seal to represent a feeling.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-8 mt-16 pt-8 border-t border-[#A88756]/15 flex flex-col sm:flex-row justify-between items-center gap-4 text-[9px] text-[#0C231C]/55 font-bold uppercase tracking-[0.15em]">
          <p>© 2026 Amora. Handcrafted with love and flowers.</p>
          <div className="flex gap-6">
            <span className="text-[#D6707C]">Slow Digital Correspondence</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
