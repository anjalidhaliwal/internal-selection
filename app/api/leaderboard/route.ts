import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { GAME_CODE } from '@/lib/types';

// GET /api/leaderboard — public current standings for the session.
export async function GET() {
  const supabase = getSupabaseAdmin();

  const { data: session } = await supabase
    .from('game_sessions')
    .select('id')
    .eq('game_code', GAME_CODE)
    .maybeSingle();

  if (!session) {
    return NextResponse.json({ players: [] });
  }

  const { data: players, error } = await supabase
    .from('players')
    .select('id, username, score')
    .eq('session_id', session.id)
    .order('score', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ players: players ?? [] });
}
