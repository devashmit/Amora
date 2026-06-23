import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { isSupabaseConfigured, getLetterLocal, incrementViewLocal, incrementReactionLocal } from '@/lib/localDb';

interface Params {
  params: {
    id: string;
  };
}

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const { id } = params;

    // Check if we should fall back to local database
    if (!isSupabaseConfigured()) {
      const localLetter = getLetterLocal(id);
      if (!localLetter) {
        return NextResponse.json({ error: 'Letter not found' }, { status: 404 });
      }
      incrementViewLocal(id);
      return NextResponse.json(localLetter);
    }

    try {
      const adminSupabase = createAdminClient();

      // Fetch the letter
      const { data: letter, error: fetchError } = await adminSupabase
        .from('letters')
        .select('*')
        .eq('id', id)
        .single();

      if (fetchError || !letter) {
        // Fall back to local in case of DB mismatch or missing entry
        const localLetter = getLetterLocal(id);
        if (localLetter) {
          incrementViewLocal(id);
          return NextResponse.json(localLetter);
        }
        return NextResponse.json({ error: 'Letter not found' }, { status: 404 });
      }

      // Securely increment view count in the background via RPC
      const { error: viewError } = await adminSupabase.rpc('increment_view', {
        letter_id: id,
      });

      if (viewError) {
        console.error('Failed to increment view count:', viewError);
      }

      return NextResponse.json(letter);
    } catch (dbError) {
      console.warn('Supabase threw, falling back to local database:', dbError);
      const localLetter = getLetterLocal(id);
      if (localLetter) {
        incrementViewLocal(id);
        return NextResponse.json(localLetter);
      }
      return NextResponse.json({ error: 'Letter not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Internal server error in GET /api/letters/[id]:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const { id } = params;
    const { reaction } = await req.json();

    const allowedReactions = ['🌸', '🌺', '💐', '🌻', '❤️'];
    if (!reaction || !allowedReactions.includes(reaction)) {
      return NextResponse.json({ error: 'Invalid or missing reaction' }, { status: 400 });
    }

    // Check if we should fall back to local database
    if (!isSupabaseConfigured()) {
      const updatedReactions = incrementReactionLocal(id, reaction);
      if (!updatedReactions) {
        return NextResponse.json({ error: 'Letter not found' }, { status: 404 });
      }
      return NextResponse.json({ reactions: updatedReactions });
    }

    try {
      const adminSupabase = createAdminClient();

      // Call RPC to securely increment the reaction
      const { data: updatedReactions, error } = await adminSupabase.rpc('increment_reaction', {
        letter_id: id,
        reaction_key: reaction,
      });

      if (error) {
        console.warn('Supabase RPC reaction increment failed, falling back to local:', error.message);
        const localReactions = incrementReactionLocal(id, reaction);
        if (localReactions) {
          return NextResponse.json({ reactions: localReactions });
        }
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json({ reactions: updatedReactions });
    } catch (dbError) {
      console.warn('Supabase threw on patch, falling back to local:', dbError);
      const localReactions = incrementReactionLocal(id, reaction);
      if (localReactions) {
        return NextResponse.json({ reactions: localReactions });
      }
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  } catch (error) {
    console.error('Internal server error in PATCH /api/letters/[id]:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
