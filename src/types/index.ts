export type PaperStyle = 'parchment' | 'blush' | 'cream' | 'navy' | 'ivory' | 'dark';

export type FontFamily = 'Dancing Script' | 'Cormorant Garamond' | 'Playfair Display';

export interface StickerPlacement {
  sticker_id: string;
  x: number;          // 0–100, % of canvas width
  y: number;          // 0–100, % of canvas height
  rotation: number;   // degrees
  scale: number;      // 0.5–3.0; scale multiplier
  z_index: number;
}

export interface Decoration {
  seal_type?: 'heart' | 'star' | 'moon' | 'floral' | null;
  seal_position?: 'bottom-center' | 'bottom-right';
  border_style?: 'none' | 'simple' | 'ornate' | 'floral';
  postage_stamp?: boolean;
  envelope_style?: 'classic' | 'vintage' | 'royal' | 'blossom';
}

export interface Letter {
  id: string;
  created_at: string;
  to_name: string;
  from_name: string;
  message: string;
  paper_style: PaperStyle;
  font_family: FontFamily;
  font_size: number;
  ink_color: string;
  stickers: StickerPlacement[];
  decorations: Decoration;
  is_public: boolean;
  view_count: number;
  reactions: Record<string, number>;
}

export type CreateLetterPayload = Omit<Letter, 'id' | 'created_at' | 'view_count' | 'reactions'>;

export interface StickerAsset {
  id: string;
  name: string;
  filename: string;
  category: 'bouquet' | 'single' | 'botanical' | 'dried' | 'branch';
  tags: string[];
}
