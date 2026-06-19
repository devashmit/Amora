import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

interface Params {
  params: {
    id: string;
  };
}

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const { id } = params;
    const adminSupabase = createAdminClient();

    // Fetch the letter
    const { data: letter, error: fetchError } = await adminSupabase
      .from('letters')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError || !letter) {
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
  } catch (error) {
    console.error('Internal server error:', error);
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

    const adminSupabase = createAdminClient();

    // Call RPC to securely increment the reaction
    const { data: updatedReactions, error } = await adminSupabase.rpc('increment_reaction', {
      letter_id: id,
      reaction_key: reaction,
    });

    if (error) {
      console.error('Failed to increment reaction:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ reactions: updatedReactions });
  } catch (error) {
    console.error('Internal server error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
