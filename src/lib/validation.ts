import { z } from 'zod';

export const CreateLetterSchema = z.object({
  to_name: z.string().min(1, "Recipient name is required").max(100),
  from_name: z.string().min(1, "Sender name is required").max(100),
  message: z.string().min(1, "Message is required").max(1000),
  paper_style: z.enum(['parchment', 'blush', 'cream', 'navy', 'ivory', 'dark']),
  font_family: z.enum(['Dancing Script', 'Cormorant Garamond', 'Playfair Display']),
  font_size: z.number().int().min(12).max(32),
  ink_color: z.string().regex(/^#[0-9A-F]{6}$/i, "Invalid color format"),
  stickers: z.array(
    z.object({
      sticker_id: z.string(),
      x: z.number().min(0).max(100),
      y: z.number().min(0).max(100),
      rotation: z.number().min(-360).max(360),
      scale: z.number().min(0.5).max(3.0),
      z_index: z.number().int(),
    })
  ).default([]),
  decorations: z.object({
    seal_type: z.enum(['heart', 'star', 'moon', 'floral', 'rose', 'olive', 'initial']).nullable().optional(),
    seal_position: z.enum(['bottom-center', 'bottom-right']).optional(),
    border_style: z.enum(['none', 'simple', 'ornate', 'floral']).optional(),
    postage_stamp: z.boolean().optional(),
    envelope_style: z.enum(['classic', 'vintage', 'royal', 'blossom', 'ivory', 'forest', 'midnight', 'rose', 'charcoal', 'parchment']).optional(),
    floral_print: z.enum(['none', 'lavender', 'olive', 'sakura', 'fern', 'wildflower']).optional(),
  }).default({}),
  is_public: z.boolean().default(false),
});
