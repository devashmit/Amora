-- supabase/functions.sql

CREATE OR REPLACE FUNCTION increment_reaction(letter_id UUID, reaction_key TEXT)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  updated JSONB;
BEGIN
  IF reaction_key NOT IN ('🌸','🌺','💐','🌻','❤️') THEN
    RAISE EXCEPTION 'invalid reaction';
  END IF;
  UPDATE letters
  SET reactions = jsonb_set(
    reactions, ARRAY[reaction_key],
    to_jsonb(COALESCE((reactions->>reaction_key)::int, 0) + 1)
  )
  WHERE id = letter_id
  RETURNING reactions INTO updated;
  RETURN updated;
END;
$$;

CREATE OR REPLACE FUNCTION increment_view(letter_id UUID)
RETURNS VOID
LANGUAGE sql
SECURITY DEFINER
AS $$
  UPDATE letters SET view_count = view_count + 1 WHERE id = letter_id;
$$;
