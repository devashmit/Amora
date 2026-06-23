import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { CreateLetterSchema } from '@/lib/validation';
import { isSupabaseConfigured, saveLetterLocal } from '@/lib/localDb';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate request body
    const result = CreateLetterSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.format() },
        { status: 400 }
      );
    }

    // Check if we should fall back to local database
    if (!isSupabaseConfigured()) {
      const localLetter = saveLetterLocal(result.data);
      return NextResponse.json({ id: localLetter.id }, { status: 201 });
    }

    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('letters')
        .insert(result.data)
        .select('id')
        .single();

      if (error) {
        console.warn('Supabase insert failed, falling back to local storage:', error.message);
        const localLetter = saveLetterLocal(result.data);
        return NextResponse.json({ id: localLetter.id }, { status: 201 });
      }

      return NextResponse.json({ id: data.id }, { status: 201 });
    } catch (dbError) {
      console.warn('Supabase connection threw, falling back to local storage:', dbError);
      const localLetter = saveLetterLocal(result.data);
      return NextResponse.json({ id: localLetter.id }, { status: 201 });
    }
  } catch (error) {
    console.error('Internal server error in POST /api/letters:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
