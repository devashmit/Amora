import React, { useRef, useState, useEffect } from 'react';
import { StickerPlacement } from '@/types';
import { STICKERS } from '@/lib/stickers';
import { 
  X, 
  RotateCw, 
  RotateCcw, 
  Maximize2, 
  Layers, 
  Plus, 
  Minus, 
  RefreshCw, 
  Trash2 
} from 'lucide-react';

interface StickerLayerProps {
  stickers: StickerPlacement[];
  updateSticker: (index: number, updates: Partial<StickerPlacement>) => void;
  deleteSticker: (index: number) => void;
  selectedId: number | null;
  setSelectedId: (id: number | null) => void;
  readOnly?: boolean;
  bringToFront?: (index: number) => void;
}

export const StickerLayer: React.FC<StickerLayerProps> = ({
  stickers,
  updateSticker,
  deleteSticker,
  selectedId,
  setSelectedId,
  readOnly = false,
  bringToFront,
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
    centerX: number;
    centerY: number;
    startDistance: number;
    startScale: number;
  } | null>(null);

  // Keyboard controls for selected sticker
  useEffect(() => {
    if (readOnly || selectedId === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const sticker = stickers[selectedId];
      if (!sticker) return;

      // Ignore when user is actively typing in text fields
      const activeEl = document.activeElement;
      if (
        activeEl &&
        (activeEl.tagName === 'INPUT' ||
          activeEl.tagName === 'TEXTAREA' ||
          (activeEl instanceof HTMLElement && activeEl.isContentEditable))
      ) {
        return;
      }

      let handled = false;

      switch (e.key) {
        case 'Backspace':
        case 'Delete':
          deleteSticker(selectedId);
          handled = true;
          break;
        case 'ArrowLeft':
          updateSticker(selectedId, { x: Math.max(0, sticker.x - (e.shiftKey ? 5 : 1)) });
          handled = true;
          break;
        case 'ArrowRight':
          updateSticker(selectedId, { x: Math.min(100, sticker.x + (e.shiftKey ? 5 : 1)) });
          handled = true;
          break;
        case 'ArrowUp':
          updateSticker(selectedId, { y: Math.max(0, sticker.y - (e.shiftKey ? 5 : 1)) });
          handled = true;
          break;
        case 'ArrowDown':
          updateSticker(selectedId, { y: Math.min(100, sticker.y + (e.shiftKey ? 5 : 1)) });
          handled = true;
          break;
        case '=':
        case '+':
          updateSticker(selectedId, { scale: Math.min(4.0, sticker.scale + 0.1) });
          handled = true;
          break;
        case '-':
        case '_':
          updateSticker(selectedId, { scale: Math.max(0.4, sticker.scale - 0.1) });
          handled = true;
          break;
        case '[':
          updateSticker(selectedId, { rotation: (sticker.rotation - 15) % 360 });
          handled = true;
          break;
        case ']':
          updateSticker(selectedId, { rotation: (sticker.rotation + 15) % 360 });
          handled = true;
          break;
        default:
          break;
      }

      if (handled) {
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedId, stickers, readOnly, deleteSticker, updateSticker]);

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
      const { index, centerX, centerY, startDistance, startScale } = scaleState;
      const currentDistance = Math.hypot(e.clientX - centerX, e.clientY - centerY);
      if (startDistance > 0) {
        const scale = Math.max(0.4, Math.min(4.0, startScale * (currentDistance / startDistance)));
        updateSticker(index, { scale });
      }
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
    const target = e.currentTarget as HTMLElement;
    const stickerEl = target.parentElement;
    if (!stickerEl) return;

    const stickerRect = stickerEl.getBoundingClientRect();
    const centerX = stickerRect.left + stickerRect.width / 2;
    const centerY = stickerRect.top + stickerRect.height / 2;

    const startDistance = Math.hypot(e.clientX - centerX, e.clientY - centerY);

    setScaleState({
      index,
      centerX,
      centerY,
      startDistance: startDistance || 1,
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
                  className="absolute -top-3 -left-3 bg-red-500 hover:bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center shadow-md transition-all scale-100 hover:scale-110 active:scale-95 z-50 animate-in fade-in zoom-in duration-200"
                >
                  <X className="w-3 h-3" />
                </button>

                {/* Rotate handle */}
                <div
                  onPointerDown={(e) => startRotate(e, index)}
                  data-handle="rotate"
                  className="absolute -top-3 -right-3 bg-amora-gold hover:bg-amora-gold/90 text-white rounded-full w-5 h-5 flex items-center justify-center cursor-alias shadow-md transition-all hover:scale-110 z-50 select-none animate-in fade-in zoom-in duration-200"
                  title="Drag to Rotate"
                >
                  <RotateCw className="w-3 h-3" />
                </div>

                {/* Scale handle */}
                <div
                  onPointerDown={(e) => startScale(e, index)}
                  data-handle="scale"
                  className="absolute -bottom-3 -right-3 bg-amora-terracotta hover:bg-amora-terracotta/90 text-white rounded-full w-5 h-5 flex items-center justify-center cursor-ns-resize shadow-md transition-all hover:scale-110 z-50 select-none animate-in fade-in zoom-in duration-200"
                  title="Drag away/towards center to Resize"
                >
                  <Maximize2 className="w-3 h-3" />
                </div>
              </>
            )}
          </div>
        );
      })}

      {/* Floating Toolbar Controls */}
      {selectedId !== null && !readOnly && (() => {
        const sticker = stickers[selectedId];
        if (!sticker) return null;
        
        const showBelow = sticker.y < 18;
        const toolbarY = showBelow ? (sticker.y + 14) : (sticker.y - 14);

        return (
          <div
            style={{
              left: `${sticker.x}%`,
              top: `${toolbarY}%`,
              transform: 'translate(-50%, -50%)',
            }}
            className="absolute z-50 flex items-center gap-0.5 bg-white/95 border border-amora-gold/30 px-2.5 py-1 rounded-full shadow-xl pointer-events-auto transition-all duration-200 select-none scale-90 md:scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Bring to front */}
            {bringToFront && (
              <button
                onClick={() => bringToFront(selectedId)}
                className="p-1.5 hover:bg-amora-cream rounded-full text-amora-ink hover:text-amora-rose transition-colors"
                title="Bring to Front"
              >
                <Layers className="w-3.5 h-3.5" />
              </button>
            )}
            
            {/* Rotate left */}
            <button
              onClick={() => updateSticker(selectedId, { rotation: (sticker.rotation - 15) % 360 })}
              className="p-1.5 hover:bg-amora-cream rounded-full text-amora-ink hover:text-amora-rose transition-colors"
              title="Rotate CCW (15°)"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            {/* Rotate right */}
            <button
              onClick={() => updateSticker(selectedId, { rotation: (sticker.rotation + 15) % 360 })}
              className="p-1.5 hover:bg-amora-cream rounded-full text-amora-ink hover:text-amora-rose transition-colors"
              title="Rotate CW (15°)"
            >
              <RotateCw className="w-3.5 h-3.5" />
            </button>

            {/* Scale down */}
            <button
              onClick={() => updateSticker(selectedId, { scale: Math.max(0.4, sticker.scale - 0.1) })}
              className="p-1.5 hover:bg-amora-cream rounded-full text-amora-ink hover:text-amora-rose transition-colors"
              title="Scale Down"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>

            {/* Scale up */}
            <button
              onClick={() => updateSticker(selectedId, { scale: Math.min(4.0, sticker.scale + 0.1) })}
              className="p-1.5 hover:bg-amora-cream rounded-full text-amora-ink hover:text-amora-rose transition-colors"
              title="Scale Up"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>

            {/* Reset */}
            <button
              onClick={() => updateSticker(selectedId, { rotation: 0, scale: 1.0 })}
              className="p-1.5 hover:bg-amora-cream rounded-full text-amora-ink hover:text-amora-rose transition-colors"
              title="Reset Rotation & Scale"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>

            <div className="w-[1px] h-4 bg-amora-ink/10 mx-1" />

            {/* Delete */}
            <button
              onClick={() => deleteSticker(selectedId)}
              className="p-1.5 hover:bg-red-50 rounded-full text-red-500 hover:text-red-600 transition-colors"
              title="Delete"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })()}
    </div>
  );
};
