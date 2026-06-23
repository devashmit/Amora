import React from 'react';
import Link from 'next/link';
import { PetalRain } from '@/components/landing/PetalRain';
import { Button } from '@/components/ui/Button';
import { Sparkles, PenTool, Flower, Mail, BookOpen } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen text-amora-ink font-ui flex flex-col justify-between relative overflow-hidden bg-radial-at-t">
      {/* Background Petal Rain */}
      <PetalRain />

      {/* Ambient background decoration shapes */}
      <div className="absolute top-1/10 left-1/12 w-[450px] h-[450px] bg-amora-rose/10 rounded-full blur-3xl pointer-events-none z-0 animate-pulse duration-10000"></div>
      <div className="absolute bottom-1/3 right-1/12 w-[600px] h-[600px] bg-amora-gold/10 rounded-full blur-3xl pointer-events-none z-0 animate-pulse duration-7000"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-amora-cream/40 rounded-full blur-2xl pointer-events-none z-0"></div>

      {/* Navbar Header */}
      <header className="max-w-7xl mx-auto w-full px-6 py-8 flex justify-between items-center z-10">
        <div className="flex items-center gap-3.5 group cursor-pointer">
          <div className="p-2 bg-white/60 backdrop-blur-md rounded-2xl border border-amora-gold/20 shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:border-amora-rose/40 group-hover:shadow-md">
            <img src="/logo.svg" alt="Amora Logo" className="w-8 h-8 transition-transform duration-500" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-extrabold text-2xl tracking-widest uppercase bg-gradient-to-r from-amora-ink via-amora-rose to-amora-gold bg-clip-text text-transparent transition-all duration-300 group-hover:opacity-90">Amora</span>
            <span className="text-[9px] tracking-widest uppercase text-amora-ink/40 font-semibold -mt-0.5">Written in flowers</span>
          </div>
        </div>
        <Link href="/garden" className="text-xs font-semibold uppercase tracking-widest text-amora-ink/80 hover:text-amora-rose transition-all duration-300 relative group py-1.5 px-3 rounded-full hover:bg-amora-rose/5">
          Explore Public Garden
          <span className="absolute bottom-1.5 left-3 w-0 h-0.5 bg-amora-rose transition-all duration-300 group-hover:w-[calc(100%-1.5rem)]"></span>
        </Link>
      </header>

      {/* Hero Section */}
      <section className="flex-grow max-w-4xl mx-auto w-full px-6 flex flex-col items-center justify-center text-center py-16 md:py-24 z-10 space-y-8 animate-float">
        <span className="px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest text-amora-rose border border-amora-rose/25 bg-white/60 backdrop-blur-md shadow-sm flex items-center gap-2 transition-all duration-300 hover:border-amora-rose/50 hover:bg-white/80 cursor-default select-none">
          <Sparkles className="w-3.5 h-3.5 animate-pulse text-amora-gold" />
          <span className="bg-gradient-to-r from-amora-rose to-amora-ink bg-clip-text text-transparent">Digital Bouquet Builder</span>
        </span>
        <h1 className="font-heading text-6xl md:text-8xl font-extrabold leading-[1.08] tracking-tight text-amora-ink select-none">
          Write it with <span className="font-handwriting font-normal text-amora-rose block md:inline md:mr-3 text-7xl md:text-[8.5rem] drop-shadow-sm hover:scale-105 transition-transform duration-300 cursor-default">flowers.</span>
          <br className="hidden md:block" />
          Send it with <span className="bg-gradient-to-r from-amora-rose via-amora-terracotta to-amora-gold bg-clip-text text-transparent">love.</span>
        </h1>
        <p className="max-w-xl text-base md:text-lg text-amora-ink/75 leading-relaxed font-light text-balance">
          Compose personalized letters decorated with beautiful botanical details. Generate interactive QR codes to send a cinematic envelope-opening experience to the people you care about.
        </p>
        <div className="flex flex-col sm:flex-row gap-5 pt-6 w-full justify-center items-center">
          <Link href="/editor" className="w-full sm:w-auto">
            <Button variant="primary" size="lg" className="w-full sm:w-64 font-bold tracking-widest uppercase text-xs flex items-center justify-center gap-2.5 shadow-lg shadow-amora-rose/15 hover:shadow-xl hover:shadow-amora-rose/25 transition-all duration-300 hover:scale-[1.03]">
              <span>Create a Letter</span>
              <Mail className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/garden" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full sm:w-64 font-bold tracking-widest uppercase text-xs bg-white/40 backdrop-blur-sm border border-amora-gold/30 hover:border-amora-rose/50 hover:bg-white/80 transition-all duration-300 hover:scale-[1.03] flex items-center justify-center gap-2.5">
              <span>Browse the Garden</span>
              <Flower className="w-4 h-4 text-amora-gold group-hover:text-amora-rose transition-colors" />
            </Button>
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-t border-amora-gold/10 py-20 z-10 bg-gradient-to-b from-transparent to-white/30">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-premium p-8 rounded-3xl space-y-4 text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-amora-gold/50 group">
            <div className="w-14 h-14 bg-gradient-to-br from-white to-amora-cream rounded-2xl flex items-center justify-center mx-auto shadow-md border border-amora-gold/25 group-hover:scale-110 transition-transform duration-500">
              <PenTool className="w-6 h-6 text-amora-rose" />
            </div>
            <h3 className="font-heading text-2xl font-bold text-amora-ink">1. Write Your Letter</h3>
            <p className="text-sm text-amora-ink/70 leading-relaxed font-light">
              Express your feelings using curated paper styles, elegant fonts, and customizable ink sizing.
            </p>
          </div>

          <div className="glass-premium p-8 rounded-3xl space-y-4 text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-amora-gold/50 group">
            <div className="w-14 h-14 bg-gradient-to-br from-white to-amora-cream rounded-2xl flex items-center justify-center mx-auto shadow-md border border-amora-gold/25 group-hover:scale-110 transition-transform duration-500">
              <Flower className="w-6 h-6 text-amora-gold" />
            </div>
            <h3 className="font-heading text-2xl font-bold text-amora-ink">2. Adorn With Flowers</h3>
            <p className="text-sm text-amora-ink/70 leading-relaxed font-light">
              Decorate your envelope canvas with vintage stamps, real botanical stickers, and custom wax seals.
            </p>
          </div>

          <div className="glass-premium p-8 rounded-3xl space-y-4 text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-amora-gold/50 group">
            <div className="w-14 h-14 bg-gradient-to-br from-white to-amora-cream rounded-2xl flex items-center justify-center mx-auto shadow-md border border-amora-gold/25 group-hover:scale-110 transition-transform duration-500">
              <Mail className="w-6 h-6 text-amora-rose" />
            </div>
            <h3 className="font-heading text-2xl font-bold text-amora-ink">3. Seal & Share</h3>
            <p className="text-sm text-amora-ink/70 leading-relaxed font-light">
              Generate a unique web link or heart-framed QR code that plays a beautiful opening animation for the recipient.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-amora-gold/10 bg-white/20 backdrop-blur-sm py-8 z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-amora-ink/60 font-medium">
          <p>© 2026 Amora. Built with love and flowers.</p>
          <div className="flex gap-6">
            <Link href="/editor" className="hover:text-amora-rose transition-colors tracking-widest uppercase">Create</Link>
            <Link href="/garden" className="hover:text-amora-rose transition-colors tracking-widest uppercase">Garden</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
