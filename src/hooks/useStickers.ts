import { useState } from 'react';
import { StickerPlacement } from '@/types';

export const useStickers = (initialStickers: StickerPlacement[] = []) => {
  const [stickers, setStickers] = useState<StickerPlacement[]>(initialStickers);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const addSticker = (stickerId: string) => {
    const newSticker: StickerPlacement = {
      sticker_id: stickerId,
      x: 50, // default center position
      y: 50,
      rotation: 0,
      scale: 1.0,
      z_index: stickers.length + 1,
    };
    setStickers([...stickers, newSticker]);
    setSelectedId(stickers.length);
  };

  const updateSticker = (index: number, updates: Partial<StickerPlacement>) => {
    setStickers((prev) =>
      prev.map((sticker, idx) => (idx === index ? { ...sticker, ...updates } : sticker))
    );
  };

  const deleteSticker = (index: number) => {
    setStickers((prev) => prev.filter((_, idx) => idx !== index));
    if (selectedId === index) {
      setSelectedId(null);
    } else if (selectedId !== null && selectedId > index) {
      setSelectedId(selectedId - 1);
    }
  };

  const bringToFront = (index: number) => {
    const maxZ = stickers.reduce((max, s) => Math.max(max, s.z_index), 0);
    updateSticker(index, { z_index: maxZ + 1 });
  };

  const clearStickers = () => {
    setStickers([]);
    setSelectedId(null);
  };

  return {
    stickers,
    setStickers,
    selectedId,
    setSelectedId,
    addSticker,
    updateSticker,
    deleteSticker,
    bringToFront,
    clearStickers,
  };
};
