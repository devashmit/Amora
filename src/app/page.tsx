'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PetalRain } from '@/components/landing/PetalRain';
import { Button } from '@/components/ui/Button';
import { 
  Sparkles, 
  PenTool, 
  Flower, 
  Mail, 
  ArrowRight, 
  ChevronRight, 
  Heart,
  Edit3
} from 'lucide-react';
import { STICKERS } from '@/lib/stickers';

// Envelope theme configurations to match 3D rendering
const ENVELOPE_THEMES = {
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
  }
};

const MOOD_PRESETS = [
  {
    id: 'blush-peony',
    name: 'Blush Peony',
    themeName: 'Blush',
    bgColor: '#FAF0F0',
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
    inkColor: '#2E4F4F',
    textColor: '#2E4F4F',
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
    bgColor: '#12221d',
    inkColor: '#FAF7F2',
    textColor: '#DCA963',
    fontClass: 'font-serif text-[11px] tracking-widest leading-loose uppercase',
    fontName: 'Playfair Display',
    stickerId: 'antique-pastel-bouquet',
    tagline: 'Bold, timeless invitation.',
    sealColor: '#DCA963',
    envelopeTheme: ENVELOPE_THEMES.royal,
    defaultMessage: 'AN INVITATION\n\nTO CELEBRATE THE VINTAGE OF MID-SUMMER NIGHTS IN THE GRAND ORCHARD. DRESS IN LINENS.',
  }
];

