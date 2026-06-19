import React from 'react';
import Link from 'next/link';
import { PetalRain } from '@/components/landing/PetalRain';
import { Button } from '@/components/ui/Button';

export default function Home() {
  return (
    <main className="min-h-screen bg-amora-cream text-amora-ink font-ui flex flex-col justify-between relative overflow-hidden">
      {/* Background Petal Rain */}
      <PetalRain />

      {/* Navbar Header */}
      <header className="max-w-7xl mx-auto w-full px-6 py-6 flex justify-between items-center z-10">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌸</span>
          <span className="font-heading font-bold text-xl tracking-widest uppercase">Amora</span>
        </div>
        <Link href="/garden" className="text-xs font-semibold uppercase tracking-wider hover:text-amora-rose transition-colors">
          Explore Public Garden
        </Link>
      </header>

      {/* Hero Section */}
      <section className="flex-grow max-w-4xl mx-auto w-full px-6 flex flex-col items-center justify-center text-center py-16 z-10 space-y-6">
        <span className="text-sm font-semibold uppercase tracking-widest text-amora-rose">Digital Bouquet Builder</span>
        <h1 className="font-heading text-5xl md:text-7xl font-bold leading-tight">
          Write it with flowers.<br />
          Send it with love.
        </h1>
        <p className="max-w-xl text-base md:text-lg text-amora-ink/75 leading-relaxed font-light">
          Compose personalized letters decorated with beautiful botanical details. Generate interactive QR codes to send a cinematic envelope-opening experience to the people you care about.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full justify-center items-center">
          <Link href="/editor">
            <Button variant="primary" size="lg" className="w-56 font-semibold tracking-wide">
              Create a Letter
            </Button>
          </Link>
          <Link href="/garden">
            <Button variant="outline" size="lg" className="w-56 font-semibold tracking-wide bg-white/40">
              Browse the Garden
            </Button>
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white/60 backdrop-blur-sm border-t border-amora-ink/5 py-16 z-10">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-3 text-center">
            <div className="w-12 h-12 bg-amora-cream rounded-full flex items-center justify-center mx-auto text-xl shadow-inner">
              ✍️
            </div>
            <h3 className="font-heading text-xl font-bold">1. Write Your Letter</h3>
            <p className="text-sm text-amora-ink/65 leading-relaxed">
              Express your feelings using curated paper styles, elegant fonts, and customizable ink sizing.
            </p>
          </div>
          <div className="space-y-3 text-center">
            <div className="w-12 h-12 bg-amora-cream rounded-full flex items-center justify-center mx-auto text-xl shadow-inner">
              🌸
            </div>
            <h3 className="font-heading text-xl font-bold">2. Adorn With Flowers</h3>
            <p className="text-sm text-amora-ink/65 leading-relaxed">
              Decorate your envelope canvas with vintage stamps, real botanical stickers, and custom wax seals.
            </p>
          </div>
          <div className="space-y-3 text-center">
            <div className="w-12 h-12 bg-amora-cream rounded-full flex items-center justify-center mx-auto text-xl shadow-inner">
              ✉️
            </div>
            <h3 className="font-heading text-xl font-bold">3. Seal & Share</h3>
            <p className="text-sm text-amora-ink/65 leading-relaxed">
              Generate a unique web link or heart-framed QR code that plays a beautiful opening animation for the recipient.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-amora-ink/5 bg-white py-6 z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-amora-ink/50 font-medium">
          <p>© 2026 Amora. Built with love and flowers.</p>
          <div className="flex gap-4">
            <Link href="/editor" className="hover:text-amora-rose transition-colors">Create</Link>
            <Link href="/garden" className="hover:text-amora-rose transition-colors">Garden</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
