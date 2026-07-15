'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Copy, Check, ArrowRight, Leaf } from 'lucide-react';
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
    fontClass: 'font-handwriting text-2xl md:text-3xl',
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
    fontClass: 'font-heading text-lg md:text-xl tracking-wide leading-relaxed',
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
    fontClass: 'font-serif text-xs md:text-sm tracking-widest leading-loose uppercase',
    fontName: 'Playfair Display',
    stickerId: 'antique-pastel-bouquet',
    tagline: 'Bold, timeless invitation.',
    sealColor: '#A88756',
    envelopeTheme: ENVELOPE_THEMES.royal,
    defaultMessage: 'AN INVITATION\n\nTO CELEBRATE THE VINTAGE OF MID-SUMMER NIGHTS IN THE GRAND ORCHARD. DRESS IN LINENS.',
  }
];

type FlowStep = 'landing' | 'write' | 'sealing' | 'share' | 'recipient' | 'opening' | 'read';

export default function Home() {
  const [activeMood, setActiveMood] = useState(MOOD_PRESETS[0]);
  const [envelopeThemeKey, setEnvelopeThemeKey] = useState<keyof typeof ENVELOPE_THEMES>('classic');
  const [customText, setCustomText] = useState('');
  const [step, setStep] = useState<FlowStep>('landing');
  const [copied, setCopied] = useState(false);

  // Deriving envelope parameters
  const envelopeOpen = step === 'write' || step === 'opening' || step === 'read';
  const waxSealBroken = step === 'opening' || step === 'read';

  useEffect(() => {
    setCustomText(activeMood.defaultMessage);
    // Find matching theme key
    const themeKey = Object.keys(ENVELOPE_THEMES).find(
      key => ENVELOPE_THEMES[key as keyof typeof ENVELOPE_THEMES] === activeMood.envelopeTheme
    ) as keyof typeof ENVELOPE_THEMES;
    if (themeKey) {
      setEnvelopeThemeKey(themeKey);
    }
  }, [activeMood]);

  const activeSticker = STICKERS.find(s => s.id === activeMood.stickerId);
  const envTheme = ENVELOPE_THEMES[envelopeThemeKey];

  const handleSealAndSend = () => {
    setStep('sealing');
    setTimeout(() => {
      setStep('share');
    }, 1200);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://amora.love/l/7X3KPA');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWaxSealClick = () => {
    if (step === 'recipient') {
      setStep('opening');
      setTimeout(() => {
        setStep('read');
      }, 1200);
    }
  };

  const resetFlow = () => {
    setStep('landing');
  };

  const transitionConfig = {
    duration: 0.8,
    ease: [0.22, 1, 0.36, 1]
  };

  return (
    <main className="min-h-screen text-[#0C231C] bg-[#FAF7F2] font-ui flex flex-col relative overflow-hidden paper-grain pb-20 transition-colors duration-1000">
      {/* Organic Leaf Shadows */}
      <div className="absolute inset-0 leaf-shadow-overlay z-10 pointer-events-none" />

      {/* Header - Hidden in Recipient & Read Mode for complete focus */}
      <AnimatePresence>
        {step !== 'recipient' && step !== 'opening' && step !== 'read' && (
          <motion.header 
            initial={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={transitionConfig}
            className="max-w-7xl mx-auto w-full px-8 py-8 flex justify-between items-baseline z-20"
          >
            <div className="flex items-baseline gap-2">
              <span className="font-heading font-medium text-2xl tracking-wide text-[#0C231C]">Amora</span>
            </div>
            
            <nav className="hidden md:flex items-center gap-12 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#0C231C]/60">
              <button onClick={resetFlow} className="hover:text-[#0C231C] transition-colors py-1">
                How It Works
              </button>
              <button onClick={resetFlow} className="hover:text-[#0C231C] transition-colors py-1">
                Examples
              </button>
              <button onClick={resetFlow} className="hover:text-[#0C231C] transition-colors py-1">
                About
              </button>
            </nav>

            <div>
              <button 
                onClick={() => setStep('write')}
                className="text-[10px] font-bold uppercase tracking-[0.2em] border-b border-[#0C231C] pb-0.5 hover:text-[#D6707C] hover:border-[#D6707C] transition-colors"
              >
                Write a Letter &rarr;
              </button>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      <div className="flex-grow flex items-center justify-center z-10 px-6">
        <AnimatePresence mode="wait">
          {/* LANDING STEP */}
          {step === 'landing' && (
            <motion.div 
              key="landing-step"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={transitionConfig}
              className="max-w-6xl w-full flex flex-col gap-20 py-8 relative"
            >
              {/* Floating Petals Drifting Background */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 min-h-[140vh]">
                {[
                  { left: '8%', delay: '0s', speed: 'animate-petal-slow', size: 'w-4 h-4' },
                  { left: '22%', delay: '4s', speed: 'animate-petal-medium', size: 'w-6 h-6' },
                  { left: '45%', delay: '2s', speed: 'animate-petal-fast', size: 'w-3.5 h-3.5' },
                  { left: '68%', delay: '7s', speed: 'animate-petal-slow', size: 'w-5 h-5' },
                  { left: '85%', delay: '1s', speed: 'animate-petal-medium', size: 'w-4 h-4' },
                  { left: '93%', delay: '5s', speed: 'animate-petal-fast', size: 'w-5 h-5' },
                ].map((p, idx) => (
                  <div
                    key={idx}
                    className={`absolute top-[-10%] ${p.size} bg-[#D6707C]/20 rounded-tr-3xl rounded-bl-3xl ${p.speed} pointer-events-none`}
                    style={{ left: p.left, animationDelay: p.delay, transform: 'rotate(25deg)' }}
                  />
                ))}
              </div>

              {/* Hero Showcase Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
                {/* Left Column: Quiet editorial landing description */}
                <div className="lg:col-span-5 space-y-8 text-left">
                  <div className="space-y-4">
                    <span className="text-[10px] tracking-[0.25em] uppercase text-[#D6707C] font-bold block">A Digital Atelier</span>
                    <h1 className="font-heading text-4xl md:text-[3.8rem] font-light leading-[1.1] tracking-tight text-[#0C231C] text-balance">
                      Letters that wait to be <span className="italic font-normal">opened.</span>
                    </h1>
                    <p className="text-base text-[#0C231C]/75 font-light tracking-wide max-w-md leading-relaxed">
                      Amora is a sanctuary for slow digital correspondence. Write meaningful letters, seal them inside a beautiful digital envelope with twine, and send them as private keepsakes.
                    </p>
                  </div>

                  <div>
                    <button
                      onClick={() => setStep('write')}
                      className="group inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] bg-[#0C231C] text-[#FAF7F2] px-8 py-5 rounded-md hover:bg-[#D6707C] hover:text-white transition-all duration-500 shadow-md transform hover:-translate-y-0.5"
                    >
                      Enter the Atelier
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>

                {/* Right Column: Envelope Preview with Interactive hover seal */}
                <div className="lg:col-span-7 flex justify-center">
                  <div className="relative w-[340px] sm:w-[420px] h-[230px] sm:h-[280px] perspective-[1200px] group cursor-pointer" onClick={() => setStep('write')}>
                    
                    {/* Floating flowers next to envelope */}
                    <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-28 pointer-events-none select-none z-30 opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 hidden sm:block">
                      <img src="/stickers/eucalyptus.png" alt="Eucalyptus Left" className="w-full filter drop-shadow-lg" />
                    </div>
                    <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-28 pointer-events-none select-none z-30 opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 hidden sm:block">
                      <img src="/stickers/cherry-blossom.png" alt="Blossom Right" className="w-full filter drop-shadow-lg" />
                    </div>

                    {/* Left flower stem - imprinted on bottom-left corner of envelope face */}
                    <div 
                      style={{ 
                        zIndex: 26,
                        filter: envelopeThemeKey === 'royal' 
                          ? 'brightness(1.5) sepia(0.8) hue-rotate(-10deg) saturate(1.2) opacity(0.55)' 
                          : 'sepia(0.95) brightness(0.4) contrast(1.3) saturate(0.8) opacity(0.6)' 
                      }}
                      className="absolute left-[3%] bottom-[3%] w-24 h-24 opacity-80 pointer-events-none select-none rotate-[-15deg] mix-blend-multiply"
                    >
                      <img 
                        src="/stickers/eucalyptus.png" 
                        alt="Imprinted Foliage Left" 
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Right flower bouquet - imprinted on bottom-right corner of envelope face */}
                    <div 
                      style={{ 
                        zIndex: 26,
                        filter: envelopeThemeKey === 'royal' 
                          ? 'brightness(1.5) sepia(0.8) hue-rotate(-10deg) saturate(1.2) opacity(0.55)' 
                          : 'sepia(0.95) brightness(0.4) contrast(1.3) saturate(0.8) opacity(0.6)' 
                      }}
                      className="absolute right-[3%] bottom-[3%] w-24 h-24 opacity-80 pointer-events-none select-none rotate-[15deg] mix-blend-multiply"
                    >
                      <img 
                        src="/stickers/cherry-blossom.png" 
                        alt="Imprinted Foliage Right" 
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Envelope Back Cover */}
                    <div 
                      style={{ backgroundColor: envTheme.back, zIndex: 1 }}
                      className="absolute inset-0 rounded-2xl border border-black/[0.02] overflow-hidden shadow-editorial-lg paper-grain"
                    />

                    {/* Address Calligraphy */}
                    <div 
                      style={{ color: envTheme.text, zIndex: 26 }} 
                      className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
                    >
                      <span className="text-[8px] tracking-[0.25em] uppercase opacity-40 font-semibold">Hand Delivered For</span>
                      <span className="font-heading text-2xl font-normal italic mt-2 tracking-wide">My Companion</span>
                      <div className="w-10 h-[1px] bg-current/15 my-3" />
                      <span className="text-[7px] tracking-[0.15em] uppercase opacity-45 font-medium">Written in Flowers</span>
                    </div>

                    {/* Vintage Scalloped Postage Stamp */}
                    <div 
                      className="absolute top-6 right-6 w-14 h-16 bg-[#FFFDF9] shadow-sm border border-[#A88756]/15 flex flex-col p-1"
                      style={{
                        zIndex: 26,
                        clipPath: 'polygon(0% 0%, 5% 5%, 10% 0%, 15% 5%, 20% 0%, 25% 5%, 30% 0%, 35% 5%, 40% 0%, 45% 5%, 50% 0%, 55% 5%, 60% 0%, 65% 5%, 70% 0%, 75% 5%, 80% 0%, 85% 5%, 90% 0%, 95% 5%, 100% 0%, 95% 10%, 100% 20%, 95% 30%, 100% 40%, 95% 50%, 100% 60%, 95% 70%, 100% 80%, 95% 90%, 100% 100%, 90% 95%, 80% 100%, 70% 95%, 60% 100%, 50% 95%, 40% 100%, 30% 95%, 20% 100%, 10% 95%, 0% 100%, 5% 90%, 0% 80%, 5% 70%, 0% 60%, 5% 50%, 0% 40%, 5% 30%, 0% 20%, 5% 10%)'
                      }}
                    >
                      <div className="flex-grow bg-[#EFE6D5] relative overflow-hidden flex items-center justify-center p-1 rounded-sm">
                        <img src="/stickers/wild-lavender.png" alt="Stamp detail" className="w-full h-full object-contain filter sepia opacity-80" />
                      </div>
                      <div className="text-[5px] text-[#A88756] text-right font-mono mt-0.5 tracking-wider">1874</div>
                    </div>

                    {/* Envelope Top Flap (Closed) */}
                    <div
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
                        borderTopRightRadius: '1rem',
                        zIndex: 24
                      }}
                      className="paper-grain"
                    />

                    {/* Front Flap Diagonals */}
                    <div 
                      style={{ zIndex: 20 }}
                      className="absolute inset-0 pointer-events-none"
                    >
                      <svg className="w-full h-full filter drop-shadow-[0_-3px_8px_rgba(0,0,0,0.01)]" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <polygon points="0,100 0,0 50,55" fill={envTheme.diagonals} />
                        <polygon points="100,100 100,0 50,55" fill={envTheme.diagonalsDark} />
                        <polygon points="0,100 100,100 50,55" fill={envTheme.bottom} />
                      </svg>
                    </div>

                    {/* RUSTIC TWINE WRAP */}
                    <div className="absolute inset-0 pointer-events-none z-25">
                      {/* Horizontal twine */}
                      <div className="absolute top-1/2 left-0 right-0 h-[4px] bg-[#8A6644] opacity-85 shadow-[0_2px_4px_rgba(0,0,0,0.15)]" style={{ transform: 'translateY(-50%)', backgroundImage: "repeating-linear-gradient(45deg, #745133, #745133 4px, #8A6644 4px, #8A6644 8px)" }} />
                      {/* Vertical twine */}
                      <div className="absolute left-1/2 top-0 bottom-0 w-[4px] bg-[#8A6644] opacity-85 shadow-[0_2px_4px_rgba(0,0,0,0.15)]" style={{ transform: 'translateX(-50%)', backgroundImage: "repeating-linear-gradient(45deg, #745133, #745133 4px, #8A6644 4px, #8A6644 8px)" }} />
                    </div>

                    {/* Physical Wax Seal */}
                    <div 
                      style={{ 
                        zIndex: 28,
                        filter: 'drop-shadow(0 4px 8px rgba(12,35,28,0.3))'
                      }}
                      className="absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none"
                    >
                      <div 
                        style={{ 
                          background: `radial-gradient(circle at 30% 30%, ${activeMood.sealColor} 10%, ${activeMood.sealColor}e0 50%, #200508 100%)`,
                          borderRadius: '47% 53% 50% 50% / 48% 48% 52% 52%',
                          border: `1px solid ${activeMood.sealColor}70`,
                          boxShadow: 'inset 0 3px 6px rgba(255,255,255,0.35), inset 0 -3px 8px rgba(0,0,0,0.4)'
                        }}
                        className="w-14 h-14 flex items-center justify-center relative p-1.5 wax-reflection"
                      >
                        <div 
                          style={{ 
                            borderRadius: '48% 52% 49% 51% / 50% 50% 50% 50%',
                            background: `radial-gradient(circle at 50% 50%, ${activeMood.sealColor} 0%, #150204 120%)`,
                            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5), 0 1px 1px rgba(255,255,255,0.25)'
                          }}
                          className="absolute inset-2 flex items-center justify-center"
                        >
                          <Leaf className="w-5 h-5 text-black/45 fill-black/10 drop-shadow-[0_1px_1px_rgba(255,255,255,0.25)] rotate-45" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* The Language of Flowers Glossary */}
              <div className="space-y-8 relative z-10 pt-16 border-t border-[#0C231C]/5">
                <div className="text-center max-w-2xl mx-auto space-y-3">
                  <span className="text-[10px] tracking-[0.25em] uppercase text-[#D6707C] font-bold block">Flora Symbolism</span>
                  <h2 className="font-heading text-3xl font-light text-[#0C231C]">The Language of Flowers</h2>
                  <p className="text-sm text-[#0C231C]/65 max-w-md mx-auto leading-relaxed">
                    Every leaf, stem, and petal tells a story. Select the perfect elements to wrap your words in quiet meaning.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                  {[
                    { title: 'Wild Lavender', meaning: 'Devotion, Calm & Silent Grace', desc: 'A soothing companion for words of gratitude and long-distance memories.', img: '/stickers/wild-lavender.png' },
                    { title: 'Cherry Blossom', meaning: 'The Beauty of Transient Moments', desc: 'Celebrate fresh starts, new blossoms of romance, and passing seasons.', img: '/stickers/cherry-blossom.png' },
                    { title: 'Eucalyptus Stem', meaning: 'Strength, Protection & Healing', desc: 'Lend quiet resilience, support, and protection to someone walking a tough path.', img: '/stickers/eucalyptus.png' }
                  ].map((flower, idx) => (
                    <div 
                      key={idx} 
                      className="bg-[#FFFDF9] border border-[#A88756]/12 p-6 rounded-2xl shadow-editorial-sm flex flex-col items-center text-center space-y-4 hover:shadow-editorial-md hover:border-[#D6707C]/30 transition-all duration-500 transform hover:-translate-y-1"
                    >
                      <div className="w-16 h-16 flex items-center justify-center bg-[#F3EFE6]/50 rounded-full p-2">
                        <img src={flower.img} alt={flower.title} className="w-full h-full object-contain filter sepia" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-heading text-lg font-semibold text-[#0C231C]">{flower.title}</h3>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-[#D6707C] block">{flower.meaning}</span>
                      </div>
                      <p className="text-xs text-[#0C231C]/70 leading-relaxed font-light">{flower.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* WRITE STEP */}
          {step === 'write' && (
            <motion.div 
              key="write-step"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={transitionConfig}
              className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-8"
            >
              {/* Left Column: Quiet editorial storytelling */}
              <div className="lg:col-span-5 space-y-8 text-left">
                <div className="space-y-4">
                  <h1 className="font-heading text-4xl md:text-[3.5rem] font-light leading-[1.15] tracking-tight text-[#0C231C] text-balance">
                    Some words deserve paper.
                  </h1>
                  <p className="text-base text-[#0C231C]/75 font-light tracking-wide max-w-md">
                    Write something worth opening. Choose a mood, write your message, and seal it into a keepsake.
                  </p>
                </div>

                {/* Mood Picker */}
                <div className="space-y-3">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-[#0C231C]/40 font-bold block">Paper Mood</span>
                  <div className="flex flex-wrap gap-3">
                    {MOOD_PRESETS.map((preset) => (
                      <button
                        key={preset.id}
                        onClick={() => setActiveMood(preset)}
                        className={`text-xs font-semibold px-4 py-2 border rounded-full transition-all duration-300 ${
                          activeMood.id === preset.id
                            ? 'bg-[#0C231C] text-[#FAF7F2] border-[#0C231C]'
                            : 'border-[#0C231C]/10 text-[#0C231C]/60 hover:border-[#0C231C]/30'
                        }`}
                      >
                        {preset.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Envelope Theme Picker */}
                <div className="space-y-3">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-[#0C231C]/40 font-bold block">Envelope Style</span>
                  <div className="flex flex-wrap gap-3">
                    {(Object.keys(ENVELOPE_THEMES) as Array<keyof typeof ENVELOPE_THEMES>).map((key) => (
                      <button
                        key={key}
                        onClick={() => setEnvelopeThemeKey(key)}
                        className={`text-xs font-semibold px-4 py-2 border rounded-full transition-all duration-300 capitalize ${
                          envelopeThemeKey === key
                            ? 'bg-[#0C231C] text-[#FAF7F2] border-[#0C231C]'
                            : 'border-[#0C231C]/10 text-[#0C231C]/60 hover:border-[#0C231C]/30'
                        }`}
                      >
                        {key}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <button
                    onClick={handleSealAndSend}
                    className="group inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] bg-[#0C231C] text-[#FAF7F2] px-6 py-4 rounded-md hover:bg-[#D6707C] hover:text-white transition-all duration-500 shadow-sm"
                  >
                    Seal & Send
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>

              {/* Right Column: Interactive Paper Editor */}
              <div className="lg:col-span-7 flex justify-center">
                <div className="relative w-full max-w-[500px] aspect-[4/3.2] bg-[#FCFAF7]/20 border border-[#A88756]/10 rounded-2xl p-6 shadow-editorial-md flex flex-col justify-between paper-grain">
                  {/* Subtle Fountain Pen Graphic or Border */}
                  <div className="absolute right-4 top-4 text-xs opacity-20 font-serif italic select-none">Amora Atelier</div>
                  
                  <textarea
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                    style={{ color: activeMood.textColor, backgroundColor: 'transparent' }}
                    className={`${activeMood.fontClass} w-full h-full resize-none border-none outline-none focus:ring-0 leading-relaxed text-center placeholder-[#0C231C]/30`}
                    placeholder="Start writing..."
                  />

                  <div className="flex justify-between items-end border-t border-black/[0.04] pt-3">
                    <div className="w-8 h-8 opacity-80" dangerouslySetInnerHTML={{ __html: activeSticker?.svgMarkup || '' }} />
                    <Heart className="w-4 h-4 text-[#D6707C] fill-[#D6707C]/10" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* SEALING STEP */}
          {step === 'sealing' && (
            <motion.div
              key="sealing-step"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={transitionConfig}
              className="flex flex-col items-center justify-center py-12"
            >
              <div className="relative w-[340px] sm:w-[420px] h-[230px] sm:h-[280px]">
                {/* Simulated folding/sliding sheet */}
                <motion.div
                  initial={{ y: -80, scale: 0.95, opacity: 1 }}
                  animate={{ y: 0, scale: 0.92, opacity: 0.8 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  style={{ backgroundColor: activeMood.bgColor }}
                  className="absolute inset-x-[4%] top-4 bottom-4 rounded-xl border border-black/[0.03] shadow-editorial-md p-5 flex flex-col justify-between paper-grain z-5"
                >
                  <div className="flex-grow flex items-center justify-center">
                    <p style={{ color: activeMood.textColor }} className={`${activeMood.fontClass} text-center opacity-40 select-none text-sm`}>
                      {customText}
                    </p>
                  </div>
                </motion.div>

                {/* Envelope Back Cover */}
                <div style={{ backgroundColor: envTheme.back }} className="absolute inset-0 rounded-2xl border border-black/[0.02] z-10 shadow-editorial-lg paper-grain" />

                {/* Envelope flap closing */}
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
                  initial={{ rotateX: -180, zIndex: 2 }}
                  animate={{ rotateX: 0, zIndex: 24 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                />

                {/* Diagonals */}
                <div className="absolute inset-0 pointer-events-none z-22">
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <polygon points="0,100 0,0 50,55" fill={envTheme.diagonals} opacity="0.95" />
                    <polygon points="100,100 100,0 50,55" fill={envTheme.diagonalsDark} opacity="0.95" />
                    <polygon points="0,100 100,100 50,55" fill={envTheme.bottom} opacity="0.98" />
                  </svg>
                </div>

                {/* Wax Seal appearing */}
                <motion.div
                  initial={{ scale: 2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8, ease: 'easeOut' }}
                  style={{ 
                    zIndex: 28,
                    filter: 'drop-shadow(0 4px 8px rgba(12,35,28,0.3))'
                  }}
                  className="absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                >
                  <div 
                    style={{ 
                      background: `radial-gradient(circle at 30% 30%, ${activeMood.sealColor} 10%, ${activeMood.sealColor}e0 50%, #200508 100%)`,
                      borderRadius: '47% 53% 50% 50% / 48% 48% 52% 52%',
                      border: `1px solid ${activeMood.sealColor}70`,
                      boxShadow: 'inset 0 3px 6px rgba(255,255,255,0.35), inset 0 -3px 8px rgba(0,0,0,0.4)'
                    }}
                    className="w-13 h-13 flex items-center justify-center relative p-1.5 wax-reflection"
                  >
                    <div 
                      style={{ 
                        borderRadius: '48% 52% 49% 51% / 50% 50% 50% 50%',
                        background: `radial-gradient(circle at 50% 50%, ${activeMood.sealColor} 0%, #150204 120%)`,
                        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5), 0 1px 1px rgba(255,255,255,0.25)'
                      }}
                      className="absolute inset-2 flex items-center justify-center"
                    >
                      <Leaf className="w-5 h-5 text-black/45 fill-black/10 drop-shadow-[0_1px_1px_rgba(255,255,255,0.25)] rotate-45" />
                    </div>
                  </div>
                </motion.div>
              </div>

              <span className="text-xs uppercase tracking-widest text-[#0C231C]/60 mt-8 font-semibold animate-pulse">Sealing letter...</span>
            </motion.div>
          )}

          {/* SHARE STEP */}
          {step === 'share' && (
            <motion.div
              key="share-step"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={transitionConfig}
              className="max-w-2xl w-full text-center space-y-12 py-12"
            >
              <div className="space-y-4">
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#D6707C] font-bold block">Deliver</span>
                <h2 className="font-heading text-3xl font-light text-[#0C231C]">The sealed envelope is ready.</h2>
                <p className="text-sm text-[#0C231C]/70 max-w-md mx-auto">
                  Your message is safely sealed inside. Copy the private link below to share it with your companion.
                </p>
              </div>

              {/* Clean link presentation */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto bg-[#FFFDF9] border border-[#A88756]/15 rounded-lg p-2 shadow-editorial-sm paper-grain">
                <span className="text-sm font-mono text-[#0C231C]/80 px-3 select-all">amora.love/l/7X3KPA</span>
                <button
                  onClick={handleCopyLink}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-wider bg-[#0C231C] text-[#FAF7F2] px-4 py-2.5 rounded hover:bg-[#D6707C] transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => setStep('recipient')}
                  className="text-xs font-bold uppercase tracking-[0.2em] border-b border-[#0C231C] pb-0.5 hover:text-[#D6707C] hover:border-[#D6707C] transition-colors"
                >
                  Preview Recipient Experience &rarr;
                </button>
              </div>
            </motion.div>
          )}

          {/* RECIPIENT & OPENING & READ SEQUENCE */}
          {(step === 'recipient' || step === 'opening' || step === 'read') && (
            <motion.div
              key="recipient-sequence"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={transitionConfig}
              className="flex flex-col items-center justify-center py-12"
            >
              {/* Recipient Headline */}
              <div className="text-center space-y-3 mb-16">
                <p className="text-xs uppercase tracking-[0.25em] text-[#0C231C]/40 font-bold">You've received a letter.</p>
                {step === 'recipient' && (
                  <p className="text-[10px] uppercase tracking-widest text-[#D6707C] font-semibold animate-pulse">Click the wax seal to open</p>
                )}
              </div>

              {/* Envelope Component Container */}
              <div className="relative w-[340px] sm:w-[420px] h-[230px] sm:h-[280px] perspective-[1200px]">

                {/* Left flower stem - imprinted on bottom-left corner of envelope face */}
                <div 
                  style={{ 
                    zIndex: 26,
                    filter: envelopeThemeKey === 'royal' 
                      ? 'brightness(1.5) sepia(0.8) hue-rotate(-10deg) saturate(1.2) opacity(0.55)' 
                      : 'sepia(0.95) brightness(0.4) contrast(1.3) saturate(0.8) opacity(0.6)' 
                  }}
                  className="absolute left-[3%] bottom-[3%] w-24 h-24 opacity-80 pointer-events-none select-none rotate-[-15deg] mix-blend-multiply"
                >
                  <img 
                    src="/stickers/eucalyptus.png" 
                    alt="Imprinted Foliage Left" 
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Right flower bouquet - imprinted on bottom-right corner of envelope face */}
                <div 
                  style={{ 
                    zIndex: 26,
                    filter: envelopeThemeKey === 'royal' 
                      ? 'brightness(1.5) sepia(0.8) hue-rotate(-10deg) saturate(1.2) opacity(0.55)' 
                      : 'sepia(0.95) brightness(0.4) contrast(1.3) saturate(0.8) opacity(0.6)' 
                  }}
                  className="absolute right-[3%] bottom-[3%] w-24 h-24 opacity-80 pointer-events-none select-none rotate-[15deg] mix-blend-multiply"
                >
                  <img 
                    src="/stickers/cherry-blossom.png" 
                    alt="Imprinted Foliage Right" 
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Physical Falling Pressed Flower (Emerges only on opening sequence) */}
                {step !== 'recipient' && (
                  <motion.div
                    initial={{ y: -20, rotate: 0, opacity: 0 }}
                    animate={{ y: 220, rotate: 180, opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 1.8, ease: 'easeOut' }}
                    style={{ zIndex: 30 }}
                    className="absolute left-[35%] w-12 h-12 pointer-events-none select-none"
                  >
                    <img src="/stickers/wild-lavender.png" alt="Drifting Lavender Flower" className="w-full h-full object-contain filter sepia" />
                  </motion.div>
                )}

                {/* ENVELOPE BACK COVER */}
                <div 
                  style={{ backgroundColor: envTheme.back, zIndex: 1 }}
                  className="absolute inset-0 rounded-2xl border border-black/[0.02] overflow-hidden shadow-editorial-lg paper-grain"
                >
                  <div className="absolute inset-x-0 bottom-0 top-1/3 bg-gradient-to-t from-black/[0.04] to-transparent pointer-events-none" />
                </div>

                {/* ADDRESS CALLIGRAPHY */}
                <div 
                  style={{ color: envTheme.text, zIndex: 26 }} 
                  className={`absolute inset-0 flex flex-col items-center justify-center p-8 text-center transition-opacity duration-500 ${
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
                  className={`absolute top-6 right-6 w-14 h-16 bg-[#FFFDF9] shadow-sm border border-[#A88756]/15 flex flex-col p-1 transition-opacity duration-500 ${
                    envelopeOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
                  }`}
                  style={{
                    zIndex: 26,
                    clipPath: 'polygon(0% 0%, 5% 5%, 10% 0%, 15% 5%, 20% 0%, 25% 5%, 30% 0%, 35% 5%, 40% 0%, 45% 5%, 50% 0%, 55% 5%, 60% 0%, 65% 5%, 70% 0%, 75% 5%, 80% 0%, 85% 5%, 90% 0%, 95% 5%, 100% 0%, 95% 10%, 100% 20%, 95% 30%, 100% 40%, 95% 50%, 100% 60%, 95% 70%, 100% 80%, 95% 90%, 100% 100%, 90% 95%, 80% 100%, 70% 95%, 60% 100%, 50% 95%, 40% 100%, 30% 95%, 20% 100%, 10% 95%, 0% 100%, 5% 90%, 0% 80%, 5% 70%, 0% 60%, 5% 50%, 0% 40%, 5% 30%, 0% 20%, 5% 10%)'
                  }}
                >
                  <div className="flex-grow bg-[#EFE6D5] relative overflow-hidden flex items-center justify-center p-1 rounded-sm">
                    <img src="/stickers/wild-lavender.png" alt="Stamp detail" className="w-full h-full object-contain filter sepia opacity-80" />
                  </div>
                  <div className="text-[5px] text-[#A88756] text-right font-mono mt-0.5 tracking-wider">1874</div>
                </div>

                {/* INTERNAL SLIDING STATIONERY LETTER */}
                <motion.div
                  initial={{ y: 0, scale: 0.95 }}
                  animate={envelopeOpen ? { y: -110, scale: 0.97, zIndex: 15 } : { y: 0, scale: 0.95, zIndex: 5 }}
                  transition={transitionConfig}
                  style={{ backgroundColor: activeMood.bgColor, zIndex: envelopeOpen ? 15 : 5 }}
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
                    borderTopRightRadius: '1rem',
                    zIndex: envelopeOpen ? 2 : 24
                  }}
                  className="paper-grain"
                  animate={envelopeOpen ? { rotateX: -180, zIndex: 2 } : { rotateX: 0, zIndex: 24 }}
                  transition={transitionConfig}
                />

                {/* FRONT FLAP DIAGONALS */}
                <div 
                  style={{ zIndex: 20 }}
                  className="absolute inset-0 pointer-events-none"
                >
                  <svg className="w-full h-full filter drop-shadow-[0_-3px_8px_rgba(0,0,0,0.01)]" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <polygon points="0,100 0,0 50,55" fill={envTheme.diagonals} />
                    <polygon points="100,100 100,0 50,55" fill={envTheme.diagonalsDark} />
                    <polygon points="0,100 100,100 50,55" fill={envTheme.bottom} />
                  </svg>
                </div>

                {/* PHYSICAL WAX SEAL */}
                <motion.div
                  style={{ 
                    zIndex: envelopeOpen ? 3 : 28,
                    filter: 'drop-shadow(0 4px 8px rgba(12,35,28,0.3))'
                  }}
                  animate={waxSealBroken ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer"
                  onClick={handleWaxSealClick}
                >
                  <div 
                    style={{ 
                      background: `radial-gradient(circle at 30% 30%, ${activeMood.sealColor} 10%, ${activeMood.sealColor}e0 50%, #200508 100%)`,
                      borderRadius: '47% 53% 50% 50% / 48% 48% 52% 52%',
                      border: `1px solid ${activeMood.sealColor}70`,
                      boxShadow: 'inset 0 3px 6px rgba(255,255,255,0.35), inset 0 -3px 8px rgba(0,0,0,0.4)'
                    }}
                    className="w-13 h-13 flex items-center justify-center relative p-1.5 wax-reflection"
                  >
                    <div 
                      style={{ 
                        borderRadius: '48% 52% 49% 51% / 50% 50% 50% 50%',
                        background: `radial-gradient(circle at 50% 50%, ${activeMood.sealColor} 0%, #150204 120%)`,
                        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5), 0 1px 1px rgba(255,255,255,0.25)'
                      }}
                      className="absolute inset-2 flex items-center justify-center"
                    >
                      <Leaf className="w-5 h-5 text-black/45 fill-black/10 drop-shadow-[0_1px_1px_rgba(255,255,255,0.25)] rotate-45" />
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Read/Done State CTA to start writing a new letter */}
              {step === 'read' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="mt-16 text-center"
                >
                  <button
                    onClick={resetFlow}
                    className="text-xs font-bold uppercase tracking-[0.2em] bg-[#0C231C] text-[#FAF7F2] px-6 py-3.5 rounded hover:bg-[#D6707C] transition-colors"
                  >
                    Create Your Own Letter
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
