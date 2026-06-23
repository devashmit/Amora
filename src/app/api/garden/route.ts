import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '12', 10);

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const supabase = createClient();

    // Query letters that are flagged as public, sorted by created_at DESC
    const { data: letters, error, count } = await supabase
      .from('letters')
      .select('*', { count: 'exact' })
      .eq('is_public', true)
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) {
      console.error('Error fetching garden letters:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      letters,
      pagination: {
        page,
        limit,
        total: count || 0,
        has_more: (count || 0) > to + 1,
      },
    });
  } catch (error) {
    console.error('Internal server error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
