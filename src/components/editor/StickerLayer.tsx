import React, { useRef, useState } from 'react';
import { StickerPlacement } from '@/types';
import { STICKERS } from '@/lib/stickers';
import { X, RotateCw, Maximize2 } from 'lucide-react';

interface StickerLayerProps {
  stickers: StickerPlacement[];
  updateSticker: (index: number, updates: Partial<StickerPlacement>) => void;
  deleteSticker: (index: number) => void;
  selectedId: number | null;
  setSelectedId: (id: number | null) => void;
  readOnly?: boolean;
}

export const StickerLayer: React.FC<StickerLayerProps> = ({
  stickers,
  updateSticker,
  deleteSticker,
  selectedId,
  setSelectedId,
  readOnly = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dragState, setDragState] = useState<{
    index: number;
    startX: number;
    startY: number;
    startLeft: number;
    startTop: number;
  } | null>(null);

  const [rotateState, setRotateState] = useState<{
    index: number;
    centerX: number;
    centerY: number;
    startAngle: number;
    startRotation: number;
  } | null>(null);

  const [scaleState, setScaleState] = useState<{
    index: number;
    startY: number;
    startScale: number;
  } | null>(null);

  const handlePointerDown = (e: React.PointerEvent, index: number) => {
    if (readOnly) return;
    
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('[data-handle]')) {
      return; // Ignore wrapper drag if clicking handles/buttons
    }
    
    e.stopPropagation();
    setSelectedId(index);

    const sticker = stickers[index];
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    setDragState({
      index,
      startX: e.clientX,
      startY: e.clientY,
      startLeft: sticker.x,
      startTop: sticker.y,
    });
    
    containerRef.current?.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (readOnly) return;
    
    if (dragState !== null) {
      const { index, startX, startY, startLeft, startTop } = dragState;
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const deltaX = ((e.clientX - startX) / rect.width) * 100;
      const deltaY = ((e.clientY - startY) / rect.height) * 100;

      const newX = Math.max(0, Math.min(100, startLeft + deltaX));
      const newY = Math.max(0, Math.min(100, startTop + deltaY));

      updateSticker(index, { x: newX, y: newY });
    }

    if (rotateState !== null) {
      const { index, centerX, centerY, startAngle, startRotation } = rotateState;
      const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
      const rotation = startRotation + (angle - startAngle);
      updateSticker(index, { rotation });
    }

    if (scaleState !== null) {
      const { index, startY, startScale } = scaleState;
      const deltaY = startY - e.clientY;
      const scale = Math.max(0.5, Math.min(3.0, startScale + deltaY * 0.015));
      updateSticker(index, { scale });
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    try {
      containerRef.current?.releasePointerCapture(e.pointerId);
    } catch {}
    
    setDragState(null);
    setRotateState(null);
    setScaleState(null);
  };

  const startRotate = (e: React.PointerEvent, index: number) => {
    if (readOnly) return;
    e.stopPropagation();
    const sticker = stickers[index];
    const target = e.currentTarget as HTMLElement;
    const stickerEl = target.parentElement;
    if (!stickerEl) return;

    const stickerRect = stickerEl.getBoundingClientRect();
    const centerX = stickerRect.left + stickerRect.width / 2;
    const centerY = stickerRect.top + stickerRect.height / 2;

    const startAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);

    setRotateState({
      index,
      centerX,
      centerY,
      startAngle,
      startRotation: sticker.rotation,
    });
    
    containerRef.current?.setPointerCapture(e.pointerId);
  };

  const startScale = (e: React.PointerEvent, index: number) => {
    if (readOnly) return;
    e.stopPropagation();
    const sticker = stickers[index];
    
    setScaleState({
      index,
      startY: e.clientY,
      startScale: sticker.scale,
    });
    
    containerRef.current?.setPointerCapture(e.pointerId);
  };

  const isInteracting = dragState !== null || rotateState !== null || scaleState !== null;

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 select-none overflow-hidden touch-none z-20 ${
        isInteracting ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onClick={() => setSelectedId(null)}
    >
      {stickers.map((sticker, index) => {
        const asset = STICKERS.find((s) => s.id === sticker.sticker_id);
        if (!asset) return null;

        const isSelected = selectedId === index;

        return (
          <div
            key={index}
            style={{
              left: `${sticker.x}%`,
              top: `${sticker.y}%`,
              transform: `translate(-50%, -50%) rotate(${sticker.rotation}deg) scale(${sticker.scale})`,
              zIndex: sticker.z_index,
            }}
            className={`absolute group rounded pointer-events-auto cursor-grab active:cursor-grabbing ${
              isSelected 
                ? 'ring-2 ring-amora-rose p-1 bg-white/10 backdrop-blur-[2px]' 
                : 'hover:ring-1 hover:ring-amora-gold/50'
            }`}
            onPointerDown={(e) => handlePointerDown(e, index)}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sticker SVG image */}
            <div 
              className="w-16 h-16 filter drop-shadow-md select-none pointer-events-none block"
              dangerouslySetInnerHTML={{ __html: asset.svgMarkup }}
            />

            {/* Selected Control Handles */}
            {isSelected && !readOnly && (
              <>
                {/* Delete button */}
                <button
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteSticker(index);
                  }}
                  className="absolute -top-3 -left-3 bg-red-500 hover:bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center shadow-md transition-all scale-100 hover:scale-110 active:scale-95 z-50"
                >
                  <X className="w-3 h-3" />
                </button>

                {/* Rotate handle */}
                <div
                  onPointerDown={(e) => startRotate(e, index)}
                  data-handle="rotate"
                  className="absolute -top-3 -right-3 bg-amora-gold hover:bg-amora-gold/90 text-white rounded-full w-5 h-5 flex items-center justify-center cursor-alias shadow-md transition-all hover:scale-110 z-50 select-none"
                  title="Drag to Rotate"
                >
                  <RotateCw className="w-3 h-3" />
                </div>

                {/* Scale handle */}
                <div
                  onPointerDown={(e) => startScale(e, index)}
                  data-handle="scale"
                  className="absolute -bottom-3 -right-3 bg-amora-terracotta hover:bg-amora-terracotta/90 text-white rounded-full w-5 h-5 flex items-center justify-center cursor-ns-resize shadow-md transition-all hover:scale-110 z-50 select-none"
                  title="Drag vertically to Resize"
                >
                  <Maximize2 className="w-3 h-3" />
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};
