import fs from 'fs';
import path from 'path';
import { Letter, CreateLetterPayload } from '@/types';

const DB_PATH = path.join(process.cwd(), 'letters_db.json');

// Helper to check if Supabase is configured
export const isSupabaseConfigured = () => {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== 'your_supabase_project_url'
  );
};

export const readLetters = (): Letter[] => {
  try {
    if (!fs.existsSync(DB_PATH)) {
      return [];
    }
    const data = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(data) || [];
  } catch (error) {
    console.error('Error reading local JSON database:', error);
    return [];
  }
};

export const writeLetters = (letters: Letter[]) => {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(letters, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing to local JSON database:', error);
  }
};

export const saveLetterLocal = (payload: CreateLetterPayload): Letter => {
  const letters = readLetters();
  const newLetter: Letter = {
    ...payload,
    id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
    created_at: new Date().toISOString(),
    view_count: 0,
    reactions: { '🌸': 0, '🌺': 0, '💐': 0, '🌻': 0, '❤️': 0 }
  };
  letters.push(newLetter);
  writeLetters(letters);
  return newLetter;
};

export const getLetterLocal = (id: string): Letter | null => {
  const letters = readLetters();
  return letters.find(l => l.id === id) || null;
};

export const incrementViewLocal = (id: string): boolean => {
  const letters = readLetters();
  const letter = letters.find(l => l.id === id);
  if (letter) {
    letter.view_count = (letter.view_count || 0) + 1;
    writeLetters(letters);
    return true;
  }
  return false;
};

export const incrementReactionLocal = (id: string, reactionKey: string): Record<string, number> | null => {
  const letters = readLetters();
  const letter = letters.find(l => l.id === id);
  if (letter) {
    if (!letter.reactions) {
      letter.reactions = { '🌸': 0, '🌺': 0, '💐': 0, '🌻': 0, '❤️': 0 };
    }
    letter.reactions[reactionKey] = (letter.reactions[reactionKey] || 0) + 1;
    writeLetters(letters);
    return letter.reactions;
  }
  return null;
};
