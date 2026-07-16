'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLetterEditor } from '@/hooks/useLetterEditor';
import { Decoration } from '@/types';
import { LetterCanvas } from '@/components/editor/LetterCanvas';
import { PaperSelector } from '@/components/editor/PaperSelector';
import { TextControls } from '@/components/editor/TextControls';
import { DecorationPanel } from '@/components/editor/DecorationPanel';
import { StickerPanel } from '@/components/editor/StickerPanel';
import { EnvelopeSealPreview, ENVELOPE_COLORS } from '@/components/editor/EnvelopeSealPreview';
import { Button } from '@/components/ui/Button';
import { Mail, ArrowRight, ArrowLeft, MailOpen, Heart, Sparkles } from 'lucide-react';

export default function EditorPage() {
  const router = useRouter();
  const editor = useLetterEditor();
  const [step, setStep] = useState<'letter' | 'envelope'>('letter');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const envelopeStyles: { id: Exclude<Decoration['envelope_style'], undefined>; name: string; desc: string }[] = [
    { id: 'ivory', name: 'Classic Ivory', desc: 'Warm ivory cotton paper with embossed botanicals' },
    { id: 'forest', name: 'Forest Green Linen', desc: 'Rich forest green stock with pressed fern details' },
    { id: 'midnight', name: 'Midnight Blue Cotton', desc: 'Deep navy cotton paper with gold-pressed wildflowers' },
    { id: 'rose', name: 'Dusty Rose', desc: 'Soft warm pink paper with pressed sakura petals' },
    { id: 'charcoal', name: 'Charcoal Black', desc: 'Dark cotton paper with embossed lavender illustrations' },
    { id: 'parchment', name: 'Parchment', desc: 'Pressed grain antique paper with slightly deckled edges' },
  ];

  const handleSealAndShare = async () => {
    if (!editor.isValid) return;
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const payload = editor.getPayload();
      const res = await fetch('/api/letters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to save letter');
      }

      const { id } = await res.json();
      router.push(`/share/${id}`);
    } catch (err: unknown) {
      console.error(err);
      const message = err instanceof Error ? err.message : 'Something went wrong while sealing your letter.';
      setErrorMessage(message);
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-height-screen w-full text-amora-ink font-ui flex flex-col bg-amora-cream/20">
      {/* Header */}
      <header className="border-b border-amora-ink/5 bg-white/70 backdrop-blur px-6 py-4 flex items-center justify-between z-40">
        <div className="flex items-center gap-3">
          <img src="/logo.svg" alt="Amora Logo" className="w-8 h-8" />
          <span className="font-heading font-bold text-xl tracking-wider uppercase text-amora-ink">Amora</span>
        </div>
        <div className="flex items-center gap-4">
          {/* Step Indicator */}
          <div className="hidden sm:flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
            <span className={step === 'letter' ? 'text-amora-rose' : 'text-amora-ink/40'}>1. Write & Adorn</span>
            <span className="text-amora-ink/20">➔</span>
            <span className={step === 'envelope' ? 'text-amora-rose' : 'text-amora-ink/40'}>2. Choose Envelope & Seal</span>
          </div>

          <div className="flex items-center gap-3 border-l border-amora-ink/10 pl-4">
            {step === 'letter' ? (
              <Button
                onClick={() => setStep('envelope')}
                disabled={!editor.isValid}
                variant="primary"
                size="sm"
                className="flex items-center gap-1.5"
              >
                <span>Choose Envelope</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <>
                <Button
                  onClick={() => setStep('letter')}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Edit</span>
                </Button>

                {/* Public Feed Toggle */}
                <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-semibold uppercase tracking-wider text-amora-ink/60">
                  <span>Share to Public Garden</span>
                  <input
                    type="checkbox"
                    checked={editor.isPublic}
                    onChange={(e) => editor.setIsPublic(e.target.checked)}
                    className="accent-amora-rose w-4 h-4 cursor-pointer"
                  />
                </label>

                <Button
                  onClick={handleSealAndShare}
                  disabled={!editor.isValid || isSubmitting}
                  variant="primary"
                  size="sm"
                  className="flex items-center gap-1.5"
                >
                  {isSubmitting ? 'Sealing...' : (
                    <>
                      <span>Seal & Share</span>
                      <Mail className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Editor Body */}
      <div className="flex-grow flex flex-col md:flex-row overflow-hidden relative">
        {step === 'letter' ? (
          <>
            {/* Left Control Panel */}
            <aside className="w-full md:w-[320px] bg-white border-r border-amora-ink/5 p-6 space-y-6 overflow-y-auto max-h-[40vh] md:max-h-[calc(100vh-69px)] select-none scrollbar-thin">
              <PaperSelector
                currentStyle={editor.paperStyle}
                onChange={editor.setPaperStyle}
              />
              <hr className="border-amora-ink/5" />
              <TextControls
                fontFamily={editor.fontFamily}
                setFontFamily={editor.setFontFamily}
                fontSize={editor.fontSize}
                setFontSize={editor.setFontSize}
                inkColor={editor.inkColor}
                setInkColor={editor.setInkColor}
              />
              <hr className="border-amora-ink/5" />
              <DecorationPanel
                decorations={editor.decorations}
                setDecorations={editor.setDecorations}
              />
            </aside>

            {/* Center Canvas Workspace */}
            <section className="flex-grow bg-amora-cream/30 flex items-center justify-center p-6 md:p-12 overflow-y-auto max-h-[60vh] md:max-h-[calc(100vh-69px)]">
              <div className="w-full max-w-[600px] flex flex-col items-center gap-3">
                <LetterCanvas
                  toName={editor.toName}
                  setToName={editor.setToName}
                  fromName={editor.fromName}
                  setFromName={editor.setFromName}
                  message={editor.message}
                  setMessage={editor.setMessage}
                  paperStyle={editor.paperStyle}
                  fontFamily={editor.fontFamily}
                  fontSize={editor.fontSize}
                  inkColor={editor.inkColor}
                  stickers={editor.stickers}
                  updateSticker={editor.updateSticker}
                  deleteSticker={editor.deleteSticker}
                  selectedId={editor.selectedId}
                  setSelectedId={editor.setSelectedId}
                  decorations={editor.decorations}
                  bringToFront={editor.bringToFront}
                />
                {errorMessage && (
                  <p className="text-red-500 text-xs mt-2 text-center bg-red-50 border border-red-200 rounded-lg px-4 py-2">
                    {errorMessage}
                  </p>
                )}
              </div>
            </section>

            {/* Right Sticker Drawer */}
            <aside className="w-full md:w-[320px] bg-white border-t md:border-t-0 md:border-l border-amora-ink/5 p-6 overflow-y-auto max-h-[35vh] md:max-h-[calc(100vh-69px)] select-none scrollbar-thin">
              <StickerPanel onAddSticker={editor.addSticker} />
            </aside>
          </>
        ) : (
          <>
            {/* Left Control Panel: Envelope Selector */}
            <aside className="w-full md:w-[320px] bg-white border-r border-amora-ink/5 p-6 space-y-6 overflow-y-auto max-h-[40vh] md:max-h-[calc(100vh-69px)] select-none scrollbar-thin">
              <div className="space-y-3 font-ui">
                <h3 className="text-sm font-semibold tracking-wider text-amora-ink/80 uppercase flex items-center gap-1.5">
                  <MailOpen className="w-4 h-4 text-amora-gold" />
                  <span>Choose Envelope</span>
                </h3>
                <p className="text-xs text-amora-ink/55">
                  Choose a style for the presentation envelope containing your letter.
                </p>
                <div className="flex flex-col gap-3 pt-2">
                  {envelopeStyles.map((style) => {
                    const colors = ENVELOPE_COLORS[style.id];
                    const isSelected = (editor.decorations.envelope_style || 'classic') === style.id;
                    return (
                      <button
                        key={style.id}
                        onClick={() => editor.setDecorations(prev => ({ ...prev, envelope_style: style.id }))}
                        className={`p-4 rounded-xl border text-left transition-all duration-300 transform hover:scale-[1.02] hover:shadow-md active:scale-[0.98] ${
                          isSelected
                            ? 'border-amora-rose bg-amora-rose/5 shadow-sm ring-1 ring-amora-rose/35'
                            : 'border-amora-ink/10 hover:border-amora-ink/20'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-xs text-amora-ink">{style.name}</span>
                          <div className="flex gap-1">
                            <span style={{ backgroundColor: colors.back }} className="w-3.5 h-3.5 rounded-full border border-black/10 inline-block" />
                            <span style={{ backgroundColor: colors.accent }} className="w-3.5 h-3.5 rounded-full border border-black/10 inline-block" />
                          </div>
                        </div>
                        <p className="text-[10px] text-amora-ink/50 mt-1 leading-relaxed">{style.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </aside>

            {/* Center Canvas Workspace: Envelope Sealing Preview */}
            <section className="flex-grow bg-amora-cream/30 flex items-center justify-center p-6 md:p-12 overflow-y-auto max-h-[60vh] md:max-h-[calc(100vh-69px)]">
              <div className="w-full max-w-[600px] flex flex-col items-center gap-3">
                <EnvelopeSealPreview
                  toName={editor.toName}
                  fromName={editor.fromName}
                  message={editor.message}
                  paperStyle={editor.paperStyle}
                  fontFamily={editor.fontFamily}
                  fontSize={editor.fontSize}
                  inkColor={editor.inkColor}
                  stickers={editor.stickers}
                  decorations={editor.decorations}
                />
                {errorMessage && (
                  <p className="text-red-500 text-xs mt-2 text-center bg-red-50 border border-red-200 rounded-lg px-4 py-2">
                    {errorMessage}
                  </p>
                )}
              </div>
            </section>

            {/* Right Information Drawer */}
            <aside className="w-full md:w-[320px] bg-white border-t md:border-t-0 md:border-l border-amora-ink/5 p-6 overflow-y-auto max-h-[35vh] md:max-h-[calc(100vh-69px)] select-none flex flex-col justify-between scrollbar-thin">
              <div className="space-y-4 font-ui">
                <h3 className="text-sm font-semibold tracking-wider text-amora-ink/80 uppercase flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-amora-rose" />
                  <span>Interactive Envelope</span>
                </h3>
                <p className="text-xs text-amora-ink/60 leading-relaxed">
                  Your recipient will receive an interactive QR code card or link. Opening it plays a cinematic unboxing:
                </p>
                <div className="p-4 bg-amora-cream/40 rounded-xl border border-amora-gold/25 text-[11px] text-amora-ink/75 leading-relaxed space-y-2">
                  <span className="font-semibold text-amora-gold block flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>How it appears</span>
                  </span>
                  <p>• Wax Seal: The selected wax seal seals the custom-designed envelope.</p>
                  <p>• Opened Bouquet: The bouquets you placed on the letter are displayed next to the envelope while opening.</p>
                  <p>• The Letter: The envelope flap folds back and your personalized card slides up.</p>
                </div>
              </div>
            </aside>
          </>
        )}
      </div>
    </main>
  );
}
