'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { HeartQRCode } from '@/components/share/HeartQRCode';
import { Button } from '@/components/ui/Button';

export default function SharePage() {
  const params = useParams();
  const id = params.id as string;
  const [shareUrl, setShareUrl] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShareUrl(`${window.location.origin}/letter/${id}`);
    }
  }, [id]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `I wrote you a digital letter with flower bouquets 🌸. Open it here: ${shareUrl}`
  )}`;

  return (
    <main className="min-h-screen bg-amora-cream text-amora-ink font-ui flex flex-col justify-center items-center p-6 md:p-12">
      <div className="max-w-md w-full text-center space-y-8 bg-white p-8 rounded-3xl shadow-xl border border-amora-ink/5">
        <div className="space-y-2">
          <span className="text-4xl">✉️</span>
          <h1 className="font-heading text-3xl font-bold tracking-wide">Your Letter is Sealed</h1>
          <p className="text-sm text-amora-ink/60">
            Share this QR code or copy the secret link. When opened, the recipient will experience a cinematic reveal.
          </p>
        </div>

        {shareUrl && <HeartQRCode shareUrl={shareUrl} />}

        {/* Action Actions */}
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-2 bg-amora-cream/50 p-2.5 rounded-full border border-amora-ink/5 text-xs font-semibold">
            <span className="truncate flex-grow pl-3 text-left text-amora-ink/75">{shareUrl}</span>
            <Button
              onClick={handleCopyLink}
              variant="secondary"
              size="sm"
              className="py-1 px-4 text-xs font-bold shrink-0"
            >
              {copied ? 'Copied! ✨' : 'Copy'}
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-full">
              <Button variant="primary" size="sm" className="w-full py-2.5 text-xs font-semibold">
                Share on WhatsApp
              </Button>
            </a>
            <Link href="/editor" className="w-full">
              <Button variant="outline" size="sm" className="w-full py-2.5 text-xs font-semibold">
                Create Another
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
