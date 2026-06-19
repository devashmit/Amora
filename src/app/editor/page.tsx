'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLetterEditor } from '@/hooks/useLetterEditor';
import { LetterCanvas } from '@/components/editor/LetterCanvas';
import { PaperSelector } from '@/components/editor/PaperSelector';
import { TextControls } from '@/components/editor/TextControls';
import { DecorationPanel } from '@/components/editor/DecorationPanel';
import { StickerPanel } from '@/components/editor/StickerPanel';
import { Button } from '@/components/ui/Button';

export default function EditorPage() {
  const router = useRouter();
  const editor = useLetterEditor();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
    <main className="min-height-screen w-full text-amora-ink font-ui flex flex-col">
      {/* Header */}
      <header className="border-b border-amora-ink/5 bg-white/70 backdrop-blur px-6 py-4 flex items-center justify-between z-40">
        <div className="flex items-center gap-3">
          <img src="/logo.svg" alt="Amora Logo" className="w-8 h-8" />
          <span className="font-heading font-bold text-xl tracking-wider uppercase text-amora-ink">Amora</span>
        </div>
        <div className="flex items-center gap-3">
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
          >
            {isSubmitting ? 'Sealing...' : 'Seal & Share ✉'}
          </Button>
        </div>
      </header>

      {/* Editor Body */}
      <div className="flex-grow flex flex-col md:flex-row overflow-hidden relative">
        {/* Left Control Panel */}
        <aside className="w-full md:w-[320px] bg-white border-r border-amora-ink/5 p-6 space-y-6 overflow-y-auto max-h-[40vh] md:max-h-[calc(100vh-69px)] select-none">
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
        <section className="flex-grow bg-amora-cream/50 flex items-center justify-center p-6 md:p-12 overflow-y-auto max-h-[60vh] md:max-h-[calc(100vh-69px)]">
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
            />
            {errorMessage && (
              <p className="text-red-500 text-xs mt-2 text-center bg-red-50 border border-red-200 rounded-lg px-4 py-2">
                {errorMessage}
              </p>
            )}
          </div>
        </section>

        {/* Right Sticker Drawer */}
        <aside className="w-full md:w-[320px] bg-white border-t md:border-t-0 md:border-l border-amora-ink/5 p-6 overflow-y-auto max-h-[35vh] md:max-h-[calc(100vh-69px)] select-none">
          <StickerPanel onAddSticker={editor.addSticker} />
        </aside>
      </div>
    </main>
  );
}