export default function Home() {
  const [activeMood, setActiveMood] = useState(MOOD_PRESETS[0]);
  const [customText, setCustomText] = useState('');
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [waxSealBroken, setWaxSealBroken] = useState(false);

  // Sync custom input text with preset switches
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
    <main className="min-h-screen text-amora-ink bg-[#FAF7F2] font-ui flex flex-col justify-between relative overflow-hidden">
      {/* Textured Linen Canvas Background Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" 
        style={{ backgroundImage: "url('/textures/linen.png')" }} 
      />

      {/* Performant, elegant petal rain */}
      <PetalRain />

      {/* Styled header */}
      <header className="max-w-7xl mx-auto w-full px-6 py-6 flex justify-between items-center z-20 border-b border-amora-gold/10 bg-white/20 backdrop-blur-md">
        <div className="flex items-center gap-3.5 group cursor-pointer">
          <div className="p-2.5 bg-[#FAF6EE] rounded-xl border border-amora-gold/20 shadow-sm transition-all duration-300 group-hover:border-amora-rose/40 group-hover:shadow-md">
            <img src="/logo.svg" alt="Amora Logo" className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-bold text-xl tracking-wider text-amora-ink">Amora</span>
            <span className="text-[9px] tracking-widest uppercase text-amora-ink/40 font-bold -mt-0.5">Written in flowers</span>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest text-amora-ink/60">
          <Link href="/garden" className="hover:text-amora-rose transition-colors py-1">
            Public Garden
          </Link>
          <span className="h-4 w-px bg-amora-gold/25" />
          <Link href="/editor" className="hover:text-amora-rose transition-colors py-1">
            Stationery Editor
          </Link>
        </nav>

        <div>
          <Link href="/editor">
            <Button variant="outline" size="sm" className="font-bold tracking-wider uppercase text-[10px] py-2.5 px-6 bg-white/60 border-amora-gold/30 hover:border-amora-rose hover:bg-white transition-all duration-300">
              Start Writing
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto w-full px-6 py-12 md:py-20 z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center flex-grow">
        {/* Left Side: Editorial Typography & Customizer Input */}
        <div className="lg:col-span-6 space-y-8 text-left">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-amora-rose border border-amora-rose/25 bg-white/80 backdrop-blur-sm select-none">
            <Sparkles className="w-3 h-3 text-amora-gold animate-pulse" />
            <span>Tactile Digital Correspondence</span>
          </span>

          <h1 className="font-heading text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight text-amora-ink">
            A digital letter, <br />
            adorned with <span className="font-handwriting font-normal text-amora-rose text-6xl md:text-[6.5rem] italic tracking-normal">flowers.</span>
          </h1>

          <p className="max-w-xl text-base md:text-lg text-amora-ink/80 leading-relaxed font-light">
            Compose customizable stationary using elegant classic typography or handwriting, then add real botanical stickers, vintage stamps, and physical wax seals.
          </p>

          {/* Interactive Live Message Customizer Box */}
          <div className="bg-white/60 backdrop-blur-md border border-amora-gold/25 p-4 rounded-xl max-w-xl shadow-sm space-y-3">
            <div className="flex justify-between items-center text-[10px] tracking-widest uppercase font-bold text-amora-ink/50">
              <span className="flex items-center gap-1.5">
                <Edit3 className="w-3.5 h-3.5 text-amora-gold" />
                Customize Letter Text
              </span>
              <span>Live Preview</span>
            </div>
            <textarea
              value={customText}
              onChange={(e) => {
                setCustomText(e.target.value);
                // Open envelope if user starts editing, so they see text
                setWaxSealBroken(true);
                setEnvelopeOpen(true);
              }}
              placeholder="Type your message here to preview..."
              maxLength={180}
              className="w-full bg-white/40 border border-amora-gold/15 focus:border-amora-rose/50 rounded-lg p-3 text-xs text-amora-ink focus:outline-none transition-all resize-none h-20 placeholder:text-amora-ink/30"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/editor" className="w-full sm:w-auto">
              <Button variant="primary" size="md" className="w-full sm:w-56 font-bold tracking-wider uppercase text-xs flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all">
                <span>Write Your Letter</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/garden" className="w-full sm:w-auto">
              <Button variant="ghost" size="md" className="w-full sm:w-56 font-bold tracking-wider uppercase text-xs flex items-center justify-center gap-2 border border-amora-gold/15 hover:border-amora-gold/30 hover:bg-white/40">
                <span>Browse the Garden</span>
                <Flower className="w-4 h-4 text-amora-gold" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Side: Realistic 3D Envelope Component */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center">
          <div className="text-center mb-6">
            <span className="text-[10px] tracking-widest uppercase text-amora-ink/40 font-bold block mb-1">Tactile Interaction</span>
            <span className="text-xs text-amora-ink/60 font-medium">Click the wax seal to break the seal and open the envelope</span>
          </div>

          <div 
            onClick={handleEnvelopeClick}
            className="relative w-[340px] sm:w-[410px] h-[230px] sm:h-[270px] cursor-pointer group perspective-[1200px]"
          >
            {/* Real depth shadow under envelope */}
            <div className="absolute w-[94%] left-[3%] bottom-[-15px] h-[25px] bg-black/10 rounded-full blur-xl transition-all duration-500 group-hover:blur-2xl group-hover:scale-105" />

            {/* ENVELOPE BACK COVER */}
            <div 
              style={{ 
                backgroundColor: envTheme.back,
                backgroundImage: "url('/textures/linen.png')"
              }}
              className="absolute inset-0 rounded-2xl border border-black/[0.03] overflow-hidden z-10 shadow-lg"
            >
              <div className="absolute inset-x-0 bottom-0 top-1/3 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
            </div>

            {/* PHYSICAL RECIPIENT ADDRESS CALLIGRAPHY */}
            <div 
              style={{ color: envTheme.text }} 
              className={`absolute inset-0 flex flex-col items-center justify-center p-8 text-center select-none z-12 transition-opacity duration-300 ${
                envelopeOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}
            >
              <span className="text-[9px] tracking-[0.25em] uppercase opacity-45 font-bold">Hand Delivered For</span>
              <span className="font-heading text-2xl md:text-3xl font-bold italic mt-2 tracking-wide">My Companion</span>
              <div className="w-16 h-px bg-current/25 my-3" />
              <span className="text-[8px] tracking-[0.15em] uppercase opacity-50 font-semibold">Written in Flowers</span>
            </div>

            {/* INTERNAL SLIDING STATIONERY LETTER */}
            <motion.div
              initial={{ y: 0, scale: 0.95 }}
              animate={envelopeOpen ? { y: -130, scale: 0.97, zIndex: 15 } : { y: 0, scale: 0.95, zIndex: 5 }}
              transition={{ type: 'spring', stiffness: 50, damping: 14 }}
              style={{ backgroundColor: activeMood.bgColor }}
              className="absolute inset-x-[4%] top-4 bottom-4 rounded-xl border border-black/[0.04] shadow-md p-5 overflow-hidden flex flex-col justify-between"
            >
              {/* Paper line pattern header */}
              <div className="flex justify-between items-start border-b border-black/[0.03] pb-2">
                <span className="text-[8px] uppercase tracking-widest text-amora-ink/40 font-bold">Amora Digital Stationery</span>
                <span className="text-[8px] uppercase tracking-widest text-amora-rose font-bold">{activeMood.themeName} Paper</span>
              </div>

              {/* Typed Message */}
              <div className="flex-grow flex items-center justify-center py-2 overflow-hidden">
                <p 
                  style={{ color: activeMood.textColor }} 
                  className={`${activeMood.fontClass} text-center whitespace-pre-line leading-relaxed font-light`}
                >
                  {customText || 'Compose your words...'}
                </p>
              </div>

              {/* Bottom stationery ribbon details */}
              <div className="flex justify-between items-end border-t border-black/[0.03] pt-2">
                <div className="w-7 h-7 opacity-80" dangerouslySetInnerHTML={{ __html: activeSticker?.svgMarkup || '' }} />
                <Heart className="w-3.5 h-3.5 text-amora-rose fill-amora-rose/25" />
              </div>
            </motion.div>

            {/* REALISTIC ENVELOPE TOP FLAP */}
            <motion.div
              style={{ 
                backgroundColor: envTheme.flap,
                backgroundImage: `linear-gradient(to bottom, ${envTheme.flap}, ${envTheme.flapDark})`,
                transformOrigin: 'top center',
                clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)'
              }}
              animate={envelopeOpen ? { rotateX: -180, zIndex: 2 } : { rotateX: 0, zIndex: 20 }}
              transition={{ type: 'spring', stiffness: 45, damping: 13 }}
              className="absolute inset-x-0 top-0 h-[60%] rounded-t-2xl shadow-sm border-t border-white/20"
            />

            {/* REALISTIC THREE-DIMENSIONAL FRONT FLAP DIAGONALS */}
            <div className="absolute inset-0 pointer-events-none z-22">
              <svg className="w-full h-full filter drop-shadow-[0_-3px_8px_rgba(0,0,0,0.03)]" viewBox="0 0 100 100" preserveAspectRatio="none">
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
                {/* Left side fold */}
                <polygon points="0,100 0,0 50,55" fill="url(#leftFlap)" stroke="rgba(0,0,0,0.02)" strokeWidth="0.15" />
                {/* Right side fold */}
                <polygon points="100,100 100,0 50,55" fill="url(#rightFlap)" stroke="rgba(0,0,0,0.02)" strokeWidth="0.15" />
                {/* Bottom envelope fold */}
                <polygon points="0,100 100,100 50,55" fill="url(#bottomFlap)" stroke="rgba(0,0,0,0.03)" strokeWidth="0.15" />
              </svg>
            </div>

            {/* INDIVIDUALIZED PHYSICAL WAX SEAL */}
            <motion.div
              style={{ zIndex: envelopeOpen ? 3 : 25 }}
              animate={envelopeOpen ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="absolute left-1/2 top-[55%] sm:top-[56%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none"
            >
              <div 
                style={{ 
                  background: `radial-gradient(circle at 35% 35%, ${activeMood.sealColor}e0 0%, ${activeMood.sealColor} 70%, #1a0204 100%)`,
                  boxShadow: '0 6px 16px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.25)' 
                }}
                className="w-14 h-14 rounded-full border-[3.5px] border-[#DCA963]/30 flex items-center justify-center transition-all duration-300"
              >
                <div className="absolute inset-1.5 border border-white/10 rounded-full flex items-center justify-center bg-black/5">
                  <Heart className="w-5 h-5 text-white fill-white/10" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Preset Mood Selector (Earthy, Botanical Presets) */}
      <section className="border-t border-amora-gold/15 py-12 bg-white/20 backdrop-blur-sm z-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
            <span className="text-[10px] tracking-widest uppercase text-amora-rose font-bold">Natural Styles</span>
            <h2 className="font-heading text-3xl font-bold text-amora-ink">Botanical Colorways & Textures</h2>
            <p className="text-xs text-amora-ink/65 leading-relaxed font-light">
              Toggle options to see how envelope themes match the paper stock palette and sticker accents.
            </p>
          </div>

          <div className="flex justify-center gap-3.5 mb-6">
            {MOOD_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => {
                  setActiveMood(preset);
                  setEnvelopeOpen(true);
                  setWaxSealBroken(true);
                }}
                className={`py-2.5 px-5 rounded-xl border text-xs font-semibold tracking-wider transition-all duration-300 flex items-center gap-2 ${
                  activeMood.id === preset.id
                    ? 'border-amora-rose bg-white text-amora-rose shadow-md'
                    : 'border-amora-gold/20 hover:border-amora-gold/40 text-amora-ink/70 hover:bg-white/40'
                }`}
              >
                <span 
                  className="w-3 h-3 rounded-full border border-black/10" 
                  style={{ backgroundColor: preset.sealColor }} 
                />
                <span>{preset.name}</span>
              </button>
            ))}
          </div>

          <p className="text-center text-[10px] tracking-widest uppercase text-amora-ink/40 font-bold">
            {activeMood.tagline} &mdash; Font: <span className="text-amora-rose">{activeMood.fontName}</span>
          </p>
        </div>
      </section>

      {/* Interactive Step-by-step Grid Re-architected */}
      <section className="border-t border-amora-gold/15 py-20 z-10 bg-[#FAF7F2]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
            <span className="text-[10px] tracking-widest uppercase text-amora-rose font-bold">How Amora Works</span>
            <h2 className="font-heading text-4xl font-bold text-amora-ink">The Process of Digital Adornment</h2>
            <p className="text-sm text-amora-ink/70 leading-relaxed font-light">
              A premium space designed for physical expression in a modern layout.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="border border-amora-gold/20 bg-white/50 p-8 rounded-2xl flex flex-col justify-between transition-all duration-300 hover:border-amora-rose/40 hover:-translate-y-1 hover:shadow-lg group">
              <div className="space-y-4">
                <div className="w-10 h-10 bg-amora-rose/5 rounded-xl flex items-center justify-center border border-amora-rose/25 text-amora-rose group-hover:scale-105 transition-transform duration-300">
                  <PenTool className="w-5 h-5" />
                </div>
                <span className="text-[10px] uppercase tracking-widest font-bold text-amora-ink/40 block">Step 01</span>
                <h3 className="font-heading text-2xl font-bold text-amora-ink">Typography & Script</h3>
                <p className="text-xs text-amora-ink/70 leading-relaxed font-light">
                  Choose from classic serif typefaces or warm cursive handwriting styles. Fine tune letter spacing, text scale, margins, and paper textures.
                </p>
              </div>
              <div className="pt-6 flex items-center gap-1.5 text-[10px] text-amora-rose font-bold tracking-widest uppercase">
                <span>Select script</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Step 2 */}
            <div className="border border-amora-gold/20 bg-white/50 p-8 rounded-2xl flex flex-col justify-between transition-all duration-300 hover:border-amora-rose/40 hover:-translate-y-1 hover:shadow-lg group">
              <div className="space-y-4">
                <div className="w-10 h-10 bg-amora-gold/5 rounded-xl flex items-center justify-center border border-amora-gold/25 text-amora-gold group-hover:scale-105 transition-transform duration-300">
                  <Flower className="w-5 h-5" />
                </div>
                <span className="text-[10px] uppercase tracking-widest font-bold text-amora-ink/40 block">Step 02</span>
                <h3 className="font-heading text-2xl font-bold text-amora-ink">Botanists Toolkit</h3>
                <p className="text-xs text-amora-ink/70 leading-relaxed font-light">
                  Adorn your stationery with botanical illustrations, dried foliage, and vintage stamps. Melt and stamp customized wax seals on the flap.
                </p>
              </div>
              <div className="pt-6 flex items-center gap-1.5 text-[10px] text-amora-gold font-bold tracking-widest uppercase">
                <span>Explore stamps</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Step 3 */}
            <div className="border border-amora-gold/20 bg-white/50 p-8 rounded-2xl flex flex-col justify-between transition-all duration-300 hover:border-amora-rose/40 hover:-translate-y-1 hover:shadow-lg group">
              <div className="space-y-4">
                <div className="w-10 h-10 bg-amora-rose/5 rounded-xl flex items-center justify-center border border-amora-rose/25 text-amora-rose group-hover:scale-105 transition-transform duration-300">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-[10px] uppercase tracking-widest font-bold text-amora-ink/40 block">Step 03</span>
                <h3 className="font-heading text-2xl font-bold text-amora-ink">Envelope Unveiling</h3>
                <p className="text-xs text-amora-ink/70 leading-relaxed font-light">
                  Export custom heart-framed QR codes or share a secure web link. Recipients experience a realistic envelope opening sequence.
                </p>
              </div>
              <div className="pt-6 flex items-center gap-1.5 text-[10px] text-amora-rose font-bold tracking-widest uppercase">
                <span>View envelope reveal</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Multi-Column Editorial Footer */}
      <footer className="border-t border-amora-gold/20 bg-[#FAF7F2] py-16 z-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Column 1: Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 bg-white rounded-xl border border-amora-gold/25 shadow-sm">
                <img src="/logo.svg" alt="Amora Logo" className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-lg tracking-wider text-amora-ink">Amora</span>
                <span className="text-[8px] tracking-widest uppercase text-amora-ink/40 font-semibold -mt-0.5">Written in flowers</span>
              </div>
            </div>
            <p className="text-xs text-amora-ink/70 leading-relaxed max-w-sm font-light">
              An elegant space for digital stationery and botanical correspondence. Compose envelopes decorated with vintage stamps, wax seals, and real pressed flower illustrations.
            </p>
          </div>

          {/* Column 2: Build & Create */}
          <div className="md:col-span-2 space-y-3.5">
            <h4 className="text-[10px] tracking-[0.2em] uppercase font-bold text-amora-ink/55">Create</h4>
            <ul className="space-y-2 text-xs font-semibold text-amora-ink/70">
              <li>
                <Link href="/editor" className="hover:text-amora-rose transition-colors">Compose Letter</Link>
              </li>
              <li>
                <Link href="/editor" className="hover:text-amora-rose transition-colors">Wax Seal Library</Link>
              </li>
              <li>
                <Link href="/editor" className="hover:text-amora-rose transition-colors">Botanical Presets</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Botanical Garden */}
          <div className="md:col-span-2 space-y-3.5">
            <h4 className="text-[10px] tracking-[0.2em] uppercase font-bold text-amora-ink/55">Garden</h4>
            <ul className="space-y-2 text-xs font-semibold text-amora-ink/70">
              <li>
                <Link href="/garden" className="hover:text-amora-rose transition-colors">Browse Public Letters</Link>
              </li>
              <li>
                <Link href="/garden" className="hover:text-amora-rose transition-colors">Botanical Archive</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Details / Specs */}
          <div className="md:col-span-3 space-y-3.5">
            <h4 className="text-[10px] tracking-[0.2em] uppercase font-bold text-amora-ink/55">Philosophy</h4>
            <p className="text-xs text-amora-ink/60 leading-relaxed font-light">
              We believe in slow messaging. In taking the time to pick a typeface, color, stamp, and seal to represent a feeling.
            </p>
          </div>
        </div>

        {/* Bottom copyright ribbon */}
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-amora-gold/15 flex flex-col sm:flex-row justify-between items-center gap-4 text-[9px] text-amora-ink/45 font-bold uppercase tracking-[0.15em]">
          <p>© 2026 Amora. Handcrafted with love and flowers.</p>
          <div className="flex gap-6">
            <span className="text-amora-rose">Slow Digital Correspondence</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
