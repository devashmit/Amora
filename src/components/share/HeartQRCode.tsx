'use client';

import React, { useEffect, useRef } from 'react';

interface HeartQRCodeProps {
  shareUrl: string;
}

export const HeartQRCode: React.FC<HeartQRCodeProps> = ({ shareUrl }) => {
  const qrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !qrRef.current) return;

    // Dynamically import qr-code-styling for client-side rendering
    const loadQRCode = async () => {
      const QRCodeStyling = (await import('qr-code-styling')).default;

      // Clear previous content
      if (qrRef.current) {
        qrRef.current.innerHTML = '';
      }

      const qrCode = new QRCodeStyling({
        width: 250,
        height: 250,
        data: shareUrl,
        type: 'svg',
        qrOptions: { errorCorrectionLevel: 'H' },
        dotsOptions: { type: 'rounded', color: '#D4879C' },
        cornersSquareOptions: { type: 'extra-rounded', color: '#C17B5C' },
        cornersDotOptions: { type: 'dot', color: '#8B3A3A' },
        backgroundOptions: { color: 'transparent' },
        imageOptions: { margin: 4, imageSize: 0.15 },
      });

      qrCode.append(qrRef.current!);
    };

    loadQRCode();
  }, [shareUrl]);

  return (
    <div className="relative flex items-center justify-center p-8 bg-white rounded-3xl shadow-xl border border-amora-rose/10">
      {/* Decorative floral/heart SVG frame */}
      <div className="absolute inset-0 pointer-events-none border-2 border-amora-rose/25 rounded-3xl m-2 flex items-center justify-center">
        {/* Heart shaped background outline */}
        <svg
          className="absolute w-full h-full text-amora-rose/5 p-4"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </div>

      {/* QR Code Container */}
      <div ref={qrRef} className="relative z-10 p-2 bg-white rounded-xl shadow-inner" />
    </div>
  );
};
