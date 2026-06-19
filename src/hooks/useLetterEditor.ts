import { useState } from 'react';
import { PaperStyle, FontFamily, Decoration, CreateLetterPayload } from '@/types';
import { useStickers } from './useStickers';

export const useLetterEditor = (initialData?: Partial<CreateLetterPayload>) => {
  const [toName, setToName] = useState(initialData?.to_name || '');
  const [fromName, setFromName] = useState(initialData?.from_name || '');
  const [message, setMessage] = useState(initialData?.message || '');
  const [paperStyle, setPaperStyle] = useState<PaperStyle>(initialData?.paper_style || 'parchment');
  const [fontFamily, setFontFamily] = useState<FontFamily>(initialData?.font_family || 'Dancing Script');
  const [fontSize, setFontSize] = useState<number>(initialData?.font_size || 18);
  const [inkColor, setInkColor] = useState<string>(initialData?.ink_color || '#2C1810');
  const [isPublic, setIsPublic] = useState<boolean>(initialData?.is_public || false);
  
  const stickerState = useStickers(initialData?.stickers || []);
  const [decorations, setDecorations] = useState<Decoration>(initialData?.decorations || {
    seal_type: null,
    seal_position: 'bottom-center',
    border_style: 'none',
    postage_stamp: false,
  });

  const getPayload = (): CreateLetterPayload => ({
    to_name: toName,
    from_name: fromName,
    message: message,
    paper_style: paperStyle,
    font_family: fontFamily,
    font_size: fontSize,
    ink_color: inkColor,
    stickers: stickerState.stickers,
    decorations: decorations,
    is_public: isPublic,
  });

  const isValid = toName.trim().length > 0 && fromName.trim().length > 0 && message.trim().length > 0;

  return {
    toName,
    setToName,
    fromName,
    setFromName,
    message,
    setMessage,
    paperStyle,
    setPaperStyle,
    fontFamily,
    setFontFamily,
    fontSize,
    setFontSize,
    inkColor,
    setInkColor,
    isPublic,
    setIsPublic,
    decorations,
    setDecorations,
    ...stickerState,
    getPayload,
    isValid,
  };
};
