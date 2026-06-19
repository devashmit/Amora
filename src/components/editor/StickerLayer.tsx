import React, { useRef, useState } from 'react';
import { StickerPlacement } from '@/types';
import { STICKERS } from '@/lib/stickers';

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
    
    // Capture pointer
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (readOnly) return;
    
    if (dragState !== null) {
      const { index, startX, startY, startLeft, startTop } = dragState;
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const deltaX = ((e.clientX - startX) / rect.width) * 100;
      const deltaY = ((e.clientY - startY) / rect.height) * 100;

      // Keep within bounds 0-100
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
      const scale = Math.max(0.5, Math.min(3.0, startScale + deltaY * 0.01));
      updateSticker(index, { scale });
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (dragState !== null) {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      setDragState(null);
    }
    setRotateState(null);
    setScaleState(null);
  };

  const startRotate = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    e.preventDefault();
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
  };

  const startScale = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    e.preventDefault();
    const sticker = stickers[index];
    setScaleState({
      index,
      startY: e.clientY,
      startScale: sticker.scale,
    });
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 select-none overflow-hidden touch-none"
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
            className={`absolute group cursor-grab active:cursor-grabbing ${
              isSelected ? 'ring-2 ring-amora-rose rounded p-1' : 'hover:ring-1 hover:ring-amora-gold/50 rounded'
            }`}
            onPointerDown={(e) => handlePointerDown(e, index)}
          >
            {/* Sticker Image / Emoji Fallback */}
            <span className="text-4xl filter drop-shadow-md select-none pointer-events-none block">
              {asset.filename}
            </span>

            {/* Selected Control Handles */}
            {isSelected && !readOnly && (
              <>
                {/* Delete button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteSticker(index);
                  }}
                  className="absolute -top-3 -left-3 bg-red-500 hover:bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] shadow-md transition-all scale-100 hover:scale-110 active:scale-95"
                >
                  ✕
                </button>

                {/* Rotate handle */}
                <div
                  onMouseDown={(e) => startRotate(e, index)}
                  className="absolute -top-3 -right-3 bg-amora-gold hover:bg-amora-gold/90 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] cursor-alias shadow-md transition-all hover:scale-110"
                  title="Drag to Rotate"
                >
                  ↻
                </div>

                {/* Scale handle */}
                <div
                  onMouseDown={(e) => startScale(e, index)}
                  className="absolute -bottom-3 -right-3 bg-amora-terracotta hover:bg-amora-terracotta/90 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] cursor-ns-resize shadow-md transition-all hover:scale-110"
                  title="Drag vertically to Resize"
                >
                  ⤢
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};
