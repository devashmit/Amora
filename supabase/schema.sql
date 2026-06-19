-- supabase/schema.sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE letters (
  id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  to_name         TEXT NOT NULL,
  from_name       TEXT NOT NULL,
  message         TEXT NOT NULL CHECK (char_length(message) <= 1000),
  paper_style     TEXT NOT NULL DEFAULT 'parchment'
                  CHECK (paper_style IN ('parchment','blush','cream','navy','ivory','dark')),
  font_family     TEXT NOT NULL DEFAULT 'Dancing Script',
  font_size       INTEGER NOT NULL DEFAULT 18 CHECK (font_size BETWEEN 12 AND 32),
  ink_color       TEXT NOT NULL DEFAULT '#2C1810',
  stickers        JSONB NOT NULL DEFAULT '[]'::jsonb,
  decorations     JSONB NOT NULL DEFAULT '{}'::jsonb,
  is_public       BOOLEAN NOT NULL DEFAULT FALSE,
  view_count      INTEGER NOT NULL DEFAULT 0,
  reactions       JSONB NOT NULL DEFAULT '{"🌸":0,"🌺":0,"💐":0,"🌻":0,"❤️":0}'::jsonb
);

CREATE INDEX idx_letters_created_at ON letters(created_at DESC);
CREATE INDEX idx_letters_is_public ON letters(is_public) WHERE is_public = TRUE;

ALTER TABLE letters ENABLE ROW LEVEL SECURITY;

-- Anyone can read any letter by UUID (QR recipients) or public feed
CREATE POLICY "Letters readable by anyone"
  ON letters FOR SELECT
  USING (TRUE);

-- Anonymous creation
CREATE POLICY "Anyone can create letters"
  ON letters FOR INSERT
  WITH CHECK (TRUE);
